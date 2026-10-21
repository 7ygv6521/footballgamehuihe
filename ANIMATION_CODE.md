# 已完成动画代码索引（V4.64）

这些文件取自正在使用的足球游戏 V4.64 源码，路径保持与原项目一致。

- 最新 10 项精彩动作的**身体姿态**：`src/game/highlight-body.js`，基础动作参数：`src/game/football-actions.js`。
- **球员八方向动作、带球及普通移动**：`src/game/motion-directions.js`、`src/game/player-motions.js`。
- **球和球员的精彩动作轨迹**：`src/game/presentation/highlight-choreography.js`，画球员的代码：`src/game/presentation/figure.js`，记录位置转换：`src/game/presentation/recorded-event.js`。
- **在实际比赛中触发及播放精彩动作**：`src/game/highlight-runtime.js`（需要项目其他游戏模块）。
- **最新版动画评审网页源代码**：`src/animation-review/review.js`；部署用成品为 `public/animation-review-v464/`，其中 `scenes.json` 保存实际比赛样本，`review.bundle.js` 是打包产物。
- **之前做好的普通动作独立试播**：`public/animation-v4/`，入口 `preview.html`，动作清单 `catalogue.json`。

要运行**完整游戏和评审页**，下载本仓库 README 指向的源码包。这里单列的文件适合直接阅读或复制；评审页的云端留言需要原项目 API。
