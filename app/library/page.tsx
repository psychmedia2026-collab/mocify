"use client";
import { useEffect, useState } from "react";
import { releases } from "../data";
import Link from "next/link";
import { Shell } from "../components";
import SectionHero from "../section-hero";
import { useLanguage } from "../i18n/language-provider";

export default function Library(){
  const {dictionary}=useLanguage();
  const [savedIds,setSavedIds]=useState<string[]>([]);
  useEffect(()=>{
    try{
      const raw=localStorage.getItem("mocify-saved-track-ids");
      const parsed=raw?JSON.parse(raw):[];
      if(Array.isArray(parsed))setSavedIds(parsed.filter((id):id is string=>typeof id==="string"));
    }catch{}
  },[]);
  const saved=releases.filter(track=>savedIds.includes(track.id));
  const visible=saved.length?saved:releases.slice(0,6);

  return <Shell active="library" player>
    <div className="page-wrap mockup-page-top">
      <SectionHero theme="library" {...dictionary.heroes.library} href="#recently-played"/>
    </div>
    <section id="recently-played" className="page-wrap mockup-section scroll-mt-24">
      <div className="mockup-heading"><div>
        <h2>{saved.length?"Saved tracks":dictionary.pages.library.recently}</h2>
        <p className="library-prototype-note">{saved.length?(saved.length+" saved "+(saved.length===1?"track":"tracks")):dictionary.pages.library.prototype}</p>
      </div></div>
      <div className="mockup-library-row">
        {visible.map((track)=><Link className="mockup-track-mini" key={track.id} href={("href" in track&&track.href)?track.href:("/explore#"+track.id)}>
          <div className={"mockup-track-art "+track.art}/>
          <b>{track.title}</b>
          <small>{track.genre}</small>
        </Link>)}
      </div>
    </section>
  </Shell>
}
