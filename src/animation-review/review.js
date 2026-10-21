import {sampleHighlightBody,HIGHLIGHT_BODY_IDS} from '../game/highlight-body.js';
import {prepareFootballFigure,drawFootballFigure} from '../game/presentation/figure.js';
import {recordedEventView} from '../game/presentation/recorded-event.js';
import {technicalPlayerPoint,technicalBallPoint,spinDirection,interceptionPlayerPoint,interceptionBallAfterTouch} from '../game/presentation/highlight-choreography.js';
const $=selector=>document.querySelector(selector);
const cards=$('#cards'),toast=$('#toast'),status=$('#cloud-status'),indicator=$('#cloud-indicator');
const savedBoard=localStorage.getItem('footballAnimationReviewBoard');
const queryBoard=new URL(location.href).searchParams.get('board');
const validBoard=value=>/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(value||'');
const board=validBoard(queryBoard)?queryBoard:validBoard(savedBoard)?savedBoard:'e4d14dc0-8e16-40fa-9540-8a1663b85eaa';
localStorage.setItem('footballAnimationReviewBoard',board);
if(queryBoard!==board){const url=new URL(location.href);url.searchParams.set('board',board);history.replaceState(null,'',url);}
let scenes=[],comments=[],filter='all',search=new URL(location.href).searchParams.get('scene')?.trim().toLowerCase()||'',timer=null;
const motion=new Map(),observer=new IntersectionObserver(entries=>{for(const entry of entries){const m=motion.get(entry.target.dataset.id);if(m)m.visible=entry.isIntersecting;}},{rootMargin:'180px'});
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>{t=clamp(t);return t*t*(3-2*t);};
const mix=(a,b,t)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),z:lerp(a.z||0,b.z||0,t)});
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function notice(message){toast.textContent=message;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2400);}
function setCloud(ok,message){indicator.classList.toggle('ok',ok);indicator.classList.toggle('error',!ok);status.textContent=message;}
function routePoint(route,t){
 if(!route?.start||!route?.end)return null;const a=route.start,b=route.end,q=clamp(t),control=route.control;
 let p=control?{x:(1-q)**2*a.x+2*(1-q)*q*control.x+q*q*b.x,y:(1-q)**2*a.y+2*(1-q)*q*control.y+q*q*b.y}:mix(a,b,q);
 if(!control&&route.bend){const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy)||1,offset=4*q*(1-q)*route.bend;p={x:p.x-dy/length*offset,y:p.y+dx/length*offset};}
 return {...p,z:lerp(a.z||0,b.z||0,q)+4*q*(1-q)*(route.apex||0)};
}
function routeSettled(route,start,end,t){if(!route)return mix(start,end,t);const p=routePoint(route,t),a=routePoint(route,0),b=routePoint(route,1),chord=mix(a,b,t),base=mix(start,end,t);return{x:base.x+p.x-chord.x,y:base.y+p.y-chord.y,z:p.z||0};}
function pathPoint(points,t){if(!points?.length)return null;if(points.length===1)return points[0];const lengths=points.slice(1).map((p,i)=>dist(points[i],p)),total=lengths.reduce((a,b)=>a+b,0)||1;let remaining=clamp(t)*total;for(let i=0;i<lengths.length;i++){if(remaining<=lengths[i]||i===lengths.length-1)return mix(points[i],points[i+1],lengths[i]?remaining/lengths[i]:1);remaining-=lengths[i];}return points.at(-1);}
function samplePlayer(scene,player,u){
 const sample=scene.sample,sequence=sample.sequence,active=player.participant||player.opponent||player.actor;
 let start=.10,end=.86;if(sequence?.kind==='double-save'&&player.id===sequence.secondShooterId){start=.05;end=.48;}if(sequence?.kind==='first-touch-escape'&&player.id===sequence.receiverId){start=.53;end=.90;}
 if(sequence?.kind==='cut-through-pass'&&player.id===sequence.defenderId){start=.08;end=.58;}
 if(scene.id==='C26'&&player.opponent){start=.04;end=.32;}
 if(scene.id==='C11'&&player.opponent){start=.04;end=.32;}
 let t=ease(clamp((u-start)/(end-start))),p=pathPoint(player.path,t)||mix(player.from,player.to,t);
 if(sequence?.kind==='cut-through-pass'&&player.id===sequence.defenderId){const contact=sequence.steps.find(step=>step.kind==='intercept')?.at||sequence.controlAt;p=interceptionPlayerPoint(u,player.from,contact,sequence.controlAt);}
 if(active&&['C04','C05','C06','C07'].includes(scene.id)){
  const actor=sample.players.find(q=>q.actor);
  const defender=sample.players.find(q=>q.opponent);
  if(actor&&(player.actor||player.opponent))p=technicalPlayerPoint(scene.id,player.actor?'actor':'defender',u,player.from,player.to,{actorFrom:actor.from,actorTo:actor.to,defenderFrom:defender?.from,attackDirection:sample.side?-1:1});
 }
 let pose=active&&u>.12&&u<.85?'run':'stand';
 if(player.participant&&['C18','C19','C20'].includes(scene.id)&&u>.46&&u<.7){p={...p,z:2.2*Math.sin(Math.PI*clamp((u-.46)/.24))};pose='jump';}
 if(scene.id==='C02'&&player.participant&&u>.27&&u<.58){p={...p,z:2.4*Math.sin(Math.PI*clamp((u-.27)/.31))};pose='jump';}
 if(scene.id==='C01'&&player.participant&&u>.25&&u<.58)pose='rainbow';
 if(['D02','C02','C01'].includes(scene.id)&&player.opponent&&u>.3&&u<.7)pose='slide';
 if(scene.id==='C17'&&player.id===sequence?.keeperId&&u>.26&&u<.88)pose='save';
 if(scene.id==='C21'&&player.participant&&u>.35&&u<.7)pose='poke';
 if(scene.id==='C24'&&player.participant&&u>.4&&u<.8)pose='intercept';
 if(['C05','C06','C07','C04'].includes(scene.id)&&player.participant&&u>.25&&u<.75)pose='skill';
 if(scene.id==='C26'&&player.opponent&&u>.32&&u<.7){const hit=sample.route&&routePoint(sample.route,.52),n=hit?dist(p,hit):1;if(n<8)p={...p,x:p.x+(hit.x-p.x)*.14*Math.sin(Math.PI*(u-.32)/.38),y:p.y+(hit.y-p.y)*.14*Math.sin(Math.PI*(u-.32)/.38)};pose='hook-miss';}
 if(['A05','C19','N03'].includes(scene.id)&&player.actor&&u>.35&&u<.65)pose='shot';
 return {...p,pose,active};
}
function stageRoute(sequence,index){return sequence?.steps?.[index]?.route||null;}
function sampleBall(scene,u,positions){
 const s=scene.sample,seq=s.sequence,start=s.ballStart||s.start,end=s.ballEnd||s.end||start,route=s.route;
 if(!start||!end)return {x:52.5,y:34,z:0};
 const k=seq?.kind;
 if(k==='double-save'){if(u<.13)return start;if(u<.36)return routePoint(stageRoute(seq,0),(u-.13)/.23)||mix(start,end,u);if(u<.54)return routePoint(stageRoute(seq,1),(u-.36)/.18)||end;if(u<.64)return stageRoute(seq,1)?.end||end;if(u<.84)return routePoint(stageRoute(seq,2),(u-.64)/.20)||end;return {...end,z:u<.94?.6:0};}
 if(k==='rainbow-over-scripted-slide'||k==='man-ball-split')return u<.10?start:u<.76?routePoint(route,(u-.10)/.66)||mix(start,end,u):end;
 if(k==='evade-scripted-slide')return u<.09?start:u<.34?mix(start,end,ease((u-.09)/.25)):end;
 if(k==='pre-shot-poke')return u<.40?start:u<.75?mix(start,end,ease((u-.40)/.35)):end;
 if(k==='cut-through-pass'){const hit=routePoint(route,seq.contactT||.65)||seq.steps?.find(v=>v.kind==='intercept')?.at||start,controlled=seq.controlAt||end;return u<.12?start:u<.68?routePoint(route,(u-.12)/.56*(seq.contactT||.65))||mix(start,hit,u):interceptionBallAfterTouch(u,hit,controlled,start);}
 if(k==='first-touch-escape')return u<.10?start:u<.56?routePoint(route,(u-.10)/.46)||mix(start,end,u):u<.86?mix(seq.touch||end,seq.exit||end,ease((u-.56)/.30)):end;
 if(scene.id==='C12'&&s.previous){if(u<.08)return s.previous.start||start;if(u<.44)return routePoint(s.previous.route,(u-.08)/.36)||mix(s.previous.start||start,s.previous.end||start,(u-.08)/.36);if(u<.55)return start;return routePoint(route,(u-.55)/.38)||mix(start,end,ease((u-.55)/.38));}
 if(scene.id==='N01'&&s.previous){if(u<.07)return s.previous.start;if(u<.45)return routeSettled(s.previous.route,s.previous.start,s.previous.end,(u-.07)/.38);if(u<.50)return s.previous.end;if(u<.87)return routeSettled(route,start,end,(u-.50)/.37);return end;}
 if(s.action==='pass'||['C11','N01','N02','C26','S05','N04'].includes(scene.id))return u<.06?start:u<.73?routeSettled(route,start,end,(u-.06)/.67):end;
 if(['C18','C19','C20'].includes(scene.id))return u<.15?start:u<.62?routePoint(route,(u-.15)/.47)||mix(start,end,ease((u-.15)/.47)):end;
 if(['A05','N03'].includes(scene.id)&&s.action==='shoot')return u<.36?start:u<.86?routePoint(route,(u-.36)/.5)||mix(start,end,ease((u-.36)/.5)):end;
 if(['C04','C05','C06','C07'].includes(scene.id)){const actor=s.players.find(p=>p.actor),p=actor&&positions.get(actor.id);if(p)return technicalBallPoint(scene.id,u,start,end,p,actor.from,actor.to,s.side?-1:1,s.players.find(q=>q.opponent)?.from);}
 return u<.12?start:u<.78?routePoint(route,(u-.12)/.66)||mix(start,end,ease((u-.12)/.66)):end;
}
function camera(scene){const s=scene.sample,points=[s.ballStart,s.ballEnd,s.start,s.end,s.previous?.start,s.previous?.end,...s.players.filter(p=>p.participant||p.opponent||p.actor).flatMap(p=>[p.from,p.to])].filter(Boolean);let x0=Math.min(...points.map(p=>p.x)),x1=Math.max(...points.map(p=>p.x)),y0=Math.min(...points.map(p=>p.y)),y1=Math.max(...points.map(p=>p.y));let width=Math.max(38,x1-x0+17,(y1-y0+12)*16/9),height=width*9/16;if(height>68){height=68;width=height*16/9;}let cx=(x0+x1)/2,cy=(y0+y1)/2;return {left:cx-width/2,top:cy-height/2,width,height};}
function drawBody(ctx,scene,p,q,u,sx,sy,W,H){
 const x=sx(q.x),y=sy(q.y),z=(q.z||0)*9,r=14;
 if(x<-25||x>W+25||y<-25||y>H+25)return;
 const seq=scene.sample.sequence,role=p.id===seq?.defenderId||!p.actor&&p.id===scene.sample.opponentId?'defender':p.actor||scene.id==='N01'&&p.id===scene.sample.previous?.actorId?'actor':p.participant?'receiver':null;
 let direction={x:p.to.x-p.from.x,y:p.to.y-p.from.y};
 if(p.actor&&scene.sample.action==='pass')direction={x:scene.sample.ballEnd.x-p.from.x,y:scene.sample.ballEnd.y-p.from.y};
 if(role==='defender'){const target=scene.id==='C02'?seq?.steps?.find(step=>step.kind==='ball-touch-away')?.to||scene.sample.ballStart:scene.sample.ballStart;direction={x:target.x-p.from.x,y:target.y-p.from.y};}
 if(role==='actor')direction=spinDirection(scene.id,u,direction);
 if(scene.id==='C07'&&u<.39&&(role==='actor'||role==='defender'))direction={x:scene.sample.side?-1:1,y:0};
 const length=Math.hypot(direction.x,direction.y)||1;direction={x:direction.x/length,y:direction.y/length};
 const screen={x:sx(q.x+direction.x)-sx(q.x),y:sy(q.y+direction.y)-sy(q.y)};
 const bodyTime=scene.id==='N01'&&scene.sample.previous&&p.actor?clamp((u-.49)/.51):u;
 const raw=role?sampleHighlightBody(scene.id,role,bodyTime):q.pose==='run'?{lean:12,lift:.05,shift:.1,lag:-.04,squash:[1,1]}:{lean:0,shift:0,lift:0,lag:0,squash:[1,1]};
 const figure=prepareFootballFigure({x,y:y-z},r,raw,screen,{slide:scene.id==='C02'&&role==='defender',q:u});
 ctx.fillStyle='#081c20a8';ctx.beginPath();ctx.ellipse(x,y+2,r*1.1,r*.39,0,0,Math.PI*2);ctx.fill();
 if(role){ctx.strokeStyle='#efffa9';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y+1,r*1.5,r*.65,0,0,Math.PI*2);ctx.stroke();}
 drawFootballFigure(ctx,{radius:r,figure,side:p.side,num:p.num,goalkeeper:p.num===1});
}
function drawScene(scene,canvas,u){
 const ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height,view=scene._camera||(scene._camera=camera(scene)),sx=x=>(x-view.left)/view.width*W,sy=y=>(y-view.top)/view.height*H;
 ctx.clearRect(0,0,W,H);ctx.fillStyle='#25773b';ctx.fillRect(0,0,W,H);
 for(let col=0;col<19;col++){const x=sx(col*105/19),next=sx((col+1)*105/19);ctx.fillStyle=col%2?'#2b8540':'#26793c';ctx.fillRect(x,0,next-x,H);}
 ctx.save();ctx.strokeStyle='#ffffff24';ctx.lineWidth=1;for(let col=0;col<=19;col++){const x=sx(col*105/19);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let row=0;row<=11;row++){const y=sy(row*68/11);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}ctx.restore();
 ctx.save();ctx.strokeStyle='#ffffffb8';ctx.lineWidth=2;const rect=(x,y,w,h)=>ctx.strokeRect(sx(x),sy(y),w/view.width*W,h/view.height*H);rect(0,0,105,68);ctx.beginPath();ctx.moveTo(sx(52.5),sy(0));ctx.lineTo(sx(52.5),sy(68));ctx.stroke();ctx.beginPath();ctx.ellipse(sx(52.5),sy(34),9.15/view.width*W,9.15/view.height*H,0,0,Math.PI*2);ctx.stroke();for(const side of [0,1]){const x=side?105-3*105/19:0;rect(x,3*68/11,3*105/19,5*68/11);const small=side?105-105/19:0;rect(small,4*68/11,105/19,3*68/11);}ctx.restore();
 const positions=new Map(scene.sample.players.map(p=>[p.id,samplePlayer(scene,p,u)]));
 if(scene.id==='C11'&&scene.sample.route){const route=scene.sample.route,progress=clamp((u-.06)/.67);ctx.save();ctx.strokeStyle='#ff7373bd';ctx.lineWidth=2.5;ctx.setLineDash([7,5]);ctx.beginPath();ctx.moveTo(sx(route.start.x),sy(route.start.y));ctx.lineTo(sx(route.end.x),sy(route.end.y));ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#fff0a9';ctx.lineWidth=4;ctx.beginPath();for(let i=0;i<=40;i++){const t=i/40,p=routePoint(route,t);if(!p||t>progress)break;if(i)ctx.lineTo(sx(p.x),sy(p.y));else ctx.moveTo(sx(p.x),sy(p.y));}ctx.stroke();ctx.restore();}
 if(scene.id==='N01'&&scene.sample.previous){const prev=scene.sample.previous;ctx.save();ctx.setLineDash([5,5]);ctx.strokeStyle='#f6f6beaa';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(sx(prev.start.x),sy(prev.start.y));ctx.lineTo(sx(prev.end.x),sy(prev.end.y));ctx.stroke();ctx.restore();}
 for(const p of scene.sample.players){if(!p.participant&&!p.opponent&&!p.actor)continue;const actor=scene.sample.players.find(q=>q.actor),defender=scene.sample.players.find(q=>q.opponent),technical=['C04','C05','C06','C07'].includes(scene.id)&&(p.actor||p.opponent);const points=technical?Array.from({length:41},(_,i)=>technicalPlayerPoint(scene.id,p.actor?'actor':'defender',i/40,p.from,p.to,{actorFrom:actor.from,actorTo:actor.to,defenderFrom:defender?.from,attackDirection:scene.sample.side?-1:1})):p.path?.length?p.path:[p.from,p.to];ctx.save();ctx.setLineDash([4,5]);ctx.strokeStyle=p.side===0?'#a7dbff99':'#ffd4b599';ctx.lineWidth=1.7;ctx.beginPath();points.forEach((v,i)=>i?ctx.lineTo(sx(v.x),sy(v.y)):ctx.moveTo(sx(v.x),sy(v.y)));ctx.stroke();ctx.restore();}
 const ball=sampleBall(scene,u,positions);for(const p of [...scene.sample.players].sort((a,b)=>positions.get(a.id).y-positions.get(b.id).y))drawBody(ctx,scene,p,positions.get(p.id),u,sx,sy,W,H);
 const bx=sx(ball.x),by=sy(ball.y),height=(ball.z||0)*9;if(bx>-20&&bx<W+20&&by>-20&&by<H+20){ctx.fillStyle='#10251e7a';ctx.beginPath();ctx.ellipse(bx,by,5,2.2,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f5f8e9';ctx.strokeStyle='#1d3128';ctx.lineWidth=1.3;ctx.beginPath();ctx.arc(bx,by-height-3,5.2,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#26372b';ctx.beginPath();ctx.arc(bx+1,by-height-4,1.4,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='#071a17b8';ctx.fillRect(9,H-30,194,20);ctx.fillStyle='#ddf3db';ctx.font='700 10px Inter,sans-serif';ctx.fillText(`${scene.id} · ${scene.sample.actor} · E${scene.sourceEvent}`,16,H-16);
}
function stageLabel(scene,u){const phases=scene.phases.length?scene.phases:[scene.condition,scene.result];return phases[Math.min(phases.length-1,Math.floor(u*phases.length))]||scene.name;}
function animate(now){for(const m of motion.values()){if(!m.visible)continue;if(m.playing){m.u=((now-m.started)/m.duration)%1;drawScene(m.scene,m.canvas,m.u);m.progress.style.width=(m.u*100)+'%';m.chip.textContent=stageLabel(m.scene,m.u);}else if(!m.drawn){drawScene(m.scene,m.canvas,m.u);m.drawn=true;}}requestAnimationFrame(animate);}
function download(name,mime,text){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type:mime}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportPayload(){return{format:'football-animation-review-v464',board,source:'V4.64 留言修正版；次数来自十场新版完整比赛',exportedAt:new Date().toISOString(),scenes:scenes.map(scene=>({id:scene.id,name:scene.name,expectedPerMatch:scene.count10/10,observedInTenMatches:scene.count10,condition:scene.condition,comments:comments.filter(c=>c.sceneId===scene.id),unsentDraft:document.querySelector(`#scene-${scene.id} textarea`)?.value.trim()||''}))};}
function markdown(){const d=exportPayload();return [`# 足球精彩动作评审`,``,`十场原生比赛实测；首批 10 类。导出时间：${d.exportedAt}`,`留言板链接：${location.href}`,``,...d.scenes.flatMap(s=>[`## ${s.id} ${s.name}`,`十场 ${s.observedInTenMatches} 次；场均参考 ${s.expectedPerMatch.toFixed(1)} 次。`,`触发条件：${s.condition}`,``,...(s.comments.length?s.comments.map(c=>`- ${c.createdAt}：${c.body.replace(/\n/g,'\n  ')}`):['- 暂无已保存留言']),...(s.unsentDraft?[`- 【未提交草稿】${s.unsentDraft.replace(/\n/g,'\n  ')}`]:[]),``])].join('\n');}
function renderComments(){for(const scene of scenes){const list=document.querySelector(`#comments-${scene.id}`),items=comments.filter(c=>c.sceneId===scene.id);if(!list)continue;list.innerHTML=items.length?items.map(c=>`<div class="comment"><p>${esc(c.body)}</p><div class="comment-footer"><time>${esc(new Date(c.createdAt).toLocaleString('zh-CN'))}</time><button class="comment-delete" data-delete="${esc(c.id)}" aria-label="删除这条留言">删除</button></div></div>`).join(''):'<p class="empty-note">还没有留言。可直接写下希望修改的动作或触发条件。</p>';document.querySelector(`#comment-total-${scene.id}`).textContent=`${items.length} 条`; }$('#comment-count').textContent=`${comments.filter(c=>HIGHLIGHT_BODY_IDS.has(c.sceneId)).length} 条本期留言`;applyFilter();}
function applyFilter(){let visible=0;for(const scene of scenes){const card=document.getElementById(`scene-${scene.id}`);const matches=(filter==='all'||scene.group===filter||filter==='commented'&&comments.some(c=>c.sceneId===scene.id))&&(!search||`${scene.id} ${scene.name} ${scene.condition}`.toLowerCase().includes(search));card.classList.toggle('hidden',!matches);visible+=matches;}$('#all-count').textContent=String(scenes.length);}
function cardHtml(scene){const group={individual:'个人技术',team:'团队配合',defence:'精彩防守'}[scene.group],reuse='V4.64 留言修正版',steps=scene.phases.length?scene.phases:[scene.condition,scene.result];return `<article class="card" id="scene-${scene.id}" data-id="${scene.id}"><div class="card-head"><div class="card-kicker"><span class="id">${scene.id}</span><span class="pill">${group}</span><span class="pill">${reuse}</span></div><h3>${esc(scene.name)}</h3><div class="metrics"><div class="metric"><strong>${(scene.count10/10).toFixed(1)}</strong><span>新版场均参考</span></div><div class="metric"><strong>${scene.count10}</strong><span>新版十场触发</span></div><div class="metric"><strong>${scene.matchesSeen}/10</strong><span>新版出现比赛</span></div></div><p class="condition"><b>触发条件　</b>${esc(scene.condition)}</p><p class="outcome">结果：${esc(scene.result)}</p></div><div class="motion-wrap"><div class="motion-stage"><canvas width="600" height="338" aria-label="${esc(scene.name)} 动画"></canvas><span class="stage-chip">${esc(steps[0])}</span><span class="source-chip">完整模拟 E${scene.sourceEvent}</span></div></div><div class="controls"><button data-replay="${scene.id}">↺ 重新播放</button><span class="progress"><span></span></span><button data-pause="${scene.id}">暂停</button></div><div class="steps">${steps.map((step,i)=>`<span>${i+1} ${esc(step)}</span>`).join('')}</div><div class="feedback"><h4>给 ${scene.id} 留言 <small id="comment-total-${scene.id}">0 条</small></h4><div class="comment-list" id="comments-${scene.id}"></div><form class="comment-form" data-scene="${scene.id}"><textarea maxlength="4000" placeholder="例如：起脚太慢；希望防守者从球员右侧滑入…" aria-label="给 ${esc(scene.name)} 留言"></textarea><div class="row"><small>逐条保存到云端，可集中导出</small><button type="submit">添加留言</button></div></form></div></article>`;}
async function loadComments(){try{const response=await fetch(`/api/animation-review?board=${encodeURIComponent(board)}`,{cache:'no-store'}),data=await response.json();if(!response.ok)throw Error(data.error||'读取失败');comments=data.comments||[];setCloud(true,'云端留言已同步');renderComments();}catch(error){setCloud(false,error.message||'云端暂不可用');renderComments();}}
async function saveComment(form){const textarea=form.querySelector('textarea'),body=textarea.value.trim();if(!body){textarea.focus();return;}const button=form.querySelector('button');button.disabled=true;button.textContent='保存中…';try{const response=await fetch('/api/animation-review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({board,sceneId:form.dataset.scene,body})}),data=await response.json();if(!response.ok)throw Error(data.error||'保存失败');comments.push(data.comment);textarea.value='';localStorage.removeItem(`animationDraft:${board}:${form.dataset.scene}`);setCloud(true,'云端留言已同步');renderComments();notice('留言已保存');}catch(error){setCloud(false,error.message||'保存失败');notice('保存未完成，内容仍在输入框');}finally{button.disabled=false;button.textContent='添加留言';}}
async function deleteComment(id){if(!confirm('删除这条留言？'))return;try{const response=await fetch('/api/animation-review',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({board,id})}),data=await response.json();if(!response.ok)throw Error(data.error||'删除失败');comments=comments.filter(c=>c.id!==id);renderComments();notice('留言已删除');}catch(error){notice(error.message||'删除失败');}}
async function init(){try{const response=await fetch('./scenes.json'),data=await response.json();scenes=data.scenes.filter(scene=>HIGHLIGHT_BODY_IDS.has(scene.id));if(scenes.length!==10)throw Error('动作清单数量异常');for(const scene of scenes){const view=recordedEventView(scene.sample);scene.sample.ballStart=view.ballStart;scene.sample.ballEnd=view.ballEnd;scene.sample.presentation=view;}cards.innerHTML=scenes.map(cardHtml).join('');$('#search').value=search;for(const scene of scenes){const article=document.getElementById(`scene-${scene.id}`),canvas=article.querySelector('canvas'),chip=article.querySelector('.stage-chip'),progress=article.querySelector('.progress span');motion.set(scene.id,{scene,canvas,chip,progress,u:0,started:performance.now()+Math.random()*1600,duration:4100,playing:true,visible:false,drawn:false});observer.observe(article);drawScene(scene,canvas,0);const input=article.querySelector('textarea');input.value=localStorage.getItem(`animationDraft:${board}:${scene.id}`)||'';input.addEventListener('input',()=>localStorage.setItem(`animationDraft:${board}:${scene.id}`,input.value));}applyFilter();requestAnimationFrame(animate);await loadComments();}catch(error){cards.innerHTML=`<p>动画清单读取失败：${esc(error.message)}</p>`;setCloud(false,'页面暂不可用');}}
cards.addEventListener('submit',event=>{if(!event.target.matches('.comment-form'))return;event.preventDefault();saveComment(event.target);});
cards.addEventListener('click',event=>{const replay=event.target.closest('[data-replay]'),pause=event.target.closest('[data-pause]'),del=event.target.closest('[data-delete]');if(replay){const m=motion.get(replay.dataset.replay);m.started=performance.now();m.u=0;m.playing=true;m.drawn=false;replay.parentElement.querySelector('[data-pause]').textContent='暂停';}if(pause){const m=motion.get(pause.dataset.pause);m.playing=!m.playing;if(m.playing)m.started=performance.now()-m.u*m.duration;else m.drawn=false;pause.textContent=m.playing?'暂停':'继续';}if(del)deleteComment(del.dataset.delete);});
document.querySelector('.filters').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(!button)return;filter=button.dataset.filter;document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('active',b===button));applyFilter();});
$('#search').addEventListener('input',event=>{search=event.target.value.trim().toLowerCase();applyFilter();});
$('#share-board').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);notice('留言板链接已复制');}catch{notice('请从浏览器地址栏复制此链接');}});
$('#export-markdown').addEventListener('click',()=>{download('足球精彩动作评审-留言.md','text/markdown;charset=utf-8',markdown());notice('已导出 Markdown');});
$('#export-json').addEventListener('click',()=>{download('足球精彩动作评审-留言.json','application/json;charset=utf-8',JSON.stringify(exportPayload(),null,2));notice('已导出 JSON');});
init();
