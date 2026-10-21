const legacy=(()=>{
'use strict';
// Independent, predetermined replays. No game code or match state is imported.
const POSES = {
  stand: {lean:0,shiftX:0,shiftY:0,headX:0},
  start: {lean:5,shiftX:.05,shiftY:-.04,headX:.27},
  runLow: {lean:6,shiftX:.10,shiftY:-.08,headX:.33},
  runHigh: {lean:6,shiftX:.10,shiftY:.08,headX:.33},
  touch: {lean:8,shiftX:.16,shiftY:-.05,headX:.33},
  collect: {lean:3,shiftX:.03,shiftY:-.02,headX:.15},
  sprintLow: {lean:9,shiftX:.16,shiftY:-.10,headX:.43},
  sprintHigh: {lean:9,shiftX:.16,shiftY:.10,headX:.43},
  brake: {lean:-4,shiftX:-.07,shiftY:-.10,headX:-.13},
  passSet: {lean:3,shiftX:-.10,shiftY:-.08,headX:.15,headY:-.04,width:.94},
  passContact: {lean:8,shiftX:.18,shiftY:-.02,headX:.32,headY:-.04},
  passFollow: {lean:4,shiftX:.16,shiftY:.02,headX:.24},
  receiveReady: {lean:4,shiftX:.05,shiftY:-.08,headX:.18,headY:-.04},
  receiveContact: {lean:6,shiftX:.15,shiftY:-.13,headX:.25,headY:-.06},
  cushion: {lean:-3,shiftX:-.08,shiftY:-.14,headX:-.10,headY:-.05},
  turn: {lean:2,shiftX:0,shiftY:-.04,headX:.08,width:.78},
  shotSet: {lean:7,shiftX:-.08,shiftY:-.13,headX:.27,headY:-.10,width:.88},
  shotContact: {lean:16,shiftX:.24,shiftY:-.05,headX:.46,headY:-.10},
  shotFollow: {lean:21,shiftX:.35,shiftY:.02,headX:.57,headY:-.06,width:.94},
  shotLand: {lean:9,shiftX:.14,shiftY:-.13,headX:.38,headY:-.02},
};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=t=>{t=clamp(t);return t*t*(3-2*t)};
const lerp=(a,b,t)=>a+(b-a)*clamp(t);
const length=8.2222222222;
const SPECS={
  carry:{cycle:2.9,labels:['启动','触球','跑动','停稳']},
  run:{cycle:2.9,labels:['启动','加速','跑动','停步']},
  pass:{cycle:3.6,labels:['准备','触球','送出','收势']},
  receive:{cycle:3.8,labels:['迎球','接触','缓冲','控住']},
  shoot:{cycle:3.6,labels:['助跑','准备','发力','随势']},
};
const actor=(x,pose='stand',dir=1,num='10')=>({x,pose,dir,num});
// Identical motion and touch schedule to the approved second dribble study.
function carryFrame(t){
  if(t<.30)return {actors:[actor(0)],ball:1.1,phase:-1};
  if(t<.48)return {actors:[actor(0,'start')],ball:1.1,phase:0};
  if(t<1.84){
    const q=clamp((t-.48)/1.36),person=ease(q);
    const touches=[0,.32,.64,1],index=q<.32?0:q<.64?1:2;
    const u=(q-touches[index])/(touches[index+1]-touches[index]);
    const ball=person+(1-person)*.12*4*u*(1-u);
    const contact=(q-touches[index])*1.36<.05;
    const pose=contact?'touch':(t-.48)%.28<.13?'runLow':'runHigh';
    return {actors:[actor(person*length,pose)],ball:ball*length+1.1,phase:contact?1:2};
  }
  return {actors:[actor(length,t<2.02?'collect':'stand')],ball:length+1.1,phase:3};
}
function runFrame(t){
  if(t<.30)return {actors:[actor(0)],phase:-1};
  if(t<.48)return {actors:[actor(0,'start')],phase:0};
  if(t<1.78){
    const q=clamp((t-.48)/1.3),x=ease(q)*length;
    const pose=q>.83?'brake':q<.2?((t-.48)%.24<.12?'runLow':'runHigh'):((t-.48)%.24<.12?'sprintLow':'sprintHigh');
    return {actors:[actor(x,pose)],phase:q>.83?3:q<.2?1:2};
  }
  return {actors:[actor(length,t<1.96?'collect':'stand')],phase:3};
}
function passFrame(t){
  const receiver=14.5,contact=.90,arrival=1.70,cushionEnd=1.92;
  let pose='stand',x=0,phase=-1;
  if(t>=.35&&t<contact){pose='passSet';phase=0}
  else if(t>=contact&&t<1.01){pose='passContact';phase=1}
  else if(t>=1.01&&t<1.29){pose='passFollow';phase=2}
  else if(t>=1.29){pose=t<1.49?'collect':'stand';phase=3}
  if(t>=contact)x=.30*ease((t-contact)/.35);
  let ball=1.1,receiverPose=t<1.46?'stand':'receiveReady';
  if(t>=contact&&t<arrival)ball=lerp(1.1,receiver-1.45,(t-contact)/(arrival-contact));
  else if(t>=arrival){ball=lerp(receiver-1.45,receiver-.95,1-Math.pow(1-clamp((t-arrival)/(cushionEnd-arrival)),2));receiverPose=t<1.78?'receiveContact':t<cushionEnd?'cushion':t<2.1?'collect':'stand'}
  return {actors:[actor(x,pose),actor(receiver,receiverPose,-1,'8')],ball,phase};
}
function receiveFrame(t){
  // Incoming ball from the left; retreat very slightly with contact, then turn out.
  const contact=1.08,cushionEnd=1.34,turnStart=1.63,driveStart=1.85,driveEnd=2.40;
  let x=10.1,pose='stand',dir=-1,phase=-1;
  if(t>=.28&&t<contact){x=lerp(10.1,9.6,ease((t-.28)/.50));pose=t<.68?'runLow':'receiveReady';phase=0}
  else if(t>=contact&&t<cushionEnd){x=lerp(9.6,9.74,ease((t-contact)/(cushionEnd-contact)));pose=t<1.16?'receiveContact':'cushion';phase=t<1.16?1:2}
  else if(t>=cushionEnd&&t<turnStart){x=9.74;pose='collect';phase=3}
  else if(t>=turnStart&&t<driveStart){x=9.74;pose='turn';dir=t<1.74?-1:1;phase=3}
  else if(t>=driveStart){const q=clamp((t-driveStart)/(driveEnd-driveStart));x=9.74+1.9*ease(q);dir=1;pose=t<driveEnd?(t<1.94?'touch':(t-driveStart)%.28<.13?'runLow':'runHigh'):t<2.57?'collect':'stand';phase=3}
  let ball=2.0;
  if(t>=.28&&t<contact)ball=lerp(2,8.15,(t-.28)/(contact-.28));
  else if(t>=contact&&t<cushionEnd)ball=lerp(8.15,8.79,1-Math.pow(1-clamp((t-contact)/(cushionEnd-contact)),2));
  else if(t>=cushionEnd&&t<turnStart)ball=8.79;
  else if(t>=turnStart&&t<driveStart)ball=8.79;
  else if(t>=driveStart){const q=clamp((t-driveStart)/(driveEnd-driveStart));ball=8.79+4.05*(1-Math.pow(1-q,2))}
  // On the turn-out, the ball travels around the player's near side, not through the body.
  const ballY=t>=driveStart&&t<driveEnd?Math.sin(clamp((t-driveStart)/(driveEnd-driveStart))*Math.PI)*.35:0;
  return {actors:[actor(x,pose,dir,'8')],ball,ballY,phase};
}
function shootFrame(t){
  const contact=1.12,arrival=1.61;
  let x=-1.45,pose='stand',phase=-1;
  if(t>=.28&&t<.78){x=lerp(-1.45,0,ease((t-.28)/.5));pose=(t-.28)%.24<.12?'runLow':'runHigh';phase=0}
  else if(t>=.78&&t<contact){x=0;pose='shotSet';phase=1}
  else if(t>=contact&&t<1.23){x=0;pose='shotContact';phase=2}
  else if(t>=1.23&&t<1.48){x=.52*ease((t-1.23)/.25);pose='shotFollow';phase=3}
  else if(t>=1.48){x=.52;pose=t<1.68?'shotLand':t<1.88?'collect':'stand';phase=3}
  const u=clamp((t-contact)/(arrival-contact));
  const ball=t<contact?1.1:lerp(1.1,15.9,u);
  const ballHeight=t>=contact&&t<arrival?Math.sin(u*Math.PI)*.8:0;
  return {actors:[actor(x,pose,1,'9')],ball,ballHeight,phase,goal:true};
}
const SAMPLERS={carry:carryFrame,run:runFrame,pass:passFrame,receive:receiveFrame,shoot:shootFrame};
function sample(action,seconds){
  const cycle=SPECS[action].cycle,t=((seconds%cycle)+cycle)%cycle;
  const f=SAMPLERS[action](t,Math.floor(seconds/cycle));
  f.direction=['carry','run'].includes(action)&&Math.floor(seconds/cycle)%2===1?-1:1;
  return f;
}
function figure(ctx,x,y,r,p,dir,num,color="#1e6fff"){
  ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(x,y,r,r*.4,0,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.translate(x+dir*r*p.shiftX,y-r*.75-r*p.shiftY);ctx.rotate(dir*p.lean*Math.PI/180);
  const width=p.width??1;ctx.fillStyle=color;ctx.fillRect(-r*.72*width,-r*2.25,r*1.44*width,r*2.25);
  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`bold ${Math.round(13*r/14)}px system-ui`;ctx.fillText(num,0,-r*.8);ctx.restore();
  let hx=x+dir*r*p.headX,hy=y-r*(3.4+(p.headY??0));if(p.rigid){const angle=dir*p.lean*Math.PI/180;hx=x+dir*r*p.shiftX+2.65*r*Math.sin(angle);hy=y-r*.75-r*p.shiftY-2.65*r*Math.cos(angle)}ctx.fillStyle='#f1c9a5';ctx.beginPath();ctx.arc(hx,hy,r*.6,0,Math.PI*2);ctx.fill();
}
function ball(ctx,x,y,ground,r,travel,shadow=true){
  if(shadow){ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();ctx.ellipse(x,ground+r*.625,r*.95,r*.32,0,0,Math.PI*2);ctx.fill();}
  ctx.save();ctx.translate(x,y);ctx.rotate(travel/r);ctx.fillStyle='#fff';ctx.strokeStyle='#161616';ctx.lineWidth=Math.max(1.2,r*.15);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#1b2730';ctx.beginPath();for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2,px=Math.cos(a)*r*.34,py=Math.sin(a)*r*.34;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.fill();ctx.restore();
}
function text(ctx,value,x,y,size,color='#9eabc2',align='left'){
  ctx.fillStyle=color;ctx.font=`${size}px system-ui`;ctx.textAlign=align;ctx.fillText(value,x,y);
}
function poly(ctx,points,fill){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}else ctx.stroke()}
function fieldPoint(x,y){const t=y/68,half=(560+t*260)*.82;return {x:540+(x/105-.5)*2*half*.75,y:56+t*175,s:.75+t*.35}}
function pitch(ctx){
  for(let i=0;i<15;i++){const points=[[i*7,0],[(i+1)*7,0],[(i+1)*7,68],[i*7,68]].map(([x,y])=>{const p=fieldPoint(x,y);return[p.x,p.y]});poly(ctx,points,i%2?'#378c3a':'#2f7d32')}
  ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;
  for(let i=1;i<9;i++){const a=fieldPoint(0,i*68/9),b=fieldPoint(105,i*68/9);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
  ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;
  poly(ctx,[[0,0],[105,0],[105,68],[0,68]].map(([x,y])=>{const p=fieldPoint(x,y);return[p.x,p.y]}));
  const a=fieldPoint(52.5,0),b=fieldPoint(52.5,68);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  const c=fieldPoint(52.5,34);ctx.beginPath();ctx.ellipse(c.x,c.y,62,24,0,0,Math.PI*2);ctx.stroke();
  for(const x of [0,88.5])poly(ctx,[[x,13.84],[x+16.5,13.84],[x+16.5,54.16],[x,54.16]].map(([x,y])=>{const p=fieldPoint(x,y);return[p.x,p.y]}));
}
function render(canvas,action,seconds){
  const ctx=canvas.getContext('2d'),f=sample(action,seconds),mirror=f.direction;
  ctx.clearRect(0,0,1080,560);ctx.fillStyle='#0c1b25';ctx.fillRect(0,0,1080,560);
  text(ctx,'场上尺寸',32,32,16,'#ffd54f');text(ctx,f.note??(mirror===-1?'向左推进':''),1048,32,13,undefined,'right');pitch(ctx);
  const worldStart=SPECS[action].worldStart??(['shoot','save','goal','header','rebound'].includes(action)?77:action==='pass'||action==='receive'||EXTENDED.has(action)?27:38.5);
  const yFactor=EXTENDED.has(action)?6.5:1.7;
  const worldX=x=>mirror===1?worldStart+x*1.7027:105-(worldStart+x*1.7027);
  for(const a of [...f.actors].sort((a,b)=>(a.y??0)-(b.y??0))){const p=fieldPoint(worldX(a.x),34+(a.y??0)*yFactor);figure(ctx,p.x,p.y,14*p.s*.75,POSES[a.pose],a.dir*mirror,a.num,a.color)}
  if(f.ball!==undefined){const p=fieldPoint(worldX(f.ball),34+(f.ballY??0)*yFactor),ground=p.y-6*p.s*.75;ball(ctx,p.x,ground-(f.ballHeight??0)*14*p.s*.75,ground,8*p.s*.75,f.ball*120*mirror,!f.held)}
  if(f.goal){const p=fieldPoint(105,34);ctx.strokeStyle='#f3f7fc';ctx.lineWidth=2;ctx.strokeRect(p.x-3,p.y-30,11,32);ctx.strokeStyle='rgba(255,255,255,.3)';for(let y=0;y<30;y+=6){ctx.beginPath();ctx.moveTo(p.x-3,p.y-y);ctx.lineTo(p.x+8,p.y-y);ctx.stroke()}}
  ctx.fillStyle='#102430';ctx.fillRect(0,261,1080,240);text(ctx,'放大观察',32,293,16,'#ffd54f');
  const r=SPECS[action].radius??(action.startsWith('a')?36:['carry','run'].includes(action)?45:40),from=['carry','run'].includes(action)?310:210,baseY=action==='clearance'?475:471;
  const screenX=x=>mirror===1?from+x*r:1080-(from+x*r);
  ctx.strokeStyle='rgba(255,255,255,.09)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(32,baseY);ctx.lineTo(1048,baseY);ctx.stroke();
  for(let x=from;x<1000;x+=r*4){ctx.beginPath();ctx.moveTo(x,322);ctx.lineTo(x,488);ctx.stroke()}
  if(f.goal){const gx=screenX(15.9);ctx.strokeStyle='#dce9f6';ctx.lineWidth=3;ctx.strokeRect(gx,baseY-135,53,137);ctx.strokeStyle='rgba(220,233,246,.2)';ctx.lineWidth=1;for(let y=baseY-135;y<baseY;y+=16){ctx.beginPath();ctx.moveTo(gx,y);ctx.lineTo(gx+53,y);ctx.stroke()}for(let x=gx+16;x<gx+53;x+=16){ctx.beginPath();ctx.moveTo(x,baseY-135);ctx.lineTo(x,baseY);ctx.stroke()}}
  for(const a of [...f.actors].sort((a,b)=>(a.y??0)-(b.y??0)))figure(ctx,screenX(a.x),baseY+(a.y??0)*r*.6,r,POSES[a.pose],a.dir*mirror,a.num,a.color);
  if(f.ball!==undefined){const ground=baseY-6*r/14+(f.ballY??0)*r*(EXTENDED.has(action)?.6:1);ball(ctx,screenX(f.ball),ground-(f.ballHeight??0)*r,ground,8*r/14,f.ball*r*mirror,!f.held)}
  if(f.scored)text(ctx,"进球",1010,294,18,"#ffd54f","right");
  const labels=SPECS[action].labels;
  labels.forEach((label,i)=>{const active=f.phase===i;ctx.fillStyle=active?'#ffd54f':'#1a2a3c';ctx.beginPath();ctx.roundRect(290+i*128,519,112,28,7);ctx.fill();text(ctx,label,346+i*128,539,14,active?'#142033':'#8495aa','center')});
}
// Ten additional replays share the original head-and-torso drawing style.
Object.assign(POSES,{
  defend:{lean:4,shiftX:.03,shiftY:-.14,headX:.17,headY:-.09},
  challenge:{lean:14,shiftX:.23,shiftY:-.12,headX:.43,headY:-.09},
  feint:{lean:-8,shiftX:-.18,shiftY:-.14,headX:-.20,headY:-.08,width:.86},
  shield:{lean:-6,shiftX:-.12,shiftY:-.18,headX:-.12,headY:-.12,width:.82},
  beaten:{lean:-19,shiftX:-.26,shiftY:-.14,headX:-.34,headY:-.07},
  whiff:{lean:25,shiftX:.36,shiftY:-.16,headX:.56,headY:-.10},
  intercept:{lean:12,shiftX:.19,shiftY:-.14,headX:.37,headY:-.08},
  block:{lean:3,shiftX:.06,shiftY:-.22,headX:.18,headY:-.14,width:1.13},
  impact:{lean:-10,shiftX:-.10,shiftY:-.20,headX:-.19,headY:-.10,width:1.08},
  keeperReady:{lean:7,shiftX:.03,shiftY:-.20,headX:.24,headY:-.13},
  dive:{lean:68,shiftX:.20,shiftY:.10,headX:0,rigid:true},
  diveLand:{lean:87,shiftX:.18,shiftY:-.35,headX:0,rigid:true},
  rise:{lean:38,shiftX:.10,shiftY:-.20,headX:0,rigid:true},
  scoop:{lean:38,shiftX:.16,shiftY:-.18,headX:0,rigid:true},
  hold:{lean:0,shiftX:0,shiftY:-.04,headX:0},
  cheer:{lean:-4,shiftX:0,shiftY:.48,headX:-.10,headY:.48},
  cheerLand:{lean:0,shiftX:0,shiftY:-.14,headX:0,headY:-.10},
});
Object.assign(SPECS,{
  press:{cycle:3.6,labels:['发现','靠近','减速','压迫']},
  tackle:{cycle:3.8,labels:['靠近','接触','夺球','控住']},
  dodge:{cycle:3.8,labels:['靠近','晃动','变向','突破']},
  shield:{cycle:3.8,labels:['来压','侧身','护住','转出']},
  beaten:{cycle:3.8,labels:['上抢','失手','失衡','恢复']},
  intercept:{cycle:3.8,labels:['送球','切入','接触','结果']},
  block:{cycle:3.8,labels:['射门','封线','碰撞','弹开']},
  scramble:{cycle:3.8,labels:['松球','争抢','先到','控住']},
  save:{cycle:4.2,labels:['准备','移动','接触','结果']},
  goal:{cycle:4.4,labels:['射门','入网','回应','收势']},
});
const EXTENDED=new Set(['press','tackle','dodge','shield','beaten','intercept','block','scramble','save','goal']);
const red='#e53935',blue='#1e6fff',yellow='#f5c518';
const man=(x,pose='stand',dir=1,color=blue,num='10',y=0)=>({...actor(x,pose,dir,num),color,y});
const running=t=>t%.26<.13?'runLow':'runHigh';
const seg=(t,a,b)=>clamp((t-a)/(b-a));
function pressFrame(t){
  const q=ease(seg(t,.3,1.7)),attacker=5+1.15*ease(seg(t,.3,1.1)),defender=lerp(14,8.3,q);
  const pose=t<.3?'stand':t<1.4?running(t):t<1.7?'brake':'defend';
  return {actors:[man(attacker,t<.3||t>1.1?'stand':running(t)),man(defender,pose,-1,red,'4')],ball:attacker+1.1,phase:t<.3?-1:t<.7?0:t<1.4?1:t<1.7?2:3};
}
function tackleFrame(t){
  const approach=ease(seg(t,.3,1.0)),a=lerp(4.6,6.0,approach),d=lerp(13.8,8.2,approach);
  const after=ease(seg(t,1.12,1.65)),dx=d-.48*after;
  return {actors:[man(a,t<.3?'stand':t<1?running(t):t<1.12?'beaten':t<1.6?'brake':'stand'),man(dx,t<.3?'stand':t<1?running(t):t<1.2?'challenge':t<1.65?'collect':'stand',-1,red,'4')],ball:t<1.0?a+1.1:lerp(7.1,dx-1.05,seg(t,1.0,1.42)),phase:t<.3?-1:t<1?0:t<1.12?1:t<1.65?2:3};
}
function dodgeFrame(t){
  let ax=4.1,ay=0,dx=12.4,dy=-1.1,ap='stand',dp='stand',phase=-1;
  if(t>=.3&&t<1.0){const q=ease(seg(t,.3,1));ax=lerp(4.1,6,q);dx=lerp(12.4,8.2,q);ap=running(t);dp=running(t);phase=0}
  else if(t>=1&&t<1.24){ax=6;dx=8.2;ap='feint';dp='challenge';phase=1}
  else if(t>=1.24){const q=ease(seg(t,1.24,2.35));ax=lerp(6,13,q);ay=.48*Math.sin(q*Math.PI);dx=lerp(8.2,9.2,ease(seg(t,1.24,1.65)));ap=t<1.34?'touch':t<2.35?running(t):t<2.55?'collect':'stand';dp=t<1.75?'beaten':t<2.15?'brake':'stand';phase=t<1.7?2:3}
  return {actors:[man(ax,ap,1,blue,'10',ay),man(dx,dp,-1,red,'4',dy)],ball:ax+1.1,ballY:ay,phase};
}
function shieldFrame(t){
  let ax=7,ay=0,dx=1.2,dy=0,ap='stand',dp='stand',ballX=8.1,ballY=0,phase=-1;
  if(t>=.3&&t<1){dx=lerp(1.2,4.9,ease(seg(t,.3,1)));ap=t<.68?'stand':'turn';dp=running(t);phase=0}
  else if(t>=1&&t<1.9){dx=4.9;ap='shield';dp='challenge';phase=t<1.2?1:2}
  else if(t>=1.9){const q=ease(seg(t,1.9,2.6));ax=lerp(7,10.8,q);ay=-1.25*Math.sin(q*Math.PI);dx=4.9+.45*ease(seg(t,1.9,2.2));ap=t<2.02?'turn':t<2.6?running(t):'stand';dp=t<2.2?'brake':'stand';ballX=ax+1.1;ballY=ay;phase=3}
  return {actors:[man(ax,ap,1,blue,'10',ay),man(dx,dp,1,red,'4',dy)],ball:ballX,ballY,phase};
}
function beatenFrame(t,cycle){
  const missed=cycle%2===0;
  if(!missed){const f=dodgeFrame(t);return {...f,note:'被过：重心失衡',phase:t<.3?-1:t<1?0:t<1.24?1:t<2.15?2:3}}
  const q=ease(seg(t,.3,1.02)),ax=lerp(7.3,10.4,q)+2.6*ease(seg(t,1.18,2.1));
  const dx=lerp(1.2,7.2,q)+.9*ease(seg(t,1.02,1.5));
  return {actors:[man(ax,t<.3||t>2.1?'stand':running(t)),man(dx,t<.3?'stand':t<1.02?running(t):t<1.5?'whiff':t<1.85?'beaten':t<2.1?'brake':'stand',1,red,'4')],ball:ax+1.1,phase:t<.3?-1:t<1.02?0:t<1.2?1:t<1.85?2:3,note:'扑空：没有碰到球'};
}
function interceptFrame(t,cycle){
  const won=cycle%2===0,contact=1.28;
  let bx=1.1,by=0,dx=8.85,dy=-1.8,dp='stand';
  if(t>=.55&&t<contact)bx=lerp(1.1,7.75,seg(t,.55,contact));
  if(t>=.68){dy=lerp(-1.8,won?0:-.8,ease(seg(t,.68,contact)));dp=t<contact?running(t):won?t<1.42?'intercept':t<1.66?'cushion':'stand':t<1.6?'whiff':'stand'}
  if(t>=contact){bx=won?lerp(7.75,7.9,ease(seg(t,contact,1.6))):lerp(7.75,13.55,seg(t,contact,1.92))}
  return {actors:[man(0,t<.35?'stand':t<.55?'passSet':t<.7?'passContact':t<1?'passFollow':'stand'),man(dx,dp,-1,red,'4',dy),man(14.5,!won&&t>=1.92&&t<2.14?'cushion':'stand',-1,blue,'8')],ball:bx,ballY:by,phase:t<.35?-1:t<.68?0:t<contact?1:t<1.42?2:3,note:won?'拦截成功':'慢一步：球穿过'};
}
function blockFrame(t){
  const contact=1.2;let bx=1.1,by=0,height=0;
  if(t>=.65&&t<contact){bx=lerp(1.1,8.8,seg(t,.65,contact));height=.65*Math.sin(seg(t,.65,contact)*Math.PI/2)}
  else if(t>=contact){const q=ease(seg(t,contact,1.9));bx=lerp(8.8,5.4,q);by=-1.55*q;height=.65*(1-q)+.5*Math.sin(q*Math.PI)}
  const dy=lerp(-1.8,0,ease(seg(t,.45,1.05)));
  return {actors:[kickActor(t,.65,'9'),man(9,t<.45?'stand':t<1.05?running(t):t<contact?'block':t<1.45?'impact':t<1.7?'collect':'stand',-1,red,'4',dy)],ball:bx,ballY:by,ballHeight:height,phase:t<.3?-1:t<.65?0:t<contact?1:t<1.45?2:3};
}
function scrambleFrame(t,cycle){
  const redWins=cycle%2===1,contact=1.36;
  const ax=lerp(1.5,redWins?5.3:7,ease(seg(t,.4,contact))),dx=lerp(15,redWins?9.2:10.8,ease(seg(t,.4,contact)));
  const bx=t<.4?lerp(7.4,7.9,1-Math.pow(1-seg(t,0,.4),2)):t<contact?7.9:t<1.7?lerp(7.9,redWins?dx-1.05:ax+1.05,ease(seg(t,contact,1.7))):redWins?dx-1.05:ax+1.05;
  const ap=t<.4?'stand':t<contact?running(t):redWins?'brake':t<1.52?'receiveContact':t<1.7?'cushion':'stand';
  const dp=t<.4?'stand':t<contact?running(t):!redWins?'brake':t<1.52?'receiveContact':t<1.7?'cushion':'stand';
  return {actors:[man(ax,ap),man(dx,dp,-1,red,'4')],ball:bx,phase:t<.4?0:t<contact?1:t<1.7?2:3,note:redWins?'红队先到':'蓝队先到'};
}
function heldBall(a){const p=POSES[a.pose],angle=p.lean*Math.PI/180;return {ball:a.x+a.dir*(p.shiftX+1.4*Math.sin(angle)),ballY:a.y,ballHeight:.322+p.shiftY+1.4*Math.cos(angle),held:true}}
function saveFrame(t,cycle){
  const variant=cycle%3,claim=variant===2,caught=variant!==1,contact=claim?1.35:1.25;
  let kx=14.4,kp='keeperReady',bx=1.1,by=0,height=0,phase=t<.35?-1:0;
  if(claim){
    kx=lerp(14.4,10.2,ease(seg(t,.45,contact)));kp=t<.45?'keeperReady':t<contact?running(t):t<1.7?'scoop':t<2.05?'rise':'hold';
    if(t>=.55)bx=lerp(1.1,9.1,seg(t,.55,contact));
  }else{
    kx=lerp(14.4,13.2,ease(seg(t,.65,1.06)));kp=t<1.06?'keeperReady':t<1.5?'dive':t<1.92?'diveLand':t<2.4?'rise':caught?'hold':'stand';
    if(t>=.55&&t<contact){const q=seg(t,.55,contact),target=heldBall(man(13.2,'dive',-1,yellow,'1'));bx=lerp(1.1,target.ball,q);height=target.ballHeight*Math.sin(q*Math.PI/2)}
    if(t>=contact&&!caught){const target=heldBall(man(13.2,'dive',-1,yellow,'1')),q=ease(seg(t,contact,2));bx=lerp(target.ball,8.2,q);by=-1.55*q;height=target.ballHeight*(1-q)+.4*Math.sin(q*Math.PI)}
  }
  const keeper=man(kx,kp,-1,yellow,'1');
  if(t>=contact&&caught){const held=heldBall(keeper);if(t<contact+.18&&claim){const q=ease(seg(t,contact,contact+.18));bx=lerp(9.1,held.ball,q);height=held.ballHeight*q}else{bx=held.ball;height=held.ballHeight}}
  if(t>=.55&&t<contact)phase=1;else if(t>=contact&&t<contact+.25)phase=2;else if(t>=contact+.25)phase=3;
  return {actors:[kickActor(t,.55,'9'),keeper],ball:bx,ballY:by,ballHeight:height,held:t>=contact&&caught,phase,goal:true,note:claim?'出击收球':caught?'扑救：抱住':'扑救：扑出'};
}
function goalFrame(t){
  const strike=.65,arrival=1.21,ballX=t<strike?5.1:lerp(5.1,16.45,seg(t,strike,arrival));
  const cheer=t>=arrival+.16&&t<2.45;
  const ap=t<.3?'stand':t<strike?'shotSet':t<.78?'shotContact':t<1.02?'shotFollow':cheer?(t-arrival-.16)%.50<.27?'cheer':'cheerLand':'stand';
  const teammateX=lerp(.8,2.5,ease(seg(t,arrival+.12,2.2))),tp=t<arrival+.12?'stand':t<2.2?running(t):t<2.6?'cheer':'stand';
  const scorer=kickActor(t,strike,'9',4);if(t>=arrival+.16){scorer.pose=ap;scorer.x=4.52}
  const keeperPose=t<.96?'keeperReady':t<1.45?'dive':t<1.9?'diveLand':t<2.3?'rise':'beaten';
  return {actors:[scorer,man(teammateX,tp,1,blue,'8',-1.15),man(14.4,keeperPose,-1,yellow,'1',-.85)],ball:ballX,ballHeight:t>=strike&&t<arrival?Math.sin(seg(t,strike,arrival)*Math.PI)*.65:0,phase:t<.3?-1:t<arrival?0:t<arrival+.16?1:t<2.6?2:3,goal:true,note:t>=arrival?'进球':'射门',scored:t>=arrival};
}
Object.assign(SAMPLERS,{press:pressFrame,tackle:tackleFrame,dodge:dodgeFrame,shield:shieldFrame,beaten:beatenFrame,intercept:interceptFrame,block:blockFrame,scramble:scrambleFrame,save:saveFrame,goal:goalFrame});

// Revision two: contact releases the ball immediately; winners leave the duel tile.
const CELL_SIDE=7/1.7027;
function kickActor(t,contact,num='9',base=0,color=blue,y=0){
  let x=base-.55,pose='stand';
  if(t>=contact-.35&&t<contact-.025)pose='shotSet';
  else if(t>=contact-.025&&t<contact){x=lerp(base-.55,base,seg(t,contact-.025,contact));pose='shotSet'}
  else if(t>=contact){x=base+.52*ease(seg(t,contact+.08,contact+.32));pose=t<contact+.08?'shotContact':t<contact+.32?'shotFollow':t<contact+.52?'shotLand':t<contact+.70?'collect':'stand'}
  return man(x,pose,1,color,num,y);
}
function shootFrame(t){
  const contact=1.0,arrival=1.49;
  const a=kickActor(t,contact,'9');
  if(t<.28){a.x=-1.45;a.pose='stand'}
  else if(t<.65){a.x=lerp(-1.45,-.55,ease(seg(t,.28,.65)));a.pose=running(t)}
  const u=seg(t,contact,arrival);
  return {actors:[a],ball:t<contact?1.1:lerp(1.1,15.9,u),ballHeight:t>=contact&&t<arrival?Math.sin(u*Math.PI)*.8:0,phase:t<.28?-1:t<.65?0:t<contact?1:t<contact+.08?2:3,goal:true};
}
function carryOut(x,y,t,start,dir=1){
  const q=ease(seg(t,start,start+.9)),at=x+dir*CELL_SIDE*q;
  const pose=t<start?'turn':t<start+.08?'touch':t<start+.9?running(t):t<start+1.05?'collect':'stand';
  return {actor:man(at,pose,dir,dir===1?red:blue,dir===1?'4':'10',y),ball:at+dir*1.1,ballY:y};
}
function tackleFrame(t){
  const contact=1.0,approach=ease(seg(t,.3,contact));
  const ax=lerp(4.6,6,approach),dx=lerp(13.8,8.2,approach);
  const attacker=man(ax,t<.3?'stand':t<contact?running(t):t<1.22?'beaten':t<1.42?'brake':'stand');
  if(t<contact)return {actors:[attacker,man(dx,t<.3?'stand':running(t),-1,red,'4')],ball:ax+1.1,phase:t<.3?-1:0};
  if(t<1.24){const q=ease(seg(t,contact,1.24));return {actors:[attacker,man(8.2,t<1.10?'challenge':'turn',t<1.12?-1:1,red,'4')],ball:lerp(7.1,9.3,q),ballY:.38*Math.sin(q*Math.PI),phase:t<1.10?1:2}}
  const out=carryOut(8.2,0,t,1.24);
  return {actors:[attacker,out.actor],ball:out.ball,ballY:out.ballY,phase:t<2.14?2:3,note:'抢断成功 · 带到右侧一格',winner:'red',exitOrigin:8.2,exitTarget:8.2+CELL_SIDE};
}
function swayAt(q){
  const keys=[[0,0],[.2,.44],[.5,-1.18],[.76,.44],[1,0]];
  for(let i=1;i<keys.length;i++)if(q<=keys[i][0])return lerp(keys[i-1][1],keys[i][1],ease((q-keys[i-1][0])/(keys[i][0]-keys[i-1][0])));
  return 0;
}
function dodgeFrame(t){
  let ax=4.1,ay=0,dx=12.4,dy=-1.1,ap='stand',dp='stand',phase=-1;
  if(t>=.3&&t<.95){const q=ease(seg(t,.3,.95));ax=lerp(4.1,6,q);dx=lerp(12.4,8.5,q);ap=running(t);dp=running(t);phase=0}
  else if(t>=.95&&t<1.65){ax=6;dx=8.5;ay=swayAt(seg(t,.95,1.65));ap=t<1.14||t>=1.48?'feint':'turn';dp='defend';dy=lerp(-1.1,-1.45,ease(seg(t,1.18,1.5)));phase=1}
  else if(t>=1.65){const q=ease(seg(t,1.65,2.65));ax=lerp(6,13.5,q);ay=.46*Math.sin(q*Math.PI);dx=lerp(8.5,9.05,ease(seg(t,1.65,2.0)));dy=-1.45;ap=t<1.73?'touch':t<2.65?running(t):t<2.82?'collect':'stand';dp=t<2.14?'beaten':t<2.42?'brake':'stand';phase=t<2.05?2:3}
  return {actors:[man(ax,ap,1,blue,'10',ay),man(dx,dp,-1,red,'4',dy)],ball:ax+1.1,ballY:ay,phase};
}
function beatenFrame(t,cycle){
  if(cycle%2===1){const f=dodgeFrame(t);return {...f,note:'被过：上下晃动后带球离开'}}
  const q=ease(seg(t,.3,1.02)),ax=lerp(7.3,9.3,q),dx=lerp(1.2,7.1,q)+.5*ease(seg(t,1.02,1.5));
  const defender=man(dx,t<.3?'stand':t<1.02?running(t):t<1.5?'whiff':t<1.85?'beaten':t<2.1?'brake':'stand',1,red,'4');
  const leave=ease(seg(t,1.02,1.92)),px=ax+CELL_SIDE*leave;
  return {actors:[man(px,t<.3||t>2.08?'stand':t<1.92?running(t):'collect'),defender],ball:px+1.1,phase:t<.3?-1:t<1.02?0:t<1.15?1:t<1.92?2:3,note:'抢断失败 · 原持球者带到右侧一格',winner:'blue',exitOrigin:9.3,exitTarget:9.3+CELL_SIDE};
}
Object.assign(POSES,{
  slide:{lean:-68,shiftX:.15,shiftY:-.30,headX:0,rigid:true},
  slideStop:{lean:-82,shiftX:.14,shiftY:-.34,headX:0,rigid:true},
  slideRise:{lean:-35,shiftX:.06,shiftY:-.16,headX:0,rigid:true},
  hop:{lean:6,shiftX:.08,shiftY:.42,headX:.25,headY:.42},
  headLoad:{lean:-8,shiftX:-.08,shiftY:-.14,headX:-.10,headY:-.1},
  headJump:{lean:-5,shiftX:-.04,shiftY:.40,headX:.10,headY:.40},
  headHigh:{lean:-4,shiftX:-.03,shiftY:.65,headX:.10,headY:.65},
  headStrike:{lean:14,shiftX:.18,shiftY:.65,headX:.40,headY:.65},
  headLose:{lean:2,shiftX:.03,shiftY:.35,headX:.10,headY:.35},
  headFollow:{lean:18,shiftX:.23,shiftY:.43,headX:.42,headY:.43},
  headLand:{lean:4,shiftX:.03,shiftY:-.15,headX:.16,headY:-.10},
});
Object.assign(SPECS,{
  dodge:{cycle:4.1,labels:['靠近','上下晃动','变向','突破']},
  beaten:{cycle:4.1,labels:['上抢','失手','带走','恢复']},
  slide:{cycle:4.5,labels:['贴近','滑入','夺球','起身带走']},
  cross:{cycle:4.0,labels:['准备','传中','飞行','接应']},
  header:{cycle:4.2,labels:['判断','起跳','争顶','落地']},
  rebound:{cycle:4.0,labels:['射门','扑出','补射','结果']},
  clearance:{cycle:3.8,labels:['来球','准备','解围','收势']},
});
for(const action of ['slide','cross','header','rebound','clearance'])EXTENDED.add(action);
function slideFrame(t,cycle){
  const won=cycle%2===0,contact=1.2;
  let dx=2.2,dp='stand',dy=-.75,ax=8,ap='stand';
  if(t>=.3&&t<.85){dx=lerp(2.2,5.5,ease(seg(t,.3,.85)));dp=running(t)}
  else if(t>=.85&&t<contact){dx=lerp(5.5,8,seg(t,.85,contact));dp='slide';ap='hop'}
  else if(t>=contact){dx=lerp(8,8.6,ease(seg(t,contact,1.5)));dp=t<1.52?'slide':t<1.95?'slideStop':t<2.24?'slideRise':'stand';ap=t<1.42?'hop':t<1.7?'brake':'stand';ax=won?lerp(8,6.9,ease(seg(t,1.42,1.9))):8+CELL_SIDE*ease(seg(t,contact,2.1));if(!won&&t>=1.42&&t<2.1)ap=running(t)}
  let bx=9.1,by=-.75;
  if(t>=contact&&won){bx=dx+1.1;if(t>=2.24){dx=8.6+CELL_SIDE*ease(seg(t,2.24,3.14));dp=t<3.14?running(t):t<3.3?'collect':'stand';bx=dx+1.1}}
  else if(t>=contact){bx=ax+1.1}
  return {actors:[man(ax,ap,1,blue,'10',-.75),man(dx,dp,1,red,'4',dy)],ball:bx,ballY:by,phase:t<.3?-1:t<.85?0:t<contact?1:t<2.24?2:3,note:won?'铲球成功 · 起身带到旁边一格':'铲球失败 · 持球者带到旁边一格',winner:won?'red':'blue'};
}
function crossFrame(t){
  const contact=.75,arrival=1.88,u=seg(t,contact,arrival),a=kickActor(t,contact,'7');
  return {actors:[a,man(14.5,t<1.65?'stand':t<arrival?'receiveReady':t<2.02?'receiveContact':t<2.25?'cushion':'stand',-1,blue,'9',-.85)],ball:t<contact?1.1:lerp(1.1,13.4,u),ballY:-.85*u,ballHeight:t>=contact&&t<arrival?3.5*Math.sin(u*Math.PI):0,phase:t<.4?-1:t<contact?0:t<contact+.08?1:t<arrival?2:3};
}
function headerFrame(t,cycle){
  const attackWins=cycle%2===0,contact=1.42;
  const approach=ease(seg(t,.3,1.0)),ax=lerp(5.8,8.15,approach),dx=lerp(13,11.15,approach);
  let ap='stand',dp='stand';
  if(t>=.3&&t<1.0){ap=running(t);dp=running(t)}
  else if(t>=1.0&&t<1.14){ap=dp='headLoad'}
  else if(t>=1.14&&t<1.3){ap=dp='headJump'}
  else if(t>=1.3&&t<contact){ap=attackWins?'headHigh':'headLose';dp=attackWins?'headLose':'headHigh'}
  else if(t>=contact&&t<1.52){ap=attackWins?'headStrike':'headLose';dp=attackWins?'headLose':'headStrike'}
  else if(t>=1.52&&t<1.72){ap=attackWins?'headFollow':'headLose';dp=attackWins?'headLose':'headFollow'}
  else if(t>=1.72&&t<1.93){ap=dp='headLand'}
  const hitX=attackWins?8.15+.40+.60+8/14:11.15-.40-.60-8/14;
  const hitY=attackWins?0:-.8,hitHeight=3.4+.65-6/14;
  let bx=1.1,by=hitY,h=hitHeight;
  if(t>=.3&&t<contact){const q=seg(t,.3,contact);bx=lerp(1.1,hitX,q);h=hitHeight+.40*Math.sin(q*Math.PI)}
  else if(t>=contact){const q=seg(t,contact,attackWins?1.96:2.2);bx=lerp(hitX,attackWins?16.45:1.5,q);by=lerp(hitY,attackWins?0:-1.1,q);h=attackWins?lerp(hitHeight,1.0,q):lerp(hitHeight,0,q)+.5*Math.sin(q*Math.PI)}
  return {actors:[man(ax,ap,1,blue,'9'),man(dx,dp,-1,red,'4',-.8)],ball:bx,ballY:by,ballHeight:h,phase:t<.3?-1:t<1.14?0:t<contact?1:t<1.72?2:3,goal:true,note:attackWins?'攻方争顶成功 · 头球攻门':'守方争顶成功 · 头球解围',winner:attackWins?'blue':'red',scored:attackWins&&t>=1.96,headContact:contact};
}
function reboundFrame(t){
  const first=.55,parry=1.15,second=1.50,arrival=1.88;
  let bx=1.1,h=0;
  if(t>=first&&t<parry){const q=seg(t,first,parry);bx=lerp(1.1,11.7,q);h=.95*Math.sin(q*Math.PI/2)}
  else if(t>=parry&&t<second){const q=seg(t,parry,second);bx=lerp(11.7,9.2,q);h=.95*(1-q)+.25*Math.sin(q*Math.PI)}
  else if(t>=second){const q=seg(t,second,arrival);bx=lerp(9.2,16.45,q);h=.9*q+1.3*Math.sin(q*Math.PI)}
  const finisher=kickActor(t,second,'9',8.1);
  if(t<.7){finisher.x=6.8;finisher.pose='stand'}else if(t<second-.35){finisher.x=lerp(6.8,7.55,ease(seg(t,.7,second-.35)));finisher.pose=running(t)}
  const keeperPose=t<1.0?'keeperReady':t<1.45?'dive':t<2.0?'diveLand':t<2.4?'rise':'beaten';
  return {actors:[kickActor(t,first,'10'),finisher,man(13.2,keeperPose,-1,yellow,'1')],ball:bx,ballHeight:h,phase:t<.2?-1:t<parry?0:t<second?1:t<arrival?2:3,goal:true,scored:t>=arrival,note:t<parry?'第一次射门':t<second?'扑出 · 跟进':t<arrival?'触球即补射':'补射进球'};
}
function clearanceFrame(t){
  const contact=1.15,u=seg(t,contact,1.82),kicker=kickActor(t,contact,'4',0,blue,-1);
  kicker.x=11.5-(kicker.x);kicker.dir=-1;
  const incoming=lerp(16,10.4,seg(t,.3,contact));
  return {actors:[kicker,man(lerp(4.9,7.8,ease(seg(t,.3,1.05))),t<.3||t>1.05?'stand':running(t),1,red,'9')],ball:t<contact?incoming:lerp(10.4,1.0,u),ballY:-1,ballHeight:t>=contact&&t<1.82?3.65*Math.sin(Math.PI*Math.sqrt(u)):0,phase:t<.3?-1:t<.8?0:t<contact?1:t<1.4?2:3,note:'防守解围 · 踢离危险区域'};
}
Object.assign(SAMPLERS,{shoot:shootFrame,tackle:tackleFrame,dodge:dodgeFrame,beaten:beatenFrame,slide:slideFrame,cross:crossFrame,header:headerFrame,rebound:reboundFrame,clearance:clearanceFrame});

// Sixty authored replays. Each timeline describes a separate football situation.
Object.assign(POSES,{
 headLow:{lean:2,shiftX:.03,shiftY:.05,headX:.10,headY:.05},
 watch:{lean:0,shiftX:0,shiftY:-.03,headX:.24,width:.92},
 tired:{lean:13,shiftX:.12,shiftY:-.26,headX:.25,headY:-.08},
 tiredRun:{lean:14,shiftX:.14,shiftY:-.19,headX:.3,headY:-.07},
 chestReady:{lean:-10,shiftX:-.08,shiftY:-.08,headX:-.13,width:1.1},
 chestCushion:{lean:-16,shiftX:-.14,shiftY:-.18,headX:-.20,headY:-.07},
 volley:{lean:24,shiftX:.25,shiftY:.12,headX:.40,headY:.08,width:.9},
 feintShot:{lean:16,shiftX:.22,shiftY:-.12,headX:.4,width:.82},
 lookBack:{lean:-3,shiftX:0,shiftY:0,headX:-.3,width:.8},
 charge:{lean:14,shiftX:.23,shiftY:-.17,headX:.38,width:.88},
 absorb:{lean:-14,shiftX:-.2,shiftY:-.18,headX:-.24,width:.9},
 highCatch:{lean:-3,shiftX:0,shiftY:.5,headX:0,headY:.5,width:1.08},
 punch:{lean:16,shiftX:.2,shiftY:.55,headX:.3,headY:.55,width:1.08},
 kneel:{lean:32,shiftX:.18,shiftY:-.35,headX:0,rigid:true},
 throwSet:{lean:-15,shiftX:-.16,shiftY:-.10,headX:-.24,width:.85},
 throwFollow:{lean:19,shiftX:.25,shiftY:.02,headX:.42,width:1.08},
 wall:{lean:0,shiftX:0,shiftY:-.16,headX:0,width:1.1},
 wallJump:{lean:-4,shiftX:0,shiftY:.55,headX:-.05,headY:.55,width:1.1},
 disappointed:{lean:15,shiftX:.08,shiftY:-.12,headX:.35,headY:-.13},
 acknowledge:{lean:9,shiftX:.08,shiftY:-.02,headX:.23,width:.9},
 collideFall:{lean:75,shiftX:.16,shiftY:-.28,headX:0,rigid:true},
 roll:{lean:105,shiftX:.08,shiftY:-.2,headX:0,rigid:true},
 stopSignal:{lean:-7,shiftX:-.05,shiftY:-.05,headX:-.1,width:1.13},
});
const AUTHORED={};
// Keyframes: time, x, depth, pose, facing. Ball frames: time, x, depth, height.
const K=(t,x,y=0,p='stand',d=1)=>[t,x,y,p,d];
const B=(t,x,y=0,h=0)=>[t,x,y,h];
const A=(num,color,frames)=>({num:String(num),color,frames});
const P=(num,frames)=>A(num,blue,frames),D=(num,frames)=>A(num,red,frames),G=frames=>A(1,yellow,frames);
function keyPair(frames,t){let i=0;while(i+1<frames.length&&frames[i+1][0]<=t)i++;return [frames[i],frames[Math.min(i+1,frames.length-1)]]}
function author(id,title,category,description,labels,actors,balls,options={}){
 const action='a'+id;
 AUTHORED[action]={id,title,category,description,actors,balls,...options};
 SPECS[action]={cycle:options.cycle??4.4,labels,worldStart:options.goal?77:27,radius:options.radius};EXTENDED.add(action);
 SAMPLERS[action]=(t,cycle)=>{
  const s=options.variant?options.variant(cycle):AUTHORED[action];
  const people=s.actors.map(a=>{const [v,w]=keyPair(a.frames,t),q=v===w?0:ease(seg(t,v[0],w[0])),x=lerp(v[1],w[1],q),y=lerp(v[2],w[2],q);let pose=v[3];if(pose==='run')pose=running(t);if(pose==='sprint')pose=t%.22<.11?'sprintLow':'sprintHigh';return man(x,pose,v[4],a.color,a.num,y)});
  const marks=SPECS[action].marks??[.25,.8,1.5,2.5];
  const f={actors:people,phase:t<marks[0]?-1:t<marks[1]?0:t<marks[2]?1:t<marks[3]?2:3,note:typeof s.note==='function'?s.note(t,cycle):s.note,goal:s.goal??false};
  if(s.balls?.length){const [v,w]=keyPair(s.balls,t),q=v===w?0:seg(t,v[0],w[0]);f.ball=lerp(v[1],w[1],q);f.ballY=lerp(v[2],w[2],q);f.ballHeight=lerp(v[3],w[3],q)}
  if(s.scoredAt!==undefined)f.scored=t>=s.scoredAt;
  if(s.heldBetween)f.held=t>=s.heldBetween[0]&&t<s.heldBetween[1];
  return f;
 };
}
const kickKeys=(x=0,c=.8,y=0,dir=1)=>[K(0,x-.55*dir,y,'stand',dir),K(c-.35,x-.55*dir,y,'shotSet',dir),K(c-.025,x-.55*dir,y,'shotSet',dir),K(c,x,y,'shotContact',dir),K(c+.09,x+.2*dir,y,'shotFollow',dir),K(c+.35,x+.52*dir,y,'shotLand',dir),K(c+.6,x+.52*dir,y,'stand',dir)];
const readyKeys=(x,y=0,c=1.5,dir=-1)=>[K(0,x,y,'watch',dir),K(c-.3,x,y,'receiveReady',dir),K(c,x,y,'receiveContact',dir),K(c+.14,x,y,'cushion',dir),K(c+.4,x,y,'stand',dir)];

author(21,'直塞与前插配合','现有机制','传向身前空当；接球者前插，防守者跟追，接到后继续带球。',['观察','直塞','前插','带走'],[
 P(8,kickKeys()),P(9,[K(0,8,-.8,'watch'),K(.65,8,-.8,'sprint'),K(1.6,12.7,0,'receiveContact'),K(1.75,12.7,0,'touch'),K(2.65,16,0,'collect')]),D(4,[K(0,7.4,-1.2,'watch'),K(.85,7.4,-1.2,'run'),K(2.4,12.6,-1.0,'brake'),K(2.7,12.6,-1,'stand')])
],[B(0,1.1),B(.8,1.1),B(1.6,13.8),B(2.65,17.1)],{note:'球送到空当 · 队友同步前插'});
author(22,'接应与拉边','现有机制','队友向两侧展开，转向持球者，提供两个传球选择。',['观察','展开','接应','送球'],[
 P(6,[K(0,1),K(1.8,1,0,'passSet'),K(2.1,1,0,'passContact'),K(2.3,1.3,0,'passFollow')]),P(7,[K(0,8,-.2,'run'),K(1.2,10,-1.25,'brake',-1),K(1.5,10,-1.25,'receiveReady',-1),K(2.9,10,-1.25,'cushion',-1)]),P(8,[K(0,5,-.7,'run'),K(1.4,6,.3,'brake',-1),K(1.6,6,.3,'receiveReady',-1)])
],[B(0,2.1),B(2.1,2.1),B(2.9,8.9,-1.25)],{note:'拉开宽度 · 给持球人传球选择'});
author(23,'盯人跟跑','现有机制','进攻者先向前再折向另一侧；防守者跟随并占据球门侧。',['识别','跟随','转向','盯住'],[
 P(9,[K(0,3,-1,'run'),K(1,8,-1,'run'),K(1.5,9,.3,'run'),K(2.5,13,.3,'brake'),K(2.8,13,.3,'watch')]),D(4,[K(0,5,-.8,'run'),K(1.1,10,-.8,'defend',-1),K(1.6,11,.1,'run'),K(2.6,15,.1,'defend',-1)]),P(8,[K(0,0)])
],[B(0,1.1)],{note:'攻方改变跑位 · 守方保持球门侧'});
author(24,'补位与封锁线路','现有机制','一名防守者上抢，另一名横移保护身后，封住向前线路。',['上抢','补位','封线','站稳'],[
 P(10,[K(0,5),K(.6,6,0,'touch'),K(1.5,6,0,'shield')]),D(4,[K(0,10,.3,'run',-1),K(1.25,8.3,.3,'defend',-1)]),D(5,[K(0,13,-1.3,'run',-1),K(1.4,11,-.1,'brake',-1),K(1.65,11,-.1,'defend',-1)]),P(9,[K(0,15,-1,'watch',-1)])
],[B(0,6.1),B(.6,7.1)],{note:'一人压迫 · 一人保护身后'});
author(25,'远距离回追压迫','现有机制','防守者持续追赶但未形成接触；持球者保持推进，不演出隔空抢断。',['发现','回追','追赶','压迫'],[
 P(10,[K(0,7,0,'run'),K(2.4,15,0,'collect')]),D(4,[K(0,0,-.5,'sprint'),K(2.5,10.8,-.5,'brake'),K(2.8,10.8,-.5,'defend')])
],[B(0,8.1),B(2.4,16.1)],{note:'仍未接触 · 球权保持不变'});
author(26,'对抗造成球松脱','现有机制','双方贴近对抗，球滚离接触位置；两人转向自由球。',['靠近','对抗','松球','再追'],[
 P(10,[K(0,5,0,'run'),K(1,7,0,'charge'),K(1.2,7,0,'absorb'),K(1.6,7,0,'run'),K(2.6,11,.3,'receiveReady')]),D(4,[K(0,12,-.6,'run',-1),K(1,9,-.6,'charge',-1),K(1.2,9,-.6,'absorb',-1),K(1.6,9,-.6,'run'),K(2.6,13,-.1,'defend',-1)])
],[B(0,6.1),B(1,8.1),B(1.6,11.5,.3),B(2.6,12.1,.3)],{note:'双方都未控住 · 球先滚离争抢点'});
author(27,'射偏与第二落点响应','现有机制','按当前游戏判定，射偏后形成门前自由球，双方争抢第二落点。',['起脚','偏出','响应','争球'],[
 P(9,kickKeys()),G([K(0,14,0,'keeperReady',-1),K(1.4,14,-.6,'lookBack',-1)]),P(8,[K(0,5,-1,'watch'),K(1.5,5,-1,'sprint'),K(2.6,12,-.9,'receiveReady')]),D(4,[K(0,10,.1,'defend',-1),K(1.5,10,.1,'run'),K(2.6,13,-.5,'defend',-1)])
],[B(0,1.1),B(.8,1.1),B(1.4,16.1,-1.15,.5),B(1.7,13.1,-.9),B(2.6,13.1,-.9)],{goal:true,note:'射偏 · 按现有机制形成门前自由球'});
author(28,'门将出击与攻方抢先接球','现有机制','双方赶往同一落点，轮流展示门将先控制球和进攻者先接到。',['判断','出击','争先','控球'],[],[],{goal:true,variant:cycle=>{
 const win=cycle%2===0;return {goal:true,note:win?'门将抢先 · 抱住来球':'攻方抢先 · 带离门将',heldBetween:win?[1.4,4.4]:null,actors:[P(9,[K(0,3,-.7,'sprint'),K(1.4,win?7:8,-.7,win?'brake':'receiveContact'),K(1.6,win?7:8,-.7,win?'watch':'touch'),K(2.5,win?7:12.1,-.7,'stand')]),G([K(0,14,-.7,'run',-1),K(1.4,10,-.7,win?'scoop':'brake',-1),K(1.7,10,-.7,win?'hold':'beaten',-1),K(2.2,10,-.7,win?'hold':'keeperReady',-1)])],balls:[B(0,1.1,-.7),B(1.4,8.9,-.7),B(1.7,win?9.05:9.1,-.7,win?1.5:0),B(2.5,win?9.05:13.2,-.7,win?1.5:0)]};
}});
author(29,'等待与观察','状态衔接','球从队友之间传递；等待中的球员转向球，轻微调整重心。',['等待','观察','转向','准备'],[
 P(6,[K(0,7,-.8,'watch',-1),K(1.2,7,-.8,'turn'),K(1.5,7,-.8,'watch'),K(2.6,7,-.8,'receiveReady')]),P(8,kickKeys()),P(7,readyKeys(14.5,.2,1.6))
],[B(0,1.1),B(.8,1.1),B(1.6,13.4,.2)],{note:'等待球员随球转头 · 调整准备姿态'});
author(30,'球权变化后的反应','状态衔接','夺球者转向并带离，丢球者收势、回望球，再准备下一动作。',['接触','易主','转向','衔接'],[
 P(10,[K(0,6,0,'touch'),K(.8,6,0,'absorb'),K(1.1,6,0,'brake'),K(1.7,6,0,'lookBack'),K(2.5,6,0,'defend')]),D(4,[K(0,9,-.6,'challenge',-1),K(.8,8.2,0,'receiveContact',-1),K(1.1,8.2,0,'turn'),K(1.4,8.2,0,'touch'),K(2.5,12.311,0,'collect')])
],[B(0,7.1),B(.8,7.1),B(1.4,9.3),B(2.5,13.411)],{note:'夺球者带离 · 丢球者重新关注球'});
author(31,'疲劳姿态','状态衔接','两名球员在相同时长内移动相同距离；低体力者躯干更下沉，停步后恢复姿态。',['启动','跑动','停步','恢复'],[
 P(8,[K(0,1,0,'run'),K(2.0,9,0,'brake'),K(2.3,9,0,'stand')]),P(6,[K(0,5,0,'tiredRun'),K(2.0,13,0,'tired'),K(3.5,13,0,'tired')])
],[],{note:'左：正常体力 · 右：低体力姿态'});
author(32,'进球后回位与重新开球','状态衔接','庆祝收势，双方回到站位，失球方在中圈开球。',['庆祝','回位','准备','开球'],[
 P(9,[K(0,11,0,'cheer'),K(.7,11,0,'run',-1),K(1.8,5,-.8,'watch')]),D(9,[K(0,14,-.7,'disappointed',-1),K(.7,14,-.7,'run',-1),K(1.8,8.2,0,'stand',-1),K(2.5,8.2,0,'passContact',-1),K(2.7,8,0,'passFollow',-1)]),D(8,[K(0,12,.3,'run',-1),K(1.8,3,.3,'receiveReady'),K(3.1,3,.3,'cushion')])
],[B(0,16.1),B(.7,16.1),B(1.8,7.1),B(2.5,7.1),B(3.1,4.1,.3)],{note:t=>t<1.8?'进球后回到阵型':'失球方重新开球',cycle:4.8});
author(33,'赛前就位与首次开球','状态衔接','双方进入初始位置，开球队员准备后传给队友。',['入场','就位','准备','开球'],[
 P(9,[K(0,1,.3,'run'),K(1.2,8,0,'stand'),K(1.8,8,0,'passSet'),K(2.2,8,0,'passContact'),K(2.4,8.3,0,'passFollow')]),P(8,[K(0,0,-1,'run'),K(1.2,3,-.8,'receiveReady'),K(2.8,3,-.8,'receiveContact')]),D(9,[K(0,17,.3,'run',-1),K(1.2,12,-.6,'defend',-1)])
],[B(0,9.1),B(2.2,9.1),B(2.8,4.1,-.8)],{note:'先就位 · 再开球'});
author(34,'中场休息与下半场回位','状态衔接','哨停后放松、退向场边，短暂休息，再返回下半场站位。',['哨停','休息','回场','就位'],[
 P(8,[K(0,7,0,'brake'),K(.5,7,0,'run',-1),K(1.2,1,.3,'tired'),K(2.2,1,.3,'run'),K(3.4,6,-.8,'watch')]),D(8,[K(0,11,-.8,'brake',-1),K(.5,11,-.8,'run'),K(1.2,16,.3,'tired',-1),K(2.2,16,.3,'run',-1),K(3.4,12,-.8,'watch',-1)])
],[],{cycle:4.9,note:t=>t<2.2?'中场休息':'下半场返回站位'});
author(35,'换人上下场','状态衔接','被换下球员来到场边，与替补短暂致意；替补进入原位置。',['离位','交接','上场','接替'],[
 P(8,[K(0,9,-.8,'run',-1),K(1.2,3,0,'acknowledge',-1),K(1.7,3,0,'run',-1),K(2.8,0,.3,'stand')]),P(12,[K(0,1,.3,'watch'),K(1.2,1,.3,'acknowledge'),K(1.7,1,.3,'run'),K(2.8,9,-.8,'receiveReady')])
],[],{note:'8号下场 · 12号接替位置'});
author(36,'终场反应','状态衔接','轮流展示胜负和平局：先停步，再庆祝、失落或互相致意。',['终场','停步','回应','收势'],[],[],{variant:c=>({note:c%2?'平局 · 双方致意':'蓝队获胜 · 红队失落',actors:[P(9,[K(0,6,0,'brake'),K(.7,6,0,c%2?'acknowledge':'cheer'),K(1.2,6,0,c%2?'stand':'cheerLand'),K(1.6,6,0,c%2?'acknowledge':'cheer'),K(2.5,6,0,'stand')]),D(4,[K(0,11,-.8,'brake',-1),K(.7,11,-.8,c%2?'acknowledge':'disappointed',-1),K(2.5,11,-.8,c%2?'stand':'tired',-1)])],balls:[]})});

author(37,'一脚出球','扩展动作','提前迎球；接触后立即回传，没有停球等待。',['迎球','接触','回传','收势'],[
 P(8,kickKeys()),P(9,[K(0,13,0,'watch',-1),K(1.2,13,0,'passSet',-1),K(1.5,13,0,'passContact',-1),K(1.6,12.8,0,'passFollow',-1),K(2,12.8,0,'stand',-1)])
],[B(0,1.1),B(.8,1.1),B(1.5,11.9),B(2.2,1.5)],{note:'触球后的下一帧直接传走'});
author(38,'撞墙式二过一','扩展动作','A传球后继续前跑，B一脚回传，A从防守者身旁穿过接球。',['传出','前跑','回做','突破'],[
 P(10,[K(0,0),K(.7,0,0,'passContact'),K(.85,.4,0,'run'),K(1.6,9,.3,'receiveContact'),K(2.5,14.5,.3,'collect')]),P(8,[K(0,8.5,-1,'receiveReady',-1),K(1.15,8.5,-1,'passContact'),K(1.3,8.8,-1,'passFollow'),K(1.6,8.8,-1,'watch')]),D(4,[K(0,6,0,'defend',-1),K(1,6.5,-.7,'challenge',-1),K(1.5,7,-.7,'beaten'),K(2.4,10,-.7,'run')])
],[B(0,1.1),B(.7,1.1),B(1.15,7.4,-1),B(1.6,10.1,.3),B(2.5,15.6,.3)],{note:'传球后继续跑 · 队友一脚回做'});
author(39,'高空长传转移','扩展动作','球越过中间防守者，落到另一侧队友身前。',['观察','长传','飞越','接球'],[
 P(6,kickKeys(0,.8,.3)),D(8,[K(0,7,-.4,'watch',-1),K(1.2,7,-.4,'lookBack',-1),K(1.5,7,-.4,'watch',-1)]),P(7,[K(0,16,-1.2,'run',-1),K(1.9,14,-1.2,'receiveReady',-1),K(2.1,14,-1.2,'cushion',-1)])
],[B(0,1.1,.3),B(.8,1.1,.3),B(1.4,7,-.4,4.3),B(2.1,12.9,-1.2)],{note:'横向转移 · 接球者移动到落点'});
author(40,'胸部停球','扩展动作','迎向高球，躯干后收缓冲，让球落到身前，再带走。',['迎球','胸停','落球','带走'],[
 P(9,[K(0,10,0,'chestReady',-1),K(1.1,10,0,'chestCushion',-1),K(1.4,10,0,'cushion',-1),K(1.7,10,0,'turn'),K(1.95,10,0,'touch'),K(2.7,14.1,0,'collect')])
],[B(0,1,0,3.3),B(1.1,9.1,0,2.1),B(1.4,9.1,0,1),B(1.7,9.1),B(1.95,11.1),B(2.7,15.2)],{note:'躯干后收缓冲 · 球落下再控制'});
author(41,'凌空抽射','扩展动作','观察空中来球，在落地前触球射门，身体随势转动。',['判断','准备','凌空','射出'],[
 P(9,[K(0,7,0,'watch'),K(.8,7,0,'shotSet'),K(1.3,7,0,'volley'),K(1.42,7.3,0,'shotFollow'),K(1.8,7.5,0,'shotLand')]),G([K(0,14.7,-.8,'keeperReady',-1),K(1.65,14.7,-.8,'dive',-1),K(2.05,14.7,-.8,'diveLand',-1)])
],[B(0,1,0,3.2),B(1.3,8.1,0,.9),B(1.85,16.45,0,1.1)],{goal:true,scoredAt:1.85,note:'球未落地 · 接触即射出'});
author(42,'急停再启动','扩展动作','持球者突然收球停步，让追赶者冲过，再重新加速。',['推进','急停','诱过','启动'],[
 P(10,[K(0,1,0,'run'),K(.85,6,0,'brake'),K(1.15,6,0,'collect'),K(1.5,6,.3,'touch'),K(2.5,12,.3,'collect')]),D(4,[K(0,0,-.7,'sprint'),K(1.3,8.3,-.7,'beaten'),K(1.65,8.3,-.7,'brake'),K(2.5,10,-.7,'run')])
],[B(0,2.1),B(.85,7.1),B(1.5,7.1,.3),B(2.5,13.1,.3)],{note:'先急停收球 · 再重新加速'});
author(43,'肩部对抗争球','扩展动作','双方并跑挤压，轮流展示扛住带走和相持后球松脱。',['并跑','挤压','结果','继续'],[],[],{variant:c=>({note:c%2?'相持 · 球脱离控制':'蓝队扛住对抗 · 带球离开',actors:[P(10,[K(0,3,.2,'run'),K(1.2,8,.2,'charge'),K(1.5,8,.2,'absorb'),K(1.7,8,.3,'run'),K(2.7,12.1,.3,'collect')]),D(4,[K(0,3,-.7,'run'),K(1.2,8,-.5,'charge'),K(1.5,8,-.5,'absorb'),K(1.7,8,-.7,c%2?'run':'brake'),K(2.7,c%2?13:9,-.7,'defend',-1)])],balls:[B(0,4.1,.2),B(1.2,9.1,.2),B(1.7,9.1,.3),B(2.7,c%2?14:13.2,.3)]})});
author(44,'门将高空争球','扩展动作','门将与进攻者同时起跳；门将抢到抱住，攻方先到则顶向球门。',['判断','起跳','争球','落地'],[],[],{goal:true,variant:c=>{
 const win=c%2===0;return {goal:true,note:win?'门将抢到 · 落地抱住':'攻方先顶到 · 门将落地回望',scoredAt:win?undefined:2.05,heldBetween:win?[1.4,4.4]:null,actors:[P(9,[K(0,5,0,'run'),K(1.05,9,0,'headLoad'),K(1.2,9,0,'headHigh'),K(1.4,9,0,win?'headLose':'headStrike'),K(1.7,9,0,'headLand'),K(2,9,0,'stand')]),G([K(0,14,-.9,'run',-1),K(1.05,11,-.5,'headLoad',-1),K(1.2,11,-.5,'highCatch',-1),K(1.4,11,-.5,win?'highCatch':'headLow',-1),K(1.7,11,-.5,'headLand',-1),K(2,11,-.5,win?'hold':'lookBack',-1)])],balls:[B(0,1,0,3.5),B(1.4,win?10.1:10.5714,win?-.5:0,win?3:3.6214),B(1.75,win?10.1:13.4,win?-.5:0,win?1.6:1.8),B(2.05,win?10.1:16.45,win?-.5:0,win?1.6:1)]};
}});
author(45,'门将发动进攻','扩展动作','轮流展示低位送球与放球长踢；队友同时启动接应。',['控住','准备','送出','接应'],[],[],{variant:c=>{
 const kick=c%2===1;return {note:kick?'门将放球长踢':'门将低位送球给队友',heldBetween:[0,.95],actors:[G([K(0,1,0,'hold'),K(.7,1,0,kick?'shotSet':'kneel'),K(.95,1,0,kick?'shotContact':'throwFollow'),K(1.25,1.3,0,kick?'shotFollow':'hold')]),P(7,[K(0,11,-.8,'run'),K(1.9,14,-.8,'receiveReady',-1),K(2.2,14,-.8,'cushion',-1)])],balls:[B(0,2,0,1.6),B(.7,2,0,kick?.7:1),B(.95,2.1,0,kick?0:.4),B(1.5,7.5,-.3,kick?3.1:0),B(2.2,12.9,-.8)]};
}});

author(46,'挑传越过防线','扩展动作','近距离挑起球，越过上抢者，队友在身后接应。',['靠近','挑起','越过','接应'],[
 P(8,kickKeys(0,.85)),D(4,[K(0,6,0,'run',-1),K(.85,4.7,0,'challenge',-1),K(1.1,4.7,0,'headLose',-1),K(1.4,4.7,0,'lookBack')]),P(9,readyKeys(12.5,-.6,1.9))
],[B(0,1.1),B(.85,1.1),B(1.25,5.5,-.2,4.7),B(1.9,11.4,-.6)],{radius:32,note:'挑过上抢者 · 身后接球'});
author(47,'倒三角回传','扩展动作','边路球员向前推进，再向身后的队友回传；接球者迎球。',['下底','回看','回传','接球'],[
 P(7,[K(0,7,.3,'run'),K(.9,14,.3,'brake'),K(1.2,14,.3,'passSet',-1),K(1.45,14,.3,'passContact',-1),K(1.6,13.8,.3,'passFollow',-1)]),P(8,[K(0,7,-1,'run'),K(1.8,9.5,-.8,'receiveReady'),K(2.05,9.5,-.8,'cushion')]),D(4,[K(0,11,-.1,'run'),K(1.2,15,-.1,'brake',-1),K(1.8,15,-.1,'lookBack',-1)])
],[B(0,8.1,.3),B(.9,15.1,.3),B(1.45,12.9,.3),B(2.05,10.6,-.8)],{note:'防线被带向底线 · 球回到身后队友'});
author(48,'横传门前抢点','扩展动作','球沿门前横向送出，前锋提前移动，一脚完成近门射门。',['送球','抢点','触射','结果'],[
 P(7,kickKeys(0,.8,.3)),P(9,[K(0,9,-1.2,'run'),K(1.4,10,-.2,'shotContact'),K(1.5,10.3,-.2,'shotFollow'),K(1.9,10.5,-.2,'stand')]),D(4,[K(0,11,-1,'run',-1),K(1.6,12,-.5,'beaten',-1)]),G([K(0,14.5,.2,'keeperReady',-1),K(1.5,14.5,.2,'dive',-1),K(1.95,14.5,.2,'diveLand',-1)])
],[B(0,1.1,.3),B(.8,1.1,.3),B(1.4,11.1,-.2),B(1.8,16.45,-.2,.4)],{goal:true,scoredAt:1.8,note:'横传门前 · 抢点触球即射'});
author(49,'斜向塞球','扩展动作','球穿过两名防守者之间，接球者从另一侧斜跑接应。',['观察','穿线','斜跑','接球'],[
 P(8,kickKeys(0,.8,-1)),D(4,[K(0,6,-1.2,'defend',-1),K(1.2,6,-1.2,'challenge',-1),K(1.6,6,-1.2,'lookBack')]),D(5,[K(0,7,.3,'defend',-1),K(1.2,7,.3,'challenge',-1),K(1.6,7,.3,'lookBack')]),P(9,[K(0,11,-1.3,'run'),K(1.65,13,.3,'receiveContact'),K(1.8,13,.3,'touch'),K(2.5,15.5,.3,'collect')])
],[B(0,1.1,-1),B(.8,1.1,-1),B(1.65,14.1,.3),B(2.5,16.6,.3)],{note:'穿过两人之间 · 接球者斜向前插'});
author(50,'背身接球转身','扩展动作','背对进攻方向接球，将球留在远离对手的一侧，转身带走。',['背身','接球','转身','带走'],[
 P(9,[K(0,9,.3,'receiveReady',-1),K(1.1,9,.3,'receiveContact',-1),K(1.35,9,.3,'shield',-1),K(1.7,9,.3,'turn'),K(1.9,9,.3,'touch'),K(2.7,13.1,.3,'collect')]),D(4,[K(0,11,-.7,'run',-1),K(1.3,10.8,-.7,'defend',-1),K(2.3,10.8,-.7,'lookBack')])
],[B(0,1.1,.3),B(1.1,7.9,.3),B(1.7,7.9,.3),B(1.9,10.1,.3),B(2.7,14.2,.3)],{note:'先护住远侧球 · 再转身'});
author(51,'迎球顺势带走','扩展动作','接球者向来球移动，第一脚把球送向前方，身体不停步跟上。',['迎球','触球','顺势','推进'],[
 P(8,[K(0,11,0,'run',-1),K(1.1,8,0,'receiveContact',-1),K(1.2,8,0,'turn'),K(1.35,8,0,'run'),K(2.4,13.5,.3,'collect')])
],[B(0,1.1),B(1.1,6.9),B(1.35,9.7,.1),B(2.4,14.6,.3)],{note:'第一脚把球送向空当 · 人跟上'});
author(52,'接球失误球松脱','扩展动作','接球时缓冲不足，球弹得过远；双方立即追向球。',['迎球','失误','弹远','追球'],[
 P(8,[K(0,9,0,'receiveReady',-1),K(1.1,9,0,'receiveContact',-1),K(1.3,9,0,'beaten'),K(1.6,9,0,'run'),K(2.7,12.5,.3,'receiveReady')]),D(4,[K(0,15,-1,'watch',-1),K(1.3,15,-1,'sprint',-1),K(2.5,14,-.4,'defend',-1)])
],[B(0,1.1),B(1.1,7.9),B(1.6,12,.3,.2),B(2.4,13.6,.3)],{note:'停球过大 · 球权尚未确定'});
author(53,'漏球让队友接','扩展动作','前一名球员让开来球线路，球直接穿过交给后方队友。',['来球','让开','穿过','接球'],[
 P(8,[K(0,7,0,'receiveReady',-1),K(.8,7,0,'turn'),K(1.15,7,-1.1,'watch'),K(2,7,-1.1,'stand')]),P(9,readyKeys(14,0,1.8)),D(4,[K(0,9,-1,'watch',-1),K(1.3,9,-1,'beaten',-1),K(1.7,9,-1,'lookBack')])
],[B(0,1.1),B(.5,1.1),B(1.8,12.9)],{note:'第一人不触球 · 后方队友接住'});
author(54,'假射真传','扩展动作','做射门蓄力姿态引诱封堵，收回发力后传向旁边队友。',['假射','诱挡','改传','接应'],[
 P(10,[K(0,1),K(.55,1,0,'shotSet'),K(.85,1,0,'feintShot'),K(1.15,1,0,'passSet'),K(1.4,1,0,'passContact'),K(1.55,1.3,0,'passFollow')]),D(4,[K(0,7,0,'defend',-1),K(.85,7,0,'block',-1),K(1.1,7,0,'impact',-1),K(1.6,7,0,'lookBack')]),P(8,readyKeys(12.5,-1.2,2.1))
],[B(0,2.1),B(1.4,2.1),B(2.1,11.4,-1.2)],{note:'假射期间球不动 · 改传后立即出球'});
author(55,'假传真带','扩展动作','摆出传球姿态让防守者封线，随后把球带向另一侧。',['假传','封线','变向','带走'],[
 P(10,[K(0,3),K(.65,3,0,'passSet'),K(1,3,0,'turn'),K(1.25,3,.3,'touch'),K(2.4,10,.3,'collect')]),D(4,[K(0,7,-.1,'defend',-1),K(.9,7,-1.2,'challenge',-1),K(1.3,7,-1.2,'beaten'),K(2.3,8,-1.2,'run')]),P(8,[K(0,12,-1.2,'receiveReady',-1)])
],[B(0,4.1),B(1,4.1),B(1.25,4.1,.3),B(2.4,11.1,.3)],{note:'球没有传出 · 从另一侧带走'});
author(56,'反向扣球','扩展动作','推进中将球扣回另一侧，转向绕开防守者。',['推进','扣回','转向','摆脱'],[
 P(10,[K(0,3,-.9,'run'),K(.9,7,-.9,'brake'),K(1.2,7,-.9,'turn',-1),K(1.5,6,.3,'touch'),K(2.5,12,.3,'collect')]),D(4,[K(0,11,-.9,'run',-1),K(1.1,9,-.9,'challenge',-1),K(1.5,8.5,-.9,'beaten',-1),K(2.2,8.5,-.9,'lookBack')])
],[B(0,4.1,-.9),B(.9,8.1,-.9),B(1.2,6.2,-.4),B(1.5,7.1,.3),B(2.5,13.1,.3)],{note:'先扣回球 · 再从对手另一侧绕出'});
author(57,'人球分过','扩展动作','球从防守者一侧滚过，持球者从另一侧绕行，再追上球。',['接近','送球','绕人','追上'],[
 P(10,[K(0,2,0,'run'),K(.85,5,0,'touch'),K(1.25,7,-1.25,'sprint'),K(1.8,11,-1.25,'run'),K(2.4,14,.1,'collect')]),D(4,[K(0,8,-.3,'defend',-1),K(1.05,8,-.3,'challenge',-1),K(1.4,8,-.3,'lookBack'),K(2.1,10,-.3,'run')])
],[B(0,3.1),B(.85,6.1),B(1.25,9.5,.3),B(1.8,13.8,.3),B(2.4,15.1,.1)],{note:'球走一侧 · 人绕另一侧 · 再汇合'});
author(58,'背身回做','扩展动作','背对进攻方向接住球，抵住防守者，再把球回给身后队友。',['接球','护住','回做','接应'],[
 P(9,[K(0,10,.2,'receiveReady',-1),K(1,10,.2,'receiveContact',-1),K(1.2,10,.2,'shield',-1),K(1.5,10,.2,'passSet',-1),K(1.75,10,.2,'passContact',-1),K(1.9,9.8,.2,'passFollow',-1)]),D(4,[K(0,13,-.7,'run',-1),K(1.2,11.8,-.7,'defend',-1)]),P(8,readyKeys(2,-.8,2.4,1))
],[B(0,1.1,.2),B(1,8.9,.2),B(1.75,8.9,.2),B(2.4,3.1,-.8)],{note:'背身护住 · 把球回做给队友'});
author(59,'外脚背弧线传球','扩展动作','小幅转动身体送出弧线球，绕过防守者抵达队友。',['准备','触球','弧线','接球'],[
 P(8,kickKeys(0,.8)),D(4,[K(0,7,0,'defend',-1),K(1.2,7,0,'challenge',-1),K(1.6,7,0,'lookBack')]),P(7,readyKeys(14.5,0,1.9))
],[B(0,1.1),B(.8,1.1),B(1.2,5,-1.2,.35),B(1.55,9.5,-1.2,.35),B(1.9,13.4)],{note:'弧线绕过封线者'});
author(60,'脚后跟传球','扩展动作','球员保持朝前，短促后倾，把球送给身后跟进者。',['推进','回看','后送','接球'],[
 P(10,[K(0,8,0,'run'),K(.8,10,0,'lookBack'),K(1.1,10,0,'absorb'),K(1.25,10.2,0,'run'),K(2.2,14,0,'stand')]),P(8,[K(0,2,-.8,'run'),K(1.7,5,-.8,'receiveContact'),K(1.85,5,-.8,'touch'),K(2.6,9.1,-.8,'collect')])
],[B(0,9.1),B(.8,11.1),B(1.1,9),B(1.7,6.1,-.8),B(2.6,10.2,-.8)],{note:'身体仍朝前 · 球送向身后队友'});

function shotReplay(id,title,description,path,extra=[],options={}){
 const c=1.1,end=path[path.length-1][0];
 author(id,title,'扩展动作',description,['准备','触球','球路','结果'],[P(9,kickKeys(0,c)),G(options.keeperFrames??[K(0,14.5,-.8,'keeperReady',-1),K(1.5,14.5,-.8,options.keeperPose??'dive',-1),K(1.95,14.5,-.8,'diveLand',-1),K(2.4,14.5,-.8,'rise',-1)]),...extra],[B(0,1.1),B(c,1.1),...path],{goal:true,scoredAt:options.scored===false?undefined:end,note:options.note,...options});
}
shotReplay(61,'低平抽射','触球后球贴近地面快速射出，门将压低身体扑救。',[B(1.75,16.45,0,.1)],[],{keeperPose:'kneel',note:'低平快速球 · 门将低位反应'});
shotReplay(62,'弧线射门','球先向一侧偏出，再弯回球门方向；门将随球路调整。',[B(1.35,6,-1.15,.8),B(1.6,11,-.9,.8),B(1.9,16.45,0,.7)],[],{note:'飞行中有明显弯曲 · 随势收回'});
shotReplay(63,'挑射越过门将','门将前移压缩空间，射手挑起球越过他。',[B(1.4,7,0,3.3),B(1.65,12,0,2.6),B(1.95,16.45,0,.8)],[],{note:'挑起越过出击门将',keeperFrames:[K(0,14.5,-.8,'run',-1),K(1.05,10.5,-.4,'keeperReady',-1),K(1.45,10.5,-.4,'headLose',-1),K(1.8,10.5,-.4,'headLand',-1),K(2.2,10.5,-.4,'lookBack',-1)]});
author(64,'近门推射','扩展动作','接近球门后短促发力，低速精准推向空出的球门一侧。',['靠近','调整','推射','结果'],[
 P(9,[K(0,5,0,'run'),K(.9,9,0,'shotSet'),K(1.2,9,0,'passContact'),K(1.3,9.3,0,'passFollow'),K(1.8,9.5,0,'stand')]),G([K(0,14.7,-1,'keeperReady',-1),K(1.4,14.7,-1,'dive',-1),K(1.9,14.7,-1,'diveLand',-1)])
],[B(0,6.1),B(.9,10.1),B(1.2,10.1),B(1.95,16.45,.1,.1)],{goal:true,scoredAt:1.95,note:'短促发力 · 推向空出的门角'});
author(65,'点球','扩展动作','罚球队员助跑射门，门将等待触球后扑向一侧；轮流展示进球与扑出。',['等待','助跑','射门','结果'],[],[],{goal:true,variant:c=>{
 const save=c%2===1;return {goal:true,note:save?'门将判断正确 · 扑出点球':'射向另一侧 · 点球进球',scoredAt:save?undefined:1.8,actors:[P(9,kickKeys(0,1.1)),G([K(0,14.5,0,'keeperReady',-1),K(1.15,14.5,0,'dive',-1),K(1.7,14.5,save?-.8:.3,'diveLand',-1),K(2.2,14.5,save?-.8:.3,'rise',-1)])],balls:[B(0,1.1),B(1.1,1.1),B(1.65,save?13.2:13.5,-.8,.3),B(1.8,save?10.5:16.45,-.8,save?.6:.3),B(2.4,save?8:16.45,-.8)]};
}});
shotReplay(66,'直接任意球','射手准备后起脚，球越过同时起跳的人墙，再落向球门。',[B(1.4,7,0,5.1),B(1.7,12,0,2.2),B(1.95,16.45,0,.8)],[D(4,[K(0,7,-.6,'wall',-1),K(1.2,7,-.6,'wallJump',-1),K(1.55,7,-.6,'headLand',-1)]),D(5,[K(0,8,.3,'wall',-1),K(1.2,8,.3,'wallJump',-1),K(1.55,8,.3,'headLand',-1)])],{radius:32,note:'越过起跳人墙 · 落向球门'});
author(67,'任意球人墙封堵','扩展动作','人墙同时收紧、起跳，球接触后立即改变方向弹离。',['准备','起跳','封堵','弹开'],[
 P(9,kickKeys(0,1.1)),D(4,[K(0,8,-.7,'wall',-1),K(1.25,8,-.7,'wallJump',-1),K(1.55,8,-.7,'impact',-1),K(1.8,8,-.7,'stand',-1)]),D(5,[K(0,8,.3,'wall',-1),K(1.25,8,.3,'wallJump',-1),K(1.55,8,.3,'headLand',-1)]),G([K(0,14.8,-.8,'keeperReady',-1)])
],[B(0,1.1),B(1.1,1.1),B(1.5,6.9,-.7,2.1),B(1.9,3.5,-1.2,1),B(2.3,1.3,-1.2)],{goal:true,note:'人墙接触球 · 球立即弹回'});
function cornerReplay(id,title,far){
 const hx=far?12:8.2,hy=far?-.8:.1;
 author(id,title,'扩展动作','角球飞向'+(far?'远点':'近点')+'，攻守双方同时起跳争顶，轮流展示攻门和解围。',['开出','跑位','争顶','结果'],[],[],{goal:true,variant:c=>{
  const attack=c%2===0,hitX=attack?hx+1.5714:hx+1.4286;return {goal:true,note:(far?'远点':'近点')+'争顶 · '+(attack?'攻方顶向球门':'守方顶出解围'),scoredAt:attack?2.4:undefined,actors:[P(7,kickKeys(0,.7,-1.1)),P(9,[K(0,hx-3,hy,'run'),K(1.25,hx,hy,'headLoad'),K(1.4,hx,hy,'headHigh'),K(1.65,hx,hy,attack?'headStrike':'headLose'),K(1.95,hx,hy,'headLand')]),D(4,[K(0,hx+4,hy-.7,'run',-1),K(1.25,hx+3,hy-.7,'headLoad',-1),K(1.4,hx+3,hy-.7,'headHigh',-1),K(1.65,hx+3,hy-.7,attack?'headLose':'headStrike',-1),K(1.95,hx+3,hy-.7,'headLand',-1)])],balls:[B(0,1.1,-1.1),B(.7,1.1,-1.1),B(1.2,hx-1,hy,3.3),B(1.65,hitX,attack?hy:hy-.7,3.6214),B(2.4,attack?16.45:2,attack?hy:-1.1,attack?.8:0)]};
 }});
}
cornerReplay(68,'角球近点争顶',false);cornerReplay(69,'角球远点争顶',true);
author(70,'界外球','扩展动作','球从头后方举起，躯干前倾送出；队友迎向落点接球。',['举球','后引','掷出','接球'],[
 P(7,[K(0,1,0,'throwSet'),K(.65,1,0,'throwSet'),K(1,1,0,'throwFollow'),K(1.3,1.3,0,'stand')]),P(8,readyKeys(11,-.8,1.9)),D(4,[K(0,13,-1.2,'watch',-1),K(1.2,13,-1.2,'run',-1),K(1.9,12.5,-1.2,'defend',-1)])
],[B(0,.7,0,4.3),B(.65,.2,0,4.3),B(1,2.1,0,4.3),B(1.45,6,-.3,3),B(1.9,9.9,-.8)],{heldBetween:[0,1],note:'头后准备 · 躯干前倾送出'});
author(71,'球门球','扩展动作','门将退开准备，助跑踢出静止球，远处队友迎球。',['摆球','助跑','踢出','接应'],[
 G(kickKeys(0,1.1)),P(7,[K(0,16,-.7,'run',-1),K(2.3,14,-.7,'receiveReady',-1),K(2.5,14,-.7,'cushion',-1)]),D(8,[K(0,10,.2,'watch',-1),K(1.6,10,.2,'headLose',-1),K(2,10,.2,'lookBack')])
],[B(0,1.1),B(1.1,1.1),B(1.65,7,-.2,3.3),B(2.15,11,-.5,2.3),B(2.5,12.9,-.7)],{note:'静止球开出 · 队友迎向落点'});

author(72,'门将低位扑救','扩展动作','门将压低重心，横向扑到低球位置，落地后抱住。',['准备','压低','低扑','抱住'],[
 P(9,kickKeys(0,.9)),G([K(0,14,0,'keeperReady',-1),K(1.25,14,-.7,'kneel',-1),K(1.5,14,-.7,'dive',-1),K(1.75,14,-.7,'diveLand',-1),K(2.3,14,-.7,'rise',-1),K(2.7,14,-.7,'hold',-1)])
],[B(0,1.1),B(.9,1.1),B(1.5,12.8,-.7,.15),B(1.8,12.8,-.7,.3),B(2.7,13,-.7,1.5)],{goal:true,heldBetween:[1.5,4.4],note:'低球 · 下沉扑救 · 落地抱住'});
author(73,'门将高位扑救','扩展动作','门将蓄力起跳，触及高球后将球拨离球门方向，再落地恢复。',['蓄力','起跳','碰球','落地'],[
 P(9,kickKeys(0,.9)),G([K(0,14,0,'keeperReady',-1),K(1.15,14,0,'headLoad',-1),K(1.35,14,-.4,'highCatch',-1),K(1.5,14,-.4,'punch',-1),K(1.8,14,-.4,'headLand',-1),K(2.1,14,-.4,'keeperReady',-1)])
],[B(0,1.1),B(.9,1.1),B(1.5,13,-.4,3.2),B(1.85,10.5,-1.1,2.6),B(2.4,8.5,-1.1)],{goal:true,note:'高位触球 · 球离开球门方向'});
author(74,'门将双拳击球','扩展动作','高球落向禁区，门将与攻方起跳；门将抢先将球击向远处。',['来球','争高','击出','落地'],[
 P(9,[K(0,5,0,'run'),K(1.1,9,0,'headLoad'),K(1.3,9,0,'headLose'),K(1.8,9,0,'headLand')]),G([K(0,14,-.9,'run',-1),K(1.1,11,-.7,'headLoad',-1),K(1.3,11,-.7,'highCatch',-1),K(1.5,11,-.7,'punch',-1),K(1.8,11,-.7,'headLand',-1),K(2.1,11,-.7,'keeperReady',-1)])
],[B(0,1,0,3.5),B(1.5,10.1,-.7,3.1),B(1.9,5.5,-1,2.5),B(2.4,1.5,-1)],{goal:true,note:'门将先触球 · 击向远离球门处'});
author(75,'门将脱手后二次抱球','扩展动作','第一次扑救没抱牢，球短暂弹开；门将再次前扑，赶在攻方前抱住。',['扑救','脱手','再扑','抱住'],[
 P(9,kickKeys(0,.7)),P(8,[K(0,7,-1,'watch'),K(1.3,7,-1,'sprint'),K(2,10.5,-.7,'brake'),K(2.2,10.5,-.7,'watch')]),G([K(0,14,0,'keeperReady',-1),K(1.1,14,0,'dive',-1),K(1.4,14,0,'diveLand',-1),K(1.6,13,0,'scoop',-1),K(1.9,12.5,0,'diveLand',-1),K(2.3,12.5,0,'rise',-1),K(2.7,12.5,0,'hold',-1)])
],[B(0,1.1),B(.7,1.1),B(1.3,12.8,0,.5),B(1.6,10.8,0,.2),B(1.9,11.3,0,.3),B(2.7,11.5,0,1.5)],{goal:true,heldBetween:[1.9,4.4],note:'脱手后再次前扑 · 攻方没能先到'});
author(76,'单刀门将封堵','扩展动作','攻方带球靠近，门将同时出击压低身体，触球后将球挡向一侧。',['推进','出击','封堵','弹开'],[
 P(9,[K(0,1,0,'sprint'),K(1.2,8,0,'shotSet'),K(1.4,8,0,'shotContact'),K(1.65,8.4,0,'brake'),K(2,8.4,0,'watch')]),G([K(0,15,-.2,'run',-1),K(1.15,11,-.2,'keeperReady',-1),K(1.4,11,-.2,'kneel',-1),K(1.6,11,-.2,'scoop',-1),K(2.1,11,-.2,'rise',-1)])
],[B(0,2.1),B(1.2,9.1),B(1.4,9.1),B(1.55,9.8,-.2,.2),B(2.1,6.5,-1.2,.4),B(2.6,5,-1.2)],{goal:true,note:'门将压缩空间 · 球被挡向旁边'});
author(77,'双人夹抢','扩展动作','两名防守者从不同方向包夹，轮流展示夺球和持球者从空隙逃出。',['靠近','合围','争球','带离'],[],[],{variant:c=>{
 const win=c%2===0;return {note:win?'红队夹抢成功 · 夺球者带离':'蓝队从两人间隙带出',actors:[P(10,[K(0,7,0,'shield'),K(1.25,7,0,win?'absorb':'turn'),K(1.55,7,.3,win?'brake':'touch'),K(2.65,win?6.5:11.1,.3,'stand')]),D(4,[K(0,13,-1,'run',-1),K(1.25,9,-.7,'challenge',-1),K(1.55,9,-.7,win?'turn':'beaten'),K(2.65,win?13.1:9,-.7,'stand')]),D(5,[K(0,2,.3,'run'),K(1.25,5,.3,'challenge'),K(1.6,5,.3,win?'defend':'beaten'),K(2.65,5,.3,'watch')])],balls:[B(0,8.1),B(1.25,8.1),B(1.55,win?10.1:8.1,win?-.7:.3),B(2.65,win?14.2:12.2,win?-.7:.3)]};
}});
author(78,'倒地与恢复','扩展动作','争抢中失去平衡，落地、缓冲，随后撑起躯干恢复站姿。',['失衡','倒地','缓冲','起身'],[
 P(10,[K(0,5,0,'run'),K(.8,8,0,'beaten'),K(1,8,0,'collideFall'),K(1.4,8.5,0,'roll'),K(1.8,8.5,0,'diveLand'),K(2.4,8.5,0,'rise'),K(2.8,8.5,0,'stand')]),D(4,[K(0,11,-.8,'run',-1),K(.8,9.5,-.8,'charge',-1),K(1.2,9.5,-.8,'brake',-1),K(2,9.5,-.8,'watch',-1)])
],[B(0,6.1),B(.8,9.1),B(1.7,13,.3)],{note:'失衡落地 · 起身后恢复观察'});
author(79,'碰撞犯规后反应','扩展动作','双方碰撞后停止继续争球；一方倒地，另一方停步，附近队友关注。',['接近','碰撞','停球','恢复'],[
 P(10,[K(0,5,0,'run'),K(.9,8,0,'absorb'),K(1.1,8,0,'collideFall'),K(1.5,8,0,'diveLand'),K(2.3,8,0,'rise'),K(2.8,8,0,'stand')]),D(4,[K(0,12,-.7,'run',-1),K(.9,9.5,-.7,'charge',-1),K(1.2,9.5,-.7,'stopSignal',-1),K(2.4,9.5,-.7,'acknowledge',-1)]),P(8,[K(0,2,-1,'watch'),K(1.3,2,-1,'run'),K(2.2,5.5,-1,'stopSignal')])
],[B(0,6.1),B(.9,9.1),B(1.4,11.5,.3)],{note:'哨停示意 · 双方停止继续争球'});
author(80,'越位停步回位','扩展动作','进攻者提前跑到防线身后，接到哨停信号后减速，回到防线前。',['前插','哨停','减速','回位'],[
 P(9,[K(0,8,0,'sprint'),K(1.2,15,0,'brake'),K(1.5,15,0,'disappointed'),K(1.9,15,0,'run',-1),K(2.9,8,0,'stand')]),P(8,[K(0,0),K(.8,0,0,'passContact'),K(1,0,0,'passFollow'),K(1.5,.3,0,'stopSignal')]),D(4,[K(0,11,-1,'defend',-1),K(1.2,11,-1,'stopSignal',-1),K(2.7,11,-1,'stand',-1)])
],[B(0,1.1),B(.8,1.1),B(1.3,11.8),B(1.7,12.5)],{note:'扩展场景 · 哨停后不继续进攻'});

// Phase labels follow the actual contact and recovery times for each scene.
const PHASE_MARKS={21:[.25,.8,.9,1.6],22:[.25,.65,1.5,2.1],26:[.25,1,1.2,1.6],27:[.25,.9,1.4,2.4],28:[.25,.75,1.4,1.8],30:[.25,.8,1.1,1.5],31:[.25,.6,2,2.3],32:[.25,.7,1.8,2.5],33:[.25,1.2,1.8,2.2],34:[.25,1.2,2.2,3.4],35:[.25,1.2,1.7,2.8],36:[.25,.5,.7,2.5],37:[.25,1.5,1.55,2.2],38:[.25,.85,1.15,1.6],39:[.25,.8,.88,2.1],40:[.25,1.1,1.4,1.95],41:[.25,.8,1.3,1.42],42:[.25,.85,1.15,1.5],43:[.25,1.2,1.5,1.7],44:[.25,1.1,1.4,1.7],45:[.25,.7,.95,2.2],46:[.25,.85,.95,1.9],47:[.25,.9,1.45,2.05],48:[.25,.8,1.4,1.8],49:[.25,.8,.9,1.65],50:[.25,1.1,1.7,1.9],51:[.25,1.1,1.35,2.4],52:[.25,1.1,1.3,1.6],53:[.25,.8,1.15,1.8],54:[.25,.85,1.4,2.1],55:[.25,.65,1,1.25],56:[.25,.9,1.2,1.5],57:[.25,.85,1.1,2.4],58:[.25,1.2,1.75,2.4],59:[.25,.8,.9,1.9],60:[.25,.8,1.1,1.7],61:[.25,1.1,1.2,1.75],62:[.25,1.1,1.2,1.9],63:[.25,1.1,1.2,1.95],64:[.25,.9,1.2,1.95],65:[.25,.75,1.1,1.8],66:[.25,1.1,1.2,1.95],67:[.25,1.25,1.5,1.6],68:[.25,.7,1.65,1.95],69:[.25,.7,1.65,1.95],70:[.25,.65,1,1.9],71:[.25,.75,1.1,2.5],72:[.25,1.25,1.5,1.75],73:[.25,1.35,1.5,1.8],74:[.25,1.1,1.5,1.8],75:[.25,1.3,1.6,1.9],76:[.25,.75,1.4,1.55],77:[.25,1.25,1.55,1.8],78:[.25,1,1.4,2.4],79:[.25,.9,1.2,2.3],80:[.25,1.2,1.5,1.9]};
for(const [id,marks]of Object.entries(PHASE_MARKS))SPECS['a'+id].marks=marks;


return {SPECS,POSES,sample};
})();
export const {SPECS,POSES,sample}=legacy;