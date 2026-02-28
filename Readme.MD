```markdown
# AllToolBox工具箱 — React + Material3 下载页面模板

此仓库为“工具箱”下载页的 React + Material 3 风格实现（使用 MUI），打包为静态站点并通过 GitHub Actions 自动部署到 GitHub Pages（使用官方 actions 上传/部署流程）。

## 功能
- Material 3 / Android 原生风格（Material You 灵感）
- 平台/架构/版本选择与检测（自动检测客户端平台）
- 显示文件名、大小、SHA256、版本说明
- releases.json 驱动数据（位于 public/releases.json）
- Webpack 构建（dev server + 生产构建）
- GitHub Actions 自动构建并部署到 Pages

## 本地运行
1. 安装依赖：
```bash
npm ci
```

2. 开发启动：
```bash
npm start
```
打开 http://localhost:3000

3. 生产构建：
```bash
npm run build
```
输出目录：`dist/`

## 部署（已在仓库中配置）
当你把代码 push 到 `main` 分支时，工作流 `.github/workflows/deploy.yml` 会：
- 安装依赖并构建项目
- 把 `dist/` 上传为 Pages artifact
- 使用 `actions/deploy-pages` 正式发布到 GitHub Pages（你需要在仓库 Settings -> Pages 中查看站点 URL）

## 定制与扩展
- 替换 `public/releases.json` 中的 URL、SHA 值为真实数据，或改为调用你后端的接口。
- 想要动态从 GitHub Releases 拉取发布信息，可在 `src/App.jsx` 中替换 fetch 流程，调用 GitHub Releases API 并转换格式。
- 若需暗色主题、国际化或更丰富的动画，我可以继续为你添加（例如动态色彩、壁纸感知色彩算法等）。
```