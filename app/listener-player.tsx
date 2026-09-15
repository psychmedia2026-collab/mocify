"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { releases, type Release } from "./data";

export type PlaybackTrack = Pick<Release, "id" | "title" | "artist" | "genre" | "art"> & {
  href?: string;
  audioSrc?: string;
};

export type RepeatMode = "off" | "queue" | "track";

const catalogQueue: PlaybackTrack[] = releases.filter((track) => "audioSrc" in track && typeof track.audioSrc === "string").map((track) => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  genre: track.genre,
  art: track.art,
  href: "href" in track ? track.href : undefined,
  audioSrc: "audioSrc" in track && typeof track.audioSrc === "string" ? track.audioSrc : undefined,
}));

type ListenerPlayerContextValue = {
  currentTrack: PlaybackTrack;
  queue: PlaybackTrack[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeatMode: RepeatMode;
  autoplay: boolean;
  hasAudioSource: boolean;
  status: string;
  selectTrack: (track: PlaybackTrack, nextQueue?: PlaybackTrack[], autoplay?: boolean) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (time: number) => void;
  setVolume: (value: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleAutoplay: () => void;
  stopPlayback: () => void;
};

const ListenerPlayerContext = createContext<ListenerPlayerContextValue | null>(null);

function trackIndex(track: PlaybackTrack, nextQueue: PlaybackTrack[]) {
  const index = nextQueue.findIndex((item) => item.id === track.id);
  return index >= 0 ? index : 0;
}

export function ListenerPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<PlaybackTrack[]>(catalogQueue);
  const currentIndexRef = useRef(0);
  const volumeRef = useRef(1);
  const shuffleRef = useRef(false);
  const repeatModeRef = useRef<RepeatMode>("off");
  const autoplayRef = useRef(true);
  const [queue, setQueue] = useState(catalogQueue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [autoplay, setAutoplay] = useState(true);
  const [status, setStatus] = useState("Ready to play.");
  const currentTrack = queue[currentIndex] ?? catalogQueue[0];
  const hasAudioSource = Boolean(currentTrack.audioSrc);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => { shuffleRef.current = shuffle; }, [shuffle]);
  useEffect(() => { repeatModeRef.current = repeatMode; }, [repeatMode]);
  useEffect(() => { autoplayRef.current = autoplay; }, [autoplay]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = volumeRef.current;
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (repeatModeRef.current === "track") {
        audio.currentTime = 0;
        setCurrentTime(0);
        void audio.play().catch(() => {
          setIsPlaying(false);
          setStatus("This audio preview is unavailable.");
        });
        return;
      }
      if (!autoplayRef.current && repeatModeRef.current !== "queue") {
        setIsPlaying(false);
        setCurrentTime(audio.duration);
        return;
      }
      if (!shuffleRef.current && repeatModeRef.current !== "queue" && currentIndexRef.current === queueRef.current.length - 1) {
        setIsPlaying(false);
        setCurrentTime(audio.duration);
        return;
      }
      const currentIndex = currentIndexRef.current;
      const availableIndexes = queueRef.current.map((_, index) => index).filter((index) => index !== currentIndex);
      const nextIndex = shuffleRef.current && availableIndexes.length > 0
        ? availableIndexes[Math.floor(Math.random() * availableIndexes.length)]
        : (currentIndex + 1) % queueRef.current.length;
      const nextTrack = queueRef.current[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentTime(0);
      setDuration(0);
      setStatus(nextTrack.audioSrc ? "Ready to play." : "Audio previews are not connected yet.");
      if (!nextTrack.audioSrc) {
        setIsPlaying(false);
        return;
      }
      audio.src = nextTrack.audioSrc;
      void audio.play().catch(() => {
        setIsPlaying(false);
        setStatus("This audio preview is unavailable.");
      });
    };
    const onError = () => {
      setIsPlaying(false);
      setStatus("This audio preview is unavailable.");
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    if (catalogQueue[0]?.audioSrc) {
      audio.src = catalogQueue[0].audioSrc;
      audio.load();
    }
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const selectTrack = (track: PlaybackTrack, nextQueue = queue, autoplay = false) => {
    const nextIndex = trackIndex(track, nextQueue);
    const audio = audioRef.current;
    setQueue(nextQueue);
    setCurrentIndex(nextIndex);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setStatus(track.audioSrc ? "Ready to play." : "Audio previews are not connected yet.");
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = track.audioSrc ?? "";
    if (track.audioSrc && autoplay) void audio.play().catch(() => { setIsPlaying(false); setStatus("This audio preview is unavailable."); });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack.audioSrc) {
      setStatus("Audio previews are not connected yet.");
      return;
    }
    if (audio.getAttribute("src") !== currentTrack.audioSrc) {
      audio.src = currentTrack.audioSrc;
      audio.load();
    }
    if (audio.paused) void audio.play().catch(() => setStatus("This audio preview is unavailable."));
    else audio.pause();
  };

  const changeTrack = (direction: 1 | -1) => {
    if (queue.length < 2) return;
    const availableIndexes = queue.map((_, index) => index).filter((index) => index !== currentIndex);
    const nextIndex = shuffleRef.current && availableIndexes.length > 0
      ? availableIndexes[Math.floor(Math.random() * availableIndexes.length)]
      : (currentIndex + direction + queue.length) % queue.length;
    selectTrack(queue[nextIndex], queue, isPlaying);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));
    volumeRef.current = nextVolume;
    setVolumeState(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  };

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    audio?.pause();
    if (audio) {
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    }
    setQueue(catalogQueue);
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setStatus("Ready to play.");
  }, []);

  const value: ListenerPlayerContextValue = {
    currentTrack,
    queue,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeatMode,
    autoplay,
    hasAudioSource,
    status,
    selectTrack,
    togglePlay,
    nextTrack: () => changeTrack(1),
    previousTrack: () => changeTrack(-1),
    seek,
    setVolume,
    toggleShuffle: () => setShuffle((value) => !value),
    cycleRepeat: () => setRepeatMode((mode) => mode === "off" ? "queue" : mode === "queue" ? "track" : "off"),
    toggleAutoplay: () => setAutoplay((value) => !value),
    stopPlayback,
  };

  return <ListenerPlayerContext.Provider value={value}>{children}</ListenerPlayerContext.Provider>;
}

export function useListenerPlayer() {
  const context = useContext(ListenerPlayerContext);
  if (!context) throw new Error("useListenerPlayer must be used within ListenerPlayerProvider");
  return context;
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function TrackPlayButton({ track }: { track: PlaybackTrack }) {
  const { selectTrack, currentTrack, isPlaying, togglePlay } = useListenerPlayer();
  const isCurrent = currentTrack.id === track.id;
  const label = !track.audioSrc ? `${track.title} audio preview unavailable` : isCurrent && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`;
  return <button type="button" className="release-play-button" aria-label={label} disabled={!track.audioSrc} title={!track.audioSrc ? "Audio preview unavailable" : undefined} onClick={(event) => { event.preventDefault(); event.stopPropagation(); if (isCurrent) togglePlay(); else selectTrack(track, undefined, true); }}>{isCurrent && isPlaying ? "Ⅱ" : "▶"}</button>;
}