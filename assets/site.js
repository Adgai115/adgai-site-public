/* ═══════════════════════════════════════════
   Adgai Public Site — Pure JS
   i18n + public snapshot + IntelHub archive
   ═══════════════════════════════════════════ */

// ── i18n ───────────────────────────────────

const LANGUAGES = ['zh-CN', 'en'];
const DEFAULT_LANGUAGE = 'zh-CN';

const COPY = {
  'zh-CN': {
    pageTitles: {
      home: 'Adgai - AI 系统与知识自动化',
      'project-resource-console': 'AI 资源工作台 - Adgai',
      'project-intelhub': 'IntelHub 日报 - Adgai',
      'project-knowledge-automation': '知识自动化 - Adgai',
    },
    description: 'Adgai 构建本地优先的 AI 系统、资源编排工具和知识自动化工作流。',
    nav: { projects:'项目', notes:'输出', now:'方法', about:'关于', home:'首页', menu:'菜单', skip:'跳到主要内容' },
    home: {
      status:'系统持续运行中',
      heroEyebrow:'本地优先的 AI 系统构建者',
      heroTitle:'把复杂的<br><span class="hero-highlight">AI 系统</span><br><span class="hero-line">做成长期资产。</span>',
      heroLead:'我设计资源编排、信息采集与知识发布系统，让私人工作在本地安全运行，并持续沉淀为可复用、可公开的成果。',
      viewProjects:'查看系统', latestReport:'阅读最新日报',
      principleLocal:'运行默认留在本地', principlePublic:'成果经过审核再公开',
      systemLabel:'公开系统切片',
      collectTitle:'采集', collectText:'本地工具与信息源',
      processTitle:'编排', processText:'筛选、自动化、审核',
      publishTitle:'发布', publishText:'脱敏后的公开成果',
    },
    metrics: {
      projects:'活跃项目', notes:'公开文章', reports:'日报归档', console:'资源后台', updated:'最新更新',
      localOnly:'仅本地', snapshotMissing:'快照缺失',
    },
    projects: { eyebrow:'Selected systems / 核心系统', title:'不是 Demo，<br>是持续运行的系统。', intro:'从模型与工具的统一调度，到每日信息筛选，再到知识发布门禁——这些项目组成一条完整的本地优先工作流。', loading:'正在读取项目...' },
    projectOrbit: { core:'数据球', snapshot:'脱敏快照', projects:'项目', notes:'文章', console:'资源', updated:'更新', open:'查看系统' },
    notes: { eyebrow:'Public output / 持续发布', title:'系统每天都在<br>留下新的证据。', intro:'公开页面只接收通过白名单、脱敏与发布检查的内容。最新日报是这条流水线最直接的输出。', empty:'暂时无法读取公开输出。', emptyDesc:'日报和文章会在通过白名单与安全检查后发布。' },
    output: {
      kicker:'IntelHub · 最新日报', title:'每日信息筛选正在持续运行',
      description:'把多来源信息压缩成一分钟可以扫读的公开摘要，并保留按日期浏览的完整归档。',
      archive:'归档', collected:'采集', selected:'入选', sources:'来源', open:'阅读最新日报', loading:'正在读取最新公开输出...'
    },
    now: {
      eyebrow:'Operating model / 工作方法', title:'私有运行，<br>公开交付。', focusLabel:'CURRENT FOCUS', pipelineLabel:'PUBLISHING PIPELINE',
      focus:[
        {title:'AI 资源编排',desc:'构建可复用的资源编排能力'},
        {title:'本地优先的个人知识系统',desc:'让知识沉淀在自己掌控的系统里'},
        {title:'私有到公开的自动化流程',desc:'把私人工作转化为公开成果'},
      ],
      policyTitle:'以私有为默认的发布流程',
      policyText:'私有采集器可以读取本地运行数据。公开站只接收经过字段白名单、脱敏和发布扫描后的摘要。',
      privateData:'私有数据', privateSub:'本地运行与采集',
      sanitize:'白名单脱敏', sanitizeSub:'字段过滤 + 安全扫描',
      publicSite:'公开站点', publicSub:'脱敏后自动发布',
    },
    security: {
      originTitle:'独立来源', originText:'公开内容放在公开域名；私有操作留在本机、VPN 或身份网关保护的子域名。',
      allowlistTitle:'白名单导出', allowlistText:'公开数据只从小范围字段白名单生成。本站不会直接读取 OpenClaw 原始数据。',
      scanTitle:'发布扫描', scanText:'自动检查会在部署前拦截本地路径、原始会话、日志、凭据和其他敏感字符串。',
    },
    about: {
      eyebrow:'About / 关于', title:'关于 Adgai', connect:'// 连接', rss:'RSS 订阅',
      statement:'我不关心让 AI 看起来聪明。<br>我更想把它变成<br><span>可靠、可控、可积累</span><br>的长期基础设施。',
      text:'<p>Adgai 是一个本地优先的 AI 系统构建者，专注于资源编排、个人知识自动化和智能工作流。</p><p>这里展示的不是实时后台，而是经过筛选、脱敏和审核后的公开成果。</p>',
    },
    projectPages: {
      resource: {
        eyebrow:'项目', title:'AI 资源工作台',
        lead:'面向 AI 模型、工具、计划任务和知识产出的本地优先运行工作台。公开版本只描述方法，不暴露私有资源状态。',
        principlesTitle:'原则', principlesText:'运行数据保留在本地，只导出审核后的摘要，并显式展示采集的新鲜度。',
        boundaryTitle:'公开边界', boundaryText:'这个项目页不会展示实时进程数、私有路径、日志或原始自动化输出。',
      },
      intelhub: {
        eyebrow:'Daily Digest · 日报', title:'IntelHub 日报',
        lead:'每天 1 分钟，扫读 IntelHub 最新一次信息采集结果。',
        reportTitle:'最新信息采集日报',
        historyReportTitle:'历史信息采集日报',
        reportLoading:'正在读取最新日报...',
        reportEmpty:'当前没有可展示的日报条目。',
        reportUpdated:'更新时间',
        reportCollected:'采集条目',
        reportNew:'新增条目',
        reportPublic:'日报条目',
        reportSources:'来源池',
        reportOpen:'打开来源',
        reportArchive:'日报归档',
        reportArchiveHint:'点击日期查看历史日报',
        latest:'最新',
        reading:'阅读中',
        calendarReportsUnit:'期',
        contents:'目录',
        excerptTitle:'本期摘录',
        itemsUnit:'条',
        sectionAlerts:'告警',
        sectionSignals:'变化信号',
        sectionIntel:'今日情报',
        sectionTrends:'趋势',
      },
      knowledge: {
        eyebrow:'项目', title:'知识自动化',
        lead:'通过明确发布门禁，把审核后的私人笔记提升为公开页面的发布流水线。',
        disciplineTitle:'发布纪律', disciplineText:'私人笔记需要可见性标签、审核标记、白名单导出和扫描，才能成为公开成果。',
      },
    },
    footer: {
      note:'公开站由脱敏数据生成。', tagline:'把私人工作沉淀成公开成果的个人 AI 基础设施。',
      nav:'导航', resources:'系统', connect:'连接', rss:'RSS', sitemap:'站点地图', resourceConsole:'AI 资源工作台', knowledgeAuto:'知识自动化',
    },
    status: { 'private alpha':'私有 Alpha', active:'活跃', building:'建设中' },
    metricLabels: {
      '主题':'主题', '节点':'节点', '流程':'流程',
      '订阅源':'订阅源', '简报':'简报', '状态':'状态', '运行中':'运行中',
      '文章':'文章', '更新':'更新', '每周':'每周',
    },
    tags: {
      'OpenClaw':'OpenClaw', '教程':'教程', 'AI':'AI', '测评':'测评', '知识管理':'知识管理', '设计':'设计',
    },
    projectCopy: {
      'openclaw-resource-console':{name:'AI 资源工作台',summary:'面向 AI 模型、工具、任务和知识产出的本地优先运行工作台。',meta:'模型 · 工具 · 任务'},
      intelhub:{name:'IntelHub',summary:'从多来源信息中筛选信号，生成可按日期浏览的每日摘要。',meta:'采集 · 筛选 · 日报'},
      'knowledge-automation':{name:'知识自动化',summary:'把审核后的私人笔记提升为公开成果的发布流水线。',meta:'审核 · 脱敏 · 发布'},
    },
  },
  en: {
    pageTitles: {
      home: 'Adgai - AI Systems & Knowledge Automation',
      'project-resource-console': 'AI Resource Console - Adgai',
      'project-intelhub': 'IntelHub Daily - Adgai',
      'project-knowledge-automation': 'Knowledge Automation - Adgai',
    },
    description: 'Adgai builds local-first AI systems, resource orchestration tools, and knowledge automation workflows.',
    nav: { projects:'Projects', notes:'Output', now:'Method', about:'About', home:'Home', menu:'Menu', skip:'Skip to main content' },
    home: {
      status:'Systems running continuously',
      heroEyebrow:'Local-first AI systems builder',
      heroTitle:'Turn complex<br><span class="hero-highlight">AI systems</span><br><span class="hero-line">into durable assets.</span>',
      heroLead:'I design resource orchestration, information collection, and knowledge publishing systems—keeping private work safely local while turning it into reusable public outcomes.',
      viewProjects:'View systems', latestReport:'Read latest daily',
      principleLocal:'Operations stay local by default', principlePublic:'Outcomes ship after review',
      systemLabel:'Public system slice',
      collectTitle:'Collect', collectText:'Local tools and sources',
      processTitle:'Orchestrate', processText:'Filter, automate, review',
      publishTitle:'Publish', publishText:'Sanitized public output',
    },
    metrics: {
      projects:'Active Projects', notes:'Public Notes', reports:'Daily Archive', console:'Console', updated:'Latest Update',
      localOnly:'local-only', snapshotMissing:'snapshot missing',
    },
    projects: { eyebrow:'Selected systems', title:'Not demos.<br>Systems that keep running.', intro:'From model and tool orchestration to daily signal filtering and publishing gates, these projects form one complete local-first workflow.', loading:'Loading systems...' },
    projectOrbit: { core:'Data Sphere', snapshot:'Sanitized Snapshot', projects:'Projects', notes:'Notes', console:'Resource', updated:'Updated', open:'View system' },
    notes: { eyebrow:'Public output', title:'Every day, the system<br>leaves new evidence.', intro:'Only content that passes allowlist, sanitization, and release checks reaches this public surface. The daily report is the clearest output of that pipeline.', empty:'Public output is temporarily unavailable.', emptyDesc:'Daily reports and notes are published after allowlist and security checks.' },
    output: {
      kicker:'IntelHub · Latest Daily', title:'Daily signal filtering, continuously running',
      description:'Multiple information sources are compressed into a one-minute public digest, with a complete date-based archive.',
      archive:'Archive', collected:'Collected', selected:'Selected', sources:'Sources', open:'Read latest daily', loading:'Loading latest public output...'
    },
    now: {
      eyebrow:'Operating model', title:'Private operations.<br>Public delivery.', focusLabel:'CURRENT FOCUS', pipelineLabel:'PUBLISHING PIPELINE',
      focus:[
        {title:'AI Resource Orchestration',desc:'Building reusable resource orchestration capabilities'},
        {title:'Local-first Knowledge Systems',desc:'Knowledge that stays within your own infrastructure'},
        {title:'Private-to-Public Automation',desc:'Turning private work into public artifacts'},
      ],
      policyTitle:'Private-by-design Publishing',
      policyText:'Private collectors can read local operational data. The public site receives only an allowlisted summary after redaction and release scanning.',
      privateData:'Private Data', privateSub:'Local collection & runtime',
      sanitize:'Allowlist Export', sanitizeSub:'Field filtering + security scan',
      publicSite:'Public Site', publicSub:'Auto-published after sanitizing',
    },
    security: {
      originTitle:'Separate Origins', originText:'Public content belongs on the public domain. Private operations belong on localhost, VPN, or an identity-aware subdomain.',
      allowlistTitle:'Allowlist Exports', allowlistText:'Public data is generated from a small field allowlist. Raw OpenClaw data is never read by this site.',
      scanTitle:'Release Scanning', scanText:'Automated checks block local paths, raw sessions, logs, credentials, and other sensitive strings before deployment.',
    },
    about: {
      eyebrow:'About', title:'About Adgai', connect:'// Connect', rss:'RSS Feed',
      statement:'I care less about making AI look smart.<br>I want infrastructure that is<br><span>reliable and controllable,</span><br><span>designed to compound.</span>',
      text:'<p>Adgai is a local-first AI systems builder focused on resource orchestration, personal knowledge automation, and intelligent workflows.</p><p>This is not a live operations console. It is a curated public surface for outcomes that have passed review and sanitization.</p>',
    },
    projectPages: {
      resource: {
        eyebrow:'Project', title:'AI Resource Console',
        lead:'A local-first operations surface for AI models, tools, scheduled tasks, and knowledge output. The public version describes the methodology without exposing private resource state.',
        principlesTitle:'Principles', principlesText:'Operational data stays local. Only reviewed summaries are exported, with collection freshness displayed explicitly.',
        boundaryTitle:'Public Boundary', boundaryText:'This project page does not display live process counts, private paths, logs, or raw automation output.',
      },
      intelhub: {
        eyebrow:'Daily Digest', title:'IntelHub Daily',
        lead:'A one-minute skim of the latest IntelHub information collection report.',
        reportTitle:'Latest Collection Daily Report',
        historyReportTitle:'Collection Daily Report Archive',
        reportLoading:'Loading latest daily report...',
        reportEmpty:'No daily report items are available yet.',
        reportUpdated:'Updated',
        reportCollected:'Collected',
        reportNew:'New',
        reportPublic:'Report items',
        reportSources:'Source pool',
        reportOpen:'Open source',
        reportArchive:'Archive',
        reportArchiveHint:'Select a date to read older reports',
        latest:'Latest',
        reading:'Reading',
        calendarReportsUnit:'reports',
        contents:'Contents',
        excerptTitle:'Excerpts',
        itemsUnit:'items',
        sectionAlerts:'Alerts',
        sectionSignals:'Change Signals',
        sectionIntel:'Daily Intelligence',
        sectionTrends:'Trends',
      },
      knowledge: {
        eyebrow:'Project', title:'Knowledge Automation',
        lead:'A publishing pipeline that promotes reviewed private notes into public pages through explicit publishing gates.',
        disciplineTitle:'Publishing Discipline', disciplineText:'Private notes require visibility tags, review flags, allowlist export, and scanning before becoming public artifacts.',
      },
    },
    footer: {
      note:'Public site generated from sanitized data.', tagline:'Personal AI infrastructure that turns private work into public artifacts.',
      nav:'Navigation', resources:'Systems', connect:'Connect', rss:'RSS', sitemap:'Sitemap', resourceConsole:'AI Resource Console', knowledgeAuto:'Knowledge Automation',
    },
    status: { 'private alpha':'private alpha', active:'active', building:'building' },
    metricLabels: {
      '主题':'Topics', '节点':'Nodes', '流程':'Flows',
      '订阅源':'Sources', '简报':'Briefing', '状态':'Status', '运行中':'Running',
      '文章':'Articles', '更新':'Updated', '每周':'Weekly',
    },
    tags: {
      'OpenClaw':'OpenClaw', '教程':'Tutorial', 'AI':'AI', '测评':'Review', '知识管理':'Knowledge Mgmt', '设计':'Design',
    },
    projectCopy: {
      'openclaw-resource-console':{name:'AI Resource Console',summary:'A local-first operations surface for AI models, tools, tasks, and knowledge output.',meta:'Models · Tools · Tasks'},
      intelhub:{name:'IntelHub',summary:'Filters signals from multiple sources into a daily, date-browsable digest.',meta:'Collect · Filter · Brief'},
      'knowledge-automation':{name:'Knowledge Automation',summary:'A publishing pipeline that promotes reviewed private notes into public artifacts.',meta:'Review · Sanitize · Publish'},
    },
  },
};

let snapshotData = null;
let homeOutputData = null;
let intelHubReportData = null;
let intelHubReportIndex = null;
let intelHubSelectedDate = null;
const intelHubReportCache = new Map();
let revealObserver = null;

function getNested(o, k) { return k.split('.').reduce((c,p)=>c?.[p], o); }
function esc(v) { return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;'); }
function safeUrl(v) {
  if (typeof v !== 'string') return '';
  if (v.startsWith('/projects/')) return v.slice(1);
  return v.startsWith('projects/') ? v : '';
}

function pageDescription(c, page) {
  if (page === 'project-resource-console') return c.projectPages.resource.lead;
  if (page === 'project-intelhub') return c.projectPages.intelhub.lead;
  if (page === 'project-knowledge-automation') return c.projectPages.knowledge.lead;
  return c.description;
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute('content', value);
}

function getLanguage() {
  const p = new URLSearchParams(location.search);
  const req = p.get('lang');
  if (LANGUAGES.includes(req)) { localStorage.setItem('adgai-lang', req); return req; }
  const s = localStorage.getItem('adgai-lang');
  return LANGUAGES.includes(s) ? s : DEFAULT_LANGUAGE;
}

function setLanguage(lang) {
  localStorage.setItem('adgai-lang', lang);
  applyLanguage(lang);
}

function applyStaticTranslations(lang) {
  const c = COPY[lang];
  const page = document.body.dataset.page || 'home';
  const pageTitle = c.pageTitles[page] || c.pageTitles.home;
  const description = pageDescription(c, page);
  document.documentElement.lang = lang;
  document.title = pageTitle;

  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', pageTitle);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[name="twitter:title"]', pageTitle);
  setMeta('meta[name="twitter:description"]', description);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = getNested(c, el.dataset.i18n);
    if (typeof v === 'string') el.textContent = v;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = getNested(c, el.dataset.i18nHtml);
    if (typeof v === 'string') el.innerHTML = v;
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = getNested(c, el.dataset.i18nTitle);
    if (typeof v === 'string') el.setAttribute('title', v);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const v = getNested(c, el.dataset.i18nAriaLabel);
    if (typeof v === 'string') el.setAttribute('aria-label', v);
  });

  document.querySelectorAll('[data-lang-option]').forEach(btn => {
    const active = btn.dataset.langOption === lang;
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.classList.toggle('active', active);
  });
}

function localizeStatus(v, lang) {
  const key = String(v || 'active').toLowerCase();
  return COPY[lang].status[key] || v || COPY[lang].status.active;
}

function localizeConsole(v, lang) {
  return String(v).toLowerCase() === 'local-only' ? COPY[lang].metrics.localOnly : (v || COPY[lang].metrics.localOnly);
}

function localizeMetricLabel(key, lang) {
  return COPY[lang].metricLabels[key] || key;
}

function localizeTag(tag, lang) {
  return COPY[lang].tags[tag] || tag;
}

// ── Snapshot Rendering ────────────────────

function renderMetrics(snap, lang) {
  const m = snap?.public_metrics || {};
  setMetric('project_count', m.project_count ?? '-');
  setMetric('report_count', '-');
  setMetric('resource_console_status', localizeConsole(m.resource_console_status, lang));
  setMetric('last_public_update', m.last_public_update || '-');
}

function setMetric(name, val) {
  document.querySelectorAll('[data-metric="' + name + '"]').forEach(n => { n.textContent = val; });
}

function renderProjects(projects, lang) {
  const target = document.querySelector('[data-projects]');
  if (!target || !Array.isArray(projects) || projects.length === 0) return;
  const orbit = COPY[lang].projectOrbit;

  var iconSVGs = [
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>',
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>',
  ];

  function statusColor(status) {
    var s = String(status || '').toLowerCase();
    if (s.includes('alpha') || s.includes('beta')) return 'badge-orange';
    if (s.includes('active') || s.includes('活跃') || s.includes('online')) return 'badge-green';
    if (s.includes('building') || s.includes('开发') || s.includes('建设')) return 'badge-purple';
    return 'badge-gray';
  }

  const cards = projects.map((proj, i) => {
    const copy = COPY[lang].projectCopy[proj.slug] || {};
    const name = copy.name || proj.name || '';
    const desc = copy.summary || proj.summary || '';
    const meta = copy.meta || '';
    const href = safeUrl(proj.public_url);
    const cardClass = 'project-tile project-tile-' + (i + 1) + (i === 0 ? ' project-tile-featured' : '');
    const cardInner =
      '<div class="project-tile-top">' +
        '<span class="project-tile-sequence">0' + (i + 1) + ' / SYSTEM</span>' +
        '<span class="card-badge ' + statusColor(proj.status) + '">' + esc(localizeStatus(proj.status, lang)) + '</span>' +
      '</div>' +
      '<div class="project-tile-visual" aria-hidden="true">' +
        '<span class="project-tile-icon">' + (iconSVGs[i] || iconSVGs[0]) + '</span>' +
        '<i></i><i></i><i></i>' +
      '</div>' +
      '<div class="project-tile-copy">' +
        '<h3>' + esc(name) + '</h3>' +
        '<p>' + esc(desc) + '</p>' +
      '</div>' +
      '<div class="project-tile-footer">' +
        '<span>' + esc(meta) + '</span>' +
        '<strong>' + esc(orbit.open) + ' <i aria-hidden="true">↗</i></strong>' +
      '</div>';

    return href
      ? '<a class="' + cardClass + ' fade-up is-visible" data-project-index="' + (i + 1) + '" href="' + esc(href) + '" aria-label="' + esc(orbit.open + ': ' + name) + '">' + cardInner + '</a>'
      : '<article class="' + cardClass + ' fade-up is-visible" data-project-index="' + (i + 1) + '">' + cardInner + '</article>';
  }).join('');

  target.innerHTML = '<div class="project-showcase">' + cards + '</div>';
  revealElements(target);
}

function renderHomeOutput(state, lang) {
  const target = document.querySelector('[data-notes]');
  if (!target || !state?.report) return false;
  const report = state.report;
  const index = state.index || {};
  const stats = report.stats || {};
  const archiveCount = Array.isArray(index.reports) ? index.reports.length : 1;
  const reportDate = report.report_date || index.latest_date || '';
  const copy = COPY[lang].output;
  const href = 'projects/intelhub.html' + (validReportDate(reportDate) ? '?date=' + encodeURIComponent(reportDate) : '');

  setMetric('report_count', archiveCount);
  if (reportDate) setMetric('last_public_update', reportDate);

  target.innerHTML =
    '<a class="output-feature fade-up is-visible" href="' + esc(href) + '" aria-label="' + esc(copy.open + ': ' + copy.title) + '">' +
      '<div class="output-feature-copy">' +
        '<span class="output-kicker">' + esc(copy.kicker) + ' · ' + esc(formatReportDate(reportDate, lang)) + '</span>' +
        '<h3>' + esc(copy.title) + '</h3>' +
        '<p>' + esc(copy.description) + '</p>' +
        '<strong class="output-open">' + esc(copy.open) + ' <span aria-hidden="true">→</span></strong>' +
      '</div>' +
      '<div class="output-stats" aria-label="' + esc(copy.kicker) + '">' +
        '<div><strong>' + esc(archiveCount) + '</strong><span>' + esc(copy.archive) + '</span></div>' +
        '<div><strong>' + esc(stats.collected ?? '-') + '</strong><span>' + esc(copy.collected) + '</span></div>' +
        '<div><strong>' + esc(stats.report_items ?? '-') + '</strong><span>' + esc(copy.selected) + '</span></div>' +
        '<div><strong>' + esc(stats.source_count ?? '-') + '</strong><span>' + esc(copy.sources) + '</span></div>' +
      '</div>' +
    '</a>';
  revealElements(target);
  return true;
}

function renderNotes(notes, lang) {
  const target = document.querySelector('[data-notes]');
  if (!target) return;

  if (!Array.isArray(notes) || notes.length === 0) {
    if (homeOutputData && renderHomeOutput(homeOutputData, lang)) return;
    if (homeOutputData === null && document.body.dataset.page === 'home') {
      target.innerHTML = '<div class="notes-empty output-loading"><p>' + esc(COPY[lang].output.loading) + '</p></div>';
      return;
    }
    target.innerHTML = '<div class="notes-empty">' +
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:.4;margin-bottom:12px;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
      '<p style="font-size:15px;margin:0 0 6px;">' + esc(COPY[lang].notes.empty) + '</p>' +
      '<p style="font-size:13px;color:var(--faint);margin:0;">' + esc(COPY[lang].notes.emptyDesc) + '</p>' +
    '</div>';
    return;
  }

  target.innerHTML = notes.map((n, i) =>
    '<div class="note-row fade-up is-visible" style="transition-delay:' + (i * 60) + 'ms">' +
      '<span class="note-date">' + esc(n.date || '') + '</span>' +
      '<div class="note-body"><strong>' + esc(n.title || '') + '</strong><p>' + esc(n.summary || '') + '</p></div>' +
      '<span class="note-tag">' + esc(localizeTag((n.tags || [])[0] || '', lang)) + '</span>' +
    '</div>'
  ).join('');
  revealElements(target);
}

// ── IntelHub Daily Report ────────────────

function reportSectionLabel(type, lang) {
  const labels = COPY[lang].projectPages.intelhub;
  const map = {
    alerts: labels.sectionAlerts,
    signals: labels.sectionSignals,
    intel: labels.sectionIntel,
    trends: labels.sectionTrends,
  };
  return map[type] || type;
}

function renderScore(score) {
  if (!score || typeof score !== 'object') return '';
  const pairs = [
    ['Q', score.quality],
    ['R', score.relevance],
    ['P', score.personal],
    ['O', score.opportunity],
  ].filter(function(pair) { return Number.isFinite(Number(pair[1])); });
  if (!pairs.length) return '';
  return '<span class="report-item-score">' + pairs.map(function(pair) {
    return '<span>' + esc(pair[0]) + ' ' + esc(pair[1]) + '</span>';
  }).join('') + '</span>';
}

function reportSectionId(type) {
  return 'daily-' + String(type || 'section').replace(/[^a-z0-9_-]/gi, '').toLowerCase();
}

function formatReportDate(value, lang) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value || '-';
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en', { month:'short', day:'numeric', year:'numeric' }).format(new Date(Date.UTC(year, month - 1, day)));
  }
  return month + '月' + day + '日';
}

function formatReportMonth(value, lang) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})$/);
  if (!match) return value || '-';
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en', { month:'long', year:'numeric' }).format(new Date(Date.UTC(year, month - 1, 1)));
  }
  return year + '年' + month + '月';
}

function validReportDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
}

function normalizeReportEntries(index, report) {
  const byDate = new Map();
  const reports = Array.isArray(index?.reports) ? index.reports : [];
  reports.forEach(function(entry) {
    if (!validReportDate(entry?.date)) return;
    byDate.set(entry.date, {
      date: entry.date,
      path: typeof entry.path === 'string' ? entry.path : '',
      report_items: Number(entry.report_items || 0),
      collected: Number(entry.collected || 0),
      updated_local: entry.updated_local || '',
    });
  });

  if (validReportDate(report?.report_date) && !byDate.has(report.report_date)) {
    const stats = report.stats || {};
    byDate.set(report.report_date, {
      date: report.report_date,
      path: 'data/intelhub_daily_report.json',
      report_items: Number(stats.report_items || stats.public_items || 0),
      collected: Number(stats.collected || 0),
      updated_local: report.updated_local || '',
    });
  }

  return Array.from(byDate.values()).sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });
}

function safeReportPath(value) {
  const path = String(value || '');
  if (path === 'data/intelhub_daily_report.json') return path;
  if (/^data\/intelhub_daily_reports\/\d{4}-\d{2}-\d{2}\.json$/.test(path)) return path;
  return '';
}

function requestedReportDate() {
  const date = new URLSearchParams(location.search).get('date');
  return validReportDate(date) ? date : '';
}

function reportDateHref(date) {
  const params = new URLSearchParams(location.search);
  params.set('date', date);
  return '?' + params.toString() + '#daily-report-top';
}

function intelHubDataBase() {
  return (document.body.dataset.page || '') === 'home' ? '' : '../';
}

function cacheIntelHubReport(report) {
  if (validReportDate(report?.report_date)) {
    intelHubReportCache.set(report.report_date, report);
  }
}

function resolveReportEntry(index, date) {
  const entries = normalizeReportEntries(index, null);
  return {
    entries,
    selectedEntry:
      (date ? entries.find(function(entry) { return entry.date === date; }) : null) ||
      (index?.latest_date ? entries.find(function(entry) { return entry.date === index.latest_date; }) : null) ||
      entries[0] ||
      null,
  };
}

function renderReportCalendar(entries, activeDate, latestDate, lang, copy) {
  const entryMap = new Map(entries.map(function(entry) { return [entry.date, entry]; }));
  const months = new Map();
  entries.forEach(function(entry) {
    const key = entry.date.slice(0, 7);
    if (!months.has(key)) months.set(key, []);
    months.get(key).push(entry);
  });

  const weekdays = lang === 'en'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['一', '二', '三', '四', '五', '六', '日'];

  return Array.from(months.keys()).sort(function(a, b) { return b.localeCompare(a); }).map(function(monthKey) {
    const parts = monthKey.match(/^(\d{4})-(\d{2})$/);
    if (!parts) return '';
    const year = Number(parts[1]);
    const month = Number(parts[2]);
    const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const offset = (firstWeekday + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const monthEntries = months.get(monthKey) || [];
    const cells = [];

    for (let i = 0; i < offset; i += 1) {
      cells.push('<span class="daily-calendar-day empty" aria-hidden="true"></span>');
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = monthKey + '-' + String(day).padStart(2, '0');
      const entry = entryMap.get(date);
      if (!entry) {
        cells.push('<span class="daily-calendar-day muted"><span>' + esc(day) + '</span></span>');
        continue;
      }

      const isActive = date === activeDate;
      const isLatest = date === latestDate;
      const badge = isLatest ? copy.latest : isActive ? copy.reading : '';
      const itemCount = Number(entry.report_items || 0);
      const aria = formatReportDate(date, lang) + (itemCount ? ', ' + itemCount + ' ' + copy.itemsUnit : '') + (badge ? ', ' + badge : '');
      cells.push(
        '<a class="daily-calendar-day has-report' + (isActive ? ' active' : '') + (isLatest ? ' latest' : '') + '" href="' +
          esc(isActive ? '#daily-report-top' : reportDateHref(date)) + '"' +
          ' data-report-date="' + esc(date) + '"' +
          (isActive ? ' aria-current="date"' : '') +
          ' aria-label="' + esc(aria) + '">' +
          '<span>' + esc(day) + '</span>' +
          (badge ? '<em>' + esc(badge) + '</em>' : '<i aria-hidden="true"></i>') +
        '</a>',
      );
    }

    return '<section class="daily-calendar-month">' +
      '<div class="daily-calendar-head">' +
        '<strong>' + esc(formatReportMonth(monthKey, lang)) + '</strong>' +
        '<span>' + esc(monthEntries.length) + ' ' + esc(copy.calendarReportsUnit) + '</span>' +
      '</div>' +
      '<div class="daily-calendar-weekdays" aria-hidden="true">' +
        weekdays.map(function(day) { return '<span>' + esc(day) + '</span>'; }).join('') +
      '</div>' +
      '<div class="daily-calendar-grid">' + cells.join('') + '</div>' +
    '</section>';
  }).join('');
}

function syncDailyReportAnchor() {
  if (location.hash !== '#daily-report-top') return;
  const target = document.getElementById('daily-report-top');
  if (!target) return;
  const top = Math.max(target.getBoundingClientRect().top + window.pageYOffset - 80, 0);
  window.scrollTo({ top, behavior:'auto' });
}

function renderIntelHubReport(report, lang, index, selectedDate) {
  const target = document.querySelector('[data-intelhub-report]');
  if (!target) return;

  const copy = COPY[lang].projectPages.intelhub;
  const sections = Array.isArray(report?.sections) ? report.sections : [];
  const visibleSections = sections.filter(function(section) {
    return Array.isArray(section.items) && section.items.length > 0;
  });

  if (!visibleSections.length) {
    target.innerHTML = '<div class="notes-empty">' + esc(copy.reportEmpty) + '</div>';
    return;
  }

  const reportDateLabel = formatReportDate(report.report_date, lang);
  const archiveEntries = normalizeReportEntries(index, report);
  const activeDate = selectedDate || report.report_date;
  const latestDate = index?.latest_date || archiveEntries[0]?.date || report.report_date;
  const titleText = report.report_date === latestDate ? copy.reportTitle : copy.historyReportTitle;
  const stats = report.stats || {};
  const totalItems = stats.report_items ?? stats.public_items ?? visibleSections.reduce(function(sum, section) {
    return sum + section.items.length;
  }, 0);
  const digestSummary = report.digest?.summary ||
    (lang === 'en'
      ? 'The latest IntelHub report is grouped for quick scanning and source-by-source reading.'
      : '最新 IntelHub 日报已按分组整理，便于快速扫读和继续打开来源。');

  const dateRail =
    '<div class="daily-date-rail daily-calendar-rail" aria-label="' + esc(copy.reportArchive) + '">' +
      '<div class="daily-rail-title">' + esc(copy.reportArchive) + '</div>' +
      '<p class="daily-rail-hint">' + esc(copy.reportArchiveHint) + '</p>' +
      '<div class="daily-calendar-stack">' + renderReportCalendar(archiveEntries, activeDate, latestDate, lang, copy) + '</div>' +
    '</div>';

  const sectionNav =
    '<nav class="daily-section-nav" aria-label="' + esc(copy.contents) + '">' +
      '<div class="daily-rail-title">' + esc(copy.contents) + '</div>' +
      visibleSections.map(function(section) {
        return '<a href="#' + esc(reportSectionId(section.type)) + '">' +
          '<span>' + esc(reportSectionLabel(section.type, lang)) + '</span>' +
          '<em>' + esc(section.items.length) + '</em>' +
        '</a>';
      }).join('') +
    '</nav>';

  let itemIndex = 0;
  const sectionHtml = visibleSections.map(function(section) {
    const items = section.items.map(function(item) {
      itemIndex += 1;
      const topics = Array.isArray(item.topics) ? item.topics : [];
      const topicHtml = topics.length
        ? '<div class="report-item-topics">' + topics.map(function(topic) { return '<span>' + esc(topic) + '</span>'; }).join('') + '</div>'
        : '';
      const link = item.url
        ? '<a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' + esc(copy.reportOpen) + '</a>'
        : '';
      return '<article class="intelhub-report-item fade-up">' +
        '<div class="report-item-index">' + esc(String(itemIndex).padStart(2, '0')) + '</div>' +
        '<div class="report-item-main">' +
          '<div class="report-item-meta">' +
            (item.source ? '<span>' + esc(item.source) + '</span>' : '') +
            renderScore(item.score) +
          '</div>' +
          '<h3>' + esc(item.title || '') + '</h3>' +
          (item.summary ? '<p>' + esc(item.summary) + '</p>' : '') +
          topicHtml +
        '</div>' +
        (link ? '<div class="report-item-link">' + link + '</div>' : '') +
      '</article>';
    }).join('');

    return '<section class="intelhub-report-group" id="' + esc(reportSectionId(section.type)) + '">' +
      '<div class="daily-group-head">' +
        '<h3>' + esc(reportSectionLabel(section.type, lang)) + '</h3>' +
        '<span>' + esc(section.items.length) + ' ' + esc(copy.itemsUnit) + '</span>' +
      '</div>' +
      '<div class="intelhub-report-items">' + items + '</div>' +
    '</section>';
  }).join('');

  target.innerHTML =
    '<div class="daily-report-shell">' +
      '<article class="daily-report-body">' +
        '<section class="daily-report-hero fade-up is-visible">' +
          '<div class="daily-report-kicker">Daily Digest</div>' +
          '<h2>' + esc(titleText) + '｜' + esc(reportDateLabel) + '</h2>' +
          '<p>' + esc(digestSummary) + '</p>' +
        '</section>' +
        '<div class="daily-excerpt-head">' +
          '<h3>' + esc(copy.excerptTitle) + ' · ' + esc(totalItems) + ' ' + esc(copy.itemsUnit) + '</h3>' +
        '</div>' +
        '<div class="intelhub-report-list">' + sectionHtml + '</div>' +
      '</article>' +
      '<aside class="daily-report-sidebar">' + dateRail + sectionNav + '</aside>' +
    '</div>';
  revealElements(target);
  syncDailyReportAnchor();
}

async function loadIntelHubReportState(date) {
  const base = intelHubDataBase();
  const latestPath = 'data/intelhub_daily_report.json';
  let index = intelHubReportIndex;
  if (!index) {
    try {
      index = await fetchJson(base + 'data/intelhub_daily_index.json');
    } catch {}
  }

  const resolved = resolveReportEntry(index, validReportDate(date) ? date : '');
  let report = null;
  if (resolved.selectedEntry?.date) {
    report = intelHubReportCache.get(resolved.selectedEntry.date) || null;
  }

  const selectedPath = safeReportPath(resolved.selectedEntry?.path);
  if (!report && selectedPath) {
    try {
      report = await fetchJson(base + selectedPath);
    } catch {}
  }
  if (!report) report = await fetchJson(base + latestPath);
  cacheIntelHubReport(report);

  return {
    report,
    index,
    selectedDate: resolved.selectedEntry?.date || report.report_date,
  };
}

function setIntelHubSwitching(active) {
  const target = document.querySelector('[data-intelhub-report]');
  if (!target) return;
  target.classList.toggle('is-switching', active);
  target.setAttribute('aria-busy', active ? 'true' : 'false');
}

function scrollDailyReportTop(behavior) {
  const target = document.getElementById('daily-report-top');
  if (!target) return;
  const top = Math.max(target.getBoundingClientRect().top + window.pageYOffset - 80, 0);
  window.scrollTo({ top, behavior });
}

async function selectIntelHubReportDate(date, options) {
  const opts = options || {};
  if (!validReportDate(date)) return;
  if (date === intelHubSelectedDate) {
    scrollDailyReportTop('smooth');
    return;
  }

  setIntelHubSwitching(true);
  try {
    const state = await loadIntelHubReportState(date);
    intelHubReportData = state.report;
    intelHubReportIndex = state.index;
    intelHubSelectedDate = state.selectedDate;
    if (opts.pushState) {
      history.pushState({ intelHubDate: state.selectedDate }, '', reportDateHref(state.selectedDate));
    }
    renderIntelHubReport(state.report, getLanguage(), state.index, state.selectedDate);
    scrollDailyReportTop(opts.smooth === false ? 'auto' : 'smooth');
  } finally {
    requestAnimationFrame(function() {
      setIntelHubSwitching(false);
    });
  }
}

function initIntelHubReportNavigation() {
  const target = document.querySelector('[data-intelhub-report]');
  if (!target || target.dataset.navigationBound === 'true') return;
  target.dataset.navigationBound = 'true';
  target.addEventListener('click', function(event) {
    const link = event.target.closest('a[data-report-date]');
    if (!link || !target.contains(link)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const date = link.dataset.reportDate;
    if (!validReportDate(date)) return;
    event.preventDefault();
    if (date === intelHubSelectedDate) {
      scrollDailyReportTop('smooth');
      return;
    }
    link.classList.add('pending');
    selectIntelHubReportDate(date, { pushState:true }).catch(function() {
      location.href = link.href;
    });
  });

  window.addEventListener('popstate', function() {
    const date = requestedReportDate() || intelHubReportIndex?.latest_date || intelHubReportData?.report_date;
    if (validReportDate(date)) {
      selectIntelHubReportDate(date, { pushState:false, smooth:false }).catch(function(){});
    }
  });
}

function renderFocus(lang) {
  const target = document.querySelector('[data-focus]');
  if (!target) return;
  var items = COPY[lang].now.focus;
  target.innerHTML = items.map(function(f, i) {
    return '<li class="focus-item"><span class="focus-number">0' + (i + 1) + '</span>' +
      '<div class="focus-text"><strong>' + esc(f.title) + '</strong><span>' + esc(f.desc) + '</span></div></li>';
  }).join('');
}

function applyLanguage(lang) {
  applyStaticTranslations(lang);
  renderFocus(lang);
  if (snapshotData) {
    renderMetrics(snapshotData, lang);
    renderProjects(snapshotData.featured_projects || [], lang);
    renderNotes(snapshotData.public_notes || [], lang);
  }
  if (intelHubReportData) {
    renderIntelHubReport(intelHubReportData, lang, intelHubReportIndex, intelHubSelectedDate);
  }
}

async function loadSnapshot() {
  const base = (document.body.dataset.page || '') === 'home' ? '' : '../';
  const resp = await fetch(base + 'data/public_snapshot.json', { cache:'no-store' });
  if (!resp.ok) throw new Error('snapshot ' + resp.status);
  return resp.json();
}

async function fetchJson(url) {
  const resp = await fetch(url, { cache:'no-store' });
  if (!resp.ok) throw new Error(url + ' ' + resp.status);
  return resp.json();
}

async function loadHomeOutput() {
  if ((document.body.dataset.page || '') !== 'home') return null;
  const results = await Promise.all([
    fetchJson('data/intelhub_daily_report.json'),
    fetchJson('data/intelhub_daily_index.json'),
  ]);
  return { report:results[0], index:results[1] };
}

async function loadIntelHubReport() {
  if (!document.querySelector('[data-intelhub-report]')) return null;
  return loadIntelHubReportState(requestedReportDate());
}

// ── Loader ─────────────────────────────────

function initLoader() {
  const loader = document.getElementById('siteLoader');
  if (!loader) {
    document.body.classList.add('is-ready');
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    loader.remove();
    document.body.classList.add('is-ready');
    return;
  }

  const hasSeen = sessionStorage.getItem('hasSeenLoader');
  if (hasSeen) {
    loader.remove();
    document.body.classList.add('is-ready');
    return;
  }

  sessionStorage.setItem('hasSeenLoader', 'true');
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.body.classList.add('is-ready');
      loader.classList.add('is-hidden');
      setTimeout(function() { loader.remove(); }, 800);
    }, 900);
  });
}

// ── Canvas Background ──────────────────────

function initBackground() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, raf = 0;
  let particles = [];
  let rainDrops = [];
  let lightStreaks = [];
  const pointer = { x:0, y:0, active:false };
  let lastFrameTime = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mobile = window.innerWidth < 768;
    const count = mobile ? 30 : Math.min(100, Math.floor((width * height) / 18000));
    particles = Array.from({length:count}, function(_, i) { return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r: Math.random() * 1.4 + .3,
      phase: Math.random() * Math.PI * 2,
      band: i % 4,
    };});

    // Data rain: falling 0/1 flowing from hero downward
    var rainCount = mobile ? 25 : Math.min(80, Math.floor(width / 14));
    rainDrops = Array.from({length:rainCount}, function() { return {
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 1.5 + .6,
      size: Math.random() * 7 + 11,
      opacity: Math.random() * .32 + .16,
      char: Math.random() > .5 ? '0' : '1',
      flicker: Math.random() * Math.PI * 2,
    };});

    // Light streaks: fast vertical lines
    var streakCount = mobile ? 15 : Math.min(50, Math.floor(width / 22));
    lightStreaks = Array.from({length:streakCount}, function() { return {
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 3 + 2.5,
      len: Math.random() * 55 + 35,
      opacity: Math.random() * .25 + .10,
      width: Math.random() * 1.6 + .6,
    };});
  }

  function drawGrid(t) {
    ctx.save();
    ctx.globalAlpha = .15;
    ctx.strokeStyle = 'rgba(65,163,167,.20)';
    ctx.lineWidth = 1;
    var gap = 64;
    var offset = (t * .005) % gap;
    for (var x = -gap + offset; x < width + gap; x += gap) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (var y = -gap + offset; y < height + gap; y += gap) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.restore();
  }

  function draw(t) {
    if (window.innerWidth < 768 && t - lastFrameTime < 50) { raf = requestAnimationFrame(draw); return; }
    lastFrameTime = t;
    ctx.clearRect(0, 0, width, height);
    drawGrid(t);

    var h = height * .42;
    var grad = ctx.createRadialGradient(width * .5, h, 10, width * .5, h, width * .65);
    grad.addColorStop(0, 'rgba(65,163,167,.20)');
    grad.addColorStop(.38, 'rgba(65,163,167,.055)');
    grad.addColorStop(1, 'rgba(12,230,162,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(function(p, i) {
      p.x += p.vx + Math.sin(t * .0003 + p.phase) * .035;
      p.y += p.vy + Math.cos(t * .00026 + p.phase) * .03;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      var glow = .3 + Math.sin(t * .0018 + p.phase) * .24;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(77,240,176,' + (.24 + glow * .36) + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140 && p.band === q.band) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(77,240,176,' + ((1 - d / 140) * .12) + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });

    if (pointer.active) {
      var pg = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 280);
      pg.addColorStop(0, 'rgba(65,163,167,.18)');
      pg.addColorStop(.45, 'rgba(65,163,167,.06)');
      pg.addColorStop(1, 'rgba(65,163,167,0)');
      ctx.fillStyle = pg;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw data rain (falling 0/1)
    rainDrops.forEach(function(r) {
      r.y += r.speed;
      if (r.y > height + 20) { r.y = -20; r.x = Math.random() * width; r.char = Math.random() > .5 ? '0' : '1'; }
      var flick = .6 + Math.sin(t * .004 + r.flicker) * .4;
      var alpha = r.opacity * flick;
      if (alpha < .08) return;
      ctx.font = r.size + 'px Consolas,monospace';
      ctx.fillStyle = 'rgba(108,203,207,' + alpha + ')';
      ctx.fillText(r.char, r.x, r.y);
    });

    // Draw light streaks (fast vertical lines)
    lightStreaks.forEach(function(s) {
      s.y += s.speed;
      if (s.y > height + 60) { s.y = -60; s.x = Math.random() * width; }
      var grad = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y);
      grad.addColorStop(0, 'rgba(108,203,207,0)');
      grad.addColorStop(.5, 'rgba(108,203,207,' + (s.opacity * .9) + ')');
      grad.addColorStop(1, 'rgba(155,235,239,' + s.opacity + ')');
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y - s.len);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
    });

    raf = requestAnimationFrame(draw);
  }

  function onMove(e) { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; }
  function onLeave() { pointer.active = false; }

  resize();
  raf = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerleave', onLeave);
}

// ── Scroll-triggered animations ────────────

function revealElements(root) {
  const scope = root || document;
  scope.querySelectorAll('.fade-up:not(.is-visible)').forEach(function(el) {
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  });
}

function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    document.querySelectorAll('.fade-up').forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });

  revealElements(document);
}

// ── Init ───────────────────────────────────

document.querySelectorAll('[data-lang-option]').forEach(function(btn) {
  btn.addEventListener('click', function() { setLanguage(btn.dataset.langOption); });
});

var menuToggle = document.getElementById('menu-toggle');
var primaryNav = document.getElementById('primaryNav');
if (menuToggle) {
  var syncMenuState = function() {
    menuToggle.setAttribute('aria-expanded', menuToggle.checked ? 'true' : 'false');
  };
  menuToggle.addEventListener('change', syncMenuState);
  if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.checked = false;
        syncMenuState();
      });
    });
  }
  syncMenuState();
}

var lang = getLanguage();
applyLanguage(lang);

initLoader();
initBackground();
initScrollReveal();

// Hero video stays muted; unexpected audio on a personal site is a poor default.
var heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.play().catch(function(){});
}

loadSnapshot().then(function(snap) {
  snapshotData = snap;
  applyLanguage(getLanguage());
}).catch(function() {
  setMetric('resource_console_status', COPY[getLanguage()].metrics.snapshotMissing);
});

loadHomeOutput().then(function(state) {
  if (!state) return;
  homeOutputData = state;
  if (snapshotData) renderNotes(snapshotData.public_notes || [], getLanguage());
}).catch(function() {
  homeOutputData = false;
  if (snapshotData) renderNotes(snapshotData.public_notes || [], getLanguage());
});

loadIntelHubReport().then(function(state) {
  if (!state) return;
  intelHubReportData = state.report;
  intelHubReportIndex = state.index;
  intelHubSelectedDate = state.selectedDate;
  cacheIntelHubReport(state.report);
  initIntelHubReportNavigation();
  renderIntelHubReport(state.report, getLanguage(), state.index, state.selectedDate);
}).catch(function() {
  initIntelHubReportNavigation();
  renderIntelHubReport(null, getLanguage(), null, null);
});
