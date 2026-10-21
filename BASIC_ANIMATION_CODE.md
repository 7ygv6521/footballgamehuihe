# V4.64 基础动作代码（当前游戏实际使用）

这是基础比赛动画，不是 10 个精彩镜头的代码。原项目源码各文件保持原路径。

## 从哪里看

1. **动作编号、登记和普通身体姿态**：`src/game/runtime.js`，重点搜索 `MATCH_ANIMATIONS`、`MOTION_POSES`、`registerMotion`、`samplePlayerMotionStage0`；该文件也有后续版本的 `samplePlayerMotionStage1` 至 `samplePlayerMotionStage18`，当前入口是最后一阶段。带球(1)、无球跑动(2)、传球(3)、接停球(4)、射门(5)、逼抢(6)、抢断(7)、过人(8)、护球(9)、扑救(14)等在这里映射。不能只抽取初版函数替代当前入口。
2. **带球时人和球分开推进**：`src/game/player-motions.js` 的 `dribble`，并由 `runtime.js` 采样已算好的路径。
3. **头部＋身体的动作关键帧**：`src/game/football-actions.js` 的 `FOOTBALL_ACTIONS`、`sampleFootballPose`。包含跑位、接应、铲球、头球、凌空射门、封堵、扑救等；并非所有动作单独拥有关键帧，部分沿用基础姿态。
4. **八方向朝向与实际绘制**：`src/game/motion-directions.js`、`src/game/presentation/figure.js`、`src/game/render/renderer.js`。
5. **松球、定位球、传射球路**：`src/game/loose-ball-motion.js`、`src/game/restart-motions.js`、`src/game/ball-routes.js`。
6. **历史独立试播页**：`public/animation-v4/` 可看动作原型，但它的页面标题和清单是 V4.20，包含旧状态和未接入原型，不能把它当作 V4.64 的实际触发结果。

`runtime.js` 还连接比赛事件、结算与位置数据，因此**单独复制动作文件不能运行整场比赛**。要运行 V4.64，按根目录 `README.md` 合并源码包。动画从结算结果播放，不应在绘制时重新决定成功率或球权。
