import {restartPose,throwHandAnchors} from './restart-motions.js';
import {quickLooseTiming,quickLoosePoint,quickLoosePose} from './loose-ball-motion.js';
import {dribble as buildDribbleMotion} from './player-motions.js';
import {DIRECTIONS_8,orientFootballPose,directionalFootballAnchors} from './motion-directions.js';
import {SPECS,POSES,sample as legacySample} from './legacy-actions.js';
import {FOOTBALL_ACTIONS,sampleFootballPose,FOOTBALL_CONTACT_PHASE as C,footballPoseAnchors} from './football-actions.js';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},lerp=(a,b,t)=>a+(b-a)*t;
const notes={header_attack:'攻守同时起跳；进攻方赢得接触，球立即改变方向。',header_defend:'防守方赢得争顶，将球顶离危险区域。',header_miss:'争顶者没有碰球；另一方触球，未获胜者正常落地。',volley:'球未落地，身体击球瞬间直接开始射门球路。',volley_miss:'挥击未触球，来球继续原来的轨迹。',slide_win:'脚端领先、头部后仰；脚尖触球后先起身，再推进。',slide_loose:'脚尖碰球，球立即弹开；铲球队员收腿起身。',slide_miss:'脚端朝向球，但未碰到；持球者带走，铲球队员起身。',feint_stay:'脚下位置不动，左右晃动表现为画面上下。',feint_escape:'先晃动，成功后沿批准路径把球带离。',feint_lost:'假动作被识破，对手得球；原持球者不播放成功突破。',double_press:'仅原地护球时，两名防守者同时进入持球格，一次三人判定，任一防守者可赢球，结束后各占一格。',double_support:'仅原地护球时，第二名防守者同时入格抢球；只进行一次共同判定，接触后退出或带走。',dispossessed:'失球后收势、转向；不会自动增加回追距离。',block_miss:'实际封堵尝试落空，球持续飞行。',block_control:'封堵成功后缓冲控球，球停到实际控球位置。',save_miss:'扑救失败，球越过门将；没有虚假的触球停顿。',keeper_release:'手持球降低到脚下，完成放球再准备传球。',keeper_second_claim:'追同一次脱手球，触球后抱住，不能提前获得球权。',followup_shot:'第二落点被控制后再次实际选择射门。',wall_pass:'第一脚传出，随后按合法路径前插。',wall_return:'第二人取得球后回传；球仍可被防守者截断。',receive_miss:'原定接球人没有触球，减速并转向。'};
let direction=DIRECTIONS_8[0],paused=false,start=performance.now(),frozen=0;const cards=[];
for(const [kind,name] of Object.entries(FOOTBALL_ACTIONS)){
 const el=document.createElement('article');el.className='card';el.innerHTML=`<h2>${name}</h2><canvas width="640" height="330" aria-label="${name}"></canvas><div class="phase"></div><p>${notes[kind]||'根据真实任务和批准路径跑动；到位与触球分别判定。'}</p>`;document.querySelector('#gallery').append(el);cards.push({kind,ctx:el.querySelector('canvas').getContext('2d'),label:el.querySelector('.phase')});
}
document.querySelector('#count').textContent=`共 ${cards.length} 个动作分支`;
document.querySelector('#pause').onclick=e=>{if(!paused){frozen=performance.now()-start;paused=true}else{start=performance.now()-frozen;paused=false}e.target.textContent=paused?'继续':'暂停'};
document.querySelector('#replay').onclick=()=>{start=performance.now();frozen=0};
function mapGround(p){const x=p.x-320,y=p.y-230;return {x:320+direction.x*x-direction.y*y,y:230+direction.y*x*.48+direction.x*y*.48};}
function body(ctx,root,kind,q,color,facing=1,num='9',raw=null){
 root=mapGround(root);const r=18,p=raw||sampleFootballPose(kind,q),v=p.direction||{x:facing,y:0},dir={x:direction.x*v.x-direction.y*v.y,y:(direction.y*v.x+direction.x*v.y)*.48};
 const o=orientFootballPose(p,dir,{slide:kind.startsWith('slide'),radius:r,q});let a=directionalFootballAnchors(root,r,o);
 if(raw?.contactPoint){const target=mapGround(raw.contactPoint),weight=Math.sin(Math.PI*clamp(raw.contactPhase/.9));root={x:root.x+(target.x-a.footToe.x)*weight,y:root.y+(target.y-a.footToe.y)*weight};a=directionalFootballAnchors(root,r,o);}
 ctx.fillStyle='#0003';ctx.beginPath();ctx.ellipse(root.x,root.y,20,7,0,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(a.pivot.x,a.pivot.y);ctx.rotate(o.pose.lean*Math.PI/180);ctx.fillStyle=color;ctx.fillRect(-r*.72,-a.torsoHeight,r*1.44,a.torsoHeight);ctx.fillStyle='white';ctx.font='bold 16px system-ui';ctx.textAlign='center';ctx.fillText(num,0,-a.torsoHeight*.4);ctx.restore();ctx.fillStyle='#f1c9a5';ctx.beginPath();ctx.arc(a.head.x,a.head.y,r*.6,0,Math.PI*2);ctx.fill();ctx.fillStyle='#243740';ctx.beginPath();ctx.arc(a.head.x+o.direction.x*r*.42,a.head.y+o.direction.y*r*.22,r*.1,0,Math.PI*2);ctx.fill();
 if(a.shoeAlpha){ctx.save();ctx.globalAlpha=a.shoeAlpha;ctx.fillStyle='#18252c';ctx.beginPath();ctx.ellipse(a.shoe.x,a.shoe.y,r*.25,r*.13,Math.atan2(dir.y,dir.x),0,Math.PI*2);ctx.fill();ctx.restore();}return {...a.head,toe:a.footToe};
}
function ball(ctx,x,y,ground=250){ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,ground,9,3,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#233';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#233';ctx.fillRect(x-2,y-2,4,4);}
function raceScene(card,q,seconds){
 const {ctx}=card;ctx.fillStyle='#235642';ctx.fillRect(0,0,640,330);ctx.strokeStyle='#ffffff22';
 for(let x=120;x<640;x+=100){ctx.beginPath();ctx.moveTo(x,20);ctx.lineTo(x,330);ctx.stroke();}for(let y=30;y<330;y+=100){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke();}
 const origins=[{x:-7,y:0},{x:7,y:0},{x:0,y:-7},{x:0,y:7}],anchors=[{x:-1.55,y:0},{x:1.55,y:0},{x:0,y:-1.55},{x:0,y:1.55}];
 const timing=quickLooseTiming(5.45),elapsed=q*timing.total,contact=timing.approach,buffer=contact+timing.cushion,winner=Math.floor(seconds/1.4)%4;
 const stroke=buildDribbleMotion([anchors[winner],origins[winner]],buffer,timing.total,{startBall:{x:0,y:0}});let ballPos={x:0,y:0};
 for(let i=0;i<4;i++){
  const incoming=elapsed<contact,controlled=!incoming&&i===winner;
  let root=incoming?quickLoosePoint(origins[i],anchors[i],0,contact,elapsed):i===winner?(elapsed<buffer?anchors[i]:stroke.sample(elapsed).root):quickLoosePoint(anchors[i],origins[i],contact,timing.total,elapsed);
  if(controlled)ballPos=stroke.sample(elapsed).ball;
  const moving=incoming||!controlled||elapsed>=buffer,pose=quickLoosePose(moving,controlled),v=incoming?{x:-origins[i].x,y:-origins[i].y}:origins[i];
  body(ctx,{x:320+root.x*16,y:230+root.y*16},'second_ball_run',q,i<2?'#287cf1':'#e44a50',1,String(i+4),{...pose,direction:v});
 }
 const v=mapGround({x:320+ballPos.x*16,y:230+ballPos.y*16});ball(ctx,v.x,v.y,v.y);card.label.textContent=elapsed<contact?'快速靠近 · 球仍无主':`第${winner+4}号拿球 · 其余退出`;
}

function legacyScene(card,time){const {ctx,baseId}=card;ctx.fillStyle='#235642';ctx.fillRect(0,0,640,330);const f=legacySample(["carry", "run", "pass", "receive", "shoot", "press", "tackle", "dodge", "shield", "beaten", "intercept", "block", "scramble", "save", "goal", "slide", "cross", "header", "rebound", "clearance"][baseId-1]||'a'+baseId,time);
 for(const [i,a] of f.actors.entries()){const p=POSES[a.pose]||POSES.stand;body(ctx,{x:110+a.x*26,y:245+(a.y||0)*28},'stand',.5,a.color||'#287cf1',a.dir||1,String(a.num||i+1),{lean:p.lean||0,shift:p.shiftX||0,sway:p.shiftY||0,lift:0,head:p.headY||0,lag:p.headX||0,squash:[p.width||1,1]});}
 if(f.ball!==undefined){const v=mapGround({x:110+f.ball*26,y:245+(f.ballY||0)*28});ball(ctx,v.x,v.y-(f.ballHeight||0)*26,v.y);}
 card.label.textContent=f.note||'原型试播 · 不改变比赛判断';}

const compactContactIds=new Set([6,7,86,87,88,89,90,91,92,93]);
function compactContactScene(card,q){
 const {ctx}=card,id=card.id||card.baseId,kind=card.kind||'tackle';ctx.fillStyle='#235642';ctx.fillRect(0,0,640,330);
 const contact=.28,total=.60,buffer=contact+.045,time=q*total,double=[92,93].includes(id),slide=[86,87,88].includes(id),loose=id===87,retained=[6,88,89,90].includes(id),stay=id===89;
 const origins=[{x:1.55,y:0},{x:-7,y:0},{x:0,y:-7}],anchors=[origins[0],{x:-1.55,y:0},{x:0,y:-1.55}],ends=[retained&&!stay?{x:7,y:0}:origins[0],{x:-7,y:0},{x:0,y:-7}],winner=loose?-1:retained?0:id===93?2:1;
 const stroke=winner>=0&&!stay?buildDribbleMotion([anchors[winner],ends[winner]],buffer,total,{startBall:{x:0,y:0}}):null;
 let bp={x:0,y:0};
 for(let i=0;i<(double?3:2);i++){
  const incoming=time<contact,controlled=i===winner&&!incoming;
  const root=incoming?quickLoosePoint(origins[i],anchors[i],0,contact,time):controlled?(time<buffer||stay?anchors[i]:stroke.sample(time).root):quickLoosePoint(anchors[i],ends[i],contact,total,time);
  let pose=quickLoosePose(i!==0||time>=buffer&&!stay,controlled),action='second_ball_run';
  if(i===0&&[89,90,91].includes(id)&&incoming){const u=time/contact,wave=Math.sin(u*Math.PI*2)*Math.sin(u*Math.PI);pose={...pose,lean:8+wave*10,sway:wave*.20};}
  if(i===1&&slide&&time<contact+.11){const u=incoming?.45*time/contact:.45+.55*clamp((time-contact)/.11);action=kind;pose=sampleFootballPose(kind,u);if(kind!=='slide_miss')pose={...pose,contactPhase:u,contactPoint:{x:320,y:230}};}
  const from=incoming?origins[i]:anchors[i],to=incoming?anchors[i]:ends[i],v={x:to.x-from.x,y:to.y-from.y};
  body(ctx,{x:320+root.x*16,y:230+root.y*16},action,q,i===0?'#287cf1':'#e44a50',i===0?-1:1,String(i===0?9:i===1?4:6),{...pose,direction:Math.hypot(v.x,v.y)>.01?v:{x:i===0?-1:1,y:0}});
  if(controlled)bp=stay?{x:0,y:0}:stroke.sample(time).ball;
 }
 if(loose&&time>=contact)bp=quickLoosePoint({x:0,y:0},{x:0,y:5.5},contact,contact+.08,time);
 const v=mapGround({x:320+bp.x*16,y:230+bp.y*16});ball(ctx,v.x,v.y,v.y);card.label.textContent=time<contact?'快速上抢':loose?'触球即捅开':retained?'护住球 · 立即处理':'拿球 · 立即带走';
}

function scene(card,q){
 if(card.id>=112)return rulesScene(card,q);
 const {ctx,kind}=card;ctx.clearRect(0,0,640,330);ctx.fillStyle='#235642';ctx.fillRect(0,0,640,330);ctx.strokeStyle='#ffffff19';ctx.lineWidth=1;for(let x=0;x<640;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,330);ctx.stroke()}for(let y=10;y<330;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(640,y);ctx.stroke()}
 let a={x:270,y:250},b={x:325,y:250},ap=kind,bp='cover_run',col='#287cf1',bc='#e44a50',facing=1,bf=-1,contact=!/miss|_run|double_support/.test(kind),phase=q<C?'准备 / 接近':q<.7?'接触 / 结果':'收势 / 恢复',bx=300,by=250;
 if(kind.startsWith('header')){b={x:322,y:252};bp=kind==='header_attack'?'header_miss':kind==='header_defend'?'header_miss':'header_defend';if(kind==='header_defend'){col='#e44a50';bc='#287cf1'}const h=sampleFootballPose(kind,q);by=180;}
 else if(kind.startsWith('slide')){if(kind==='slide_miss')a.y=250+10*ease(q/C);a.x=q<=C?lerp(210,305.1,ease(q/C)):kind==='slide_win'?lerp(305.1,338,ease((q-.92)/.08)):305.1;b.x=q<C?291:kind==='slide_miss'?lerp(291,450,ease((q-C)/(1-C))):291;bp=kind==='slide_miss'?'forward_run':kind==='slide_win'?'dispossessed':'block_miss';col='#e44a50';bc='#287cf1';}
 else if(kind.startsWith('feint')){b.x=lerp(355,307,ease(q/.45));bp=kind==='feint_lost'?'double_press':'block_miss';if(kind==='feint_escape'&&q>.66){a.x=lerp(270,430,ease((q-.66)/.34));a.y=lerp(250,190,ease((q-.66)/.34))}}
 else if(kind.startsWith('double')){ap=kind==='double_support'?'double_press':kind;b={x:300,y:252};a={x:lerp(210,275,ease(q/.45)),y:240};bp='feint_stay';col='#e44a50';bc='#287cf1'}
 else if(kind==='dispossessed'){bp='forward_run';b.x=lerp(325,435,ease(q));}
 else if(kind.startsWith('block')){a={x:330,y:250};b={x:130,y:250};bp='followup_shot';col='#e44a50';bc='#287cf1';}
 else if(kind==='save_miss'){a={x:460,y:250};b={x:150,y:250};bp='followup_shot';col='#e8c64b';}
 else if(kind==='keeper_release'){a={x:240,y:250};b={x:445,y:245};bp='support_run';col='#e8c64b';}
 else if(kind==='keeper_second_claim'){a.x=lerp(190,295,ease(q/.45));b={x:380,y:245};bp='receive_miss';col='#e8c64b';}
 else if(kind==='wall_pass'){b={x:450,y:225};bp='receive_run';if(q>.65)a.x=lerp(270,380,ease((q-.65)/.35));}
 else if(kind==='wall_return'){a={x:410,y:235};b={x:lerp(160,295,ease(q)),y:250};bp='forward_run';facing=-1;}
 else if(kind==='followup_shot'||kind.startsWith('volley')){b={x:480,y:250};bp='block_miss';}
 else if(kind.endsWith('_run')||kind==='receive_miss'){a={x:lerp(190,360,ease(q)),y:lerp(260,kind==='wide_support_run'?170:240,ease(q))};b={x:450,y:250};bp='wall_pass';contact=false;}
 const ah=body(ctx,a,ap,q,col,facing,'9'),bh=body(ctx,b,bp,q,bc,bf,'4');
 if(kind.startsWith('header')){
  const wins=kind!=='header_miss'?ah:bh;
  if(q<C){bx=lerp(70,wins.x,ease(q/C));by=lerp(170,wins.y,ease(q/C))-35*Math.sin(q/C*Math.PI)}else{bx=lerp(wins.x,560,ease((q-C)/(1-C)));by=lerp(wins.y,210,ease((q-C)/(1-C)))-30*Math.sin((q-C)/(1-C)*Math.PI)}
 }else if(kind.startsWith('volley')){if(q<C){bx=lerp(90,a.x+24,q/C);by=lerp(150,220,q/C)-20*Math.sin(q/C*Math.PI)}else{bx=lerp(a.x+24,580,(q-C)/(1-C));by=kind==='volley_miss'?lerp(220,250,(q-C)/(1-C)):lerp(220,205,(q-C)/(1-C))}}
 else if(kind.startsWith('slide')){if(q<=C){bx=315;by=250}else if(kind==='slide_win'){bx=lerp(315,a.x+24,ease((q-.7)/.3));by=250}else if(kind==='slide_loose'){bx=lerp(315,470,ease((q-C)/(1-C)));by=lerp(250,185,ease((q-C)/(1-C)))}else{bx=b.x+24;by=b.y}}
 else if(kind.startsWith('feint')){const p=sampleFootballPose(kind,q);bx=a.x+24;by=a.y+p.sway*25;if(kind==='feint_lost'&&q>C){bx=lerp(a.x+24,b.x-23,ease((q-C)/.2));by=b.y}}
 else if(kind.startsWith('double')){body(ctx,{x:310,y:185},'double_support',q,'#e44a50',1,'6');bx=b.x+22;by=b.y+sampleFootballPose('feint_stay',q).sway*20;}
 else if(kind==='dispossessed'){bx=b.x+22;by=b.y}
 else if(kind.startsWith('block')||kind==='save_miss'){if(q<C){bx=lerp(170,a.x+16,q/C);by=250}else if(kind==='block_control'){bx=lerp(a.x+16,a.x+23,ease((q-C)/.22));by=250}else{bx=lerp(a.x+16,610,(q-C)/(1-C));by=250}}
 else if(kind==='keeper_release'){bx=a.x+17;by=lerp(212,250,ease(q/C));}
 else if(kind==='keeper_second_claim'){bx=q<C?315:a.x+17;by=q<C?250:lerp(250,213,ease((q-C)/.35))}
 else if(kind==='wall_pass'){bx=q<C?a.x+22:lerp(292,450,ease((q-C)/.35));by=lerp(250,225,ease((q-C)/.35))}
 else if(kind==='wall_return'){bx=q<C?390:lerp(390,b.x+22,ease((q-C)/.4));by=lerp(235,250,ease((q-C)/.4))}
 else if(kind==='followup_shot'){bx=q<C?a.x+23:lerp(a.x+23,610,(q-C)/(1-C));by=250}
 else{bx=lerp(450,170,ease(q));by=250;}
 if(!kind.startsWith('header')){const height=/volley|keeper_release|keeper_second_claim/.test(kind)?250-by:0;const v=mapGround({x:bx,y:height?250:by});bx=v.x;by=v.y-height;}ball(ctx,bx,by);if(contact&&q>=C&&q<C+.1){ctx.strokeStyle='#ffd570';ctx.lineWidth=2;ctx.beginPath();ctx.arc(bx,by,13+(q-C)*60,0,Math.PI*2);ctx.stroke()}
 ctx.fillStyle='#ffffffb0';ctx.font='18px system-ui';ctx.fillText(`蓝：进攻   红：防守   ${Math.round(q*100)}%`,15,28);card.label.textContent=phase;
}
function tick(now){const t=paused?frozen:now-start,q=Math.min((t%4000)/3200,1);for(const c of cards)if(visible.has(c.el||c.ctx.canvas.closest('article')))c.id>=112?rulesScene(c,q):c.baseId===13?raceScene(c,Math.min((t%1400)/(quickLooseTiming(5.45).total*1000),1),t/1000):compactContactIds.has(c.id||c.baseId)?compactContactScene(c,Math.min((t%1400)/600,1)):c.baseId?legacyScene(c,t/1000):scene(c,q);requestAnimationFrame(tick)}requestAnimationFrame(tick);
window.__footballPreview={cards:cards.length,sampleFootballPose,FOOTBALL_ACTIONS,footballPoseAnchors,sceneAt(q){frozen=q*3200;paused=true;for(const c of cards)scene(c,q)}};

const visible=new Set();const observer=new IntersectionObserver(entries=>{for(const e of entries)e.isIntersecting?visible.add(e.target):visible.delete(e.target)},{rootMargin:'200px'});
for(const c of cards){c.el=c.ctx.canvas.closest('article');observer.observe(c.el);}
const rows=(await (await fetch('./catalogue.json')).json()).rows;
for(const row of rows){let c=row.key?cards.find(c=>c.kind===row.key):null;if(!c){const el=document.createElement('article');el.className='card';el.innerHTML=`<h2>${row.id}. ${row.title}</h2><canvas width="640" height="330"></canvas><div class="phase"></div><p></p>`;document.querySelector('#gallery').append(el);c={baseId:row.id,el,ctx:el.querySelector('canvas').getContext('2d'),label:el.querySelector('.phase')};cards.push(c);observer.observe(el);}c.id=row.id;c.row=row;if(row.id===13||row.id>=112)c.el.id='action-'+row.id;c.el.querySelector('p').textContent=`${row.status} · 触发条件：${row.trigger}`;const stat=document.createElement('div');stat.className='stats';c.stat=stat;c.el.append(stat);stat.textContent='历史次数：读取中 · 最近触发：读取中';}
for(const d of DIRECTIONS_8){const option=document.createElement('option');option.value=d.id;option.textContent=d.label+' '+d.id;document.querySelector('#direction').append(option);}document.querySelector('#direction').onchange=e=>{direction=DIRECTIONS_8.find(d=>d.id===e.target.value)};
if(location.hash.startsWith('#action-'))cards.find(c=>c.id===Number(location.hash.slice(8)))?.el.scrollIntoView();
document.querySelector('#count').textContent=`共 ${cards.length} 个动作 / 分支 · 八方向试播`;
document.querySelector('#filter').onchange=e=>{for(const c of cards)c.el.hidden=e.target.value==='integrated'&&!c.row.status.includes('已接入');};
async function refresh(){try{const response=await fetch('/api/animation-events');if(!response.ok)throw Error();const data=await response.json(),counts=new Map(data.counts.map(c=>[c.key,c]));for(const c of cards){const item=counts.get('a'+c.id);c.stat.textContent=`历史触发 ${item?.count||0} 次 · 最近：${item?.lastTriggeredAt?new Date(item.lastTriggeredAt).toLocaleString():'尚未触发'}`;}document.querySelector('#sync').textContent='云端已同步 · '+new Date().toLocaleTimeString();const tbody=document.querySelector('#history');tbody.replaceChildren();for(const item of data.recent){const tr=document.createElement('tr');for(const value of [new Date(item.triggeredAt).toLocaleString(),rows.find(r=>'a'+r.id===item.key)?.title||item.key,item.player,`${item.round} / ${item.slot}`,item.phaseSeconds.toFixed(3)+'秒',item.direction]){const td=document.createElement('td');td.textContent=value;tr.append(td);}tbody.append(tr);}}catch{document.querySelector('#sync').textContent='云端统计暂不可用，可稍后刷新';}}
document.querySelector('#refresh').onclick=refresh;refresh();setInterval(refresh,10000);
window.__footballPreview={cards:cards.length,sampleFootballPose,FOOTBALL_ACTIONS,directions:8,contactAt(id,q){paused=true;frozen=q*600;const c=cards.find(c=>c.id===id);compactContactScene(c,q);},raceAt(q,winner=0){paused=true;frozen=q*quickLooseTiming(5.45).total*1000+winner*1400;const c=cards.find(c=>c.baseId===13);raceScene(c,q,winner*1.4);}};

function rulesScene(card,q){
 const {ctx}=card,id=card.id;ctx.clearRect(0,0,640,330);ctx.fillStyle='#235642';ctx.fillRect(0,0,640,330);ctx.strokeStyle='#ffffff55';ctx.beginPath();ctx.moveTo(15,275);ctx.lineTo(625,275);ctx.stroke();
 const kind=id===112?'throw_in':id===117?'foul':'kick',raw=restartPose(kind,q),root={x:210,y:230},actor=body(ctx,root,'stand',q,'#287cf1',1,'9',{...raw,direction:{x:1,y:0}});body(ctx,{x:470,y:230},'stand',q,'#e44a50',-1,'1');
 let bp=mapGround({x:230,y:230}),height=0;
 if(id===112){const facing={x:direction.x,y:direction.y*.48},hands=throwHandAnchors(actor,18,q,facing);ctx.strokeStyle='#f1c9a5';ctx.lineWidth=4;ctx.lineCap='round';for(const [i,hand] of [hands.left,hands.right].entries()){ctx.beginPath();ctx.moveTo(actor.x+(i?1:-1)*12,actor.y+13);ctx.lineTo(hand.x,hand.y);ctx.stroke();}if(q<.45){bp=hands.ball;ball(ctx,bp.x,bp.y,mapGround(root).y);}else{const to=mapGround({x:470,y:230}),u=(q-.45)/.55;bp={x:lerp(hands.ball.x,to.x,u),y:lerp(hands.ball.y,to.y,u)-Math.sin(u*Math.PI)*50};ball(ctx,bp.x,bp.y,to.y);}}
 else {if(id!==117&&q>=.45){const u=(q-.45)/.55;bp=mapGround({x:lerp(230,470,u),y:230});height=id===114?Math.sin(u*Math.PI)*60:0;}ball(ctx,bp.x,bp.y-height,bp.y);}
 ctx.fillStyle='#f3f6ed';ctx.font='18px system-ui';ctx.fillText(card.row.title,16,28);card.label.textContent=id===117?'接触判罚 · 吹停后收势':q<.45?id===112?'双手举球 · 双脚站定':'准备出球':'触球后立即释放 · 使用实际球路';
}
