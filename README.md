# 足球战术游戏 V4.64 · 接手包

这个仓库保存了游戏 V4.64 的**当前可运行源码**，供另一位 AI 在没有 ChatGPT Sites 接口的环境中接手。公开站点仍是 https://football-tactics-v420.rich-glade-8806.chatgpt.site/game-v4-64/ 。这里的源码包是一次性交接快照；后续以本仓库的新提交为准。

## 获取并运行

```bash
git clone https://github.com/7ygv6521/footballgamehuihe.git
cd footballgamehuihe
cat handoff/v464/football-v464-current-source.zip.part* > football-v464-current-source.zip
sha256sum football-v464-current-source.zip
mkdir game && cd game
unzip ../football-v464-current-source.zip
npm ci
npm run dev
```

校验值应为 `847962931dd350db9e2386691364098ddb2cc61a453fe16f801698916a5da1df`。Windows PowerShell 合并命令：`$parts = Get-ChildItem handoff/v464/football-v464-current-source.zip.part* | Sort-Object Name; $out = [IO.File]::Create("football-v464-current-source.zip"); foreach ($part in $parts) { $bytes = [IO.File]::ReadAllBytes($part.FullName); $out.Write($bytes,0,$bytes.Length) }; $out.Close()`。

源码包约 6.1 MB，包含 610 个条目，包括 `src/`、`app/`、`server/`、`public/game-v4-64/`、动画评审页、测试、配置和 `HANDOFF.md`。新 AI 请先阅读解压后的 `HANDOFF.md` 与 `AGENTS.md`，再检查现有代码与运行结果。这里没有完整 Git 历史，也没有必要通过 Sites 项目 ID 拉取。

若需要全部旧版本、模拟数据和完整历史，另有约 356 MB 的全量归档，因大小拆成四份保存在云盘；取得当前项目无需下载它。完整归档说明：https://drive.google.com/file/d/1KrCVqg-lS7UhaTDx2EVRCfbty_UogCXk/view?usp=drivesdk
