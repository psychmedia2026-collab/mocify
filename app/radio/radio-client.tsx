"use client";

import { useState } from "react";
import { releases } from "../data";

function pickNext(current:number){if(releases.length<2)return 0;let next=current;while(next===current)next=Math.floor(Math.random()*releases.length);return next;}

export default function RadioClient(){
  const [current,setCurrent]=useState(0); const track=releases[current];
  return <div className="mockup-radio-player" aria-label="MOCIFY Radio player">
    <div className={`mockup-radio-cover ${track.art}`}/>
    <div className="mockup-radio-track"><b>{track.title}</b><small>{track.artist}</small></div>
    <button type="button" className="mockup-radio-control" aria-label="Previous" onClick={()=>setCurrent(pickNext(current))}>◀</button>
    <button type="button" className="mockup-radio-control main" aria-label="Play preview" title="Audio files will be connected later">Ⅱ</button>
    <button type="button" className="mockup-radio-control" aria-label="Next" onClick={()=>setCurrent(pickNext(current))}>▶</button>
    <div className="mockup-radio-volume" aria-hidden="true"/>
  </div>;
}
