# 部署与更新说明（HybridDeepResearch Leaderboard）

本站点是纯前端静态站（React + Vite），发布在 **GitHub Pages** 上，仓库
`snowflake-eng/hybrid_leaderboard`（**private**）。

- 站点地址（私有混淆域名）：`https://refactored-couscous-pz385jr.pages.github.io/`
- 发布方式：**本地构建 + 推送 `gh-pages` 分支**（不使用 GitHub Actions）
- 可见范围：仓库是 private，站点自动只对**有该 repo 读权限、且登录 GitHub 过组织 SSO 的人**开放

---

## 日常更新（最常用）

改完内容后，一条命令发布：

```bash
cd /home/xiali/deep/deep_benchmark
bash deploy-pages.sh
```

看到最后打印 `==> Done. gh-pages updated.` 即成功；**硬刷新**站点（Cmd/Ctrl+Shift+R），约 1 分钟内生效。

**Pages 设置不用再动**（已固定 Source = Deploy from a branch，Branch = `gh-pages`，Folder = `/ (root)`）。

### 改哪些文件
| 想改什么 | 文件 |
|---|---|
| 榜单数据（条目、分数、split/metric） | `data/results.json` |
| 榜单交互（切换、排序、列） | `src/components/Leaderboard.tsx` |
| 提交邮箱 / guideline 链接 | `src/components/Submit.tsx` |
| Hero、News、按钮、数据集介绍等 | `src/components/*.tsx` |
| logo 图片 | `public/logos/`（数据里用 `/logos/xxx` 引用） |

### （可选）本地预览
```bash
npm run dev      # 打开 http://localhost:5173/ ，确认无误后 Ctrl+C
```

### （建议）把源码也提交到 main 作备份
`gh-pages` 只是构建产物，真正的“源”在 `main`：
```bash
git add -A && git commit -m "更新说明" && git push
```
这步不影响发布，纯粹留版本记录。

---

## `deploy-pages.sh` 做了什么

1. `npm run build:ci`（= `vite build`，仅本地构建，约几秒）→ 产出 `dist/`
2. 在 `dist/` 里临时建一次性 git 仓库，force-push 到远端 **`gh-pages`** 分支
3. 清理临时 git

**只更新 `gh-pages` 分支**，不动 `main`、不动其他分支/仓库、不影响别人；只是站点内容更新。

---

## 一次性设置（已完成，仅供参考/迁移用）

1. `Settings → Pages → Source` 选 **Deploy from a branch**
2. `Branch` 选 **`gh-pages`**，`Folder` 选 **`/ (root)`** → Save
3. 保持仓库 **private**（决定了站点私有可见）

给同事开放：`Settings → Collaborators and teams` 里加人或 team。

---

## 常见问题排查

- **打开是 404「There isn't a GitHub Pages site here」**
  - 部署还没传播完 → 等 1–2 分钟再刷新
  - URL 打错（正确是 `refactored-couscous-pz385jr.pages.github.io`，别漏字母）
  - Pages 的 Branch 误设成了 `main` → 必须是 `gh-pages`

- **页面空白 / 样式和 logo 丢失（不是 404）**
  - 通常是 base 路径不对。本仓库是 private，Pages 在**根域名**服务，所以 `vite.config.ts` 里 `base` 必须是 `/`（已设）。
  - 别改成 `/hybrid_leaderboard/`，那是公开仓库项目页才用的。

- **别人打不开 / 要登录**
  - 正常：私有站点需登录且有 repo 读权限。没权限就在 Collaborators 里加人。

- **不要用 GitHub Actions 自动构建**
  - 之前试过，runner 上 `npm ci` 会崩（`npm error Exit handler never called!`，npm 自身 bug）。所以改用本地构建 + `deploy-pages.sh`，稳定且不耗 Actions 分钟。

---

## 如果将来仓库改成 Public（不建议，会全网可见）

公开后站点地址会变成 `https://snowflake-eng.github.io/hybrid_leaderboard/`（带子路径），
这时构建 base 要改成 `/hybrid_leaderboard/`：

```bash
PAGES_BASE=/hybrid_leaderboard/ npm run build:ci
```

`vite.config.ts` 已支持用 `PAGES_BASE` 环境变量覆盖 base，无需改代码。
（保持 private 则无需理会这一节。）
