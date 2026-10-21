import {prepareFootballFigure,drawFootballFigure} from '../presentation/figure.js';
import {controlledBallVisual} from '../presentation/recorded-event.js';

export function createRenderer(runtime){
function drawMotionFigureStage0(player,s,r,poseName,facing) {
 const raw=poseName&&typeof poseName==='object'?poseName:runtime.MOTION_POSES[poseName]||runtime.MOTION_POSES.stand;
 const d=player.motionDirection||{x:facing||runtime.attackDir(player.side),y:0};
 const figure=prepareFootballFigure(s,r,raw,d,{slide:!!raw.slideFoot,q:player.motionSample?.clipQ||0});
 const a=figure.anchors;
 let dx=0,dy=0;const e=runtime.state.event,clip=player.motionSample?.clip,q=player.motionSample?.clipQ||0;
 const weight=Math.sin(Math.PI*runtime.clamp(q/.9,0,1));
 if(clip&&['slide_win','slide_loose'].includes(clip.key)&&e?.contact){
  const target=runtime.project(e.contact.point.x,e.contact.point.y),br=8*target.s;
  dx=(target.x-d.x*br*.8-a.footToe.x)*weight;dy=(target.y-6-d.y*br*.8-a.footToe.y)*weight;
 }
 if(clip&&['header_attack','header_defend'].includes(clip.key)&&e?.result.aerial){
  const v=e.result.aerial.contactPoint,t=runtime.project(v.x,v.y);dx=(t.x-a.head.x)*weight;dy=(t.y-6-v.z*22*t.s-a.head.y)*weight;
 }
 drawFootballFigure(runtime.ctx,{radius:r,figure,side:player.side,num:player.num,goalkeeper:runtime.isGoalkeeper(player),offset:{x:dx,y:dy},numberFont:13*s.s});
}

function drawActionAnimations() {
  const event=runtime.state.phase==='resolving'?runtime.state.event:null;
  if (!event) return;
  if((event.trace?.highlight?.selectedId==='C11'||event.trace?.spectacles?.some(s=>s.id==='C11'))&&event.ballRoute?.table?.length){
    const route=event.ballRoute.table,progress=runtime.clamp((event.elapsed-event.releaseTime)/Math.max(.01,event.impactTime-event.releaseTime),0,1),count=Math.max(1,Math.floor(progress*(route.length-1)));
    if(count>1){runtime.ctx.save();const a=runtime.project(route[0].x,route[0].y),b=runtime.project(route.at(-1).x,route.at(-1).y);runtime.ctx.strokeStyle='#ff79797d';runtime.ctx.lineWidth=2;runtime.ctx.setLineDash([5,6]);runtime.ctx.beginPath();runtime.ctx.moveTo(a.x,a.y);runtime.ctx.lineTo(b.x,b.y);runtime.ctx.stroke();runtime.ctx.strokeStyle='#ffed9bd9';runtime.ctx.lineWidth=3;runtime.ctx.setLineDash([]);runtime.ctx.beginPath();for(let i=0;i<=count;i++){const q=route[i],s=runtime.project(q.x,q.y);if(i)runtime.ctx.lineTo(s.x,s.y-(q.z||0)*22*s.s);else runtime.ctx.moveTo(s.x,s.y-(q.z||0)*22*s.s);}runtime.ctx.stroke();runtime.ctx.restore();}
  }
  if (event.result.outcome==='goal' && event.elapsed>=event.impactTime) {
    const s=runtime.project(event.end.x,event.end.y),q=runtime.clamp((event.elapsed-event.impactTime)/event.timeline.config.recover,0,1);
    runtime.ctx.save();runtime.ctx.globalAlpha=Math.sin(q*Math.PI)*0.75;runtime.ctx.strokeStyle='#ffd54f';runtime.ctx.lineWidth=3;
    runtime.ctx.beginPath();runtime.ctx.ellipse(s.x,s.y,18+q*45,9+q*20,0,0,Math.PI*2);runtime.ctx.stroke();runtime.ctx.restore();
  }
}

function drawPitch() {
  for (let i = 0; i < 12; i++) {
    const a = runtime.project(runtime.FIELD_L * i / 12, 0);
    const b = runtime.project(runtime.FIELD_L * (i + 1) / 12, 0);
    const c = runtime.project(runtime.FIELD_L * (i + 1) / 12, runtime.FIELD_W);
    const d = runtime.project(runtime.FIELD_L * i / 12, runtime.FIELD_W);
    runtime.ctx.fillStyle = i % 2 ? '#2f7d32' : '#378c3a';
    runtime.ctx.beginPath(); runtime.ctx.moveTo(a.x, a.y); runtime.ctx.lineTo(b.x, b.y); runtime.ctx.lineTo(c.x, c.y); runtime.ctx.lineTo(d.x, d.y); runtime.ctx.fill();
  }
  runtime.ctx.strokeStyle = 'rgba(255,255,255,0.84)';
  runtime.ctx.lineWidth = 3;
  poly([runtime.project(0, 0), runtime.project(runtime.FIELD_L, 0), runtime.project(runtime.FIELD_L, runtime.FIELD_W), runtime.project(0, runtime.FIELD_W)]);
  poly([runtime.project(runtime.FIELD_L / 2, 0), runtime.project(runtime.FIELD_L / 2, runtime.FIELD_W)], false);
  for (const side of [0,1]) {
    const box=runtime.gridPenaltyBox(side), goalX=side===0?box.xMin:box.xMax, frontX=side===0?box.xMax:box.xMin;
    poly([runtime.project(goalX,box.yMin),runtime.project(frontX,box.yMin),runtime.project(frontX,box.yMax),runtime.project(goalX,box.yMax)],false);
  }
  for (const side of [0,1]) {
    const box=runtime.gridGoalArea(side),goalLine=side===0?box.xMin:box.xMax,front=side===0?box.xMax:box.xMin;
    poly([runtime.project(goalLine,box.yMin),runtime.project(front,box.yMin),runtime.project(front,box.yMax),runtime.project(goalLine,box.yMax)],false);
    const dot=runtime.penaltySpot(side),screen=runtime.project(dot.x,dot.y);runtime.ctx.fillStyle='#fff';runtime.ctx.beginPath();runtime.ctx.ellipse(screen.x,screen.y,3.2*screen.s,2.2*screen.s,0,0,Math.PI*2);runtime.ctx.fill();
  }
  const circle = [];
  for (let i = 0; i <= 36; i++) {
    const a = i / 36 * Math.PI * 2;
    circle.push(runtime.project(52.5 + Math.cos(a) * 9.15, 34 + Math.sin(a) * 9.15));
  }
  poly(circle);
  drawGoal(0);
  drawGoal(runtime.FIELD_L);
  drawGrid();
  drawFocusLane();
  drawIntentLines();
  drawBallTrail();
  drawLandingReticle();
}

function drawFocusLane() {
  if (!['setup', 'tactics', 'halftime'].includes(runtime.state.phase)) return;
  const [y0, y1] = runtime.laneRange(0, runtime.state.focusLane[0]);
  const corners = [runtime.project(0, y0), runtime.project(runtime.FIELD_L, y0), runtime.project(runtime.FIELD_L, y1), runtime.project(0, y1)];
  runtime.ctx.save();
  runtime.ctx.fillStyle = 'rgba(30,111,255,0.14)';
  runtime.ctx.strokeStyle = 'rgba(120,170,255,0.55)';
  runtime.ctx.setLineDash([14, 10]);
  runtime.ctx.lineWidth = 2;
  runtime.ctx.beginPath();
  corners.forEach((p, i) => i ? runtime.ctx.lineTo(p.x, p.y) : runtime.ctx.moveTo(p.x, p.y));
  runtime.ctx.closePath();
  runtime.ctx.fill();
  runtime.ctx.stroke();
  runtime.ctx.restore();
}

function drawBallTrail() {
  const event = runtime.state.phase === 'resolving' ? runtime.state.event : null;
  if (!event) return;
  if(event.ballFlight){
    runtime.ctx.save();
    if(event.elapsed<event.impactTime){
      const cells=event.trace.ballRoute.actual.cells;
      for(const cell of cells){const x0=cell.col*runtime.CELL_X,y0=cell.row*runtime.CELL_Y;
        const points=[runtime.project(x0,y0),runtime.project(x0+runtime.CELL_X,y0),runtime.project(x0+runtime.CELL_X,y0+runtime.CELL_Y),runtime.project(x0,y0+runtime.CELL_Y)];
        runtime.ctx.fillStyle='rgba(255,213,79,0.045)';runtime.ctx.beginPath();points.forEach((p,i)=>i?runtime.ctx.lineTo(p.x,p.y):runtime.ctx.moveTo(p.x,p.y));runtime.ctx.closePath();runtime.ctx.fill();
      }
    }
    const drawPath=(route,until=1,solid=false)=>{
      runtime.ctx.beginPath();for(let i=0;i<=80;i++){const b=runtime.routePoint(route,until*i/80),p=runtime.project(b.x,b.y),y=p.y-6-b.z*22*p.s;if(i)runtime.ctx.lineTo(p.x,y);else runtime.ctx.moveTo(p.x,y);}
      runtime.ctx.setLineDash(solid?[]:[10,8]);runtime.ctx.stroke();
    };
    runtime.ctx.strokeStyle=event.type==='shoot'?'rgba(255,213,79,.40)':'rgba(255,255,255,.35)';runtime.ctx.lineWidth=2;
    if(event.elapsed<event.impactTime)drawPath(event.ballRoute);
    else for(const leg of event.ballAfter)drawPath(leg);
    if(event.elapsed>=event.releaseTime){runtime.ctx.strokeStyle=event.type==='shoot'?'rgba(255,213,79,.85)':'rgba(255,255,255,.75)';runtime.ctx.lineWidth=3;drawPath(event.ballRoute,event.ballFlight.progress,true);}
    runtime.ctx.restore();return;
  }
  if (event.target && event.type !== 'tackle') {
    const a = runtime.project(event.start.x, event.start.y);
    const b = runtime.project(event.target.x, event.target.y);
    runtime.ctx.save();
    runtime.ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    runtime.ctx.lineWidth = 2;
    runtime.ctx.setLineDash([8, 8]);
    runtime.ctx.beginPath(); runtime.ctx.moveTo(a.x, a.y); runtime.ctx.lineTo(b.x, b.y); runtime.ctx.stroke();
    runtime.ctx.restore();
  }
}

function drawLandingReticle() {
  const event = runtime.state.phase === 'resolving' ? runtime.state.event : null;
  if (!event?.ballFlight) return;
  const progress = runtime.clamp((event.elapsed-event.releaseTime)/event.flightDuration,0,1);
  const target = event.elapsed < event.impactTime ? event.flightTarget : event.result.landing || event.ballFlight.end;
  const p = runtime.project(target.x, target.y);
  const reticle = event.ballFlight.reticle || { from: 30, to: 6 };
  const radius = (reticle.from + (reticle.to - reticle.from) * progress) * p.s;
  const isShot = event.type === 'shoot';
  runtime.ctx.save();
  runtime.ctx.strokeStyle = isShot ? 'rgba(255,213,79,0.9)' : 'rgba(150,215,255,0.85)';
  runtime.ctx.lineWidth = 2.5;
  runtime.ctx.globalAlpha = 0.45 + progress * 0.55;
  runtime.ctx.beginPath();
  runtime.ctx.ellipse(p.x, p.y, radius, radius * 0.45, 0, 0, Math.PI * 2);
  runtime.ctx.stroke();
  if(event.type==='pass'&&event.trace.ballRoute.targetMissed&&event.elapsed<event.impactTime){
    const intended=runtime.project(event.target.x,event.target.y);runtime.ctx.globalAlpha=.35;runtime.ctx.strokeStyle='#fff';runtime.ctx.setLineDash([4,5]);runtime.ctx.beginPath();runtime.ctx.ellipse(intended.x,intended.y,15*intended.s,7*intended.s,0,0,Math.PI*2);runtime.ctx.stroke();runtime.ctx.setLineDash([]);
  }
  // 内圈在接近落点时变得更亮，形成"锁定"感
  runtime.ctx.globalAlpha = progress;
  runtime.ctx.strokeStyle = isShot ? '#ffd54f' : '#96d7ff';
  runtime.ctx.lineWidth = 2;
  runtime.ctx.beginPath();
  runtime.ctx.ellipse(p.x, p.y, radius * 0.5, radius * 0.22, 0, 0, Math.PI * 2);
  runtime.ctx.stroke();
  runtime.ctx.restore();
}

function drawIntentLines() {
  const event = runtime.state.phase === 'resolving' ? runtime.state.event : null;
  if (!event || event.responsesComplete) return;
  const progress = runtime.clamp(event.elapsed / Math.max(0.01, event.responseDuration), 0, 1);
  runtime.ctx.save();
  runtime.ctx.lineWidth = 1.8;
  runtime.ctx.setLineDash([6, 6]);
  for (const response of event.responses) {
    const from = runtime.project(response.player.x, response.player.y);
    const to = runtime.project(response.player.anim?.to.x ?? response.player.tx, response.player.anim?.to.y ?? response.player.ty);
    const moved = Math.hypot(from.x - to.x, from.y - to.y);
    if (moved < 6) continue;
    runtime.ctx.globalAlpha = 0.20 + progress * 0.25;
    runtime.ctx.strokeStyle = response.player.side === 0 ? '#8fc0ff' : '#ffb0ab';
    runtime.ctx.beginPath(); runtime.ctx.moveTo(from.x, from.y); runtime.ctx.lineTo(to.x, to.y); runtime.ctx.stroke();
  }
  runtime.ctx.restore();
}

function drawGrid() {
  runtime.ctx.save();
  runtime.ctx.strokeStyle = 'rgba(239,248,255,0.23)';
  runtime.ctx.lineWidth = 1.25;
  for (let col = 1; col < runtime.GRID_COLS; col++) {
    poly([runtime.project(col * runtime.CELL_X, 0), runtime.project(col * runtime.CELL_X, runtime.FIELD_W)], false);
  }
  for (let row = 1; row < runtime.GRID_ROWS; row++) {
    poly([runtime.project(0, row * runtime.CELL_Y), runtime.project(runtime.FIELD_L, row * runtime.CELL_Y)], false);
  }
  runtime.ctx.restore();
}

function drawCellOutline(point, color) {
  const cell = runtime.cellOf(point);
  const x0 = cell.col * runtime.CELL_X;
  const x1 = (cell.col + 1) * runtime.CELL_X;
  const y0 = cell.row * runtime.CELL_Y;
  const y1 = (cell.row + 1) * runtime.CELL_Y;
  const corners = [runtime.project(x0, y0), runtime.project(x1, y0), runtime.project(x1, y1), runtime.project(x0, y1)];
  runtime.ctx.save();
  runtime.ctx.fillStyle = 'rgba(255,213,79,0.12)';
  runtime.ctx.strokeStyle = color;
  runtime.ctx.lineWidth = 3;
  runtime.ctx.beginPath();
  corners.forEach((p, i) => i ? runtime.ctx.lineTo(p.x, p.y) : runtime.ctx.moveTo(p.x, p.y));
  runtime.ctx.closePath();
  runtime.ctx.fill();
  runtime.ctx.stroke();
  runtime.ctx.restore();
}

function drawGoal(x) {
  const a = runtime.project(x, 30.34);
  const b = runtime.project(x, 37.66);
  runtime.ctx.strokeStyle = '#fff'; runtime.ctx.lineWidth = 4;
  runtime.ctx.beginPath(); runtime.ctx.moveTo(a.x, a.y); runtime.ctx.lineTo(a.x, a.y - 2.44*22*a.s); runtime.ctx.lineTo(b.x, b.y - 2.44*22*b.s); runtime.ctx.lineTo(b.x, b.y); runtime.ctx.stroke();
}

function poly(points, close = true) {
  runtime.ctx.beginPath();
  points.forEach((p, i) => i ? runtime.ctx.lineTo(p.x, p.y) : runtime.ctx.moveTo(p.x, p.y));
  if (close) runtime.ctx.closePath();
  runtime.ctx.stroke();
}

function drawPlayers() {
  drawCellOutline({ x: runtime.state.ball.x, y: runtime.state.ball.y }, runtime.state.carrier ? '#ffd54f' : '#fff');
  const all = runtime.teams[0].concat(runtime.teams[1]).sort((a, b) => a.y - b.y);
  const reactionLabels = [];
  const reactionText = { AERIAL_DEFEND:'抢点防守', AERIAL_ATTACK:'争顶', DOUBLE_PRESS:'夹抢', WALL_RUN:'传后前插', PROTECT:'护球', RECEIVE: '接应', SUPPORT: '接应', SUPPORT_WIDE: '拉边', FORWARD_RUN: '前插', SECOND_BALL: '争二点', REBOUND_READY:'跟进', SHAPE:'保持阵型', REGROUP:'回防', KEEPER_RETURN:'回位', APPROACH_BALL:'靠近球', INTERCEPT: '拦截', MARK: '盯防', CHALLENGE: '上抢', PRESS: '逼抢', BLOCK: '封堵', SAVE: '扑救', CLAIM: '出击', COME_OUT: '出击', BEAT: '变向突破', CUT_LANE: '封线', COVER: '补位' };
  for (const p of all) {
    // 正在播放独立动画的球员由动画层接管，避免同一个球员被画两次
    // One renderer owns each athlete; poses never draw a second copy.
    const s = runtime.project(p.x, p.y);
    const r = 14 * s.s;
    const shirtY = s.y - r * 3;
    runtime.ctx.fillStyle = 'rgba(0,0,0,0.35)';
    runtime.ctx.beginPath(); runtime.ctx.ellipse(s.x, s.y, r, r * 0.4, 0, 0, Math.PI * 2); runtime.ctx.fill();
    if (p === runtime.state.draggingPlayer) {
      runtime.ctx.strokeStyle = '#ffd54f'; runtime.ctx.lineWidth = 5;
      runtime.ctx.beginPath(); runtime.ctx.ellipse(s.x, s.y, r * 1.8, r * 0.82, 0, 0, Math.PI * 2); runtime.ctx.stroke();
    }
    const visibleOwner = runtime.v437VisibleOwner(runtime.state.phase==='resolving'?runtime.state.event:null);
    if (p === visibleOwner) {
      runtime.ctx.strokeStyle = '#fff'; runtime.ctx.lineWidth = 2;
      runtime.ctx.beginPath(); runtime.ctx.ellipse(s.x, s.y, r * 1.25, r * 0.54, 0, 0, Math.PI * 2); runtime.ctx.stroke();
    }
    const event = runtime.state.phase === 'resolving' ? runtime.state.event : null;
    const winning = runtime.state.score[p.side] - runtime.state.score[1-p.side];
    const globalPose = runtime.state.phase === 'end' ? (winning>0?'celebrate':winning<0?'lose':'draw')
      : p.currentStamina<=45?'fatigue':runtime.state.phase==='setup'?'stand':'observe';
    runtime.drawMotionFigure(p,s,r,event?p.motionPose:globalPose,event?p.motionFacing:runtime.attackDir(p.side));
    if (p.reaction && !p.reaction.startsWith('主动·')) {
      const label = reactionText[p.reaction] || p.reaction;
      runtime.ctx.font = `bold ${Math.round(13 * s.s)}px Inter`;
      const labelWidth = runtime.ctx.measureText(label).width + 14;
      const labelHeight = 21;
      let labelY = shirtY - 27;
      const overlaps = (y) => reactionLabels.some((box) =>
        s.x + labelWidth / 2 > box.left && s.x - labelWidth / 2 < box.right
        && y + labelHeight > box.top && y < box.bottom
      );
      let attempts = 0;
      while (overlaps(labelY) && attempts < 8) { labelY -= labelHeight + 3; attempts++; }
      reactionLabels.push({ left: s.x - labelWidth / 2, right: s.x + labelWidth / 2, top: labelY, bottom: labelY + labelHeight });
      runtime.ctx.fillStyle = 'rgba(8,15,28,0.88)';
      roundRect(s.x - labelWidth / 2, labelY, labelWidth, labelHeight, 7); runtime.ctx.fill();
      runtime.ctx.strokeStyle = p.side === 0 ? '#ffe082' : '#ffaaa4'; runtime.ctx.lineWidth = 1.5; runtime.ctx.stroke();
      runtime.ctx.fillStyle = p.side === 0 ? '#fff2a8' : '#ffd3cf';
      runtime.ctx.textAlign = 'center';
      runtime.ctx.fillText(label, s.x, labelY + 15);
    }
  }
  const currentEvent=runtime.state.phase==='resolving'?runtime.state.event:null;
  const lastRecord=runtime.state.actionHistory?.at(-1);
  const cutInterception=currentEvent?.trace?.highlight?.selectedId==='C24'||
    !currentEvent&&lastRecord?.highlight?.selectedId==='C24';
  const owner=cutInterception?(currentEvent?.motion?.owner||runtime.state.carrier):null;
  const progress=currentEvent?runtime.clamp((currentEvent.elapsed/currentEvent.duration-.88)/.12,0,1):1;
  const ballPoint=owner?controlledBallVisual(runtime.state.ball,owner,progress):runtime.state.ball;
  const ball = runtime.project(ballPoint.x, ballPoint.y);
  runtime.ctx.fillStyle='rgba(0,0,0,.35)';runtime.ctx.beginPath();runtime.ctx.ellipse(ball.x,ball.y,9*ball.s,3.5*ball.s,0,0,Math.PI*2);runtime.ctx.fill();
  runtime.ctx.fillStyle = '#fff'; runtime.ctx.strokeStyle = '#161616'; runtime.ctx.lineWidth = 2;
  runtime.ctx.beginPath(); runtime.ctx.arc(ball.x, ball.y - 6 - runtime.state.ballHeight, 8 * ball.s, 0, Math.PI * 2); runtime.ctx.fill(); runtime.ctx.stroke();
}

function drawHUDStage0() {
  panel(runtime.W / 2 - 330, 18, 660, 116);
  runtime.ctx.textAlign = 'center'; runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = 'bold 52px Orbitron';
  runtime.ctx.fillText(`${runtime.state.score[0]}  -  ${runtime.state.score[1]}`, runtime.W / 2, 80);
  runtime.ctx.font = 'bold 24px Inter'; runtime.ctx.fillStyle = '#6aa8ff'; runtime.ctx.fillText('我方 FC', runtime.W / 2 - 220, 74);
  runtime.ctx.fillStyle = '#ff7a75'; runtime.ctx.fillText('对手 United', runtime.W / 2 + 220, 74);
  const elapsedMinutes = runtime.state.phase === 'end' ? 90 : Math.min(90, (runtime.state.round - 1) * (90/runtime.TOTAL_ROUNDS));
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = '20px Inter';
  const clockLabel = runtime.state.phase === 'setup' ? `赛前布阵 · ${runtime.GRID_COLS} × ${runtime.GRID_ROWS} 格` : `第 ${Math.min(runtime.state.round, runtime.TOTAL_ROUNDS)} / ${runtime.TOTAL_ROUNDS} 回合 · ${elapsedMinutes}'`;
  const moveLabel = runtime.state.phase === 'setup' ? '球员各占一格' : `球相关 ${runtime.state.event?.responses?.length || 0} 人 · 普通跑位 ${runtime.state.event?.trace.teamMovement?.ordinaryMovers || 0} 人`;
  const shownCarrier = runtime.v437VisibleOwner(runtime.state.phase==='resolving'?runtime.state.event:null);
  const dead=runtime.state.rules?.ballState==='dead'||runtime.state.event?.rules?.stop&&runtime.state.event.elapsed>=runtime.state.event.rules.stop.at;
  const possessionLabel = dead?'死球 · 等待重启':shownCarrier?.side === 0 ? '我方控球' : shownCarrier?.side === 1 ? '对手控球' : '争抢球权';
  runtime.ctx.fillText(`${clockLabel} · ${moveLabel} · ${possessionLabel}`, runtime.W / 2, 116);

  drawCoachPanel();
  drawEventPanel();
  drawBottomPanel();
  drawSquadStrip();

  panel(runtime.muteButton.x - 5, runtime.muteButton.y - 5, runtime.muteButton.w + 10, runtime.muteButton.h + 10);
  runtime.ctx.textAlign = 'center'; runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = '28px Inter';
  runtime.ctx.fillText(runtime.muted ? '🔇' : '🔊', runtime.muteButton.x + runtime.muteButton.w / 2, runtime.muteButton.y + 39);

  if (runtime.state.flash > 0) {
    runtime.ctx.globalAlpha = Math.min(1, runtime.state.flash / 1.4);
    runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.textAlign = 'center'; runtime.ctx.font = 'bold 132px Orbitron'; runtime.ctx.fillText('GOAL!', runtime.W / 2, 550);
    runtime.ctx.globalAlpha = 1;
  }
  if (runtime.state.phase === 'end') {
    runtime.ctx.fillStyle = 'rgba(0,0,0,0.72)'; runtime.ctx.fillRect(0, 0, runtime.W, runtime.H);
    const [a, b] = runtime.state.score;
    runtime.ctx.fillStyle = a > b ? '#7dff6a' : a < b ? '#ff7a75' : '#ffd54f';
    runtime.ctx.font = 'bold 112px Inter'; runtime.ctx.textAlign = 'center'; runtime.ctx.fillText(a > b ? '胜利！' : a < b ? '失利' : '平局', runtime.W / 2, 450);
    runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = 'bold 72px Orbitron'; runtime.ctx.fillText(`${a} - ${b}`, runtime.W / 2, 555);
    const totalPossession = runtime.state.possessionTicks[0] + runtime.state.possessionTicks[1];
    const share = (side) => (totalPossession ? Math.round(runtime.state.possessionTicks[side] / totalPossession * 100) : 0);
    runtime.ctx.font = '24px Inter';
    runtime.ctx.fillText(`射门 ${runtime.state.stats[0].shots} : ${runtime.state.stats[1].shots} · 控球 ${share(0)}% : ${share(1)}% · 传球成功 ${runtime.passRate(0)}% : ${runtime.passRate(1)}%`, runtime.W / 2, 640);
    runtime.ctx.fillText(`换人 ${runtime.state.subsUsed[0]} : ${runtime.state.subsUsed[1]} · 点击下方「重新开始」按钮`, runtime.W / 2, 675);
  }
}

function toggleButton(rect, active, label, activeFill) {
  runtime.ctx.fillStyle = active ? activeFill : 'rgba(255,255,255,0.12)';
  roundRect(rect.x, rect.y, rect.w, rect.h, 9); runtime.ctx.fill();
  runtime.ctx.strokeStyle = active ? '#ffe082' : 'rgba(255,255,255,0.35)';
  runtime.ctx.lineWidth = active ? 2.5 : 1.5;
  roundRect(rect.x, rect.y, rect.w, rect.h, 9); runtime.ctx.stroke();
  runtime.ctx.fillStyle = active ? '#fff' : 'rgba(255,255,255,0.72)';
  runtime.ctx.textAlign = 'center';
  runtime.ctx.font = `bold ${rect.w >= 130 ? 16 : 14}px Inter`;
  runtime.ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 6);
}

function primaryButton(rect, label, fill = '#1e6fff', fontSize = 24) {
  runtime.ctx.fillStyle = fill; roundRect(rect.x, rect.y, rect.w, rect.h, 10); runtime.ctx.fill();
  runtime.ctx.strokeStyle = 'rgba(255,224,130,0.9)'; runtime.ctx.lineWidth = 2;
  roundRect(rect.x, rect.y, rect.w, rect.h, 10); runtime.ctx.stroke();
  runtime.ctx.fillStyle = '#fff'; runtime.ctx.textAlign = 'center'; runtime.ctx.font = `bold ${fontSize}px Inter`;
  runtime.ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + fontSize * 0.36);
}

function drawCoachPanel() {
  panel(24, 262, 306, 620);
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 22px Inter';
  runtime.ctx.fillText(runtime.state.phase === 'setup' ? '赛前布阵 · 战术板' : '教练席 · 战术板', 44, 298);
  runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = 'bold 18px Inter';
  const phaseLabel = runtime.state.phase === 'setup' ? runtime.FORMATION_PRESETS[runtime.state.formationIndex].name
    : runtime.state.phase === 'end' ? '全场比赛结束'
      : runtime.state.phase === 'halftime' ? '中场休息'
        : runtime.state.phase === 'tactics' ? '等待确认战术' : '比赛进行中';
  runtime.ctx.fillText(phaseLabel, 44, 328);
  runtime.ctx.fillStyle = '#c9d4e6'; runtime.ctx.font = '16px Inter';
  const shownCarrier = runtime.v437VisibleOwner(runtime.state.phase==='resolving'?runtime.state.event:null);
  runtime.ctx.fillText(`球权：${shownCarrier?.side === 0 ? '我方' : shownCarrier?.side === 1 ? '对手' : '争抢中'}`, 44, 360);
  runtime.ctx.fillText(`持球：${shownCarrier ? runtime.nameOf(shownCarrier) : '无人控制'}`, 44, 384);

  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 16px Inter';
  runtime.ctx.fillText('进攻方向', 44, 418);
  for (const button of runtime.laneButtons) toggleButton(button, runtime.state.focusLane[0] === button.lane, runtime.LANE_LABELS[button.lane], '#1e6fff');
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 16px Inter';
  runtime.ctx.fillText('全队策略', 44, 494);
  for (const button of runtime.styleButtons) {
    toggleButton(button, runtime.state.coachOrders[0] === button.style, runtime.COACH_LABELS[button.style],
      button.style === 'defend' || button.style === 'counter' ? '#bd5d38' : '#1e6fff');
  }
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#9eabc2'; runtime.ctx.font = '14px Inter';
  runtime.ctx.fillText(runtime.COACH_HINTS[runtime.state.coachOrders[0]], 44, 633);

  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 16px Inter';
  runtime.ctx.fillText('对手战术（赛中自动调整）', 44, 660);
  runtime.ctx.fillStyle = '#ffb0ab'; runtime.ctx.font = '17px Inter';
  runtime.ctx.fillText(`${runtime.COACH_LABELS[runtime.state.coachOrders[1]]} · ${runtime.LANE_LABELS[runtime.state.focusLane[1]]}`, 44, 684);

  const inspected = runtime.state.selectedPlayer || runtime.v415RolePlayer(0,9);
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 16px Inter';
  runtime.ctx.fillText('球员属性 · 点击球员查看', 44, 716);
  runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = 'bold 17px Inter';
  runtime.ctx.fillText(`${inspected.num}号 ${inspected.role}`, 44, 740);
  runtime.ctx.fillStyle = '#dce4ef'; runtime.ctx.font = '15px Inter';
  const displayedSkills = runtime.SKILL_KEYS.map(k=>`${runtime.SKILL_LABELS[k]} ${inspected[k]}`);
  displayedSkills.forEach((label,index)=>runtime.ctx.fillText(label,index%2?180:44,759+Math.floor(index/2)*16));
  runtime.ctx.fillStyle = '#c9d4e6'; runtime.ctx.font = '14px Inter';
  const shortLeading = { attack: '主动进攻', protect: '护球稳控', spread: '转向空区' }[inspected.leading];
  runtime.ctx.fillText(`体力 ${Math.round(inspected.currentStamina)}% · ${runtime.HABIT_LABELS[inspected.habit]}`,44,858);
  
}

function drawEventPanel() {
  panel(1534, 290, 366, 550);
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 23px Inter'; runtime.ctx.fillText('比赛事件', 1554, 328);
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#9eabc2'; runtime.ctx.font = '16px Inter';
  const routeEvent=runtime.state.phase==='resolving'?runtime.state.event:null;
  const stageRouteLabels={'man-ball-split':'人球分过','rainbow-over-scripted-slide':'彩虹过人','double-save':'连续射门与扑救','cut-through-pass':'穿透传球被截','first-touch-escape':'第一脚领球'};
  const routeLabel=routeEvent&&stageRouteLabels[routeEvent.trace.highlight?.stagedSequence?.kind]||runtime.BALL_ROUTE_LABELS[routeEvent?.routeKind]||'预演球路';
  const routeText=routeEvent?.ballRoute ? `球路：${routeLabel}${routeEvent.type==='pass'&&routeEvent.trace.ballRoute?.targetMissed?' · 落点有偏差':''}` : runtime.state.phase==='setup'?'开赛后双方将自动比赛':'传球 · 带球 · 射门 · 防守';
  runtime.ctx.fillText(routeText,1554,397);
  runtime.state.log.slice(0, 12).forEach((line, i) => {
    runtime.ctx.fillStyle = i === 0 ? '#fff' : 'rgba(255,255,255,0.63)';
    runtime.ctx.font = `${i === 0 ? 'bold ' : ''}17px Inter`;
    runtime.ctx.fillText(line.slice(0, 19), 1554, 428 + i * 27);
  });
  const totalPossession = runtime.state.possessionTicks[0] + runtime.state.possessionTicks[1];
  const share = (side) => (totalPossession ? Math.round(runtime.state.possessionTicks[side] / totalPossession * 100) : 0);
  runtime.ctx.fillStyle = '#aebbd0'; runtime.ctx.font = '16px Inter';
  runtime.ctx.fillText(`射门 ${runtime.state.stats[0].shots} : ${runtime.state.stats[1].shots}   传球 ${runtime.state.stats[0].passes} : ${runtime.state.stats[1].passes}`, 1554, 760);
  runtime.ctx.fillText(`上抢 ${runtime.state.stats[0].tackles} : ${runtime.state.stats[1].tackles}   扑救 ${runtime.state.stats[0].saves} : ${runtime.state.stats[1].saves}`, 1554, 784);
  runtime.ctx.fillText(`控球率 ${share(0)}% : ${share(1)}%   换人 ${runtime.state.subsUsed[0]} : ${runtime.state.subsUsed[1]}`, 1554, 808);
  runtime.ctx.fillText(`传球成功 ${runtime.passRate(0)}% : ${runtime.passRate(1)}%`, 1554, 832);
}

function drawSquadCard(p, rect, selected) {
  const carrier = runtime.state.carrier === p;
  runtime.ctx.fillStyle = selected ? 'rgba(255,213,79,0.22)' : carrier ? 'rgba(255,255,255,0.17)' : 'rgba(255,255,255,0.06)';
  roundRect(rect.x, rect.y, rect.w, rect.h, 6); runtime.ctx.fill();
  runtime.ctx.strokeStyle = selected ? '#ffd54f' : carrier ? '#ffffff' : 'rgba(255,255,255,0.15)';
  runtime.ctx.lineWidth = selected || carrier ? 2 : 1;
  roundRect(rect.x, rect.y, rect.w, rect.h, 6); runtime.ctx.stroke();
  // 第一行：号码 + 位置靠左，体力条靠右
  runtime.ctx.textAlign = 'left';
  runtime.ctx.font = 'bold 15px Inter';
  runtime.ctx.fillStyle = selected ? '#ffd54f' : '#fff';
  runtime.ctx.fillText(`${p.num}号 ${p.role}`, rect.x + 10, rect.y + 14);
  const ratio = runtime.clamp(p.currentStamina / 100, 0, 1);
  const barW = 56, barX = rect.x + rect.w - barW - 28;
  runtime.ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(barX, rect.y + 6, barW, 8, 4); runtime.ctx.fill();
  runtime.ctx.fillStyle = ratio > 0.66 ? '#4caf50' : ratio > 0.4 ? '#ffd54f' : '#e53935';
  roundRect(barX, rect.y + 6, Math.max(3, barW * ratio), 8, 4); runtime.ctx.fill();
  runtime.ctx.font = '12px Inter';
  runtime.ctx.fillStyle = ratio > 0.4 ? '#c9d4e6' : '#ff8b82';
  runtime.ctx.fillText(String(Math.round(p.currentStamina)), barX + barW + 5, rect.y + 14);
  // 第二行：关键属性。门将给守门/传球/逼抢，其余给传/带/射/抢
  const isKeeper = runtime.isGoalkeeper(p);
  runtime.ctx.fillStyle = '#aebbd0';
  runtime.ctx.fillText(isKeeper
    ? `门${p.goalkeeping} 传${p.passing} 抢${p.pressing}`
    : `传${p.passing} 带${p.dribbling} 射${p.shooting} 抢${p.pressing}`, rect.x + 10, rect.y + 28);
}

function drawSquadStrip() {
  panel(runtime.SQUAD_STRIP.x - 6, runtime.SQUAD_STRIP.y - 6, runtime.SQUAD_STRIP.w + 12, runtime.SQUAD_STRIP.h + 12);
  const rowH = 32, gapX = 6, gapY = 4;
  // 按号码排，门将排在最前
  const squad = [...runtime.teams[0]].sort((a, b) => a.num - b.num);
  const rows = [squad.slice(0, 6), squad.slice(6)];
  rows.forEach((members, rowIndex) => {
    if (!members.length) return;
    const rowY = runtime.SQUAD_STRIP.y + rowIndex * (rowH + gapY);
    const cardW = (runtime.SQUAD_STRIP.w - gapX * (members.length - 1)) / members.length;
    members.forEach((p, i) => {
      drawSquadCard(p, { x: runtime.SQUAD_STRIP.x + i * (cardW + gapX), y: rowY, w: cardW, h: rowH },
        runtime.state.selectedPlayer === p);
    });
  });
}

function drawBottomPanel() {
  panel(348, 884, 1150, 118);
  runtime.ctx.textAlign = 'center';
  if (runtime.state.phase === 'setup') {
    runtime.ctx.fillStyle = '#dce4ef'; runtime.ctx.font = '20px Inter';
    runtime.ctx.fillText('拖动蓝队球员布阵 · 每人占一格 · 选好阵型、进攻方向与策略后开赛', runtime.W / 2, 906);
    for (const button of runtime.formationButtons) toggleButton(button, runtime.state.formationIndex === button.index, button.name, '#1e6fff');
    primaryButton(runtime.startButton, '开赛', '#1e6fff', 24);
    return;
  }
  if (runtime.state.phase === 'tactics') {
    runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 22px Inter';
    runtime.ctx.fillText(`第 ${Math.min(runtime.state.round, runtime.TOTAL_ROUNDS)} / ${runtime.TOTAL_ROUNDS} 回合 · 我方${runtime.COACH_LABELS[runtime.state.coachOrders[0]]} · 主攻${runtime.LANE_LABELS[runtime.state.focusLane[0]]}`, runtime.W / 2, 906);
    runtime.ctx.fillStyle = '#9eabc2'; runtime.ctx.font = '17px Inter';
    runtime.ctx.fillText(`对手：${runtime.COACH_LABELS[runtime.state.coachOrders[1]]} · ${runtime.LANE_LABELS[runtime.state.focusLane[1]]} · 空格执行回合`, 540, 934);
    primaryButton(runtime.advanceButton, '执行回合', '#1e6fff', 24);
    toggleButton(runtime.autoButton, runtime.state.autoPlay, runtime.state.autoPlay ? '连续推进：开' : '连续推进：关', '#2e7d32');
    return;
  }
  runtime.ctx.fillStyle = '#dce4ef'; runtime.ctx.font = '20px Inter';
  if (runtime.state.phase === 'end') runtime.ctx.fillText('比赛结束 · 点击下方「重新开始」按钮', runtime.W / 2, 944);
  else if (runtime.state.phase === 'halftime') runtime.ctx.fillText('中场休息 · 在覆盖层完成换人与阵型调整', runtime.W / 2, 944);
  else if (runtime.state.phase === 'resolving') runtime.ctx.fillText('主动球员发起动作 · 多名队友与对手同步响应……', runtime.W / 2, 944);
  else runtime.ctx.fillText('足球事件自动推进 · 普通跑位不限人数 · 按个人能力最多 1–3 格', runtime.W / 2, 944);
}

function drawPlayerRow(player, rect, selected = false) {
  runtime.ctx.fillStyle = selected ? 'rgba(255,213,79,0.20)' : 'rgba(255,255,255,0.06)';
  roundRect(rect.x, rect.y, rect.w, rect.h, 8); runtime.ctx.fill();
  runtime.ctx.strokeStyle = selected ? '#ffd54f' : 'rgba(255,255,255,0.16)';
  runtime.ctx.lineWidth = selected ? 2.5 : 1;
  roundRect(rect.x, rect.y, rect.w, rect.h, 8); runtime.ctx.stroke();
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#fff'; runtime.ctx.font = 'bold 18px Inter';
  runtime.ctx.fillText(`${player.num}号 ${player.role}`, rect.x + 16, rect.y + 30);
  const barX = rect.x + 212;
  const barW = 168;
  runtime.ctx.fillStyle = 'rgba(255,255,255,0.14)';
  roundRect(barX, rect.y + 16, barW, 12, 6); runtime.ctx.fill();
  const ratio = runtime.clamp(player.currentStamina / 100, 0, 1);
  runtime.ctx.fillStyle = ratio > 0.66 ? '#4caf50' : ratio > 0.4 ? '#ffd54f' : '#e53935';
  roundRect(barX, rect.y + 16, Math.max(4, barW * ratio), 12, 6); runtime.ctx.fill();
  runtime.ctx.fillStyle = '#c9d4e6'; runtime.ctx.font = '14px Inter';
  runtime.ctx.fillText(`体力 ${Math.round(player.currentStamina)}`, barX + barW + 12, rect.y + 27);
  runtime.ctx.fillStyle = '#aebbd0'; runtime.ctx.font = '14px Inter';
  const isKeeper = runtime.isGoalkeeper(player);
  runtime.ctx.fillText(`传${player.passing} 带${player.dribbling} 射${player.shooting} 抢${player.pressing}${isKeeper ? ` 门${player.goalkeeping}` : ''}`, barX, rect.y + 40);
}

function drawHalftime() {
  runtime.ctx.fillStyle = 'rgba(0,0,0,0.76)'; runtime.ctx.fillRect(0, 0, runtime.W, runtime.H);
  panel(240, 110, 1440, 850);
  runtime.ctx.textAlign = 'center';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 40px Inter';
  runtime.ctx.fillText('中场休息 · 阵容与战术调整', runtime.W / 2, 168);
  runtime.ctx.fillStyle = '#c9d4e6'; runtime.ctx.font = '19px Inter';
  runtime.ctx.fillText(`比分 ${runtime.state.score[0]} - ${runtime.state.score[1]} · 已换人 ${runtime.state.subsUsed[0]}/${runtime.MAX_SUBS} · 先点击替补选中，再点击左侧场上球员完成换人`, runtime.W / 2, 204);
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 22px Inter';
  runtime.ctx.fillText('场上阵容', 280, 250);
  runtime.ctx.fillText('替补席', 980, 250);
  runtime.halftimeFieldRows.forEach((rect, i) => {
    const player = runtime.teams[0][i];
    if(!player)return;
    const pending = runtime.state.benchSelection !== null;
    const highlighted = pending && runtime.canSwap(runtime.benches[0][runtime.state.benchSelection], i);
    drawPlayerRow(player, rect, highlighted || runtime.state.selectedPlayer === player);
  });
  runtime.halftimeBenchRows.forEach((rect, i) => drawPlayerRow(runtime.benches[0][i], rect, runtime.state.benchSelection === i));
  runtime.ctx.textAlign = 'left';
  runtime.ctx.fillStyle = '#ffd54f'; runtime.ctx.font = 'bold 18px Inter';
  runtime.ctx.fillText('下半场阵型', 280, 836);
  for (const button of runtime.halftimeFormationButtons) toggleButton(button, runtime.state.formationIndex === button.index, button.name, '#1e6fff');
  primaryButton(runtime.halftimeContinueButton, '继续下半场', '#1e6fff', 24);
}

function panel(x, y, w, h) {
  runtime.ctx.fillStyle = 'rgba(10,15,30,0.83)'; roundRect(x, y, w, h, 14); runtime.ctx.fill();
}

function roundRect(x, y, w, h, r) { runtime.ctx.beginPath(); runtime.ctx.roundRect(x, y, w, h, r); }

function drawMotionFigureStage1(p,s,r,pose,facing){runtime.v413Draw(p,s,r,pose,facing);if(false){runtime.ctx.save();runtime.ctx.fillStyle='#ffcf6a';runtime.ctx.font=`bold ${Math.max(10,12*s.s)}px system-ui`;runtime.ctx.textAlign='center';runtime.ctx.fillText('硬直',s.x,s.y-r*2.6);runtime.ctx.restore();}}

function drawMotionFigureStage2(p,s,r,pose,facing){runtime.v415Draw(p,s,r,pose,facing);
 if(pose?.throwHands){const direction=p.motionDirection||{x:facing||1,y:0},a=prepareFootballFigure(s,r,pose,direction).anchors,hands=runtime.throwHandAnchors(a.head,r,pose.throwPhase,direction);runtime.ctx.save();runtime.ctx.strokeStyle='#f1c9a5';runtime.ctx.lineWidth=r*.22;runtime.ctx.lineCap='round';for(const hand of [hands.left,hands.right]){runtime.ctx.beginPath();runtime.ctx.moveTo(a.head.x+(hand===hands.left?-1:1)*r*.6,a.head.y+r*.8);runtime.ctx.lineTo(hand.x,hand.y);runtime.ctx.stroke();}runtime.ctx.restore();}
 if(p.yellowCards){runtime.ctx.save();runtime.ctx.fillStyle='#ffe166';runtime.ctx.fillRect(s.x+r*.8,s.y-r*2.6,r*.3,r*.45);runtime.ctx.restore();}
}

function drawHUDStage1(){runtime.v415Hud();const rules=runtime.v415Rules();if(runtime.state.phase==='setup')return;runtime.ctx.save();runtime.ctx.font='bold 16px system-ui';runtime.ctx.textAlign='center';runtime.ctx.fillStyle='#ffe7a1';const e=runtime.state.event,verdict=e?.rules?.verdict,visible=verdict&&(!e.rules.stop||e.elapsed>=e.rules.stop.at),text=visible?verdict.kind==='foul'?'身体接触犯规 · '+runtime.RESTART_NAMES[verdict.restart]:verdict.kind==='offside'?'越位 · 间接任意球':verdict.kind==='out'?'出界 · '+runtime.RESTART_NAMES[verdict.restart]:null:rules.pending?runtime.RESTART_NAMES[rules.pending.kind]+' · '+(rules.pending.side===0?'我方':'对手'):e?.result.restart?runtime.RESTART_NAMES[e.result.restart.kind]:null;if(text)runtime.ctx.fillText(text,960,156);runtime.ctx.font='14px system-ui';runtime.ctx.fillStyle='#d5e4e7';runtime.ctx.fillText(`人数 ${runtime.teams[0].length} : ${runtime.teams[1].length}  ·  黄牌 ${rules.cards[0].yellow} : ${rules.cards[1].yellow}  ·  红牌 ${rules.cards[0].red} : ${rules.cards[1].red}`,960,180);runtime.ctx.restore();}

function drawHUDStage2(){runtime.v434HUD();const prep=runtime.v434PrepareState();if(!prep)return;runtime.ctx.save();runtime.ctx.fillStyle='#102034';runtime.ctx.fillRect(630,128,660,40);runtime.ctx.fillStyle='#ffe48b';runtime.ctx.font='bold 18px system-ui';runtime.ctx.textAlign='center';runtime.ctx.fillText(`${prep.kind==='keeper_hold'?'门将保护持球':runtime.RESTART_NAMES[prep.kind]} · 准备 ${Math.min(prep.completed+1,prep.total)}/${prep.total} · 不占比赛回合`,960,155);runtime.ctx.restore();}
return {drawMotionFigureStage0,drawActionAnimations,drawPitch,drawFocusLane,drawBallTrail,drawLandingReticle,drawIntentLines,drawGrid,drawCellOutline,drawGoal,poly,drawPlayers,drawHUDStage0,toggleButton,primaryButton,drawCoachPanel,drawEventPanel,drawSquadCard,drawSquadStrip,drawBottomPanel,drawPlayerRow,drawHalftime,panel,roundRect,drawMotionFigureStage1,drawMotionFigureStage2,drawHUDStage1,drawHUDStage2};
}
