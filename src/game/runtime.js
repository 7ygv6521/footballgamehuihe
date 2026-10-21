import {EXECUTION_DICE,EXECUTION_BALANCE} from './config/execution-dice.default.js';
import {passScatter as calibratedPassScatter,shootingProfile,inverseConditional,CALIBRATION} from './calibration-model.js';
import {once as executionDie,upper as diceUpper,rating as diceRating} from './dice-model.js';
import {SCENE_POLICY,defaultSceneSkills} from './config/scene-policy.default.js';
import {specialFinish,enhanceShot} from './special-rewards.js';
import {createRoutineRuntime} from './routines/runtime.js';
import {routineTasks,prepositionRoutine} from './routine-tasks.js';
import {counterOpportunity} from './tactical-organization.js';
import {MOVEMENT_PROFILE} from './config/movement-profile.default.js';
import {PITCH_COLS,PITCH_ROWS,PITCH_CW,PITCH_CH} from './config/pitch.default.js';
import {allowsAttackingPass} from './pitch-zones.js';
import {TACTICAL_POLICY} from './config/tactical-policy.default.js';
import {COACHING_DEFAULTS,COACHING_LEVELS,validateCoaching,coordinationLevels} from './config/coaching.default.js';
import {coachResponse,preferenceMultiplier,laneInfluence} from './coach-influence.js';
import {createHighlightRuntime} from './highlight-runtime.js';
import {HIGHLIGHT_BODY_IDS,sampleHighlightBody} from './highlight-body.js';
import {technicalPlayerPoint,technicalBallPoint,spinDirection} from './presentation/highlight-choreography.js';
import {RELEASE} from './release.js';
import {createRollingChains} from './rolling-chains.js';
import {createTeamExecution} from './execution/team-execution.js';
import {createEventResolution} from './execution/event-resolution.js';
import {createSlotPlanner} from './decision/slot-planner.js';
import {createEventSettlement} from './settlement/event-settlement.js';
import {createMatchState} from './state/match-state.js';
import {createDecisionController} from './decision/controller.js';
import {createRenderer} from './render/renderer.js';
import {createRuntimeRecorder} from './records/runtime-recorder.js';
import {RECORD_CONTRACT} from './records/contract.js';
import {PATCH_LEVELS,patchDecision} from './behaviour-patches.js';
import {reachableGridPaths,shortestGridPath} from './grid-path.js';
import {PHASE_CONFIG,neighbouringBall,rearOfCarrier,preparationMoveLegal} from './phase-mechanics.js';
import {TEAM_PLAN} from './config/team-plan.default.js';
import {resolveTurnExecution,executionIntentSatisfied} from './turn-execution.js';
import {SHOT_GRID_CONFIG} from './config/shot-grid.default.js';
import {createDecisionConfiguration,TUNING_DEFAULTS,validateTuning,roleDecisionFactor as baseRoleDecisionFactor} from './config/decision.default.js';
import {PREFERENCE_KEYS,PREFERENCE_LABELS,PREFERENCE_DATA,validatePreferences,defaultPreferences} from './data/preferences.js';
import {chooseIntent,buildIntentCandidates,geometryLocation,geometryLine,geometricPath,projectDecisionPlayer} from './decision-model.js';
import {PLAYER_SETTING_DEFAULTS,PLAYER_SETTING_OPTIONS,bindPlayerSettings} from './config/player-settings.js';
import {BALANCE,BALANCE_VERSION,balanceFingerprint} from './config/balance-config.js';
import {PLAYER_DATA} from './data/player-data.js';
import {tackleModel,deflectionVector,shiftProbability,adjustPassScatter} from './event-foundations.js';
import {assignTeamDuties as baseAssignTeamDuties,personalShape,positionCategory,DUTY_LABELS} from './team-duties.js';
import {countMatchStatistics,STAT_LABELS,CORE_STATS,STAT_DEFINITIONS} from './match-statistics.js';
import {RULES_VERSION,RESTART_NAMES,BALL_RADIUS,firstWholeCrossing,boundaryRestart,offsideSnapshot,combinedFoulRisk,classifyCombinedFoul,cardResult,restartExemptsOffside} from './football-rules.js';
import {restartPose,throwHandAnchors,throwBallPoint} from './restart-motions.js';
import {gridPenaltyBox,inGridPenaltyArea,gridGoalArea,inGridGoalArea,penaltySpot} from './pitch-zones.js';
import {chooseShotAim} from './shot-aim.js';
import {shotLocation,shotRole,shotPreference,clearShotLine,shotChoiceProfile,calibratedShot} from './shooting-model.js';
import {ATTRIBUTE_KEYS,ATTRIBUTE_LABELS,initialiseAttributes,effectiveRating,movementPerformance,executionQuality,gridSteps,findGridPath,pathPosition,pathLength} from './ability-engine.js';
import {quickLooseTiming,quickLoosePoint,quickLoosePose} from './loose-ball-motion.js';
import {chooseMotionDirection,projectWorldDirection,nearestDirection8} from './motion-directions.js';
import {sampleFootballPose, FOOTBALL_ACTIONS, FOOTBALL_CONTACT_PHASE, footballPoseAnchors} from './football-actions.js';
import {createProjectRecords} from './project-records.js';
import {createDiagnostics} from './game-diagnostics.js';
import {dribble as buildDribbleMotion} from './player-motions.js';
import {buildBallRoute,routePoint,sampleBallRoute,routeTimeAtT,closestOnRoute,contactOnRoute,crossedRouteCells,routeSummary} from './ball-routes.js';
export function createGame(platform=globalThis){
 const diagnostics=createDiagnostics({listen:!platform.headless});
 const configuration=createDecisionConfiguration(),DECISION_CONFIG=configuration.config,applyDecisionTuning=configuration.apply;
 const roleDecisionFactor=(p,key,cfg=DECISION_CONFIG)=>baseRoleDecisionFactor({...p,coachResponse:v446Response(p)},key,cfg);
 const assignTeamDuties=options=>baseAssignTeamDuties({...options,config:DECISION_CONFIG,teamCoaching:v446Coaching(),coachResponses:v446Responses(),focus:state.focusLane});
 const {document,window,innerWidth,innerHeight,addEventListener,Image,Audio,requestAnimationFrame,performance,crypto,Math,location,fetch,setTimeout,clearTimeout}=platform;


const setPossession=setPossessionStage1;
const setLooseBall=setLooseBallStage1;

const roleDutyBonus=roleDutyBonusStage1;
const prepareActualBallRoute=prepareActualBallRouteStage5;
const eventRouteContact=eventRouteContactStage3;
const deflectionSpot=deflectionSpotStage2;
const sampleBallRecovery=sampleBallRecoveryStage1;
const taskResponseScore=taskResponseScoreStage2;
const planEventResponses=planEventResponsesStage9;
const scoreResponsePosition=scoreResponsePositionStage3;
const canReachBall=canReachBallStage1;
const ballContactAnchor=ballContactAnchorStage1;
const planSimultaneousMovement=planSimultaneousMovementStage4;

const contestScore=contestScoreStage2;

const beginEvent=beginEventStage8;
const prepareEventMotion=prepareEventMotionStage16;
const motionWaypoints=motionWaypointsStage1;
const bakeControlMotions=bakeControlMotionsStage1;
const samplePlayerMotion=samplePlayerMotionStage18;
const updateEventMotion=updateEventMotionStage8;

const applyEventFatigue=e=>{if(EXECUTION_DICE.fatigueEnabled)return applyEventFatigueStage1(e);e.v417FatigueApplied=true;};
const playerExportSnapshot=playerExportSnapshotStage4;
const captureMotionSample=captureMotionSampleStage3;
const checkCompletedEvent=checkCompletedEventStage14;
const syncControlledBall=syncControlledBallStage1;

const resetAfterGoal=resetAfterGoalStage2;
const finishRound=finishRoundStage2;
const startMatch=startMatchStage8;
const advanceRound=advanceRoundStage2;
const applyFormation=applyFormationStage2;
const beginHalftime=beginHalftimeStage2;
const laneDefenders=laneDefendersStage1;
const chooseShotTarget=chooseShotTargetStage1;


const render=renderStage1;
const update=updateStage1;
const v4CanAerial=v4CanAerialStage1;
const v4DoubleSupport=v4DoubleSupportStage1;
const v45Performance=v45PerformanceStage1;
const v45PointAt=v45PointAtStage1;
const v45ShotDecision=v45ShotDecisionStage2;
const v46StopAtEncounter=v46StopAtEncounterStage3;
const v46FreezeAtPickup=v46FreezeAtPickupStage1;

const v48RaceCandidates=v48RaceCandidatesStage1;
const v410PlanTeamMovement=v410PlanTeamMovementStage5;
const v411ShotCalibration=v411ShotCalibrationStage2;

const v413TackleChoice=v413TackleChoiceStage6;
const v415ChargeEvent=v415ChargeEventStage1;
const v415RestartAction=v415RestartActionStage2;
const v417Model=v417ModelStage1;
const v419Scene=v419SceneStage1;
const v434RearChoice=v434RearChoiceStage1;

// Automatic football match with a pre-match formation board.

const GAME_VERSION=RELEASE.gameVersion;
const W = 1920;
const H = 1080;
let TOTAL_ROUNDS = PLAYER_SETTING_DEFAULTS.rounds;
const FIELD_L = 105;
const FIELD_W = 68;
const GRID_COLS = PITCH_COLS;
const GRID_ROWS = PITCH_ROWS;
const CELL_X = FIELD_L / GRID_COLS;
const CELL_Y = FIELD_W / GRID_ROWS;
const MAX_RESPONDERS_PER_EVENT = 6;
const MAX_PLAYER_STEPS = MOVEMENT_PROFILE.maxSteps;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const SKILL_KEYS = ATTRIBUTE_KEYS;
// Every player has 12 integer ratings (1–10). Goalkeeping only contributes for the keeper.
const SKILL_PROFILES = PLAYER_DATA.legacySkillProfiles;
const PLAYER_TENDENCIES = PLAYER_DATA.tendencies;
const SKILL_LABELS = ATTRIBUTE_LABELS;
const HABIT_LABELS = { balanced: '均衡', pass: '偏传球', shoot: '偏射门', dribble: '偏带球' };
const LEADING_LABELS = { attack: '领先时更激进', protect: '领先时护球', spread: '领先时避开密集区' };
const COACH_LABELS = { attack: '高位压迫', possession: '控球渗透', wing: '边路进攻', defend: '低位固守', counter: '防守反击' };
const COACH_STYLES = PLAYER_SETTING_OPTIONS.coachOrders;
const COACH_HINTS = {
  attack: '前场压迫，封出口并保护身后',
  possession: '地面渗透：短传接应、三角连接',
  defend: '防线回收，盯人与保护优先',
  counter: '保留前方出口，夺球后向前',
  wing: '拉宽、套边，中路接应传中',
};
const LANE_LABELS = { left: '左路', center: '中路', right: '右路' };
const LANE_KEYS = PLAYER_SETTING_OPTIONS.focusLane;
let HALFTIME_ROUND = PLAYER_SETTING_DEFAULTS.rounds/2+1;
const MAX_SUBS = 5;
// 阵型预设：格子为 [列, 行]，列 0 是我方球门、列 14 是对方球门
const FORMATION_PRESETS = PLAYER_DATA.formations;
const SUB_PROFILES = PLAYER_DATA.legacyBenchProfiles;
const SUB_ROLES = PLAYER_DATA.benchRoles;
const SUB_TENDENCIES = PLAYER_DATA.benchTendencies;
function cellOf(point) {
  return {
    col: clamp(Math.floor(point.x / CELL_X), 0, GRID_COLS - 1),
    row: clamp(Math.floor(point.y / CELL_Y), 0, GRID_ROWS - 1),
  };
}
function cellPoint(col, row) {
  return { x: (col + 0.5) * CELL_X, y: (row + 0.5) * CELL_Y };
}
function snapped(point) {
  const cell = cellOf(point);
  return cellPoint(cell.col, cell.row);
}
function cellDistance(a,b){return gridSteps(a,b);}
// 进攻方向：以持球方视角划分左/中/右三路，side 0 向 +x 进攻（左路在画面上方）
function laneOf(side, point) {
  const t = side === 0 ? point.y / FIELD_W : 1 - point.y / FIELD_W;
  if (t < 1 / 3) return 'left';
  if (t > 2 / 3) return 'right';
  return 'center';
}
function laneRange(side, lane) {
  const band = FIELD_W / 3;
  if (lane === 'center') return [band, FIELD_W - band];
  return side === 0
    ? (lane === 'left' ? [0, band] : [FIELD_W - band, FIELD_W])
    : (lane === 'left' ? [FIELD_W - band, FIELD_W] : [0, band]);
}


const canvas = document.createElement('canvas');
canvas.width = W;
canvas.height = H;
document.getElementById('game-container').appendChild(canvas);
const ctx = canvas.getContext('2d');
function resize() {
  const box=document.getElementById('game-container');
  const scale = Math.min((box?.clientWidth||innerWidth) / W, (box?.clientHeight||innerHeight) / H);
  canvas.style.width = `${W * scale}px`;
  canvas.style.height = `${H * scale}px`;
}
addEventListener('resize', resize);
if(!platform.headless&&typeof platform.ResizeObserver==='function')new platform.ResizeObserver(resize).observe(document.getElementById('game-container'));
resize();

const bg = new Image();
bg.src = 'assets/stadium-bg.webp';
const music = new Audio('assets/audio/match-music.mp3');
music.loop = true;
music.volume = 0.22;
const kickSfx = new Audio('assets/audio/kick.mp3');
const goalSfx = new Audio('assets/audio/goal-cheer.mp3');
let muted = false;
let audioStarted = false;
function playSfx(audio) {
  if (muted) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// ---------- 2.5D field projection ----------
const P_TOP = 300;
const P_BOT = 860;
function project(x, y) {
  const t = y / FIELD_W;
  const half = (560 + t * 260) * 0.82;
  return {
    x: W / 2 + (x / FIELD_L - 0.5) * 2 * half,
    y: P_TOP + t * (P_BOT - P_TOP),
    s: 0.75 + t * 0.35,
  };
}
function unproject(sx, sy) {
  const t = clamp((sy - P_TOP) / (P_BOT - P_TOP), 0, 1);
  const half = (560 + t * 260) * 0.82;
  return {
    x: clamp(((sx - W / 2) / (2 * half) + 0.5) * FIELD_L, 0, FIELD_L),
    y: t * FIELD_W,
  };
}

// ---------- Teams and pre-match formation ----------
// A high-pressing 4-3-3 spans the pitch: the front line starts beyond midfield.
const FORMATION = PLAYER_DATA.initialFormation;
const ROLES = PLAYER_DATA.initialRoles;
function makeTeam(side) {
  return FORMATION.map(([fc, fr], i) => {
    const col = side === 0 ? Math.floor((fc+.5)*GRID_COLS/15) : GRID_COLS - 1 - Math.floor((fc+.5)*GRID_COLS/15);
    const row = side === 0 ? Math.floor((fr+.5)*GRID_ROWS/9) : GRID_ROWS - 1 - Math.floor((fr+.5)*GRID_ROWS/9);
    const { x, y } = cellPoint(col, row);
    const tendencies = { ...PLAYER_TENDENCIES[i] };
    return initialiseAttributes({
      side, num: i + 1, role: ROLES[i], ...tendencies,
      hx: x, hy: y, x, y, tx: x, ty: y, reaction: '',
    }, i, side);
  });
}
function makeBench(side) {
  return SUB_PROFILES.map((profile, i) => {
    return initialiseAttributes({
      side, num: 12 + i, role: SUB_ROLES[i], ...SUB_TENDENCIES[i],
      hx: 0, hy: 0, x: 0, y: 0, tx: 0, ty: 0, reaction: '', onBench: true,
    }, 11+i, side);
  });
}
const teams = [makeTeam(0), makeTeam(1)];
const benches = [makeBench(0), makeBench(1)];
const state = createMatchState(v415RolePlayer(0,9),PLAYER_SETTING_DEFAULTS);

diagnostics.configure({version:GAME_VERSION,getContext:()=>({phase:state.phase,round:state.round,actionSlot:state.actionsInRound+1,eventType:state.event?.type||null,elapsed:state.event?.elapsed||0,score:[...state.score]})});
for(const [asset,path] of [[bg,'assets/stadium-bg.webp'],[music,'assets/audio/match-music.mp3'],[kickSfx,'assets/audio/kick.mp3'],[goalSfx,'assets/audio/goal-cheer.mp3']])diagnostics.watchAsset(asset,path);

const initialState=JSON.parse(JSON.stringify(state));
const projectRecords=platform.records||createProjectRecords(()=>buildMatchRecord());
diagnostics.setFailureSaver(()=>projectRecords.archive());

function restartSavedMatch(){
 // Freeze the old archive before any reset clears preparation rounds or settings.
 projectRecords.archive();
 const wasFailure=!!state.runtimeFailure,values=JSON.parse(JSON.stringify(state.pendingRoleTuning?.values||v429Tuning()));
 const coaching=validateCoaching(v446Coaching());for(const side of [0,1]){const pending=state.pendingTeamCoaching[side];if(pending)for(const key of ['familiarity','discipline'])coaching[key][side]=pending.values[key];}
 const identities=new Map([...teams.flat(),...benches.flat()].map(p=>[v416PlayerId(p),{...v419Prefs(p)}]));
 teams[0]=makeTeam(0);teams[1]=makeTeam(1);benches[0]=makeBench(0);benches[1]=makeBench(1);
 for(const key of Object.keys(state))delete state[key];Object.assign(state,JSON.parse(JSON.stringify(initialState)));
 state.carrier=v415RolePlayer(0,9);state.selectedPlayer=state.carrier;setPossession(state.carrier);syncControlledBall();
 diagnostics.reset();projectRecords.newMatch();state.matchRounds=TOTAL_ROUNDS;state.dutyMemory=[];v418BindSettings();
 state.teamCoaching=coaching;state.pendingTeamCoaching=[null,null];state.teamCoachingChanges=[];state.teamCoachingInitial=validateCoaching(coaching);for(const p of [...teams.flat(),...benches.flat()])p.preferences=identities.get(v416PlayerId(p))||defaultPreferences(p);
 state.roleTuning=applyDecisionTuning(values);state.pendingRoleTuning=null;state.roleTuningChanges=[];
 state.v434Preparation=null;state.preparationHistory=[];state.v434KeeperReady=null;state.v434PreparationSequence=0;
 document.getElementById('game-runtime-error')?.remove();document.getElementById('end-controls').hidden=true;
 v416RefreshLengthControl();v424RefreshChemistry();projectRecords.update();last=performance.now();
 if(!platform.headless){render();if(wasFailure)requestAnimationFrame(loop);}
}
document.getElementById('restart-match')?.addEventListener?.('click',()=>restartSavedMatch());
document.getElementById('record-history')?.addEventListener?.('click',()=>projectRecords.show());
// ---------- HUD hit regions ----------
const startButton = { x: 1150, y: 918, w: 300, h: 60 };
const advanceButton = { x: 780, y: 916, w: 290, h: 58 };
const autoButton = { x: 1120, y: 922, w: 210, h: 46 };
const muteButton = { x: 1830, y: 28, w: 58, h: 58 };
const laneButtons = LANE_KEYS.map((lane, i) => ({ lane, x: 42 + i * 96, y: 428, w: 88, h: 42 }));
const styleButtons = COACH_STYLES.map((style, i) => ({
  style, x: 42 + (i % 2) * 144, y: 500 + Math.floor(i / 2) * 38, w: 138, h: 34,
}));
const formationButtons = FORMATION_PRESETS.map((preset, i) => ({ index: i, name: preset.name, x: 372 + i * 124, y: 924, w: 112, h: 44 }));
const halftimeFormationButtons = FORMATION_PRESETS.map((preset, i) => ({ index: i, name: preset.name, x: 280 + i * 152, y: 856, w: 140, h: 44 }));
const halftimeContinueButton = { x: 1280, y: 850, w: 360, h: 58 };
const halftimeFieldRows = teams[0].map((_, i) => ({ index: i, x: 280, y: 268 + i * 52, w: 620, h: 46 }));
const halftimeBenchRows = benches[0].map((_, i) => ({ index: i, x: 980, y: 268 + i * 52, w: 620, h: 46 }));
// 最下方的我方阵容带：11 人两行。放在 y=1008 之后 —— 球场投影最深只到 860，
// 控制面板压缩到 884~1002，所以这一段是完全空的，不会压到任何可点击区域。
const SQUAD_STRIP = { x: 24, y: 1008, w: 1872, h: 68 };
function inRect(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.w && point.y >= rect.y && point.y <= rect.y + rect.h;
}
function anyRect(point, rects) { return rects.find((rect) => inRect(point, rect)) || null; }

function isGoalkeeper(player) { return !!player?.role?.includes('门将'); }
function attackDir(side) { return side === 0 ? 1 : -1; }
function goalX(side) { return side === 0 ? FIELD_L : 0; }
function inBounds(x, y) {
  if (typeof x === 'object') ({ x, y } = x);
  return { x: clamp(x, 2, FIELD_L - 2), y: clamp(y, 2, FIELD_W - 2) };
}
function playerPoint(player) { return { x: player.tx, y: player.ty }; }
function closestOnSegment(point, a, b) {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const denom = vx * vx + vy * vy || 1;
  const t = clamp(((point.x - a.x) * vx + (point.y - a.y) * vy) / denom, 0, 1);
  const at = { x: a.x + vx * t, y: a.y + vy * t };
  return { point: at, distance: Math.hypot(point.x - at.x, point.y - at.y), t };
}

function addLog(message) {
  state.log.unshift(message);
  state.log.length = Math.min(state.log.length, 12);
}
function findFreeCell(player, target, maxSteps = Infinity) {
  const desired = cellOf(target);
  const start = cellOf({ x: player.tx, y: player.ty });
  const occupied = new Set();
  for (const team of teams) for (const other of team) {
    if (other !== player) {
      const cell = cellOf({ x: other.tx, y: other.ty });
      occupied.add(`${cell.col},${cell.row}`);
    }
  }
  const candidates = [];
  for (let row = 0; row < GRID_ROWS; row++) for (let col = 0; col < GRID_COLS; col++) {
    const cell = { col, row };
    const steps = cellDistance(start, cell);
    if (steps > maxSteps || occupied.has(`${col},${row}`)) continue;
    candidates.push({ cell, steps, distance: cellDistance(desired, cell) });
  }
  candidates.sort((a, b) => a.distance - b.distance || a.steps - b.steps);
  return candidates.length ? cellPoint(candidates[0].cell.col, candidates[0].cell.row) : null;
}
function setPossessionStage0(player) {
  if (!player) return setLooseBall({ x: state.ball.tx, y: state.ball.ty });
  state.possession = player.side;
  state.carrier = player;
  state.controlOffset={x:isGoalkeeper(player)?0:attackDir(player.side)*.9,y:0};
  state.ballZ=isGoalkeeper(player)?.9:0;
  const spot = cellPoint(cellOf(playerPoint(player)).col, cellOf(playerPoint(player)).row);
  state.ball.tx = spot.x;
  state.ball.ty = spot.y;
}
function setLooseBallStage0(point) {
  const spot = {x:clamp(point.x,.1,FIELD_L-.1),y:clamp(point.y,.1,FIELD_W-.1)};
  state.possession = -1;
  state.carrier = null;
  state.controlOffset=null;
  state.ballZ=0;
  state.ball.tx = spot.x;
  state.ball.ty = spot.y;
}
function nameOf(p) { return `${p.side === 0 ? '我方' : '对手'}${p.num}号${p.role}`; }
// 随机数统一出口。opts.threshold 用来记录"这次烘焙的阈值"（如听令概率、射正率），
// opts.pass 记录判定结果，这样导出的记录里能直接看出"随机数 < 阈值 → 生效"的因果关系。
function randomFor(label, event = state.event, opts = null) {
  const value = state.routineRandomState==null?Math.random():((state.routineRandomState=(Math.imul(state.routineRandomState,1664525)+1013904223)>>>0)/4294967296);
  const draw = { label, value: Number(value.toFixed(6)) };
  if (opts && Number.isFinite(opts.threshold)) {
    draw.threshold = Number(opts.threshold.toFixed(4));
    draw.comparison = opts.compare || 'lt';
    draw.pass = draw.comparison === 'gt' ? value > draw.threshold : value < draw.threshold;
  }
  if (event?.trace?.randomDraws) event.trace.randomDraws.push(draw);
  else state.pendingRandomDraws.push(draw);
  return value;
}
function skill(player,key){
 if(!player)return 50;
 if(key==='movement')key='running';
 if(key==='goalkeeping'&&!isGoalkeeper(player))return 0;
 if(key==='stamina')return clamp(player.currentStamina??100,0,100);
 return effectiveRating(player,key)*10;
}
function maxPassRange(player) { return BALANCE.main.ranges.passBase + skill(player, 'passing') * BALANCE.main.ranges.passAbility; }
function maxShotRange(player) { return BALANCE.main.ranges.shotBase + skill(player, 'shooting') * BALANCE.main.ranges.shotAbility; }
function limitDistance(from, to, maximum) {
  const length = dist(from, to);
  if (length <= maximum || !length) return { ...to };
  const ratio = maximum / length;
  return { x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio };
}

// ---------- Event-driven match simulation ----------
function isMidfieldRole(role) {
  return role.includes('中场') || role.includes('前卫') || role.includes('前腰');
}
function isWideRole(role) {
  return role.includes('边锋') || role.includes('翼卫') || role.includes('边前卫');
}
function isFullBackRole(role) {
  return (role.includes('后卫') || role.includes('翼卫')) && !role.includes('中卫');
}
function roleDutyBonusStage0(player, kind) {
  const role = player.role || '';
  if (role === '门将' || role === '替补门将') return ['SAVE', 'CLAIM', 'COME_OUT'].includes(kind) ? 30 : -1000;
  if ((kind === 'FORWARD_RUN' || kind === 'SHOT') && (role === '中锋' || role.includes('前锋'))) return kind === 'FORWARD_RUN' ? 20 : 15;
  if ((kind === 'FORWARD_RUN' || kind === 'SUPPORT_WIDE' || kind === 'DRIBBLE') && isWideRole(role)) return kind === 'DRIBBLE' ? 10 : 15;
  if ((kind === 'SUPPORT' || kind === 'PASS') && isMidfieldRole(role)) return 15;
  if ((kind === 'INTERCEPT' || kind === 'COVER') && (role === '后腰' || role.includes('后腰'))) return kind === 'INTERCEPT' ? 20 : 15;
  if ((kind === 'MARK' || kind === 'BLOCK' || kind === 'COVER') && role.includes('中卫')) return kind === 'MARK' ? 20 : 15;
  if ((kind === 'PRESS' || kind === 'SUPPORT_WIDE') && isFullBackRole(role)) return kind === 'PRESS' ? 15 : 10;
  if (kind === 'INTERCEPT' && role.includes('中卫')) return 12;
  if ((kind === 'SUPPORT' || kind === 'PASS') && role.includes('替补')) return 6;
  return 0;
}
function addResponse(list, player, kind, target, priority = 0) {
  if (!player || isGoalkeeper(player) && !['SAVE', 'CLAIM', 'COME_OUT'].includes(kind)) return;
  if (list.some((item) => item.player === player)) return;
  list.push({ player, kind, target: inBounds(target.x, target.y), priority: priority + roleDutyBonus(player, kind) });
}
function supportTarget(player, event, forward = true) {
  const side = player.side;
  const direction = attackDir(side);
  const base = event.type === 'pass' ? event.result.receiveSpot : event.type === 'tackle' ? event.start : event.target || event.start;
  const progress = forward ? 1.2 : 0.35;
  const lane = player.ty < FIELD_W / 2 ? -0.85 : 0.85;
  return inBounds({ x: base.x + direction * CELL_X * progress, y: player.ty + CELL_Y * lane });
}
function goalSideTarget(defendingSide, threat, depth = 0.35, laneShift = 0) {
  const ownGoal = { x: goalX(1 - defendingSide), y: FIELD_W / 2 };
  return inBounds({
    x: threat.x + (ownGoal.x - threat.x) * depth,
    y: threat.y + (ownGoal.y - threat.y) * 0.12 + laneShift * CELL_Y,
  });
}
function isInPenaltyArea(side, point) {
  return inGridPenaltyArea(side, point);
}
function keeperCanArriveFirst(defendingSide, point) {
  const keeper = v415RolePlayer(defendingSide,0);
  const keeperEta = dist(playerPoint(keeper), point) / (0.55 + skill(keeper, 'movement') / 100);
  if (keeperEta > 25) return false;
  const nearestOutfieldEta = teams.flat().filter((p) => !isGoalkeeper(p)).reduce((best, player) => {
    const eta = dist(playerPoint(player), point) / (0.55 + skill(player, 'movement') / 100);
    return Math.min(best, eta);
  }, Infinity);
  return keeperEta + 1.5 < nearestOutfieldEta;
}
const BALL_ROUTE_LABELS={ground:'贴地传球',through:'快速直塞',driven:'直线射门',curve_left:'左弧线',curve_right:'右弧线'};
function routeForEvent(event,target,kind,bend=0){
 return buildBallRoute({...event.physicalStart||event.start,z:event.startHeight||0},{...target,z:event.type==='shoot'?(target.z??.45):0},{kind,bend,apex:event.type==='shoot'?(bend?.20:.06):0,
 speed:event.type==='shoot'?25+skill(event.actor,'shooting')*.08:event.result.mode==='space'?25:18,ratio:event.type==='shoot'?.9:.78});
}
function selectBallRoute(event){
 const intended=event.type==='shoot'?{x:goalX(event.side),y:event.target.y}:event.target;
 const base=event.type==='shoot'?'driven':event.result.mode==='space'?'through':'ground';
 const ability=skill(event.actor,event.type==='shoot'?'shooting':'passing'),length=dist(event.start,intended);
 const candidates=[{kind:base,bend:0}];
 if(ability>=(event.type==='shoot'?65:60)&&length>=13){
  const bend=clamp(length*.16,2.2,5.8)*(.7+.3*ability/95);
  candidates.push({kind:'curve_left',bend:-bend},{kind:'curve_right',bend});
 }
 const maximum=event.type==='shoot'?maxShotRange(event.actor):maxPassRange(event.actor);
 const scored=candidates.map(c=>{
  const route=routeForEvent(event,intended,c.kind,c.bend);let risk=0;
  risk=v47RouteThreats(event.actor,route,event.type).reduce((n,h)=>n+h.risk,0);
  const inside=route.table.every(p=>p.x>=-1e-6&&p.x<=FIELD_L+1e-6&&p.y>=.25&&p.y<=FIELD_W-.25);
  const feasible=inside&&(c.bend===0||route.length<=maximum+.1);
  const cost=c.bend?7+(95-ability)*.12+(route.length/Math.max(1,length)-1)*15:0;
  return {...c,route,feasible,risk,score:feasible?100-risk*24-cost:-10000};
 }).sort((a,b)=>b.score-a.score);
 const selected=scored[0];event.routeKind=selected.kind;event.routeBend=selected.bend;
 event.trace.ballRoute={intendedTarget:{...intended},selected:BALL_ROUTE_LABELS[selected.kind],kind:selected.kind,
 reason:selected.bend?'绕行减少沿途防守压力，计入能力与路程代价':'直接路线更合适，保留普通传球或射门',
 candidates:scored.map(c=>({kind:c.kind,label:BALL_ROUTE_LABELS[c.kind],bend:Number(c.bend.toFixed(3)),score:Number(c.score.toFixed(3)),risk:Number(c.risk.toFixed(3)),feasible:c.feasible,cells:crossedRouteCells(c.route)}))};
}
function prepareActualBallRouteStage0(event){
 selectBallRoute(event);const {actor,start,result}=event;
 if(event.type==='pass'){
  const quality=event.trace.quality.find(q=>q.kind==='pass');const scatter=clamp(BALANCE.main.passScatter.base+(1-quality.quality)*BALANCE.main.passScatter.quality+dist(start,event.target)*BALANCE.main.passScatter.distance,BALANCE.main.passScatter.min,BALANCE.main.passScatter.max);result.passQuality=quality;
  const angle=randomFor(`传球偏移角:${nameOf(actor)}`)*Math.PI*2;
  const radiusRoll=1-event.trace.quality.find(q=>q.kind==='pass').executionDie.u,passKind=dist(start,event.target)>=28||result.clearanceKind==='long'?'longPass':!result.loft?'groundPass':null,points=(passKind?v438Execution()[passKind][event.side]:0)+(passKind==='longPass'?EXECUTION_BALANCE.longAccuracy:EXECUTION_BALANCE.groundAccuracy);
  const adjusted=calibratedPassScatter({target:event.target,angle,die:quality.executionDie,distance:dist(start,event.target),pressure:quality.pressure,loft:!!result.loft,points}),actualScatter=adjusted.radius;result.executionTuning={kind:passKind,...adjusted};
  const scattered=inBounds({x:event.target.x+Math.cos(angle)*actualScatter,y:event.target.y+Math.sin(angle)*actualScatter});
  event.flightTarget=limitDistance(start,scattered,maxPassRange(actor));
  result.passError={radius:Number(actualScatter.toFixed(3)),maxRadius:Number((adjusted.edge+CALIBRATION.pass.missBase+CALIBRATION.pass.missRange).toFixed(3)),angle:Number(angle.toFixed(5)),scatteredTarget:scattered};
 }else{
  const goal={x:goalX(event.side),y:event.target.y};
  const quality=event.trace.quality.find(q=>q.kind==='shot');const calibration=v411ShotCalibration(event);result.positionShotModel=calibration;event.trace.shootingChoiceAtStart=v411Profile(actor,event.result.aerial?.contactPoint||playerPoint(actor),event.target);const chance=calibration.onTarget;
  const roll=Math.min(1-Number.EPSILON,1-quality.executionDie.u);
  result.onTargetChance=Number(chance.toFixed(4));result.onTargetRoll=Number(roll.toFixed(4));result.onTarget=roll<chance;
  const aim=chooseShotAim({goal,onTargetChance:chance,roll,distance:calibration.location.distance,technique:calibration.ratings.technique,pressure:calibration.pressure,mode:calibration.mode});
  result.shotAim=aim;event.flightTarget={...aim.target};result.onTarget=aim.onTarget;
  result.reboundSpot=snapped(inBounds({x:goalX(event.side)-attackDir(event.side)*CELL_X,y:event.target.y+(randomFor(`射门反弹落点:${nameOf(actor)}`)-.5)*10}));
 }
 event.ballRoute=routeForEvent(event,event.flightTarget,event.routeKind,event.routeBend);
 if(event.type==='pass')for(let i=0;i<3&&event.ballRoute.length>maxPassRange(actor)+.001;i++){
  event.flightTarget=limitDistance(start,event.flightTarget,dist(start,event.flightTarget)*maxPassRange(actor)/event.ballRoute.length);
  event.ballRoute=routeForEvent(event,event.flightTarget,event.routeKind,event.routeBend);
 }
 // Reuse the chosen method; never retarget a missed pass towards its receiver.
 event.trace.ballRoute.actual=routeSummary(event.ballRoute);result.actualRange=Number(dist(start,event.flightTarget).toFixed(2));
 result.actualPathRange=Number(event.ballRoute.length.toFixed(2));
 event.trace.ballRoute.targetMissed=cellDistance(cellOf(event.target),cellOf(event.flightTarget))>0;
}
function eventRouteHit(event,point){return event.ballRoute?closestOnRoute(point,event.ballRoute):closestOnSegment(point,event.start,event.flightTarget||event.target);}
function eventRouteContactStage0(event,player,options={}){
 if(!event.ballRoute)return null;
 const minT=options.minT??.04,maxT=options.maxT??.999,maxHeight=options.maxHeight??(isGoalkeeper(player)?2.2:1.35);
 let best=null;
 for(const point of event.ballRoute.table){
  if(point.t<minT||point.t>maxT||point.z>maxHeight||v423HighMiddle(event,point))continue;
  const fraction=routeTimeAtT(event.ballRoute,point.t),time=v45Release(event)+event.ballRoute.duration*fraction,root=v45PointAt(event,player,time);
  const reach=v47ContactReach(player,event.type);
  if(!v47TouchReady(player,root,point,time,event.type,event.initialPositions.get(player)))continue;
  if(dist(root,point)>reach)continue;
  const movement=v45Movement(event,player);if(event.type==='shoot'&&movement?.startTime&&time<movement.startTime)continue;
  const distance=dist(root,point);
  if(!best||distance<best.distance)best={point:{x:point.x,y:point.y,z:point.z},t:point.t,timeFraction:fraction,distance,root,time};
 }
 event.trace.reachability?.push({player:nameOf(player),kind:event.type,eligible:!!best,contactTime:best?.time??null,root:best?.root??null,reason:best?'实际球路与本时刻身体可达范围相交':'未能在来球时刻赶到可接触范围'});
 return best;
}
function saveRoutePoint(event){
 const ideal={x:goalX(event.side)-attackDir(event.side)*2.5,y:event.flightTarget.y};return eventRouteHit(event,ideal).point;
}

function bakeBallRecovery(event){
 const {result}=event,owner=event.motion.owner;event.ballAfter=[];
 if(owner)return;
 const impact={...result.impactPoint,z:event.ballFlight.end.z||0};
 if(result.outcome==='goal')return;
 const destination={...(result.landing||event.end),z:0};
 if(result.outcome==='blocked'||result.outcome==='saved'||result.passInterceptDeflected){
  const bouncePoint={x:impact.x+(destination.x-impact.x)*.72,y:impact.y+(destination.y-impact.y)*.72,z:0};
  const first=buildBallRoute(impact,bouncePoint,{kind:'deflection',apex:result.outcome==='saved'?.70:.28,speed:13,ratio:.75,duration:result.outcome==='saved'?.36:.26});
  const second=buildBallRoute(bouncePoint,destination,{kind:'bounce',apex:result.outcome==='saved'?.26:.12,speed:6,ratio:0,duration:.25});
  event.ballAfter=[first,second];event.timeline.config.recover=Math.max(event.timeline.config.recover,first.duration+second.duration+.10);
 }else if(dist(impact,destination)>.01||(impact.z||0)>.01)event.ballAfter=[buildBallRoute(impact,destination,{kind:'settle',speed:5,ratio:0,duration:event.timeline.config.recover})];
 event.duration=event.impactTime+event.timeline.config.recover;event.timeline.total=event.duration;
}
function sampleBallRecoveryStage0(event,elapsed){
 let time=Math.max(0,elapsed-event.impactTime);
 for(const leg of event.ballAfter){if(time<leg.duration)return sampleBallRoute(leg,time/leg.duration);time-=leg.duration;}
 return event.ballAfter.length?routePoint(event.ballAfter.at(-1),1):event.ballFlight.end;
}


function assignTask(responses, used, event, task) {
  for (let slot = 0; slot < task.count && v410CanAssign(responses,task.kind); slot++) {
    const pool = task.preferred && slot === 0 && !used.has(task.preferred)
      ? [task.preferred]
      : teams[task.side].filter((p) => !used.has(p) && !isGoalkeeper(p) && (!task.exclude || !task.exclude.has(p)));
    const scored = pool.map((player) => {
      const target = task.targetFor ? task.targetFor(player) : task.target;
      return { player, target, score: taskResponseScore(player, task.kind, target, event, task.tacticalNeed || 0) };
    }).sort((a, b) => b.score - a.score);
    const chosen = scored[0];
    event.trace.tasks.push({
      side: task.side, duty: task.kind, slot, target: task.target || null,
      candidates: scored.slice(0, 5).map((item) => ({ player: nameOf(item.player), target: item.target, score: Number(item.score.toFixed(2)) })),
      selected: chosen ? nameOf(chosen.player) : null,
    });
    if (!chosen) continue;
    addResponse(responses, chosen.player, task.kind, chosen.target, task.priority);
    used.add(chosen.player);
  }
}
function planEventResponsesStage0(event) {
  const { side, actor, type, start, result } = event;
  const opponent = 1 - side;
  const responses = [];
  const used = new Set([actor]);
  const tasks = [];
  const addTask = (teamSide, kind, target, priority, count = 1, extra = {}) => tasks.push({ side: teamSide, kind, target, priority, count, ...extra });
  const flightTarget = event.flightTarget || event.target;
  const routeDefenders = teams[opponent].filter((p) => !isGoalkeeper(p)&&!false)
    .map((p) => ({ player: p, route: eventRouteHit(event,playerPoint(p)) }))
    .filter(item=>!event.ballRoute || item.route.t>.06 && item.route.t<.96 && item.route.distance<CELL_X*2.5)
    .sort((a, b) => a.route.distance - b.route.distance);

  if (type === 'pass') {
    addTask(side, 'RECEIVE', result.receiveSpot, 150, 1, { preferred: result.receiver, tacticalNeed: 25 });
    addTask(side, 'SUPPORT', supportTarget(v415RolePlayer(side,5), event, false), 92, 1, { tacticalNeed: 8 });
    addTask(side, 'FORWARD_RUN', supportTarget(v415RolePlayer(side,9), event, true), 88, 1, { tacticalNeed: 10 });
    const routePoint = routeDefenders[0]?.route.point || start;
    addTask(opponent, 'INTERCEPT', routePoint, 120, 1, { preferred:routeDefenders[0]?.player, targetFor:p=>eventRouteHit(event,playerPoint(p)).point, tacticalNeed: 24 });
    addTask(opponent, 'MARK', result.receiveSpot, 104, 1, { targetFor: (p) => goalSideTarget(opponent, result.receiveSpot, 0.28, p.ty < FIELD_W / 2 ? -0.25 : 0.25) });
    addTask(opponent, 'COVER', goalSideTarget(opponent, start, 0.38), 82, 1, { tacticalNeed: 14 });
    if (isInPenaltyArea(opponent, result.receiveSpot) && keeperCanArriveFirst(opponent, result.receiveSpot)) {
      const keeper = v415RolePlayer(opponent,0);
      addTask(opponent, 'COME_OUT', result.receiveSpot, 118, 1, { preferred: keeper, tacticalNeed: 30, goalkeeperOnly: true });
    }
  } else if (type === 'duel') {
    // 对抗事件：攻方是持球人，守方是上前抢断的人，两边同时推进
    const carrier = result.carrier || event.actor;
    const challenger = result.challenger || event.actor;
    const attackSide = carrier.side;
    const defendSide = 1 - attackSide;
    // 攻方：持球人变向突破 + 队友接应与前插
    addTask(attackSide, 'BEAT', playerPoint(carrier), 200, 1, { preferred: carrier, exclude: new Set([challenger]), tacticalNeed: 40 });
    addTask(attackSide, 'SUPPORT', supportTarget(v415RolePlayer(attackSide,5), { ...event, type: 'carry' }, false), 78, 1, { tacticalNeed: 10 });
    addTask(attackSide, 'FORWARD_RUN', supportTarget(v415RolePlayer(attackSide,9), { ...event, type: 'carry' }, true), 82, 1, { tacticalNeed: 12 });
    // 守方：上抢者施加对抗 + 队友保护球门、封锁线路
    addTask(defendSide, 'CHALLENGE', playerPoint(carrier), 200, 1, { preferred: challenger, exclude: new Set([carrier]), tacticalNeed: 40 });
    addTask(defendSide, 'COVER', goalSideTarget(defendSide, playerPoint(carrier), 0.38), 104, 1, { tacticalNeed: 18 });
    addTask(defendSide, 'MARK', playerPoint(carrier), 84, 1, { targetFor: (p) => goalSideTarget(defendSide, playerPoint(carrier), 0.22, p.ty < FIELD_W / 2 ? -0.4 : 0.4) });
    for (const item of routeDefenders.slice(0, 2)) {
      addTask(defendSide, 'CUT_LANE', item.route.point, 70, 1, { exclude: new Set([challenger]), tacticalNeed: 8 });
    }
    if (isInPenaltyArea(defendSide, playerPoint(carrier)) && keeperCanArriveFirst(defendSide, playerPoint(carrier))) {
      const keeper = v415RolePlayer(defendSide,0);
      addTask(defendSide, 'COME_OUT', playerPoint(carrier), 112, 1, { preferred: keeper, goalkeeperOnly: true });
    }
  } else if (type === 'carry') {
    addTask(side, 'SUPPORT_WIDE', supportTarget(v415RolePlayer(side,7), event, false), 82, 1, { tacticalNeed: 10 });
    addTask(side, 'FORWARD_RUN', supportTarget(v415RolePlayer(side,9), event, true), 88, 1, { tacticalNeed: 12 });
    addTask(opponent, 'PRESS', event.target, 130, 1, { tacticalNeed: 30 });
    addTask(opponent, 'COVER', goalSideTarget(opponent, event.target, 0.38), 104, 1, { tacticalNeed: 18 });
    addTask(opponent, 'MARK', event.target, 84, 1, { targetFor: (p) => goalSideTarget(opponent, event.target, 0.22, p.ty < FIELD_W / 2 ? -0.4 : 0.4) });
    if (isInPenaltyArea(opponent, event.target) && keeperCanArriveFirst(opponent, event.target)) {
      const keeper = v415RolePlayer(opponent,0);
      addTask(opponent, 'COME_OUT', event.target, 112, 1, { preferred: keeper, goalkeeperOnly: true });
    }
  } else if (type === 'tackle') {
    const attackingSide = opponent;
    addTask(side, 'COVER', goalSideTarget(side, start, 0.38), 100, 1, { tacticalNeed: 18 });
    addTask(side, 'INTERCEPT', closestOnSegment(playerPoint(v415RolePlayer(side,6)), start, playerPoint(result.opponent)).point, 88, 1, { tacticalNeed: 14 });
    addTask(attackingSide, 'SUPPORT', supportTarget(v415RolePlayer(attackingSide,5), { ...event, type: 'carry' }, false), 84, 1, { tacticalNeed: 12 });
    addTask(attackingSide, 'FORWARD_RUN', supportTarget(v415RolePlayer(attackingSide,9), { ...event, type: 'carry' }, true), 78, 1, { tacticalNeed: 8 });
  } else if (type === 'shoot') {
    routeDefenders.slice(0, 2).forEach((item, i) => addTask(opponent, 'BLOCK', item.route.point, 145 - i * 10, 1, { preferred:item.player, targetFor:p=>eventRouteHit(event,playerPoint(p)).point, tacticalNeed: 25 }));
    const keeper = v415RolePlayer(opponent,0);
    const keeperSetPoint = saveRoutePoint(event);
    addTask(opponent, 'SAVE', keeperSetPoint, 160, 1, { preferred: keeper, goalkeeperOnly: true, tacticalNeed: 40 });
    const follower=v48NearbyFollowUp(event);if(follower)addTask(side,'REBOUND_READY',result.reboundSpot,96,1,{preferred:follower,tacticalNeed:16});
    addTask(opponent, 'COVER', goalSideTarget(opponent, result.reboundSpot, 0.22), 76, 1, { exclude: new Set([keeper]), tacticalNeed: 10 });
  } else if (type === 'scramble') {
    for (const teamSide of [0, 1]) addTask(teamSide, teamSide === side ? 'SECOND_BALL' : 'CHALLENGE', start, 96, 2, { exclude: new Set([actor]), tacticalNeed: 22 });
    for (const teamSide of [0, 1]) {
      if (!isInPenaltyArea(teamSide, start) || !keeperCanArriveFirst(teamSide, start)) continue;
      const keeper = v415RolePlayer(teamSide,0);
      addTask(teamSide, 'CLAIM', start, 108, 1, { preferred: keeper, goalkeeperOnly: true, tacticalNeed: 34 });
    }
  }

  tasks.sort((a, b) => b.priority - a.priority);
  for (const task of tasks) {
    if (task.goalkeeperOnly) {
      const keeper = task.preferred;
      if (keeper && !used.has(keeper) && v410CanAssign(responses,task.kind)) {
        addResponse(responses, keeper, task.kind, task.target, task.priority);
        used.add(keeper);
      }
    } else assignTask(responses, used, event, task);
  }
  return v410LimitResponses(responses);
}
function scoreResponsePositionStage0(player, point, intent, event) {
  const kind = intent.kind;
  const targetDistance = dist(point, intent.target);
  const opponentSide = 1 - player.side;
  const opponents = teams[opponentSide].filter((p) => !isGoalkeeper(p)).map((p) => dist(point, playerPoint(p)));
  const nearestEnemy = opponents.length ? Math.min(...opponents) : 24;
  let score = -targetDistance * (['RECEIVE', 'SECOND_BALL', 'CHALLENGE', 'SAVE', 'CLAIM', 'COME_OUT'].includes(kind) ? 2.0 : 1.15);
  // 对抗中的两名主角必须真正朝对方靠拢，否则会出现"隔空抢断"
  if (kind === 'CHALLENGE' || kind === 'BEAT') score -= targetDistance * 2.6;
  if (['RECEIVE', 'SECOND_BALL', 'SUPPORT', 'SUPPORT_WIDE', 'FORWARD_RUN'].includes(kind)) {
    score += Math.min(nearestEnemy, 22) * 0.72;
    score += attackDir(player.side) * (point.x - player.tx) * (kind === 'FORWARD_RUN' ? 1.1 : 0.45);
    score += Math.log(laneInfluence({...player,preferences:v419Prefs(player)},point,v446Response(player,event),DECISION_CONFIG).multiplier)*8;
  }
  if (['INTERCEPT', 'BLOCK'].includes(kind)) {
    const lane = eventRouteHit(event,point);
    score -= lane.distance * 1.8;
    if(event.ballRoute&&closestOnRoute(point,event.ballRoute).distance<=v47ContactReach(player,event.type))score+=18;
  }
  if(kind==='CONTINUE_RUN')score-=targetDistance*4;
  if (['MARK', 'COVER', 'PRESS'].includes(kind)) {
    const threat = event.actor ? playerPoint(event.actor) : event.start;
    const ownGoal = { x: goalX(1 - player.side), y: FIELD_W / 2 };
    const lane = closestOnSegment(point, threat, ownGoal);
    score -= lane.distance * 1.15;
    if (kind !== 'PRESS') score += Math.max(0, dist(threat, ownGoal) - dist(point, ownGoal)) * 0.22;
  }
  return score;
}
// Carrier root stays fixed. A defender enters the carrier cell for contact and
// exits to an adjacent cell: two real steps, even if the final cell is unchanged.
function adjacentContact(a,b,event=state.event){
 const pa=playerPoint(a),pb=playerPoint(b),gap=dist(pa,pb);if(cellDistance(cellOf(pa),cellOf(pb))!==1||!gap)return null;
 const blockers=new Set(teams.flat().filter(p=>p!==a&&p!==b).map(p=>v45CellKey(cellOf(playerPoint(p)))));
 if(!findGridPath(cellOf(pb),cellOf(pa),blockers,1))return null;
 const m=event?.trace.movements.find(x=>x.player===nameOf(b)),spent=m?.pathSteps||0,budget=v45Performance(event,b).maxSteps;
 if(spent+2>budget)return null;
 const nx=(pb.x-pa.x)/gap,ny=(pb.y-pa.y)/gap,anchor={x:pa.x+nx*1.7,y:pa.y+ny*1.7};
 const arrival=(m?.arrivalTime||0)+dist(pb,anchor)/v45Performance(event,b).playbackSpeed;
 const carrierArrival=v45Movement(event,a)?.arrivalTime||0;
 if(event.type==='carry'&&event.result.moveIntent==='advance'&&arrival>carrierArrival+.12)return null;
 return {point:{x:pa.x+nx*.9,y:pa.y+ny*.9},a:{...pa},b:anchor,distance:1.7,time:Math.max(arrival,carrierArrival)+.035};
}
function recordContactExcursion(event){
 const c=event.contact,p=c.challenger;let m=v45Movement(event,p);
 if(!m){m={player:nameOf(p),duty:'CHALLENGE',from:{...event.initialPositions.get(p)},to:{...playerPoint(p)},path:[{...event.initialPositions.get(p)}],pathSteps:0,maxSteps:v45Performance(event,p).maxSteps};event.trace.movements.push(m);}
 m.approachSteps=m.pathSteps;m.via={...playerPoint(c.carrier)};m.pathSteps+=2;m.contactSteps=1;m.returnSteps=1;
}
function canReachBallStage0(player,point){
 const e=state.event,p=e?.ballRoute&&e.initialPositions?v45PointAt(e,player,v45BallTime(e,point)):playerPoint(player);
 if(e?.result.aerial||e?.v4Aerial&&(point.z||0)>.35)return Math.abs(p.x-point.x)<=CELL_X/2+.35&&Math.abs(p.y-point.y)<=CELL_Y/2+.35;
 return dist(p,point)<=v47ContactReach(player,e?.type||'pass');
}
function ballContactAnchorStage0(player, point) {
  const p = playerPoint(player), d = dist(p, point) || 1;
  const step = Math.max(0, d - 0.8);
  return { x: p.x + (point.x - p.x) / d * step, y: p.y + (point.y - p.y) / d * step };
}
function planSimultaneousMovementStage0(event,responses){
 const all=teams.flat(),occupied=new Set(all.map(p=>v45CellKey(cellOf(playerPoint(p))))),reserved=new Set(),moved=new Set();
 const options=(p,budget=v45Performance(event,p).maxSteps)=>{
  const from=event.initialPositions.get(p),start=cellOf(from),blocked=new Set([...occupied,...reserved]);blocked.delete(v45CellKey(start));const cells=[];
  for(let row=Math.max(0,start.row-budget);row<=Math.min(GRID_ROWS-1,start.row+budget);row++)for(let col=Math.max(0,start.col-budget);col<=Math.min(GRID_COLS-1,start.col+budget);col++){
   const c={col,row};if(reserved.has(v45CellKey(c)))continue;
   if(event.type==='carry'&&p===event.actor){
    if(event.result.moveIntent==='protect'&&(c.col!==start.col||c.row!==start.row))continue;
    if(occupied.has(v45CellKey(c))&&(c.col!==start.col||c.row!==start.row))continue;
    if(event.result.moveIntent==='dribble')for(const d of teams[1-p.side])blocked.delete(v45CellKey(cellOf(event.initialPositions.get(d))));
   }
   const path=findGridPath(start,c,blocked,budget);if(!path)continue;
   if(event.type==='carry'&&p===event.actor&&event.result.moveIntent==='advance'&&path.slice(1).some(v=>teams[1-p.side].some(d=>cellDistance(v,cellOf(event.initialPositions.get(d)))<=1)))continue;
   const points=path.map(c=>cellPoint(c.col,c.row));points[0]={...from};
   if(event.v49ReturningKeepers?.has(p)&&points.length===1&&dist(from,cellPoint(col,row))>.01)points.push(cellPoint(col,row));
   if(event.v49ReturningKeepers?.has(p)&&event.type==='carry'){const actorTime=v45Movement(event,event.actor)?.arrivalTime||event.duration;if(pathLength(points)/v45Performance(event,p).playbackSpeed>actorTime+.02)continue;}
   if(event.type==='pass'&&event.v4Aerial&&pathLength(points)/v45Performance(event,p).playbackSpeed>v45Release(event)+event.ballRoute.duration*event.v4Aerial.handoffFraction)continue;
   if(event.type==='carry'&&p!==event.actor&&!event.v49ReturningKeepers?.has(p)){const actorTime=v45Movement(event,event.actor)?.arrivalTime;if(actorTime!=null&&pathLength(points)/v45Performance(event,p).playbackSpeed>actorTime+.045)continue;}
   cells.push({...c,steps:path.length-1,point:cellPoint(col,row),path:points});
  }return cells;
 };
 const assign=(p,kind,c)=>{if(!c||moved.has(p))return;const perf=v45Performance(event,p);
  if(kind==='SAVE'){const target=responses.find(r=>r.player===p&&r.kind==='SAVE')?.target;if(target){const mid=cellPoint(c.col,c.row),guard={x:clamp(target.x,mid.x-CELL_X/2+.12,mid.x+CELL_X/2-.12),y:clamp(target.y,mid.y-CELL_Y/2+.12,mid.y+CELL_Y/2-.12)};c={...c,point:guard,path:[...c.path,...(dist(c.path.at(-1),guard)>.01?[guard]:[])]};}}
  if(event.type==='carry'&&p===event.actor&&event.result.moveIntent==='dribble')c=v46StopAtEncounter(event,c);
  const arrival=pathLength(c.path)/perf.playbackSpeed;
  const startTime=kind==='KEEPER_RETURN'&&p===event.actor&&event.type==='pass'?v45Release(event)+.03:event.type==='shoot'&&['BLOCK','SAVE'].includes(kind)?v45Release(event)+.025+(10-p.awareness)*.006:0;
  event.trace.movements.push({player:nameOf(p),duty:kind,startTime,from:{...event.initialPositions.get(p)},to:c.point,path:c.path,score:Number((c.score||0).toFixed(2)),maxSteps:perf.maxSteps,pathSteps:c.steps,arrivalTime:Number((arrival+startTime).toFixed(4)),speed:perf.speed,performance:perf});
  p.tx=c.point.x;p.ty=c.point.y;reserved.add(v45CellKey(c));moved.add(p);p.reaction=p===event.actor?'主动·'+kind:kind;
 };
 if(event.type==='duel'||event.type==='tackle'&&!event.result.outOfRange){const c=event.result.carrier||event.result.opponent,d=event.result.challenger||event.actor;assign(c,'PROTECT',options(c,0)[0]);if(cellDistance(cellOf(playerPoint(c)),cellOf(playerPoint(d)))===1)assign(d,'CHALLENGE',options(d,0)[0]);}
 const intents=[];
 if(event.type==='carry'&&event.result.moveIntent==='protect')assign(event.actor,'PROTECT',options(event.actor,0)[0]);
 if(event.type==='carry')intents.push({player:event.actor,kind:'DRIBBLE',target:event.target,priority:170});
 if(['tackle','duel'].includes(event.type))intents.push({player:event.actor,kind:'PRESS',target:event.target,priority:170});
 if(event.type==='scramble')intents.push({player:event.actor,kind:'SECOND_BALL',target:event.start,priority:170});
 intents.push(...responses);
 event.v49ReturningKeepers=new Set();
 for(const p of all.filter(isGoalkeeper)){
  if(responses.some(r=>r.player===p)||p===event.actor&&event.type!=='pass'||p===state.carrier&&p!==event.actor||dist(event.initialPositions.get(p),{x:p.hx,y:p.hy})<.03)continue;
  event.v49ReturningKeepers.add(p);v45Performance(event,p,'run');intents.push({player:p,kind:'KEEPER_RETURN',target:{x:p.hx,y:p.hy},priority:-10});
 }
 for(const intent of intents.sort((a,b)=>b.priority-a.priority)){
  const p=intent.player;if(moved.has(p))continue;
  const adjacent=cellDistance(cellOf(playerPoint(p)),cellOf(intent.target))===1;
  if(event.type==='carry'&&['PRESS','DOUBLE_PRESS'].includes(intent.kind)){assign(p,intent.kind,options(p,0)[0]);continue;}
  if(event.type==='scramble'&&cellDistance(cellOf(playerPoint(p)),cellOf(event.start))<=1||intent.kind==='DOUBLE_PRESS'&&adjacent||intent.kind==='PRESS'&&event.type==='carry'&&cellDistance(cellOf(playerPoint(p)),cellOf(event.initialPositions.get(event.actor)))===1){assign(p,intent.kind,options(p,0)[0]);continue;}
  const choices=options(p).map(c=>({...c,score:scoreResponsePosition(p,c.point,intent,event)-(intent.kind==='DRIBBLE'?dist(c.point,intent.target)*6:intent.kind==='RECEIVE'&&event.result.mode==='feet'?dist(c.point,intent.target)*3:0)+skill(p,'awareness')*.015}));
  choices.sort((a,b)=>b.score-a.score||a.steps-b.steps||a.row-b.row||a.col-b.col);assign(p,intent.kind,choices[0]);
 }
 event.trace.keeperReturns=event.trace.movements.filter(m=>m.duty==='KEEPER_RETURN').map(m=>({...m,consumesResponseSlot:false}));
 return responses;
}
// Reserve a real adjacent recovery cell, paying for both approach and escape.


function contestScoreStage0(player,point,type,attackingSide=-1,distanceOverride=null){
 const diceEvent=state.event;
 if(['SHOT_BLOCK','SAVE'].includes(type)&&diceEvent?.type==='shoot'&&diceEvent.result.positionShotModel?.diceModel){
  const projectile=player.num===0,actual=projectile?diceEvent.actor:player,kind=projectile?'shot':isGoalkeeper(player)?'keeper':'block';
  let ceiling=projectile?diceUpper(actual,diceEvent.result.aerial?.mode==='header'?'headerShot':'shot'):kind==='keeper'?diceEvent.result.positionShotModel.diceModel.keeperUpper:diceUpper(actual,'block')*(v46CellEqual(v434ReactionRoot(diceEvent,actual,v45BallTime(diceEvent,point)),point)?CALIBRATION.block.sameCell:EXECUTION_BALANCE.adjacentBlock);
  const die=executionDie(diceEvent,kind+':'+actual.side+'-'+actual.num,Math.max(1e-9,ceiling),randomFor,{kind,player:nameOf(actual),geometryFactor:kind==='block'?ceiling/diceUpper(actual,'block'):1});
  const p=diceEvent.result.positionShotModel.goalGivenOnTarget,score=kind==='keeper'&&p>=1?-1:kind==='keeper'&&p<=0?1e12:die.score;
  diceEvent.trace.abilityContests??=[];diceEvent.trace.abilityContests.push({type,player:nameOf(player),ability:die.upper,roll:die.u,score,model:'single-shot-quality',cachedKey:die.key,geometryFactor:die.geometryFactor});return score;
 }

 if(type==='PASS'&&diceEvent?.type==='pass'){
  const projectile=player.num===0,actual=projectile?diceEvent.actor:player,kind=projectile?'pass':player.side!==diceEvent.side?'intercept':null;
  if(kind){
   const q=diceEvent.trace.quality?.find(q=>q.kind==='pass'),factor=1;
   const die=executionDie(diceEvent,kind+':'+actual.side+'-'+actual.num,diceUpper(actual,kind==='intercept'&&isGoalkeeper(actual)?'keeperIntercept':kind,factor),randomFor,{kind,player:nameOf(actual),rating:diceRating(actual,kind==='intercept'&&isGoalkeeper(actual)?'keeperIntercept':kind)});
   const multiplier=projectile?EXECUTION_BALANCE.passContest:1,score=die.score*multiplier;diceEvent.trace.abilityContests??=[];diceEvent.trace.abilityContests.push({type,player:nameOf(player),ability:die.upper,roll:die.u,score,rawScore:die.score,multiplier,model:'one-execution-die',cachedKey:die.key});return score;
  }
 }

 const attacker=player.side===attackingSide,e=state.event;
 let w;
 if(type==='TACKLE')w=attacker?BALANCE.main.contest.weights.tackleAttack:BALANCE.main.contest.weights.tackleDefence;
 else if(type==='HEADER')w=BALANCE.main.contest.weights.header;
 else if(type==='VOLLEY')w=BALANCE.main.contest.weights.volley;
 else if(type==='PASS')w=player.num===0?BALANCE.main.contest.weights.passer:attacker?BALANCE.main.contest.weights.receiver:isGoalkeeper(player)?BALANCE.main.contest.weights.keeperPass:BALANCE.main.contest.weights.intercept;
 else if(type==='SAVE')w=isGoalkeeper(player)?BALANCE.main.contest.weights.keeperSave:e?.result.aerial?.mode==='header'?BALANCE.main.contest.weights.headerShot:BALANCE.main.contest.weights.footShot;
 else if(type==='SHOT_BLOCK')w=attacker?(e?.result.aerial?.mode==='header'?BALANCE.main.contest.weights.headerShot:BALANCE.main.contest.weights.footShot):BALANCE.main.contest.weights.block;
 else if(type==='LOOSE'&&isGoalkeeper(player))w=BALANCE.main.contest.weights.keeperLoose;
 else if(type==='CLAIM')w=isGoalkeeper(player)?BALANCE.main.contest.weights.keeperClaim:BALANCE.main.contest.weights.claim;
 else w=BALANCE.main.contest.weights.loose;
 const components=Object.entries(w).map(([key,weight])=>({key,rating:player[key],effective:skill(player,key),weight}));
 const ability=components.reduce((n,c)=>n+c.effective*c.weight,0),roll=randomFor('执行发挥:'+type+':'+nameOf(player),e),variation=(roll-.5)*BALANCE.main.contest.variation+(roll<BALANCE.main.contest.badRollChance?-BALANCE.main.contest.badRollCost:0);
 let context=0;
 if(player.num===0&&e?.trace.quality){const q=e.trace.quality.find(x=>x.kind===(e.type==='shoot'?'shot':'pass'));if(q)context=-q.difficulty*100;}
 if(type==='SAVE'&&isGoalkeeper(player))context+=BALANCE.main.contest.keeperBonus;
 if(type==='LOOSE'){const arrival=e?.looseArrivals?.find(x=>x.player===player);if(arrival)context-=Math.max(0,arrival.arrivalTime-e.looseEarliest)*BALANCE.main.contest.arrivalCost;}
 const score=ability+variation+context;
 e?.trace.abilityContests?.push({type,player:nameOf(player),components,ability:Number(ability.toFixed(3)),roll,variation:Number(variation.toFixed(3)),context:Number(context.toFixed(3)),score:Number(score.toFixed(3))});return score;
}
// distanceOverride：对抗事件里双方坐标已被吸附到网格中心，
// 直接用坐标算 proximity 会退化成一格/两格（7/14 米）。传入真实接触距离即可。


function contestProxy(source,point) { return {...source,num:0,tx:point.x,ty:point.y}; }

// 每个事件有自己的阶段化时间轴：蓄力(wind) → 响应/执行(response) → 球飞行(flight) → 余韵(recover)
// 动画挂在阶段上，主循环只负责推进 elapsed 并按阶段派发。
// duel（对抗）是唯一一条攻防双方并行动作的时间轴：
//   wind     防守者冲刺靠近   ‖ 带球人观察、调整重心
//   response 防守者伸脚       ‖ 带球人变向          ← 两条轨道同时推进
//   recover  结果余韵：抢到球 / 被过人 / 松球
const EVENT_TIMELINES = {
  pass: { wind: 0.18, response: 0.42, flight: 0.44, recover: 0.34 },
  shoot: { wind: 0.22, response: 0.38, flight: 0.34, recover: 0.55 },
  duel: { wind: 0.26, response: 0.40, flight: 0, recover: 0.58 },
  carry: { wind: 0.16, response: 0.44, flight: 0, recover: 0.26 },
  tackle: { wind: 0.14, response: 0.40, flight: 0, recover: 0.42 },
  scramble: { wind: 0.12, response: 0.44, flight: 0, recover: 0.32 },
};
function timelineFor(type) {
  const base = EVENT_TIMELINES[type] || EVENT_TIMELINES.pass;
  return { ...base };
}
// 把阶段配置编译成绝对时间点，方便主循环按 elapsed 派发
function buildTimeline(type) {
  const cfg = timelineFor(type);
  const marks = { windEnd: cfg.wind, responseEnd: cfg.wind + cfg.response, flightEnd: cfg.wind + cfg.response + cfg.flight };
  return {
    config: cfg,
    windEnd: Number(marks.windEnd.toFixed(4)),
    responseEnd: Number(marks.responseEnd.toFixed(4)),
    flightEnd: Number(marks.flightEnd.toFixed(4)),
    total: Number((marks.flightEnd + cfg.recover).toFixed(4)),
  };
}
function phaseAt(event, elapsed) {
  const t = event.timeline;
  if (elapsed < t.windEnd) return 'wind';
  if (elapsed < t.responseEnd) return 'response';
  if (elapsed < t.flightEnd) return 'flight';
  return 'recover';
}
function beginEventStage0({ side, actor, type, target, description, result = {}, decision = null }) {
 if(state.routinePlan&&state.routineTerminal)decision={...decision,wholeFlowTerminal:true,routineId:state.routinePlan.id};
  state.phase = 'resolving';
  for (const team of teams) for (const p of team) p.reaction = '';
  const ballPoint = state.carrier ? playerPoint(state.carrier) : { x: state.ball.tx, y: state.ball.ty };
  const start = snapped(ballPoint);
  const eventTarget = target ? type==='shoot'?{x:goalX(side),y:target.y}:type==='pass'&&result.clearanceKind==='touchline'?{x:target.x,y:target.y}:snapped(target) : start;
  const timeline = buildTimeline(type);
  const event = {
    side, actor, type, start, physicalStart:{x:state.ball.x,y:state.ball.y,z:state.ballZ||0}, startHeight:state.carrier?v4KeeperHeight(state.carrier):0, target: eventTarget, end: { ...eventTarget }, result, decision,
    actionSlot: state.actionsInRound + 1, coachOrder: state.coachOrders[side], focusLane: state.focusLane[side],
    ranges: { pass: Number(maxPassRange(actor).toFixed(2)), shot: Number(maxShotRange(actor).toFixed(2)) },
    trace: { randomDraws: state.pendingRandomDraws.splice(0), tasks: [], movements: [], contests: [], fatigue: [], animations: [] },
    timeline,
    elapsed: 0, responseDuration: timeline.responseEnd, flightDuration: timeline.flightEnd - timeline.responseEnd,
    duration: timeline.total,
    resolved: false, responsesComplete: false, stageFired: {},
  };
  event.flightTarget = type === 'shoot' ? { x: goalX(side), y: eventTarget.y } : eventTarget;
  state.event = event;
  if(type==='pass'||type==='shoot')prepareActualBallRoute(event);
  actor.reaction = `主动·${type}`;
  // duel：在球员开始移动前先记录"真实起始间距"。
  // 结算时双方坐标已被吸附到网格中心，格距会退化成一格或两格（7/14 米），
  // 无法反映真实接触程度，所以这里抢在移动前把真实距离存下来。
  if (type === 'duel' && result.carrier && result.challenger) {
    const trueStart = dist(playerPoint(result.carrier), playerPoint(result.challenger));
    result.startGap = Number(trueStart.toFixed(2));
  }
  if (type === 'pass') state.stats[side].passes++;
  if (type === 'shoot') state.stats[side].shots++;
  if (type === 'tackle' || type === 'duel') state.stats[side].tackles++;
  if (type === 'scramble') actor.reaction = '主动·争球';
  if (type === 'duel') actor.reaction = '主动·上抢';

  event.trace.positionsBefore=snapshotAllPositions();event.trace.ballBefore=snapshotBallState();
  event.trace.motionSamples=[];
  event.initialPositions = new Map(teams.flat().map(p => [p, {x:p.x,y:p.y}]));
  event.pressPolicy = Object.freeze(v43PlanPressPolicy(event));
  event.trace.pressPolicy = {mode:event.pressPolicy.mode,carrier:event.pressPolicy.carrier?nameOf(event.pressPolicy.carrier):null,maxActiveOpponents:event.pressPolicy.maxActiveOpponents,decidedBeforeContest:true};
  const responses = planEventResponses(event);
  event.responses = responses;
  v430ConfirmIntents(event);
  planSimultaneousMovement(event, responses);
  prepositionRoutine(event,{state,teams,performance:v45Performance,key:q=>v45CellKey(cellOf(q)),cell:cellOf,point:cellPoint,path:shortestGridPath,name:nameOf});
  const protectedCarrier=event.pressPolicy.carrier;
  event.trace.pressPolicy.carrierStationaryBeforeContact=event.pressPolicy.mode==='protect'&&dist(event.initialPositions.get(protectedCarrier),playerPoint(protectedCarrier))<.001;
  prepareEventMotion(event);
  if(type==='carry' && event.contact)state.stats[event.contact.challenger.side].tackles++;
  event.trace.positionsPlanned=snapshotAllPositions();
  diagnostics.record('event-begin',{type,actor:nameOf(actor),outcome:event.result.outcome,retentionMode:event.result.retentionMode||null});
  // Initialize all 22 poses before this same frame is rendered.
  updateEventMotion(event);
  if(type==='scramble'){const players=new Set([event.actor,...event.responses.map(r=>r.player)]),a=[...players].filter(p=>p.side===0).length,b=players.size-a;addLog(`无人控球，我方${a}人、对手${b}人同时追球，抵达后共同争抢。`);}else addLog(event.ballRoute?`${description}（${BALL_ROUTE_LABELS[event.routeKind]}）`:description);
}
const MATCH_ANIMATIONS = {
  1:'带球推进',2:'无球跑动',3:'传球',4:'接球停球',5:'射门',6:'逼抢靠近',7:'抢断夺球',8:'变向过人',9:'转身护球',10:'扑空与失衡',
  11:'传球拦截',12:'射门封堵',13:'松球争抢',14:'门将扑救与抱球',15:'进球反应',21:'直塞与前插',22:'接应与拉边',25:'远距离回追',
  26:'对抗后球权松动',27:'射门未中与第二落点响应',28:'门将出击与攻方抢先接球',51:'迎球顺势带走',29:'待机观察',31:'疲劳姿态',36:'终场结果反应',49:'斜向直塞',
};
const MOTION_POSES = {
  stand:{lean:0,shift:0,lift:0,lag:0}, observe:{lean:2,shift:0,lift:0,lag:-0.03},
  run_a:{lean:12,shift:0.16,lift:0.10,lag:-0.08},run_b:{lean:18,shift:0.22,lift:-0.03,lag:-0.12},
  carry_a:{lean:7,shift:0.10,lift:0.03,lag:-0.04},carry_b:{lean:13,shift:0.20,lift:0.10,lag:-0.08},
  setup:{lean:-10,shift:-0.16,lift:-0.02,lag:0.05},strike:{lean:24,shift:0.32,lift:0.02,lag:-0.15},
  follow:{lean:30,shift:0.42,lift:0.04,lag:-0.12},press:{lean:23,shift:0.3,lift:-0.08,lag:-0.14},
  control:{lean:9,shift:0.10,lift:-0.10,lag:-0.07,squash:[1.04,0.96]},
  beat_a:{lean:-15,shift:-0.12,lift:0.02,lag:0.1},beat_b:{lean:21,shift:0.28,lift:0.05,lag:-0.12},
  shield:{lean:-12,shift:-0.08,lift:-0.08,lag:0.08,squash:[0.82,1]},
  beaten:{lean:-23,shift:-0.24,lift:-0.10,lag:0.13},block:{lean:13,shift:0.20,lift:-0.08,lag:-0.09,squash:[1.13,0.91]},
  save:{lean:65,shift:0.48,lift:0.28,lag:-0.17},save_down:{lean:46,shift:0.28,lift:-0.18,lag:-0.09},
  hold:{lean:3,shift:0,lift:-0.06,lag:0},celebrate:{lean:-8,shift:0,lift:0.24,lag:0.04},
  fatigue:{lean:16,shift:0.03,lift:-0.09,lag:-0.02},lose:{lean:19,shift:0.04,lift:-0.14,lag:0.03},draw:{lean:4,shift:0,lift:-0.04,lag:0},
};
const motionEase = t => {t=clamp(t,0,1);return t*t*(3-2*t);};
const motionLerp = (a,b,t) => ({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
function registerMotion(event,id,player,start,end,reason) {
  if (!player || end<=start) return;
  if (event.trace.animations.some(a=>a.id===id && a.player===nameOf(player) && a.start===start)) return;
  event.trace.animations.push({id,kind:MATCH_ANIMATIONS[id],player:nameOf(player),side:player.side,number:player.num,
    start:Number(start.toFixed(4)),duration:Number((end-start).toFixed(4)),reason});
}
function prepareEventMotionStage0(event) {
  // Bake the verdict once, using planned positions. Rendering never rolls or changes possession.
  v45PrepareTiming(event);
  resolveEvent(event);
  event.verdictPrepared=true;
  event.trace.animations=[];
  const {type,result,timeline:t}=event;
  if(type==='scramble'){
    const distance=Math.max(0,...(event.looseArrivals||[]).map(a=>dist(a.from,a.anchor)));
    event.quickLoose=quickLooseTiming(distance);event.quickLoose.approach=Math.max(.12,event.result.looseControlTime||.25);t.responseEnd=event.quickLoose.approach;t.windEnd=Math.min(.06,t.responseEnd*.2);t.config.wind=t.windEnd;t.config.response=t.responseEnd-t.windEnd;
  }
  if(type==='carry'){t.responseEnd=Math.max(.12,event.contact?.time||v45Movement(event,event.actor)?.arrivalTime||.12);t.config.response=t.responseEnd-t.windEnd;}
  if(result.contactOccurred&&['duel','tackle','carry'].includes(type)){
    const c=event.contact,participants=[c.carrier,c.challenger,c.helper].filter(Boolean);
    event.quickContact={cushion:.045,recover:.32};
    if(type!=='carry'){
      const distance=Math.max(0,...participants.map(p=>dist(event.initialPositions.get(p),p===c.carrier?c.a:p===c.challenger?c.b:c.helperAnchor)));
      t.responseEnd=Math.max(.12,event.contact?.time||.22);t.windEnd=Math.min(.05,t.responseEnd*.2);t.config.wind=t.windEnd;t.config.response=t.responseEnd-t.windEnd;
    }
  }
  t.config.recover=event.chainShot&&type==='carry'&&!result.contactOccurred?.045:event.quickContact?event.quickContact.recover:type==='scramble'?event.quickLoose.recover:Math.max(t.config.recover,event.trace.movements.some(m=>m.recoverySteps)?1.10:.65);
  t.flightEnd=t.responseEnd;t.total=t.flightEnd+t.config.recover;event.duration=t.total;event.responseDuration=t.responseEnd;
  if (type==='pass' || type==='shoot') {
    const nominal=event.ballRoute.duration;
    const impactT=result.impactT??1;
    event.trace.ballRoute.flown={end:result.impactPoint,t:impactT,timeFraction:result.impactFraction??1,
      cells:event.trace.ballRoute.actual.cells.filter(c=>c.enter<=impactT).map(c=>({...c,exit:Math.min(c.exit,impactT)}))};
    event.releaseTime=t.responseEnd;
    event.impactTime=event.releaseTime+nominal*clamp(result.impactFraction ?? 1,0.001,1);
    t.nominalFlight=nominal;t.config.flight=event.impactTime-event.releaseTime;
    t.flightEnd=event.impactTime;t.total=t.flightEnd+t.config.recover;
    event.flightDuration=t.config.flight;event.duration=t.total;
    event.ballFlight={start:{...event.ballRoute.from},end:{...routePoint(event.ballRoute,result.impactT??1)},route:event.ballRoute,
      reticle:{from:24,to:5},progress:0};
  } else event.impactTime=t.responseEnd;
  event.motion={tracks:new Map(),owner:motionResultOwner(event)};
  if(event.ballFlight)bakeBallRecovery(event);
  for (const player of teams.flat()) {
    const movement=event.trace.movements.find(m=>m.player===nameOf(player));
    const from=event.initialPositions.get(player), to={...playerPoint(player)};
    const approach=movement?.contactSteps?from:movement?.via || to;
    event.motion.tracks.set(player,{from,to,approach:{...approach},anchor:{...approach},moving:!!movement && dist(from,approach)>0.1});
  }
  if (event.contact) {
    const c=event.contact;
    event.motion.tracks.get(c.carrier).anchor=c.a;
    event.motion.tracks.get(c.challenger).anchor=c.b;
    if(c.helper)event.motion.tracks.get(c.helper).anchor=c.helperAnchor;
  }
  if(type==='scramble')for(const arrival of event.looseArrivals||[]){const track=event.motion.tracks.get(arrival.player);track.anchor={...arrival.anchor};track.approach={...arrival.anchor};track.moving=dist(track.from,track.anchor)>.1;}
  const owner=event.motion.owner;
  if ((type==='pass' || type==='shoot' || type==='scramble') && owner && result.impactPoint && canReachBall(owner,result.impactPoint)) {
    event.motion.tracks.get(owner).anchor=ballContactAnchor(owner,result.impactPoint);
  }
  if (type==='shoot' && result.outcome==='saved') {
    const keeper=teams[1-event.side].find(isGoalkeeper);
    event.motion.tracks.get(keeper).anchor=ballContactAnchor(keeper,result.impactPoint);
  }
  if(type==='shoot' && result.outcome==='blocked') {
    event.motion.tracks.get(result.blocker).anchor=ballContactAnchor(result.blocker,result.impactPoint);
  }
  for (const [p,track] of event.motion.tracks) {
    if (track.moving && p!==state.carrier && !isGoalkeeper(p)) registerMotion(event,2,p,0,t.responseEnd,'已分配任务且记录了实际移动');
    const response=event.responses.find(r=>r.player===p);
    if (response && ['SUPPORT','SUPPORT_WIDE','RECEIVE'].includes(response.kind)) registerMotion(event,22,p,0,t.responseEnd,response.kind);
    if (!track.moving && p!==event.actor) registerMotion(event,29,p,0,event.duration,'没有移动任务，观察球的方向');
    if (p.currentStamina<=45) registerMotion(event,31,p,0,event.duration,'体力≤45，仅改变躯干姿态');
  }
  const carrier=event.contact?.carrier || result.carrier || result.opponent || event.actor;
  const challenger=event.contact?.challenger || event.actor;
  bakeControlMotions(event);
  if(event.motion.initialDribble)registerMotion(event,1,event.motion.initialCarrier||event.actor,0,t.responseEnd,'沿真实格子路径推球、滚动、追球和再次触球');
  if(event.motion.recoveryDribble && owner && !isGoalkeeper(owner))registerMotion(event,1,owner,event.motion.bufferEnd,event.duration,'控制后沿合法路径推球带离');
  if (type==='pass') {
    registerMotion(event,3,event.actor,0,event.releaseTime+0.14,'传球选择完成，在 releaseTime 立即出球');
    if (result.mode==='space') {
      registerMotion(event,21,event.actor,0,event.releaseTime+0.14,'选择向身前空当传球');
      registerMotion(event,21,result.receiver,0,t.responseEnd,'对应接球人执行已规划的前插');
      if (Math.abs(event.flightTarget.y-event.start.y)>=CELL_Y*0.5 && attackDir(event.side)*(event.flightTarget.x-event.start.x)>0)
        registerMotion(event,49,event.actor,0,event.releaseTime+0.14,'实际传球线路向前且斜跨球场宽度');
    }
    if(result.outcome==='complete'){registerMotion(event,4,owner,event.impactTime,event.motion.bufferEnd,'球到达真实接触点，身体缓冲停球');if(event.motion.flowReceive)registerMotion(event,51,owner,event.impactTime,event.duration,'接球缓冲后沿预定移动路径顺势带走');}
    const comingKeeper=event.responses.find(r=>r.kind==='COME_OUT' && canReachBall(r.player,result.impactPoint))?.player;
    if(comingKeeper && result.impactT===1 && event.responses.some(r=>r.player.side===event.side&&canReachBall(r.player,result.impactPoint))){
      result.keeperRace=true;for(const p of [comingKeeper,...event.responses.filter(r=>r.player.side===event.side&&canReachBall(r.player,result.impactPoint)).map(r=>r.player)])registerMotion(event,28,p,0,event.duration,'实际传球终点的门将与进攻方争抢，按一次接球检定结果回放');
    }
    if (result.outcome==='intercept') registerMotion(event,11,owner,event.impactTime-0.10,event.duration,'球到达实际拦截点，结果为 intercept');
    for (const attempt of result.interceptAttempts || []) if (attempt.result==='failed') {
      const p=teams.flat().find(p=>nameOf(p)===attempt.player);
      const when=event.releaseTime+t.nominalFlight*(attempt.timeFraction??attempt.t);
      if(when>event.impactTime+.001)continue;
      registerMotion(event,11,p,when-0.08,Math.min(when+0.16,event.duration),'实际参与线路拦截但未成功');
    }
  }
  if (type==='shoot') {
    registerMotion(event,5,event.actor,0,event.releaseTime+0.2,'射门动作，触球下一帧开始线性飞行');
    if (result.outcome==='blocked') registerMotion(event,12,result.blocker,event.impactTime-0.08,event.impactTime+0.24,'球在 blocker 的可接触位置被封堵');
    if (result.outcome==='saved') registerMotion(event,14,teams[1-event.side].find(isGoalkeeper),event.impactTime-0.14,event.duration,result.caught?'扑救后抱住':'扑救后脱手');
    if(['wide','high'].includes(result.outcome))registerMotion(event,27,event.actor,event.impactTime,event.duration,result.outcome==='high'?'打高越过横梁后落定；二点另行结算':'打偏落在真实边界格；后续二点另行结算');
    if (result.outcome==='goal') {
      for (const p of [event.actor,teams[1-event.side].find(isGoalkeeper)]) registerMotion(event,15,p,event.impactTime,event.duration,p.side===event.side?'进球后的起身反应':'失球后的回望');
    }
  }
  for (const response of event.responses) if (response.kind==='PRESS' || response.kind==='CHALLENGE') registerMotion(event,6,response.player,0,t.responseEnd,response.kind);
  if (type==='duel' || type==='tackle') {
    registerMotion(event,6,event.actor,0,t.responseEnd,'上抢或回追的实际移动');
    if (!result.contactOccurred) registerMotion(event,25,event.actor,0,event.duration,'本事件不能形成接触，不播放断球或扑空');
  }
  if (result.contactOccurred) {
    if (['won','tackled'].includes(result.outcome)) registerMotion(event,7,owner,event.impactTime-0.10,event.duration,'发生接触且防守者实际取得球权');
    else if (['beaten','kept','failed'].includes(result.outcome)) {
      registerMotion(event,8,carrier,t.windEnd,event.duration,'发生接触且持球人实际保住球权');
      registerMotion(event,9,carrier,event.impactTime,event.motion.bufferEnd,'固定根位置转身，将球拉到防守者远侧');
      registerMotion(event,10,challenger,event.impactTime,event.duration,'参与接触的上抢者被晃过');
    } else if (result.outcome==='loose') {
      for (const p of [carrier,challenger]) registerMotion(event,26,p,event.impactTime,event.duration,'对抗结果是 loose，双方都没有球权');
    }
  }
  if(type==='scramble' && event.responses.some(r=>isGoalkeeper(r.player)) && new Set([event.actor,...event.responses.map(r=>r.player)]).size>1){
    event.result.keeperRace=true;for(const p of new Set([event.actor,...event.responses.map(r=>r.player)]))registerMotion(event,28,p,0,event.duration,'真实无主球争抢，先触球方控制，另一方制动');
  }
  if (type==='scramble') {
    if(state.actionHistory.at(-1)?.action==='shoot' && state.actionHistory.at(-1)?.result.outcome==='wide')for(const p of new Set([event.actor,...event.responses.map(r=>r.player)]))registerMotion(event,27,p,0,event.duration,'上一事件射偏；本事件独立结算真实第二落点争抢');
    for (const p of new Set([event.actor,...event.responses.map(r=>r.player)])) {
      if (isGoalkeeper(p)) registerMotion(event,14,p,0,event.duration,'门将被分配 CLAIM 且仅在自身禁区出击');
      else registerMotion(event,13,p,0,event.duration,'无主球争抢任务');
    }
  }
}
function motionResultOwner(event) {
  const r=event.result;
  if (event.type==='pass') return r.outcome==='complete'?r.winner:r.outcome==='intercept'?r.intercepter:null;
  if (event.type==='duel') return r.outcome==='won'?(r.turnoverPlayer||r.challenger):r.outcome==='beaten'||r.outcome==='unreached'?r.carrier:null;
  if (event.type==='carry') return r.outcome==='tackled'?r.turnoverPlayer:r.outcome==='kept'?event.actor:null;
  if (event.type==='tackle') return r.outcome==='won'?(r.turnoverPlayer||event.actor):r.outcome==='failed'?r.opponent:null;
  if (event.type==='shoot') return r.outcome==='saved'&&r.caught?teams[1-event.side].find(isGoalkeeper):r.outcome==='blocked'&&r.controlled?r.blocker:null;
  return r.winner || null;
}
function motionWaypointsStage0(from,to){
 const e=state.event,m=e?.trace.movements.find(v=>dist(v.from,from)<.1&&dist(v.to,to)<.1);
 if(m?.path?.length>1)return m.path.map(v=>({...v}));
 return [{...from},{...to}];
}
function controlledOffset(root,to,side) {
  const gap=dist(root,to),vx=gap>.1?(to.x-root.x)/gap:attackDir(side),vy=gap>.1?(to.y-root.y)/gap:0;
  return {x:root.x+vx*.9-vy*(Math.abs(vx)<.45?.75:0),y:root.y+vy*.9+vx*(Math.abs(vx)<.45?.75:0),z:0};
}
function bakeControlMotionsStage0(event) {
  const m=event.motion,owner=m.owner;
  m.controlTouches=[];
  if(!event.ballFlight && state.carrier){
    const track=m.tracks.get(state.carrier);m.initialCarrier=state.carrier;
    if(dist(track.from,track.anchor)>.1){
      m.initialDribble=buildDribbleMotion(motionWaypoints(track.from,track.anchor),0,event.impactTime,
        {startBall:event.physicalStart,endBall:event.contact?.point});
      m.controlTouches.push(...m.initialDribble.touches.map(time=>({time,player:nameOf(m.initialCarrier),phase:'advance'})));
    }
  }
  m.bufferEnd=Math.min(event.duration,event.impactTime+(event.quickContact?event.quickContact.cushion:event.type==='scramble'?event.quickLoose.cushion:event.result.receiveQuality?.controlled?.035+(1-event.result.receiveQuality.quality)*.16:.12));
  // Contact protection needs room for a turn; receiving keeps a short, visible cushion.
  if(event.contact && owner===event.contact.carrier&&!event.quickContact)m.bufferEnd=event.impactTime+.34;
  if(!owner)return;
  const track=m.tracks.get(owner),gap=dist(track.anchor,track.to);
  m.flowReceive=event.type==='pass' && event.result.outcome==='complete' && event.result.mode==='space' && !!event.trace.movements.find(v=>v.player===nameOf(owner)&&v.recoverySteps);
  m.bufferRoot=m.flowReceive?motionLerp(track.anchor,track.to,.07):{...track.anchor};
  m.impactBall=event.ballFlight?{...event.ballFlight.end}:event.contact?{...event.contact.point}:m.initialDribble?{...m.initialDribble.endBall}:{...event.physicalStart};
  if(event.contact?.carrier===owner && event.result.retentionMode==='stay'){
    const v={x:event.contact.point.x-track.anchor.x,y:event.contact.point.y-track.anchor.y};
    m.shieldAngle=Math.atan2(v.y,v.x);m.bufferRoot={...track.anchor};
    m.bufferBall={x:track.anchor.x-Math.cos(m.shieldAngle)*.9,y:track.anchor.y-Math.sin(m.shieldAngle)*.9,z:0};
  }else m.bufferBall=event.quickContact&&event.result.retentionMode==='stay'?{...m.impactBall,z:0}:v4ControlBall(event,m.bufferRoot,track.to,owner);
  const recovery=event.trace.movements.find(v=>v.player===nameOf(owner)&&v.recoverySteps);
  if(gap>.15 && !isGoalkeeper(owner) && event.result.retentionMode!=='stay'){
    m.recoveryDribble=buildDribbleMotion(motionWaypoints(m.bufferRoot,track.to),m.bufferEnd,event.duration,
      {initialSlope:m.flowReceive ? .45 : 0,startBall:m.bufferBall});
    m.controlTouches.push(...m.recoveryDribble.touches.map(time=>({time,player:nameOf(owner),phase:'control-recovery'})));
  }
}
function sampleControlledBall(event,e) {
  const m=event.motion,owner=m.owner,track=m.tracks.get(owner);
  if(m.shieldAngle!==undefined){
    const q=motionEase((e-event.impactTime)/(m.bufferEnd-event.impactTime)),angle=m.shieldAngle+Math.PI*q;
    return {x:track.anchor.x+Math.cos(angle)*.9,y:track.anchor.y+Math.sin(angle)*.9,z:0};
  }
  if(e<m.bufferEnd){
    const q=motionEase((e-event.impactTime)/(m.bufferEnd-event.impactTime));
    return {...motionLerp(m.impactBall,m.bufferBall,q),z:(m.impactBall.z||0)*(1-q)+(m.bufferBall.z||0)*q};
  }
  if(m.recoveryDribble)return {...m.recoveryDribble.sample(e).ball,z:0};
  const q=motionEase((e-m.bufferEnd)/(event.duration-m.bufferEnd||1));
  return {x:m.bufferBall.x+(track.to.x-m.bufferRoot.x)*q,y:m.bufferBall.y+(track.to.y-m.bufferRoot.y)*q,z:v4ControlHeight(event,owner)};
}
function samplePlayerMotionStage0(event,player,elapsed) {
  const track=event.motion.tracks.get(player), t=event.timeline;
  let point;
  if (elapsed<t.responseEnd) point=motionLerp(track.from,track.approach,motionEase(elapsed/t.responseEnd));
  else if (elapsed<event.impactTime) point=motionLerp(track.approach,track.anchor,motionEase((elapsed-t.responseEnd)/(event.impactTime-t.responseEnd || 1)));
  else point=motionLerp(track.anchor,track.to,motionEase((elapsed-event.impactTime)/(event.duration-event.impactTime||1)));
  if (event.contact && elapsed<t.responseEnd) {
    if (player===event.contact.carrier || player===event.contact.challenger || player===event.contact.helper) point=motionLerp(track.from,track.anchor,motionEase(elapsed/t.responseEnd));
  }
  // Sway belongs to the body/head pose, never to the player's ground root.
  const d=event.motion.initialDribble;
  if(d && player===(event.motion.initialCarrier||event.actor) && elapsed<=event.impactTime)point=d.sample(elapsed).root;
  if(event.motion.owner===player && elapsed>=event.impactTime){
    if(elapsed<event.motion.bufferEnd)point=motionLerp(track.anchor,event.motion.bufferRoot,motionEase((elapsed-event.impactTime)/(event.motion.bufferEnd-event.impactTime)));
    else if(event.motion.recoveryDribble)point=event.motion.recoveryDribble.sample(elapsed).root;
    else point=motionLerp(event.motion.bufferRoot,track.to,motionEase((elapsed-event.motion.bufferEnd)/(event.duration-event.motion.bufferEnd||1)));
  }
  const active=event.trace.animations.filter(a=>a.player===nameOf(player) && elapsed>=a.start && elapsed<a.start+a.duration);
  let pose=track.moving && elapsed<t.responseEnd? (Math.floor(elapsed*11)%2?'run_a':'run_b'):'observe';
  let facing=Math.abs(event.start.x-point.x)>0.5 ? Math.sign(event.start.x-point.x) : attackDir(player.side);
  if (track.moving && Math.abs(track.approach.x-track.from.x)>0.1) facing=Math.sign(track.approach.x-track.from.x);
  for (const a of active) {
    const q=(elapsed-a.start)/a.duration;
    if (a.id===1) pose=Math.floor(elapsed*9)%2?'carry_a':'carry_b';
    if (a.id===3 || a.id===5) {pose=elapsed<event.releaseTime?'setup':elapsed<event.releaseTime+0.05?'strike':'follow';facing=Math.sign((event.flightTarget||event.target).x-event.start.x)||attackDir(player.side);}
    if (a.id===4) pose=q<0.45?'control':'hold';
    if (a.id===6) pose=elapsed>t.responseEnd-0.12 && event.result.contactOccurred?'press':pose;
    if (a.id===7) pose=q<0.28?'press':q<0.58?'control':'carry_b';
    if (a.id===8) pose=Math.sin(q*Math.PI*4)>0?'beat_a':'beat_b';
    if (a.id===9 && q<0.40) pose='shield';
    if (a.id===10) pose=q<0.62?'beaten':'stand';
    if (a.id===11) pose=q<0.40?'press':event.motion.owner===player?'control':'beaten';
    if (a.id===12) pose=q<0.60?'block':'stand';
    if (a.id===13) pose=elapsed<event.impactTime?'run_b':event.motion.owner===player?'control':'beaten';
    if (a.id===14) pose=event.type==='shoot'?(q<0.4?'save':q<0.68?'save_down':event.result.caught?'hold':'stand'):elapsed<event.impactTime?'run_b':event.motion.owner===player?'hold':'beaten';
    if (a.id===15) pose=player.side===event.side?'celebrate':'lose';
    if (a.id===26) pose=q<0.5?'block':'press';
    if(a.id===27)pose=event.type==='shoot'?(q<.38?'follow':'lose'):elapsed<event.impactTime?'run_b':event.motion.owner===player?'control':'beaten';
    if(a.id===28)pose=elapsed<event.impactTime?'run_b':event.motion.owner===player?(isGoalkeeper(player)?'hold':'control'):'beaten';
    if(a.id===51)pose=elapsed<event.motion.bufferEnd?'control':'carry_b';
    if (a.id===31 && ['stand','observe'].includes(pose)) pose='fatigue';
  }
  if(event.contact?.carrier===player && ['beaten','kept','failed'].includes(event.result.outcome)){const q=clamp((elapsed-t.windEnd)/(event.motion.bufferEnd-t.windEnd),0,1),wave=Math.sin(q*Math.PI*4)*Math.sin(q*Math.PI);pose={...(MOTION_POSES[pose]||MOTION_POSES.stand),sway:wave*.52,lean:wave*21,head:-wave*.22};}
  const stroke=event.motion.owner===player && elapsed>=event.motion.bufferEnd?event.motion.recoveryDribble:player===(event.motion.initialCarrier||event.actor)&&elapsed<event.impactTime?event.motion.initialDribble:null;
  if(stroke){const sp=stroke.sample(elapsed);pose={lean:sp.pose.lean,lift:sp.pose.bob,squash:[sp.pose.width,1],lag:sp.pose.head,shift:0};facing=sp.facing;}
  return {point,pose,facing,activeAnimation:stroke?1:active.filter(a=>[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,26,27,28,31,51].includes(a.id)&&(a.id!==31||pose==='fatigue')).at(-1)?.id||null};
}
function updateEventMotionStage0(event) {
  const e=Math.min(event.elapsed,event.duration);
  for (const p of teams.flat()) {
    const sample=samplePlayerMotion(event,p,e);p.x=sample.point.x;p.y=sample.point.y;p.motionPose=sample.pose;p.motionFacing=sample.facing;p.motionDirection=sample.screenDirection;p.motionSample=sample;
  }
  event.responsesComplete=e>=event.timeline.responseEnd;
  event.resolved=e>=event.impactTime;
  if (event.ballFlight) {
    let ball;
    if(e<event.releaseTime)ball={...event.ballRoute.from};
    else if(e<event.impactTime){
      ball=sampleBallRoute(event.ballRoute,(e-event.releaseTime)/event.timeline.nominalFlight);
      event.ballFlight.progress=ball.t;
    }else{
      event.ballFlight.progress=event.result.impactT??1;
      const q=motionEase((e-event.impactTime)/(event.duration-event.impactTime||1)),owner=event.motion.owner;
      if(owner){ball=sampleControlledBall(event,e);
      }else ball=sampleBallRecovery(event,e);
    }
    state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z||0;state.ballHeight=state.ballZ*22*project(ball.x,ball.y).s;
    if(e>=event.releaseTime&&!event.kickPlayed){event.kickPlayed=true;playSfx(kickSfx);}
  } else {
    state.ballHeight=0;state.ballZ=0;
    let ball;
    if(e<event.impactTime){
      if(event.motion.initialDribble)ball=event.motion.initialDribble.sample(e).ball;
      else if(event.contact)ball=motionLerp(event.physicalStart,event.contact.point,motionEase(e/event.impactTime));
      else ball={...event.physicalStart};
    }else if(event.motion.owner)ball=sampleControlledBall(event,e);
    else ball=event.quickContact?quickLoosePoint(event.contact.point,event.result.landing,event.impactTime,event.impactTime+.08,e):motionLerp(event.contact?.point||event.start,event.result.landing||event.end,motionEase((e-event.impactTime)/(event.duration-event.impactTime||1)));
    state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z||0;
    state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;
  }
  if(!event.v4PlaybackOverride)captureMotionSample(event);
}

function playerExportSnapshotStage0(player) {
  return {
    name: nameOf(player), side: player.side, number: player.num, role: player.role,
    attributes: Object.fromEntries(SKILL_KEYS.map((key) => [key, Number(player[key].toFixed(2))])),
    currentStamina: Number(player.currentStamina.toFixed(2)),
    tendencies: { habit: player.habit, leading: player.leading, coachability: player.coachability },
  };
}

function snapshotTactics(side) {
  return {
    order: state.coachOrders[side], orderLabel: COACH_LABELS[state.coachOrders[side]],
    focusLane: state.focusLane[side], focusLaneLabel: LANE_LABELS[state.focusLane[side]],
  };
}

function motionFrame(event){
  const visible=v437VisibleOwner(event);
  return {elapsed:event?Number(Math.min(event.elapsed,event.duration).toFixed(4)):null,phase:event?phaseAt(event,event.elapsed):state.phase,
    visibleOwner:visible?nameOf(visible):null,committedOwner:state.carrier?nameOf(state.carrier):null,
    ball:{x:state.ball.x,y:state.ball.y,z:state.ballZ||0,logicalX:state.ball.tx,logicalY:state.ball.ty},
    players:teams.flat().map(p=>({side:p.side,num:p.num,role:p.role,x:p.x,y:p.y,plannedX:p.tx,plannedY:p.ty,pose:p.motionPose??null,facing:p.motionFacing??attackDir(p.side),reaction:p.reaction||''}))};
}
function captureMotionSampleStage0(event){
  if(!teams.flat().every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)) || !Number.isFinite(state.ball.x)||!Number.isFinite(state.ball.y))throw new Error('画面坐标异常，已暂停并保存现场');
  const samples=event.trace.motionSamples;if(!samples)return;
  const last=samples.at(-1),elapsed=Math.min(event.elapsed,event.duration),phase=phaseAt(event,elapsed);
  if(last && elapsed-last.elapsed<.2 && last.phase===phase && elapsed<event.duration)return;
  const frame=motionFrame(event);
  if(samples.length<80)samples.push(frame);else event.trace.motionSamplesTruncated=true;
  diagnostics.frame({round:state.round,actionSlot:event.actionSlot,type:event.type,...frame});
}
function checkCompletedEventStage0(event){
  const players=teams.flat(),cells=players.map(p=>{const c=cellOf(playerPoint(p));return `${c.col},${c.row}`;});
  const checks={movementBudget:event.trace.movements.every(m=>m.pathSteps<=(m.maxSteps??MAX_PLAYER_STEPS)),responseBudget:event.responses.length<=(event.type==='scramble'?8:MAX_RESPONDERS_PER_EVENT),
    uniqueFinalCells:new Set(cells).size===players.length,finitePositions:players.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),
    ballOwnerCell:!state.carrier||cellDistance(cellOf(playerPoint(state.carrier)),cellOf({x:state.ball.tx,y:state.ball.ty}))===0,
    motionSampleCount:event.trace.motionSamples.length,samplesTruncated:!!event.trace.motionSamplesTruncated};
  event.trace.checks=checks;
  const failures=Object.entries(checks).filter(([key,value])=>key!=='samplesTruncated'&&value===false);
  if(failures.length)diagnostics.record('invariant-failure',{type:event.type,failures});
  return checks;
}
function syncControlledBallStage0(){
  const p=state.carrier;if(!p)return;
  const offset=state.controlOffset||{x:isGoalkeeper(p)?0:attackDir(p.side)*.9,y:0};
  state.ball.tx=p.tx;state.ball.ty=p.ty;state.ball.x=p.x+offset.x;state.ball.y=p.y+offset.y;
  state.ballZ=isGoalkeeper(p)?.9:0;state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;
}
function showRuntimeFailure(){
  if(document.getElementById('game-runtime-error'))return;
  const overlay=document.createElement('div');overlay.id='game-runtime-error';overlay.setAttribute('role','alert');
  const panel=document.createElement('section'),title=document.createElement('h2'),text=document.createElement('p');
  title.textContent='比赛已暂停';text.textContent='正在保存异常现场到云端，请查看比赛记录中的保存状态后重新开赛。';
  const restart=document.createElement('button');restart.textContent='重新开赛';restart.id='failure-restart';
  restart.addEventListener('click',()=>restartSavedMatch());
  panel.append(title,text,restart);overlay.append(panel);document.body.append(overlay);
}

function resetAfterGoalStage0(kickoffSide) {
  for (const team of teams) {
    for (const p of team) {
      p.tx = p.hx;
      p.ty = p.hy;
      p.reaction = '';
    }
  }
  const kicker = v415RolePlayer(kickoffSide,9);
  const kickoffSpot = findFreeCell(kicker, { x: FIELD_L / 2 + attackDir(kickoffSide) * CELL_X, y: FIELD_W / 2 }, Infinity);
  if (kickoffSpot) {
    kicker.tx = kickoffSpot.x;
    kicker.ty = kickoffSpot.y;
  }
  setPossession(kicker);
}

// 全场 22 人的逐回合位置快照。用户要求"记录每个回合每个人的位置"，
// 这里把坐标、所在格子、体力、场上职责一次性固化，方便事后回放任一时刻的站位。
function snapshotAllPositions() {
  return teams.map((team, side) => team.map((player) => ({
    team: side === 0 ? '我方' : '对手',
    num: player.num,
    role: player.role,
    x: Number(player.tx.toFixed(2)),
    y: Number(player.ty.toFixed(2)),
    cell: (() => { const c = cellOf(playerPoint(player)); return `${c.col},${c.row}`; })(),
    stamina: Number((player.currentStamina ?? player.stamina ?? 100).toFixed(1)),
    // 相对本方球门的位置，用来判断是压上还是回收
    ownGoalDistance: Number(dist(playerPoint(player), { x: goalX(1 - player.side), y: FIELD_W / 2 }).toFixed(2)),
    reaction: player.reaction || '',
  })));
}
// 球权与球的位置
function snapshotBallState() {
  return {
    possession: state.possession === -1 ? 'loose' : state.possession === 0 ? '我方' : '对手',
    carrier: state.carrier ? nameOf(state.carrier) : null,
    ball: { x: Number(state.ball.tx.toFixed(2)), y: Number(state.ball.ty.toFixed(2)) },
    renderedBall:{x:state.ball.x,y:state.ball.y,z:state.ballZ||0},
  };
}

function finishRoundStage0() {
  const roundEvents = state.actionHistory.filter((item) => item.round === state.round);
  state.roundHistory.push({
    round: state.round,
    score: [...state.score],
    coachOrders: [...state.coachOrders],
    focusLane: [...state.focusLane],
    // 逐回合的完整站位快照：22 人 + 球
    positions: snapshotAllPositions(),
    ballState: snapshotBallState(),
    events: roundEvents.map((item) => {
      const duel = item.action === 'duel' ? {
        carrier: item.result.carrier, challenger: item.result.challenger,
        approachDistance: item.result.approachDistance, margin: item.result.margin,
        approachDetail: item.result.participants,
      } : null;
      return {
        eventId: item.eventId, side: item.side, action: item.action,
        actor: item.actor, outcome: item.result.outcome,
        from: item.start, to: item.result.landing,
        duel,
      };
    }),
  });
  if (state.round >= TOTAL_ROUNDS) {
    state.phase = 'end';state.matchCompletedAt??=new Date().toISOString();
    state.finalReaction = {id:36,kind:MATCH_ANIMATIONS[36],score:[...state.score],players:teams.flat().map(p=>({player:nameOf(p),reaction:state.score[p.side]>state.score[1-p.side]?'win':state.score[p.side]<state.score[1-p.side]?'lose':'draw'}))};
    const [a, b] = state.score;
    addLog(`终场哨响：${a > b ? '我方获胜！' : a < b ? '对手获胜。' : '比赛战平。'}`);
    window.ProgressLogger?.logProgress?.('match_end', { score: state.score });
    projectRecords.archive();
    return;
  }
  state.round++;
  if (state.round === HALFTIME_ROUND) {
    beginHalftime();
    return;
  }
  beginTacticsPhase();
}

function startMatchStage0() {
 state.matchStartedAt=new Date().toISOString();
  if (state.phase !== 'setup') return;
  state.draggingPlayer = null;
  diagnostics.record('match-start',{formation:state.formationIndex,tactics:[snapshotTactics(0),snapshotTactics(1)]});
  state.phase = 'autoWait';
  state.nextSide = state.possession;
  state.timer = 0.72;
  projectRecords.update();
  addLog(`主裁判吹响开场哨！我方${COACH_LABELS[state.coachOrders[0]]}，主攻${LANE_LABELS[state.focusLane[0]]}。`);
}
// 对手教练：按比分与阶段选择策略，再挑一条我方防守较薄弱的路
function chooseAiOrder() {
  const diff = state.score[1] - state.score[0];
  const late = state.round >= Math.ceil(TOTAL_ROUNDS*.75);
  if (diff < -1 || (late && diff < 0)) return 'attack';
  if (diff > 1) return state.round >= Math.ceil(TOTAL_ROUNDS*.85) ? 'defend' : 'counter';
  if (late && diff > 0) return 'counter';
  return state.coachOrders[1]||'possession';
}
function chooseAiLane() {
  const pressure = { left: 0, center: 0, right: 0 };
  for (const p of teams[0]) if (!isGoalkeeper(p)) pressure[laneOf(1, playerPoint(p))] += 1;
  let best = 'center';
  let bestScore = -Infinity;
  for (const lane of LANE_KEYS) {
    const own = teams[1].filter((p) => !isGoalkeeper(p) && laneOf(1, playerPoint(p)) === lane).length;
    const score = own * 1.3 - pressure[lane] * 1.7 + randomFor(`对手进攻方向选择:${lane}`, null) * 2.2;
    if (score > bestScore) { bestScore = score; best = lane; }
  }
  return best;
}
// 每回合开始前等待玩家确认战术；AI 同时确定自己的指令
function beginTacticsPhase() {
  state.aiTacticalPlan??={changes:0,lastRound:1,score:[...state.score],lastScore:[...state.score],history:[]};
  const plan=state.aiTacticalPlan,changedScore=state.score.some((v,i)=>v!==plan.lastScore[i]);
  plan.lastScore=[...state.score];
  const checkpoint=TACTICAL_POLICY.opponent.reviewRounds.includes(state.round),lateTrailing=state.round>=61&&state.score[1]<state.score[0];
  if(plan.changes<TACTICAL_POLICY.opponent.maximumChanges&&state.round-plan.lastRound>=TACTICAL_POLICY.opponent.minimumRoundGap&&(checkpoint||changedScore||lateTrailing)){
   const aiOrder=chooseAiOrder(),aiLane=chooseAiLane();
   if(aiOrder!==state.coachOrders[1]||aiLane!==state.focusLane[1]){
    plan.history.push({round:state.round,before:{order:state.coachOrders[1],lane:state.focusLane[1]},after:{order:aiOrder,lane:aiLane},reason:changedScore?'score-change':lateTrailing?'late-trailing':'planned-review'});
    state.coachOrders[1]=aiOrder;state.focusLane[1]=aiLane;plan.changes++;plan.lastRound=state.round;addLog('对手教练调整为'+COACH_LABELS[aiOrder]+'，主攻'+LANE_LABELS[aiLane]+'。');
   }
  }
  state.phase = 'tactics';
  state.timer = state.autoPlay ? 0.9 : 0;
}
function advanceRoundStage0() {
  if (state.phase !== 'tactics') return;
  state.phase = 'autoWait';
  state.timer = 0.35;
}
function canSwap(benchPlayer, fieldIndex) {
  const isKeeperSub = isGoalkeeper(benchPlayer);
  const outgoing=teams[0][fieldIndex];return !!outgoing&&isKeeperSub===isGoalkeeper(outgoing);
}
function swapWithBench(side, benchIndex, fieldIndex) {
  const incoming = benches[side][benchIndex];
  const outgoing = teams[side][fieldIndex];
  if (!incoming || !outgoing || outgoing.sentOff || incoming.sentOff) return false;
  if (isGoalkeeper(incoming)!==isGoalkeeper(outgoing)) {
    if (side === 0) addLog('替补门将只能替换门将。');
    return false;
  }
  if (state.subsUsed[side] >= MAX_SUBS) {
    if (side === 0) addLog('换人名额已用完（最多 5 人）。');
    return false;
  }
  incoming.role = outgoing.role;incoming.formationSlot=outgoing.formationSlot;
  incoming.onBench = false;
  outgoing.onBench = true;
  incoming.hx = outgoing.hx; incoming.hy = outgoing.hy;
  incoming.x = outgoing.x; incoming.y = outgoing.y;
  incoming.tx = outgoing.tx; incoming.ty = outgoing.ty;
  incoming.reaction = '';
  outgoing.x = 0; outgoing.y = 0; outgoing.tx = 0; outgoing.ty = 0; outgoing.reaction = '';
  teams[side][fieldIndex] = incoming;
  benches[side][benchIndex] = outgoing;
  if (state.selectedPlayer === outgoing) state.selectedPlayer = incoming;
  if (state.carrier === outgoing) state.carrier = incoming;
  if (state.draggingPlayer === outgoing) state.draggingPlayer = null;
  state.subsUsed[side]++;diagnostics.record('substitution',{side,outgoing:playerExportSnapshot(outgoing),incoming:playerExportSnapshot(incoming),ball:snapshotBallState()});
  addLog(`${side === 0 ? '我方' : '对手'}换人：${outgoing.num}号${outgoing.role}下场，${incoming.num}号${incoming.role}登场。`);
  return true;
}
function applyFormationStage0(index) {
  const preset = FORMATION_PRESETS[index];
  if (!preset) return;
  for (let i = 0; i < teams[0].length; i++) {
    const slot=teams[0][i].formationSlot??i;
    const [fc, fr] = preset.cells[slot];
    const { x, y } = cellPoint(Math.floor((fc+.5)*GRID_COLS/15), Math.floor((fr+.5)*GRID_ROWS/9));
    const p = teams[0][i];
    p.role = p.emergencyKeeper?'临时门将':preset.roles[slot];
    p.hx = x; p.hy = y; p.x = x; p.y = y; p.tx = x; p.ty = y;
  }
  state.formationIndex = index;
  syncControlledBall();diagnostics.record('formation-change',{index});
  state.selectedPlayer = teams[0][Math.min(index, teams[0].length - 1)] || v415RolePlayer(0,9);
  addLog(`我方阵型切换为 ${preset.name}。`);
}
function beginHalftimeStage0() {
  state.phase = 'halftime';
  state.benchSelection = null;
  state.draggingPlayer = null;
  for (const team of teams) {
    for (const p of team) {
      p.currentStamina = EXECUTION_DICE.fatigueEnabled?clamp(p.currentStamina + BALANCE.fatigue.halftimeRecovery, BALANCE.fatigue.minStamina, BALANCE.fatigue.halftimeCap):100;
      p.x = p.hx; p.y = p.hy; p.tx = p.hx; p.ty = p.hy;
      p.reaction = '';
    }
  }
  for (const p of benches[1]) p.currentStamina = 100;
  let subs = 0;
  for (let i = 1; i < teams[1].length && subs < 3; i++) {
    if (teams[1][i].currentStamina > 46) continue;
    const benchIndex = benches[1].findIndex((b) => !isGoalkeeper(b));
    if (benchIndex < 0) break;
    if (swapWithBench(1, benchIndex, i)) subs++;
  }
  syncControlledBall();diagnostics.record('halftime',{positions:snapshotAllPositions(),ball:snapshotBallState()});
  state.timer = state.autoPlay ? 2.6 : 0;
  addLog('中场休息：双方回到阵型、体力部分恢复，可调整阵型与换人。');
}
function resumeSecondHalf() {
  if (state.phase !== 'halftime') return;
  state.benchSelection = null;
  diagnostics.record('second-half-start');
  addLog('下半场开始！');
  beginTacticsPhase();
}
function nearestEnemyDistance(side, point) {
  const enemies = teams[1 - side].filter((p) => !isGoalkeeper(p));
  return enemies.length ? Math.min(...enemies.map((p) => dist(playerPoint(p), point))) : 24;
}

function chooseShotTargetStage0(side) {
  const attackPoint=state.carrier?playerPoint(state.carrier):state.pendingAerial?.contactPoint||state.specialAerialPoint;
  const candidates = [31, 33, 35, 37].map((y) => ({ x: goalX(side), y }));
  return candidates.map((point) => {
    const keeper = v415RolePlayer(1 - side,0);
    const keeperGap = dist(playerPoint(keeper), { x: goalX(side) - attackDir(side) * 2.5, y: point.y });
    const blockCount = laneDefenders(side, attackPoint||point, point, 3.5).length;
    return { point, score: keeperGap * 0.55 - blockCount * 4 - Math.abs(point.y - FIELD_W / 2) * 0.12 };
  }).sort((a, b) => b.score - a.score)[0].point;
}


// ---------- Field and player rendering ----------

// 把玩家选定的进攻方向画成球场上的一条半透明色带

// 传球/射门时画出球的飞行线路与落点

// 落点光圈：飞行期间在目标点画一个逐渐收缩的圆环，让观众提前知道球会去哪

// 跑位意图连线：每个响应者从当前位置到目标点画一条淡色虚线

// 动作动画：扑空 / 护球转身 / 扑救 / 拦截 / 封堵 / 进球

// 最下方的我方阵容带：11 人分两行，一眼看完全队的体力与关键属性。

function passRate(side) {
  return state.stats[side].passes ? Math.round(state.passSuccess[side] / state.stats[side].passes * 100) : 0;
}

function renderStage0() {
  const endControls=document.getElementById('end-controls');if(endControls)endControls.hidden=state.phase!=='end';
  ctx.fillStyle = '#081020'; ctx.fillRect(0, 0, W, H);
  if (bg.complete && bg.naturalWidth) {
    ctx.drawImage(bg, 0, 0, W, H);
    ctx.fillStyle = 'rgba(5,10,25,0.55)'; ctx.fillRect(0, 0, W, H);
  }
  drawPitch();
  drawPlayers();
  drawActionAnimations();
  drawHUD();
  v445DrawHighlight();
  if (state.phase === 'halftime') drawHalftime();
}

// ---------- Input: formation only before kickoff ----------
function fieldTargetAt(screenX, screenY) {
  if (screenY < P_TOP || screenY > P_BOT) return null;
  const point = unproject(screenX, screenY);
  const left = project(0, point.y).x;
  const right = project(FIELD_L, point.y).x;
  return screenX >= left && screenX <= right ? point : null;
}
function hitPlayer(screenX, screenY) {
  let best = null;
  let bestD = 38;
  for (const team of teams) {
    for (const p of team) {
      const s = project(p.x, p.y);
      const d = Math.hypot(screenX - s.x, screenY - (s.y - 28 * s.s));
      if (d < bestD) { bestD = d; best = p; }
    }
  }
  return best;
}
function canvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: (e.clientX - rect.left) * W / rect.width, y: (e.clientY - rect.top) * H / rect.height };
}
function unlockAudio() {
  if (audioStarted) return;
  audioStarted = true;
  if (!muted) music.play().catch(() => {});
}
canvas.addEventListener('pointerdown', (e) => {
  const point = canvasPoint(e);
  const { x, y } = point;
  unlockAudio();
  if (state.phase === 'end') {
    // Restart is an explicit button; clicking the score or field does nothing.
    return;
  }
  if (inRect(point, muteButton)) {
    muted = !muted;
    if (muted) music.pause(); else music.play().catch(() => {});
    return;
  }
  if (state.phase === 'halftime') {
    if (inRect(point, halftimeContinueButton)) { resumeSecondHalf(); return; }
    const formation = anyRect(point, halftimeFormationButtons);
    if (formation) { applyFormation(formation.index); return; }
    const benchRow = anyRect(point, halftimeBenchRows);
    if (benchRow) {
      state.benchSelection = state.benchSelection === benchRow.index ? null : benchRow.index;
      return;
    }
    const fieldRow = anyRect(point, halftimeFieldRows);
    if (fieldRow) {
      if (state.benchSelection === null) state.selectedPlayer = teams[0][fieldRow.index];
      else if (swapWithBench(0, state.benchSelection, fieldRow.index)) state.benchSelection = null;
      return;
    }
    state.benchSelection = null;
    return;
  }
  const lane = anyRect(point, laneButtons);
  if (lane) {
    state.focusLane[0] = lane.lane;if(!state.event)state.coachSlot=null;diagnostics.record('tactics-change',{lane:lane.lane});
    addLog(`我方主攻方向改为${LANE_LABELS[lane.lane]}，该路传球与前插会加分。`);
    return;
  }
  const style = anyRect(point, styleButtons);
  if (style) {
    state.coachOrders[0] = style.style;if(!state.event)state.coachSlot=null;diagnostics.record('tactics-change',{order:style.style});
    addLog(`我方教练布置：${COACH_LABELS[style.style]}，球员按全队纪律响应，熟悉程度控制战术影响。`);
    return;
  }
  if (state.phase === 'tactics') {
    if (inRect(point, advanceButton)) { advanceRound(); return; }
    if (inRect(point, autoButton)) {
      state.autoPlay = !state.autoPlay;diagnostics.record('autoplay-change',{enabled:state.autoPlay});
      state.timer = state.autoPlay ? 0.6 : 0;
      addLog(state.autoPlay ? '连续推进已开启，回合将自动开始。' : '连续推进已关闭，等待手动执行回合。');
      return;
    }
  }
  if (state.phase !== 'setup') {
    const inspected = hitPlayer(x, y);
    if (inspected) state.selectedPlayer = inspected;
    return;
  }
  const formation = anyRect(point, formationButtons);
  if (formation) { applyFormation(formation.index); return; }
  if (inRect(point, startButton)) { startMatch(); return; }
  const clickedPlayer = hitPlayer(x, y);
  if (!clickedPlayer || clickedPlayer.side !== 0) return;
  state.selectedPlayer = clickedPlayer;
  const fieldPoint = unproject(x, y);
  state.draggingPlayer = clickedPlayer;
  state.dragOffset = { x: clickedPlayer.x - fieldPoint.x, y: clickedPlayer.y - fieldPoint.y };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (state.phase !== 'setup' || !state.draggingPlayer) return;
  const { x, y } = canvasPoint(e);
  const point = fieldTargetAt(x, y);
  if (!point) return;
  const player = state.draggingPlayer;
  const destination = findFreeCell(player, { x: point.x + state.dragOffset.x, y: point.y + state.dragOffset.y });
  if (!destination) return;
  player.x = destination.x;
  player.y = destination.y;
  player.tx = destination.x;
  player.ty = destination.y;
  player.hx = destination.x;
  player.hy = destination.y;
});
function stopDragging() { state.draggingPlayer = null; }
canvas.addEventListener('pointerup', stopDragging);
canvas.addEventListener('pointercancel', stopDragging);
addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || e.repeat) return;
  e.preventDefault();
  unlockAudio();
  if (state.phase === 'setup') startMatch();
  else if (state.phase === 'halftime') resumeSecondHalf();
  else if (state.phase === 'tactics') advanceRound();
  else if (state.phase === 'end') restartSavedMatch();
});

// ---------- Animation loop ----------
// 推进某个动作动画的进度，并在结束时清除

function updateStage0(dt) {
  state.motionClock=(state.motionClock || 0)+dt;
  const event=state.phase==='resolving'?state.event:null;
  if (event) {
    event.elapsed+=dt;event.stage=phaseAt(event,event.elapsed);
    updateEventMotion(event);
    if (event.elapsed>=event.duration) finishEvent();
  } else {
    for (const p of teams.flat()) {
      p.motionPose=null;
      p.x+=(p.tx-p.x)*Math.min(1,dt*5.2);
      p.y+=(p.ty-p.y)*Math.min(1,dt*5.2);
    }
    if (state.carrier) {const offset=state.controlOffset||{x:attackDir(state.carrier.side)*.9,y:0};state.ball.x=state.carrier.x+offset.x;state.ball.y=state.carrier.y+offset.y;state.ball.tx=state.carrier.tx;state.ball.ty=state.carrier.ty;}
    else {state.ball.x+=(state.ball.tx-state.ball.x)*Math.min(1,dt*5.5);state.ball.y+=(state.ball.ty-state.ball.y)*Math.min(1,dt*5.5);}
    state.ballZ=state.carrier&&isGoalkeeper(state.carrier)?.9:0;state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;
    if (state.phase==='autoWait') {state.timer-=dt;if (state.timer<=0) chooseAutoAction(state.nextSide);}
    else if (state.phase==='tactics' && state.autoPlay) {state.timer-=dt;if (state.timer<=0) advanceRound();}
  }
  if (state.phase==='halftime' && state.autoPlay && state.timer>0) {state.timer-=dt;if (state.timer<=0) resumeSecondHalf();}
  if (state.flash > 0) state.flash -= dt;
  if (state.exportFeedbackTimer > 0) {
    state.exportFeedbackTimer -= dt;
    if (state.exportFeedbackTimer <= 0) state.exportFeedback = '';
  }
}
let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if(state.runtimeFailure)return;
  try{update(dt);render();}
  catch(error){state.runtimeFailure=true;diagnostics.error(error,'frame-error');try{diagnostics.saveFailure(buildMatchRecord());}catch(saveError){diagnostics.error(saveError,'record-build-error');}showRuntimeFailure();return;}
  


if(!platform.headless)requestAnimationFrame(loop);
}
const {recordCompletedEvent,buildMatchRecord}=createRuntimeRecorder({chainAfter:()=>{},get v430ActualTaskResults(){return v430ActualTaskResults;},get v415Rules(){return v415Rules;},get v416BakeFacts(){return v416BakeFacts;},get state(){return state;},get TOTAL_ROUNDS(){return TOTAL_ROUNDS;},get nameOf(){return nameOf;},get playerExportSnapshot(){return playerExportSnapshot;},get routeSummary(){return routeSummary;},get checkCompletedEvent(){return checkCompletedEvent;},get snapshotAllPositions(){return snapshotAllPositions;},get snapshotBallState(){return snapshotBallState;},get RULES_VERSION(){return RULES_VERSION;},get teams(){return teams;},get BALANCE_VERSION(){return BALANCE_VERSION;},get PLAYER_DATA(){return PLAYER_DATA;},get v418Settings(){return v418Settings;},get v424Chemistry(){return v424Chemistry;},get v446Coaching(){return v446Coaching;},get v429Tuning(){return v429Tuning;},get v46CellEqual(){return v46CellEqual;},get countMatchStatistics(){return countMatchStatistics;},get RECORD_CONTRACT(){return RECORD_CONTRACT;},get GAME_VERSION(){return GAME_VERSION;},get snapshotTactics(){return snapshotTactics;},get benches(){return benches;},get balanceFingerprint(){return balanceFingerprint;},get BALANCE(){return BALANCE;},get DECISION_CONFIG(){return DECISION_CONFIG;},get diagnostics(){return diagnostics;}});
const {drawMotionFigureStage0,drawActionAnimations,drawPitch,drawFocusLane,drawBallTrail,drawLandingReticle,drawIntentLines,drawGrid,drawCellOutline,drawGoal,poly,drawPlayers,drawHUDStage0,toggleButton,primaryButton,drawCoachPanel,drawEventPanel,drawSquadCard,drawSquadStrip,drawBottomPanel,drawPlayerRow,drawHalftime,panel,roundRect,drawMotionFigureStage1,drawMotionFigureStage2,drawHUDStage1,drawHUDStage2}=createRenderer({get MOTION_POSES(){return MOTION_POSES;},get attackDir(){return attackDir;},get state(){return state;},get clamp(){return clamp;},get project(){return project;},get ctx(){return ctx;},get isGoalkeeper(){return isGoalkeeper;},get FIELD_L(){return FIELD_L;},get FIELD_W(){return FIELD_W;},get gridPenaltyBox(){return gridPenaltyBox;},get gridGoalArea(){return gridGoalArea;},get penaltySpot(){return penaltySpot;},get laneRange(){return laneRange;},get CELL_X(){return CELL_X;},get CELL_Y(){return CELL_Y;},get routePoint(){return routePoint;},get GRID_COLS(){return GRID_COLS;},get GRID_ROWS(){return GRID_ROWS;},get cellOf(){return cellOf;},get teams(){return teams;},get v437VisibleOwner(){return v437VisibleOwner;},get drawMotionFigure(){return drawMotionFigure;},get W(){return W;},get TOTAL_ROUNDS(){return TOTAL_ROUNDS;},get muteButton(){return muteButton;},get muted(){return muted;},get H(){return H;},get passRate(){return passRate;},get FORMATION_PRESETS(){return FORMATION_PRESETS;},get nameOf(){return nameOf;},get laneButtons(){return laneButtons;},get LANE_LABELS(){return LANE_LABELS;},get styleButtons(){return styleButtons;},get COACH_LABELS(){return COACH_LABELS;},get COACH_HINTS(){return COACH_HINTS;},get v415RolePlayer(){return v415RolePlayer;},get SKILL_KEYS(){return SKILL_KEYS;},get SKILL_LABELS(){return SKILL_LABELS;},get HABIT_LABELS(){return HABIT_LABELS;},get BALL_ROUTE_LABELS(){return BALL_ROUTE_LABELS;},get SQUAD_STRIP(){return SQUAD_STRIP;},get formationButtons(){return formationButtons;},get startButton(){return startButton;},get advanceButton(){return advanceButton;},get autoButton(){return autoButton;},get MAX_SUBS(){return MAX_SUBS;},get halftimeFieldRows(){return halftimeFieldRows;},get canSwap(){return canSwap;},get benches(){return benches;},get halftimeBenchRows(){return halftimeBenchRows;},get halftimeFormationButtons(){return halftimeFormationButtons;},get halftimeContinueButton(){return halftimeContinueButton;},get v413Draw(){return v413Draw;},get v415Draw(){return v415Draw;},get throwHandAnchors(){return throwHandAnchors;},get v415Hud(){return v415Hud;},get v415Rules(){return v415Rules;},get RESTART_NAMES(){return RESTART_NAMES;},get v434HUD(){return v434HUD;},get v434PrepareState(){return v434PrepareState;}});
const drawMotionFigure=drawMotionFigureStage2;const drawHUD=drawHUDStage2;
const {v419Prefs,v419Players,v419Select,v419Decision,v419StartIntent}=createDecisionController({chainSelect:(scene,ordinary)=>ordinary,get defaultPreferences(){return defaultPreferences;},get teams(){return teams;},get v416PlayerId(){return v416PlayerId;},get nameOf(){return nameOf;},get isGoalkeeper(){return isGoalkeeper;},get playerPoint(){return playerPoint;},get v437CanTackle(){return v437CanTackle;},get v419Scene(){return v419Scene;},get randomFor(){return randomFor;},get chooseIntent(){return chooseIntent;},get DECISION_CONFIG(){return DECISION_CONFIG;},get state(){return state;},get geometryLocation(){return geometryLocation;},get beginEvent(){return beginEvent;}});

const {commitLiveOutcome,settleLiveEvent,settleRulesOrLiveEvent,finishEvent}=createEventSettlement({get state(){return state;},get setPossession(){return setPossession;},get addLog(){return addLog;},get nameOf(){return nameOf;},get setLooseBall(){return setLooseBall;},get playSfx(){return playSfx;},get goalSfx(){return goalSfx;},get resetAfterGoal(){return resetAfterGoal;},get v415RolePlayer(){return v415RolePlayer;},get teams(){return teams;},get syncControlledBall(){return syncControlledBall;},get applyEventFatigue(){return applyEventFatigue;},get recordCompletedEvent(){return recordCompletedEvent;},get projectRecords(){return projectRecords;},get diagnostics(){return diagnostics;},get finishRound(){return finishRound;},get Math(){return Math;},get snapshotBallState(){return snapshotBallState;},get isGoalkeeper(){return isGoalkeeper;},get v4KeeperHeight(){return v4KeeperHeight;},get chooseAutoAction(){return ()=>{state.timer=0;};},get advanceRound(){return advanceRound;},get cellOf(){return cellOf;},get playerPoint(){return playerPoint;},get v415Rules(){return v415Rules;},get penaltySpot(){return penaltySpot;},get v415Award(){return v415Award;},get v415ApplyCard(){return v415ApplyCard;},get RESTART_NAMES(){return RESTART_NAMES;},get v415ChargeEvent(){return v415ChargeEvent;},get v415Touch(){return v415Touch;},get v434FinishPreparation(){return v434FinishPreparation;},get v422ClearOldIntent(){return v422ClearOldIntent;},get v45Movement(){return v45Movement;},get dist(){return dist;}});

const {chooseAutoAction}=createSlotPlanner({tryRoutine:()=>!platform.disableRoutines&&v453Routines.tryStart(),get state(){return state;},get v434PrepareState(){return v434PrepareState;},get v415Rules(){return v415Rules;},get PHASE_CONFIG(){return PHASE_CONFIG;},get v434OpenPreparation(){return v434OpenPreparation;},get v434Taker(){return v434Taker;},get isGoalkeeper(){return isGoalkeeper;},get v434BeginPreparation(){return v434BeginPreparation;},get teams(){return teams;},get v46CellEqual(){return v46CellEqual;},get playerPoint(){return playerPoint;},get setPossession(){return setPossession;},get inGridPenaltyArea(){return inGridPenaltyArea;},get cellDistance(){return cellDistance;},get cellOf(){return cellOf;},get dist(){return dist;},get Math(){return Math;},get DECISION_CONFIG(){return DECISION_CONFIG;},get v419Prefs(){return v419Prefs;},get randomFor(){return randomFor;},get beginEvent(){return beginEvent;},get nameOf(){return nameOf;},get v429CommitTuning(){return v429CommitTuning;},get v424CommitChemistry(){return v424CommitChemistry;},get v422PossessionBoundary(){return v422PossessionBoundary;},get v415RestartAction(){return v415RestartAction;},get chooseShotTarget(){return chooseShotTarget;},get v445AerialChoice(){return v445AerialChoice;},get v419Select(){return v419Select;},get v419StartIntent(){return v419StartIntent;}});

const {resolveContestStage0,resolveDuelStage0,resolveCarryStage0,resolveTackleStage0,resolveShotStage0,resolveEventStage0,resolveDuelStage1,resolveCarryStage1,resolveTackleStage1,resolveShotStage1,resolvePassStage2,resolveEventStage1,resolveContestStage1,planControlRecoveryStage2,resolveCarryStage2,resolveEventStage2,resolveEventStage3,resolveContestStage2,planControlRecoveryStage3,resolveContestStage3,v434ApplyPassWinner,v434ResolvePass,resolveLooseContestStage2,resolveContestStage4,planControlRecoveryStage4,resolveEventStage4}=createEventResolution({get state(){return state;},get v4DoubleSupport(){return v4DoubleSupport;},get adjacentContact(){return adjacentContact;},get Math(){return Math;},get nameOf(){return nameOf;},get playerPoint(){return playerPoint;},get v45Performance(){return v45Performance;},get contestScore(){return contestScore;},get dist(){return dist;},get recordContactExcursion(){return recordContactExcursion;},get resolveContest(){return resolveContest;},get planControlRecovery(){return planControlRecovery;},get snapped(){return snapped;},get v46TackleAllowed(){return v46TackleAllowed;},get teams(){return teams;},get isGoalkeeper(){return isGoalkeeper;},get goalX(){return goalX;},get eventRouteContact(){return eventRouteContact;},get isInPenaltyArea(){return isInPenaltyArea;},get contestProxy(){return contestProxy;},get deflectionSpot(){return deflectionSpot;},get canReachBall(){return canReachBall;},get sampleBallRoute(){return sampleBallRoute;},get clamp(){return clamp;},get BALANCE(){return BALANCE;},get skill(){return skill;},get randomFor(){return randomFor;},get routePoint(){return routePoint;},get inBounds(){return inBounds;},get resolvePass(){return resolvePass;},get resolveDuel(){return resolveDuel;},get resolveCarry(){return resolveCarry;},get resolveTackle(){return resolveTackle;},get resolveShot(){return resolveShot;},get resolveLooseContest(){return resolveLooseContest;},get v4OldResolveDuel(){return v4OldResolveDuel;},get v4ContactTags(){return v4ContactTags;},get v4OldResolveCarry(){return v4OldResolveCarry;},get v4OldResolveTackle(){return v4OldResolveTackle;},get v4CanAerial(){return v4CanAerial;},get v4OldResolveShot(){return v4OldResolveShot;},get v45Quality(){return v45Quality;},get v46CellEqual(){return v46CellEqual;},get v45PointAt(){return v45PointAt;},get v45BallTime(){return v45BallTime;},get v47Resolve(){return v47Resolve;},get v47ClearCarryChoice(){return v47ClearCarryChoice;},get v45Movement(){return v45Movement;},get pathLength(){return pathLength;},get v45ShotDecision(){return v45ShotDecision;},get TOTAL_ROUNDS(){return TOTAL_ROUNDS;},get HALFTIME_ROUND(){return HALFTIME_ROUND;},get v411Contest(){return v411Contest;},get cellOf(){return cellOf;},get v45CellKey(){return v45CellKey;},get cellDistance(){return cellDistance;},get findGridPath(){return findGridPath;},get cellPoint(){return cellPoint;},get nearestEnemyDistance(){return nearestEnemyDistance;},get attackDir(){return attackDir;},get maxPassRange(){return maxPassRange;},get laneDefenders(){return laneDefenders;},get shotLocation(){return shotLocation;},get v413OwnedContact(){return v413OwnedContact;},get v415Rules(){return v415Rules;},get v415Snapshot(){return v415Snapshot;},get v415Resolve(){return v415Resolve;},get v415LastTouch(){return v415LastTouch;},get v45Release(){return v45Release;},get closestOnSegment(){return closestOnSegment;},get v415ContactFoul(){return v415ContactFoul;},get v415Touch(){return v415Touch;},get boundaryRestart(){return boundaryRestart;},get v415AerialResolve(){return v415AerialResolve;},get v417Contest(){return v417Contest;},get v437CanTackle(){return v437CanTackle;},get v417Model(){return v417Model;},get v422Recovery(){return v422Recovery;},get v434Contest(){return v434Contest;},get v434Eligible(){return v434Eligible;},get neighbouringBall(){return neighbouringBall;},get v434ReactionRoot(){return v434ReactionRoot;},get v434Willing(){return v434Willing;},get v435PassRole(){return v435PassRole;},get inGridPenaltyArea(){return inGridPenaltyArea;},get v437ContestBefore(){return v437ContestBefore;},get v437RecoveryBefore(){return v437RecoveryBefore;},get v437ResolveBefore(){return v437ResolveBefore;},get GRID_COLS(){return GRID_COLS;},get GRID_ROWS(){return GRID_ROWS;}});
const planControlRecovery=planControlRecoveryStage4;
const resolveContest=resolveContestStage4;
const resolveLooseContest=resolveLooseContestStage2;
const resolvePass=resolvePassStage2;
const resolveDuel=resolveDuelStage1;
const resolveCarry=resolveCarryStage2;
const resolveTackle=resolveTackleStage1;
const resolveShot=resolveShotStage1;
const resolveEvent=resolveEventStage4;
const {v430ConfirmIntents,v430FitPresentation,v430ActualTaskResults}=createTeamExecution({chainTasks:(e,plan)=>routineTasks(e,v453Chains.tasks(e,plan),state),get state(){return state;},get teams(){return teams;},get v416DutyPlan(){return v416DutyPlan;},get nameOf(){return nameOf;},get Math(){return Math;},get pathLength(){return pathLength;},get playerPoint(){return playerPoint;},get v416PlayerId(){return v416PlayerId;},get executionIntentSatisfied(){return executionIntentSatisfied;},get geometryLine(){return geometryLine;},get dist(){return dist;},get TEAM_PLAN(){return TEAM_PLAN;},get DECISION_CONFIG(){return DECISION_CONFIG;}});

// V4 mechanisms: results are baked once; all playback consumes these resolved facts.
const V4_IDS = {header_attack:81,header_defend:82,header_miss:83,volley:84,volley_miss:85,slide_win:86,slide_loose:87,slide_miss:88,feint_stay:89,feint_escape:90,feint_lost:91,double_press:92,double_support:93,dispossessed:94,block_miss:95,block_control:96,save_miss:97,mark_run:98,cover_run:99,cut_lane_run:100,support_run:101,wide_support_run:102,receive_run:103,forward_run:104,second_ball_run:105,receive_miss:106,keeper_release:107,keeper_second_claim:108,followup_shot:109,wall_pass:110,wall_return:111};
for(const [key,id] of Object.entries(V4_IDS))MATCH_ANIMATIONS[id]=FOOTBALL_ACTIONS[key];
function v4Trace(event){return event.trace.v4 ||= {clips:[],actualResponses:[],cancelled:[]};}
function v4Clip(event,key,p,contact,end=null,priority=50){
 if(!p)return;const minimum=key.startsWith('slide')?.55:.32;
 const start=Math.max(0,contact-minimum),duration=Math.max(.12,(contact-start)/FOOTBALL_CONTACT_PHASE);
 const stop=end??Math.min(event.duration,start+duration);
 const clip={key,player:nameOf(p),start,end:Math.max(start+.001,stop),duration,contact,priority};
 v4Trace(event).clips.push(clip);registerMotion(event,V4_IDS[key],p,clip.start,clip.end,'V4实际任务/结果分支');
}
function v4RunClip(event,key,p,start=0,end=event.timeline.responseEnd){
 if(!p||end<=start)return;const clip={key,player:nameOf(p),start,end,loop:true,priority:10};
 v4Trace(event).clips.push(clip);registerMotion(event,V4_IDS[key],p,start,end,'记录的合法任务路径');
}
function v4KeeperHeight(p){return isGoalkeeper(p)&&state.keeperBallMode==='hands'?.9:0;}
function v4CanAerialStage0(p,point,mode){
 return !isGoalkeeper(p)&&canReachBall(p,point)&&point.z>=(mode==='header'?1.35:.4)&&point.z<=(mode==='header'?2.7:1.3);
}
function v4AerialPoint(event){
 const mode=event.result.aerialMode||'header',points=[];
 for(let i=65;i<=99;i++){
  const t=i/100,p=routePoint(event.ballRoute,t);if(p.z<(mode==='header'?1.35:.4)||p.z>(mode==='header'?2.7:1.3))continue;
  const cx=p.x/CELL_X,cy=p.y/CELL_Y;
  const boundary=Math.min(Math.abs(cx-Math.round(cx))*CELL_X,Math.abs(cy-Math.round(cy))*CELL_Y);
  // Qualified aerial contacts need not lie within 35cm of a grid line.
  const intendedDistance=dist(p,event.result.receiveSpot);
  points.push({t,point:p,score:-intendedDistance*.45-boundary*(mode==='header'?1.4:.15)+t*3});
 }
 return points.sort((a,b)=>b.score-a.score)[0]||null;
}
const v4OldPrepareRoute=prepareActualBallRouteStage0;
function prepareActualBallRouteStage1(event){
 // A foot release must begin at feet even when the preceding result was a hand catch.
 if(event.type==='pass'&&isGoalkeeper(event.actor)&&state.keeperBallMode==='hands'){
  event.v4KeeperRelease={from:{...event.physicalStart,z:.9},to:{x:event.actor.x+attackDir(event.side)*.9,y:event.actor.y,z:0}};
  event.physicalStart={...event.v4KeeperRelease.to};event.startHeight=0;
 }
 if((event.type==='shoot'||event.result.headerLayoff)&&event.result.aerial){
  const a=event.result.aerial;event.physicalStart={...a.contactPoint};event.start={x:a.contactPoint.x,y:a.contactPoint.y};event.startHeight=a.contactPoint.z;
 }
 v4OldPrepareRoute(event);
 if(event.type==='pass'&&event.result.loft){
  event.routeKind='loft';
  const make=()=>buildBallRoute({...event.physicalStart,z:event.startHeight||0},{...event.flightTarget,z:.85},{kind:'loft',bend:event.routeBend,apex:event.result.aerialMode==='header'?3.2:1.45,speed:21,ratio:.78});
  event.ballRoute=make();for(let i=0;i<3&&event.ballRoute.length>maxPassRange(event.actor)+.001;i++){event.flightTarget=limitDistance(event.start,event.flightTarget,dist(event.start,event.flightTarget)*maxPassRange(event.actor)/event.ballRoute.length);event.ballRoute=make();}
  event.trace.ballRoute.kind='loft';event.trace.ballRoute.selected='高球攻门准备';event.trace.ballRoute.reason='保留传球偏差，实际高球线路决定地面拦截与空中接触';
  const hit=v4AerialPoint(event);if(hit){
   const fraction=routeTimeAtT(event.ballRoute,hit.t),handoff=Math.max(0,fraction-.25/event.ballRoute.duration);
   event.v4Aerial={mode:event.result.aerialMode,contactPoint:hit.point,contactT:hit.t,contactFraction:fraction,handoffFraction:handoff,handoffT:sampleBallRoute(event.ballRoute,handoff).t,incomingRoute:event.ballRoute,receiver:event.result.receiver,attackSide:event.side,sourceEventId:state.actionHistory.length+1};
  }
 }
 event.trace.ballRoute.actual=routeSummary(event.ballRoute);event.result.actualPathRange=Number(event.ballRoute.length.toFixed(2));
}
// Classify the ball-holder's intent before movement, verdicts and retention choices.
// A duel freezes the carrier for a protecting contact, then may release an escape.
function v43PlanPressPolicy(event){
 const carrier=event.type==='carry'?event.actor:event.result.carrier||event.result.opponent;
 if(event.type==='scramble')return {mode:'loose-ball',carrier:null,maxActiveOpponents:null};
 if(event.type==='carry')return {mode:event.result.moveIntent==='protect'?'protect':event.result.moveIntent==='dribble'?'advance':'other',carrier,maxActiveOpponents:event.result.moveIntent==='protect'?2:event.result.moveIntent==='dribble'?1:0};
 if(['duel','tackle'].includes(event.type)&&carrier===state.carrier&&!event.result.outOfRange)
  return {mode:'protect',carrier,maxActiveOpponents:2};
 return {mode:'other',carrier:null,maxActiveOpponents:0};
}
function v43CanDoublePress(event){
 const policy=event.pressPolicy;
 if(policy?.mode!=='protect'||!['duel','tackle','carry'].includes(event.type)||event.result.outOfRange)return false;
 const carrier=policy.carrier,from=event.initialPositions?.get(carrier);
 // Planning calls this before assignment; scoring and animation also verify
 // the pre-verdict planned root stayed still; recovery may subsequently escape.
 // Never infer protection from outcome or inspect the post-verdict endpoint.
 const fixed=event.trace.pressPolicy.carrierStationaryBeforeContact;
 return typeof fixed==='boolean'?fixed:!!from&&dist(from,playerPoint(carrier))<.001;
}
const v4OldPlanResponses=planEventResponsesStage0;
function planEventResponsesStage1(event){
 let responses=v4OldPlanResponses(event);const used=new Set([event.actor,...responses.map(r=>r.player)]);
 const insert=(player,kind,target,priority)=>{
  if(!player)return;responses=responses.filter(r=>r.player!==player);responses.push({player,kind,target,priority});
  responses.sort((a,b)=>b.priority-a.priority);responses=v410LimitResponses(responses);
 };
 if(event.type==='pass'&&event.v4Aerial){const receive=responses.find(r=>r.player===event.result.receiver);if(receive)receive.target=event.v4Aerial.contactPoint;}
 if(event.type==='shoot'&&event.result.aerial||event.type==='pass'&&event.v4Aerial){
  const point=(event.result.aerial||event.v4Aerial).contactPoint;
  const opponents=teams[1-event.side].filter(p=>!isGoalkeeper(p)&&dist(playerPoint(p),point)<=CELL_X*2.7&&!(event.type==='pass'&&responses.some(r=>r.player===p&&r.kind==='INTERCEPT')))
   .sort((a,b)=>dist(playerPoint(a),point)-dist(playerPoint(b),point));
  insert(opponents[0],'AERIAL_DEFEND',point,220);
 }
 if(['duel','carry'].includes(event.type)){
  const carrier=event.type==='carry'?event.actor:event.result.carrier||event.result.opponent;
  const main=event.type==='carry'?responses.find(r=>r.kind==='PRESS')?.player:event.actor;
  if(carrier&&main&&v43CanDoublePress(event)){
   const candidates=teams[main.side].filter(p=>p!==main&&!isGoalkeeper(p)&&cellDistance(cellOf(playerPoint(p)),cellOf(playerPoint(carrier)))===1)
    .sort((a,b)=>dist(playerPoint(a),playerPoint(carrier))-dist(playerPoint(b),playerPoint(carrier)));
   insert(candidates[0],'DOUBLE_PRESS',playerPoint(carrier),115);
  }
  // Real potential passing corridor; no zero-length start-to-start CUT_LANE.
  const laneResponses=responses.filter(r=>r.kind==='CUT_LANE');
  const threats=teams[carrier.side].filter(p=>p!==carrier&&!isGoalkeeper(p)&&dist(playerPoint(p),playerPoint(carrier))>CELL_X&&dist(playerPoint(p),playerPoint(carrier))<=maxPassRange(carrier));
  for(const response of laneResponses){
   const lanes=threats.map(p=>({target:p,hit:closestOnSegment(playerPoint(response.player),playerPoint(carrier),playerPoint(p))})).filter(l=>l.hit.distance<CELL_X);
   lanes.sort((a,b)=>a.hit.distance-b.hit.distance);
   if(lanes[0]){response.target=lanes[0].hit.point;response.v4Threat={from:playerPoint(carrier),to:playerPoint(lanes[0].target),targetPlayer:nameOf(lanes[0].target)};}
   else {response.kind='COVER';response.target=goalSideTarget(response.player.side,playerPoint(carrier),.28);}
  }
 }
 v4Trace(event).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target,threat:r.v4Threat||null}));
 return responses;
}
const v42OldResponses=planEventResponsesStage1;
function planEventResponsesStage2(event){
 if(event.type!=='scramble')return v42OldResponses(event);
 const point=event.physicalStart,available=teams.flat().filter(p=>p!==event.actor&&(!isGoalkeeper(p)||isInPenaltyArea(p.side,point)))
 .map(player=>({player,gap:cellDistance(cellOf(playerPoint(player)),cellOf(event.start)),distance:dist(playerPoint(player),point)}))
 .filter(x=>x.gap<=MAX_PLAYER_STEPS).sort((a,b)=>a.gap-b.gap||a.distance-b.distance||skill(b.player,'movement')-skill(a.player,'movement')||a.player.side-b.player.side||a.player.num-b.player.num);
 const chosen=[];for(const side of [0,1]){if(side===event.actor.side)continue;const item=available.find(x=>x.player.side===side);if(item)chosen.push(item);}
 for(const item of available)if(!chosen.includes(item)&&chosen.length<MAX_RESPONDERS_PER_EVENT)chosen.push(item);
 const responses=chosen.map(x=>({player:x.player,kind:isGoalkeeper(x.player)?'CLAIM':'SECOND_BALL',target:{...event.start},priority:180-x.gap}));
 event.trace.looseBallRace={source:'uncontrolled-in-play-ball',selection:available.map(x=>({player:nameOf(x.player),side:x.player.side,initialCellDistance:x.gap,distance:Number(x.distance.toFixed(3)),selected:chosen.includes(x)})),participants:[],excluded:[],ranking:[],winner:null,verdict:'single-shared-contest-baked-before-playback-revealed-at-contact'};
 event.trace.tasks.push(...responses.map(r=>({side:r.player.side,duty:r.kind,target:r.target,selected:nameOf(r.player),reason:'both-teams-nearby-race'})));
 v4Trace(event).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));
 return responses;
}
const v4OldScorePosition=scoreResponsePositionStage0;
function scoreResponsePositionStage1(p,point,intent,event){
 let score=v4OldScorePosition(p,point,intent,event);
 if(['AERIAL_ATTACK','AERIAL_DEFEND'].includes(intent.kind))score-=dist(point,intent.target)*3;
 if(intent.kind==='DOUBLE_PRESS'){
  const gap=cellDistance(cellOf(point),cellOf(intent.target));score-=dist(point,intent.target)*2;if(gap===1)score+=15;
 }
 if(intent.kind==='WALL_RUN')score+=attackDir(p.side)*(point.x-playerPoint(p).x)*1.5-dist(point,intent.target)*3;
 return score;
}
const v4OldPlanMovement=planSimultaneousMovementStage0;
function planSimultaneousMovementStage1(event,responses){
 const extended=[...responses];
 if(event.type==='shoot'&&event.result.aerial)extended.push({player:event.actor,kind:'AERIAL_ATTACK',target:event.result.aerial.contactPoint,priority:230});
 if(event.type==='pass'&&event.result.wallPhase==='first')extended.push({player:event.actor,kind:'WALL_RUN',target:event.result.wallRunTarget,priority:200});
 return v4OldPlanMovement(event,extended);
}
function v4DoubleSupportStage0(event,carrier,main){
 if(!v43CanDoublePress(event)||event.pressPolicy.carrier!==carrier)return null;
 const c=cellOf(playerPoint(carrier)),m=cellOf(playerPoint(main));
 const eligible=event.responses.filter(r=>r.kind==='DOUBLE_PRESS'&&r.player!==main&&r.player.side===main.side)
  .filter(r=>{const h=cellOf(playerPoint(r.player));return cellDistance(c,h)===1&&(h.col!==m.col||h.row!==m.row);});
 const helper=eligible.find(r=>{const touch=adjacentContact(carrier,r.player,event);return (v45Movement(event,r.player)?.pathSteps||0)===0&&touch&&(event.result.moveIntent==='protect'||touch.time<=(event.contact?.time??Infinity)+.035);})?.player;if(!helper)return null;
 const bonus=clamp((skill(helper,'pressing')-40)/12+2,2,6);
 return {helper,bonus};
}
const v4OldContestScore=contestScoreStage0;
function contestScoreStage1(p,point,type,attackingSide,distanceOverride){
 let score=v4OldContestScore(p,point,type,attackingSide,distanceOverride);
 const event=state.event;
 if(type==='TACKLE'&&event?.contact&&v43CanDoublePress(event)&&p===event.contact.challenger){
  const combo=event.contact.helper?{helper:event.contact.helper,bonus:event.result.doubleTeam?.bonus||2}:null;
  if(combo){score+=combo.bonus;event.result.doubleTeam={helper:combo.helper,bonus:combo.bonus,maximumBonus:6,singleContest:true,participants:3};}
 }
 return score;
}
function v4ContactTags(event){
 if(!event.result.contactOccurred)return;
 const {carrier,challenger}=event.contact;
 event.result.feint=!isGoalkeeper(carrier)&&skill(carrier,'dribbling')>=BALANCE.main.contactAnimation.feint;
 event.result.slide=!isGoalkeeper(challenger)&&skill(challenger,'pressing')>=BALANCE.main.contactAnimation.slide&&skill(challenger,'pressing')>=skill(challenger,'dribbling')+BALANCE.main.contactAnimation.slideAbilityGap;
 if(event.result.slide){event.timeline.config.recover=Math.max(event.timeline.config.recover,motionResultOwner(event)===challenger?1.95:1.05);}
}
const v4OldResolveDuel=resolveDuelStage0,v4OldResolveCarry=resolveCarryStage0,v4OldResolveTackle=resolveTackleStage0;

const v4OldResolveShot=resolveShotStage0;

function v4IncomingTail(a){
 const r=a.incomingRoute,t=a.contactT,remaining=r.duration*(1-a.contactFraction);
 const begin=sampleBallRoute(r,a.contactFraction),speed=begin.speed,tail=buildBallRoute(a.contactPoint,r.to,{kind:'unchanged_incoming',apex:r.apex*(1-t)**2,ratio:r.speed*r.ratio/(speed||1),speed,duration:remaining});
 if(r.control)tail.control={x:(1-t)*r.control.x+t*r.to.x,y:(1-t)*r.control.y+t*r.to.y};
 tail.table=[];let length=0,previous=routePoint(tail,0);for(let i=0;i<=256;i++){const q=i/256,point=routePoint(tail,q);if(i)length+=Math.hypot(point.x-previous.x,point.y-previous.y,point.z-previous.z);tail.table.push({...point,t:q,d:length});previous=point;}tail.length=length;
 return tail;
}
const v4OldRecovery=sampleBallRecoveryStage0;
function sampleBallRecoveryStage1(event,elapsed){
 if(event.v4UncontactedIncoming){const a=event.result.aerial,time=Math.max(0,elapsed-event.releaseTime),remaining=event.v4UncontactedIncoming.duration;if(time<remaining)return sampleBallRoute(a.incomingRoute,a.contactFraction+time/a.incomingRoute.duration);const end=a.incomingRoute.to;return {...end,z:(end.z||0)*(1-motionEase((time-remaining)/.3))};}
 return v4OldRecovery(event,elapsed);
}
const v4OldPrepareMotion=prepareEventMotionStage0;
function prepareEventMotionStage1(event){
 v4OldPrepareMotion(event);const r=event.result;
 if(r.outcome==='aerial_pending'){
  event.timeline.config.recover=0;event.duration=event.impactTime;event.timeline.total=event.duration;event.timeline.flightEnd=event.impactTime;event.ballAfter=[];
 }
 if(event.type==='shoot'&&r.aerial){
  const a=r.aerial,oldRelease=event.releaseTime;
  const tail=a.incomingRoute.duration*(a.contactFraction-a.handoffFraction);
  const shift=tail-oldRelease;event.releaseTime=tail;
  event.timeline.responseEnd=tail;event.timeline.windEnd=Math.min(.12,tail*.4);event.timeline.config.response=tail-event.timeline.windEnd;
  event.impactTime+=shift;event.duration+=shift;event.timeline.flightEnd=event.impactTime;event.timeline.total=event.duration;
  for(const clip of event.trace.animations){clip.start=Math.max(0,clip.start+shift);}
  event.incomingAerial=a;
  for(const p of [event.actor,...event.responses.filter(q=>q.kind==='AERIAL_DEFEND').map(q=>q.player)]){
   const track=event.motion.tracks.get(p);if(canReachBall(p,a.contactPoint)){track.approach=ballContactAnchor(p,a.contactPoint);track.anchor={...track.approach};}
  }
  if(!r.aerialAttempt.actualShot){
   event.impactTime=event.releaseTime;event.timeline.flightEnd=event.releaseTime;event.duration=event.releaseTime+1.05;event.timeline.total=event.duration;event.timeline.config.recover=1.05;
   if(r.outcome==='aerial_missed'){const tail=v4IncomingTail(a);event.v4UncontactedIncoming=tail;event.ballAfter=[tail,buildBallRoute(a.incomingRoute.to,{...a.incomingRoute.to,z:0},{kind:'landing_after_miss',ratio:0,apex:0,duration:.3})];v4Trace(event).uncontactedIncoming={sourceEventId:a.sourceEventId,sourceContactT:a.contactT,sourceContactFraction:a.contactFraction,tail:routeSummary(tail)};}
   else event.ballAfter=[buildBallRoute(a.contactPoint,{...r.landing,z:0},{kind:'clearance',apex:.7,speed:13,duration:.8})];
  }
  event.motion.recoveryDribble=null;event.motion.initialDribble=null;bakeControlMotions(event);
  if(r.aerialAttempt.actualShot)v4Clip(event,a.mode==='header'?'header_attack':'volley',event.actor,event.releaseTime,null,80);
  else v4Clip(event,a.mode==='header'?'header_miss':'volley_miss',event.actor,event.releaseTime,null,80);
  if(r.outcome==='aerial_redirected'){const winner=teams[event.side].find(p=>nameOf(p)===r.aerialAttempt.winner);if(winner)v4Clip(event,a.mode==='header'?'header_attack':'volley',winner,event.releaseTime,null,80);}
  for(const q of event.responses.filter(q=>q.kind==='AERIAL_DEFEND')){
   const winner=r.aerialAttempt.winner===nameOf(q.player);
   if(a.mode==='header')v4Clip(event,winner?'header_defend':'header_miss',q.player,event.releaseTime,null,80);
   else if(winner)registerMotion(event,12,q.player,Math.max(0,event.releaseTime-.08),event.releaseTime+.24,'低位来球抢先破坏，不播放头球');
   else v4Clip(event,'block_miss',q.player,event.releaseTime,null,80);
  }
 }
 const taskClips={MARK:'mark_run',COVER:'cover_run',CUT_LANE:'cut_lane_run',SUPPORT:'support_run',SUPPORT_WIDE:'wide_support_run',RECEIVE:'receive_run',FORWARD_RUN:'forward_run',SECOND_BALL:'second_ball_run',REBOUND_READY:'forward_run'};
 for(const response of event.responses){
  if(event.motion.tracks.get(response.player).moving&&taskClips[response.kind])v4RunClip(event,taskClips[response.kind],response.player);
 }
 if(event.result.contactOccurred){
  const c=event.contact,owner=event.motion.owner,retained=owner===c.carrier;
  if(event.result.slide)v4Clip(event,owner===c.challenger?'slide_win':r.outcome==='loose'?'slide_loose':'slide_miss',c.challenger,event.impactTime,null,70);
  if(event.result.feint)v4Clip(event,retained?(r.retentionMode==='escape'?'feint_escape':'feint_stay'):'feint_lost',c.carrier,event.impactTime,retained?event.motion.bufferEnd:null,60);
  // Standalone dispossession reaction stays outside this stage; retain existing loss pose.
  if(r.doubleTeam&&v43CanDoublePress(event)){
   const helper=r.doubleTeam.helper;v4Clip(event,'double_support',helper,event.impactTime,null,45);
   if(!r.slide)v4Clip(event,'double_press',c.challenger,event.impactTime,null,45);
  }
 }
 if(event.type==='pass'){
  if(r.receiver!==event.motion.owner&&r.outcome!=='aerial_pending')v4Clip(event,'receive_miss',r.receiver,event.impactTime,null,45);
  if(event.v4KeeperRelease)v4Clip(event,'keeper_release',event.actor,event.releaseTime,event.releaseTime+.08,60);
  if(r.wallPhase)v4Clip(event,r.wallPhase==='first'?'wall_pass':'wall_return',event.actor,event.releaseTime,event.releaseTime+.14,55);
  if(r.wallPhase==='first')v4RunClip(event,'forward_run',event.actor,event.releaseTime,event.duration);
 }
 if(event.type==='shoot'){
  for(const attempt of r.blockAttempts||[])if(attempt.result==='failed'&&attempt.timeFraction<=(r.impactFraction??1)){
   const p=teams.flat().find(p=>nameOf(p)===attempt.player);v4Clip(event,'block_miss',p,event.releaseTime+event.timeline.nominalFlight*attempt.timeFraction,null,55);
  }
  if(r.outcome==='blocked'&&r.controlled)v4Clip(event,'block_control',r.blocker,event.impactTime,null,65);
  const keeper=v415RolePlayer(1-event.side,0),save=event.trace.contests.find(c=>c.type==='SAVE');
  if(save&&save.winner!==nameOf(keeper)&&r.outcome==='goal'){
   const at=event.releaseTime+event.timeline.nominalFlight*routeTimeAtT(event.ballRoute,eventRouteHit(event,save.point).t);v4Clip(event,'save_miss',keeper,at,null,65);
  }
  const prior=state.actionHistory.at(-1),origin=state.looseOrigin;
  if(!r.aerial&&origin&&prior?.action==='scramble'&&prior.result.winner===nameOf(event.actor)&&origin.side===event.side){r.followup=true;v4Clip(event,'followup_shot',event.actor,event.releaseTime,event.releaseTime+.2,60);}
 }
 if(event.type==='scramble'){for(const p of new Set([event.actor,...event.responses.map(q=>q.player)])){if(p!==event.motion.owner&&canReachBall(p,event.result.impactPoint||event.result.landing))v4Clip(event,'receive_miss',p,event.impactTime,null,45);}}
 if(event.type==='scramble'&&event.motion.owner&&isGoalkeeper(event.motion.owner)&&state.looseOrigin?.keeper===nameOf(event.motion.owner))v4Clip(event,'keeper_second_claim',event.motion.owner,event.impactTime,null,70);
 v4Trace(event).branch={outcome:r.outcome,contactOccurred:!!r.contactOccurred,retentionMode:r.retentionMode||null,slide:!!r.slide,feint:!!r.feint,doubleTeam:r.doubleTeam?{helper:nameOf(r.doubleTeam.helper),bonus:r.doubleTeam.bonus,maximumBonus:6,singleContest:true}:null,wallPhase:r.wallPhase||null,aerial:r.aerialAttempt||null,followup:!!r.followup};
}
function v4ControlHeight(event,p){return isGoalkeeper(p)&&(event.type==='scramble'||event.type==='pass'||event.type==='shoot'&&event.result.outcome==='saved'&&event.result.caught)?.9:0;}
function v4ControlBall(event,root,to,p){return v4ControlHeight(event,p)?{...root,z:.9}:controlledOffset(root,to,p.side);}
const v4OldBakeControl=bakeControlMotionsStage0;
function bakeControlMotionsStage1(event){
 v4OldBakeControl(event);const m=event.motion;
 if(event.result.slide&&!event.quickContact&&m.owner===event.contact?.challenger&&m.recoveryDribble){
  m.bufferEnd=event.impactTime+.78;
  m.recoveryDribble=buildDribbleMotion(motionWaypoints(m.bufferRoot,m.tracks.get(m.owner).to),m.bufferEnd,event.duration,{startBall:m.bufferBall});
  m.controlTouches=m.controlTouches.filter(t=>t.phase!=='control-recovery');m.controlTouches.push(...m.recoveryDribble.touches.map(time=>({time,player:nameOf(m.owner),phase:'control-recovery'})));
 }
}
const v4OldSamplePlayer=samplePlayerMotionStage0;
function samplePlayerMotionStage1(event,p,elapsed){
 const sample=v4OldSamplePlayer(event,p,elapsed),track=event.motion.tracks.get(p);
 if(event.type==='pass'&&event.result.wallPhase==='first'&&p===event.actor){
  sample.point=elapsed<=event.releaseTime?{...track.from}:motionLerp(track.from,track.to,motionEase((elapsed-event.releaseTime)/(event.duration-event.releaseTime||1)));
 }
 const active=(event.trace.v4?.clips||[]).filter(c=>c.player===nameOf(p)&&elapsed>=c.start&&elapsed<c.end).sort((a,b)=>b.priority-a.priority);
 if(active[0]){
  const c=active[0],q=c.loop?(elapsed-c.start)*2%1:clamp((elapsed-c.start)/(c.duration||c.end-c.start),0,1);
  // A continuing dribble retains its validated root/ball gait after the contact pose.
  if(!(((event.motion.owner===p&&event.motion.recoveryDribble&&elapsed>=event.motion.bufferEnd)||(event.motion.initialCarrier===p&&event.motion.initialDribble&&elapsed<event.impactTime))&&c.priority<70)){sample.pose=sampleFootballPose(c.key,q,{side:p.side});sample.activeAnimation=V4_IDS[c.key];sample.clip=c;sample.clipQ=q;}

 }
 const next=v4OldSamplePlayer(event,p,Math.min(event.duration,elapsed+.015)).point;
 const moving=dist(sample.point,next)>.0001;
 let kind=moving?'move':event.type;
 const target=p===event.actor&&(event.type==='pass'||event.type==='shoot')?(event.flightTarget||event.target):event.contact?.point||event.result.impactPoint||event.start;
 if(p===event.actor&&(event.type==='pass'||event.type==='shoot')&&elapsed<=event.releaseTime+.2)kind=event.type;
 if(event.contact&&(p===event.contact.challenger||p===event.contact.helper)&&elapsed<=event.impactTime+.1)kind='tackle';
 sample.direction=chooseMotionDirection({type:kind,player:sample.point,movement:moving?{from:sample.point,to:next}:null,target,contact:event.contact?.point,fallback:{x:sample.facing,y:0}});
 sample.screenDirection=projectWorldDirection(project,sample.point,sample.direction);
 return sample;
}
const v4OldUpdateMotion=updateEventMotionStage0;
function updateEventMotionStage1(event){
 event.v4PlaybackOverride=true;v4OldUpdateMotion(event);const e=Math.min(event.elapsed,event.duration);
 if(event.v4KeeperRelease&&e<event.releaseTime){
  const d=event.v4KeeperRelease,q=motionEase((e-Math.max(0,event.releaseTime-.32))/.32);state.ball.x=d.from.x+(d.to.x-d.from.x)*q;state.ball.y=d.from.y+(d.to.y-d.from.y)*q;state.ballZ=.9*(1-q);
 }
 if(event.incomingAerial&&e<event.releaseTime){
  const a=event.incomingAerial,q=a.handoffFraction+e/a.incomingRoute.duration,ball=sampleBallRoute(a.incomingRoute,q);
  state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z;
 }
 if(event.result.aerialAttempt&&!event.result.aerialAttempt.actualShot&&e>=event.releaseTime){const ball=sampleBallRecovery(event,e);state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z||0;}
 state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;
 captureMotionSample(event);
}

const v4OldSetPossession=setPossessionStage0;
function setPossessionStage1(p){v4OldSetPossession(p);state.keeperBallMode='feet';state.ballZ=0;}
const v4OldSync=syncControlledBallStage0;
function syncControlledBallStage1(){v4OldSync();if(state.carrier){state.ballZ=v4KeeperHeight(state.carrier);state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;}}
const v4OldUpdate=updateStage0;
function updateStage1(dt){v4OldUpdate(dt);if(state.carrier&&state.phase!=='resolving'){state.ballZ=v4KeeperHeight(state.carrier);state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;}}
const v4OldHalftime=beginHalftimeStage0,v4OldFormation=applyFormationStage0,v4OldResetGoal=resetAfterGoalStage0;
function beginHalftimeStage1(){state.wallPair=null;state.looseOrigin=null;state.pendingAerial=null;v4OldHalftime();}
function applyFormationStage1(i){state.wallPair=null;state.looseOrigin=null;state.pendingAerial=null;v4OldFormation(i);v4SeparateSetupCells();syncControlledBall();}
function resetAfterGoalStage1(side){state.wallPair=null;state.looseOrigin=null;state.pendingAerial=null;v4OldResetGoal(side);}
function v4SeparateSetupCells(){
 const occupied=new Set();for(const p of teams.flat()){let c=cellOf(playerPoint(p)),key=c.col+','+c.row;if(occupied.has(key)){const target=findFreeCell(p,playerPoint(p));if(target){p.x=p.tx=p.hx=target.x;p.y=p.ty=p.hy=target.y;c=cellOf(target);key=c.col+','+c.row;}}occupied.add(key);}
}


BALL_ROUTE_LABELS.loft='高球攻门准备';

const v42PrepareMotion=prepareEventMotionStage1;
function prepareEventMotionStage2(event){
 v42PrepareMotion(event);if(event.type!=='scramble')return;
 const arrivals=new Set((event.looseArrivals||[]).map(x=>x.player));
 event.trace.animations=event.trace.animations.filter(a=>![13,28,106,108].includes(a.id)||[...arrivals].some(p=>nameOf(p)===a.player));
 event.trace.v4.clips=event.trace.v4.clips.filter(c=>!['receive_miss','second_ball_run'].includes(c.key));
 for(const arrival of event.looseArrivals||[]){
  const p=arrival.player;if(!isGoalkeeper(p)){v4RunClip(event,'second_ball_run',p,0,event.impactTime);if(p!==event.motion.owner){const end=Math.min(event.duration,event.impactTime+.65);v4Trace(event).clips.push({key:'receive_miss',player:nameOf(p),start:event.impactTime,end,duration:end-event.impactTime,contact:null,priority:45});registerMotion(event,106,p,event.impactTime,end,'同次多人争抢未获球，结果时刻才收势');}}
 }
 if(event.trace.looseBallRace){event.trace.looseBallRace.contactTime=event.impactTime;for(const p of event.trace.looseBallRace.participants)p.arrivalAt=event.impactTime;}
}
const v42SampleMotion=samplePlayerMotionStage1;
function samplePlayerMotionStage2(event,p,elapsed){const sample=v42SampleMotion(event,p,elapsed);if(event.type==='scramble'&&elapsed<event.impactTime&&!isGoalkeeper(p)&&event.looseArrivals?.some(a=>a.player===p)&&sample.activeAnimation===105)sample.activeAnimation=13;return sample;}
const v42UpdateMotion=updateEventMotionStage1;
function updateEventMotionStage2(event){v42UpdateMotion(event);if(event.type==='scramble'&&event.elapsed>=event.impactTime&&!event.trace.looseBallRace.revealedAt){event.trace.looseBallRace.revealedAt=new Date().toISOString();event.trace.looseBallRace.revealedPhaseSeconds=Math.min(event.elapsed,event.duration);}}
// Only uncontrolled-ball playback is compressed; all planning and results stay intact.
const v44PreviousSample=samplePlayerMotionStage2;
function samplePlayerMotionStage3(event,p,elapsed){
 const sample=v44PreviousSample(event,p,elapsed);
 if(event.type!=='scramble')return sample;
 const track=event.motion.tracks.get(p),m=event.motion,arrived=event.looseArrivals?.some(a=>a.player===p);
 let from,to;
 if(elapsed<event.impactTime){
  from=track.from;to=track.anchor;
  sample.point=quickLoosePoint(from,to,0,event.impactTime,elapsed);
  if(arrived&&!isGoalkeeper(p))sample.activeAnimation=13;
 }else if(p!==m.owner){
  from=track.anchor;to=track.to;
  sample.point=quickLoosePoint(from,to,event.impactTime,event.duration,elapsed);
 }else{
  // Keep the validated shared player/ball control and carry path after taking possession.
  from=elapsed<m.bufferEnd?track.anchor:m.bufferRoot;to=elapsed<m.bufferEnd?m.bufferRoot:track.to;
 }
 const moving=dist(from,to)>.1&&(p!==m.owner||elapsed>=m.bufferEnd||elapsed<event.impactTime);
 sample.pose=quickLoosePose(moving,p===m.owner&&elapsed>=event.impactTime,isGoalkeeper(p));
 const direction=chooseMotionDirection({type:'move',player:sample.point,movement:moving?{from,to}:null,target:event.result.impactPoint||event.start,fallback:{x:sample.facing,y:0}});
 sample.direction=direction;sample.screenDirection=projectWorldDirection(project,sample.point,direction);
 sample.facing=Math.abs(direction.x)>.01?Math.sign(direction.x):sample.facing;
 return sample;
}
const v44ContactPrepare=prepareEventMotionStage2;
function prepareEventMotionStage3(event){
 v44ContactPrepare(event);if(!event.quickContact)return;
 const c=event.contact,start=event.type==='carry'?Math.max(0,event.impactTime-.18):0,end=event.impactTime+.11;
 const participants=[c.challenger,c.helper].filter(Boolean),ids=[86,87,88,92,93];
 for(const clip of event.trace.v4.clips)if(participants.some(p=>nameOf(p)===clip.player)&&['slide_win','slide_loose','slide_miss','double_press','double_support'].includes(clip.key)){
  clip.start=start;clip.end=end;clip.duration=Math.max(.001,(event.impactTime-start)/.45);
 }
 for(const a of event.trace.animations)if(ids.includes(a.id)&&participants.some(p=>nameOf(p)===a.player)){a.start=start;a.duration=end-start;}
 for(const p of [c.carrier,...participants]){
  const track=event.motion.tracks.get(p);
  if(p!==event.motion.owner&&dist(track.anchor,track.to)>.1)registerMotion(event,2,p,end,event.duration,'抢断结束后沿原定路径快速退出');
 }
}
const v44LooseSample=samplePlayerMotionStage3;
function samplePlayerMotionStage4(event,p,elapsed){
 const sample=v44LooseSample(event,p,elapsed);
 if(!event.quickContact)return sample;
 const c=event.contact,m=event.motion,track=m.tracks.get(p);
 if(![c.carrier,c.challenger,c.helper].includes(p))return sample;
 // Preserve the carrier's ordinary advance; only the defender's final lunge is shortened.
 if(event.type==='carry'&&p===c.carrier&&elapsed<event.impactTime)return sample;
 const start=event.type==='carry'?Math.max(0,event.impactTime-.18):0;
 let from,to;
 if(elapsed<event.impactTime){from=track.from;to=track.anchor;sample.point=quickLoosePoint(from,to,start,event.impactTime,elapsed);}
 else if(p!==m.owner){from=track.anchor;to=track.to;sample.point=quickLoosePoint(from,to,event.impactTime,event.duration,elapsed);}
 else {from=elapsed<m.bufferEnd?track.anchor:m.bufferRoot;to=elapsed<m.bufferEnd?m.bufferRoot:track.to;}
 const moving=dist(from,to)>.1&&elapsed>=start;
 sample.pose=quickLoosePose(moving,p===m.owner&&elapsed>=event.impactTime,isGoalkeeper(p));
 if(p===c.carrier&&event.result.feint&&elapsed<event.impactTime){
  const u=clamp((elapsed-start)/(event.impactTime-start||1),0,1),wave=Math.sin(u*Math.PI*2)*Math.sin(u*Math.PI);
  sample.pose={...sample.pose,lean:8+wave*10,sway:wave*.20};
 }
 if(p===c.challenger&&event.result.slide&&elapsed>=start&&elapsed<event.impactTime+.11){
  const u=elapsed<event.impactTime?.45*clamp((elapsed-start)/(event.impactTime-start||1),0,1):.45+.55*clamp((elapsed-event.impactTime)/.11,0,1);
  const key=m.owner===p?'slide_win':event.result.outcome==='loose'?'slide_loose':'slide_miss';
  sample.pose=sampleFootballPose(key,u);sample.clipQ=u;sample.activeAnimation=V4_IDS[key];
 }else if(elapsed>=event.impactTime){
  sample.clip=null;
  if(p!==m.owner&&moving&&elapsed>=event.impactTime+.11)sample.activeAnimation=2;
  if(p===m.owner&&m.recoveryDribble&&elapsed>=m.bufferEnd)sample.activeAnimation=1;
 }
 if(elapsed<start&&p!==c.carrier){sample.clip=null;sample.activeAnimation=null;}
 const sliding=p===c.challenger&&event.result.slide&&elapsed<event.impactTime+.11;
 const direction=chooseMotionDirection({type:sliding?'tackle':'move',player:sample.point,movement:moving?{from,to}:null,target:c.point,contact:sliding?c.point:null,fallback:{x:sample.facing,y:0}});
 sample.direction=direction;sample.screenDirection=projectWorldDirection(project,sample.point,direction);
 return sample;
}
// V4.5: one ability/performance snapshot drives decisions, motion, contacts and records.
function v45CellKey(c){return c.col+','+c.row;}
function v45Movement(e,p){return e?.trace.movements.find(m=>m.player===nameOf(p));}
function v45Ensure(e){
 e._performances??=new Map();e.trace.performance??=[];e.trace.quality??=[];e.trace.abilityContests??=[];e.trace.reachability??=[];
}
function v45PerformanceStage0(e,p,mode=null){
 v45Ensure(e);if(e._performances.has(p))return e._performances.get(p);
 mode??=p===state.carrier&&!(e.type==='pass'&&e.result.wallPhase==='first')?'carry':'run';
 const pressure=mode==='carry'?clamp((10-nearestEnemyDistance(p.side,e.initialPositions?.get(p)||playerPoint(p)))/10,0,1):0;
 const tier=randomFor('移动档:'+nameOf(p),e),steps=randomFor('移动额度:'+nameOf(p),e),variation=randomFor('移动发挥:'+nameOf(p),e);
 const value=movementPerformance(p,mode,tier,steps,variation,pressure);e._performances.set(p,value);e.trace.performance.push({player:nameOf(p),...value});return value;
}
function v45Release(e){
 if(e.result.aerial){const a=e.result.aerial;return Math.max(0,a.incomingRoute.duration*(a.contactFraction-a.handoffFraction));}
 return e.plannedRelease??e.timeline.responseEnd;
}
function v45PointAtStage0(e,p,time){
 const m=v45Movement(e,p),from=e.initialPositions.get(p);if(!m||!m.path?.length)return {...from};
 return pathPosition(m.path,Math.max(0,time-(m.startTime||0)),v45Performance(e,p).playbackSpeed);
}
function v45BallTime(e,point){
 if(e.result.aerial&&dist(point,e.result.aerial.contactPoint)<.1)return v45Release(e);
 return v45Release(e)+e.ballRoute.duration*routeTimeAtT(e.ballRoute,closestOnRoute(point,e.ballRoute).t);
}
function v45Quality(e,p,kind,distance=0){
 v45Ensure(e);const pressure=clamp((11-nearestEnemyDistance(p.side,e.initialPositions?.get(p)||playerPoint(p)))/11,0,1);
 const technique=kind==='shot'&&e.result.aerial?.mode==='header'?'header':kind;
 let q;
 if(kind==='pass'&&p===e.actor){
  q=executionQuality(p,technique,{pressure,distance,roll:.5,aerial:!!e.result.aerial});
  q.ability=diceRating(p,'pass')/10;q.quality=q.ability;q.legacyDifficulty=q.difficulty;q.difficulty=0;
  const die=executionDie(e,'pass:'+p.side+'-'+p.num,diceUpper(p,'pass'),randomFor,{kind:'pass',player:nameOf(p),rating:diceRating(p,'pass'),difficulty:0});q.roll=die.u;q.executionDie=die;
 }else if(kind==='shot'&&p===e.actor){
  const sk=e.result.aerial?.mode==='header'?'headerShot':'shot';q=executionQuality(p,technique,{pressure,distance,roll:.5,aerial:!!e.result.aerial});q.legacyDifficulty=q.difficulty;q.difficulty=0;q.ability=diceRating(p,sk)/10;q.quality=q.ability;
  const die=executionDie(e,'shot:'+p.side+'-'+p.num,diceUpper(p,sk),randomFor,{kind:'shot',player:nameOf(p),rating:diceRating(p,sk)});q.executionDie=die;q.roll=die.u;
 }else q=executionQuality(p,technique,{pressure,distance,roll:randomFor('动作质量:'+kind+':'+nameOf(p),e),aerial:!!e.result.aerial});
 const value={player:nameOf(p),...q,kind,technique};e.trace.quality.push(value);return value;
}


function v45PrepareTiming(e){
 v45Ensure(e);
 if(e.type==='pass'||e.type==='shoot'){
  const pressure=clamp((9-nearestEnemyDistance(e.side,e.start))/9,0,1);
  e.plannedRelease=(e.type==='shoot'?.075:.10)+(10-e.actor.control)*.012+pressure*.035;
  const t=e.timeline;t.windEnd=Math.min(.035,e.plannedRelease*.3);t.responseEnd=v45Release(e);t.config.wind=t.windEnd;t.config.response=t.responseEnd-t.windEnd;
 }
 if(e.type==='carry'){
  const d=v45ShotDecision(e);e.trace.continuation=d;
  e.chainShot=d.selected&&state.round<=TOTAL_ROUNDS&&!(state.actionsInRound===1&&[HALFTIME_ROUND-1,TOTAL_ROUNDS].includes(state.round));
 }
}
// Capture pass/shot execution quality before choosing routes and planning responders.
const v45PrepareRoute=prepareActualBallRouteStage1;
function prepareActualBallRouteStage2(e){
 const kind=e.type==='pass'?'pass':'shot';v45Quality(e,e.actor,kind,dist(e.start,e.target));v45PrepareTiming(e);v45PrepareRoute(e);
 if(e.type==='shoot')e.result.shotQuality=e.trace.quality.find(q=>q.kind==='shot').quality;
}
// Reception can fail at the real impact point. Never retarget an inaccurate pass.


// Race participants arrive independently; only those in the first control window contest.

const v45PrepareMotion=prepareEventMotionStage3;
function prepareEventMotionStage4(e){
 v45PrepareMotion(e);
 // Flight participants continue running after release; the shooter never waits for them.
 for(const [p,track] of e.motion.tracks){
  const m=v45Movement(e,p);if(!m?.path?.length)continue;
  track.v45Path=m.path;
  if(e.ballFlight&&p!==e.motion.owner){track.anchor=v45PointAt(e,p,e.impactTime);}
 }
 if(e.type==='scramble')for(const a of e.looseArrivals){const t=e.motion.tracks.get(a.player);t.v45Approach=a.path;if(a.arrivalTime>e.impactTime)t.anchor=pathPosition(a.path,e.impactTime,v45Performance(e,a.player).playbackSpeed);}
 const owner=e.motion.owner;
 if(e.ballFlight&&owner){
  const track=e.motion.tracks.get(owner),root=v45PointAt(e,owner,e.impactTime),ball=e.result.impactPoint;
  const dx=ball.x-root.x,dy=ball.y-root.y,gap=Math.hypot(dx,dy)||1;
  track.anchor=ballContactAnchor(owner,ball);
  // Smooth in-cell reaching is represented in the same trajectory used for replay.
  track.v45ContactRoot={...track.anchor};
  e.motion.recoveryDribble=null;bakeControlMotions(e);
 }
 if(e.chainShot&&e.type==='carry'&&!e.result.contactOccurred){
  e.timeline.config.recover=.045;e.duration=e.impactTime+.045;e.timeline.total=e.duration;
  e.motion.bufferEnd=Math.min(e.duration,e.impactTime+.02);
 }
 // Taking possession changes speed, but never draws another allowance.
 if(owner&&e.motion.recoveryDribble){
  const original=v45Performance(e,owner),rolls=original.rolls,carry=movementPerformance(owner,'carry',rolls.tier,rolls.steps,rolls.variation,0),track=e.motion.tracks.get(owner);
  const distance=dist(e.motion.bufferRoot,track.to),end=e.motion.bufferEnd+distance/carry.playbackSpeed;
  e.trace.postControl={player:nameOf(owner),attribute:'carrying',rating:owner.carrying,speed:carry.speed,start:e.motion.bufferEnd,end,sharedAllowance:original.maxSteps,newRandomDraw:false};
  e.motion.recoveryDribble=buildDribbleMotion(motionWaypoints(e.motion.bufferRoot,track.to),e.motion.bufferEnd,Math.max(e.motion.bufferEnd+.01,end),{startBall:e.motion.bufferBall});e.motion.recoveryDribble.endTime=end;
  e.motion.controlTouches=e.motion.controlTouches.filter(t=>t.phase!=='control-recovery').concat(e.motion.recoveryDribble.touches.map(time=>({time,player:nameOf(owner),phase:'control-recovery'})));
  e.duration=Math.max(e.duration,end+.025);e.timeline.total=e.duration;
  registerMotion(e,1,owner,e.motion.bufferEnd,end,'获得球权后按个人带球速度使用剩余额度');
 }
 if(e.contact)for(const p of [e.contact.carrier,e.contact.challenger,e.contact.helper].filter(Boolean))if(p!==owner){const track=e.motion.tracks.get(p),needed=dist(track.anchor,track.to)/v45Performance(e,p).playbackSpeed;e.duration=Math.max(e.duration,e.impactTime+needed+.025);e.timeline.total=e.duration;}
 // Keep all allotted motion within this action. Shot release is unaffected.
 const last=Math.max(0,...e.trace.movements.filter(m=>!(e.chainShot&&e.type==='carry')).map(m=>m.arrivalTime||0));
 if(last>e.duration&&e.result.outcome!=='aerial_pending'){e.duration=last+.025;e.timeline.total=e.duration;}
 for(const m of e.trace.movements){const p=teams.flat().find(p=>nameOf(p)===m.player);if(!p)continue;
  if(m.pathSteps>0&&p!==e.motion.initialCarrier&&!isGoalkeeper(p))registerMotion(e,2,p,0,Math.min(e.duration,m.arrivalTime||e.impactTime),'个人无球速度与路径决定抵达时间');
 }
 if(e.type==='scramble')for(const x of e.trace.looseBallRace.participants){const arrival=e.looseArrivals.find(a=>nameOf(a.player)===x.player);x.arrivalAt=Number(arrival.arrivalTime.toFixed(4));}
 // Contact animations cannot precede the shot release.
 if(e.type==='shoot'){
  for(const a of e.trace.animations)if([12,14].includes(a.id)){a.start=Math.max(e.releaseTime,a.start);a.duration=Math.max(.01,Math.min(e.duration,a.start+a.duration)-a.start);}
  for(const c of e.trace.v4.clips)if(['save_miss','block_miss','block_control'].includes(c.key))c.start=Math.max(e.releaseTime,c.start);
 }
 e.timeline.config.recover=Math.max(0,e.duration-e.impactTime);
 e.trace.timing={release:e.releaseTime??null,impact:e.impactTime,duration:e.duration,actorArrival:v45Movement(e,e.actor)?.arrivalTime??0,continuation:!!e.chainShot};
}
const v45Sample=samplePlayerMotionStage4;
function samplePlayerMotionStage5(e,p,elapsed){
 const sample=v45Sample(e,p,elapsed),m=v45Movement(e,p),track=e.motion.tracks.get(p);
 let point=sample.point;
 if(e.contact&&[e.contact.carrier,e.contact.challenger,e.contact.helper].includes(p)&&p!==e.motion.owner&&elapsed>=e.impactTime){point=pathPosition([track.anchor,track.to],elapsed-e.impactTime,v45Performance(e,p).playbackSpeed);if(dist(point,track.to)<.01){sample.pose=quickLoosePose(false,false,isGoalkeeper(p));sample.activeAnimation=null;}}
 if(e.type==='scramble'&&e.looseArrivals.some(a=>a.player===p)){
  const a=e.looseArrivals.find(a=>a.player===p);
  if(elapsed<e.impactTime)point=pathPosition(a.path,elapsed,v45Performance(e,p).playbackSpeed);
 }else if(e.contact&&[e.contact.challenger,e.contact.helper].includes(p)){
  if(elapsed<e.impactTime){const to=p===e.contact.challenger?e.contact.b:e.contact.helperAnchor;
   const path=[...(m?.path||[e.initialPositions.get(p)])];if(to&&dist(path.at(-1),to)>.01)path.push(to);
   point=pathPosition(path,elapsed,v45Performance(e,p).playbackSpeed);
  }
 }else if(m&&!(e.result.aerial&&(p===e.actor||e.responses.some(r=>r.player===p&&r.kind==='AERIAL_DEFEND')))&&!(e.motion.owner===p&&elapsed>=e.impactTime)&&!(e.motion.initialCarrier===p&&e.motion.initialDribble&&elapsed<=e.impactTime)){
  point=v45PointAt(e,p,elapsed);
  if(e.ballFlight&&e.motion.owner===p&&track.v45ContactRoot&&elapsed>=Math.max(0,e.impactTime-.10)){
   const from=v45PointAt(e,p,Math.max(0,e.impactTime-.10)),q=clamp((elapsed-(e.impactTime-.10))/.10,0,1);point=motionLerp(from,track.v45ContactRoot,q);
  }
 }
 sample.point=point;
 const next=m?pathPosition(m.path||[point],Math.max(0,elapsed+.012-(m.startTime||0)),v45Performance(e,p).playbackSpeed):point;
 const moving=dist(point,next)>.01&&elapsed<(m?.arrivalTime||0);
 if(moving&&p!==e.motion.initialCarrier&&!sample.clip&&!(p===e.actor&&['pass','shoot'].includes(e.type))){sample.pose=quickLoosePose(true,false,isGoalkeeper(p));sample.activeAnimation=2;}
 if(moving&&!(e.contact&&[e.contact.challenger,e.contact.helper].includes(p))){sample.direction=chooseMotionDirection({type:'move',player:point,movement:{from:point,to:next},target:e.target,fallback:{x:sample.facing,y:0}});sample.screenDirection=projectWorldDirection(project,point,sample.direction);}
 if(e.contact&&[e.contact.challenger,e.contact.helper].includes(p)&&elapsed<e.impactTime){const target=p===e.contact.challenger?e.contact.b:e.contact.helperAnchor;sample.direction=chooseMotionDirection({type:'tackle',player:point,movement:{from:point,to:target},contact:e.contact.point,target,fallback:{x:sample.facing,y:0}});sample.screenDirection=projectWorldDirection(project,point,sample.direction);}
 return sample;
}

// Read-only roster overlay. Ratings are visible for both teams and substitutes.
function v45ShowAttributes(){
 const dialog=document.getElementById('ability-dialog'),content=document.getElementById('ability-content');if(!dialog||!content)return;
 content.replaceChildren();for(let side=0;side<2;side++){
  const heading=document.createElement('h3');heading.textContent=side?'对手阵容':'我方阵容';content.append(heading);
  const table=document.createElement('table'),head=document.createElement('tr');for(const label of ['球员',...SKILL_KEYS.map(k=>SKILL_LABELS[k]),'当前体力']){const th=document.createElement('th');th.textContent=label;head.append(th);}table.append(head);
  for(const p of [...teams[side],...benches[side]]){const tr=document.createElement('tr');for(const value of [(p.onBench?'替补 · ':'')+p.num+'号 '+p.role,...SKILL_KEYS.map(k=>p[k]),Math.round(p.currentStamina)+'%']){const td=document.createElement('td');td.textContent=String(value);tr.append(td);}table.append(tr);}content.append(table);
 }dialog.showModal();
}
document.getElementById('show-abilities')?.addEventListener('click',v45ShowAttributes);
document.getElementById('close-abilities')?.addEventListener('click',()=>document.getElementById('ability-dialog').close());

// V4.6: carrier intent gates tackles; occupied ground cells settle possession.
function v46CellEqual(a,b){const x=cellOf(a),y=cellOf(b);return x.col===y.col&&x.row===y.row;}
function v46Adjacent(p,point,positions=null){return cellDistance(cellOf(positions?.get(p)||playerPoint(p)),cellOf(point))===1;}
function v46Route(actor,target,budget=3,dribble=false){
 const start=cellOf(playerPoint(actor)),end=cellOf(target),blocked=new Set(teams.flat().filter(p=>p!==actor&&(!dribble||p.side===actor.side)).map(p=>v45CellKey(cellOf(playerPoint(p)))));
 return findGridPath(start,end,blocked,budget);
}
function v46RouteThreats(actor,path,positions=null){
 if(!path)return [];
 return path.flatMap((c,index)=>teams[1-actor.side].filter(p=>cellDistance(c,cellOf(positions?.get(p)||playerPoint(p)))<=1).map(player=>({player,index,cell:c})));
}

const v46Begin=beginEventStage0;
function beginEventStage1(spec){
 spec.result??={};
 if(['duel','tackle'].includes(spec.type)){
  // Legacy defensive entry points cannot manufacture a new carrier decision.
  return chooseAutoAction(state.carrier?.side??spec.side);
 }
 if(spec.type==='carry'){
  const path=v46Route(spec.actor,spec.target,3,true);
  spec.result.moveIntent??=v46CellEqual(playerPoint(spec.actor),spec.target)?'protect':v46RouteThreats(spec.actor,path).length?'dribble':'advance';
  spec.result.requestedTarget={...spec.target};
 }
 return v46Begin(spec);
}
const v46Responses=planEventResponsesStage2;
function planEventResponsesStage3(e){
 let responses=v46Responses(e);if(e.type!=='carry')return responses;
 const intent=e.result.moveIntent,from=e.initialPositions.get(e.actor);
 responses=responses.filter(r=>!['PRESS','DOUBLE_PRESS'].includes(r.kind));
 let defenders=[];
 if(intent==='protect')defenders=teams[1-e.side].filter(p=>v46Adjacent(p,from,e.initialPositions));
 if(intent==='dribble')defenders=v46RouteThreats(e.actor,v46Route(e.actor,e.target,3,true),e.initialPositions).sort((a,b)=>a.index-b.index).map(x=>x.player);
 defenders=[...new Set(defenders)].sort((a,b)=>intent==='protect'?skill(b,'pressing')-skill(a,'pressing'):0).slice(0,intent==='protect'?2:1);
 for(let i=0;i<defenders.length;i++){const p=defenders[i];responses=responses.filter(r=>r.player!==p);responses.push({player:p,kind:i?'DOUBLE_PRESS':'PRESS',target:from,priority:150-i*5});}
 responses.sort((a,b)=>b.priority-a.priority);responses=v410LimitResponses(responses);
 v4Trace(e).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));return responses;
}

function v46TackleAllowed(e,defender){
 if(e.type!=='carry'||!defender||!v437CanTackle(defender))return false;
 if(e.result.moveIntent==='protect')return v46Adjacent(defender,e.initialPositions.get(e.actor),e.initialPositions)&&dist(e.initialPositions.get(e.actor),playerPoint(e.actor))<.001;
 if(e.result.moveIntent==='dribble')return e.tackleTrigger?.defender===defender;
 return false;
}


const v46Loose=setLooseBallStage0;
function setLooseBallStage1(point){
 if(state.event?.result.outcome!=='aerial_pending'&&!state.pendingAerial){
  const occupant=teams.flat().find(p=>v46CellEqual(playerPoint(p),point));
  if(occupant){setPossession(occupant);return;}
 }
 return v46Loose(point);
}
function v46ControlBall(root,side){const c=cellOf(root),mid=cellPoint(c.col,c.row),ball=controlledOffset(root,root,side);return {x:clamp(ball.x,mid.x-CELL_X/2+.05,mid.x+CELL_X/2-.05),y:clamp(ball.y,mid.y-CELL_Y/2+.05,mid.y+CELL_Y/2-.05),z:0};}
function v46UncontrolledBall(e,time){
 if(e.ballFlight){
  if(time<e.releaseTime)return null;
  if(time<e.impactTime)return sampleBallRoute(e.ballRoute,(time-e.releaseTime)/e.timeline.nominalFlight);
  return sampleBallRecovery(e,time);
 }
 if(time<e.impactTime)return null;
 return e.quickContact?{...quickLoosePoint(e.contact.point,e.result.landing,e.impactTime,e.impactTime+.08,time),z:0}:{...motionLerp(e.contact?.point||e.start,e.result.landing||e.end,motionEase((time-e.impactTime)/(e.duration-e.impactTime||1))),z:0};
}
// A deterministic matching chooses distinct final cells at an interrupted flight.
// Each option is the reached cell or an earlier point on that player's own path.
function v46FreezeAtPickupStage0(e,pickup){
 const players=teams.flat(),points=new Map(players.map(p=>[p,v45Movement(e,p)?.turnExecution?{...v45Movement(e,p).to}:samplePlayerMotion(e,p,pickup.time).point]));
 const options=new Map(players.map(p=>{
  const root=points.get(p),m=v45Movement(e,p),from=e.initialPositions.get(p),path=m?.path||[from];
  const reached=cellOf(root),limit=m?.maxSteps??v45Performance(e,p).maxSteps;
  let travelled=0;const allowance=Math.max(0,pickup.time-(m?.startTime||0))*v45Performance(e,p).playbackSpeed;
  const earlier=path.filter((x,i)=>{if(i)travelled+=dist(path[i-1],x);return travelled<=allowance+.001&&cellDistance(cellOf(from),cellOf(x))<=limit;});
  const list=m?.turnExecution?[root,...path.slice().reverse(),from]:[root,...earlier.slice().reverse(),from],seen=new Set();return [p,list.filter(x=>{const key=v45CellKey(cellOf(x));if(seen.has(key))return false;seen.add(key);return true;})];
 }));
 // The recipient keeps the cell which acquired the ball.
 const ownerMove=v45Movement(e,pickup.owner);
 if(false /* V4.23: owner stays at the control root */){const exits=[points.get(pickup.owner),playerPoint(pickup.owner),e.initialPositions.get(pickup.owner)];options.set(pickup.owner,exits);}else options.set(pickup.owner,[points.get(pickup.owner)]);
 const assignment=new Map(),chosen=new Map();
 function place(p,visited){for(const point of options.get(p)){const key=v45CellKey(cellOf(point));if(visited.has(key))continue;visited.add(key);const other=assignment.get(key);if(!other||place(other,visited)){assignment.set(key,p);chosen.set(p,point);return true;}}return false;}
 for(const p of [pickup.owner,...players.filter(p=>p!==pickup.owner)])if(!place(p,new Set()))return false;
 e.gridPickup=pickup;pickup.frozenRoots=new Map();
 for(const p of players){const from=points.get(p),to={...chosen.get(p)};pickup.frozenRoots.set(p,{from:{...from},to});p.tx=to.x;p.ty=to.y;const m=v45Movement(e,p);if(m){m.interruptedAt=pickup.time;m.plannedTo=m.to;m.to={...to};}}
 e.duration=pickup.time+.08;e.timeline.total=e.duration;e.timeline.interruptedAt=pickup.time;e.timeline.config.recover=Math.max(0,e.duration-e.impactTime);
 pickup.finalBall=v46ControlBall(chosen.get(pickup.owner),pickup.owner.side);
 e.trace.gridControl={player:nameOf(pickup.owner),side:pickup.owner.side,time:pickup.time,cell:cellOf(pickup.point),point:pickup.point,cause:pickup.cause,originalOutcome:e.result.outcome,immediateNextChargedAction:true};
 if(e.ballFlight){const t=pickup.time<e.impactTime?sampleBallRoute(e.ballRoute,(pickup.time-e.releaseTime)/e.timeline.nominalFlight).t:e.result.impactT??1;e.trace.ballRoute.flown={end:{...pickup.point},t,timeFraction:Math.max(0,(pickup.time-e.releaseTime)/e.timeline.nominalFlight),cells:e.trace.ballRoute.actual.cells.filter(c=>c.enter<=t).map(c=>({...c,exit:Math.min(c.exit,t)}))};}
 e.result.autoControl=nameOf(pickup.owner);e.result.autoControlAt=pickup.time;
 for(const a of e.trace.animations)a.duration=Math.max(0,Math.min(a.duration,e.duration-a.start));
 for(const c of e.trace.v4.clips)c.end=Math.min(c.end??e.duration,e.duration);
 registerMotion(e,isGoalkeeper(pickup.owner)?14:4,pickup.owner,pickup.time,e.duration,'球进入有人地面格，直接获得球权');
 e.trace.timing.duration=e.duration;e.trace.timing.gridControlAt=pickup.time;
 return true;
}
const v46Prepare=prepareEventMotionStage4;

const v46Sample=samplePlayerMotionStage5;

const v46Capture=captureMotionSampleStage0;
function captureMotionSampleStage1(e){if(!e.v46DeferCapture)return v46Capture(e);}
const v46Update=updateEventMotionStage2;

// V4.7 shares physical contact assumptions between decisions and execution.
function v47ContactReach(p,type){return isGoalkeeper(p)?2.1+effectiveRating(p,'goalkeeping')*.12+effectiveRating(p,'running')*.04:type==='shoot'?1.35:2.0;}
function v47TouchReady(p,root,ball,time,type,from){
 if((ball.z||0)>(isGoalkeeper(p)?2.2:1.35))return false;
 const forward=attackDir(p.side)*(ball.x-root.x),turn=forward<-.5?.035:0;
 const reaction=type==='shoot'?.04:.025;
 return time>=reaction+turn && (!from||dist(from,root)<=Math.max(0,time)*movementPerformance(p,'run',.5,.5,.5,0).playbackSpeed+CELL_X);
}
function v47RouteThreats(actor,route,type){
 const blockers=new Set(teams.flat().map(p=>v45CellKey(cellOf(playerPoint(p))))),threats=[];
 for(const p of teams[1-actor.side]){
  if(type==='shoot'&&isGoalkeeper(p))continue;
  const root=playerPoint(p),hit=closestOnRoute(root,route);if(hit.t<.06||hit.t>.96)continue;
  const reach=v47ContactReach(p,type),time=.12+route.duration*routeTimeAtT(route,hit.t),perf=movementPerformance(p,'run',.5,.5,.5,0);
  let possible=hit.distance<=reach,arrival=0;
  if(!possible){const occupied=new Set(blockers);occupied.delete(v45CellKey(cellOf(root)));const path=findGridPath(cellOf(root),cellOf(hit.point),occupied,perf.maxSteps);
   if(path){const points=path.map(c=>cellPoint(c.col,c.row));points[0]=root;const end=ballContactAnchor(p,hit.point);points[points.length-1]=end;arrival=pathLength(points)/perf.playbackSpeed+.055;possible=arrival<=time;}
  }
  if(!possible||!v47TouchReady(p,root,hit.point,time,type))continue;
  const risk=clamp(.30+effectiveRating(p,'pressing')*.045+effectiveRating(p,'awareness')*.025-(arrival>0?.12:0),.2,.95);
  threats.push({player:p,point:hit.point,t:hit.t,distance:hit.distance,risk,reach,arrival,time});
 }
 return threats;
}
function laneDefendersStage1(side,from,to,radius=5){
 const actor=state.carrier?.side===side?state.carrier:v415RolePlayer(side,6),type=radius<=4.5?'shoot':'pass';
 const route=buildBallRoute({...from,z:0},{...to,z:type==='shoot'?.45:0},{kind:type==='shoot'?'driven':'ground',apex:type==='shoot'?.06:0,speed:type==='shoot'?30:18,ratio:type==='shoot'?.9:.78});
 return v47RouteThreats(actor,route,type).filter(x=>!isGoalkeeper(x.player)).map(x=>({player:x.player,route:{point:x.point,t:x.t,distance:x.distance},risk:x.risk}));
}

// Preserve the requested route; truncate only if a real challenger can enter and exit.


function v47ClearCarryChoice(e,c){
 const from=e.initialPositions.get(e.actor),blocked=new Set(teams.flat().filter(p=>p!==e.actor).map(p=>v45CellKey(cellOf(playerPoint(p))))),budget=v45Performance(e,e.actor).maxSteps;
 let path=findGridPath(cellOf(from),cellOf(c.point),blocked,budget);
 if(!path){const cells=[];for(let row=0;row<GRID_ROWS;row++)for(let col=0;col<GRID_COLS;col++){const next=findGridPath(cellOf(from),{col,row},blocked,budget);if(next&&next.length>1)cells.push({path:next,score:dist(cellPoint(col,row),c.point)});}cells.sort((a,b)=>a.score-b.score);path=cells[0]?.path;}
 if(!path)return {...c,...cellOf(from),point:{...from},path:[{...from}],steps:0};
 const points=path.map(p=>cellPoint(p.col,p.row));points[0]={...from};return {...c,...path.at(-1),point:points.at(-1),path:points,steps:path.length-1};
}


const v47Waypoints=motionWaypointsStage0;
function motionWaypointsStage1(from,to){const m=state.event?.trace.movements.find(m=>m.recoveryPath&&dist(m.recoveryPath[0],from)<.1&&dist(m.to,to)<.1);return m?m.recoveryPath.map(p=>({...p})):v47Waypoints(from,to);}
const v47Resolve=resolveEventStage0;

// Disable the V4.6 in-flight whole-cell takeover, retain normal ability-based contacts.
function prepareEventMotionStage6(e){
 v46Prepare(e);e.v46OriginalOwner=e.motion.owner;
 if(e.type==='carry'&&(e.result.outcome!=='kept'||(v45Movement(e,e.actor)?.pathSteps||0)===0)){e.chainShot=false;e.trace.continuation.selected=false;e.trace.continuation.reason=e.result.outcome!=='kept'?'没有保住球权，取消连续射门':'没有实际推进，取消带球后连续射门';}
 e.trace.tackleTrigger=e.tackleTrigger?{...e.tackleTrigger,defender:nameOf(e.tackleTrigger.defender)}:null;
 v410PlanTeamMovement(e);
 if(e.motion.owner||e.result.outcome==='goal'||e.result.outcome==='aerial_pending'||e.rules?.verdict)return;
 // Whole-cell ownership starts only when the actual moved ball has settled.
 const tail=e.v4UncontactedIncoming?.duration??(e.ballAfter||[]).reduce((n,leg)=>n+leg.duration,0);
 const at=e.ballFlight?(e.v4UncontactedIncoming?e.releaseTime+tail:e.impactTime+tail):e.quickContact?e.impactTime+.08:e.duration;
 let time=Math.min(e.duration,at),ball=null,candidates=[];
 for(let current=time;current<=e.duration+.0001;current=Math.min(e.duration,current+.012)){
  const point=v46UncontrolledBall(e,current);
  if(point&&(point.z||0)<=.08){const occupants=teams.flat().filter(p=>v46CellEqual(v47GroundRoot(e,p,current),point));if(occupants.length){time=current;ball=point;candidates=occupants;break;}}
  if(current>=e.duration)break;
 }
 if(!ball)return;
 candidates.sort((a,b)=>dist(samplePlayerMotion(e,a,time).point,ball)-dist(samplePlayerMotion(e,b,time).point,ball));
 const owner=candidates[0];if(!owner)return;
 const root=samplePlayerMotion(e,owner,time).point,pickup={owner,point:{...ball},time,cause:'settled-ground-cell',root:{...root}};
 // Preserve movers' reached roots at the action boundary, then continue their tasks.
 const future=e.trace.movements.map(m=>({player:teams.flat().find(p=>nameOf(p)===m.player),to:{...m.to},kind:m.duty}));
 if(!v46FreezeAtPickup(e,pickup))return;
 pickup.carryovers=future.filter(x=>x.player!==owner&&dist(playerPoint(x.player),x.to)>.2);
 pickup.cushion=Math.max(.08,dist(pickup.point,pickup.finalBall)/18);
 pickup.settleTimes=new Map();for(const p of teams.flat()){const roots=pickup.frozenRoots.get(p),perf=v45Performance(e,p);const seconds=Math.max(.08,dist(roots.from,roots.to)/perf.playbackSpeed+.025);pickup.settleTimes.set(p,seconds);e.duration=Math.max(e.duration,pickup.time+seconds);}
 const ownerRoots=pickup.frozenRoots.get(owner);if(!isGoalkeeper(owner)&&dist(ownerRoots.from,ownerRoots.to)>.1){const perf=v45Performance(e,owner),rolls=perf.rolls,carry=movementPerformance(owner,'carry',rolls.tier,rolls.steps,rolls.variation,0);const seconds=Math.max(.08,dist(ownerRoots.from,ownerRoots.to)/carry.playbackSpeed+.025);pickup.settleTimes.set(owner,seconds);pickup.ownerDribble=buildDribbleMotion([ownerRoots.from,ownerRoots.to],pickup.time,pickup.time+seconds,{startBall:pickup.point});pickup.finalBall={...pickup.ownerDribble.endBall,z:0};e.duration=Math.max(e.duration,pickup.time+seconds);registerMotion(e,1,owner,pickup.time,pickup.time+seconds,'落定获球后沿本次已计费的合法退出格带走');}
 e.duration=Math.max(e.duration,pickup.time+pickup.cushion);e.timeline.total=e.duration;e.trace.timing.duration=e.duration;
 const r=e.result;r.landing={...pickup.finalBall};
 if(e.type==='pass'){r.outcome=owner.side===e.side?'complete':'intercept';r.winner=owner.side===e.side?owner:null;r.intercepter=owner.side!==e.side?owner:null;}
 if(e.type==='carry'){r.outcome=owner===e.actor?'kept':'tackled';r.turnoverPlayer=owner===e.actor?null:owner;}
 e.trace.v4.branch.outcome=r.outcome;e.trace.v4.branch.secondaryControl=nameOf(owner);
 e.trace.gridControl.contactModel='settled-ground-only';e.trace.gridControl.continueResponders=pickup.carryovers.map(x=>nameOf(x.player));
}
function samplePlayerMotionStage7(e,p,time){
 const sample=v46Sample(e,p,time);
 if(e.gridPickup&&time>=e.gridPickup.time){const roots=e.gridPickup.frozenRoots.get(p),moving=dist(roots.from,roots.to)>.05;sample.point=motionLerp(roots.from,roots.to,clamp((time-e.gridPickup.time)/(e.gridPickup.settleTimes?.get(p)||.08),0,1));sample.pose=quickLoosePose(moving,p===e.gridPickup.owner,isGoalkeeper(p));sample.activeAnimation=p===e.gridPickup.owner?(isGoalkeeper(p)?14:4):moving?2:null;sample.clip=null;if(p===e.gridPickup.owner&&e.gridPickup.ownerDribble){const stroke=e.gridPickup.ownerDribble.sample(time);sample.point=stroke.root;sample.pose={lean:stroke.pose.lean,lift:stroke.pose.bob,squash:[stroke.pose.width,1],lag:stroke.pose.head};sample.activeAnimation=1;}const direction=chooseMotionDirection({type:moving?'move':'control',player:sample.point,movement:moving?{from:roots.from,to:roots.to}:null,target:e.gridPickup.point,fallback:{x:attackDir(p.side),y:0}});sample.direction=direction;sample.screenDirection=projectWorldDirection(project,sample.point,direction);sample.facing=Math.abs(direction.x)>.01?Math.sign(direction.x):sample.facing;}
 return sample;
}
function updateEventMotionStage4(e){
 e.motion.owner=e.v46OriginalOwner===undefined?e.motion.owner:e.v46OriginalOwner;e.v46DeferCapture=!!e.gridPickup&&e.elapsed>=e.gridPickup.time;
 v46Update(e);
 if(e.gridPickup&&e.elapsed>=e.gridPickup.time){const p=e.gridPickup.owner,ball=v46ControlBall({x:p.x,y:p.y},p.side),q=motionEase((e.elapsed-e.gridPickup.time)/e.gridPickup.cushion),point=e.gridPickup.ownerDribble?e.gridPickup.ownerDribble.sample(e.elapsed).ball:motionLerp(e.gridPickup.point,ball,q);state.ball.x=point.x;state.ball.y=point.y;state.ballZ=0;state.ballHeight=0;e.motion.owner=p;e.v46DeferCapture=false;captureMotionSample(e);}
}
const v47Responses=planEventResponsesStage3;
function planEventResponsesStage4(e){
 const responses=v47Responses(e),pending=state.v47Carryovers||[];state.v47Carryovers=[];
 for(const x of pending){if(x.player!==e.actor&&!responses.some(r=>r.player===x.player)){responses.push({player:x.player,kind:'CONTINUE_RUN',target:x.to,priority:60});e.trace.tasks.push({side:x.player.side,duty:'CONTINUE_RUN',target:x.to,selected:nameOf(x.player),reason:'前一动作获球后继续已分配的无球任务，本次新预算约束'});}}
 return responses;
}


const v47Begin=beginEventStage1;
function beginEventStage2(spec){const value=v47Begin(spec);if(state.event)state.event.trace.v47EventId=state.actionHistory.length+1;return value;}
const v47Start=startMatchStage0;
function startMatchStage1(){state.v47Carryovers=[];return v47Start();}

// Process assertions are stored alongside the structural checks.
const v47Check=checkCompletedEventStage0;
function checkCompletedEventStage1(e){const checks=v47Check(e),r=e.result;
 checks.noWholeCellFlightTakeover=!e.gridPickup||!e.ballFlight||e.gridPickup.time>=e.impactTime-.001;
 checks.tackleIntent=e.trace.contests.every(c=>c.type!=='TACKLE'||e.type==='carry'&&['protect','dribble'].includes(r.moveIntent)&&r.contactOccurred);
 if(e.v47Committed){
  const expected=e.type==='pass'&&r.outcome==='complete'?r.winner:e.type==='pass'&&r.outcome==='intercept'?r.intercepter:e.type==='carry'&&r.outcome==='kept'?e.actor:e.type==='carry'&&r.outcome==='tackled'?r.turnoverPlayer:e.type==='shoot'&&r.outcome==='saved'&&r.caught?teams[1-e.side].find(isGoalkeeper):null;
  checks.resultOwnerConsistent=!expected||state.carrier===expected;
  checks.looseHasNoOwner=r.outcome!=='loose'||state.carrier===null;
 }
 e.trace.checks=checks;return checks;
}
function v47GroundRoot(e,p,time){if(v45Movement(e,p)?.turnExecution)return {...v45Movement(e,p).to};return e.type==='scramble'||e.contact&&[e.contact.carrier,e.contact.challenger,e.contact.helper].includes(p)||e.result.aerial?samplePlayerMotion(e,p,time).point:v45PointAt(e,p,time);}
// V4.8: a local second-ball race, one nearby shot follower, event-scoped labels.
function v48RaceCandidatesStage0(point){return teams.flat().filter(p=>!isGoalkeeper(p)||isInPenaltyArea(p.side,point)).map(player=>{
 const from=playerPoint(player),gap=cellDistance(cellOf(from),cellOf(point)),perf=movementPerformance(player,'run',.5,.5,.5,0);
 return {player,gap,distance:dist(from,point),eta:Math.max(0,dist(from,point)-.9)/perf.playbackSpeed,near:gap<=2};
}).sort((a,b)=>a.eta-b.eta||a.distance-b.distance||b.player.awareness-a.player.awareness||a.player.side-b.player.side||a.player.num-b.player.num);}
function v48NearbyFollowUp(e){const pool=v48RaceCandidates(e.result.reboundSpot).filter(x=>x.player.side===e.side&&x.player!==e.actor&&!isGoalkeeper(x.player)&&x.near&&x.eta<=1.0);return pool[0]?.player||null;}
const v48Begin=beginEventStage2;
function beginEventStage3(spec){for(const p of teams.flat())p.reaction='';return v48Begin(spec);}


const v48Plan=planEventResponsesStage4;
function planEventResponsesStage5(e){
 if(e.type!=='scramble')return v48Plan(e);
 state.v47Carryovers=[];
 const point=e.physicalStart,candidates=v48RaceCandidates(point),primary=candidates.find(x=>x.player===e.actor),earliest=candidates[0]?.eta??0,counts=[0,0];counts[e.actor.side]=1;
 const chosen=[];
 for(const item of candidates){if(item.player===e.actor||!item.near||item.eta>earliest+.45||counts[item.player.side]>=2||chosen.length>=3)continue;chosen.push(item);counts[item.player.side]++;}
 const responses=chosen.map(x=>({player:x.player,kind:isGoalkeeper(x.player)?'CLAIM':'SECOND_BALL',target:{...e.start},priority:180-x.gap}));
 e.trace.looseBallRace={source:'nearby-empty-cell-ball',selection:candidates.map(x=>({player:nameOf(x.player),side:x.player.side,initialCellDistance:x.gap,distance:x.distance,eta:x.eta,selected:x.player===e.actor||chosen.includes(x),reason:x.player===e.actor?'primary':!x.near?'outside-two-cells':x.eta>earliest+.45?'cannot-arrive-in-local-window':chosen.includes(x)?'local-candidate':'team-or-total-limit'})),participants:[],excluded:[],ranking:[],winner:null,verdict:'single-shared-contest-baked-before-playback-revealed-at-contact',maximumTotal:4,maximumPerSide:2,selectionWindow:.45};
 e.trace.tasks.push(...responses.map(r=>({side:r.player.side,duty:r.kind,target:r.target,selected:nameOf(r.player),reason:'附近两格且可及时到达；含主抢者最多双方各两人'})));
 v4Trace(e).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));
 return responses;
}
const v48Score=scoreResponsePositionStage1;
function scoreResponsePositionStage2(p,point,intent,e){return v48Score(p,point,intent.kind==='REBOUND_READY'?{...intent,kind:'FORWARD_RUN'}:intent,e);}
const v48Prepare=prepareEventMotionStage6;
function prepareEventMotionStage7(e){
 v48Prepare(e);
 if(e.type==='scramble'){
  const allowed=new Set((e.looseArrivals||[]).filter(a=>a.arrivalTime<=e.looseEarliest+.10).map(a=>nameOf(a.player)));e.v48ActiveSecondBall=allowed;e.result.keeperRace=allowed.size>1&&teams.flat().some(p=>isGoalkeeper(p)&&allowed.has(nameOf(p)));
  e.trace.animations=e.trace.animations.filter(a=>![13,28,105,106,108].includes(a.id)||allowed.has(a.player));
  e.trace.v4.clips=e.trace.v4.clips.filter(c=>!['second_ball_run','receive_miss'].includes(c.key)||allowed.has(c.player));
  for(const r of e.responses)if(!allowed.has(nameOf(r.player)))r.player.reaction='COVER';
  for(const p of teams.flat())if(p.reaction==='SECOND_BALL'&&!allowed.has(nameOf(p)))p.reaction='COVER';
  e.trace.secondBall={maximumTotal:4,maximumPerSide:2,selected:[nameOf(e.actor),...e.responses.map(r=>nameOf(r.player))],actual:[...allowed],actualPerSide:teams.map((team)=>team.filter(p=>allowed.has(nameOf(p))).length)};
 }else e.trace.secondBall={selected:[],actual:[],shotFollowers:e.responses.filter(r=>r.kind==='REBOUND_READY').map(r=>nameOf(r.player))};
}
const v48Sample=samplePlayerMotionStage7;
function samplePlayerMotionStage8(e,p,time){const sample=v48Sample(e,p,time);
 if(e.type==='scramble'&&[13,28,105].includes(sample.activeAnimation)&&!e.v48ActiveSecondBall?.has(nameOf(p))&&p!==e.motion.owner){const moving=(v45Movement(e,p)?.pathSteps||0)>0;sample.activeAnimation=moving?2:null;sample.pose=quickLoosePose(moving,false,isGoalkeeper(p));sample.clip=null;}
 return sample;
}


const v48Check=checkCompletedEventStage1;
function checkCompletedEventStage2(e){const checks=v48Check(e);checks.localSecondBallLimit=e.type!=='scramble'||e.responses.every(r=>neighbouringBall(e.initialPositions.get(r.player),e.physicalStart))&&e.responses.length+1<=9;checks.noSpeculativeSecondBall=e.type==='scramble'||e.responses.every(r=>r.kind!=='SECOND_BALL')&&e.trace.animations.every(a=>![13,105].includes(a.id));e.trace.checks=checks;return checks;}

// V4.9: return duties do not occupy a response slot. Active saves/claims take priority.
const v49ScorePosition=scoreResponsePositionStage2;
function scoreResponsePositionStage3(p,point,intent,e){if(intent.kind==='KEEPER_RETURN')return -dist(point,intent.target)*8;return v49ScorePosition(p,point,intent,e);}
const v49Prepare=prepareEventMotionStage7;
function prepareEventMotionStage8(e){
 v49Prepare(e);
 for(const p of e.v49ReturningKeepers||[]){const m=v45Movement(e,p);if(m&&m.arrivalTime>(m.startTime||0)+.01)registerMotion(e,2,p,m.startTime||0,Math.min(e.duration,m.arrivalTime),'门将出击后独立回位，不占响应名额；再次扑救优先');}
 e.trace.keeperReturns=e.trace.movements.filter(m=>m.duty==='KEEPER_RETURN').map(m=>({...m,consumesResponseSlot:false,home:{x:teams.flat().find(p=>nameOf(p)===m.player).hx,y:teams.flat().find(p=>nameOf(p)===m.player).hy}}));
}
const v49Sample=samplePlayerMotionStage8;
function samplePlayerMotionStage9(e,p,time){const sample=v49Sample(e,p,time),m=v45Movement(e,p);
 if(m?.duty==='KEEPER_RETURN'&&!e.gridPickup&&time>=(m.startTime||0)&&time<m.arrivalTime&&e.motion.owner!==p){sample.pose=quickLoosePose(true,false,true);sample.activeAnimation=2;sample.clip=null;}
 return sample;
}

// V4.10: ordinary off-ball work has no player-count cap and never lengthens the ball action.
const V410_ORDINARY=new Set(['SUPPORT','SUPPORT_WIDE','FORWARD_RUN','MARK','COVER','CUT_LANE','REBOUND_READY','CONTINUE_RUN']);
function v410CanAssign(responses,kind){return V410_ORDINARY.has(kind)||responses.filter(r=>!V410_ORDINARY.has(r.kind)).length<MAX_RESPONDERS_PER_EVENT;}
function v410LimitResponses(responses){let active=0;return responses.sort((a,b)=>b.priority-a.priority).filter(r=>V410_ORDINARY.has(r.kind)||++active<=MAX_RESPONDERS_PER_EVENT);}
const v410Responses=planEventResponsesStage5;
function planEventResponsesStage6(e){
 const planned=v410Responses(e);e.v410OffBallSeeds=e.type==='scramble'?[]:planned.filter(r=>V410_ORDINARY.has(r.kind));
 const active=e.type==='scramble'?planned:planned.filter(r=>!V410_ORDINARY.has(r.kind));
 v4Trace(e).actualResponses=active.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));
 return active;
}


const v410Prepare=prepareEventMotionStage8;
function prepareEventMotionStage9(e){v410Prepare(e);if(e.trace.secondBall)e.trace.secondBall.shotFollowers=(e.v410OffBallSeeds||[]).filter(r=>r.kind==='REBOUND_READY').map(r=>nameOf(r.player));}


const v410Check=checkCompletedEventStage2;
function checkCompletedEventStage3(e){const checks=v410Check(e),team=e.trace.teamMovement;
 checks.fullOffBallEvaluation=!!team&&team.outfieldEvaluated===(team.outfieldExpected??[...e.initialPositions.keys()].filter(p=>!isGoalkeeper(p)).length);
 checks.ordinaryDoesNotDelayAction=!!team&&team.durationBefore===team.durationAfter;
 checks.ordinaryMovementWithinTime=e.trace.movements.filter(m=>m.ordinaryOffBall).every(m=>m.interruptedAt!=null||m.arrivalTime<=e.duration+.001);
 checks.ordinaryNotBallResponders=e.responses.every(r=>!V410_ORDINARY.has(r.kind)||e.type==='scramble');
 e.trace.checks=checks;return checks;}

// V4.11: shot preference changes choice only; location and technique drive execution.
function v411Opponents(side){return teams[1-side].filter(p=>!isGoalkeeper(p)).map(p=>({...playerPoint(p),name:nameOf(p),num:p.num}));}
function v411Profile(p,point=playerPoint(p),target=chooseShotTarget(p.side)){return shotChoiceProfile(p,point,target,v411Opponents(p.side));}


const v411RoleDuty=roleDutyBonusStage0;
function roleDutyBonusStage1(p,kind){return kind==='SHOT'?shotRole(p.role).bonus:v411RoleDuty(p,kind);}
const v411Target=chooseShotTargetStage0;
function chooseShotTargetStage1(side){const p=state.carrier?.side===side?state.carrier:null;if(!p||!shotLocation(playerPoint(p),side).smallBox)return v411Target(side);
 const point=playerPoint(p),opponents=v411Opponents(side),keeper=teams[1-side].find(isGoalkeeper);
 return [31,33,35,37].map(y=>{const target={x:goalX(side),y},blocks=clearShotLine(point,target,opponents).length;return {target,score:-blocks*100+(keeper?dist(playerPoint(keeper),{x:goalX(side)-attackDir(side)*2.5,y})*.55:0)-Math.abs(y-34)*.12};}).sort((a,b)=>b.score-a.score)[0].target;
}

function v411ShotCalibrationStage0(e){
 const point=e.result.aerial?.contactPoint||playerPoint(e.actor),keeper=teams[1-e.side].find(isGoalkeeper),opponents=v411Opponents(e.side);
 const nearest=opponents.length?Math.min(...opponents.map(p=>dist(p,point))):100;
 const pressure=clamp((2.5-nearest)/2.5,0,1);
 return calibratedShot(point,e.side,{shooting:effectiveRating(e.actor,'shooting'),heading:effectiveRating(e.actor,'heading'),control:effectiveRating(e.actor,'control'),awareness:effectiveRating(e.actor,'awareness'),keeper:keeper?effectiveRating(keeper,'goalkeeping'):5,pressure,mode:e.result.aerial?.mode||'foot'});
}
const v411Contest=resolveContestStage0;

// V4.14: situational duties, failure recovery and deliberate tackling.

const v413Performance=v45PerformanceStage0;
function v45PerformanceStage1(e,p,mode){e.v413StartStuns??=new Set(teams.flat().filter(x=>false));const perf=v413Performance(e,p,mode);if(e.v413StartStuns.has(p)){perf.maxSteps=0;perf.stunned=true;perf.stunUntilRound=p.stunUntilRound;}return perf;}
const v413Responses=planEventResponsesStage6;
function planEventResponsesStage7(e){
 let responses=v413Responses(e).filter(r=>!false);
 if(e.type==='carry'){
  responses=responses.filter(r=>!['PRESS','DOUBLE_PRESS'].includes(r.kind));
  const intent=e.result.moveIntent,from=e.initialPositions.get(e.actor);
  let pool=intent==='protect'?teams[1-e.side].filter(p=>v46Adjacent(p,from,e.initialPositions)):intent==='dribble'?v46RouteThreats(e.actor,v46Route(e.actor,e.target,3,true),e.initialPositions).map(x=>x.player):[];
  pool=[...new Set(pool)].filter(p=>!isGoalkeeper(p));
  const choices=pool.map(player=>({player,decision:v413TackleChoice(e,player)})).sort((a,b)=>b.decision.utility-a.decision.utility);
  const selected=choices.filter(x=>x.decision.selected).slice(0,intent==='protect'?2:1);
  for(let i=0;i<selected.length;i++){const p=selected[i].player;responses=responses.filter(r=>r.player!==p);responses.push({player:p,kind:i?'DOUBLE_PRESS':'PRESS',target:from,priority:150-i*5});}
  e.trace.tackleDecisions=choices.map(x=>({...x.decision,selected:selected.includes(x)}));
 }
 responses=v410LimitResponses(responses);v4Trace(e).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));return responses;
}


const v413Aerial=v4CanAerialStage0;
function v4CanAerialStage1(p,point,mode){return !false&&v413Aerial(p,point,mode);}
const v413Race=v48RaceCandidatesStage0;
function v48RaceCandidatesStage1(point){return v413Race(point).filter(x=>!false);}


// Reserve the winner's exit with forward progress, pass options and pressure in view.

// Contact losers must settle in a distinct grid cell; use a short bodily exit,
// not a full retreat to the former grid centre. This is recovery, not a new run.
function v413SettleContact(e){
 if(!e.contact)return;
 const owner=e.motion.owner,oldCell=cellOf(e.contact.a),losers=[e.contact.carrier,e.contact.challenger,e.contact.helper].filter(p=>p&&p!==owner);
 const used=new Set(teams.flat().filter(p=>!losers.includes(p)).map(p=>v45CellKey(cellOf(playerPoint(p)))));
 for(let i=0;i<losers.length;i++){
  const p=losers[i],track=e.motion.tracks.get(p),anchor=track.anchor;let point=i===0?{x:clamp(anchor.x,oldCell.col*CELL_X+.12,(oldCell.col+1)*CELL_X-.12),y:clamp(anchor.y,oldCell.row*CELL_Y+.12,(oldCell.row+1)*CELL_Y-.12)}:{...anchor};
  if(i>0){const options=[];
   for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){const c={col:oldCell.col+dx,row:oldCell.row+dy};if(c.col<0||c.col>=GRID_COLS||c.row<0||c.row>=GRID_ROWS||used.has(v45CellKey(c)))continue;
    const next={x:clamp(anchor.x,c.col*CELL_X+.12,(c.col+1)*CELL_X-.12),y:clamp(anchor.y,c.row*CELL_Y+.12,(c.row+1)*CELL_Y-.12)};options.push({point:next,score:dist(anchor,next)});
   }
   options.sort((a,b)=>a.score-b.score);if(options[0])point=options[0].point;
  }
  track.to=point;p.tx=point.x;p.ty=point.y;p.stunCell=cellOf(point);used.add(v45CellKey(cellOf(point)));
  const m=v45Movement(e,p);if(m){if(m.contactSteps)m.pathSteps=(m.approachSteps||0)+1+(i>0?1:0);m.returnSteps=i>0?1:0;m.to=point;m.settleOnly=true;m.settleReason=i?'第二名接触者短距离退出到独立邻格':'接触后合法落位，不附加硬直';}
 }
}

const v413Point=v45PointAtStage0;
function v45PointAtStage1(e,p,time){const m=v45Movement(e,p);if(!m?.segments)return v413Point(e,p,time);let point=m.from;for(const segment of m.segments){if(time<segment.startTime)return point;point=pathPosition(segment.path,time-segment.startTime,v45Performance(e,p).playbackSpeed);if(time<segment.startTime+segment.seconds)return point;}return point;}
const v413Sample=samplePlayerMotionStage9;
function samplePlayerMotionStage10(e,p,time){const sample=v413Sample(e,p,time),m=v45Movement(e,p);if(m?.segments){const point=v45PointAt(e,p,time),next=v45PointAt(e,p,time+.012),moving=dist(point,next)>.01;sample.point=point;if(!moving||!sample.clip){sample.pose=quickLoosePose(moving,false,false);sample.activeAnimation=moving?2:null;sample.clip=null;}sample.direction=chooseMotionDirection({type:moving?'move':'observe',player:point,movement:moving?{from:point,to:next}:null,target:e.end,fallback:{x:attackDir(p.side),y:0}});sample.screenDirection=projectWorldDirection(project,point,sample.direction);}return sample;}
const v413Export=playerExportSnapshotStage0;
function playerExportSnapshotStage1(p){return {...v413Export(p),stun:{active:false,untilRound:p.stunUntilRound||0,reason:p.stunReason||null,cell:p.stunCell||null}};}


function v413AllowedEndGroups(e){return new Set(teams.flat().map(p=>v45CellKey(cellOf(playerPoint(p))))).size===teams.flat().length;}
const v413Checks=checkCompletedEventStage3;
function checkCompletedEventStage4(e){const checks=v413Checks(e);checks.onePlayerPerFinalCell=v413AllowedEndGroups(e);return checks;}
const v413Draw=drawMotionFigureStage0;

// V4.14 clarification: the defeated contact player stays in the old ball cell.
// Winner carries out, then receives the next normal charged action immediately.
const v413OwnedContact=resolveCarryStage1;

// V4.14: keep intended accuracy distinct from blocks, saves and settled pickup.

// V4.15: all judgements are baked once; playback only reveals them.
function v415RolePlayer(side,index){const team=teams[side];return index===0?team.find(isGoalkeeper)||team[0]:team.find(p=>(p.formationSlot??team.indexOf(p))===index)||team.find(p=>!isGoalkeeper(p))||team[0];}
BALL_ROUTE_LABELS.throw_in='双手掷球';
function v415Rules(){return state.rules??=( {version:RULES_VERSION,ballState:'live',pending:null,lastTouch:null,indirect:null,aerialOffside:null,decisions:[],cards:[{yellow:0,red:0},{yellow:0,red:0}],sentOff:[],restartCounts:{}} );}
function v415Touch(p,kind,eventId=state.actionHistory.length+1){return p?{side:p.side,num:p.num,player:nameOf(p),kind,eventId}:null;}
function v415ClearContinuation(){state.pendingShot=null;state.pendingAerial=null;state.wallPair=null;state.looseOrigin=null;state.v47Carryovers=[];}
function v415Award(restart,reason){const rules=v415Rules();rules.ballState='dead';rules.pending={...restart,reason,awardedAt:state.actionHistory.length+1};state.carrier=null;state.possession=-1;state.controlOffset=null;state.keeperBallMode='feet';v415ClearContinuation();}
function v415Snapshot(e){const release=v45Release(e),point=p=>({...v45PointAt(e,p,release),player:nameOf(p),num:p.num});return {...offsideSnapshot(e.side,e.ballRoute?.from||e.physicalStart,teams[e.side].filter(p=>p!==e.actor).map(point),teams[1-e.side].map(point),{exempt:restartExemptsOffside(e.result.restart?.kind)}),at:release,sourceEventId:state.actionHistory.length+1};}
function v415LastTouch(e){const r=e.result;let p=e.actor,kind=e.type;
 if(e.v444LongPassBlocker&&r.outcome==='loose')p=e.v444LongPassBlocker;
 else if(r.outcome==='intercept')p=r.intercepter;
 else if(r.outcome==='complete')p=r.winner;
 else if(r.outcome==='saved')p=teams[1-e.side].find(isGoalkeeper);
 else if(r.outcome==='blocked')p=r.blocker;
 else if(['aerial_defended','aerial_redirected'].includes(r.outcome))p=teams.flat().find(p=>nameOf(p)===r.aerialAttempt?.winner);
 else if(e.contact)p=e.motion?.owner||r.turnoverPlayer||e.contact.carrier;
 else if(e.type==='scramble')p=r.winner||null;
 if(r.outcome==='aerial_missed')return v415Rules().lastTouch;
 return v415Touch(p,kind);
}
const v415Route=prepareActualBallRouteStage2;
function prepareActualBallRouteStage3(e){
 v415Route(e);const r=e.result,restart=r.restart;
 let target={...e.flightTarget},from={...e.ballRoute.from},bend=e.ballRoute.bend,apex=e.ballRoute.apex;
 if(e.type==='pass'&&r.passError){const error=r.passError;target=limitDistance(e.start,{x:e.target.x+Math.cos(error.angle)*error.radius,y:e.target.y+Math.sin(error.angle)*error.radius},maxPassRange(e.actor));r.passError.unclippedTarget={...target};}
 if(e.type==='shoot')target.x=goalX(e.side)+attackDir(e.side)*.45;
 if(restart?.kind==='throw_in'){e.routeKind='throw_in';e.trace.ballRoute.kind='throw_in';e.trace.ballRoute.selected='双手掷球';e.trace.ballRoute.reason='边线出界后双手从头后向前释放，使用实际高低轨迹';from=throwBallPoint(restart.point,e.target,.45);e.physicalStart={...from};e.startHeight=from.z;apex=.8;r.loft=false;e.v4KeeperRelease=null;}
 if(restart&&restart.kind!=='throw_in'){from={...restart.point,z:0};e.physicalStart={...from};e.startHeight=0;e.v4KeeperRelease=null;}
 e.flightTarget=target;e.ballRoute=buildBallRoute(from,{...target,z:e.type==='shoot'?(e.flightTarget.z??.45):r.loft?.85:0},{kind:e.routeKind,bend,apex,speed:e.ballRoute.speed,ratio:e.ballRoute.ratio});
 if(r.loft){const hit=v4AerialPoint(e);e.v4Aerial=null;if(hit){const fraction=routeTimeAtT(e.ballRoute,hit.t),handoff=Math.max(0,fraction-.25/e.ballRoute.duration);e.v4Aerial={mode:r.aerialMode,contactPoint:hit.point,contactT:hit.t,contactFraction:fraction,handoffFraction:handoff,handoffT:sampleBallRoute(e.ballRoute,handoff).t,incomingRoute:e.ballRoute,receiver:r.receiver,attackSide:e.side,sourceEventId:state.actionHistory.length+1};}}
 e.trace.ballRoute.actual=routeSummary(e.ballRoute);r.actualPathRange=Number(e.ballRoute.length.toFixed(2));
 e.rules={restart:restart||null,firstCross:firstWholeCrossing(e.ballRoute.table),lastTouch:v415Touch(e.actor,e.type)};
}

const v415Contact=eventRouteContactStage0;
function eventRouteContactStage1(e,p,options={}){const cross=e.rules?.firstCross;return v415Contact(e,p,{...options,maxT:Math.min(options.maxT??.999,cross?cross.t-1e-6:1)});}


function v415ContactFoul(e){
 const c=e.contact;if(!c||!e.result.contactOccurred)return null;
 const candidates=[c.challenger,c.helper].filter(Boolean),checks=[];
 for(const p of candidates){
  const from=e.initialPositions.get(p),holderFrom=e.initialPositions.get(c.carrier),wonBall=motionResultOwner(e)===p;
  const behind=attackDir(c.carrier.side)*(from.x-holderFrom.x)<-1.5;
  const risk=combinedFoulRisk({pressing:effectiveRating(p,'pressing'),awareness:effectiveRating(p,'awareness'),stamina:p.currentStamina,slide:!!e.result.slide,late:!wonBall&&effectiveRating(p,'awareness')<4,behind,wonBall});
  const ball=c.point,depth=Math.abs(goalX(c.carrier.side)-ball.x),goalSide=teams[p.side].filter(q=>q!==p&&!isGoalkeeper(q)&&attackDir(c.carrier.side)*(playerPoint(q).x-ball.x)>1);
  const dogso=depth<23&&Math.abs(ball.y-34)<12&&goalSide.length===0,promising=!dogso&&depth<38&&goalSide.length<=1;
  const roll=randomFor('身体接触犯规检定:'+nameOf(p),e,{threshold:risk,compare:'lt'}),verdict=classifyCombinedFoul({roll,chance:risk,inOwnPenaltyArea:isInPenaltyArea(p.side,ball),dogso,promising,attemptBall:true});
  checks.push({player:nameOf(p),risk,roll,behind,wonBall,...verdict});
  if(verdict.foul){e.rules.foulChecks=checks;return {...verdict,kind:'foul',side:c.carrier.side,offender:p,victim:c.carrier,point:{...ball},restart:verdict.restart};}
 }
 e.rules.foulChecks=checks;return null;
}
const v415Resolve=resolveEventStage1;

function v415Freeze(e,at,ball){
 const startRoots=new Map(teams.flat().map(p=>[p,{...(v45Movement(e,p)?.turnExecution?v45Movement(e,p).to:samplePlayerMotion(e,p,at).point)}])),roots=new Map(),used=new Set();
 // First retain everyone's actual in-cell location; only contact collisions
 // require an adjacent recovery cell after the whistle.
 const priority=p=>p===e.contact?.carrier?0:false||!v45Movement(e,p)?1:2;const ordered=[...teams.flat()].sort((a,b)=>priority(a)-priority(b));
 for(const p of ordered){const from=startRoots.get(p),c=cellOf(from);let point={...from},key=v45CellKey(c);
  if(used.has(key)){const options=[];for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const col=c.col+dx,row=c.row+dy;if(col<0||col>=GRID_COLS||row<0||row>=GRID_ROWS||used.has(col+','+row)||[...startRoots].some(([q,pt])=>q!==p&&v45CellKey(cellOf(pt))===col+','+row))continue;const root={x:clamp(from.x,col*CELL_X+.15,(col+1)*CELL_X-.15),y:clamp(from.y,row*CELL_Y+.15,(row+1)*CELL_Y-.15)};if(cellDistance(cellOf(e.initialPositions.get(p)),{col,row})<=v45Performance(e,p).maxSteps)options.push({point:root,d:dist(from,root)});}options.sort((a,b)=>a.d-b.d);if(options[0])point=options[0].point;else point={...e.initialPositions.get(p)};key=v45CellKey(cellOf(point));}
  used.add(key);roots.set(p,{from,to:point});p.tx=point.x;p.ty=point.y;
 }
 e.rules.stop={at,ball:{...ball},roots,before:{movements:e.trace.movements.map(m=>({...m,path:m.path?.map(q=>({...q})),segments:m.segments?.map(a=>({...a,path:a.path.map(q=>({...q}))}))})),owner:e.motion.owner,originalOwner:e.v46OriginalOwner,pickup:e.gridPickup}};e.duration=at+.16;e.timeline.total=e.duration;e.timeline.flightEnd=Math.min(e.timeline.flightEnd,at);e.timeline.config.recover=.16;if(e.trace.timing)e.trace.timing={...e.trace.timing,whistle:at,duration:e.duration};
 e.chainShot=false;e.gridPickup=null;e.motion.owner=null;e.v46OriginalOwner=null;e.motion.recoveryDribble=null;e.motion.bufferEnd=at;e.ballAfter=[];e.v4UncontactedIncoming=null;
 e.trace.movements.forEach(m=>{const p=teams.flat().find(p=>nameOf(p)===m.player),root=roots.get(p);if(!root)return;m.plannedTo=m.to;m.to={...root.to};m.interruptedAt=at;m.recoveryPath=null;m.recoverySteps=0;m.returnSteps=0;m.contactSteps=0;if(m.turnExecution){const i=m.path.findIndex(q=>v46CellEqual(q,root.to));if(i>=0)m.path=[...m.path.slice(0,i),{...root.to}];else{const route=findGridPath(cellOf(m.from),cellOf(root.to),new Set(),m.maxSteps);m.path=route?route.map((c,i)=>i===0?{...m.from}:i===route.length-1?{...root.to}:cellPoint(c.col,c.row)):[{...m.from}];}m.pathSteps=m.path.length-1;}else{m.path=[{...m.from},{...root.to}];m.pathSteps=cellDistance(cellOf(m.from),cellOf(root.to));}m.arrivalTime=Math.min(m.arrivalTime||at,at+.16);m.segments=null;});
 e.trace.animations=e.trace.animations.filter(a=>a.start<at&&![7,8,9,15,26,51].includes(a.id)).map(a=>({...a,duration:Math.max(.001,Math.min(a.duration,at-a.start))}));
 e.trace.v4.clips=e.trace.v4.clips.filter(a=>a.start<at).map(a=>({...a,end:Math.min(a.end,at),duration:Math.max(.001,Math.min(a.end,at)-a.start)}));
 const old=e.result.outcome;e.rules.previousOutcome=old;
 e.result.outcome=e.rules.verdict.kind;e.result.landing={...ball};e.end={...ball};
 if(e.rules.verdict.kind==='foul'){registerMotion(e,117,e.rules.verdict.victim,at,e.duration,'实际身体接触判犯规，吹停后收势');}
}
const v415Prepare=prepareEventMotionStage9;
function prepareEventMotionStage10(e){
 v415Prepare(e);
 // A settled rebound may leave the field after the original block/save.
 if(!e.rules.verdict&&!e.motion.owner){let begin=e.impactTime;for(const leg of e.ballAfter||[]){const cross=firstWholeCrossing(leg.table);if(cross){const restart=boundaryRestart(cross,e.rules.lastTouch);e.rules.verdict={kind:restart.kind==='goal'?'goal':'out',restart:restart.kind,side:restart.side,point:{...cross},restartPoint:restart.point,reason:'最后一次触球后的反弹整体出界',at:begin+leg.duration*routeTimeAtT(leg,cross.t)};break;}begin+=leg.duration;}}
 if(!e.rules.verdict&&e.gridPickup?.owner?.side===e.side){const flag=e.rules.offside?.players.find(p=>p.num===e.gridPickup.owner.num&&p.offside);if(flag){e.rules.verdict={kind:'offside',side:1-e.side,player:flag.player,point:{...e.gridPickup.point},at:e.gridPickup.time,reason:'出球时越位，落地球实际取得控制',restart:'indirect_free'};}}
 const verdict=e.rules.verdict;
 if(verdict&&verdict.kind!=='goal'){
  const at=verdict.at??(verdict.kind==='foul'?e.impactTime:verdict.kind==='offside'&&e.result.aerial?e.releaseTime:verdict.routeT!=null?e.releaseTime+e.ballRoute.duration*routeTimeAtT(e.ballRoute,verdict.routeT):e.impactTime);
  v415Freeze(e,Math.max(.01,at),verdict.point);
 }
 if(e.result.restart){const id={throw_in:112,goal_kick:113,corner:114,direct_free:115,indirect_free:115,penalty:116,kickoff:3}[e.result.restart.kind];registerMotion(e,id,e.actor,0,Math.min(e.duration,e.releaseTime+.2),'按已判定的定位球类型执行；触球即出球');}
}
const v415Sample=samplePlayerMotionStage10;
function samplePlayerMotionStage11(e,p,time){
 const stop=e.rules?.stop,at=stop?Math.min(time,Math.max(0,stop.at-1e-5)):time;let sample;
 if(stop){const movements=e.trace.movements,owner=e.motion.owner,originalOwner=e.v46OriginalOwner,pickup=e.gridPickup;e.trace.movements=stop.before.movements;e.motion.owner=stop.before.owner;e.v46OriginalOwner=stop.before.originalOwner;e.gridPickup=stop.before.pickup;try{sample=v415Sample(e,p,at);}finally{e.trace.movements=movements;e.motion.owner=owner;e.v46OriginalOwner=originalOwner;e.gridPickup=pickup;}}else sample=v415Sample(e,p,at);
 if(stop&&time>=stop.at){const root=stop.roots.get(p);sample.point=motionLerp(root.from,root.to,motionEase((time-stop.at)/.16));sample.pose=restartPose(e.rules.verdict.kind==='foul'&&p===e.rules.verdict.victim?'foul':'stand',(time-stop.at)/.16);sample.activeAnimation=e.rules.verdict.kind==='foul'&&p===e.rules.verdict.victim?117:null;sample.clip=null;}
 const restart=e.result.restart;if(restart&&p===e.actor&&time<e.releaseTime+.18){sample.activeAnimation={throw_in:112,goal_kick:113,corner:114,direct_free:115,indirect_free:115,penalty:116,kickoff:3}[restart.kind];sample.clip=null;if(restart.kind==='throw_in'){sample.pose=restartPose('throw_in',time<e.releaseTime?time/e.releaseTime*.45:.45+.55*(time-e.releaseTime)/.18);sample.point={...e.initialPositions.get(p)};}else sample.pose=restartPose('kick',time<e.releaseTime?time/e.releaseTime*.45:.45+.55*(time-e.releaseTime)/.18);}
 return sample;
}
const v415UpdateMotion=updateEventMotionStage4;
function updateEventMotionStage5(e){
 const time=e.elapsed,stop=e.rules?.stop;e.v46DeferCapture=true;if(stop)e.elapsed=Math.min(time,Math.max(0,stop.at-1e-5));v415UpdateMotion(e);e.elapsed=time;
 if(stop&&time>=stop.at){for(const p of teams.flat()){const sample=samplePlayerMotion(e,p,time);p.x=sample.point.x;p.y=sample.point.y;p.motionPose=sample.pose;p.motionSample=sample;p.motionDirection=sample.screenDirection||sample.direction;}Object.assign(state.ball,{x:stop.ball.x,y:stop.ball.y});state.ballZ=stop.ball.z||0;}
 if(e.result.restart?.kind==='throw_in'&&time<e.releaseTime){const ball=throwBallPoint(e.result.restart.point,e.target,time/e.releaseTime*.45);state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z;}
 state.ballHeight=(state.ballZ||0)*22*project(state.ball.x,state.ball.y).s;e.v46DeferCapture=false;captureMotionSample(e);
}
const v415Capture=captureMotionSampleStage1;
function captureMotionSampleStage2(e){if(e.v46DeferCapture)return;return v415Capture(e);}


function v415ApplyCard(p,card){if(!card)return null;const rules=v415Rules(),change=cardResult(p.yellowCards||0,card);p.yellowCards=change.yellows;rules.cards[p.side][card==='yellow'?'yellow':'red']++;if(change.sentOff){p.sentOff=true;const index=teams[p.side].indexOf(p);teams[p.side].splice(index,1);rules.sentOff.push({...playerExportSnapshot(p),reason:change.reason,round:state.round});if(card==='yellow')rules.cards[p.side].red++;
  if(isGoalkeeper(p)){const replacement=teams[p.side].slice().sort((a,b)=>effectiveRating(b,'goalkeeping')-effectiveRating(a,'goalkeeping'))[0];replacement.emergencyKeeper=true;replacement.role='临时门将';}
  if(state.selectedPlayer===p)state.selectedPlayer=teams[p.side][0];if(state.carrier===p){state.carrier=null;state.possession=-1;}addLog(nameOf(p)+'被罚下，'+(p.side===0?'我方':'对手')+'剩'+teams[p.side].length+'人。');
 }else addLog(nameOf(p)+'被出示黄牌。');return {player:nameOf(p),card,...change};}


function v415ChargeEventStage0(e){state.event=null;state.actionsInRound++;state.nextSide=v415Rules().pending?.side??(1-e.side);if(state.actionsInRound>=2){state.actionsInRound=0;finishRound();}else{state.phase='autoWait';state.timer=.25;}queueMicrotask(()=>projectRecords.update());}


// Positioning is an automatic dead-ball setup, not charged running distance.
function v415SetupRestart(restart,taker){
 const point={...restart.point},kind=restart.kind,defending=1-restart.side,used=new Set(),changes=[];
 const nearBoundary={x:clamp(point.x,.15,104.85),y:clamp(point.y,.15,67.85)};
 function legal(p,q){if(p===taker)return true;
  if(kind==='kickoff'){if(attackDir(p.side)*(q.x-52.5)>-.1)return false;if(p.side!==restart.side&&dist(q,point)<9.15)return false;}
  if(kind==='penalty'){
   if(p.side===defending&&isGoalkeeper(p))return Math.abs(q.x-goalX(restart.side))<.3&&Math.abs(q.y-34)<3.55;
   if(isInPenaltyArea(defending,q)||dist(q,point)<9.15||attackDir(restart.side)*(q.x-point.x)>0)return false;
  }
  if(p.side!==restart.side){if(kind==='goal_kick'&&isInPenaltyArea(restart.side,q))return false;const minimum=kind==='throw_in'?2:kind==='kickoff'?9.15:9.15;if(dist(q,point)<minimum)return false;}
  return true;
 }
 const ordered=[taker,...teams.flat().filter(p=>p!==taker).sort((a,b)=>(isGoalkeeper(b)?1:0)-(isGoalkeeper(a)?1:0))];
 for(const p of ordered){const from={...playerPoint(p)};let target=p===taker?nearBoundary:kind==='penalty'&&p.side===defending&&isGoalkeeper(p)?{x:goalX(restart.side)-attackDir(restart.side)*.12,y:34}:kind==='kickoff'?{x:clamp(p.hx,p.side===0?.15:52.65,p.side===0?52.35:104.85),y:p.hy}:from;
  if(used.has(v45CellKey(cellOf(target)))||!legal(p,target)){
   const options=[];for(let row=0;row<GRID_ROWS;row++)for(let col=0;col<GRID_COLS;col++){const q=cellPoint(col,row);if(!used.has(col+','+row)&&legal(p,q))options.push({point:q,score:dist(q,target)});}options.sort((a,b)=>a.score-b.score);if(options[0])target=options[0].point;
  }
  used.add(v45CellKey(cellOf(target)));p.x=p.tx=target.x;p.y=p.ty=target.y;p.motionPose=null;p.anim=null;p.reaction='';if(dist(from,target)>.01)changes.push({player:nameOf(p),from,to:target,reason:'死球自动合法站位，不算主动跑动'});
 }
 setPossession(taker);state.controlOffset=null;state.ball={x:point.x,y:point.y,tx:point.x,ty:point.y};state.ballZ=kind==='throw_in'?2.05:0;state.keeperBallMode='feet';state.selectedPlayer=teams[0].includes(state.selectedPlayer)?state.selectedPlayer:teams[0][0];return changes;
}

const v415Begin=beginEventStage3;
function beginEventStage4(spec){if(v415Rules().ballState==='dead'&&!spec.result?.restart)return v415RestartAction(v415Rules().pending);return v415Begin(spec);}
const v415Start=startMatchStage1;
function startMatchStage2(){if(state.phase!=='setup')return;for(const team of teams)team.forEach((p,i)=>{p.formationSlot=i;p.yellowCards=0;p.sentOff=false;});v415Award({kind:'kickoff',side:0,point:{x:52.5,y:34}},'比赛开始');return v415Start();}
const v415Goal=resetAfterGoalStage1;
function resetAfterGoalStage2(side){v415Goal(side);v415Award({kind:'kickoff',side,point:{x:52.5,y:34}},'失球方中圈开球');}
const v415Half=beginHalftimeStage1;
function beginHalftimeStage2(){v415Half();v415Award({kind:'kickoff',side:1,point:{x:52.5,y:34}},'下半场开球');}
const v415Draw=drawMotionFigureStage1;

const v415Hud=drawHUDStage0;

const v415Export=playerExportSnapshotStage1;
function playerExportSnapshotStage2(p){return {...v415Export(p),discipline:{yellowCards:p.yellowCards||0,sentOff:!!p.sentOff,emergencyKeeper:!!p.emergencyKeeper},formationSlot:p.formationSlot??null};}


// Penalty takers face the keeper first; other players can contest a rebound
// in the following normal action. Keeper movement starts at the kick.
const v415Responses=planEventResponsesStage7;
function planEventResponsesStage8(e){if(e.result.restart?.kind==='penalty'){const keeper=teams[1-e.side].find(isGoalkeeper);v4Trace(e).actualResponses=keeper?[{player:nameOf(keeper),kind:'SAVE',target:saveRoutePoint(e)}]:[];e.trace.tasks.push({side:1-e.side,duty:'SAVE',target:saveRoutePoint(e),selected:keeper?nameOf(keeper):null,reason:'点球起脚前门将留在门线上，起脚后扑救'});return keeper?[{player:keeper,kind:'SAVE',target:saveRoutePoint(e),priority:200}]:[];}return v415Responses(e);}
const v415PlanMovement=planSimultaneousMovementStage1;
function planSimultaneousMovementStage2(e,responses){v415PlanMovement(e,responses);if(e.result.restart?.kind==='penalty'){const keeper=teams[1-e.side].find(isGoalkeeper),m=keeper&&v45Movement(e,keeper);if(m){m.startTime=v45Release(e);m.arrivalTime=(m.arrivalTime||0)+m.startTime;}}}
const v415LegalContact=eventRouteContactStage1;
function eventRouteContactStage2(e,p,options){if(e.result.restart?.kind==='penalty'&&!isGoalkeeper(p)&&p.side!==e.side)return null;return v415LegalContact(e,p,options);}


// Distinguish being offside on the original incoming pass from a new shot phase.
const v415AerialResolve=resolveEventStage2;

// All restart restrictions share one second-touch marker.


const v415SecondTouchPrepare=prepareEventMotionStage10;
function prepareEventMotionStage11(e){v415SecondTouchPrepare(e);const marker=v415Rules().secondTouch;if(!marker||e.rules.verdict?.kind==='second_touch')return;if(marker.taker&&e.rules.lastTouch?.player&&e.rules.lastTouch.player!==marker.taker){v415Rules().secondTouch=null;if(v415Rules().indirect?.taker===marker.taker)v415Rules().indirect=null;return;}const owner=e.gridPickup?.owner||e.motion.owner,touched=owner&&nameOf(owner)===marker.taker,continued=!e.result.restart&&nameOf(e.actor)===marker.taker&&['carry','pass','shoot'].includes(e.type);if(touched||continued){e.rules.verdict={kind:'second_touch',side:1-e.side,point:owner?e.gridPickup?.point||e.result.impactPoint||playerPoint(owner):e.physicalStart,restart:'indirect_free',reason:'重启后其他队员尚未触球，主罚者再次触球'};v415Freeze(e,touched?e.gridPickup?.time??e.impactTime:Math.max(.01,e.releaseTime??.04),e.rules.verdict.point);}}

// Penalty calibration is independent from the ordinary per-cell shot model.
const v415ShotCalibration=v411ShotCalibrationStage0;
function v411ShotCalibrationStage1(e){const model=v415ShotCalibration(e);if(e.result.restart?.kind!=='penalty')return model;const technique=effectiveRating(e.actor,'shooting'),control=effectiveRating(e.actor,'control'),awareness=effectiveRating(e.actor,'awareness'),keeper=teams[1-e.side].find(isGoalkeeper),keeperRating=keeper?effectiveRating(keeper,'goalkeeping'):5;
 const onTarget=clamp(.90+.014*(technique-5)+.006*(control-5),.78,.98),goalWithReferenceKeeper=clamp(.76+.025*(technique-5)+.012*(control-5)+.008*(awareness-5),.50,.94),goalWithKeeper=clamp(goalWithReferenceKeeper-.025*(keeperRating-5),.42,onTarget-.025),goalGivenOnTarget=goalWithKeeper/onTarget;
 return {...model,mode:'penalty',ratings:{technique,control,awareness,keeper:keeperRating},pressure:0,onTarget,goalWithReferenceKeeper,goalWithKeeper,goalGivenOnTarget,saveChance:1-goalGivenOnTarget,penaltyCalibration:{referenceGoalRate:.76,abilitiesSeparateFromPreference:true}};
}


// At the end of either half, an already awarded penalty must be completed.
// This adds at most one penalty action per half, without an extra round.
const v415RoundFinish=finishRoundStage0;
function finishRoundStage1(){const rules=v415Rules();if(rules.pending?.kind==='penalty'&&[HALFTIME_ROUND-1,TOTAL_ROUNDS].includes(state.round)&&!rules.penaltyExtensionActive){rules.penaltyExtensionActive={round:state.round,awardedAfterEvent:state.actionHistory.length};rules.penaltyExtensions??=[];rules.penaltyExtensions.push(rules.penaltyExtensionActive);state.actionsInRound=1;state.phase='autoWait';state.nextSide=rules.pending.side;state.timer=.25;addLog('本半场时间已到，完成已判点球后再结束。');return;}rules.penaltyExtensionActive=null;v415RoundFinish();}
const v415Charge=v415ChargeEventStage0;
function v415ChargeEventStage1(e){v415Charge(e);if(teams.some(t=>t.length<7)){state.phase='end';state.matchCompletedAt??=new Date().toISOString();state.finalReaction={id:36,kind:'人数不足，比赛终止',score:[...state.score],players:[]};addLog('一方不足7人，比赛终止。');projectRecords.archive();}}

// V4.16: match length, individual off-ball duties and completed-event statistics.

function v416SelectRounds(value){if(state.phase!=='setup')return false;const rounds=Number(value);if(rounds!==80)return false;TOTAL_ROUNDS=rounds;HALFTIME_ROUND=rounds/2+1;state.matchRounds=rounds;v416RefreshLengthControl();diagnostics.record('match-length-selected',{rounds,normalActions:rounds*2});return true;}
function v416RefreshLengthControl(){const control=document.getElementById('match-length-control');if(!control)return;control.hidden=state.phase!=='setup';for(const button of control.querySelectorAll?.('[data-rounds]')||[])button.setAttribute('aria-pressed',String(Number(button.dataset.rounds)===TOTAL_ROUNDS));}
for(const button of document.querySelectorAll?.('#match-length-control [data-rounds]')||[])button.addEventListener('click',()=>v416SelectRounds(button.dataset.rounds));
function v416PlayerId(p){return p.side+'-'+p.num;}
function v416DutyPlan(e,side,ball,points,fixed,approach,time,shooting=false){
 const players=teams.flat().map(p=>({id:v416PlayerId(p),name:nameOf(p),side:p.side,role:p.role,hx:p.hx,hy:p.hy,...(points?.get(p)||e.initialPositions.get(p)),habit:p.habit,leading:p.leading,preferences:v419Prefs(p),stunned:false}));
 if(time===0&&!(e.motion?.initialCarrier||state.carrier)&&e.type==='scramble'){
  return v434LooseDuties(players,ball,fixed);
 }
 const activePress=e.responses.some(r=>r.player.side!==side&&['PRESS','DOUBLE_PRESS'].includes(r.kind));
 const plan=assignTeamDuties({players,side,ball,fixed:[...new Set([...fixed,...teams.flat().filter(p=>false)])].map(v416PlayerId),approach:approach?{id:v416PlayerId(approach.p),target:approach.point}:null,activePress,actionType:e.type,actionPlan:time===0?{type:e.type,target:{...(e.decision?.selected?.target||e.target)},receiverId:e.result.receiver?v416PlayerId(e.result.receiver):null}:null,transition:!!e.decision?.scene?.justWonPossession,ballHolderId:v416PlayerId(time>0?(e.motion.owner||e.actor):(e.motion?.initialCarrier||state.carrier||e.actor)),shooting,wingAttack:['wing-run','cross'].includes(e.result.tacticalIntent),delivery:time===0&&(e.result.deliveryKind||e.result.clearanceKind==='long')?{kind:e.result.deliveryKind||'clearance',origin:e.start,target:e.flightTarget||e.target,side:e.side}:null,chemistry:v424Chemistry(),orders:state.coachOrders,previous:state.dutyMemory||[],round:state.round,totalRounds:TOTAL_ROUNDS,score:state.score,draws:Object.fromEntries(players.flatMap((p,i)=>[[p.id,randomFor('无球个人倾向:'+p.id,e)],['task-'+i,randomFor('无球任务抽选:'+i,e)],['patch:'+p.id,randomFor('无球行为补丁:'+p.id,e)]]))});
 return {...plan,byPlayer:new Map(plan.tasks.map(t=>[teams.flat().find(p=>v416PlayerId(p)===t.id),t]))};
}

// V4.30: decisions are confirmed before movement; execution is resolved in grid units.


function v410PlanTeamMovementStage3(e){
 if(e.v410TeamPlanned)return;e.v410TeamPlanned=true;v413SettleContact(e);v430ConfirmIntents(e);
 const all=teams.flat(),byId=new Map(all.map(p=>[v416PlayerId(p),p])),fixed=new Set([e.actor,...e.responses.map(r=>r.player),e.motion.initialCarrier,e.motion.owner,e.contact?.carrier,e.contact?.challenger,e.contact?.helper].filter(Boolean)),plan=e.v430Confirmed,confirmed=new Map(plan.tasks.map(t=>[t.id,t])),initialSide=e.v430InitialSide,changed=!!(e.motion.owner&&initialSide!=null&&e.motion.owner.side!==initialSide),rows=[],actors=[],stationary=[];
 // No assignment is repeated after an outcome. A changed phase invalidates execution only.
 for(const p of all){const id=v416PlayerId(p),from={...e.initialPositions.get(p)},task=confirmed.get(id),primary=fixed.has(p)||!!v45Movement(e,p);
  if(isGoalkeeper(p)||primary){stationary.push({id,...playerPoint(p)});if(!isGoalkeeper(p))rows.push({id,player:nameOf(p),side:p.side,primary:true,kind:e.responses.find(r=>r.player===p)?.kind||'ACTIVE_ACTION',intent:task||null,reason:'执行本槽已确认的球相关动作或现场响应'});continue;}
  const perf=v45Performance(e,p,'run'),stunned=false,intent=task||{id,kind:'SHAPE',purpose:'shape',target:from,shape:from,phaseSide:initialSide,reason:'无人控球时不预设争抢结果'};
  const activePress=e.responses.some(r=>r.player.side===p.side&&['PRESS','DOUBLE_PRESS'].includes(r.kind)),disabled=stunned||changed||intent.kind==='APPROACH'&&activePress;
  const budget=disabled?0:perf.maxSteps;
  actors.push({id,side:p.side,from,maxSteps:budget,intent:{...intent,shapeWeight:DECISION_CONFIG.duties.shapeWeight*((DECISION_CONFIG.shapeAdherence?.[p.side]??50)/50)*v446Response(p,e).strength}});
  rows.push({id,player:nameOf(p),side:p.side,primary:false,...intent,from,phaseSide:initialSide,kind:stunned?'STUN':intent.kind,confirmedKind:intent.kind,maxSteps:perf.maxSteps,executionBudget:budget,speed:perf.speed,abilityUsedOnlyForExecution:true,decisionConfirmationCount:1,interrupted:disabled,interruptionReason:stunned?'硬直':changed?'球权已变化，旧任务失效；下一槽重新决策':'已有球相关响应，不追加接近'});
 }
 const forbidden=[];if(!e.motion.owner&&e.type==='scramble')forbidden.push(e.start);
 const settlement=resolveTurnExecution({actors,stationary,forbidden,orderOffset:state.round*2+e.actionSlot,maxIterations:4});
 for(const solved of settlement.movements){const p=byId.get(solved.id),row=rows.find(r=>r.id===solved.id),task=confirmed.get(solved.id)||solved.intent,steps=solved.pathSteps;
  Object.assign(row,{target:task.target,intentTarget:task.target,intentPath:solved.path,to:solved.to,pathSteps:steps,decision:steps?'move':'hold',executionStatus:row.interrupted?'interrupted':solved.status,taskCompleted:!row.interrupted&&solved.reached,executionOrder:solved.order,solverPass:solved.pass,reason:(task.reason||'本槽已确认意图')+'；'+(row.interrupted?row.interruptionReason:solved.reason),timeBudget:null,consumesResponseSlot:false});
  if(!steps)continue;
  const perf=v45Performance(e,p,'run'),m={player:nameOf(p),playerId:solved.id,duty:task.kind,from:solved.from,to:solved.to,path:solved.path,pathSteps:steps,maxSteps:perf.maxSteps,speed:perf.speed,performance:perf,ordinaryOffBall:true,turnExecution:true,executionOrder:solved.order};e.trace.movements.push(m);p.tx=solved.to.x;p.ty=solved.to.y;p.reaction=DUTY_LABELS[task.kind]||task.kind;e.motion.tracks.set(p,{from:solved.from,to:solved.to,approach:solved.to,anchor:solved.to,moving:true,v45Path:solved.path});
 }
 const afterSide=e.motion.owner?.side??initialSide,ball=e.motion.owner?playerPoint(e.motion.owner):e.end||e.start;
 e.trace.turnExecution={...settlement,confirmedUnit:'normal-action-slot',primaryResolvedFirst:true,decisionsConfirmedOnce:true,completionReassigned:false,renderTimeUsedForMovement:false};
 e.trace.teamMovement={policy:plan.policy,context:plan.context,defensiveContext:plan.defensiveContext,attackProtection:plan.attackProtection,responsibilities:plan.responsibilities||[],playersEvaluated:all.length,outfieldExpected:all.filter(p=>!isGoalkeeper(p)).length,outfieldEvaluated:rows.length,decisions:rows,ordinaryMovers:rows.filter(r=>!r.primary&&r.pathSteps>0).length,ordinaryHolders:rows.filter(r=>!r.primary&&!r.pathSteps).length,ballResponders:e.responses.length,durationBefore:e.duration,durationAfter:e.duration,postContactSide:afterSide,postContactBall:ball,preContactBall:e.start,postContactStart:0,assignmentAfterControl:false,gridPickupTasksDeferred:false,abilitiesOnlyExecute:true,oneDecisionPerActionSlot:true};
 e.trace.dutyMemory=plan.tasks.map(t=>({...t,lastExecution:rows.find(r=>r.id===t.id)?.executionStatus||'primary-response'}));
 e.trace.tasks.push(...plan.tasks.map(t=>({side:byId.get(t.id)?.side,duty:t.kind,target:t.target,selected:byId.has(t.id)?nameOf(byId.get(t.id)):t.id,reason:t.reason,source:'V4.33 confirmed before execution',assigned:true,arrived:false})));
 v430FitPresentation(e);
 for(const m of e.trace.movements.filter(m=>m.ordinaryOffBall&&m.pathSteps)){const p=byId.get(m.playerId);registerMotion(e,2,p,m.startTime,m.arrivalTime,'按格结算后展示跑动');const clip={MARK:'mark_run',COVER:'cover_run',REST_DEFENCE:'cover_run',COUNTER:'support_run',CUT_LANE:'cut_lane_run',SUPPORT:'support_run',SUPPORT_WIDE:'wide_support_run',FORWARD_RUN:'forward_run'}[m.duty];if(clip)v4RunClip(e,clip,p,m.startTime,m.arrivalTime);}
}

function v416BakeFacts(e){
 const facts=[],add=(side,key,count=1)=>{if((side===0||side===1)&&count>0)facts.push({side,key,count});},r=e.result,rule=e.rules?.verdict,base=e.rules?.previousOutcome||r.outcome,side=e.side,other=1-side,owner=e.gridPickup?.owner||e.motion.owner;
 const previous=state.actionHistory.at(-1)?.scoreAfter||[0,0];for(let s=0;s<2;s++)add(s,'goals',Math.max(0,state.score[s]-previous[s]));
 const cancelled=!!rule&&['offside','second_touch','foul'].includes(rule.kind),noContact=r.aerialAttempt?.actualShot===false||r.preShotPoke===true;
 if(e.type==='shoot'){
  if(cancelled)add(side,'shotsCancelled');else if(!noContact){add(side,'shots');if(base==='blocked'||base==='aerial_defended')add(side,'shotsBlocked');else if(['goal','saved'].includes(base)||rule?.kind==='goal')add(side,'shotsOnTarget');else if(r.shotAim?.kind==='wide')add(side,'shotsWide');else if(r.shotAim?.kind==='high')add(side,'shotsHigh');else add(side,'shotsOther');}
  if(base==='saved'&&!cancelled){add(other,'saves');if(r.caught)add(other,'keeperCatches');}
  if(r.doubleSave&&!cancelled){const sequence=e.trace.highlight?.stagedSequence,second=sequence?.steps?.find((step,index)=>step.kind==='shot'&&index>0);if(second){const shooter=teams.flat().find(p=>v416PlayerId(p)===second.playerId);facts.push({side,key:'shots',count:1,origin:second.from,actor:shooter?nameOf(shooter):second.playerId});add(side,'shotsOnTarget');add(other,'saves');}}
 }
 if(e.type==='pass'&&r.clearanceKind&&!cancelled)add(side,r.clearanceKind==='long'?'longClearances':'touchlineClearances');if(e.type==='pass'&&r.tacticalIntent==='cross'&&!cancelled)add(side,'crosses');
 if(e.type==='pass'&&r.restart?.kind!=='throw_in'&&!cancelled){add(side,'passAttempts');if(base==='complete'&&!r.passInterceptDeflected)add(side,'passesCompleted');if(r.passInterceptDeflected||base==='intercept'||owner?.side===other)add(other,'passInterceptions');}
 if(e.trace.highlight?.joint){const extra=Math.max(0,e.trace.highlight.joint.passes.length-(e.type==='pass'?1:0));add(side,'passAttempts',extra);add(side,'passesCompleted',extra);if(e.trace.highlight.joint.wallComplete){add(side,'wallPasses');add(side,'wallReturns');}}
 if(e.type==='carry'){add(side,'carryActions');if(r.moveIntent==='protect')add(side,'protectActions');if(r.moveIntent==='dribble'&&r.contactOccurred){add(side,'dribbleDuels');if(!cancelled&&base==='kept')add(side,'dribblesWon');if(rule?.kind==='foul'&&rule.offender?.side===other&&rule.victim===e.actor)add(side,'dribblesFouled');}}
 if(e.contact&&r.contactOccurred){const c=e.contact,defending=c.challenger.side;add(defending,'tackleDuels');add(defending,'tackleParticipants',[c.challenger,c.helper].filter(Boolean).length);if(!cancelled&&(e.v437TackleResult?.winner?.side===defending||e.trace.tackleOutcome?.success&&e.trace.tackleOutcome.winner===nameOf(c.challenger)||owner?.side===defending))add(defending,'tacklesWon');if(r.slide)add(defending,'slides');if(r.feint)add(c.carrier.side,'feints');if(c.helper)add(defending,'doublePresses');}
 const approachSides=new Set(e.responses.filter(q=>['PRESS','DOUBLE_PRESS'].includes(q.kind)).map(q=>q.player.side));for(const d of e.trace.teamMovement?.decisions||[])if(d.kind==='APPROACH'&&d.decision==='move')approachSides.add(d.side);for(const s of approachSides)add(s,'pressureActions');
 if(e.type==='scramble'){const participants=e.looseArrivals||[];for(const s of new Set(participants.map(a=>a.player.side)))add(s,'looseContests');if(r.winner)add(r.winner.side,'looseWins');}
 if(r.aerial?.mode==='header'){for(const s of new Set((r.aerialAttempt?.participants||[]).map(name=>teams.flat().find(p=>nameOf(p)===name)?.side).filter(s=>s===0||s===1)))add(s,'headerDuels');if(!cancelled&&(r.aerialAttempt?.actualShot||['aerial_defended','aerial_redirected'].includes(base))){const p=teams.flat().find(p=>nameOf(p)===r.aerialAttempt?.winner);if(p)add(p.side,'headerTouches');}}
 if(r.aerial?.mode==='volley'&&!cancelled)add(side,'volleys');if(e.type==='pass'&&r.headerLayoff&&!cancelled)add(side,'headerTouches');
 if(r.wallPhase==='first'&&e.type==='pass'&&!cancelled)add(side,'wallPasses');if(r.wallPhase==='return'&&base==='complete'&&r.winner===r.receiver&&!cancelled)add(side,'wallReturns');
 if(e.ballRoute?.bend&&!cancelled&&!noContact)add(side,'curvedBalls');
 const taken={throw_in:'throwInsTaken',goal_kick:'goalKicksTaken',corner:'cornersTaken',direct_free:'directFreeTaken',indirect_free:'indirectFreeTaken',penalty:'penaltiesTaken'}[r.restart?.kind];if(taken)add(side,taken);
 if(r.restart?.kind==='penalty'&&state.score[side]>previous[side])add(side,'penaltyGoals');
 if(rule){if(rule.kind==='out')add(e.rules.lastTouch?.side??other,'outs');if(rule.kind==='foul')add(rule.offender?.side??1-rule.side,'fouls');if(rule.kind==='offside')add(1-rule.side,'offsides');if(rule.kind==='second_touch')add(1-rule.side,'secondTouches');
  const awarded={throw_in:'throwInsAwarded',goal_kick:'goalKicksAwarded',corner:'cornersAwarded',direct_free:'directFreeAwarded',indirect_free:'indirectFreeAwarded',penalty:'penaltiesAwarded'}[rule.restart];if(awarded)add(rule.side,awarded);
 }
 const card=e.rules?.card;if(card){const s=rule?.offender?.side??1-rule.side;if(card.card==='yellow')add(s,'yellowCards');if(card.sentOff)add(s,'redCards');}
 return facts;
}

function v416ShowStatistics(){const dialog=document.getElementById('statistics-dialog');if(!dialog?.showModal)return;const data=countMatchStatistics(state.actionHistory,{rounds:TOTAL_ROUNDS,phase:state.phase});document.getElementById('statistics-summary').textContent=`${TOTAL_ROUNDS}回合 · 已完成 ${data.normalEvents}/${TOTAL_ROUNDS*2} 个正常行动 · 另有 ${state.preparationHistory?.length||0} 个准备回合 · 比分 ${state.score.join(' : ')} · 本局动画累计 ${Math.round(data.animationSeconds)} 秒`;
 function table(keys){const t=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');for(const label of ['事件','我方','对手','合计']){const th=document.createElement('th');th.textContent=label;tr.append(th);}head.append(tr);t.append(head);const body=document.createElement('tbody');for(const key of keys){const row=document.createElement('tr');for(const value of [STAT_LABELS[key],data.teams[0][key],data.teams[1][key],data.totals[key]]){const td=document.createElement('td');td.textContent=value;row.append(td);}body.append(row);}t.append(body);return t;}
 const content=document.getElementById('statistics-content');content.replaceChildren(table(CORE_STATS));const more=document.createElement('details'),summary=document.createElement('summary');summary.textContent='更多事件与定位球执行统计';more.append(summary,table(Object.keys(STAT_LABELS).filter(k=>!CORE_STATS.includes(k))));content.append(more);const note=document.createElement('p');note.textContent='出界记在最后触球方；射偏可以同时计一次出界。抢断对抗按一次共同接触结算统计，参与人次另列。定位球获判与执行分开。';content.append(note);const movement=document.createElement('p');movement.textContent=`普通无球任务：移动 ${data.movement.moves} 次，保持位置 ${data.movement.holds} 次；所有任务均可查看云端完整比赛记录。`;content.append(movement);const heading=document.createElement('h3');heading.textContent='射门位置 · 双方统一向右进攻';const pitch=document.createElement('pre');pitch.style.cssText='font:14px/1.7 monospace;white-space:pre;overflow:auto;padding:16px;background:#08191d';const grid=data.shotLocations.totals;pitch.textContent='本方球门                中线                 对方球门 →\n'+'┌'+'────┬'.repeat(14)+'────┐\n'+grid.map((row,i)=>'│'+row.map(n=>String(n||'·').padStart(3)+' ').join('│')+'│'+(i===4?' 球门':'')+(i<8?'\n├'+'────┼'.repeat(14)+'────┤':'')).join('\n')+'\n└'+'────┴'.repeat(14)+'────┘';content.append(heading,pitch);const legend=document.createElement('p');legend.textContent='数字为本局实际有效射门次数，·为零；包含封堵与点球，取消射门和空中未触球不计。';content.append(legend);dialog.showModal();}
document.getElementById('show-statistics')?.addEventListener?.('click',v416ShowStatistics);document.getElementById('end-statistics')?.addEventListener?.('click',v416ShowStatistics);document.getElementById('close-statistics')?.addEventListener?.('click',()=>document.getElementById('statistics-dialog').close());
const v416Start=startMatchStage2;
function startMatchStage3(){if(state.phase!=='setup')return;state.matchRounds=TOTAL_ROUNDS;state.dutyMemory=[];v416Start();v416RefreshLengthControl();}


const v416Render=renderStage0;
function renderStage1(){v416Render();v416RefreshLengthControl();}
state.matchRounds=TOTAL_ROUNDS;v416RefreshLengthControl();

// V4.17: shared outcome model, actual movement costs and physical ricochets.
function v417ModelStage0(carrier,defenders){const ratings=p=>Object.fromEntries(['dribbling','control','strength','awareness','pressing'].map(k=>[k,effectiveRating(p,k)]));return tackleModel(ratings(carrier),defenders.map(ratings));}

const v417Contest=resolveContestStage1;

function v417Travel(e,p){
 const logical=v45Movement(e,p);if(logical?.turnExecution)return pathLength(logical.path);
 if(!e.motion?.tracks?.has(p))return 0;const times=new Set([0,e.duration,e.impactTime,e.releaseTime,e.rules?.stop?.at,e.gridPickup?.time].filter(x=>Number.isFinite(x)&&x>=0&&x<=e.duration));for(let i=1;i<20;i++)times.add(e.duration*i/20);for(const segment of v45Movement(e,p)?.segments||[]){times.add(Math.min(e.duration,segment.startTime));times.add(Math.min(e.duration,segment.startTime+segment.seconds));}
 let distance=0,previous=null;const shownOwner=e.motion.owner;e.motion.owner=e.v46OriginalOwner===undefined?shownOwner:e.v46OriginalOwner;try{for(const t of [...times].sort((a,b)=>a-b)){const q=samplePlayerMotion(e,p,t).point;if(previous)distance+=dist(previous,q);previous=q;}}finally{e.motion.owner=shownOwner;}return distance;
}
function applyEventFatigueStage1(e){
 if(e.v417FatigueApplied)return;e.v417FatigueApplied=true;const effort=new Map(),add=(p,n)=>{if(p)effort.set(p,(effort.get(p)||0)+n);};add(e.actor,(BALANCE.fatigue.actionCosts[e.type]||BALANCE.fatigue.fallbackAction));for(const response of e.responses||[])add(response.player,BALANCE.fatigue.response);
 for(const leg of (e.trace.highlight?.joint?.passes||[]).slice(1))add(teams.flat().find(p=>v416PlayerId(p)===leg.fromId),BALANCE.fatigue.actionCosts.pass||BALANCE.fatigue.fallbackAction);
 const actors=[...new Set([...teams.flat(),...e.initialPositions.keys(),...effort.keys()])];for(const p of actors){const metres=v417Travel(e,p),action=effort.get(p)||0;if(metres<.005&&!action)continue;const before=p.currentStamina,loss=(action+metres/CELL_X*BALANCE.fatigue.perCellDistance)*(BALANCE.fatigue.fitnessBase-p.stamina*BALANCE.fatigue.staminaDiscount);p.currentStamina=clamp(before-loss,BALANCE.fatigue.minStamina,BALANCE.fatigue.maxStamina);e.trace.fatigue.push({player:nameOf(p),before:Number(before.toFixed(3)),actionEffort:action,movementMetres:Number(metres.toFixed(3)),movementEffort:Number((metres/CELL_X*BALANCE.fatigue.perCellDistance).toFixed(3)),loss:Number((before-p.currentStamina).toFixed(3)),after:Number(p.currentStamina.toFixed(3)),ordinaryOffBall:!!v45Movement(e,p)?.ordinaryOffBall,source:'actual sampled ground trajectory; charged once'});}
}
const v417TeamMovement=v410PlanTeamMovementStage3;
function v410PlanTeamMovementStage4(e){v417TeamMovement(e);if(e.result.restart?.kind!=='penalty')return;for(const m of e.trace.movements.filter(m=>m.ordinaryOffBall)){if(m.turnExecution)continue;const p=teams.flat().find(p=>nameOf(p)===m.player),perf=v45Performance(e,p,'run');m.startTime=e.releaseTime;if(m.segments)for(const segment of m.segments)segment.startTime+=e.releaseTime;m.arrivalTime+=e.releaseTime;if(m.arrivalTime>e.duration){m.interruptedAt=e.duration;const at=v45PointAt(e,p,e.duration);m.plannedTo=m.to;m.to=at;p.tx=at.x;p.ty=at.y;e.motion.tracks.get(p).to=at;}const decision=e.trace.teamMovement.decisions.find(d=>d.player===m.player);if(decision){decision.startTime=m.startTime;decision.arrivalTime=m.arrivalTime;decision.segments=m.segments;decision.to=m.to;}}
}
const v417Sample=samplePlayerMotionStage11;
function samplePlayerMotionStage12(e,p,time){if(e.result.restart?.kind==='penalty'&&v45Movement(e,p)?.ordinaryOffBall&&time<e.releaseTime){const sample=v417Sample(e,p,0);sample.point={...e.initialPositions.get(p)};sample.pose='stand';sample.activeAnimation=null;sample.clip=null;return sample;}return v417Sample(e,p,time);}
function deflectionSpotStage2(e,point,kind){
 const route=e.result.aerial?.incomingRoute||e.ballRoute,t=e.result.impactT??closestOnRoute(point,route).t,a=routePoint(route,Math.max(0,t-.01)),b=routePoint(route,Math.min(1,t+.01)),incoming={x:b.x-a.x,y:b.y-a.y};const speed=sampleBallRoute(route,e.result.impactFraction??routeTimeAtT(route,t)).speed;
 const roll=randomFor('反弹方向:'+kind,e),rangeRoll=randomFor('反弹距离:'+kind,e),model=deflectionVector({point,incoming,speed,kind,roll,rangeRoll});e.trace.deflections??=[];e.trace.deflections.push(model);return {...model.target};
}
const v417Pickup=v46FreezeAtPickupStage0;
function v46FreezeAtPickupStage1(e,pickup){const q=pickup.point;if(q.x<0||q.x>105||q.y<0||q.y>68)return false;return v417Pickup(e,pickup);}

const v417Checks=checkCompletedEventStage4;
function checkCompletedEventStage5(e){const checks=v417Checks(e);checks.penaltyOrdinaryMovementAfterRelease=e.result.restart?.kind!=='penalty'||e.trace.movements.filter(m=>m.ordinaryOffBall).every(m=>m.startTime>=e.releaseTime);if(e.trace.sharedTackle){const x=e.trace.sharedTackle;checks.sharedTackleRollConsistent=(x.roll<x.carrierWin)===(x.winner===x.carrier);checks.sharedTackleOneDraw=e.trace.randomDraws.filter(d=>String(d.label||d.reason||'').startsWith('统一控球对抗')).length<=1;}e.trace.checks=checks;return checks;}


// V4.18 configuration boundary. Compatibility accessors retain the V4.17 engine.
let v418Settings;
function v418BindSettings(){
 v418Settings=bindPlayerSettings(state,change=>{if(change.key==='rounds'){TOTAL_ROUNDS=change.value;HALFTIME_ROUND=TOTAL_ROUNDS/2+1;}});
 state.configurationInitial=v418Settings.snapshot();state.configurationChanges=[];
 v418Settings.onChange(change=>state.configurationChanges.push({...change,round:state.round,actionSlot:state.actionsInRound+1,phase:state.phase}));
}
v418BindSettings();
const v418Start=startMatchStage3;
function startMatchStage4(){if(state.phase==='setup')state.configurationInitial=v418Settings.snapshot();return v418Start();}


const v418Begin=beginEventStage4;
function beginEventStage5(...args){const result=v418Begin(...args);if(state.event)state.event.configurationSettings=v418Settings.snapshot();return result;}

// V4.20: preference-only intentions, followed by the unchanged physical event engine.


function v419SceneStage0(actor,point=null){const players=v419Players();if(point){const p=players.find(p=>p.id===v416PlayerId(actor));Object.assign(p,point);}return {players,actorId:v416PlayerId(actor),round:state.round,totalRounds:TOTAL_ROUNDS,score:[...state.score],actionSlot:state.actionsInRound+1,orders:[...state.coachOrders],focus:[...state.focusLane],teamCoaching:validateCoaching(v446Coaching()),coachResponses:v446Responses(),pair:state.wallPair&&state.actionHistory.length<=state.wallPair.expires?{aId:v416PlayerId(state.wallPair.a),bId:v416PlayerId(state.wallPair.b),sourceEventId:state.wallPair.sourceEventId,sourcePoint:state.wallPair.sourcePoint,defenderFrom:state.wallPair.defenderFrom,defenderId:state.wallPair.defenderId}:null,previousDuties:state.dutyMemory||[],transitionContext:counterOpportunity(state.actionHistory,players,players.find(p=>p.id===v416PlayerId(actor))),justWonPossession:counterOpportunity(state.actionHistory,players,players.find(p=>p.id===v416PlayerId(actor))).active,history:state.actionHistory.slice(-10).map(h=>({actorId:(h.side??0)+'-'+(h.actorProfile?.number??teams[h.side]?.find(p=>nameOf(p)===h.actor)?.num),type:h.action,start:h.start,target:h.intendedTarget,moveIntent:h.moveIntent,retained:h.ballStateAfter?.carrier===h.actor}))};}

// A completed carry can decide the next charged intent immediately, using the same policy.
function v45ShotDecisionStage2(e){if(e.v419Continuation)return {selected:e.v419Continuation.selected.type==='shoot',reason:'到位后已按统一决策计算下一动作'};if(e.type!=='carry'||e.contact||e.result.outcome!=='kept'||!v45Movement(e,e.actor)?.pathSteps)return {selected:false,reason:'没有连续推进到位机会'};e.v419Continuation=v419Select(e.actor,e,playerPoint(e.actor));return {selected:e.v419Continuation.selected.type==='shoot',reason:'推进到位立即按偏好与局势选择下一动作',policyVersion:DECISION_CONFIG.version};}
// Relief kicks reuse the existing kick, actual flight/interception and whole-ball-out rules.
const v420ActualRoute=prepareActualBallRouteStage3;
function prepareActualBallRouteStage4(e){v420ActualRoute(e);if(e.type!=='pass'||!e.result.clearanceKind)return;const r=e.result,apex=r.clearanceKind==='long'?3.6:1.1;const make=()=>buildBallRoute(e.ballRoute.from,{...e.flightTarget,z:0},{kind:'clearance',apex,bend:0,speed:24,ratio:.83});e.ballRoute=make();for(let i=0;i<4&&e.ballRoute.length>maxPassRange(e.actor)+.001;i++){e.flightTarget=limitDistance(e.start,e.flightTarget,dist(e.start,e.flightTarget)*maxPassRange(e.actor)/e.ballRoute.length);e.ballRoute=make();}e.routeKind='clearance';e.v4Aerial=null;r.actualPathRange=Number(e.ballRoute.length.toFixed(2));r.actualRange=Number(dist(e.start,e.flightTarget).toFixed(2));e.rules.firstCross=firstWholeCrossing(e.ballRoute.table);e.trace.ballRoute.actual=routeSummary(e.ballRoute);e.trace.ballRoute.kind='clearance';e.trace.ballRoute.reason='先选择解围方向，按实际脚力与偏差执行；经过格子、拦截和出界按新球路判断';}

const v419Export=playerExportSnapshotStage2;
function playerExportSnapshotStage3(p){return {...v419Export(p),preferences:{...v419Prefs(p)}};}


for(const p of [...teams.flat(),...benches.flat()])v419Prefs(p);
const v419Formation=applyFormationStage1;function applyFormationStage2(i){state.v419NextIntent=null;v419Formation(i);for(const p of [...teams.flat(),...benches.flat()])v419Prefs(p);}

function v419PreferencesUI(){document.getElementById('v419-preferences')?.remove();const dialog=document.createElement('dialog');dialog.id='v419-preferences';dialog.style.cssText='width:min(760px,95vw);max-height:88vh;overflow:auto;background:#10251c;color:white;border:1px solid #426b54;border-radius:12px;padding:22px;font:15px/1.6 system-ui';const title=document.createElement('h2');title.textContent='球员偏好 · −2 到 2';const note=document.createElement('p');note.textContent='偏好不等于能力。开赛前或中场可调整；本局云记录保存当前值。左中右分别打分，并按球队进攻方向理解。教练影响由全队纪律和熟悉程度控制，不改个人偏好原值。';const playerSelect=document.createElement('select');playerSelect.style.cssText='font:inherit;padding:10px;max-width:100%';const all=[...teams.flat(),...benches.flat()];all.forEach((p,i)=>{const o=document.createElement('option');o.value=i;o.textContent=(p.side===0?'我方 ':'对手 ')+nameOf(p);playerSelect.append(o);});const fields=document.createElement('div');fields.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0';function render(){fields.replaceChildren();const p=all[Number(playerSelect.value)];for(const key of PREFERENCE_KEYS){const label=document.createElement('label');label.textContent=PREFERENCE_LABELS[key]+' ';const input=document.createElement('select');input.style.cssText='font:inherit;min-height:40px';for(const v of [-2,-1,0,1,2]){const o=document.createElement('option');o.value=v;o.textContent=v+' '+({[-2]:'很不喜欢',[-1]:'不喜欢',[0]:'中性',[1]:'喜欢',[2]:'很喜欢'}[v]);input.append(o);}input.value=v419Prefs(p)[key];input.disabled=!['setup','halftime'].includes(state.phase);input.onchange=()=>{p.preferences=validatePreferences({...v419Prefs(p),[key]:Number(input.value)});state.v419NextIntent=null;projectRecords.update();};label.append(input);fields.append(label);}}playerSelect.onchange=render;const close=document.createElement('button');close.textContent='返回游戏';close.style.cssText='padding:12px 22px;font:inherit';close.onclick=()=>dialog.close();dialog.append(title,note,playerSelect,fields,close);document.body.append(dialog);render();dialog.showModal();}
document.getElementById('show-preferences')?.addEventListener('click',v419PreferencesUI);

// Remove legacy ability leakage in voluntary tackles, response assignment and restart choices.
function v413TackleChoiceStage3(e,p){const from=e.initialPositions.get(p),ball=e.initialPositions.get(e.actor),prefs=v419Prefs(p),coach=v446Response(p,e),press=clamp(prefs.press+(coach.order==='attack'?coach.strength:0),-2,2),danger=clamp(1-dist(ball,{x:goalX(1-p.side),y:34})/45,0,1),behind=teams[p.side].filter(q=>q!==p&&!isGoalkeeper(q)&&attackDir(e.side)*(playerPoint(q).x-from.x)>0).length,exposure=behind?0:7,weight=(.7+danger)*preferenceMultiplier(press,DECISION_CONFIG)*roleDecisionFactor(p,'defence'),probability=weight/(weight+1+exposure*.12),roll=randomFor('抢断意愿:'+nameOf(p),e),eligible=!false;return {player:nameOf(p),eligible,selected:eligible&&roll<probability,utility:probability-roll,probability,roll,preference:press,exposure,abilityUsed:false,reason:eligible?'按局势、施压偏好与教练选择是否上抢；触球条件和胜负交执行层':'硬直中禁止主动上抢'};}
function taskResponseScoreStage2(p,kind,target,e,need=0){if(false)return -100000;const prefs=v419Prefs(p),key=['PRESS','DOUBLE_PRESS','SECOND_BALL'].includes(kind)?'press':['SUPPORT','RECEIVE'].includes(kind)?'support':kind==='FORWARD_RUN'?'forwardRun':'cover',distance=dist(playerPoint(p),target),coach=v446Response(p,e).order==='attack'&&['PRESS','BLOCK','COVER'].includes(kind)?v446Response(p,e).strength:0;return -distance+Math.log(preferenceMultiplier(clamp(prefs[key]+coach,-2,2),DECISION_CONFIG))*8+need+randomFor('响应几何抽选:'+nameOf(p)+':'+kind,e)*2;}
function v415RestartActionStage2(restart){const rules=v415Rules(),side=restart.side,available=teams[side].filter(p=>!false),pool=available.length?available:teams[side];const outfield=pool.filter(p=>!isGoalkeeper(p)),restartPool=restart.kind==='goal_kick'?pool:(outfield.length?outfield:teams[side].filter(p=>!isGoalkeeper(p)));const key=restart.kind==='penalty'?'shoot':'pass',taker=restartPool.slice().sort((a,b)=>{if(restart.v434Taker){if(v416PlayerId(a)===restart.v434Taker)return -1;if(v416PlayerId(b)===restart.v434Taker)return 1;}if(restart.kind==='goal_kick'&&isGoalkeeper(a)!==isGoalkeeper(b))return isGoalkeeper(a)?-1:1;return (v419Prefs(b)[key]-v419Prefs(a)[key])*10+dist(playerPoint(a),restart.point)-dist(playerPoint(b),restart.point);})[0],before=snapshotAllPositions(),setup=v415SetupRestart(restart,taker);rules.pending=null;rules.ballState='live';rules.restartCounts[restart.kind]=(rules.restartCounts[restart.kind]||0)+1;rules.secondTouch={taker:nameOf(taker),kind:restart.kind};rules.indirect=['throw_in','indirect_free'].includes(restart.kind)?{taker:nameOf(taker),kind:restart.kind}:null;
 const point=restart.point,goal={x:goalX(side),y:34},direct=restart.kind==='penalty'||restart.kind==='direct_free'&&dist(point,goal)<29&&Math.abs(point.y-34)<20&&randomFor('任意球直接射门倾向')<.25*DECISION_CONFIG.preferenceMultipliers[v419Prefs(taker).shoot];let type=direct?'shoot':'pass',target=direct?goal:null,result={restart:{...restart,setup,positionsBeforeSetup:before}};
 if(type==='pass'){const mates=teams[side].filter(p=>p!==taker),enemies=teams[1-side].filter(p=>!isGoalkeeper(p)).map(playerPoint),options=mates.map(p=>({p,at:playerPoint(p),utility:attackDir(side)*(p.tx-point.x)*.35-geometryLine(point,playerPoint(p),enemies).length*12-Math.abs(dist(playerPoint(p),point)-(restart.kind==='corner'?20:15))*.5})).filter(x=>dist(x.at,point)>2).sort((a,b)=>b.utility-a.utility);const receiver=options[0]?.p||mates[0];target=playerPoint(receiver);result={...result,receiver,receiveSpot:target,mode:'feet'};if(restart.kind==='corner'&&state.actionsInRound===0&&geometryLocation(target,side).depth<=DECISION_CONFIG.loft.maxGoalDepth&&Math.abs(target.y-34)<=DECISION_CONFIG.loft.maxOffset&&dist(point,target)>=13){result.loft=true;result.aerialMode='header';}}
 beginEvent({side,actor:taker,type,target,result,description:nameOf(taker)+'执行'+RESTART_NAMES[restart.kind],decision:{type:'restart',kind:restart.kind,policyVersion:DECISION_CONFIG.version,reason:restart.reason,automaticLegalSetup:true,usesNormalActionSlot:true,abilitiesAffectChoice:false}});if(state.event){state.event.trace.restartSetup=setup;state.event.rules.restart=result.restart;}
}

// V4.21 pass contract shared by normal, wall-return and restart entry points.
// Capture before flight, offside, route responses or random execution error are calculated.
const v421Begin=beginEventStage5;
function beginEventStage6(spec){
 if(spec.type!=='pass'||v415Rules().ballState==='dead'&&!spec.result?.restart)return v421Begin(spec);
 const r={...spec.result,receiveSpot:spec.result?.receiveSpot?{...spec.result.receiveSpot}:undefined},receiver=r.receiver,kind=r.clearanceKind?'clearance':r.mode==='space'?'space':'feet';
 let target={...spec.target},requested={...spec.target};
 if(kind==='feet'){
  if(!receiver||!teams[spec.side].includes(receiver)||receiver===spec.actor){
   state.v419NextIntent=null;
   const selection=spec.decision?.draws?{...chooseIntent(v419Scene(spec.actor),DECISION_CONFIG,spec.decision.draws),sceneKey:JSON.stringify(v419Scene(spec.actor))}:v419Select(spec.actor);
   return v419StartIntent(spec.actor,selection);
  }
  target={...playerPoint(receiver)};r.receiveSpot={...target};
 }
 const passIntent={policy:'v421-current-receiver',kind,receiverId:receiver?v416PlayerId(receiver):null,
  receiverAtCommit:receiver?{...playerPoint(receiver)}:null,requestedTarget:requested,target:{...target},
  correctedBeforeFlight:dist(requested,target)>.001,committedEvent:state.actionHistory.length+1,
  frozenBeforeExecution:true};
 return v421Begin({...spec,target,result:r,decision:{...spec.decision,passIntent}});
}
const v421Check=checkCompletedEventStage5;
function checkCompletedEventStage6(e){
 const checks=v421Check(e),p=e.decision?.passIntent;
 if(p){checks.feetTargetMatchesCurrentReceiver=p.kind!=='feet'||!p.receiverId||dist(p.target,p.receiverAtCommit)<.001;
  checks.passTargetFrozenBeforeFlight=p.frozenBeforeExecution;
 }
 e.trace.checks=checks;return checks;
}

// V4.22 hard ownership boundary. All changes below concern keeper possession or a new controller.
const v422Begin=beginEventStage6;
function beginEventStage7(spec){
 // A stale actor cannot issue a possession action after another player has taken control.
 if(['pass','carry','shoot'].includes(spec.type)&&!spec.result?.restart&&!spec.result?.aerial&&state.carrier&&spec.actor!==state.carrier)return chooseAutoAction(state.carrier.side);
 if(isGoalkeeper(spec.actor)&&spec.type==='carry'&&state.carrier!==spec.actor)return chooseAutoAction(state.carrier?.side??state.nextSide);
 const held=isGoalkeeper(spec.actor)&&state.carrier===spec.actor;
 if(held&&spec.type!=='pass'){
  state.v419NextIntent=null;state.pendingShot=null;
  const scene=v419Scene(spec.actor),draws=spec.decision?.draws;
  return v419StartIntent(spec.actor,draws?{...chooseIntent(scene,DECISION_CONFIG,draws),sceneKey:JSON.stringify(scene)}:v419Select(spec.actor));
 }
 return v422Begin(spec);
}
const v422Recovery=planControlRecoveryStage2;

const v422Sample=samplePlayerMotionStage12;
function v422StopLateLooseChases(e){
 if(e.type!=='scramble'||e.v422StoppedChases||!e.motion?.owner||e.rules?.verdict)return;
 e.v422StoppedChases=new Map();
 const at=e.impactTime,owner=e.motion.owner,ownerRoot=e.v422KeeperHold?.root||playerPoint(owner);
 const reserved=new Set([v45CellKey(cellOf(ownerRoot)),...e.trace.movements.filter(m=>!m.ordinaryOffBall&&(m.arrivalTime??0)<=at).map(m=>v45CellKey(cellOf(m.to)))]);
 for(const movement of e.trace.movements.filter(m=>!m.ordinaryOffBall)){
  const p=teams.flat().find(p=>nameOf(p)===movement.player),a=e.looseArrivals?.find(a=>a.player===p),path=a?.path||movement.path;
  if(!p||p===owner||!path?.length||(a?.arrivalTime??movement.arrivalTime??0)<=at)continue;
  let stopAt=at,root=pathPosition(path,Math.max(0,at-(movement.startTime||0)),v45Performance(e,p).playbackSpeed),key=v45CellKey(cellOf(root)),blocked=false;
  if(reserved.has(key)){
   // A shared contest cell is transient. A later arrival waits on its existing
   // approach path instead of entering an occupied final cell or teleporting out.
   const prior=path.map((q,i)=>({q,i,length:pathLength(path.slice(0,i+1))})).filter(x=>x.length<=v45Performance(e,p).playbackSpeed*at&&!reserved.has(v45CellKey(cellOf(x.q)))).at(-1);
   if(!prior)continue;root={...prior.q};key=v45CellKey(cellOf(root));stopAt=prior.length/v45Performance(e,p).playbackSpeed;blocked=true;
  }
  reserved.add(key);
  const m=v45Movement(e,p),track=e.motion.tracks.get(p);
  e.v422StoppedChases.set(p,{time:stopAt,root:{...root}});p.tx=root.x;p.ty=root.y;
  // Truncate the existing path at its actual control-time point: no snap, reroll,
  // extra step, keeper escape or movement toward the now-controlled loose ball.
  let remain=v45Performance(e,p).playbackSpeed*stopAt;const prefix=[{...path[0]}];
  for(let i=1;i<path.length;i++){const length=dist(path[i-1],path[i]);if(remain<length)break;prefix.push({...path[i]});remain-=length;}
  if(dist(prefix.at(-1),root)>.001)prefix.push({...root});
  if(m){m.to={...root};m.path=prefix;m.arrivalTime=stopAt;m.contactSteps=0;m.returnSteps=0;m.recoverySteps=0;m.interruptedAt=stopAt;m.looseChaseCancelledAt=at;}
  if(track){track.to={...root};track.anchor={...root};}
  if(a){a.path=prefix;a.final={...root};a.anchor={...root};a.arrivalTime=stopAt;}
  (e.trace.cancelledLooseChases??=[]).push({player:nameOf(p),controlAt:at,stoppedAt:stopAt,blockedByOccupiedCell:blocked,root:{...root},reason:blocked?'争球格已占用，在原接近路径等待；实际控球后取消旧追球':'实际已有人控球，终止尚未到达的旧松球追逐；下一正常行动重新判断'});
 }
}
function v422HoldKeeper(e){
 const p=e.gridPickup?.owner||e.motion?.owner;
 if(!p||!isGoalkeeper(p)||p===e.motion.initialCarrier||e.rules?.verdict||e.v422KeeperHold)return;
 const time=e.gridPickup?.time??e.impactTime,root=e.gridPickup?.frozenRoots.get(p)?.from||v422Sample(e,p,time).point;
 e.v422KeeperHold={player:p,time,root:{...root}};p.tx=root.x;p.ty=root.y;
 const m=v45Movement(e,p),track=e.motion.tracks.get(p);
 if(m){m.to={...root};m.recoverySteps=0;m.keeperHoldAt=time;if(m.path?.length>1)m.path[m.path.length-1]={...root};}
 if(track){track.to={...root};track.anchor={...root};}
 if(e.gridPickup){e.gridPickup.ownerDribble=null;const roots=e.gridPickup.frozenRoots.get(p);roots.from={...root};roots.to={...root};e.gridPickup.finalBall=v46ControlBall(root,p.side);}
 e.motion.recoveryDribble=null;e.motion.flowReceive=false;e.motion.bufferRoot={...root};
 e.trace.keeperHold={player:nameOf(p),side:p.side,time,root:{...root},heldUntilActionEnds:true};
 // Remove only post-control dribble clips for this keeper; catching and pre-control approach remain.
 for(const a of e.trace.animations)if(a.player===nameOf(p)&&[1,8,21,49,51].includes(a.id))a.duration=Math.max(0,Math.min(a.duration,time-a.start));
}
function samplePlayerMotionStage13(e,p,time){
 const sample=v422Sample(e,p,time),hold=e.v422KeeperHold,stop=e.v422StoppedChases?.get(p);
 if(stop&&time>=stop.time){sample.point={...stop.root};sample.activeAnimation=null;sample.pose=quickLoosePose(false,false,isGoalkeeper(p));sample.clip=null;}
 if(hold?.player===p&&time>=hold.time){sample.point={...hold.root};sample.activeAnimation=14;sample.pose=quickLoosePose(false,true,true);sample.clip=null;}
 if(e.motion?.initialCarrier===p&&isGoalkeeper(p)&&e.type==='pass'&&time<(e.releaseTime??0))sample.point={...e.initialPositions.get(p)};
 return sample;
}
const v422Team=v410PlanTeamMovementStage4;
function v410PlanTeamMovementStage5(e){v423HoldLoose(e);v422HoldKeeper(e);v422StopLateLooseChases(e);return v422Team(e);}
function v422ClearOldIntent(){state.v419NextIntent=null;state.pendingShot=null;state.wallPair=null;state.dutyMemory=[];state.v47Carryovers=[];}
function v422PossessionBoundary(){
 const side=state.carrier?.side??null;
 if(state.v422DecisionSide!==side){v422ClearOldIntent();state.v422Epoch=(state.v422Epoch||0)+1;state.v422DecisionSide=side;}
 return side;
}


const v422Scene=v419SceneStage0;
function v419SceneStage1(...args){return {...v422Scene(...args),possessionEpoch:state.v422Epoch||0};}
// A settled-ground pickup is discovered after ordinary movement was baked. Stop its old
// carryovers at the existing contact boundary and decide fresh tasks, without granting
// more metres, more time or an extra action slot.
const v422Prepare=prepareEventMotionStage11;
function prepareEventMotionStage12(e){
 v422Prepare(e);v423HoldLoose(e);v422HoldKeeper(e);
 if(e.type==='scramble'&&e.motion.owner&&!e.gridPickup&&!e.rules?.verdict)v46FreezeAtPickup(e,{owner:e.motion.owner,point:{...e.result.impactPoint},time:e.impactTime,cushion:.06,settleTimes:new Map(),cause:'loose-controlled-in-place'});
 const owner=e.gridPickup?.owner||e.motion.owner,initial=e.motion.initialCarrier;
 if(!owner||e.rules?.verdict||e.result.outcome==='goal'||e.result.outcome==='aerial_pending')return;
 const controlAt=e.gridPickup?.time??e.impactTime,changed=!initial||owner.side!==initial.side;
 e.trace.possessionEpoch={fromSide:initial?.side??null,toSide:owner.side,owner:nameOf(owner),controlAt,changed,decisionAfterControl:true};
 if(!changed)return;
 if(e.gridPickup){
  e.gridPickup.carryovers=[];e.trace.gridControl.continueResponders=[];
  e.trace.ownershipTaskHistory={cancelledAt:controlAt,oldPhase:initial?.side??null,newPhase:owner.side,decisionDeferredUntilNextActionSlot:true,noSecondAssignment:true};
  e.trace.teamMovement.postContactSide=owner.side;e.trace.teamMovement.postContactBall={...playerPoint(owner)};
 }

}

const v422Checks=checkCompletedEventStage6;
function checkCompletedEventStage7(e){const c=v422Checks(e),epoch=e.trace.possessionEpoch;
 c.keeperPassOnly=!(isGoalkeeper(e.actor)&&e.motion.initialCarrier===e.actor)||e.type==='pass';
 c.keeperNoPostControlCarry=!e.gridPickup?.ownerDribble||!isGoalkeeper(e.gridPickup.owner);
 if(e.v422KeeperHold){const h=e.v422KeeperHold;c.keeperHeldRootStable=Array.from({length:9},(_,i)=>h.time+(e.duration-h.time)*i/8).every(t=>dist(samplePlayerMotion(e,h.player,t).point,h.root)<.001)&&dist(playerPoint(h.player),h.root)<.001;}
 c.ownershipTasksUseActualSide=!epoch?.changed||!!e.rules?.verdict||e.trace.teamMovement.postContactSide===epoch.toSide;
 c.ownershipNoOldCarryovers=!epoch?.changed||!e.gridPickup||!e.gridPickup.carryovers?.length;
 e.trace.checks=c;return c;
}

// V4.23: loose control is an endpoint; high delivery is a normal pass, not a forced aerial shot.
function v423HighMiddle(e,p){return e.type==='pass'&&(e.result.loft||e.result.clearanceKind==='long')&&p.t>DECISION_CONFIG.delivery.middleStart&&p.t<DECISION_CONFIG.delivery.middleEnd&&p.z>1.35;}
function v423HoldLoose(e){
 if(e.type!=='scramble'||!e.motion?.owner||e.rules?.verdict||e.v423LooseHold)return;
 const owner=e.motion.owner,a=e.looseArrivals?.find(a=>a.player===owner),root={...(a?.anchor||e.motion.tracks.get(owner).anchor)},at=e.impactTime,m=v45Movement(e,owner),track=e.motion.tracks.get(owner);
 // A contact offset can straddle a cell boundary into the stationary goalkeeper's cell.
 // Keep the control root inside the ball's acquired cell before holding it, never auto-exit afterwards.
 const contactCell=cellOf(e.result.impactPoint||e.start),mid=cellPoint(contactCell.col,contactCell.row);
 if(teams.flat().some(p=>p!==owner&&v46CellEqual(playerPoint(p),root))&&!v46CellEqual(root,mid)){
  root.x=clamp(root.x,mid.x-CELL_X/2+.05,mid.x+CELL_X/2-.05);root.y=clamp(root.y,mid.y-CELL_Y/2+.05,mid.y+CELL_Y/2-.05);
  e.trace.looseRootCellCorrection={ballCell:contactCell,root:{...root},reason:'contact offset crossed into an occupied neighbour cell'};
 }

 e.v423LooseHold={owner,root,time:at};owner.tx=root.x;owner.ty=root.y;
 if(m){m.to={...root};m.recoverySteps=0;m.returnSteps=0;m.looseHoldAt=at;}
 if(track){track.to={...root};track.anchor={...root};}
 e.motion.recoveryDribble=null;e.motion.flowReceive=false;e.motion.bufferRoot={...root};e.motion.bufferEnd=Math.min(e.duration,at+.06);e.trace.postControl=null;
 e.trace.looseControl={player:nameOf(owner),time:at,root:{...root},automaticExit:false,nextAction:'normal charged choice at control root'};
}
const v423Sample=samplePlayerMotionStage13;
function samplePlayerMotionStage14(e,p,t){const sample=v423Sample(e,p,t),h=e.v423LooseHold;if(h?.owner===p&&t>=h.time&&!e.gridPickup){sample.point={...h.root};sample.pose=quickLoosePose(false,true,isGoalkeeper(p));sample.activeAnimation=isGoalkeeper(p)?14:4;sample.clip=null;}return sample;}
const v423Route=prepareActualBallRouteStage4;
function prepareActualBallRouteStage5(e){
 v423Route(e);if(e.type!=='pass'||!e.result.deliveryKind||e.result.clearanceKind)return;
 const make=()=>buildBallRoute(e.ballRoute.from,{...e.flightTarget,z:0},{kind:'loft',apex:DECISION_CONFIG.delivery.apex,bend:0,speed:23,ratio:.82});
 e.ballRoute=make();for(let i=0;i<5&&e.ballRoute.length>maxPassRange(e.actor)+.001;i++){e.flightTarget=limitDistance(e.start,e.flightTarget,dist(e.start,e.flightTarget)*maxPassRange(e.actor)/e.ballRoute.length);e.ballRoute=make();}
 e.routeKind='loft';e.v4Aerial=null;e.result.actualPathRange=Number(e.ballRoute.length.toFixed(2));e.result.actualRange=Number(dist(e.start,e.flightTarget).toFixed(2));
 e.rules.firstCross=firstWholeCrossing(e.ballRoute.table);e.trace.ballRoute.actual=routeSummary(e.ballRoute);e.trace.ballRoute.kind='loft';e.trace.ballRoute.reason='正常高球越过中段，按真实落点与到达窗口处理接应，保留脚力和偏差';
 e.trace.highDelivery={kind:e.result.deliveryKind,intendedTarget:{...e.target},actualTarget:{...e.flightTarget},middleStart:DECISION_CONFIG.delivery.middleStart,middleEnd:DECISION_CONFIG.delivery.middleEnd,midflightGroundInterception:false,landingContest:true};
}


const v423Checks=checkCompletedEventStage7;
function checkCompletedEventStage8(e){const c=v423Checks(e),h=e.v423LooseHold;
 c.looseNoAutomaticCarry=!h||(!e.motion.recoveryDribble&&!e.gridPickup?.ownerDribble&&dist(playerPoint(h.owner),h.root)<.001);
 c.highMiddleNotIntercepted=!(e.result.interceptAttempts||[]).some(a=>a.result==='won'&&v423HighMiddle(e,{...a.point,t:a.t}));
 if(h&&!e.rules?.verdict)c.loosePromptNextAction=e.duration<=h.time+.081;
 e.trace.checks=c;return c;}

// V4.46: single team familiarity setting replaces chemistry; discipline owns obedience.
function v446Coaching(){state.teamCoaching??=validateCoaching(COACHING_DEFAULTS);state.pendingTeamCoaching??=[null,null];state.teamCoachingChanges??=[];return state.teamCoaching;}
function v424Chemistry(){return coordinationLevels(v446Coaching());}
function v446Slot(e=null){
 if(e?.coachContext)return e.coachContext;
 const prep=state.v434Preparation,key=state.round+':'+state.actionsInRound+':'+(prep?prep.session+':'+prep.completed:'normal');
 if(state.coachSlot?.key!==key)state.coachSlot={key,settings:validateCoaching(v446Coaching()),orders:[...state.coachOrders],focus:[...state.focusLane],responses:{}};
 return state.coachSlot;
}
function v446Response(p,e=null){const slot=v446Slot(e),id=p.id||v416PlayerId(p);if(!slot.responses[id])slot.responses[id]=coachResponse({settings:slot.settings,side:p.side,order:slot.orders[p.side],focus:slot.focus[p.side],roll:randomFor('教练响应:'+id,e)});return slot.responses[id];}
function v446Responses(e=null){for(const p of teams.flat())v446Response(p,e);return JSON.parse(JSON.stringify(v446Slot(e).responses));}
function v424RefreshChemistry(){
 const active=v446Coaching();
 for(const side of [0,1]){
  const pending=state.pendingTeamCoaching[side];
  for(const key of ['familiarity','discipline']){const select=document.getElementById(key+'-'+side);if(select)select.value=String(pending?.values[key]??active[key][side]);}
  const status=document.getElementById('coaching-status-'+side);if(status)status.textContent='当前：熟悉程度 '+active.familiarity[side]+'，纪律 '+active.discipline[side]+(pending?'；修改在第'+pending.effectiveRound+'回合生效':'；没有待生效修改');
 }
 const button=document.getElementById('show-coaching');if(button)button.textContent='阵容熟悉程度 · 纪律'+(state.pendingTeamCoaching.some(Boolean)?'（待生效）':'');
}
function v446QueueCoaching(side,patch){
 const current=v446Coaching();if(![0,1].includes(side)||!patch||Object.keys(patch).some(k=>!['familiarity','discipline'].includes(k)))throw new TypeError('双方熟悉程度和纪律配置无效');
 const values={familiarity:current.familiarity[side],discipline:current.discipline[side],...(state.pendingTeamCoaching[side]?.values||{}),...patch};
 if(Object.values(values).some(v=>!COACHING_LEVELS.includes(v)))throw new TypeError('须为−2、−1、0、1、2');
 const effectiveRound=state.phase==='setup'?1:state.round+(state.phase==='tactics'&&state.actionsInRound===0?0:1);
 state.pendingTeamCoaching[side]={values,effectiveRound};state.teamCoachingChanges.push({kind:'queued',side,values:{...values},requestedRound:state.round,effectiveRound,actionSlot:state.actionsInRound+1});
 if(state.phase==='setup')v424CommitChemistry();v424RefreshChemistry();projectRecords.update();return {values,effectiveRound};
}
function v424QueueChemistry(side,level){if(!Number.isInteger(level)||level<1||level>5)throw new TypeError('旧五档无效');return v446QueueCoaching(side,{familiarity:level-3});}
function v424CommitChemistry(){
 v446Coaching();if(state.event||state.actionsInRound!==0||state.phase==='end')return;
 for(const side of [0,1]){const pending=state.pendingTeamCoaching[side];if(pending&&pending.effectiveRound<=state.round){const before={familiarity:state.teamCoaching.familiarity[side],discipline:state.teamCoaching.discipline[side]};for(const key of ['familiarity','discipline'])state.teamCoaching[key][side]=pending.values[key];state.pendingTeamCoaching[side]=null;state.teamCoachingChanges.push({kind:'applied',side,before,values:{...pending.values},round:state.round});state.coachSlot=null;}}
 v424RefreshChemistry();
}
const v424Start=startMatchStage4;function startMatchStage5(){if(state.phase==='setup'){v424CommitChemistry();state.teamCoachingInitial=validateCoaching(v446Coaching());state.coachSlot=null;}return v424Start();}
const v424Round=finishRoundStage1;function finishRoundStage2(){const round=state.round,coaching=validateCoaching(v446Coaching());v424Round();const row=state.roundHistory.at(-1);if(row?.round===round){row.teamCoaching=coaching;row.chemistry=coordinationLevels(coaching);}v424CommitChemistry();}
const v424Advance=advanceRoundStage0;function advanceRoundStage1(){v424CommitChemistry();return v424Advance();}
const v424Begin=beginEventStage7;function beginEventStage8(...args){v424CommitChemistry();const result=v424Begin(...args);if(state.event){state.event.teamChemistry??=v424Chemistry();state.event.teamCoaching??=validateCoaching(v446Coaching());state.event.coachContext??=v446Slot();}return result;}
document.getElementById('show-coaching')?.addEventListener?.('click',()=>{v424RefreshChemistry();document.getElementById('coaching-dialog').showModal();});
document.getElementById('close-coaching')?.addEventListener?.('click',()=>document.getElementById('coaching-dialog').close());
for(const side of [0,1])for(const key of ['familiarity','discipline']){const select=document.getElementById(key+'-'+side);if(select){select.innerHTML=COACHING_LEVELS.map(v=>'<option value="'+v+'">'+v+' · '+({'-2':'很低','-1':'较低','0':'一般','1':'较高','2':'很高'}[v])+'</option>').join('');select.addEventListener?.('change',()=>v446QueueCoaching(side,{[key]:Number(select.value)}));}}
v424RefreshChemistry();

const v424Checks=checkCompletedEventStage8;
function checkCompletedEventStage9(e){const c=v424Checks(e),moves=e.trace.teamMovement?.decisions||[];
 c.chemistryActionSnapshot=moves.filter(m=>!m.primary&&m.chemistryLevel!=null).every(m=>m.chemistryLevel===(e.teamChemistry||v424Chemistry())[m.side]);
 c.rearProtectionTargetBehindBall=moves.filter(m=>m.kind==='REST_DEFENCE'&&m.protectionAnchor).every(m=>attackDir(m.side)*(cellOf(m.target).col-cellOf(m.protectionAnchor).col)<=0);
 c.forwardTaskTargetDirection=moves.filter(m=>m.kind==='FORWARD_RUN'&&m.runReference).every(m=>m.runReference.fieldProgress>0);
 e.trace.checks=c;return c;}


// V4.26: a legal dribble encounter always requests a tackle; one contact resolves at a time.
const v426OldTackleChoice=v413TackleChoiceStage3;
function v413TackleChoiceStage4(e,p){
 if(e.type!=='carry'||e.result.moveIntent!=='dribble')return v426OldTackleChoice(e,p);
 const route=v46Route(e.actor,e.target,3,true),index=route?.findIndex(c=>cellDistance(c,cellOf(e.initialPositions.get(p)))<=1)??-1,eligible=!false&&index>=0;
 return {player:nameOf(p),eligible,selected:eligible,attemptRequested:eligible,mandatoryDribbleAttempt:true,probability:eligible?1:0,roll:null,utility:eligible?1000-index:-1000,routeIndex:index,abilityUsed:false,reason:eligible?'带球过人经过合法邻格，必定试图抢断；先结算路径上第一个对抗':'硬直或不在实际过人路径的接触范围'};
}

const v426Checks=checkCompletedEventStage9;
function checkCompletedEventStage10(e){const c=v426Checks(e),decisions=e.trace.tackleDecisions||[],mandatory=e.type==='carry'&&e.result.moveIntent==='dribble';
 c.mandatoryDribbleIntent=!mandatory||decisions.filter(d=>d.eligible&&!d.rear).every(d=>d.attemptRequested&&d.probability===1)&&(!decisions.some(d=>d.eligible&&d.attemptRequested)||decisions.some(d=>d.selected));
 c.pressuredKeeperPolicy=!e.decision?.keeperDecision?.forcedClearance||e.result.clearanceKind==='long';
 c.deferredTaskNotArrived=(e.trace.teamMovement?.decisions||[]).filter(m=>m.taskDeferred).every(m=>m.supportArrived===false);
 e.trace.checks=c;return c;
}

// V4.28: execute the first legal intersection, and record why an intended challenge cannot occur.
function v46StopAtEncounterStage3(e,c){
 e.v47RequestedMove={...c,path:c.path.map(p=>({...p})),point:{...c.point}};
 const carrierBudget=v45Performance(e,e.actor).maxSteps,opponents=teams[1-e.side].filter(p=>!isGoalkeeper(p)&&v437CanTackle(p)&&v434RearChoice(e,p).attemptRequested),candidates=[];
 for(let i=0;i<c.path.length;i++)for(const p of opponents){const root=e.initialPositions.get(p),gap=cellDistance(cellOf(root),cellOf(c.path[i]));if(gap>1)continue;
  const stop=gap===0?Math.max(0,i-1):i,point=c.path[stop],blocked=new Set(teams.flat().filter(q=>q!==e.actor&&q!==p).map(q=>v45CellKey(cellOf(e.initialPositions.get(q))))),legal=cellDistance(cellOf(root),cellOf(point))===1&&!!findGridPath(cellOf(root),cellOf(point),blocked,1),defenderBudget=v45Performance(e,p).maxSteps;
  candidates.push({p,index:i,stop,point,legal,defenderBudget,carrierBudget,reason:!legal?'相邻交汇路径被占格阻挡':defenderBudget<2?'无球额度不足以接触并合法带离':stop>=carrierBudget?'控球方无接触后合法退出额度':'可形成实际交汇'});
 }
 candidates.sort((a,b)=>a.index-b.index||a.stop-b.stop||a.p.num-b.p.num);
 const firstIndex=candidates[0]?.index,first=candidates.filter(x=>x.index===firstIndex),hit=first.find(x=>x.legal&&x.defenderBudget>=2&&x.stop<carrierBudget);
 const requested=first[0];e.trace.dribbleEncounter={policy:'v428-actual-executed-route',candidates:candidates.map(x=>({player:nameOf(x.p),pathIndex:x.index,stopIndex:x.stop,point:x.point,legal:x.legal,defenderBudget:x.defenderBudget,carrierBudget:x.carrierBudget,attemptRequested:v434RearChoice(e,x.p).attemptRequested,rear:v434RearChoice(e,x.p).rear,probability:v434RearChoice(e,x.p).probability,reason:x.reason})),selected:hit?nameOf(hit.p):null};
 if(!requested){e.tackleTrigger=null;return c;}
 const oldPress=e.responses.find(r=>r.kind==='PRESS'),chosen=hit?.p||requested.p;
 if(oldPress){oldPress.player=chosen;oldPress.target={...(hit||requested).point};}else e.responses.push({player:chosen,kind:'PRESS',target:{...(hit||requested).point},priority:150});
 e.responses=e.responses.filter((r,i,arr)=>r.kind==='PRESS'||r.player!==chosen);if(!(e.trace.tackleDecisions||[]).some(d=>d.player===nameOf(chosen)))(e.trace.tackleDecisions??=[]).push({player:nameOf(chosen),eligible:true,attemptRequested:true,mandatoryDribbleAttempt:true,probability:1,abilityUsed:false,reason:'实际执行路径补充的几何交汇候选'});e.trace.tackleDecisions=(e.trace.tackleDecisions||[]).map(d=>({...d,selected:d.player===nameOf(chosen),executionSelected:d.player===nameOf(chosen)}));
 let stop=hit?hit.stop:Math.max(0,requested.stop-1);while(!hit&&stop>0&&teams.flat().some(p=>p!==e.actor&&v46CellEqual(e.initialPositions.get(p),c.path[stop])))stop--;const path=c.path.slice(0,stop+1),point={...path.at(-1)},cell=cellOf(point);
 if(hit){e.tackleTrigger={intent:'dribble',defender:hit.p,pathIndex:hit.index,cell:{...cell},path:c.path.map(p=>({...p})),initialDefenderCell:cellOf(e.initialPositions.get(hit.p)),stopBeforeContact:true};e.trace.dribbleEncounter.resolution='contact';}
 else{e.tackleTrigger=null;e.v428BlockedEncounter=true;e.trace.skippedContact={player:nameOf(chosen),reason:requested.reason};e.trace.dribbleEncounter.resolution='stop-before-unsettleable-contact';e.trace.dribbleEncounter.stoppedAt={...point};}
 return {...c,...cell,point,path,steps:path.length-1};
}
const v428PlanMovement=planSimultaneousMovementStage2;
function planSimultaneousMovementStage3(e,responses){v428PlanMovement(e,responses);if(e.type==='carry'&&e.result.moveIntent==='dribble')v4Trace(e).actualResponses=e.responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));if(!e.v428BlockedEncounter)return;const p=e.responses.find(r=>r.kind==='PRESS')?.player;if(!p||false)return;const m=v45Movement(e,p),from=e.initialPositions.get(p),target=e.trace.dribbleEncounter.candidates[0]?.point;if(!m||!target)return;const c=cellOf(from),to={x:clamp(target.x,c.col*CELL_X+.15,(c.col+1)*CELL_X-.15),y:clamp(target.y,c.row*CELL_Y+.15,(c.row+1)*CELL_Y-.15)};m.path=[{...from},to];m.to=to;m.arrivalTime=dist(from,to)/v45Performance(e,p).playbackSpeed;m.pathSteps=0;m.attemptOnly=true;p.tx=to.x;p.ty=to.y;e.trace.dribbleEncounter.attemptMovement={player:nameOf(p),from,to,withinStartCell:true,reason:'额度不足时仍主动向交汇方向靠近，不虚构触球或额外格数'};}


const v428Checks=checkCompletedEventStage10;
function checkCompletedEventStage11(e){const c=v428Checks(e);c.blockedEncounterNotBypassed=!e.v428BlockedEncounter||!e.trace.dribbleContinuation;c.actualEncounterHasContact=e.trace.dribbleEncounter?.resolution!=='contact'||!!e.contact;c.defenceSlotUsesActualBall=(e.trace.teamMovement?.decisions||[]).filter(t=>t.defenceSlot&&!t.taskDeferred).every(t=>t.defenceSlot.ball&&Number.isFinite(t.defenceSlot.lineOwnDepth));e.trace.checks=c;return c;}

// V4.29: match-scoped coach tuning. No localStorage, no mutation during a baked action.
function v429Tuning(){state.roleTuning??=JSON.parse(JSON.stringify(TUNING_DEFAULTS));state.roleTuningChanges??=[];return state.roleTuning;}
function v429QueueTuning(input){const values=validateTuning(input),between=['setup','tactics','halftime'].includes(state.phase)&&!state.event&&state.actionsInRound===0,effectiveRound=state.phase==='setup'?1:between?state.round:state.round+1;state.pendingRoleTuning={values,effectiveRound};state.roleTuningChanges??=[];state.roleTuningChanges.push({kind:'queued',requestedRound:state.round,effectiveRound,values});if(state.phase==='setup')v429CommitTuning();projectRecords.update();return effectiveRound;}
function v429CommitTuning(){v429Tuning();const pending=state.pendingRoleTuning;if(!pending||state.event||state.actionsInRound!==0||state.phase==='end'||pending.effectiveRound>state.round&&state.phase!=='setup')return;state.roleTuning=applyDecisionTuning(pending.values);state.pendingRoleTuning=null;state.roleTuningChanges.push({kind:'applied',round:state.phase==='setup'?1:state.round,values:JSON.parse(JSON.stringify(state.roleTuning))});v422ClearOldIntent();}
const v429Advance=advanceRoundStage1;function advanceRoundStage2(...args){v429CommitTuning();return v429Advance(...args);}

const v429Start=startMatchStage5;function startMatchStage6(...args){if(state.phase==='setup'){v429Tuning();v429CommitTuning();state.roleTuningInitial=JSON.parse(JSON.stringify(state.roleTuning));}return v429Start(...args);}



function v429ShowTuning(){window.openCoachTuning({active:JSON.parse(JSON.stringify(v429Tuning())),pending:state.pendingRoleTuning?JSON.parse(JSON.stringify(state.pendingRoleTuning)):null,defaults:TUNING_DEFAULTS,queue:v429QueueTuning,round:state.round,phase:state.phase,validate:validateTuning});}
document.getElementById('show-coach-tuning')?.addEventListener?.('click',v429ShowTuning);

if(typeof window.addEventListener==='function')window.addEventListener('load',()=>{if(new URLSearchParams(location.search).get('panel')==='tuning')v429ShowTuning();},{once:true});
// Final presentation adapter: logical destinations are already fixed. Seconds only draw them.
const v430SampleBefore=samplePlayerMotionStage14;
function samplePlayerMotionStage15(e,p,time){const sample=v430SampleBefore(e,p,time),m=v45Movement(e,p);if(!m?.turnExecution)return sample;sample.point=pathPosition(m.path,Math.max(0,time-(m.startTime||0)),m.presentationSpeed||1);if(m.pathSteps&&time>=(m.startTime||0)&&time<(m.arrivalTime||0)){sample.pose='run';sample.activeAnimation=2;const i=Math.max(1,m.path.findIndex(q=>dist(q,sample.point)<.1)),from=m.path[Math.max(0,i-1)],to=m.path[Math.min(m.path.length-1,i)];sample.direction=chooseMotionDirection({type:'move',player:sample.point,movement:{from,to},target:m.to,fallback:{x:p.side===0?1:-1,y:0}});}return sample;}
const v430PrepareBefore=prepareEventMotionStage12;
function prepareEventMotionStage13(e){
 v430PrepareBefore(e);
 // A legal pickup can shorten presentation. Refit playback, never truncate logical steps.
 for(const m of e.trace.movements.filter(m=>m.turnExecution)){
  if(dist(m.path.at(-1),m.to)>.01){const index=m.path.findIndex(p=>dist(p,m.to)<.01);if(index>=0)m.path=m.path.slice(0,index+1);else m.path=[...m.path.slice(0,-1),{...m.to}];m.pathSteps=m.path.length-1;}
  const row=e.trace.teamMovement.decisions.find(d=>d.id===m.playerId);if(row){row.to={...m.to};row.pathSteps=m.pathSteps;row.decision=m.pathSteps?'move':'hold';}
 }
 v430FitPresentation(e);
}

const v430ChecksBefore=checkCompletedEventStage11;
function checkCompletedEventStage12(e){const c=v430ChecksBefore(e),settlement=e.trace.turnExecution,rows=e.trace.teamMovement?.decisions||[],confirmed=new Map((e.trace.confirmedDecisions?.tasks||[]).map(t=>[t.id,t]));
 c.oneDecisionPerActionSlot=e.trace.confirmedDecisions?.confirmationCount===1;
 c.confirmedDutyIntentPreserved=rows.filter(r=>!r.primary&&confirmed.has(r.id)).every(r=>{const t=confirmed.get(r.id);return (r.confirmedKind||r.kind)===t.kind&&r.purpose===t.purpose&&dist(r.target,t.target)<.001;});
 c.gridExecutionWithinBudget=e.trace.movements.filter(m=>m.turnExecution).every(m=>m.pathSteps<=m.maxSteps&&m.path.slice(1).every((p,i)=>cellDistance(cellOf(p),cellOf(m.path[i]))<=1));
 c.noSecondDutyAssignment=!e.trace.ownershipTaskHistory||e.trace.ownershipTaskHistory.noSecondAssignment===true;
 c.executionDidNotReroll=settlement?.checks.noRandomReroll===true;c.animationDoesNotLimitGridMovement=settlement?.checks.noAnimationTimeInput===true;
 c.gridSolverFinalCellsUnique=settlement?.checks.finalCellsUnique===true;
 const defence=e.v430Confirmed?.defensiveContext,boxPass=e.type==='pass'&&!e.result.restart&&inGridPenaltyArea(1-e.side,e.start);
 c.boxBackpassExcluded=!boxPass||e.result.tacticalIntent==='cutback'||(e.side===0?1:-1)*(cellOf(e.target).col-cellOf(e.start).col)>=0;
 c.normalDefenceOutletAssigned=!defence?.normalDefence||!defence.eligibleOutletCount||defence.reservedOutlets.length>0;
 c.normalDefenceOutletIntentPreserved=!defence?.normalDefence||defence.reservedOutlets.every(o=>confirmed.get(o.id)?.normalDefenceOutlet&&confirmed.get(o.id)?.kind==='COUNTER');
 e.trace.checks=c;return c;
}

// V4.36: independent preparation rounds, neutral loose positioning, eight-neighbour reactions.
function v434LooseDuties(players,ball,fixed){
 const fixedIds=new Set([...fixed].map(v416PlayerId)),all=teams.flat(),tasks=players.filter(p=>!fixedIds.has(p.id)&&!p.stunned&&!p.role.includes('门将')).map(p=>{
  const shape=personalShape(p,p.side,ball),category=positionCategory(p.role),dir=p.side===0?1:-1;
  // Neither side is assumed to win. Restore width, protection and a next-pass outlet.
  const depth=p.side===0?ball.x:105-ball.x,home=p.side===0?shape.x:105-shape.x;
  const u=category==='defender'?Math.min(home,Math.max(10.5,depth-14)):category==='forward'?Math.max(home,Math.min(73.5,depth+14)):Math.max(24.5,Math.min(73.5,(home+depth)/2));
  const target=snapped({x:p.side===0?u:105-u,y:shape.y});return {id:p.id,kind:'SHAPE',purpose:'loose-position',target,shape,reason:'松球未参与者恢复本方保护、宽度与下一步接应，不预判争球赢家',phaseSide:null,side:p.side,ball:{...ball},age:0};
 });return {tasks,byPlayer:new Map(tasks.map(t=>[all.find(p=>v416PlayerId(p)===t.id),t])),danger:0,context:'loose-positioning',policy:'v434-neutral-position-until-control'};
}
function v434RearChoiceStage0(e,p){
 e.v434RearChoices??=new Map();if(e.v434RearChoices.has(p))return e.v434RearChoices.get(p);
 const root=e.initialPositions.get(e.actor),target=e.result.requestedTarget||e.target,delta={x:target.x-root.x,y:target.y-root.y},facing=Math.hypot(delta.x,delta.y)>.1?delta:e.actor.lastLogicalFacing||{x:attackDir(e.actor.side),y:0},rear=rearOfCarrier(e.initialPositions.get(p),root,facing);
 const pref=v419Prefs(p),coach=v446Response(p,e),press=clamp(pref.press+(coach.order==='attack'?coach.strength:0),-2,2),probability=rear?clamp(PHASE_CONFIG.rearAttemptMultiplier*preferenceMultiplier(press,DECISION_CONFIG)*roleDecisionFactor(p,'defence'),.02,.75):1,roll=rear?randomFor('身后上抢意愿:'+nameOf(p),e):null;
 const row={coach:{...coach},player:nameOf(p),rear,probability,roll,attemptRequested:!false&&(!rear||roll<probability),facing:{...facing},abilityUsed:false,reason:rear?'身体身后上抢降低意愿；不修改成功率':'正面或侧面保持原上抢规则'};e.v434RearChoices.set(p,row);return row;
}
const v434Tackle=v413TackleChoiceStage4;
function v413TackleChoiceStage5(e,p){const choice=v434Tackle(e,p),rear=v434RearChoice(e,p);if(!rear.rear)return {...choice,rear:false};return {...choice,...rear,eligible:choice.eligible,selected:choice.eligible&&choice.selected&&rear.attemptRequested,attemptRequested:choice.eligible&&rear.attemptRequested,mandatoryDribbleAttempt:false,utility:choice.utility+(rear.attemptRequested?0:-10000)};}
function v434PrepareState(){return state.v434Preparation||null;}
function v434Taker(restart){const available=teams[restart.side].filter(p=>!false),pool=available.length?available:teams[restart.side],out=pool.filter(p=>!isGoalkeeper(p));return (restart.kind==='goal_kick'?pool:out.length?out:pool).slice().sort((a,b)=>restart.kind==='goal_kick'&&isGoalkeeper(a)!==isGoalkeeper(b)?isGoalkeeper(a)?-1:1:(v419Prefs(b).pass-v419Prefs(a).pass)*10+dist(playerPoint(a),restart.point)-dist(playerPoint(b),restart.point))[0];}
function v434OpenPreparation(kind,holder,restart=null){
 const total=PHASE_CONFIG[kind]||0;if(!total)return null;state.preparationHistory??=[];state.v434PreparationSequence=(state.v434PreparationSequence||0)+1;
 const setup=restart?v415SetupRestart(restart,holder):[];if(restart)restart.v434Taker=v416PlayerId(holder);else{state.keeperBallMode='hands';syncControlledBall();}
 v422ClearOldIntent();return state.v434Preparation={session:state.v434PreparationSequence,kind,total,completed:0,holder,side:holder.side,root:{...playerPoint(holder)},ball:{x:state.ball.x,y:state.ball.y,z:state.ballZ||0},restart,setup,normalRound:state.round,normalSlot:state.actionsInRound+1,normalActionsBefore:state.actionHistory.length};
}
function v434BeginPreparation(prep){
 const all=teams.flat(),holder=prep.holder,points=new Map(all.map(p=>[p,{...playerPoint(p)}])),id=v416PlayerId(holder),ball=prep.restart?.point||prep.root;
 const players=all.map(p=>({id:v416PlayerId(p),name:nameOf(p),side:p.side,role:p.role,hx:p.hx,hy:p.hy,...points.get(p),preferences:v419Prefs(p),stunned:false}));
 const plan=assignTeamDuties({players,side:holder.side,ball,fixed:[id],ballHolderId:id,actionType:'preparation',chemistry:v424Chemistry(),orders:state.coachOrders,previous:[],round:state.round,totalRounds:TOTAL_ROUNDS,score:state.score,draws:{}});
 const e={type:'preparation',side:prep.side,actor:holder,start:{...ball},physicalStart:{...prep.ball},target:{...ball},end:{...ball},result:{outcome:'preparation',retentionMode:'stay'},responses:[],initialPositions:points,actionSlot:state.actionsInRound+1,elapsed:0,duration:1.05,releaseTime:1.05,impactTime:1.05,timeline:{config:{wind:0,response:1.05,flight:0,recover:0},windEnd:0,responseEnd:1.05,flightEnd:1.05,total:1.05},trace:{randomDraws:[],tasks:[],movements:[],contests:[],fatigue:[],animations:[],motionSamples:[],positionsBefore:snapshotAllPositions(),ballBefore:snapshotBallState(),v4:{clips:[],branch:{}},confirmedDecisions:{unit:'preparation-round',round:state.round,slot:state.actionsInRound+1,confirmationCount:1,tasks:plan.tasks},timing:{duration:1.05}},motion:{owner:holder,initialCarrier:holder,tracks:new Map(),controlTouches:[]},v434Preparation:{session:prep.session,kind:prep.kind,index:prep.completed+1,total:prep.total,countsAsNormalAction:false}};
 const tasks=new Map(plan.tasks.map(t=>[t.id,t])),actors=[],stationary=[{id,...prep.root}];
 // Each preparation round is one independent joint decision and one ordinary grid allowance.
 for(const p of all){if(p===holder)continue;const pid=v416PlayerId(p),from=points.get(p),intent=tasks.get(pid)||{id:pid,kind:'SHAPE',purpose:'keeper-return',target:{x:p.hx,y:p.hy},shape:{x:p.hx,y:p.hy},reason:'门将返回自己的保护位置'};
  if(prep.restart)intent.restartConstraint={kind:prep.kind,side:prep.side,opponent:p.side!==prep.side,ball:{...ball},minimum:prep.kind==='throw_in'?2:9.15};
  actors.push({id:pid,side:p.side,from,maxSteps:false?0:v45Performance(e,p,'run').maxSteps,intent});}
 e.trace.preparationConfirmed=JSON.parse(JSON.stringify(actors.map(a=>({id:a.id,side:a.side,intent:a.intent,maxSteps:a.maxSteps}))));
 const solved=resolveTurnExecution({actors,stationary,orderOffset:state.round+prep.completed,maxIterations:4});
 for(const m of solved.movements){const p=all.find(p=>v416PlayerId(p)===m.id);p.tx=m.to.x;p.ty=m.to.y;e.trace.movements.push({...m,playerId:m.id,player:nameOf(p),duty:m.intent.kind,ordinaryOffBall:true,turnExecution:true,startTime:0,arrivalTime:e.duration,presentationSpeed:pathLength(m.path)/e.duration});if(m.pathSteps)registerMotion(e,2,p,0,e.duration,'准备回合跑位，不占正常行动槽');}
 for(const p of all){const m=v45Movement(e,p),from=points.get(p),to={...playerPoint(p)};e.motion.tracks.set(p,{from,to,anchor:to,approach:to,moving:!!m?.pathSteps});}
 const rows=solved.movements.map(m=>({id:m.id,player:nameOf(all.find(p=>v416PlayerId(p)===m.id)),side:m.side,...m.intent,confirmedKind:m.intent.kind,from:m.from,target:m.intent.target,to:m.to,pathSteps:m.pathSteps,maxSteps:m.maxSteps,executionBudget:m.maxSteps,decision:m.pathSteps?'move':'hold',executionStatus:m.status}));
 e.trace.teamMovement={context:'preparation-'+prep.kind,decisions:rows,playersEvaluated:all.length,ordinaryMovers:rows.filter(r=>r.pathSteps).length};e.trace.turnExecution=solved;e.trace.positionsPlanned=snapshotAllPositions();e.teamCoaching=validateCoaching(v446Coaching());e.coachContext=v446Slot();state.event=e;state.phase='resolving';updateEventMotion(e);addLog(`${prep.kind==='keeper_hold'?'门将保护持球':RESTART_NAMES[prep.kind]}准备 ${prep.completed+1}/${prep.total}，双方跑位，不计比赛回合。`);
}
const v434Sample=samplePlayerMotionStage15;
function samplePlayerMotionStage16(e,p,time){if(!e.v434Preparation)return v434Sample(e,p,time);const m=v45Movement(e,p),point=m?pathPosition(m.path,time,m.presentationSpeed):e.initialPositions.get(p),moving=!!m?.pathSteps&&time<e.duration,direction=chooseMotionDirection({type:'move',player:point,movement:moving?{from:point,to:m.to}:null,target:e.start,fallback:{x:attackDir(p.side),y:0}});return {point:{...point},pose:p===e.actor&&e.v434Preparation.kind==='keeper_hold'?'hold':moving?quickLoosePose(true,false,isGoalkeeper(p)):'stand',facing:attackDir(p.side),direction,screenDirection:projectWorldDirection(project,point,direction),activeAnimation:moving?2:p===e.actor&&e.v434Preparation.kind==='keeper_hold'?14:null,clip:null};}
const v434UpdateMotion=updateEventMotionStage5;
function updateEventMotionStage6(e){if(!e.v434Preparation)return v434UpdateMotion(e);for(const p of teams.flat()){const s=samplePlayerMotion(e,p,Math.min(e.elapsed,e.duration));p.x=s.point.x;p.y=s.point.y;p.motionPose=s.pose;p.motionSample=s;p.motionFacing=s.facing;p.motionDirection=s.screenDirection;}const prep=v434PrepareState();state.ball.x=prep.ball.x;state.ball.y=prep.ball.y;state.ballZ=prep.ball.z;state.ballHeight=state.ballZ*22*project(state.ball.x,state.ball.y).s;captureMotionSample(e);}
function v434FinishPreparation(e){
 const prep=v434PrepareState(),clock={round:state.round,slot:state.actionsInRound,events:state.actionHistory.length};for(const p of teams.flat()){p.x=p.tx;p.y=p.ty;p.motionPose=null;p.reaction='';}applyEventFatigue(e);prep.completed++;
 const checks={normalClockUnchanged:clock.round===prep.normalRound&&clock.slot+1===prep.normalSlot&&clock.events===prep.normalActionsBefore,uniqueFinalCells:new Set(teams.flat().map(p=>v45CellKey(cellOf(playerPoint(p))))).size===teams.flat().length,withinBudget:e.trace.movements.every(m=>m.pathSteps<=m.maxSteps),holderFixed:dist(playerPoint(prep.holder),prep.root)<.001,noChallenge:!e.responses.length&&!e.trace.contests.length,legalPreparationPositions:!prep.restart||teams.flat().filter(p=>p.side!==prep.side).every(p=>preparationMoveLegal(playerPoint(p),{kind:prep.kind,side:prep.side,opponent:true,ball:prep.restart.point,minimum:prep.kind==='throw_in'?2:9.15}))};
 state.preparationHistory.push({...e.v434Preparation,confirmedIntents:e.trace.preparationConfirmed,teamCoaching:e.teamCoaching,coachResponses:JSON.parse(JSON.stringify(e.coachContext?.responses||{})),coachTuning:JSON.parse(JSON.stringify(v429Tuning())),chemistry:[...v424Chemistry()],round:state.round,actionSlot:e.actionSlot,holder:nameOf(prep.holder),side:prep.side,ball:{...prep.ball},setup:prep.completed===1?prep.setup:[],positionsBefore:e.trace.positionsBefore.map(t=>t.map(p=>({num:p.num,x:p.x,y:p.y}))),positionsAfter:snapshotAllPositions().map(t=>t.map(p=>({num:p.num,x:p.x,y:p.y}))),movements:e.trace.movements.map(m=>({id:m.id,from:m.from,to:m.to,path:m.path,pathSteps:m.pathSteps,maxSteps:m.maxSteps,kind:m.intent.kind,target:m.intent.target})),checks});
 state.event=null;state.phase='autoWait';state.timer=.15;state.nextSide=prep.side;projectRecords.update();
}

const v434Start=startMatchStage6;function startMatchStage7(...args){if(state.phase==='setup'){state.v434Preparation=null;state.preparationHistory=[];state.v434KeeperReady=null;state.v434PreparationSequence=0;}return v434Start(...args);}

const v434HUD=drawHUDStage1;

function v434ReactionRoot(e,p,time){return e.type==='scramble'?{...playerPoint(p)}:v45Movement(e,p)?.turnExecution?{...v45Movement(e,p).to}:v45PointAt(e,p,time);}
function v434Willing(e,p,phase='flight'){
 // A goalkeeper's ordinary save/catch duty is independent from outfield pressing preference.
 // Position, height, penalty-area and ball-route qualification remain in v434Eligible.
 if(e.type==='shoot'&&p.side!==e.side&&isGoalkeeper(p)&&['flight','claim'].includes(phase)){
  e.v434Willing??=new Map();const key=v416PlayerId(p)+':'+phase;
  if(!e.v434Willing.has(key))e.v434Willing.set(key,{player:nameOf(p),side:p.side,phase,probability:1,roll:null,selected:true,abilityUsed:false,source:'goalkeeper-save-duty-not-pressing-preference'});
  return e.v434Willing.get(key);
 }

 if(e.decision?.wholeFlowTerminal&&e.result.aerial&&p===e.actor&&phase==='aerial')return {player:nameOf(p),phase,selected:true,probability:1,roll:null,source:'already-confirmed-whole-flow-participant',abilityUsed:false};
 e.v434Willing??=new Map();const key=v416PlayerId(p)+':'+phase;if(e.v434Willing.has(key))return e.v434Willing.get(key);
 const prefs=v419Prefs(p),keyPref=phase==='loose'?'press':p.side===e.side?'support':'press',coach=v446Response(p,e),n=clamp(prefs[keyPref]+(coach.order==='attack'&&p.side!==e.side?coach.strength:0),-2,2),base=p===e.result.receiver||p===e.actor&&e.type==='scramble'?.98:isGoalkeeper(p)?.94:p.side===e.side&&e.type==='pass'?.32:.72,weight=preferenceMultiplier(n,DECISION_CONFIG),probability=clamp(base*weight,.08,.99),roll=randomFor('邻格参与意愿:'+key,e),patch=e.type==='shoot'&&phase==='flight'&&p.side!==e.side&&!isGoalkeeper(p)?patchDecision(DECISION_CONFIG,'emergencyBlock',p.side,roll):null,row={coach:{...coach},player:nameOf(p),side:p.side,phase,probability:patch?.enabled?patch.probability:probability,roll,selected:!false&&(patch?.enabled?patch.selected:roll<probability),abilityUsed:false,...(patch?.enabled?{behaviourPatch:{...patch,applicable:true,applied:patch.selected}}:{})};e.v434Willing.set(key,row);return row;
}
// A directed pass is not a loose-ball invitation. This gate is shared by route
// sampling, canReachBall and the expanded group contest, so no entry can bypass it.
function v435PassRole(e,p,point,phase='flight'){
 if(e.type!=='pass')return {allowed:true,reason:'other-ball-event'};
 if(p.side!==e.side)return {allowed:true,reason:'opponent-interception'};
 if(['loose','rebound','aerial'].includes(phase))return {allowed:true,reason:'uncontrolled-or-aerial-ball'};
 const receiver=e.result.receiver,landing=e.flightTarget||e.target;
 const destinationReached=!!landing&&v46CellEqual(point,landing);
 const missed=!!(landing&&e.target&&!v46CellEqual(landing,e.target));
 if(p===e.actor)return {allowed:false,reason:'passer-released-ball'};
 if(phase==='flight'){
  if(!receiver)return {allowed:false,reason:'delivery-awaits-landing'};
  if(p!==receiver)return {allowed:false,reason:'teammate-leaves-directed-pass'};
  return {allowed:destinationReached,reason:destinationReached?'receiver-at-destination':'receiver-awaits-destination'};
 }
 if(p===receiver)return {allowed:true,reason:'intended-receiver'};
 return {allowed:missed||!receiver||!!e.result.receiveFailure,reason:missed?'inaccurate-landing-recovery':!receiver?'open-delivery-landing':e.result.receiveFailure?'failed-control-recovery':'teammate-leaves-directed-pass'};
}
function v434Eligible(e,p,point,time,phase='flight',maxHeight=null){
 if(false||e.v434Preparation||p===e.actor&&phase==='flight')return false;
 if((point.z||0)>(maxHeight??(isGoalkeeper(p)?2.2:1.35)))return false;
 if(phase==='flight'&&v423HighMiddle(e,point))return false;
 if(isGoalkeeper(p)&&!inGridPenaltyArea(p.side,point))return false;
 const root=v434ReactionRoot(e,p,time);if(!neighbouringBall(root,point))return false;
 // Interception of an in-flight or arriving pass requires the actual ball
 // to enter the defender's current grid. Loose-ball/aerial contacts are separate.
 if(e.type==='pass'&&p.side!==e.side&&['flight','landing','claim'].includes(phase)&&!v46CellEqual(root,point))return false;
 if(!v435PassRole(e,p,point,phase).allowed)return false;
 return v434Willing(e,p,phase).selected;
}
const v434RouteContact=eventRouteContactStage2;
function eventRouteContactStage3(e,p,options={}){
 if(!['pass','shoot'].includes(e.type)||!e.ballRoute)return v434RouteContact(e,p,options);
 if(e.result.restart?.kind==='penalty'&&!isGoalkeeper(p)&&p.side!==e.side)return null;
 const cross=e.rules?.firstCross,maxT=Math.min(options.maxT??.999,cross?cross.t-1e-6:1),minT=options.minT??.04;let best=null;
 for(const q of e.ballRoute.table){if(q.t<minT||q.t>maxT)continue;const fraction=routeTimeAtT(e.ballRoute,q.t),time=v45Release(e)+e.ballRoute.duration*fraction;if(!v434Eligible(e,p,q,time,'flight',options.maxHeight))continue;const root=v434ReactionRoot(e,p,time),distance=dist(root,q);if(!best||distance<best.distance)best={point:{x:q.x,y:q.y,z:q.z},t:q.t,timeFraction:fraction,distance,root,time};}
 const sameCellInterception=e.type==='pass'&&p.side!==e.side;e.trace.reachability?.push({player:nameOf(p),kind:e.type,eligible:!!best,contactTime:best?.time??null,root:best?.root??null,point:best?.point??null,contactModel:sameCellInterception?'pass-interception-same-cell':'eight-neighbour-no-extra-step',reason:best?(sameCellInterception?'传球实际经过防守者所在格，且高度和意愿允许拦截':'符合接应或邻格参与资格'):(sameCellInterception?'传球未经过所在格、不可触球高度、硬直或不参与':'不可触球高度、硬直、对象或邻格资格不符')});return best;
}
const v434CanReach=canReachBallStage0;
function canReachBallStage1(p,point){const e=state.event;if(!e||!['pass','shoot','scramble'].includes(e.type))return v434CanReach(p,point);const phase=e.result.aerial?'aerial':e.type==='scramble'?'loose':'flight',time=e.ballRoute?v45BallTime(e,point):0;return v434Eligible(e,p,point,time,phase,e.result.aerial?2.7:null);}
const v434Contest=resolveContestStage2;

// Whole-group contacts must apply the actual winner, not only the originally enumerated blocker.


function v434PlanLoose(e){
 state.v47Carryovers=[];const point=e.physicalStart,near=teams.flat().filter(p=>p!==e.actor&&neighbouringBall(e.initialPositions.get(p),point)&&!false&&(!isGoalkeeper(p)||inGridPenaltyArea(p.side,point))&&v434Willing(e,p,'loose').selected),responses=near.map(p=>({player:p,kind:isGoalkeeper(p)?'CLAIM':'SECOND_BALL',target:{...e.start},priority:180}));
 e.trace.looseBallRace={source:'eight-neighbour-direct-contest',selection:teams.flat().map(p=>({player:nameOf(p),side:p.side,initialCellDistance:cellDistance(cellOf(e.initialPositions.get(p)),cellOf(point)),selected:p===e.actor||near.includes(p)})),participants:[],excluded:[],ranking:[],winner:null,maximumTotal:9,maximumPerSide:9};v4Trace(e).actualResponses=responses.map(r=>({player:nameOf(r.player),kind:r.kind,target:r.target}));return responses;
}
const v434PlanResponses=planEventResponsesStage8;function planEventResponsesStage9(e){if(e.type==='scramble')return v434PlanLoose(e);return v434PlanResponses(e);}
const v434PlanMovement=planSimultaneousMovementStage3;function planSimultaneousMovementStage4(e,responses){if(e.type!=='scramble'){const answer=v434PlanMovement(e,responses);if(e.decision?.wholeFlowTerminal&&e.result.aerial){const p=e.actor,from=e.initialPositions.get(p),m=v45Movement(e,p);p.tx=from.x;p.ty=from.y;if(m)Object.assign(m,{from:{...from},to:{...from},path:[{...from}],pathSteps:0,arrivalTime:0});}return answer;}for(const p of new Set([e.actor,...responses.map(r=>r.player)])){const from=e.initialPositions.get(p),perf=v45Performance(e,p,'run'),adj=neighbouringBall(from,e.start),blocked=new Set(teams.flat().filter(q=>q!==p).map(q=>v45CellKey(cellOf(e.initialPositions.get(q))))),routes=adj?null:[...reachableGridPaths(cellOf(from),blocked,perf.maxSteps).values()].sort((a,b)=>dist(cellPoint(a.cell.col,a.cell.row),e.start)-dist(cellPoint(b.cell.col,b.cell.row),e.start)||a.steps-b.steps),grid=routes?.[0]?.path,path=grid?grid.map((c,i)=>i?cellPoint(c.col,c.row):from):[from];const to=path.at(-1);p.tx=to.x;p.ty=to.y;e.trace.movements.push({player:nameOf(p),duty:p===e.actor?'SCRAMBLE':'SECOND_BALL',from:{...from},to:{...to},path,pathSteps:path.length-1,maxSteps:perf.maxSteps,arrivalTime:pathLength(path)/perf.playbackSpeed});}}

// The old loose-race presentation cap is replaced by actual eight-neighbour eligibility.
const v434PrepareMotion=prepareEventMotionStage13;function prepareEventMotionStage14(e){
 v434PrepareMotion(e);
 if(e.type==='scramble'){e.v48ActiveSecondBall=new Set(e.looseArrivals.map(a=>nameOf(a.player)));e.trace.secondBall={selected:[...e.v48ActiveSecondBall],actual:[...e.v48ActiveSecondBall],maximumTotal:9,maximumPerSide:9,neighbourhood:8};}
 const owner=e.gridPickup?.owner||e.motion.owner;if(owner||e.rules?.verdict||['goal','aerial_pending','wide','high'].includes(e.result.outcome)||!['pass','shoot','scramble'].includes(e.type))return;
 // A parry, deflection, inaccurate pass or clearance is another real ball event.
 // Nearby players react from their existing root, without a new running allowance.
 const point={...(e.result.landing||e.end),z:0};if(point.x<0||point.x>105||point.y<0||point.y>68)return;
 const candidates=teams.flat().filter(p=>v434Eligible(e,p,point,e.duration,'rebound'));
 if(!candidates.length)return;e.v434ReactionPhase='rebound';const contest=resolveContest(candidates,point,'CLAIM',e.side,0);e.v434ReactionPhase=null;if(!contest.winner)return;
 const winner=contest.winner;v46FreezeAtPickup(e,{owner:winner,point,time:e.duration,cushion:.08,settleTimes:new Map(),cause:'eight-neighbour-rebound',frozenRoots:new Map()});e.motion.owner=winner;e.result.retentionMode='stay';if(e.type==='scramble'){e.result.winner=winner;e.result.outcome='won';}else if(e.type==='pass'){e.result.outcome=winner.side===e.side?'complete':'intercept';e.result.winner=winner.side===e.side?winner:null;e.result.intercepter=winner.side!==e.side?winner:null;}v422HoldKeeper(e);
}

const v434ContactAnchor=ballContactAnchorStage0;function ballContactAnchorStage1(p,point){const e=state.event;if(e?.initialPositions&&['pass','shoot','scramble'].includes(e.type)){const time=e.ballRoute?v45BallTime(e,point):0,root=v434ReactionRoot(e,p,time);if(neighbouringBall(root,point))return {...root};}return v434ContactAnchor(p,point);}

function v437VisibleOwner(e){
 if(!e)return state.carrier;
 if(e.v437Collection){if(e.elapsed>=e.v437Collection.touchAt)return e.v437Collection.owner;const released=e.ballFlight?e.elapsed>=e.releaseTime:e.elapsed>=e.impactTime;return released?null:e.motion.initialCarrier||state.carrier;}
 if(e.v437Rebound&&e.elapsed>=e.impactTime)return null;
 return e.elapsed>=Math.min(e.impactTime,e.gridPickup?.time??Infinity)?e.motion.owner:state.carrier;
}
// V4.37: one actual active tackle per scoring round; no immobilisation.
function v437CanTackle(p){return !!p&&p.v437TackleRound!==state.round;}

const v437ChoiceBefore=v413TackleChoiceStage5;
function v413TackleChoiceStage6(e,p){const d=v437ChoiceBefore(e,p);if(v437CanTackle(p))return d;return {...d,eligible:false,selected:false,attemptRequested:false,probability:0,utility:-100000,reason:'本计分回合已实际主动抢断一次；仍可跑位、盯人和被动拦截'};}
const v437RearBefore=v434RearChoiceStage0;
function v434RearChoiceStage1(e,p){const c=v437RearBefore(e,p);return v437CanTackle(p)?c:{...c,attemptRequested:false,selected:false,probability:0,reason:'本回合主动抢断额度已用'};}
const v437DoubleBefore=v4DoubleSupportStage0;
function v4DoubleSupportStage1(...args){const c=v437DoubleBefore(...args);return c&&v437CanTackle(c.helper)?c:null;}
const v437ContestBefore=resolveContestStage3;

const v437RecoveryBefore=planControlRecoveryStage3;

const v437ResolveBefore=resolveEventStage3;

// Participation is not foot control. Only use an in-cell approach, never a free grid step.
function v437CollectRoot(p,root,point){
 const cell=cellOf(root),margin=.12,reach=isGoalkeeper(p)?2.2:1.25;
 const goal={x:clamp(point.x-attackDir(p.side)*.75,cell.col*CELL_X+margin,(cell.col+1)*CELL_X-margin),y:clamp(point.y,cell.row*CELL_Y+margin,(cell.row+1)*CELL_Y-margin)};
 return {root:goal,reachable:dist(goal,point)<=reach,distance:dist(goal,point),cell};
}
function v437DropRemoteOwner(e,owner,point,at){
 const r=e.result;e.gridPickup=null;e.motion.owner=null;e.v46OriginalOwner=null;e.motion.recoveryDribble=null;e.v423LooseHold=null;e.v422KeeperHold=null;e.trace.gridControl=null;e.trace.possessionEpoch=null;e.trace.looseControl=null;e.trace.postControl=null;
 r.landing={x:point.x,y:point.y};e.end={...r.landing};if(!e.trace.longPassBlock)e.ballAfter=[];e.v4UncontactedIncoming=null;
 if(e.type==='pass'){r.outcome='loose';r.winner=null;r.intercepter=null;r.receiveFailure=true;}
 if(e.type==='scramble'){r.outcome='loose';r.winner=null;}
 if(e.type==='shoot'){r.caught=false;r.controlled=false;}
 e.v437Uncontrolled={point:{...point,z:0},at};e.duration=Math.max(e.duration,at+.12);e.timeline.total=e.duration;
 e.trace.controlExecution={player:nameOf(owner),point:{...point},actualTouch:false,controlled:false,reason:'邻格参与获胜，但格内可触及范围不足；不吸球、不赠步、不重抽'};
 if(e.rules)e.rules.lastTouch=v415Touch(e.type==='pass'?e.actor:e.result.blocker||owner,e.type);
}
function v437BakeCollection(e,owner,point,at){
 const occupant=teams.flat().find(p=>v46CellEqual(playerPoint(p),point));
 if(occupant&&occupant!==owner){
  owner=occupant;e.motion.owner=owner;e.v46OriginalOwner=owner;if(e.gridPickup){e.gridPickup.owner=owner;e.gridPickup.cause='settled-occupied-cell';}if(e.trace.passReception){Object.assign(e.trace.passReception,{actualReceiver:nameOf(owner),sameTeam:owner.side===e.side,reason:'settled-occupied-cell'});}
  if(e.type==='pass'){e.result.outcome=owner.side===e.side?'complete':'intercept';e.result.winner=owner.side===e.side?owner:null;e.result.intercepter=owner.side!==e.side?owner:null;}
  if(e.type==='scramble'){e.result.winner=owner;e.result.outcome='won';if(e.v423LooseHold)e.v423LooseHold.owner=owner;}
  e.trace.occupiedControlPriority={player:nameOf(owner),point:{...point},reason:'实际球格有人，优先直接控制，不重抽邻格结果'};
  if(e.v422KeeperHold)e.v422KeeperHold=null;
  e.trace.possessionEpoch={fromSide:e.motion.initialCarrier?.side??null,toSide:owner.side,owner:nameOf(owner),controlAt:at,changed:e.motion.initialCarrier?.side!==owner.side,decisionAfterControl:true};
  if(e.trace.teamMovement){e.trace.teamMovement.postContactSide=owner.side;e.trace.teamMovement.postContactBall={...point};}
 }
 const root={...playerPoint(owner)};let collection=v437CollectRoot(owner,root,point),collectionPath=null;
 if(!collection.reachable){
  const m=v45Movement(e,owner),spent=m?.pathSteps||0,remaining=Math.max(0,v45Performance(e,owner,'run').maxSteps-spent),blocked=new Set(teams.flat().filter(p=>p!==owner).map(p=>v45CellKey(cellOf(playerPoint(p)))));
  const path=findGridPath(cellOf(root),cellOf(point),blocked,remaining);
  if(path){collectionPath=path.map((c,i)=>i?cellPoint(c.col,c.row):root);collection=v437CollectRoot(owner,collectionPath.at(-1),point);}
 }
 if(!collection.reachable){v437DropRemoteOwner(e,owner,point,at);return;}
 const shown=e.motion.owner,original=e.v46OriginalOwner;e.motion.owner=null;e.v46OriginalOwner=null;let from;
 try{from={...samplePlayerMotion(e,owner,Math.max(0,at-.0001)).point};}finally{e.motion.owner=shown;e.v46OriginalOwner=original;}
 const target=collection.root;
 // Preserve a legal existing recovery path after a tackle. Its ball already has
 // a touch/drive sequence; this adapter handles receptions, pickups and rebounds.
 const seconds=Math.max(.1,dist(from,target)/12),touchAt=at+seconds,finalBall=v46ControlBall(target,owner.side);
 const c=e.v437Collection={owner,from,to:target,point:{...point,z:0},at,touchAt,finalBall};
 owner.tx=target.x;owner.ty=target.y;let m=v45Movement(e,owner);
 if(collectionPath?.length>1){
  const extra=collectionPath.length-1;
  if(!m){m={player:nameOf(owner),duty:'ACTUAL_COLLECTION',from:{...e.initialPositions.get(owner)},to:target,path:[{...root}],pathSteps:0,maxSteps:v45Performance(e,owner,'run').maxSteps};e.trace.movements.push(m);}
  m.path=[...(m.path||[m.from]),...collectionPath.slice(1)];m.pathSteps=(m.pathSteps||0)+extra;m.collectionSteps=extra;m.collectionUsesOriginalAllowance=true;
 }
 if(m){m.to={...target};if(m.path?.length)m.path[m.path.length-1]={...target};}
 const row=e.trace.teamMovement?.decisions.find(r=>r.player===nameOf(owner));if(row){row.to={...target};row.pathSteps=m?.pathSteps||0;row.collectionSteps=m?.collectionSteps||0;row.actualTouchAt=touchAt;}
 const track=e.motion.tracks.get(owner);if(track)track.to={...target};
 if(e.gridPickup){e.gridPickup.ownerDribble=null;e.gridPickup.finalBall={...finalBall};const roots=e.gridPickup.frozenRoots.get(owner);if(roots){roots.to={...target};}e.gridPickup.cushion=seconds+.12;}
 if(e.v423LooseHold){e.v423LooseHold.root={...target};e.v423LooseHold.time=touchAt;}if(e.v422KeeperHold){e.v422KeeperHold.root={...target};e.v422KeeperHold.time=touchAt;}if(e.trace.keeperHold){e.trace.keeperHold.root={...target};e.trace.keeperHold.time=touchAt;}if(e.trace.looseControl){e.trace.looseControl.root={...target};e.trace.looseControl.time=touchAt;}
 e.motion.recoveryDribble=null;e.motion.bufferRoot={...from};e.motion.bufferBall={...point};e.motion.impactBall={...point};e.duration=Math.max(e.duration,touchAt+.06);e.timeline.total=e.duration;e.motion.bufferEnd=touchAt+.06;
 e.trace.controlExecution={player:nameOf(owner),point:{...point},from,to:{...target},at,touchAt,actualTouch:true,controlled:true,gridStepsGranted:0,rootCellBefore:cellOf(root),rootCellAfter:cellOf(target),collectionSteps:collectionPath?collectionPath.length-1:0,remainingAllowanceRespected:true,ballTravelBeforeTouch:0,maximumCushionDistance:dist(point,finalBall),reason:'球留在实际接触点，球员用原额度靠近后触球；不赠步，触球后短距离缓冲'};
 if(e.trace.gridControl){e.trace.gridControl.controlledAt=touchAt;e.trace.gridControl.controlPoint={...point};}
 if(e.trace.possessionEpoch)e.trace.possessionEpoch.controlAt=touchAt;
}
const v437PrepareBefore=prepareEventMotionStage14;
function prepareEventMotionStage15(e){
 v437PrepareBefore(e);
 // Contact is baked before publication; only executed contacts spend the round cap.
 const at=Math.min(e.impactTime??Infinity,e.contact?.time??Infinity),actual=!!(e.contact&&e.result.contactOccurred)&&!(e.rules?.stop?.at<at-.001);
 e.trace.tackleAllowance={round:state.round,limit:1,unit:'scoring-round; both normal slots shared',attempts:[]};
 if(actual)for(const p of e.v437AttemptPlayers||[e.contact.challenger,e.contact.helper].filter(Boolean)){const used=p.v437TackleRound===state.round;if(!used){p.v437TackleRound=state.round;e.trace.tackleAllowance.attempts.push({player:nameOf(p),side:p.side,round:state.round,actionSlot:e.actionSlot,before:0,after:1});}}
 const t=e.v437TackleResult;e.trace.tackleOutcome=t?{winner:nameOf(t.winner),success:true,roll:t.roll,controlChance:.4,reboundChance:.6,branch:t.branch,point:t.point,contactCell:cellOf(t.point),landing:t.landing||null,directionRoll:t.directionRoll??null,validNeighbours:t.validNeighbours||null}:null;
 if(e.rules?.verdict)return;
 if(t?.branch==='rebound'){
  e.gridPickup=null;e.motion.owner=null;e.v46OriginalOwner=null;e.motion.recoveryDribble=null;e.v423LooseHold=null;e.v422KeeperHold=null;e.trace.gridControl=null;
  const owner=teams.flat().find(p=>v46CellEqual(playerPoint(p),t.landing))||null;
  const route=buildBallRoute({...t.point,z:0},{...t.landing,z:0},{kind:'ground',speed:18});
  e.v437Rebound={route,at:e.impactTime,end:e.impactTime+route.duration,owner};e.ballAfter=[route];e.result.landing={...t.landing};e.end={...t.landing};
  e.duration=Math.max(e.duration,e.v437Rebound.end+.12);e.timeline.total=e.duration;
  e.trace.tackleOutcome.landingOwner=owner?nameOf(owner):null;e.trace.tackleOutcome.loose=!owner;e.trace.tackleOutcome.flightStart=e.impactTime;e.trace.tackleOutcome.flightEnd=e.v437Rebound.end;
  e.trace.possessionEpoch=owner?{fromSide:e.contact.carrier.side,toSide:owner.side,owner:nameOf(owner),controlAt:e.v437Rebound.end,changed:owner.side!==e.contact.carrier.side,decisionAfterControl:true}:null;
  if(owner){e.result.outcome=e.type==='carry'?'tackled':'won';e.result.turnoverPlayer=owner;e.result.winner=owner;e.motion.owner=owner;e.v46OriginalOwner=owner;e.trace.teamMovement.postContactSide=owner.side;e.trace.teamMovement.postContactBall={...t.landing};e.trace.ownershipTaskHistory={cancelledAt:e.v437Rebound.end,oldPhase:e.contact.carrier.side,newPhase:owner.side,decisionDeferredUntilNextActionSlot:true,noSecondAssignment:true};v437BakeCollection(e,owner,t.landing,e.v437Rebound.end);}else e.v437Uncontrolled={point:{...t.landing,z:0},at:e.v437Rebound.end};
  return;
 }
 const owner=e.gridPickup?.owner||e.motion.owner;
 if(owner&&['pass','shoot','scramble'].includes(e.type)&&e.result.outcome!=='aerial_pending'){
  const point=e.gridPickup?.point||e.result.impactPoint||e.result.landing,at=e.gridPickup?.time??e.impactTime;
  if(point)v437BakeCollection(e,owner,point,at);
 }
}
const v437SampleBefore=samplePlayerMotionStage16;
function samplePlayerMotionStage17(e,p,t){const s=v437SampleBefore(e,p,t),c=e.v437Collection;if(c&&p===c.owner&&t>=c.at){s.point=motionLerp(c.from,c.to,motionEase((t-c.at)/(c.touchAt-c.at)));s.pose=t<c.touchAt?'run':quickLoosePose(false,true,isGoalkeeper(p));s.activeAnimation=t<c.touchAt?2:isGoalkeeper(p)?14:4;s.clip=null;}return s;}
const v437CaptureBefore=captureMotionSampleStage2;function captureMotionSampleStage3(e){if(!e.v437Updating)return v437CaptureBefore(e);}
const v437UpdateBefore=updateEventMotionStage6;
function updateEventMotionStage7(e){
 e.v437Updating=true;try{v437UpdateBefore(e);}finally{e.v437Updating=false;}const t=e.elapsed,c=e.v437Collection,b=e.v437Rebound;let ball=null;
 if(b&&t>=b.at)ball=sampleBallRoute(b.route,clamp((t-b.at)/(b.end-b.at),0,1));
 if(e.v437Uncontrolled&&t>=e.v437Uncontrolled.at)ball=e.v437Uncontrolled.point;
 if(c&&t>=c.at)ball=t<c.touchAt?c.point:motionLerp(c.point,c.finalBall,motionEase((t-c.touchAt)/.06));
 if(ball){state.ball.x=ball.x;state.ball.y=ball.y;state.ballZ=ball.z||0;state.ballHeight=ball.z||0;}captureMotionSample(e);
}
const v437ExportBefore=playerExportSnapshotStage3;
function playerExportSnapshotStage4(p){return {...v437ExportBefore(p),spectacleSkills:[...(p.spectacleSkills||[])],stun:{active:false,untilRound:0,reason:null,cell:null},activeTackle:{round:state.round,used:p.v437TackleRound===state.round?1:0,limit:1}};}


const v437CheckBefore=checkCompletedEventStage12;
function checkCompletedEventStage13(e){const c=v437CheckBefore(e),x=e.trace.controlExecution;c.noStunApplied=!(e.trace.stunApplied||[]).length;c.controlRequiresReachableTouch=!x?.controlled||x.maximumCushionDistance<=2.3&&x.remainingAllowanceRespected;c.reboundOneNeighbour=!e.v437Rebound||cellDistance(cellOf(e.contact.point),cellOf(e.result.landing))===1;return c;}
const v437StartBefore=startMatchStage7;function startMatchStage8(...args){if(state.phase==='setup'){state.specialRewardPolicy='enhanced';state.simpleDensity=SCENE_POLICY.normalAdmission;for(const p of teams.flat())p.spectacleSkills??=defaultSceneSkills(p);}for(const p of teams.flat()){delete p.v437TackleRound;p.stunUntilRound=0;p.stunReason=null;}return v437StartBefore(...args);}

// V4.38 execution tuning is read only after the intent was confirmed.
function v438Execution(){return v429Tuning().executionAdjustments||TUNING_DEFAULTS.executionAdjustments;}
const v438TackleBefore=v417ModelStage0;
function v417ModelStage1(carrier,defenders){const m=v438TackleBefore(carrier,defenders),points=v438Execution().tackle[defenders[0]?.side??1-carrier.side],p=shiftProbability(m.defenderWin,points);return {...m,baseDefenderWin:m.defenderWin,defenderWin:p,carrierWin:1-p,tuningPoints:points};}
const v438ShotBefore=v411ShotCalibrationStage1;
function v411ShotCalibrationStage2(e){
 const point=e.result.aerial?.contactPoint||playerPoint(e.actor),opponents=v411Opponents(e.side),nearest=opponents.length?Math.min(...opponents.map(p=>dist(p,point))):100,pressure=clamp((2.5-nearest)/2.5,0,1),mode=e.result.aerial?.mode||'foot',keeper=teams[1-e.side].find(isGoalkeeper),x=v438Execution();
 let ref=calibratedShot(point,e.side,{shooting:5,heading:5,control:5,awareness:5,keeper:5,pressure,mode});
 if(e.result.restart?.kind==='penalty')ref={...ref,mode:'penalty',onTarget:.90,goalGivenOnTarget:.76/.90};
 const attack=diceUpper(e.actor,mode==='header'?'headerShot':'shot'),kr=keeper?diceRating(keeper,'keeper'):5,base=shootingProfile({attack,keeper:kr*EXECUTION_BALANCE.keeper,referenceOnTarget:ref.onTarget,referenceGivenTarget:ref.goalGivenOnTarget,onTargetPoints:x.shotOnTarget[e.side],keeperPoints:x.beatKeeper[e.side]});
 let m=enhanceShot({...ref,...base,ratings:{technique:mode==='header'?e.actor.heading:e.actor.shooting,control:e.actor.control,awareness:e.actor.awareness,keeper:kr},executionTuning:{baseOnTarget:base.diceModel.baseOnTarget,baseBeatKeeper:base.diceModel.baseGivenTarget,onTargetPoints:x.shotOnTarget[e.side],beatKeeperPoints:x.beatKeeper[e.side]}},specialFinish(e,state));
 m.diceModel={...base.diceModel,aimThreshold:attack*(1-m.onTarget),keeperUpper:inverseConditional(attack,attack*(1-m.onTarget),m.goalGivenOnTarget),specialRewardApplied:!!m.specialReward};return m;
}
const v438ScoreBefore=contestScoreStage1;
function contestScoreStage2(p,point,type,side=-1,distanceOverride=null){const score=v438ScoreBefore(p,point,type,side,distanceOverride),e=state.event;const reward=e&&specialFinish(e,state);if(reward&&type==='SHOT_BLOCK'&&p.side===e.side)return score*reward.policy.shotBlockAttackMultiplier;if(reward&&['HEADER','VOLLEY'].includes(type)&&p.side===e.side)return score*reward.policy.headerAttackMultiplier;if(type!=='SAVE'||!e||!isGoalkeeper(p)||e.result.positionShotModel?.diceModel)return score;const points=v438Execution().beatKeeper[e.side];if(!points)return score;const m=e.result.positionShotModel,base=m?.executionTuning?.baseBeatKeeper??.5,adjusted=shiftProbability(base,points);if(adjusted===1)return -1e9;if(adjusted===0)return 1e9;const ratio=((1-adjusted)/adjusted)/((1-base)/Math.max(base,.000001));return score*Math.sqrt(Math.max(.001,ratio));}

// V4.45: scenes are preflighted once; highlight results are immutable before display.
const v453Chains=createRollingChains({get state(){return state;},point:playerPoint,coaching:v446Coaching,tuning:v429Tuning,decisionConfig:()=>DECISION_CONFIG,shotTarget:chooseShotTarget,random:randomFor});
const v445Highlights=createHighlightRuntime({chains:v453Chains,get teams(){return teams;},get state(){return state;},tuning:v429Tuning,mode:()=>state.highlightMode||'normal',point:playerPoint,project,name:nameOf,isKeeper:isGoalkeeper,performance:v45Performance,passRange:maxPassRange,chemistry:v424Chemistry,rules:v415Rules,random:randomFor,log:addLog,touch:v415Touch});
function prepareEventMotionStage16(e){v445Highlights.prepare(e,prepareEventMotionStage15);}
function samplePlayerMotionStage18(e,p,t){
 const motion=e.v445Static?v445Highlights.sample(e,p,t):samplePlayerMotionStage17(e,p,t);
 if(e.v445Static&&e.trace.highlight?.bodyAnimation?.id)return motion;
 const announced=(e.trace.spectacles||[]).find(s=>HIGHLIGHT_BODY_IDS.has(s.id));
 const sceneId=e.trace.highlight?.bodyAnimation?.id||announced?.id;
 if(!HIGHLIGHT_BODY_IDS.has(sceneId))return motion;
 const participants=e.trace.highlight?.selectedId===sceneId?e.trace.highlight?.participants?.map(q=>q.id):announced?.participants;
 const pid=p.side+'-'+p.num;
 const role=sceneId==='C24'&&participants?.includes(pid)?'defender':p===e.actor?'actor':pid===announced?.opponentId?'defender':participants?.includes(pid)?'receiver':null;
 if(!role)return motion;
 const u=Math.max(0,Math.min(1,t/e.duration)),body=sampleHighlightBody(sceneId,role,u);
 if(!['C04','C05','C06','C07'].includes(sceneId))return {...motion,pose:body,activeAnimation:`scene:${sceneId}:${role}`};
 const from=e.initialPositions.get(p)||motion.point,to={x:p.tx,y:p.ty},actorFrom=e.initialPositions.get(e.actor)||e.start,actorTo={x:e.actor.tx,y:e.actor.ty};
 const point=technicalPlayerPoint(sceneId,role,u,from,to,{actorFrom,actorTo,attackDirection:e.side?-1:1});
 const direction=sceneId==='C04'&&role==='actor'?spinDirection(sceneId,u,{x:actorTo.x-actorFrom.x,y:actorTo.y-actorFrom.y}):sceneId==='C07'&&u<.39?{x:e.side?-1:1,y:0}:motion.direction;
 return {...motion,point,pose:body,direction,screenDirection:projectWorldDirection(project,point,direction||{x:1,y:0}),activeAnimation:`scene:${sceneId}:${role}`};
}
function updateEventMotionStage8(e){
 if(e.v445Static)return v445Highlights.update(e);
 updateEventMotionStage7(e);
 const sceneId=(e.trace.spectacles||[]).find(s=>['C04','C05','C06','C07'].includes(s.id))?.id;
 if(!sceneId||e.type!=='carry')return;
 const u=Math.max(0,Math.min(1,e.elapsed/e.duration)),from=e.physicalStart||e.start,end=e.result.landing,actor=playerPoint(e.actor);
 const q=technicalBallPoint(sceneId,u,from,end,actor,e.initialPositions.get(e.actor)||e.start,{x:e.actor.tx,y:e.actor.ty},e.side?-1:1);
 Object.assign(state.ball,{x:q.x,y:q.y});state.ballZ=q.z||0;state.ballHeight=state.ballZ*22*project(q.x,q.y).s;
}
function checkCompletedEventStage14(e){return e.v445Static?v445Highlights.checks(e):checkCompletedEventStage13(e);}
function v445AerialChoice(pending){
 if(pending.mode!=='header'||!v429Tuning().highlights?.enabled)return null;const point=pending.contactPoint,actor=pending.receiver,dir=attackDir(actor.side),flags=v415Rules().aerialOffside?.players||[];
 const options=teams[actor.side].filter(p=>p!==actor&&!isGoalkeeper(p)&&dist(playerPoint(p),point)>=7&&dist(playerPoint(p),point)<=21&&allowsAttackingPass(actor.side,point,playerPoint(p))&&dir*(playerPoint(p).x-point.x)>=-7&&!flags.some(q=>q.num===p.num&&q.offside)).sort((a,b)=>shotLocation(playerPoint(b),actor.side).baseGoal-shotLocation(playerPoint(a),actor.side).baseGoal);
 if(!options.length||!neighbouringBall(playerPoint(actor),point)||dist(playerPoint(actor),point)>6||point.z<1.35||point.z>2.7)return null;const prefs=v419Prefs(actor),probability=clamp(.18+(prefs.pass||0)*.05-(prefs.shoot||0)*.04,.05,.4),roll=randomFor('空中意图：头球摆渡或攻门');if(roll>=probability)return null;const receiver=options[0];return {side:actor.side,actor,type:'pass',target:playerPoint(receiver),result:{receiver,mode:'feet',loft:true,aerialMode:'header',headerLayoff:true,aerial:pending,receiveSpot:playerPoint(receiver)},description:nameOf(actor)+'选择头球摆渡',decision:{type:'aerial-layoff',reason:'已到空中接触阶段，按传球与射门偏好选择摆渡，队友具备合法接应位置',probability,roll,abilitiesAffectChoice:false,passTargetPolicy:'shared-box-backpass-policy',sourceEventId:pending.sourceEventId}};
}
function v445SetMode(mode){if(!['normal','high'].includes(mode))throw Error('精彩概率档位无效');state.highlightMode=mode;state.highlightModeChanges??=[];state.highlightModeChanges.push({mode,round:state.round,slot:state.actionsInRound+1,effective:'next action; baked event unchanged'});projectRecords.update();return mode;}
function v445DrawHighlight(){
 if(platform.headless)return;const banner=document.getElementById('match-announcement');if(!banner)return;
 const scenes=state.event?.trace?.spectacles||[],titles=scenes.map(s=>(s.id.startsWith('S')?'必杀':s.side===state.event.side?'精彩进攻':'精彩防守')+' · '+s.name),detail=scenes.map(s=>(s.participantNames||[]).join('、')+'：'+s.scope).join(' ｜ ');
 const title=banner.querySelector('[data-scene-title]'),sub=banner.querySelector('[data-scene-detail]');
 const text=titles.join('　／　')||'观看比赛';if(title.textContent!==text)title.textContent=text;
 const body=detail||'精彩发生时在这里提示，球场保持完整可见';if(sub.textContent!==body)sub.textContent=body;
 banner.dataset.active=String(!!scenes.length);banner.dataset.sceneIds=scenes.map(s=>s.id).join(',');
}

if(!platform.headless)requestAnimationFrame(loop);

 const game={v453Select:v419Select,v453SyncConfiguration:()=>{if(state.roleTuning)applyDecisionTuning(state.roleTuning);},vNextBudget:(e,p)=>v45Performance(e,p).maxSteps,vNextScene:actor=>{const scene=v419Scene(actor);return {...scene,players:scene.players.map(p=>({...p,...snapped(p)}))};},vNextCandidates:scene=>v453Chains.candidates(scene),vNextStep:(scene,chain,stage)=>v453Chains.step(scene,chain,stage),vNextBegin:spec=>beginEvent(spec),v453ChainStats:()=>v453Chains.summary(),state,teams,benches,buildMatchRecord,startMatch,chooseAutoAction,advanceRound,finishEvent,updateEventMotion,resumeSecondHalf,applyFormation,v416SelectRounds,restartSavedMatch,setPossession,v415Rules,v434Eligible,v416PlayerId,playerPoint,v437CanTackle,v437CollectRoot,v429QueueTuning,v429Tuning,v424Chemistry,v424QueueChemistry,v446Coaching,v446QueueCoaching,v446Response,v446Responses,projectRecords,samplePlayerMotion,render,update,v445SetMode,DECISION_CONFIG,TUNING_DEFAULTS};
 const v453Routines=createRoutineRuntime({game,createGame,platform,random:randomFor,log:addLog});
 game.routineSummary=v453Routines.summary;return game;
}

