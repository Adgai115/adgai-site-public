# Adgai Site (Public)

Adgai 的公开个人网站。纯静态 HTML/CSS/JS，托管于 GitHub Pages。

**URL：** `https://adgai115.github.io/adgai-site-public/`

## 定位

站点以编辑式作品集呈现本地优先的 AI 系统、资源编排和知识自动化实践。它不是实时控制台：公开内容来自经过审核、字段白名单和脱敏处理的静态快照。

```text
私有运行数据 → 白名单导出 → 发布检查 → 静态公开页面
```

## 页面

- `index.html` — 首页：系统定位、项目、持续输出、工作方法与关于
- `projects/resource-console.html` — AI 资源工作台案例
- `projects/intelhub.html` — IntelHub 最新日报与日期归档
- `projects/knowledge-automation.html` — 知识自动化发布流水线案例
- `404.html` — GitHub Pages 自定义错误页
- `.well-known/security.txt` — 安全问题联系方式
- `.nojekyll` — 保证点目录按静态文件发布

## 本地预览

```powershell
npm run serve
```

默认只监听 `127.0.0.1:8080`，避免无意暴露到局域网；需要跨设备预览时可显式设置 `HOST=0.0.0.0`。端口可通过 `PORT` 修改。预览服务器会返回 CSP、反嵌入、MIME、防权限滥用和跨源隔离相关响应头，并为不存在的路径返回自定义 404 页面。

## 部署前检查

```powershell
npm run check
```

检查范围包括：

- 公开快照、日报和归档的结构完整性
- 项目路径、HTML 本地引用和 sitemap 完整性
- canonical、Twitter Card、CSP、hreflang 与跳转链接
- `target="_blank"` 的 opener 隔离
- 日报来源 URL 的协议与本地主机限制
- 公开 JSON 中的高置信度私有路径、私钥和凭据模式
- `robots.txt`、`404.html` 与 `security.txt`

推送到 `main` 后，GitHub Actions 会先运行检查，再部署 GitHub Pages。

## IntelHub 日报更新

公开站不会直接读取本机 IntelHub 运行目录。日报生成后，由发布脚本刷新最新日报、日期归档和索引；页面端只读取仓库内的公开 JSON。

- `data/intelhub_daily_report.json`：最新日报
- `data/intelhub_daily_reports/YYYY-MM-DD.json`：按日期归档
- `data/intelhub_daily_index.json`：日期与摘要索引

手动刷新并发布：

```powershell
npm run publish:intelhub-report
```

安装 Windows 计划任务（每天 07:15）：

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/install-intelhub-daily-task.ps1 -At 07:15
```

任务日志写入本地 `logs/intelhub-daily-publish.log`，该目录不会提交到仓库。

## 技术特点

- 零框架、零第三方运行时依赖
- 数据驱动项目与日报渲染，失败时保留静态项目入口
- 中英文切换，查询参数和本地偏好均可恢复
- 语义化结构、跳到正文、键盘焦点、移动导航和减少动态效果支持
- 编辑式响应布局与项目案例页
- 严格外链协议校验与发布前公开数据检查

## 目录

```text
index.html
404.html
assets/
  site.js
  project-copy.js
  styles.css
  resource-workbench.png
data/
  public_snapshot.json
  intelhub_daily_report.json
  intelhub_daily_index.json
  intelhub_daily_reports/
projects/
  resource-console.html
  intelhub.html
  knowledge-automation.html
scripts/
  check-public-site.mjs
  update-intelhub-daily-report.mjs
  publish-intelhub-daily-report.ps1
server.mjs
```
