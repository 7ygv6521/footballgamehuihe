// Visual performance of a settled action. All offsets return to the recorded
// positions by the end; this module never chooses a cell, winner or ball route.
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:(a.z||0)+((b.z||0)-(a.z||0))*t});
const frame=(from,to)=>{const dx=to.x-from.x,dy=to.y-from.y,n=Math.hypot(dx,dy)||1;return {f:{x:dx/n,y:dy/n},s:{x:-dy/n,y:dx/n}}};
const add=(p,v,d)=>({x:p.x+v.x*d,y:p.y+v.y*d,z:p.z||0});
const travel=(from,to,u,start=.10,end=.88)=>mix(from,to,ease((u-start)/(end-start)));

export function technicalPlayerPoint(scene,role,u,from,to,{actorFrom=from,actorTo=to,defenderFrom=null,attackDirection=1}={}){
 u=clamp(u);if(u>=.94)return to;
 const {f,s}=scene==='C07'?{f:{x:attackDirection,y:0},s:{x:0,y:attackDirection}}:frame(actorFrom,actorTo);
 if(role==='defender'&&scene==='C05'){
  // He commits to the first side, overruns the touch, brakes, then recovers
  // inside the same grid cell after the attacker has left on the other side.
  const follow=u<.22?0:u<.42?2.25*ease((u-.22)/.20):u<.56?2.25+.65*ease((u-.42)/.14):u<.82?2.9*(1-ease((u-.56)/.26)):0;
  return add(travel(from,to,u),s,follow);
 }
 if(role==='defender'&&scene==='C07'){
  // Keep running while the carrier brakes. Only after being beaten does the
  // marker overshoot, stop and recover inside the final forward cell.
  const overrun=add(to,f,.90);
  if(u<.75)return mix(from,overrun,clamp((u-.08)/.67));
  return travel(overrun,to,u,.75,.94);
 }
 if(role!=='actor')return travel(from,to,u);
 if(scene==='C04'){
  if(!defenderFrom)return travel(from,to,u);
  const center=defenderFrom,r=Math.max(2.8,Math.hypot(from.x-center.x,from.y-center.y));
  const start=Math.atan2(from.y-center.y,from.x-center.x),end=Math.atan2(to.y-center.y,to.x-center.x);
  const positive=Math.sin(end-start)>=0?1:-1;
  const theta=start+positive*Math.PI*ease((u-.20)/.52);
  const around={x:center.x+Math.cos(theta)*r,y:center.y+Math.sin(theta)*r};
  if(u<.20)return from;
  return u<.72?around:mix(around,to,ease((u-.72)/.22));
 }
 if(scene==='C05'){
  if(u<.22)return from;
  if(u<.43)return add(from,s,1.7*ease((u-.22)/.21));
  if(u<.60)return add(add(from,s,1.7-3.7*ease((u-.43)/.17)),f,.35*ease((u-.43)/.17));
  return travel(add(add(from,s,-2),f,.35),to,u,.60,.92);
 }
 if(scene==='C06'){
  if(u<.24)return from;
  if(u<.40)return add(from,s,.65*ease((u-.24)/.16));
  if(u<.54)return add(from,s,.65-1.6*ease((u-.40)/.14));
  return travel(add(from,s,-.95),to,u,.54,.91);
 }
 if(scene==='C07'){
  if(u<.28)return travel(from,add(from,f,1.65),u,.08,.28);
  if(u<.42)return add(from,f,1.65);
  return travel(add(from,f,1.65),to,u,.42,.91);
 }
 return travel(from,to,u);
}

export function interceptionPlayerPoint(u,from,contact,control){
 u=clamp(u);
 if(u<.12)return from;
 if(u<.68)return mix(from,contact,ease((u-.12)/.56));
 return mix(contact,control,ease((u-.68)/.26));
}

export function interceptionBallAfterTouch(u,contact,control,passStart){
 u=clamp(u);
 const dx=contact.x-passStart.x,dy=contact.y-passStart.y,n=Math.hypot(dx,dy)||1;
 const lateral={x:-dy/n,y:dx/n},toward=(control.x-contact.x)*lateral.x+(control.y-contact.y)*lateral.y;
 // Poke the ball away from the defender's final body position, then pursue it.
 const sign=toward?-Math.sign(toward):contact.y>34?-1:1;
 const out={x:Math.max(0,Math.min(104.99,contact.x+(control.x-contact.x)*.42+lateral.x*sign*2.1)),y:Math.max(0,Math.min(67.99,contact.y+(control.y-contact.y)*.42+lateral.y*sign*2.1)),z:0};
 if(u<.68)return contact;
 if(u<.79)return mix(contact,out,ease((u-.68)/.11));
 return mix(out,control,ease((u-.79)/.15));
}

export function technicalBallPoint(scene,u,start,end,actorPoint,actorFrom,actorTo,attackDirection=1,defenderFrom=null){
 u=clamp(u);if(u>=.94)return end;
 const {f,s}=scene==='C07'?{f:{x:attackDirection,y:0},s:{x:0,y:attackDirection}}:frame(actorFrom,actorTo),foot=p=>add(p,f,.62);
 if(scene==='C04'){
  const radial=defenderFrom?frame(defenderFrom,actorPoint).f:f;
  const near=add(actorPoint,radial,.72);
  return u<.12?mix(start,near,u/.12):u>.88?mix(near,end,ease((u-.88)/.06)):near;
 }
 if(scene==='C05'||scene==='C06'){
  const first=scene==='C05'?2.0:2.1,second=scene==='C05'?-1.7:-2.0;
  if(u<.17)return start;
  if(u<.38)return mix(start,add(add(actorFrom,f,.7),s,first),ease((u-.17)/.21));
  if(u<.54)return mix(add(add(actorFrom,f,.7),s,first),add(add(actorFrom,f,1.05),s,second),ease((u-.38)/.16));
  const pursuit=foot(actorPoint);return u<.88?pursuit:mix(pursuit,end,ease((u-.88)/.06));
 }
 if(scene==='C07'){
  const pushed=add(actorFrom,f,2.35);
  if(u<.14)return start;if(u<.31)return mix(start,pushed,ease((u-.14)/.17));
  if(u<.43)return pushed;
  if(u<.65)return mix(pushed,add(actorFrom,f,-.35),ease((u-.43)/.22));
  return mix(add(actorFrom,f,-.35),end,ease((u-.65)/.29));
 }
 const p=foot(actorPoint);return u<.10?mix(start,p,u/.10):u>.88?mix(p,end,ease((u-.88)/.06)):p;
}

export function spinDirection(scene,u,normal){
 if(scene!=='C04'||u<.22||u>.70)return normal;
 const a=(u-.22)/.48*Math.PI*2,c=Math.cos(a),s=Math.sin(a);
 return {x:normal.x*c-normal.y*s,y:normal.x*s+normal.y*c};
}
