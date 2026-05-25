# Adgai Site (Public)

Adgai 公开个人网站。纯静态 HTML/CSS/JS，托管于 GitHub Pages。

**URL：** `https://adgai115.github.io/adgai-site-public/`

## 架构

```
私有运行数据 → 白名单导出 → public_snapshot.json → 静态站渲染
```

站点不直接访问任何私有数据源。所有内容来自 `data/public_snapshot.json`，该文件经白名单脱敏后生成。

## 页面

- `index.html` — 主页（Hero 视频、3D 轨道项目展示、笔记时间线、近况、关于）
- `projects/resource-console.html` — OpenClaw Resource Console 项目页
- `projects/intelhub.html` — IntelHub 项目页
- `projects/knowledge-automation.html` — Knowledge Automation 项目页

## 本地预览

```powershell
npm run serve
```

默认监听 `0.0.0.0:8080`，可通过 `HOST` / `PORT` 环境变量修改。

## 部署前检查

```powershell
npm run check
```

验证快照完整性、路径正确性、域名一致性、SEO 元标签、robots/sitemap 存在性。

## IntelHub 日报自动更新

公开站不会直接读取本机 IntelHub 运行目录。每天 IntelHub 本地日报生成后，由计划任务刷新最新日报、日期归档和索引，并在内容变化时自动提交推送到 GitHub Pages 仓库。

- `data/intelhub_daily_report.json`：最新日报
- `data/intelhub_daily_reports/YYYY-MM-DD.json`：按日期保留的历史日报
- `data/intelhub_daily_index.json`：公开页日期/时间轴索引

手动刷新并发布：

```powershell
npm run publish:intelhub-report
```

安装 Windows 计划任务（每天 07:15）：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/install-intelhub-daily-task.ps1 -At 07:15
```

任务日志写入本地 `logs/intelhub-daily-publish.log`，该目录不会提交到仓库。

## 技术栈

- 零框架、零 npm 依赖
- 原生 JS 数据驱动渲染（`site.js`）
- Canvas 背景动画（粒子、数据雨、光条、网格）
- CSS 3D 轨道布局（`perspective` + `rotateX`）
- 双语国际化（中文默认，英文可选，`localStorage` 持久化）
- Intersection Observer 滚动触发动画
- `prefers-reduced-motion` 无障碍支持

## 目录

```
index.html              主页（单页）
assets/
  site.js               前端逻辑 + i18n
  styles.css            样式（1360+ 行）
  hero-demo.mp4         Hero 背景视频
  resource-workbench.png OG 图片
data/
  public_snapshot.json  脱敏数据源
  intelhub_daily_report.json  IntelHub 最新日报
  intelhub_daily_index.json   IntelHub 日报归档索引
  intelhub_daily_reports/     IntelHub 历史日报
projects/
  resource-console.html
  intelhub.html
  knowledge-automation.html
scripts/
  check-public-site.mjs 部署前检查
  update-intelhub-daily-report.mjs 生成 IntelHub 日报公开数据
  publish-intelhub-daily-report.ps1 刷新、提交并推送日报
  install-intelhub-daily-task.ps1 安装 07:15 自动发布计划任务
server.mjs              本地开发服务器
```
