"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./i18n/language-provider";

export default function ListenerBanner() {
  const { dictionary } = useLanguage();
  const messages = dictionary.banner.messages;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setIsPaused(reducedMotion.matches);
    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);
    return () => reducedMotion.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [isPaused, messages.length]);

  const safeIndex = index % messages.length;
  const message = messages[safeIndex];
  const toggleLabel = isPaused ? dictionary.banner.resume : dictionary.banner.pause;

  return <section className="listener-banner-wrap page-wrap" aria-label={dictionary.banner.label}>
    <div className="listener-banner">
      <div className="listener-banner-brand" aria-hidden="true"><img src="/mocify-bird.png?v=2" alt="" /><strong>MOCIFY</strong></div>
      <div className="listener-banner-copy" key={`${safeIndex}-${message.title}`} aria-live="polite" aria-atomic="true">
        <p className="page-kicker">{message.kicker}</p><h2>{message.title}</h2><p>{message.text}</p>
      </div>
      <div className="listener-banner-side">
        <Link className="m-primary" href={message.href}>{message.cta} →</Link>
        <div className="listener-banner-controls">
          <button type="button" className="listener-banner-toggle" onClick={() => setIsPaused((current) => !current)} aria-label={toggleLabel} aria-pressed={isPaused} title={toggleLabel}>{isPaused ? "▶" : "Ⅱ"}</button>
          <div className="listener-banner-dots" aria-label={dictionary.banner.messagesLabel}>
            {messages.map((item, itemIndex) => <button key={`${item.kicker}-${itemIndex}`} type="button" className={itemIndex === safeIndex ? "active" : ""} onClick={() => setIndex(itemIndex)} aria-label={`${dictionary.banner.showMessage} ${itemIndex + 1}`} aria-current={itemIndex === safeIndex ? "true" : undefined}/>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
