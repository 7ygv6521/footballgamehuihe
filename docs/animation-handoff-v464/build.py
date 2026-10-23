import json
import re
import subprocess
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path('/workspace/sites/football-tactics-v420')
OUT = Path('/workspace/animation-handoff-v464')
OUT.mkdir(exist_ok=True)

def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))

def module_json(expression):
    script = "import {HIGHLIGHT_CATALOG} from './src/game/config/highlights.default.js'; import {CATALOG} from './src/game/routines/catalog.js'; console.log(JSON.stringify(" + expression + "))"
    return json.loads(subprocess.check_output(['node', '--input-type=module', '-e', script], cwd=ROOT, text=True))

old = load(ROOT / 'public/animation-v4/catalogue.json')['rows']
highlights = module_json('HIGHLIGHT_CATALOG')
routines = module_json('CATALOG')
review = load(ROOT / 'public/animation-review-v464/scenes.json')
feedback = load(OUT / 'feedback.json')
runtime = (ROOT / 'src/game/runtime.js').read_text(encoding='utf-8')
body = (ROOT / 'src/game/highlight-body.js').read_text(encoding='utf-8')
direct = set(map(int, re.findall(r'registerMotion\([^\n]*?,\s*(\d+)\s*,', runtime)))
direct.discard(0)  # A numeric argument in a helper call is not an animation ID.
direct.update(range(81, 112))
direct.remove(94)
direct.update(range(112, 118))
special = {36}
body_ids = set(re.search(r'HIGHLIGHT_BODY_IDS=new Set\(\[(.*?)\]\)', body).group(1).replace("'", '').split(','))
counts = {x['id']: x['count10'] for x in review['scenes']}
comments = defaultdict(list)
for item in feedback['comments']:
    comments[item['scene_id']].append(item)

def clean(s):
    return str(s or '').replace('|', '｜').replace('\n', ' ').strip()

historical = []
for a in old:
    ident = int(a['id'])
    status = '现行独立触发' if ident in direct else ('终场专用入口' if ident in special else ('仅定义身体动作，未找到独立调用' if ident == 94 else '旧表编号；现行无独立入口'))
    historical.append({
        'id': ident, 'name': a['title'], 'statusV464': status,
        'historicalTrigger': a.get('trigger', ''), 'historicalStatusV418': a.get('status', ''),
        'historicalCurrentV418': a.get('current', ''), 'historicalMissingV418': a.get('missing', ''),
        'directionNoteV418': a.get('directions', ''),
    })

active = []
for h in highlights:
    active.append({**h, 'hasDedicatedBodyV464': h['id'] in body_ids,
                   'reviewTenGameCountIfAvailable': counts.get(h['id']),
                   'feedbackCount': len(comments[h['id']])})

payload = {
    'gameVersion': 'V4.64', 'sourceCommit': '411a9b892e5ce531b050891d653c44d9a86fda8f',
    'explanation': '数字编号为V4.18历史清单；statusV464按当前runtime独立入口重新标注。历史trigger不是现行规则的权威定义。EX套路不是额外动画。',
    'numberedActions': historical, 'activeHighlights': active,
    'currentRoutines': [{'id': k, **v} for k, v in routines.items()],
    'review': [{k:v for k,v in x.items() if k not in ('sample',)} for x in review['scenes']],
    'userFeedback': feedback['comments'],
    'removedFromCurrentHighlightCatalog': review['lowFrequencyRemoved'],
}
(OUT / 'animation-catalog-v464.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')

lines = [
    '# 足球战术游戏 V4.64 动画与触发交接清单',
    '',
    '整理日期：2026-10-23；游戏源码提交：`411a9b892e5ce531b050891d653c44d9a86fda8f`。本文件用于下一位 AI 接手动画工作，没有修改游戏。',
    '',
    '## 先弄清三个层次',
    '',
    '1. **比赛结算**先决定行动、合法路径、接触点、球权和结果。动画沿真实结算重放，不重新判输赢，不把球或球员瞬移到预设坐标。',
    '2. **普通动作编号 1–117**来自 V4.18 历史预览表。现在仍有 117 条旧登记，但这不等于当前有 117 个独立入口。V4.64 中有 61 个编号可找到当前独立注册，36 是终场专用入口；94 有身体姿态定义，却未找到独立调用。其余编号可作旧资产索引，不能声称都会触发。',
    '3. **精彩目录 23 项**是当前游戏的有效精彩事件候选，与普通动作叠加；其中 10 项在 `highlight-body.js` 有专门的头身表演。`EX_` 是同一 23 项在套路规划器里的镜像，不再额外计 23 种动画。另有 21 个位置/流程套路模板，不等于独立身体动画。',
    '',
    '所有精彩事件都先满足局面、技能、空间、结算及放行条件。配置中的 `baseProbability` 只是条件成立后的抽选参数，不是一场比赛的触发率。下方十场次数只来自固定的 10 场、1600 行动槽样本，且只覆盖试播板上的 10 项。',
    '',
    '## 现行 23 项精彩事件', '',
    '| ID | 类别 | 名称 | 必要局面／触发描述 | 结算后的表演内容 | 独立头身动作 | 十场试播数 |',
    '|---|---|---|---|---|---|---:|',
]
groups = {'individual':'个人', 'team':'团队', 'defence':'防守'}
for h in active:
    lines.append(f"| {h['id']} | {groups[h['group']]} | {clean(h['name'])} | {clean(h['condition'])} | {clean(h['result'])} | {'有' if h['hasDedicatedBodyV464'] else '复用基础动作／球路／位置表演'} | {h['reviewTenGameCountIfAvailable'] if h['reviewTenGameCountIfAvailable'] is not None else '未测'} |")
lines.extend([
    '', '具体资格仍以 `src/game/highlights.js`、`src/game/simple-entry.js`、`src/game/creative-scenes.js`、`src/game/routines/planner.js` 为准。上表“必要局面”是配置描述，并非完整的可执行条件表达式。',
    '', '## 旧编号 1–117：逐项状态和触发描述', '',
    '下面的“触发描述”摘自旧版目录，目的是帮助复用资产；**若现行状态为“旧表编号”，不可直接照此接入或统计为已播放**。即使状态是“现行独立触发”，最终判定仍应读 V4.64 的 `runtime.js`。',
    '', '| 编号 | 名称 | V4.64入口状态 | 旧目录中的触发/用途描述 |', '|---:|---|---|---|',
])
for a in historical:
    lines.append(f"| {a['id']} | {clean(a['name'])} | {a['statusV464']} | {clean(a['historicalTrigger'])} |")
lines.extend([
    '', '### 当前源码中特别要核对的差异', '',
    '- 94“被断球后转身”有 `FOOTBALL_ACTIONS.dispossessed` 定义，但当前未找到 `v4Clip(...dispossessed...)`；不能当作已触发。',
    '- 36 是 `state.finalReaction`，终场时单独展示，不走普通 `registerMotion`。',
    '- 112–116 由实际 `result.restart.kind` 注册；117 由实际犯规判定注册。定位球前等待跑位与定位球出脚是两段不同过程。',
    '- 81–85 对应实际高球争顶/凌空射门及未触球分支；86–88 铲球；89–91 假动作；92–93 双人夹抢；95–97 封堵/扑救分支；98–105 按真实路径的职责跑动；106–111 接球失败、门将放球/二次收球、补射、二过一。',
    '- 数字编号 27 的旧动画入口只检查 `wide/high`，而当前射门出界结果也可能表现为 `out`。这是需要复核的接线问题，不能凭旧表保证射偏动画总会出现。',
    '- 旧表中的 60/80 回合等文案是历史记录；本次没有拿它当现行比赛规则。',
    '', '## 套路规划器：有 21 个非精彩模板，不能当成独立动画', '',
    '| ID | 用途名称 | 分组 | 计划步数 |', '|---|---|---|---:|',
])
for k,v in routines.items():
    if k.startswith('EX_'): continue
    lines.append(f"| {k} | {clean(v['name'])} | {v['group']} | {v['steps']} |")
lines.extend([
    '', '注：`RA07` 和 `RD01–RD07` 仍留在 `routines/catalog.js`。历史对话中用户曾要求去掉这些旧名称，所以另一位 AI 应把它们视为**源码遗留流程模板**，不要擅自包装成获批的新精彩动作。',
    '', '## 已被否定／退役的精彩标签', '',
    '当前 23 项有效目录不含这些试播板明确标为低频并移除的标签：`' + '、'.join(review['lowFrequencyRemoved']) + '`。',
    '此外 `simple-entry.js` 中的排除集合含 `C03、C08、A09、C09、C14、C15、C22、C23`；配置还把 `A02、A03、A04、A06、A07、T01–T10、D03、D05–D10` 视为普通组织标签，不再按独立精彩画面统计。源码可能保留旧名字用于兼容，**有旧字符串不代表当前会触发**。',
    '', '## 用户在动画网页上的原始留言', '',
    '共有 27 条、覆盖 10 项。以下为逐项原话，便于下一位 AI 与画面核对。留言是验收意见，不代表当前代码已经全部修正。原始结构化数据见 `feedback.json`。',
])
for h in active:
    if not comments[h['id']]: continue
    lines.append(f"\n### {h['id']} {h['name']}（{len(comments[h['id']])} 条）\n")
    for c in sorted(comments[h['id']], key=lambda x:x['created_at']):
        lines.append(f"- {c['body'].replace(chr(10), ' ').strip()}")
lines.extend([
    '', '## 动画继续制作时必须遵守的画面契约', '',
    '- 球员造型以**头和身体**表现，当前没有可见的双脚；尺寸与透视要一致。`football-actions.js` 的 foot/shoe 字段是旧接触锚点，并非可见脚的设计要求。',
    '- 支持八方向。同一动作可复用，但朝向要沿真实行动方向；不能靠突然变大变小或突然换格表现移动。',
    '- 抢断、铲球、封堵、接传球要有清晰的触球瞬间。球的轨迹与身体动作同步；出脚后马上飞行，不应在接触后停顿。',
    '- 精彩动作可以预先连算，保证前段传跑、对手反应能够演出来；最后一步的攻门成败仍由既定结算决定。对手动作要有合理动机与合法终点。',
    '- 不要为所有低频动作强行创造不合理机会；用户认可删除、改造或新增精彩动作，但新动作必须**看起来精彩、可在现有比赛局面中触发且能用现有造型清晰展示**。',
    '- 复用已有基础姿态和路线。先在真实事件中查到 `event.trace.animations`、精彩 ID、合法路径及结果，再制作角色关键帧；不要用动画改变胜负或占格。',
    '', '## 源码与网页入口', '',
    '- 数字编号旧目录：`public/animation-v4/catalogue.json`',
    '- 当前普通动作接线和比赛回放：`src/game/runtime.js`，特别是 `MATCH_ANIMATIONS`、`registerMotion`、`V4_IDS`、`v4Clip` 和定位球段。',
    '- 31 个扩展头身动作：`src/game/football-actions.js`',
    '- 当前精彩目录与配置：`src/game/config/highlights.default.js`、`src/game/config/creative-scenes.default.js`',
    '- 23 项精彩的资格和结算：`src/game/highlights.js`、`src/game/simple-entry.js`、`src/game/creative-scenes.js`、`src/game/routines/planner.js`',
    '- 10 项定制头身表演：`src/game/highlight-body.js`',
    '- 固定十场试播样本：`public/animation-review-v464/scenes.json`；它含每项示例的球员/球/路径/事件结果。',
    '- 网页留言 API：`app/api/animation-review/route.ts`；本包另附导出的 27 条留言。',
    '- 当前游戏网页：<https://football-tactics-v420.rich-glade-8806.chatgpt.site/>。',
    '', '交接时建议从这三处同时查证一个动作：**当前比赛记录是否结算过、当前播放入口是否注册、玩家是否能看清它**。三者不能互相替代。',
])
readme = '\n'.join(lines) + '\n'
(OUT / 'README.md').write_text(readme, encoding='utf-8')
with zipfile.ZipFile(OUT / 'football-animation-handoff-v464.zip', 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for name in ('README.md', 'animation-catalog-v464.json', 'feedback.json'):
        z.write(OUT / name, arcname=name)
    for rel in ('src/game/runtime.js', 'src/game/football-actions.js', 'src/game/highlight-body.js',
                'src/game/highlights.js', 'src/game/simple-entry.js', 'src/game/creative-scenes.js',
                'src/game/routines/catalog.js', 'src/game/routines/planner.js',
                'src/game/config/highlights.default.js', 'src/game/config/creative-scenes.default.js',
                'public/animation-v4/catalogue.json', 'public/animation-review-v464/scenes.json',
                'app/api/animation-review/route.ts'):
        z.write(ROOT / rel, arcname='source/' + rel)
print('rows',len(historical),'current',len(direct),'highlights',len(active),'routines',len(routines),'body',len(body_ids),'feedback',sum(map(len,comments.values())))
print('readme_bytes',len(readme.encode()),'zip_bytes',(OUT/'football-animation-handoff-v464.zip').stat().st_size)
