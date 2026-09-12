"use client";

import { useState } from "react";
import { genres } from "../data";

export default function UploadForm(){
  const [fileName,setFileName]=useState("");
  return <form className="rounded-[26px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_80%_0%,rgba(236,40,210,.18),transparent_35%),rgba(255,255,255,.025)] p-6 md:p-8" aria-describedby="upload-prototype-note">
    <div className="upload-icon">↑</div>
    <h2 className="text-3xl font-black tracking-[-.04em]">Upload a track</h2>
    <p id="upload-prototype-note" className="mt-2 text-sm leading-6 text-zinc-400">Prototype flow — storage and publishing will be connected in the backend phase.</p>
    <div className="mt-7 grid gap-4 md:grid-cols-2">
      <Field label="Track title" text="Enter track title"/>
      <Field label="Artist name" text="Your artist name"/>
      <label className="text-xs font-bold text-zinc-300">Genre<select name="genre" defaultValue="" className="mt-2 block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 font-normal text-zinc-300"><option value="" disabled>Choose genre</option>{genres.map((genre)=><option value={genre} key={genre}>{genre}</option>)}</select></label>
      <Field label="AI creation tool" text="Suno, Udio or other"/>
    </div>
    <label className="relative mt-4 block cursor-pointer rounded-2xl border border-dashed border-violet-400/30 bg-black/25 px-6 py-10 text-center focus-within:outline-2 focus-within:outline-cyan-400">
      <span className="text-sm font-bold">Choose your audio file</span>
      <span id="audio-formats" className="mt-2 block text-xs text-zinc-400">WAV, MP3 or FLAC</span>
      {fileName&&<span className="selected-file" aria-live="polite">Selected: {fileName}</span>}
      <input type="file" name="audio" accept=".wav,.mp3,.flac,audio/wav,audio/mpeg,audio/flac" aria-describedby="audio-formats" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={(event)=>setFileName(event.target.files?.[0]?.name??"")}/>
    </label>
    <button type="button" disabled title="Publishing is coming in the backend phase" className="m-primary prototype-control mt-6 w-full">Continue <span className="prototype-badge">SOON</span></button>
  </form>;
}

function Field({label,text}:{label:string;text:string}){
  return <label className="text-xs font-bold text-zinc-300">{label}<input name={label.toLowerCase().replaceAll(" ", "-")} placeholder={text} className="mt-2 block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 font-normal text-zinc-300 placeholder:text-zinc-500"/></label>;
}
