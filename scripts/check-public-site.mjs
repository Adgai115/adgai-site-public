#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteBase = 'https://adgai115.github.io/adgai-site-public/';
const errors = [];
const publicTextFiles = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function fail(message) {
  errors.push(message);
}

function walk(dir, predicate) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes:true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, predicate);
    return predicate(full) ? [full] : [];
  });
}

function validatePublicUrl(value, context) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) fail(`${context} uses a non-web URL protocol`);
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    const privateHost = host === 'localhost' || host.endsWith('.local') || host === '::1' ||
      /^(?:0|10|127|169\.254|192\.168)\./.test(host) ||
      /^172\.(?:1[6-9]|2\d|3[01])\./.test(host) ||
      /^(?:fc|fd|fe[89ab])[0-9a-f:]*$/i.test(host);
    if (privateHost) fail(`${context} points at a local or private host`);
  } catch {
    fail(`${context} is not a valid absolute URL`);
  }
}

function validateReportUrls(report, rel) {
  for (const section of report.sections || []) {
    for (const item of section.items || []) validatePublicUrl(item.url, `${rel} item ${item.title || '(untitled)'}`);
  }
}

const snapshot = JSON.parse(read('data/public_snapshot.json'));
if (!Array.isArray(snapshot.featured_projects) || snapshot.featured_projects.length === 0) {
  fail('public_snapshot.json must include featured_projects');
}

const intelHubReport = JSON.parse(read('data/intelhub_daily_report.json'));
if (!/^\d{4}-\d{2}-\d{2}$/.test(String(intelHubReport.report_date || ''))) {
  fail('intelhub_daily_report.json must include report_date in YYYY-MM-DD format');
}
validateReportUrls(intelHubReport, 'data/intelhub_daily_report.json');

const intelHubIndex = JSON.parse(read('data/intelhub_daily_index.json'));
if (!Array.isArray(intelHubIndex.reports) || intelHubIndex.reports.length === 0) {
  fail('intelhub_daily_index.json must include reports');
}
if (intelHubIndex.latest_date !== intelHubReport.report_date) {
  fail('intelhub_daily_index.json latest_date must match intelhub_daily_report.json report_date');
}
for (const entry of intelHubIndex.reports || []) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(entry.date || ''))) {
    fail('intelhub_daily_index.json has an invalid report date');
    continue;
  }
  if (typeof entry.path !== 'string' || !entry.path.startsWith('data/intelhub_daily_reports/')) {
    fail(`IntelHub report index entry ${entry.date} must point at data/intelhub_daily_reports/`);
    continue;
  }
  if (!exists(entry.path)) {
    fail(`IntelHub archived report is missing: ${entry.path}`);
    continue;
  }
  const archivedReport = JSON.parse(read(entry.path));
  if (archivedReport.report_date !== entry.date) {
    fail(`IntelHub archived report date mismatch: ${entry.path}`);
  }
  validateReportUrls(archivedReport, entry.path);
}

for (const project of snapshot.featured_projects || []) {
  const url = project.public_url;
  if (typeof url !== 'string' || !url.startsWith('projects/')) {
    fail(`project ${project.slug || project.name} must use a repo-relative projects/ URL`);
    continue;
  }
  if (!exists(url)) fail(`project URL target is missing: ${url}`);
}

const htmlFiles = [
  'index.html',
  'projects/resource-console.html',
  'projects/intelhub.html',
  'projects/knowledge-automation.html',
];

for (const rel of htmlFiles) {
  const html = read(rel);
  if (html.includes('https://adgai.github.io')) {
    fail(`${rel} still points at the old adgai.github.io origin`);
  }
  if (!html.includes(siteBase)) {
    fail(`${rel} is missing the public GitHub Pages base URL`);
  }
  if (!html.includes('twitter:image')) {
    fail(`${rel} is missing twitter:image metadata`);
  }
  if (!html.includes('Content-Security-Policy')) fail(`${rel} is missing a Content Security Policy`);
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="zh-CN"')) fail(`${rel} is missing bilingual hreflang links`);
  if (!html.includes('class="skip-link"')) fail(`${rel} is missing a skip link`);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|#|data:)/i.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    if (!clean) continue;
    const target = path.resolve(path.dirname(path.join(root, rel)), clean);
    if ((target !== root && !target.startsWith(root + path.sep)) || !fs.existsSync(target)) fail(`${rel} references a missing local file: ${reference}`);
  }

  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/rel="[^"]*noopener[^"]*noreferrer[^"]*"/i.test(match[0])) fail(`${rel} has target=_blank without noopener noreferrer`);
  }
}

for (const rel of ['.nojekyll', '404.html', 'robots.txt', 'sitemap.xml', '.well-known/security.txt']) {
  if (!exists(rel)) fail(`${rel} is missing`);
}

if (exists('404.html')) {
  const notFound = read('404.html');
  if (!notFound.includes('noindex,follow')) fail('404.html must be noindex,follow');
  if (!notFound.includes('Content-Security-Policy')) fail('404.html is missing a Content Security Policy');
}

if (exists('sitemap.xml')) {
  const sitemap = read('sitemap.xml');
  for (const rel of htmlFiles) {
    const expected = rel === 'index.html' ? siteBase : siteBase + rel;
    if (!sitemap.includes(`<loc>${expected}</loc>`)) fail(`sitemap.xml is missing ${expected}`);
  }
  const intelHubEntry = sitemap.match(/<url>\s*<loc>[^<]*projects\/intelhub\.html<\/loc>\s*<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
  if (!intelHubEntry || intelHubEntry[1] < intelHubIndex.latest_date) {
    fail(`IntelHub sitemap lastmod must be on or after ${intelHubIndex.latest_date}`);
  }
}

for (const file of walk(path.join(root, 'data'), (file) => file.endsWith('.json'))) {
  publicTextFiles.push(file);
}
const sensitivePatterns = [
  { label:'private filesystem path', pattern:/(?:[A-Z]:\\(?:Users|Dev\\\.openclaw)\\|\/(?:Users|home)\/[^/]+\/\.openclaw\/)/i },
  { label:'private key material', pattern:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label:'credential-like token', pattern:/\b(?:sk-(?:proj|svcacct)-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,})\b/ },
  { label:'bearer credential', pattern:/\bBearer\s+[A-Za-z0-9._~+\/-]{24,}={0,2}\b/i },
];
for (const file of publicTextFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const check of sensitivePatterns) {
    if (check.pattern.test(content)) fail(`${path.relative(root, file)} contains possible ${check.label}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Public site checks passed');
