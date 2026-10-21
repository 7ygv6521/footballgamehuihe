const point=value=>value&&Number.isFinite(value.x)&&Number.isFinite(value.y)?{x:value.x,y:value.y,z:value.z||0}:null;

export function controlledBallVisual(physical,owner,progress=1){
 const from=point(physical),to=point(owner);
 if(!to)return from;
 if(!from)return to;
 const t=Math.max(0,Math.min(1,progress));
 return {x:from.x+(to.x-from.x)*t,y:from.y+(to.y-from.y)*t,z:(from.z||0)*(1-t)+(to.z||0)*t};
}

// This is a presentation adapter, not a second settlement engine. The action
// outcome is authoritative; ballStateAfter may belong to the next phase.
export function recordedEventView(sample){
 const before=point(sample.ballStateBefore?.renderedBall)||point(sample.ballStart)||point(sample.start);
 const actionBall=sample.actionOutcomeState?.ball||null;
 const phaseBall=sample.ballStateAfter||null;
 const owner=actionBall?.carrier?sample.players?.find(p=>p.name===actionBall.carrier):null;
 const impact=point(sample.result?.impactPoint)||point(sample.result?.landing)||point(sample.end);
 const settled=owner?controlledBallVisual(impact||actionBall?.renderedBall,owner.to):point(actionBall?.renderedBall)||point(actionBall?.ball)||impact||point(sample.ballEnd)||before;
 return {ballStart:before,ballEnd:settled,impact,ownerId:owner?.id||null,
  actionBall,phaseBall,phaseStateAfter:sample.phaseStateAfter||null};
}
