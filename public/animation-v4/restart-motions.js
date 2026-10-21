// Shared with the animation gallery. Feet remain planted for a two-hand throw.
const clamp=n=>Math.max(0,Math.min(1,n));
export function restartPose(kind,q){q=clamp(q);const contact=.45;
 if(kind==='throw_in')return {lean:q<contact?-12*Math.sin(Math.PI*q/contact):16*Math.sin(Math.PI*(q-contact)/(1-contact)),shift:0,lift:0,lag:0,squash:[1,1],throwHands:true,throwPhase:q};
 if(kind==='stand')return {lean:0,shift:0,lift:0,lag:0,squash:[1,1]};
 if(kind==='foul')return {lean:-20*Math.sin(Math.PI*q),shift:0,lift:-.14*Math.sin(Math.PI*q),lag:.08,squash:[1,1]};
 const strike=Math.max(0,1-Math.abs(q-contact)/.18);return {lean:q<contact?-12*Math.sin(Math.PI*q/contact):28*Math.sin(Math.PI*(q-contact)/(1-contact)),shift:strike*.24,lift:0,lag:-strike*.08,squash:[1,1]};
}
export function throwHandAnchors(head,r,q,direction={x:1,y:0}){
 const u=clamp(q/.45),forward=(u*u)*r*.62,up=r*(.45+.40*Math.sin(Math.PI*u));
 const middle={x:head.x+direction.x*forward,y:head.y-up+direction.y*forward};return {left:{x:middle.x-r*.25,y:middle.y},right:{x:middle.x+r*.25,y:middle.y},ball:middle};
}
export function throwBallPoint(root,target,q){const u=clamp(q/.45),dx=target.x-root.x,dy=target.y-root.y,d=Math.hypot(dx,dy)||1;return {x:root.x+dx/d*.45*u*u,y:root.y+dy/d*.45*u*u,z:2.05+.24*Math.sin(Math.PI*u)};}
