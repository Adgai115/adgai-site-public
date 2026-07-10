#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const intelHubDataDir = process.env.INTELHUB_DATA_DIR || path.resolve(root, '..', '.openclaw', 'workspace', 'skills', 'intelhub', 'data');
const sourcePath = path.resolve(process.env.INTELHUB_IR_PATH || path.join(intelHubDataDir, 'latest-ir.json'));
const outputPath = path.resolve(process.env.INTELHUB_DAILY_REPORT_OUT || path.join(root, 'data', 'intelhub_daily_report.json'));
const archiveDir = path.resolve(process.env.INTELHUB_DAILY_REPORT_ARCHIVE_DIR || path.join(root, 'data', 'intelhub_daily_reports'));
const indexPath = path.resolve(process.env.INTELHUB_DAILY_REPORT_INDEX_OUT || path.join(root, 'data', 'intelhub_daily_index.json'));
const sectionLimit = Number.parseInt(process.env.INTELHUB_DAILY_REPORT_LIMIT || '8', 10);
const privatePattern = /(?:oc_[a-z0-9_]+|token|secret|password|api[_-]?key|bearer|file:\/\/|localhost|127\.0\.0\.1|\\Users\\|[A-Z]:\\|\.openclaw)/i;

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`IntelHub report source not found: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function text(value, maxLength) {
  const clean = String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return '';
  return clean.length > maxLength ? `${clean.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...` : clean;
}

function publicUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (host === 'localhost' || host.endsWith('.local') || host === '::1') return '';
    if (/^(?:0|10|127|169\.254|192\.168)\./.test(host)) return '';
    if (/^172\.(?:1[6-9]|2\d|3[01])\./.test(host)) return '';
    if (/^(?:fc|fd|fe[89ab])[0-9a-f:]*$/i.test(host)) return '';
    return url.href;
  } catch {
    return '';
  }
}

function score(item) {
  const raw = item?.scores && typeof item.scores === 'object' ? item.scores : {};
  const result = {};
  for (const key of ['quality', 'relevance', 'personal', 'opportunity']) {
    const value = Number(raw[key]);
    if (Number.isFinite(value)) result[key] = value;
  }
  const qualityScore = Number(item?.qualityScore);
  if (!Number.isFinite(result.quality) && Number.isFinite(qualityScore)) result.quality = qualityScore;
  return Object.keys(result).length ? result : undefined;
}

function topics(item) {
  const tags = item?.tags && typeof item.tags === 'object' ? item.tags : {};
  const raw = Array.isArray(tags.matchedTopics)
    ? tags.matchedTopics
    : Array.isArray(item?.matchedTopics)
      ? item.matchedTopics
      : [];
  return raw.map((topic) => text(topic, 32)).filter(Boolean).slice(0, 6);
}

function isPrivate(item) {
  return privatePattern.test(JSON.stringify(item));
}

function reportItem(item, sectionType) {
  if (!item || isPrivate(item)) return null;
  const title = text(item.title || item.label, 160);
  if (!title) return null;

  const itemUrl = publicUrl(item.url);
  const itemTopics = topics(item);
  const itemScore = score(item);
  return {
    title,
    ...(item.source ? { source: text(item.source, 48) } : sectionType === 'signals' ? { source: 'IntelHub' } : {}),
    ...(item.summary || item.reason ? { summary: text(item.summary || item.reason, 300) } : {}),
    ...(itemUrl ? { url: itemUrl } : {}),
    ...(itemTopics.length ? { topics: itemTopics } : {}),
    ...(itemScore ? { score: itemScore } : {}),
  };
}

function unique(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.url || ''}::${item.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sections(report) {
  return (Array.isArray(report.sections) ? report.sections : [])
    .map((section) => {
      const type = text(section.type || 'intel', 32);
      const items = unique(
        (Array.isArray(section.items) ? section.items : [])
          .map((item) => reportItem(item, type))
          .filter(Boolean),
      ).slice(0, sectionLimit);
      return { type, items };
    })
    .filter((section) => section.items.length);
}

function localDate(value, fallback) {
  const match = String(value || '').match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (!match) return fallback || '';
  const [, year, month, day] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function repoPath(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function indexEntry(report, file) {
  const date = text(report?.report_date, 16);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const stats = report.stats && typeof report.stats === 'object' ? report.stats : {};
  return {
    date,
    path: repoPath(file),
    updated_at: text(report.updated_at || report.generated_at, 40),
    updated_local: text(report.updated_local, 40),
    collected: Number(stats.collected ?? 0),
    new_items: Number(stats.new_items ?? 0),
    source_count: Number(stats.source_count ?? 0),
    report_items: Number(stats.report_items ?? stats.public_items ?? 0),
  };
}

function readReportQuiet(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function writeReportIndex(latestReport, latestArchivePath) {
  const byDate = new Map();
  if (fs.existsSync(archiveDir)) {
    for (const name of fs.readdirSync(archiveDir)) {
      if (!/^\d{4}-\d{2}-\d{2}\.json$/.test(name)) continue;
      const file = path.join(archiveDir, name);
      const entry = indexEntry(readReportQuiet(file), file);
      if (entry) byDate.set(entry.date, entry);
    }
  }

  const latestEntry = indexEntry(latestReport, latestArchivePath);
  if (latestEntry) byDate.set(latestEntry.date, latestEntry);

  const reports = [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));
  const index = {
    version: 1,
    latest_date: latestEntry?.date || reports[0]?.date || '',
    generated_at: latestReport.generated_at,
    reports,
  };

  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  return reports.length;
}

function digestSummary(reportSections, stats, itemCount) {
  const priority = ['alerts', 'signals', 'intel', 'trends'];
  const ordered = [...reportSections].sort((a, b) => priority.indexOf(a.type) - priority.indexOf(b.type));
  const titles = [];
  for (const section of ordered) {
    for (const item of section.items) {
      if (titles.length >= 5) break;
      titles.push(item.title.replace(/^[^\p{L}\p{N}]+/u, ''));
    }
    if (titles.length >= 5) break;
  }
  const lead = `本期共采集 ${Number(stats.totalToday ?? stats.total ?? 0)} 条信息，整理出 ${itemCount} 条日报摘录。`;
  return titles.length ? `${lead}重点包括：${titles.join('；')}。` : lead;
}

const source = readJson(sourcePath);
const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
const sourceStats = stats.sources && typeof stats.sources === 'object' ? stats.sources : {};
const reportSections = sections(source);
const itemCount = reportSections.reduce((sum, section) => sum + section.items.length, 0);
const meta = source.meta && typeof source.meta === 'object' ? source.meta : {};
const sourceTimestamp = text(meta.timestamp, 40);

const dailyReport = {
  version: 1,
  generated_at: sourceTimestamp || new Date().toISOString(),
  report_date: localDate(meta.dateLocal, meta.dateKey) || new Date().toISOString().slice(0, 10),
  updated_at: sourceTimestamp,
  updated_local: text(meta.dateLocal, 40),
  digest: {
    summary: digestSummary(reportSections, stats, itemCount),
  },
  stats: {
    collected: Number(stats.totalToday ?? stats.total ?? 0),
    new_items: Number(stats.new ?? stats.totalToday ?? 0),
    source_count: Object.keys(sourceStats).length,
    report_items: itemCount,
    errors: Number(stats.errors ?? 0),
  },
  sections: reportSections,
};

const archivePath = path.join(archiveDir, `${dailyReport.report_date}.json`);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(dailyReport, null, 2)}\n`);
fs.mkdirSync(archiveDir, { recursive: true });
fs.writeFileSync(archivePath, `${JSON.stringify(dailyReport, null, 2)}\n`);
const archiveCount = writeReportIndex(dailyReport, archivePath);

console.log(
  `Updated ${repoPath(outputPath)}, ${repoPath(archivePath)}, and ${repoPath(indexPath)} with ${itemCount} IntelHub daily report items across ${archiveCount} archived reports`,
);
