"use client";

import { useMemo, useState } from "react";
import { releases } from "../data";

function pickNext(current: number) {
  if (releases.length < 2) return 0;
  let next = current;
  while (next === current) next = Math.floor(Math.random() * releases.length);
  return next;
}

export default function RadioClient() {
  const [current, setCurrent] = useState(0);
  const track = releases[current];
  const queue = useMemo(() => {
    const rest = releases.filter((_, index) => index !== current);
    return rest.slice(0, 4);
  }, [current]);

  return <>
    <div className="radio-console">
      <span className="radio-live"><i/> MOCIFY RADIO</span>
      <div className="radio-now">
        <p className="page-kicker">NOW SELECTED</p>
        <h2>{track.title}</h2>
        <p>{track.artist} · {track.genre}</p>
      </div>
      <div className="radio-controls">
        <button type="button" className="m-primary" onClick={() => setCurrent(pickNext(current))}>Shuffle next ↝</button>
      </div>
      <p className="radio-note">The random radio engine is ready. Actual audio playback will switch on as soon as the song audio files are connected to the catalog.</p>
    </div>

    <div className="radio-queue" aria-label="Radio queue preview">
      {queue.map((item, index) => <div className="radio-queue-item" key={item.id}>
        <div><b>{item.title}</b><div><span>{item.artist} · {item.genre}</span></div></div>
        <span>0{index + 1}</span>
      </div>)}
    </div>
  </>;
}
