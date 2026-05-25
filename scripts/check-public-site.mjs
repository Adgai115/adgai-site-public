#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteBase = 'https://adgai115.github.io/adgai-site-public/';
const errors = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function fail(message) {
  errors.push(message);
}

const snapshot = JSON.parse(read('data/public_snapshot.json'));
if (!Array.isArray(snapshot.featured_projects) || snapshot.featured_projects.length === 0) {
  fail('public_snapshot.json must include featured_projects');
}

const intelHubReport = JSON.parse(read('data/intelhub_daily_report.json'));
if (!/^\d{4}-\d{2}-\d{2}$/.test(String(intelHubReport.report_date || ''))) {
  fail('intelhub_daily_report.json must include report_date in YYYY-MM-DD format');
}

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
}

for (const rel of ['robots.txt', 'sitemap.xml']) {
  if (!exists(rel)) fail(`${rel} is missing`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Public site checks passed');
