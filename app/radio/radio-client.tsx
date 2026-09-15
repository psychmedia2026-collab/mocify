"use client";

import { formatTime, useListenerPlayer } from "../listener-player";

export default function RadioClient(){
  const { currentTrack, isPlaying, hasAudioSource, status, currentTime, queue, togglePlay, nextTrack, previousTrack } = useListenerPlayer();
  return <div className="mockup-radio-player" aria-label="MOCIFY Radio player">
    <div className={`mockup-radio-cover ${currentTrack.art}`}/>
    <div className="mockup-radio-track"><b>{currentTrack.title}</b><small>{currentTrack.artist}</small><span role="status">{hasAudioSource ? formatTime(currentTime) : status}</span></div>
    <button type="button" className="mockup-radio-control" aria-label="Previous track" onClick={previousTrack} disabled={queue.length < 2}>◀</button>
    <button type="button" className="mockup-radio-control main" aria-label={isPlaying ? "Pause radio" : "Play radio"} title={!hasAudioSource ? "Audio previews are not connected yet" : undefined} onClick={togglePlay} disabled={!hasAudioSource}>{isPlaying ? "Ⅱ" : "▶"}</button>
    <button type="button" className="mockup-radio-control" aria-label="Next track" onClick={nextTrack} disabled={queue.length < 2}>▶</button>
    <div className="mockup-radio-volume" aria-hidden="true"/>
  </div>;
}
