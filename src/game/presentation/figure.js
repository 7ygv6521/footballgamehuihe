import {orientFootballPose,directionalFootballAnchors} from '../motion-directions.js';

// The match and the review use the same head/torso geometry, with no feet.
// A player role may change the outline, never the player's body scale.
export function prepareFootballFigure(root,radius,rawPose,screenDirection,{slide=false,q=0}={}){
 const oriented=orientFootballPose(rawPose,screenDirection,{slide,radius,q});
 return {oriented,anchors:directionalFootballAnchors(root,radius,oriented)};
}

export function drawFootballFigure(ctx,{radius,figure,side,num,goalkeeper=false,offset={x:0,y:0},numberFont}){
 const r=radius,{oriented,anchors:a}=figure,pose=oriented.pose,d=oriented.direction,dx=offset.x||0,dy=offset.y||0;
 if(oriented.slideWeight>.04){
  const w=oriented.slideWeight,root={x:a.pivot.x+dx+d.x*r*w,y:a.pivot.y+dy+r*.75+d.y*r*w};
  // Keep the torso at its normal length while rotating it into the slide.
  // A collapsed shoulder/hip segment reads as a suddenly tiny player.
  const hip={x:root.x+d.x*r*.18*w,y:root.y-r*.20*(1-w)+d.y*r*.18*w};
  const shoulder={x:hip.x-d.x*r*1.85*w,y:hip.y-r*1.75*(1-w)-d.y*r*1.85*w};
  const head={x:shoulder.x-d.x*r*.42*w,y:shoulder.y-r*.58*(1-w)-d.y*r*.42*w};
  ctx.save();ctx.lineCap='round';ctx.strokeStyle=side===0?(goalkeeper?'#f5c518':'#1e6fff'):(goalkeeper?'#7dff6a':'#e53935');ctx.lineWidth=r*1.25;
  ctx.beginPath();ctx.moveTo(hip.x,hip.y);ctx.lineTo(shoulder.x,shoulder.y);ctx.stroke();
  ctx.fillStyle='#f1c9a5';ctx.beginPath();ctx.arc(head.x,head.y,r*.6,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#26343b';ctx.beginPath();ctx.arc(head.x+d.x*r*.4,head.y+d.y*r*.25,r*.1,0,Math.PI*2);ctx.fill();ctx.restore();return a;
 }
 ctx.save();ctx.translate(a.pivot.x+dx,a.pivot.y+dy);ctx.rotate(pose.lean*Math.PI/180);
 if(pose.squash)ctx.scale(...pose.squash);
 ctx.fillStyle=side===0?(goalkeeper?'#f5c518':'#1e6fff'):(goalkeeper?'#7dff6a':'#e53935');
 ctx.fillRect(-r*.72,-r*2.25,r*1.44,r*2.25);
 ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`bold ${Math.round(numberFont??r*.82)}px Inter,sans-serif`;
 ctx.fillText(String(num),0,-r*.82);ctx.restore();
 ctx.fillStyle='#f1c9a5';ctx.beginPath();ctx.arc(a.head.x+dx,a.head.y+dy,r*.6,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#26343b';ctx.beginPath();ctx.arc(a.head.x+dx+d.x*r*.42,a.head.y+dy+d.y*r*.22,r*.10,0,Math.PI*2);ctx.fill();
 return a;
}
