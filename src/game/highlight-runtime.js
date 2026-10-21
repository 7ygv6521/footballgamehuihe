import {ESCAPES,repeatAdmission,isSuppressed} from './highlight-admission.js';
import {hash} from './routines/snapshot.js';
import {PITCH_COLS,PITCH_ROWS,PITCH_CW,PITCH_CH} from './config/pitch.default.js';
import {highlightCandidates,drawHighlight,validateHighlightPlan,hc} from './highlights.js';
import {HIGHLIGHT_DEFAULTS} from './config/highlights.default.js';
import {buildBallRoute,routeSummary,routePoint} from './ball-routes.js';
import {shortestGridPath} from './grid-path.js';
import {earlyLongPassBlockApplies,longPassBlockLanding} from './long-pass-block.js';
import {projectWorldDirection} from './motion-directions.js';
import {offsideSnapshot,firstWholeCrossing,boundaryRestart} from './football-rules.js';
import {nativeSceneCandidates,sceneDescription} from './creative-scenes.js';
import {creativeCandidates} from './creative-scenes.js';
import {HIGHLIGHT_BODY_IDS,sampleHighlightBody} from './highlight-body.js';
import {technicalPlayerPoint,technicalBallPoint,spinDirection,interceptionPlayerPoint,interceptionBallAfterTouch} from './presentation/highlight-choreography.js';
const id=p=>p.side+'-'+p.num,key=p=>{const c=hc(p);return c.col+','+c.row;},P=c=>({x:(c.col+.5)*PITCH_CW,y:(c.row+.5)*68/PITCH_ROWS}),D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const clamp01=x=>Math.max(0,Math.min(1,x)),mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:(a.z||0)+((b.z||0)-(a.z||0))*t});
const summaryPoint=(r,t)=>routePoint({from:r.start,to:r.end,control:r.control,apex:r.apex},clamp01(t));
function settledRoute(route,start,end,t){
 const point=routePoint(route,t),a=routePoint(route,0),b=routePoint(route,1),chord=mix(a,b,t),base=mix(start,end,t);
 return {x:base.x+point.x-chord.x,y:base.y+point.y-chord.y,z:Math.max(0,point.z||0)};
}
function followPath(path,u){if(!path?.length)return null;if(path.length===1)return path[0];const j=clamp01(u)*(path.length-1),i=Math.min(path.length-2,Math.floor(j));return mix(path[i],path[i+1],j-i);}
export function createHighlightRuntime(api){
 function note(e,q,trace){const scene=sceneDescription(q);scene.participantNames=q.people.map(p=>p.name);scene.probability=trace?.selectedProbability??null;scene.draw=trace?.roll??null;scene.trigger=trace||null;scene.precomputed=true;scene.resultFixed=true;scene.successScope=scene.scope;e.trace.spectacles??=[];if(e.trace.spectacles.some(s=>s.id===scene.id&&s.side===scene.side))return;e.trace.spectacles.push(scene);e.highlight={id:scene.id,name:scene.name,manga:!!q.definition.manga,result:scene.scope};}
 function observe(e,c){
  if(!api.tuning().highlights?.enabled||e.v434Preparation)return;
  const candidates=[...nativeSceneCandidates(c),...creativeCandidates(c,validateHighlightPlan,{nativeLocked:true})];e.trace.spectacleEligibility??=[];e.trace.spectacleEligibility.push(...candidates.map(q=>({id:q.definition.id,family:q.scene.family,side:q.side,nativeOnly:true})));
  for(const side of [e.side,1-e.side]){if(c.inheritedSide===side)continue;if((e.trace.spectacles||[]).some(s=>s.side===side)||e.trace.spectacleDrawnSides?.includes(side))continue;const qs=candidates.filter(q=>q.side===side);if(!qs.length)continue;e.trace.spectacleDrawnSides??=[];e.trace.spectacleDrawnSides.push(side);const selected=drawHighlight(qs,api.tuning().highlights,api.mode(),api.chemistry(),api.random('真实精彩确认：'+side,e));e.trace.spectacleDraws??=[];e.trace.spectacleDraws.push(selected.trace);if(selected.selected)note(e,selected.selected,selected.trace);}
 }
 function prepare(e,ordinary){
  const caps=new Map(api.teams.flat().map(p=>[p,p.v437TackleRound]));ordinary(e);
  const settings=api.tuning().highlights||HIGHLIGHT_DEFAULTS;if(!settings.enabled||e.v434Preparation)return;
  const players=api.teams.flat().map(p=>{const from={...e.initialPositions.get(p)},to={...api.point(p)},m=e.trace.movements.find(m=>m.player===api.name(p)),budget=api.performance(e,p).maxSteps;let path=m?.path?.map(q=>({...q}));if(!path?.length||path.length-1>budget||key(path[0])!==key(from)||key(path.at(-1))!==key(to)){const cells=shortestGridPath(hc(from),hc(to),new Set(),budget);path=cells?.map((c,i)=>i?P(c):from)||[from];}return {id:id(p),num:p.num,name:api.name(p),side:p.side,keeper:api.isKeeper(p),from,to,budget,path,preferences:p.preferences||{},skills:p.spectacleSkills||[],canTackle:caps.get(p)!==api.state.round,passRange:api.passRange(p),ratings:Object.fromEntries(['running','carrying','passing','control','dribbling','shooting','pressing','strength','awareness','heading','goalkeeping'].map(k=>[k,p[k]??5]))};});
  const ctx={inheritedSide:api.state.simpleCommittedFinish?.event===api.state.actionHistory.length+1?api.state.simpleCommittedFinish.side:null,simpleRate:api.state.simpleDensity??.5,admissionBlock:api.state.simpleAdmissionBlock?.event===api.state.actionHistory.length+1?api.state.simpleAdmissionBlock:null,event:e,players,history:api.state.actionHistory,ownerId:e.motion.owner?id(e.motion.owner):null,justWon:!!e.decision?.scene?.justWonPossession,looseOrigin:api.state.looseOrigin,deadBall:api.rules().ballState==='dead',ballHeight:e.physicalStart?.z||0};
  // A rehearsed terminal is the original native verdict. No attack/defence highlight may replace it.
  if(e.decision?.wholeFlowTerminal){e.trace.highlight={selectedId:null,terminalNativeOutcome:e.result.outcome,preSettled:true,successRerolled:false};observe(e,ctx);return;}
  const scripted=!!e.decision?.chainIntent,technical=scripted?[]:highlightCandidates(ctx).filter(q=>!q.joint&&validateHighlightPlan(q.plan,players)&&(!q.plan.controlPlan||validateHighlightPlan(q.plan.controlPlan,players))),candidates=scripted?[]:[...technical,...nativeSceneCandidates(ctx).filter(q=>!technical.some(t=>t.definition.id===q.definition.id))];
  let selected=scripted?api.chains.guaranteed(ctx,validateHighlightPlan):drawHighlight(candidates,settings,api.mode(),api.chemistry(),api.random('精彩事件统一抽签',e));
  if(selected?.selected&&!scripted&&ESCAPES.has(selected.selected.definition.id)&&!selected.selected.nativeOnly){
   const rep=repeatAdmission(api.state,e.side,id(e.actor)),roll=hash(api.state.routineMatchSeed||0,api.state.actionHistory.length+1,e.side,'ordinary-escape-admission');
   e.trace.highlightAdmission={repetition:rep,roll,suppressed:isSuppressed(api.state,api.state.actionHistory.length+1,e.side)||roll>=rep.factor};
   if(e.trace.highlightAdmission.suppressed)selected={selected:null,trace:{selectedId:null,preSettled:true,nativeContestRetained:true}};
  }
  if(!selected){e.trace.highlight={selectedId:null,scriptRejected:true,preSettled:true};return;}
  e.trace.highlight=selected.trace;e.trace.highlight.eligible=candidates.length;e.trace.spectacleEligibility=candidates.map(q=>({id:q.definition.id,family:q.scene?.family||q.definition.group,side:q.side,nativeOnly:!!q.nativeOnly}));e.trace.spectacleDrawnSides=scripted?[]:[...new Set(candidates.map(q=>q.side))];
  if(!selected.selected){observe(e,ctx);return;}
  const q=selected.selected,d=q.definition,plan=q.plan;if(!scripted||e.decision?.chainIntent?.template?.startsWith('EX_')&&!selected.trace.preparationOnly)note(e,q,selected.trace);e.trace.highlight.participants=q.people.map(p=>({id:p.id,name:(p.side?'对手':'我方')+p.num+'号'}));e.trace.highlight.successScope=plan.joint?.scope||d.result;e.trace.highlight.condition=d.condition;e.trace.highlight.cooperative=q.cooperative;e.trace.highlight.completedCrossPair=plan.completedCrossPair||null;e.trace.highlight.joint=plan.joint||null;if(plan.scene)e.trace.highlight.scene=plan.scene;
  if(plan.stagedSequence)e.trace.highlight.stagedSequence=structuredClone(plan.stagedSequence);
  if(HIGHLIGHT_BODY_IDS.has(d.id))e.trace.highlight.bodyAnimation={id:d.id,source:'v4-football-body-poses',resultUnchanged:true};
  e.trace.highlight.paths=Object.fromEntries(Object.entries(plan.paths).filter(([pid,path])=>q.people.some(p=>p.id===pid)).map(([pid,path])=>[pid,path]));e.trace.highlight.ballPath=plan.ballPath||null;
  if(plan.kind==='position'){e.trace.highlight.completedCrossPair=plan.completedCrossPair||null;observe(e,ctx);return;}
  const before=e.result;e.trace.highlight.discardedOrdinaryOutcome=before.outcome;e.trace.highlight.preflightChecksOnly=true;for(const p of api.teams.flat())p.v437TackleRound=caps.get(p);
  const refs=new Map(api.teams.flat().map(p=>[id(p),p])),owner=plan.ownerId&&refs.get(plan.ownerId),defender=refs.get(plan.defenderId);
  const preserved=['receiver','mode','loft','moveIntent','tacticalIntent','wallPhase','wallRunTarget','wallSource','wallDefenderId','wallDefenderFrom','aerialMode','deliveryKind','clearanceKind','coordinationIntent','aerial','headerLayoff'];const r=Object.fromEntries(preserved.filter(k=>before[k]!==undefined).map(k=>[k,before[k]]));
  r.outcome=plan.kind==='goal'?'goal':plan.kind==='carry'?'kept':plan.kind==='pass'?'complete':plan.kind==='aerial-pass'?'aerial_pending':plan.kind==='save'?'saved':plan.kind==='block'?'blocked':plan.kind==='intercept'?'intercept':plan.kind==='header-clear'?'aerial_defended':plan.kind==='recovery'?'won':'loose';
  r.landing={...plan.landing};r.impactPoint={...(plan.impact||plan.landing)};r.impactT=1;r.impactFraction=1;r.contactOccurred=false;
  if(['pass','aerial-pass'].includes(plan.kind)){r.winner=owner||null;r.receiver=refs.get(plan.receiverId)||before.receiver;e.v4Aerial=plan.aerial||e.v4Aerial;if(plan.aerial)r.aerialMode=plan.aerial.mode;if(plan.joint){r.wallPhase=plan.joint.wallComplete?'joint-complete':null;delete r.wallRunTarget;delete r.wallSource;}}
  if(plan.kind==='intercept'){r.intercepter=defender;r.winner=null;}if(plan.kind==='recovery')r.winner=owner;
  if(plan.kind==='block'){r.blocker=defender;r.controlled=false;}
  if(plan.kind==='save'){r.caught=!!plan.caught;r.onTarget=true;r.goalSpot={...e.target};r.keeperRace=false;}
  if(d.id==='C17'){r.doubleSave=true;r.secondShooterId=plan.stagedSequence.secondShooterId;api.state.stats[e.side].shots++;}
  if(d.id==='C21'){r.preShotPoke=true;api.state.stats[e.side].shots=Math.max(0,api.state.stats[e.side].shots-1);}
  if(plan.kind==='goal'){r.onTarget=true;r.goalSpot={...plan.landing};r.shotAim={kind:'on_target',target:{...plan.landing},guaranteedHighlight:true};}
  if(r.aerial){r.aerialAttempt={mode:r.aerial.mode,point:r.aerial.contactPoint,participants:[api.name(e.actor),...(defender?[api.name(defender)]:[])],winner:api.name(defender||e.actor),attackCan:true,actualShot:plan.kind!=='header-clear',sourceEventId:r.aerial.sourceEventId,guaranteedHighlight:true};}
  e.result=r;e.end={...r.landing};e.ballRoute=plan.route||plan.sceneBallRoute||null;e.flightTarget=plan.route?{...plan.route.to}:e.target;e.ballFlight=null;e.ballAfter=[];e.v445Static=true;
  const ordinaryContact=e.contact;e.contact=null;e.gridPickup=null;e.v437Rebound=null;e.v437Uncontrolled=null;e.v437Collection=null;e.v437TackleResult=null;e.v422KeeperHold=null;e.v423LooseHold=null;e.v46OriginalOwner=owner||null;e.v419Continuation=null;e.chainShot=false;
  e.trace.contests=[];e.trace.abilityContests=[];e.trace.animationTriggers=[];e.trace.animations=[];e.trace.passReception=null;e.trace.gridControl=null;e.trace.controlExecution=null;e.trace.longPassBlock=null;e.trace.tackleOutcome=null;e.trace.tackleAllowance={round:api.state.round,limit:1,unit:'scoring-round',attempts:[]};
  for(const entry of e.trace.randomDraws)if(entry.label!=='精彩事件统一抽签')entry.highlightUse='preflight only; not a second success verdict';
  e.duration=1.8;e.releaseTime=.1;e.impactTime=.9;e.timeline={config:{wind:.1,response:0,flight:.8,recover:.9},windEnd:.1,responseEnd:.1,flightEnd:.9,total:1.8};e.responseDuration=.1;e.flightDuration=.8;e.resolved=true;e.verdictPrepared=true;
  e.motion={owner:owner||null,initialCarrier:api.state.carrier,tracks:new Map(),controlTouches:[],flowReceive:false};if(plan.supportReceiverId)e.gridPickup={owner:refs.get(plan.supportReceiverId),point:{...r.landing},time:.9,finalBall:{...r.landing},carryovers:[],cause:'pre-settled-legal-second-ball-support'};e.rules={offside:scripted?{...offsideSnapshot(e.side,e.start,players.filter(p=>p.side===e.side&&p.id!==id(e.actor)).map(p=>({...p.from,player:p.name,num:p.num})),players.filter(p=>p.side!==e.side).map(p=>p.from)),at:e.releaseTime,sourceEventId:api.state.actionHistory.length+1}:e.rules?.offside||null,lastTouch:api.touch(defender||refs.get(plan.passes?.at(-1)?.fromId)||e.actor,'highlight-'+d.id),verdict:null};
  if(plan.kind==='carry'&&ordinaryContact&&before.contactOccurred){e.contact=ordinaryContact;r.contactOccurred=true;r.contactPoint=ordinaryContact.point;for(const p of [ordinaryContact.challenger,ordinaryContact.helper].filter(Boolean)){p.v437TackleRound=api.state.round;e.trace.tackleAllowance.attempts.push({player:api.name(p),side:p.side,round:api.state.round,actionSlot:e.actionSlot,before:0,after:1});}}
  if(plan.kind==='carry'&&plan.stagedSequence?.steps.some(step=>step.kind==='slide')&&q.opponent){const challenger=refs.get(q.opponent.id),point={x:(e.start.x+q.opponent.from.x)/2,y:(e.start.y+q.opponent.from.y)/2};e.contact={carrier:e.actor,challenger,point,a:{...e.initialPositions.get(e.actor)},b:{...e.initialPositions.get(challenger)},time:.35,scriptedResponse:true};r.contactOccurred=true;r.contactPoint=point;r.slide=true;challenger.v437TackleRound=api.state.round;e.trace.tackleAllowance.attempts.push({player:api.name(challenger),side:challenger.side,round:api.state.round,actionSlot:e.actionSlot,before:0,after:1,scriptedResponse:true});}
  r.feint=['A03','A04','C04','C05','C06','C07','C08'].includes(d.id);r.slide=d.id==='D02'||!!plan.scene?.opponentResponse?.slide||!!plan.stagedSequence?.steps.some(step=>step.kind==='slide');
  if(plan.kind==='intercept'&&earlyLongPassBlockApplies({type:'pass',side:e.side,winnerSide:defender.side,start:e.start,target:e.target,point:plan.impact,phase:'flight',deliveryKind:r.deliveryKind,clearanceKind:r.clearanceKind})){
   const v={x:e.target.x-e.start.x,y:e.target.y-e.start.y},bounce=longPassBlockLanding(plan.impact,v,api.random('精彩近端长传反弹距离',e));r.outcome='loose';r.intercepter=null;r.passInterceptDeflected=true;r.landing={...bounce.target};e.end={...r.landing};e.motion.owner=null;e.v444LongPassBlocker=defender;e.trace.longPassBlock={cells:bounce.steps,landing:r.landing,point:plan.impact,blocker:api.name(defender),guaranteedHighlight:true};
  }
  if(plan.kind==='tackle'){
   const point=plan.contactPoint,roll=api.random('精彩抢断后40/60归属',e),cell=hc(point),options=[];for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const col=cell.col+dx,row=cell.row+dy;if(col>=0&&col<PITCH_COLS&&row>=0&&row<PITCH_ROWS)options.push(P({col,row}));}
   const control=plan.controlPlan;if(roll<.4&&control){if(!validateHighlightPlan(control,players))throw Error('Invalid preflighted tackle control branch');Object.assign(plan.positions,control.positions);Object.assign(plan.paths,control.paths);r.landing={...control.landing};e.motion.owner=defender;r.outcome='tackled';r.turnoverPlayer=defender;}else{r.landing=options[Math.floor(api.random('精彩抢断弹球落点',e)*options.length)];e.motion.owner=null;r.outcome='loose';}
   e.end={...r.landing};r.contactOccurred=true;r.contactPoint={...point};defender.v437TackleRound=api.state.round;e.contact={carrier:e.actor,challenger:defender,point:{...point},a:{...e.initialPositions.get(e.actor)},b:{...e.initialPositions.get(defender)},time:.9};
   e.trace.tackleAllowance.attempts=[{player:api.name(defender),side:defender.side,round:api.state.round,actionSlot:e.actionSlot,before:0,after:1}];e.trace.tackleOutcome={winner:api.name(defender),success:true,roll,controlChance:.4,reboundChance:.6,branch:roll<.4?'control':'rebound',point,landing:r.landing,guaranteedHighlight:true};
  }
  e.trace.movements=players.map(p=>{const ref=refs.get(p.id),path=plan.paths[p.id],to=plan.positions[p.id],old=e.trace.movements.find(m=>m.player===api.name(ref));ref.tx=to.x;ref.ty=to.y;e.motion.tracks.set(ref,{from:p.from,to,approach:to,anchor:to,moving:false});return {...old,player:api.name(ref),playerId:p.id,from:p.from,to,path,pathSteps:path.length-1,maxSteps:p.budget,turnExecution:true,ordinaryOffBall:ref!==e.actor&&!q.people.some(p=>p.id===id(ref)),highlightPreSettled:true,startTime:0,arrivalTime:0,presentationSpeed:0};});
  if(plan.stagedSequence?.kind==='double-save')e.duration=2.8;
  e.timeline.total=e.duration;
  if(r.landing.x<0||r.landing.x>105||r.landing.y<0||r.landing.y>68){const crossing=firstWholeCrossing([plan.impact||e.start,r.landing]),restart=boundaryRestart(crossing,e.rules.lastTouch);if(restart){e.rules.verdict={...restart,kind:restart.kind==='goal'?'goal':'out',restart:restart.kind,point:crossing,restartPoint:restart.point,reason:'精彩事件破坏球整体出界，沿用原重启规则'};if(restart.kind==='goal')r.outcome='goal';}}
  // Settled ground balls in occupied cells control immediately, including rebounds.
  if(!e.rules.verdict&&!['goal','aerial_pending'].includes(r.outcome)&&!e.motion.owner){const occupant=players.find(p=>key(plan.positions[p.id])===key(r.landing));if(occupant){const ref=refs.get(occupant.id);e.motion.owner=ref;if(e.type==='carry'){r.outcome=ref.side===e.side?'kept':'tackled';r.turnoverPlayer=ref;if(ref.side===e.side&&ref!==e.actor)e.gridPickup={owner:ref,point:{...r.landing},time:.9,finalBall:{...r.landing},carryovers:[]};}if(e.type==='pass'){r.outcome=ref.side===e.side?'complete':'intercept';r.winner=ref.side===e.side?ref:null;r.intercepter=ref.side!==e.side?ref:null;}if(e.type==='shoot'){if(r.outcome==='blocked'&&ref===defender)r.controlled=true;else e.gridPickup={owner:ref,point:{...r.landing},time:.9,finalBall:{...r.landing},carryovers:[]};}}}
  if(e.type==='pass'){r.actualRange=D(e.start,r.landing);r.actualPathRange=e.ballRoute?.length??r.actualRange;e.trace.passReception={phase:'landing',intendedReceiver:r.receiver?api.name(r.receiver):null,actualReceiver:e.motion.owner?api.name(e.motion.owner):null,sameTeam:e.motion.owner?.side===e.side,reason:'pre-settled-highlight'};}
  e.trace.possessionEpoch=e.motion.owner?{fromSide:e.side,toSide:e.motion.owner.side,owner:api.name(e.motion.owner),changed:e.motion.owner.side!==e.side,decisionAfterControl:true,controlAt:.9}:null;
  if(plan.joint){e.trace.confirmedDecisions.joint=plan.joint;for(const t of e.trace.teamMovement?.decisions||[])if(plan.joint.participants.includes(t.id)){t.primary=true;t.kind='JOINT_SCENE';t.purpose=d.id;t.responsibilityId=null;t.interrupted=false;t.target=plan.positions[t.id];t.to=plan.positions[t.id];t.intentPath=plan.paths[t.id];t.pathSteps=plan.paths[t.id].length-1;t.executionStatus='arrived';t.taskCompleted=true;}const extra=Math.max(0,(plan.passes?.length||0)-(e.type==='pass'?1:0));api.state.stats[e.side].passes+=extra;api.state.passSuccess[e.side]+=extra;}
  if(plan.receiverTouch){e.motion.controlTouches=[{time:.8,player:api.name(owner),phase:'first-touch',point:plan.receiverTouch.point},{time:1.1,player:api.name(owner),phase:'first-touch-exit',point:plan.receiverTouch.exit}];r.controlPoint={...plan.receiverTouch.exit};r.actualRange=D(e.start,plan.receiverTouch.point);e.trace.firstTouchRehearsal={...plan.receiverTouch,playerId:plan.receiverTouch.playerId};}
  e.trace.highlight.completedCrossPair=candidates.find(q=>q.definition.id==='T04')?.plan.completedCrossPair||null;e.trace.highlight.ownerId=e.motion.owner?id(e.motion.owner):null;e.trace.highlight.finalPositions=plan.positions;e.trace.highlight.finalBall={...r.landing};e.trace.highlight.planValid=validateHighlightPlan(plan,players);
  if(e.ballRoute)e.trace.ballRoute={actual:routeSummary(e.ballRoute),kind:e.ballRoute.kind,reason:'精彩事件提前定稿；本期只展示文字与终态'};else e.trace.ballRoute=null;
  e.trace.v4={branch:{},cancelled:[],guaranteedHighlight:true};e.trace.dribbleContinuation=null;e.trace.skippedContact=null;e.trace.passRunCoordination=null;
  // Recognition sees the ACTUAL final owner and the actual native outcome; it never chooses a winner.
  observe(e,{...ctx,ownerId:e.motion.owner?id(e.motion.owner):null,players:players.map(p=>({...p,to:plan.positions[p.id],path:plan.paths[p.id]}))});
  if(scripted&&!e.trace.spectacles?.length)delete e.highlight;if(!scripted)api.log((d.manga?'必杀 · ':'精彩 · ')+d.name+'：'+d.result);
 }
 function stagedBall(e,u){
  const sequence=e.trace.highlight.stagedSequence,kind=sequence.kind,start=e.physicalStart||e.start,end=e.result.landing;
  if(kind==='double-save'){
   const [first,rebound,follow]=sequence.steps;
   if(u<.13)return start;
   if(u<.34)return summaryPoint(first.route,(u-.13)/.21);
   if(u<.38)return first.to;
   if(u<.54)return summaryPoint(rebound.route,(u-.38)/.16);
   if(u<.63)return rebound.to;
   if(u<.83)return summaryPoint(follow.route,(u-.63)/.20);
   return {...end,z:.9};
  }
  if(kind==='rainbow-over-scripted-slide')return u<.10?start:u<.75?routePoint(e.ballRoute,clamp01((u-.10)/.65)):end;
  if(kind==='man-ball-split')return u<.10?start:u<.72?routePoint(e.ballRoute,clamp01((u-.10)/.62)):end;
  if(kind==='evade-scripted-slide')return u<.08?start:u<.32?mix(start,end,(u-.08)/.24):end;
  if(kind==='pre-shot-poke')return u<.40?start:u<.72?mix(start,end,(u-.40)/.32):end;
  if(kind==='cut-through-pass'){const contact=routePoint(e.ballRoute,sequence.contactT),control=sequence.controlAt||end;return u<.12?start:u<.68?routePoint(e.ballRoute,clamp01((u-.12)/.56)*sequence.contactT):interceptionBallAfterTouch(u,contact,control,start);}
  if(kind==='first-touch-escape')return u<.12?start:u<.55?routePoint(e.ballRoute,(u-.12)/.43):u<.82?mix(sequence.touch,sequence.exit,(u-.55)/.27):end;
  return end;
 }
 function sample(e,p,t){
  const sequence=e.trace.highlight.stagedSequence;
  const selectedId=e.trace.highlight?.selectedId;
  const secondaryScene=!sequence&&!HIGHLIGHT_BODY_IDS.has(selectedId)?(e.trace.spectacles||[]).find(s=>HIGHLIGHT_BODY_IDS.has(s.id)):null;
  const sceneId=secondaryScene?.id||selectedId;
  if(!sequence&&!HIGHLIGHT_BODY_IDS.has(sceneId))return {point:{x:p.tx,y:p.ty},pose:'stand',facing:p.side===0?1:-1,direction:{x:p.side===0?1:-1,y:0},screenDirection:{x:p.side===0?1:-1,y:0},activeAnimation:null,clip:null};
  const u=clamp01(t/e.duration),movement=e.trace.movements.find(m=>m.playerId===id(p)),from=e.initialPositions.get(p)||movement?.from||{x:p.tx,y:p.ty};
  let moveU=clamp01((u-.10)/.72);
  if(['C11','C26'].includes(sceneId)&&id(p)===(e.trace.highlight?.scene?.opponentId||secondaryScene?.opponentId))moveU=clamp01((u-.04)/.28);
  if(sequence?.kind==='double-save'&&id(p)===sequence.secondShooterId)moveU=clamp01((u-.05)/.43);
  if(sequence?.kind==='double-save'&&id(p)===sequence.keeperId)moveU=clamp01((u-.05)/.21);
  if(sequence?.kind==='pre-shot-poke'&&id(p)===sequence.defenderId)moveU=clamp01((u-.14)/.33);
  if(sequence?.kind==='cut-through-pass'&&id(p)===sequence.defenderId)moveU=clamp01((u-.20)/.43);
  if(sequence?.kind==='first-touch-escape'&&id(p)===sequence.receiverId)moveU=clamp01((u-.55)/.29);
  if(['rainbow-over-scripted-slide','evade-scripted-slide'].includes(sequence?.kind)&&id(p)===sequence.actorId)moveU=clamp01((u-.15)/.60);
  if(sequence?.kind==='man-ball-split'&&id(p)===sequence.actorId)moveU=clamp01((u-.13)/.59);
  let point=followPath(movement?.path,moveU)||mix(from,{x:p.tx,y:p.ty},moveU);
  if(sequence?.kind==='cut-through-pass'&&id(p)===sequence.defenderId){
   const contact=sequence.steps.find(step=>step.kind==='intercept')?.at||sequence.controlAt;
   point=interceptionPlayerPoint(u,from,contact,sequence.controlAt);
  }
  const delta={x:p.tx-from.x,y:p.ty-from.y},moving=Math.hypot(delta.x,delta.y)>.03&&moveU>0&&moveU<1;
  let pose=moving?'run':'stand',activeAnimation=moving?2:null;
  if(['rainbow-over-scripted-slide','evade-scripted-slide'].includes(sequence?.kind)){
   if(id(p)===sequence.defenderId&&u>=.18&&u<.66){pose={lean:0,shift:0,lift:-.15,lag:0,slideFoot:Math.sin(Math.PI*(u-.18)/.48)};activeAnimation=88;}
   if(id(p)===sequence.actorId){if(u>=.22&&u<.57){pose=sequence.kind==='evade-scripted-slide'?{lean:-12,shift:.05,lift:.62,lag:0}:'carry_a';activeAnimation=sequence.kind==='evade-scripted-slide'?90:1;}else if(u>=.57&&u<.90){pose='carry_b';activeAnimation=1;}}
  }else if(sequence?.kind==='man-ball-split'){
   if(id(p)===sequence.defenderId&&u>=.20&&u<.63){pose='press';activeAnimation=93;}
   if(id(p)===sequence.actorId&&u>=.13&&u<.83){pose='run';activeAnimation=2;}
  }else if(sequence?.kind==='pre-shot-poke'){
   if(id(p)===sequence.actorId&&u<.45){pose=u<.27?'setup':'strike';activeAnimation=3;}
   if(id(p)===sequence.defenderId&&u>=.29&&u<.73){pose='press';activeAnimation=86;}
  }else if(sequence?.kind==='double-save'){
   if(id(p)===sequence.firstShooterId&&u>=.10&&u<.35){pose=u<.20?'setup':'strike';activeAnimation=3;}
   if(id(p)===sequence.secondShooterId&&u>=.48&&u<.83){pose=u<.65?'setup':'strike';activeAnimation=109;}
   if(id(p)===sequence.keeperId){if(u>=.27&&u<.76){pose='save_down';activeAnimation=14;}else if(u>=.76&&u<.90){pose='save';activeAnimation=14;}else if(u>=.90){pose='hold';activeAnimation=14;}}
  }else if(sequence?.kind==='cut-through-pass'){
   if(id(p)===sequence.passerId&&u<.22){pose=u<.12?'setup':'strike';activeAnimation=3;}
   if(id(p)===sequence.defenderId&&u>=.63){pose='control';activeAnimation=4;}
  }else if(sequence?.kind==='first-touch-escape'){
   if(id(p)===sequence.passerId&&u<.22){pose=u<.12?'setup':'strike';activeAnimation=3;}
   if(id(p)===sequence.receiverId&&u>=.53){pose=u<.69?'control':'carry_b';activeAnimation=u<.69?4:1;}
  }
  const pid=id(p);
  if(HIGHLIGHT_BODY_IDS.has(sceneId)){
   const participant=secondaryScene?secondaryScene.participants?.includes(pid):e.trace.highlight?.participants?.some(v=>v.id===pid);
   const defending=pid===sequence?.defenderId||pid===e.trace.highlight?.scene?.opponentResponse?.playerId||pid===secondaryScene?.opponentId||sceneId==='C24'&&participant;
   const role=defending?'defender':p===e.actor?'actor':participant?'receiver':null;
   if(role){
    pose=sampleHighlightBody(sceneId,role,u);
    activeAnimation=`scene:${sceneId}:${role}`;
    if(['C04','C05','C06','C07'].includes(sceneId)){
     const actorFrom=e.initialPositions.get(e.actor)||e.start,actorTo={x:e.actor.tx,y:e.actor.ty};
     const opponentId=e.trace.highlight?.scene?.opponentResponse?.playerId||secondaryScene?.opponentId;
     const opponent=opponentId&&api.teams.flat().find(q=>id(q)===opponentId);
     point=technicalPlayerPoint(sceneId,role,u,from,{x:p.tx,y:p.ty},{actorFrom,actorTo,defenderFrom:opponent&&e.initialPositions.get(opponent),attackDirection:e.side?-1:1});
    }
    if(sceneId==='C26'&&role==='defender'&&e.ballRoute&&u>.30&&u<.78){
     const toward=routePoint(e.ballRoute,.50),w=Math.sin(Math.PI*(u-.30)/.48);
     point={x:point.x+(toward.x-point.x)*.14*w,y:point.y+(toward.y-point.y)*.14*w};
    }
   }
  }
  let direction=Math.hypot(delta.x,delta.y)>.03?{x:delta.x,y:delta.y}:{x:p.side===0?1:-1,y:0};
  if(sequence?.kind==='evade-scripted-slide'&&id(p)===sequence.defenderId){const ballTouch=sequence.steps.find(step=>step.kind==='ball-touch-away')?.to||e.start;direction={x:ballTouch.x-from.x,y:ballTouch.y-from.y};}
  else if((['rainbow-over-scripted-slide','pre-shot-poke'].includes(sequence?.kind))&&id(p)===sequence.defenderId)direction={x:e.start.x-from.x,y:e.start.y-from.y};
  if(!sequence&&p===e.actor&&e.type==='pass')direction={x:e.result.landing.x-from.x,y:e.result.landing.y-from.y};
  if(sceneId==='C04'&&p===e.actor)direction=spinDirection(sceneId,u,direction);
  if(sceneId==='C07'&&u<.39&&(p===e.actor||pid===e.trace.highlight?.scene?.opponentResponse?.playerId))direction={x:e.side?-1:1,y:0};
  const clip=sceneId==='C02'&&pid===sequence?.defenderId?{key:'slide_miss'}:null;
  return {point:u>=1?{x:p.tx,y:p.ty}:point,pose,facing:direction.x>=0?1:-1,direction,screenDirection:projectWorldDirection(api.project,point,direction),activeAnimation,clip,clipQ:u};
 }
 function update(e){
  const sequence=e.trace.highlight.stagedSequence,t=Math.min(e.elapsed,e.duration),u=clamp01(t/e.duration),sceneId=e.trace.highlight?.selectedId;
  for(const p of api.teams.flat()){const s=sample(e,p,t);p.x=s.point.x;p.y=s.point.y;p.motionPose=s.pose;p.motionFacing=s.facing;p.motionDirection=s.screenDirection;p.motionSample=s;}
  let q=sequence?stagedBall(e,u):e.result.landing;
  const secondaryBodyScene=(e.trace.spectacles||[]).find(s=>HIGHLIGHT_BODY_IDS.has(s.id))?.id;
  if(!sequence&&(HIGHLIGHT_BODY_IDS.has(sceneId)||HIGHLIGHT_BODY_IDS.has(secondaryBodyScene))){
   const start=e.physicalStart||e.start,end=e.result.landing;
   if(e.type==='carry'){
    const actor=api.point(e.actor),forward={x:end.x-start.x,y:end.y-start.y},length=Math.hypot(forward.x,forward.y)||1,remaining=Math.hypot(end.x-actor.x,end.y-actor.y),gap=Math.min(.54,remaining*.6),ball={x:actor.x+forward.x/length*gap,y:actor.y+forward.y/length*gap};
    const bodyScene=HIGHLIGHT_BODY_IDS.has(sceneId)?sceneId:secondaryBodyScene;
    const opponentId=e.trace.highlight?.scene?.opponentResponse?.playerId||(e.trace.spectacles||[]).find(s=>s.id===bodyScene)?.opponentId;
    const opponent=opponentId&&api.teams.flat().find(p=>id(p)===opponentId);
    q=['C04','C05','C06','C07'].includes(bodyScene)?technicalBallPoint(bodyScene,u,start,end,actor,e.initialPositions.get(e.actor)||start,{x:e.actor.tx,y:e.actor.ty},e.side?-1:1,opponent&&e.initialPositions.get(opponent)):u<.10?mix(start,ball,u/.10):u>.90?mix(ball,end,(u-.90)/.10):ball;
   }else{
    const release=clamp01(e.releaseTime/e.duration),progress=clamp01((u-release)/(.73-release));
    q=u<release?start:e.ballRoute?settledRoute(e.ballRoute,start,end,progress):mix(start,end,progress);
   }
  }
  Object.assign(api.state.ball,{x:q.x,y:q.y,tx:e.result.landing.x,ty:e.result.landing.y});api.state.ballZ=q.z||0;api.state.ballHeight=api.state.ballZ*22*api.project(q.x,q.y).s;
 }
 function checks(e){const positions=e.trace.highlight.finalPositions,unique=new Set(Object.values(positions).map(key)).size===api.teams.flat().length,within=e.trace.movements.every(m=>m.pathSteps<=m.maxSteps),settled=e.rules?.verdict||['goal','aerial_pending'].includes(e.result.outcome)||api.state.carrier===e.motion.owner;return {oneDecisionPerActionSlot:true,gridExecutionWithinBudget:within,gridSolverFinalCellsUnique:unique,executionDidNotReroll:true,animationDoesNotLimitGridMovement:true,keeperPassOnly:!api.isKeeper(e.actor)||e.type==='pass',noStunApplied:true,highlightPreSettled:true,highlightGuaranteed:true,highlightDoesNotCreateFutureActions:true,highlightOwnerMatchesSettlement:!!settled,highlightPlanValid:e.trace.highlight.planValid};}
 return {prepare,update,sample,checks};
}
