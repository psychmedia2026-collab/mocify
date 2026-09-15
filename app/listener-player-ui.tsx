"use client";

import Link from "next/link";
import { useState } from "react";
import { formatTime, useListenerPlayer, type RepeatMode } from "./listener-player";

const repeatLabels: Record<RepeatMode, string> = { off: "Repeat off", queue: "Repeat queue", track: "Repeat current track" };
const waveBars = [42,68,54,82,61,91,48,76,57,86,64,79,52,88,60,73,49,92,58,81,55,70,47,85,62,78,51,89];

export default function Player() {
  const [queueOpen, setQueueOpen] = useState(false);
  const { currentTrack, queue, isPlaying, currentTime, duration, volume, shuffle, repeatMode, autoplay, hasAudioSource, status, togglePlay, nextTrack, previousTrack, seek, setVolume, toggleShuffle, cycleRepeat, toggleAutoplay, selectTrack } = useListenerPlayer();
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const repeatLabel = repeatLabels[repeatMode];
  return <section className="m-player" aria-label="Music player">
    <div className="m-player-accent" aria-hidden="true" />
    <div className="m-player-inner">
      <div className="m-player-track-area">
        <Link className="m-player-track" href={currentTrack.href ?? "/explore"}>
          <span className={`m-player-cover ${currentTrack.art}`} aria-hidden="true" />
          <span className="m-player-track-copy"><b>{currentTrack.title}</b><small>{currentTrack.artist}</small></span>
        </Link>
        <Link href="/library" className="m-player-save" aria-label={`Save ${currentTrack.title} to library`}>♡</Link>
      </div>
      <div className="m-player-center">
        <div className="m-controls" aria-label="Playback controls">
          <button type="button" className={shuffle ? "m-utility active" : "m-utility"} aria-label={shuffle ? "Turn off shuffle" : "Turn on shuffle"} aria-pressed={shuffle} onClick={toggleShuffle}>⤨</button>
          <button type="button" aria-label="Previous track" onClick={previousTrack} disabled={queue.length < 2}>◀</button>
          <button type="button" aria-label={isPlaying ? "Pause track" : "Play track"} onClick={togglePlay} disabled={!hasAudioSource} className="m-play">{isPlaying ? "Ⅱ" : "▶"}</button>
          <button type="button" aria-label="Next track" onClick={nextTrack} disabled={queue.length < 2}>▶</button>
          <button type="button" className={repeatMode !== "off" ? "m-utility active" : "m-utility"} aria-label={repeatLabel} aria-pressed={repeatMode !== "off"} onClick={cycleRepeat} disabled={!hasAudioSource}>{repeatMode === "track" ? "↻1" : "↻"}</button>
        </div>
        <div className={`m-waveform${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
          {waveBars.map((height,index)=><i key={index} style={{"--wave-height":`${height}%`,"--wave-delay":`${-(index%9)*0.09}s`,"--wave-speed":`${0.62+(index%5)*0.08}s`} as React.CSSProperties}/>) }
        </div>
        <div className="m-progress-row">
          <span>{formatTime(currentTime)}</span>
          <input className="m-progress" style={{ "--progress": `${progress}%` } as React.CSSProperties} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} aria-label={`Seek track, ${formatTime(currentTime)} of ${formatTime(duration)}`} aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`} disabled={!hasAudioSource || !duration}/>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="m-player-tools">
        <button type="button" className={`m-mobile-utility${shuffle ? " active" : ""}`} aria-label={shuffle ? "Turn off shuffle" : "Turn on shuffle"} aria-pressed={shuffle} onClick={toggleShuffle}>⤨</button>
        <button type="button" className={`m-mobile-utility${repeatMode !== "off" ? " active" : ""}`} aria-label={repeatLabel} aria-pressed={repeatMode !== "off"} onClick={cycleRepeat} disabled={!hasAudioSource}>{repeatMode === "track" ? "↻1" : "↻"}</button>
        <label className="m-volume" aria-label={`Volume, ${Math.round(volume * 100)} percent`}><span aria-hidden="true">◖</span><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label={`Volume, ${Math.round(volume * 100)} percent`} aria-valuetext={`${Math.round(volume * 100)} percent`} disabled={!hasAudioSource}/></label>
        <button type="button" className={autoplay ? "m-tool-toggle active" : "m-tool-toggle"} aria-label={autoplay ? "Turn off autoplay" : "Turn on autoplay"} aria-pressed={autoplay} onClick={toggleAutoplay}>AUTO</button>
        <div className="m-queue-wrap"><button type="button" className={queueOpen ? "m-queue-button active" : "m-queue-button"} aria-label={queueOpen ? "Close queue" : "Open queue"} aria-expanded={queueOpen} onClick={() => setQueueOpen((open) => !open)}>☷</button>{queueOpen && <div className="m-queue-popover" role="dialog" aria-label="Playback queue"><b>Queue</b>{queue.map((track) => <button type="button" key={track.id} className={track.id === currentTrack.id ? "current" : ""} onClick={() => { selectTrack(track, queue, true); setQueueOpen(false); }}><span>{track.title}</span><small>{track.artist}</small></button>)}</div>}</div>
        <div className="m-player-brand"><img src="/mocify-bird.png?v=2" alt="" aria-hidden="true"/><span><b>MOCIFY</b><small>AI Music. Infinite Possibilities.</small></span></div>
      </div>
      <span className="m-player-status" role="status">{status}</span>
    </div>
  </section>;
}