"use client";

import { useEffect } from "react";
import { useListenerPlayer } from "./listener-player";

export default function CreatorPlaybackStop() {
  const { stopPlayback } = useListenerPlayer();

  useEffect(() => {
    stopPlayback();
  }, [stopPlayback]);

  return null;
}