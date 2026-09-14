"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const messages = [
  {
    kicker: "DISCOVER MOCIFY",
    title: "Your next favorite sound starts here.",
    text: "Explore a growing world of AI music, discover new artists and find tracks made for your next repeat.",
    cta: "Explore music",
    href: "/explore",
  },
  {
    kicker: "AI MUSIC. ONE HOME.",
    title: "A new music world built for listeners.",
    text: "MOCIFY brings AI music together in one place so you can browse fresh releases, genres and emerging artists.",
    cta: "Start discovering",
    href: "/explore",
  },
  {
    kicker: "FIND NEW ARTISTS",
    title: "Meet the voices behind the next wave.",
    text: "Move beyond the usual playlists and discover artists creating music with a new generation of creative tools.",
    cta: "Browse artists",
    href: "/artists",
  },
  {
    kicker: "INFINITE POSSIBILITIES",
    title: "New sounds. New ideas. No old limits.",
    text: "From familiar genres to unexpected combinations, MOCIFY is built around music that keeps evolving.",
    cta: "Explore MOCIFY",
    href: "/explore",
  },
  {
    kicker: "LISTEN YOUR WAY",
    title: "Stay close to the music you want to hear.",
    text: "Discover what is trending, explore different styles and keep finding something new every time you return.",
    cta: "See what is trending",
    href: "/explore",
  },
];

export default function ListenerBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const message = messages[index];

  return <section className="listener-banner-wrap page-wrap" aria-label="About MOCIFY">
    <div className="listener-banner">
      <div className="listener-banner-brand" aria-hidden="true">
        <img src="/mocify-bird.png?v=2" alt="" />
        <strong>MOCIFY</strong>
      </div>

      <div className="listener-banner-copy" key={index}>
        <p className="page-kicker">{message.kicker}</p>
        <h2>{message.title}</h2>
        <p>{message.text}</p>
      </div>

      <div className="listener-banner-side">
        <Link className="m-primary" href={message.href}>{message.cta} →</Link>
        <div className="listener-banner-dots" aria-label="Banner messages">
          {messages.map((item, itemIndex) => <button
            key={item.kicker}
            type="button"
            className={itemIndex === index ? "active" : ""}
            onClick={() => setIndex(itemIndex)}
            aria-label={`Show message ${itemIndex + 1}`}
            aria-current={itemIndex === index ? "true" : undefined}
          />)}
        </div>
      </div>
    </div>
  </section>;
}
