"use client";

import { useState } from "react";
import { genres } from "../data";

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_DURATION_SECONDS = 5 * 60;

export default function UploadForm(){
  const [fileName,setFileName]=useState("");
  const [fileInfo,setFileInfo]=useState("");
  const [fileError,setFileError]=useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
    const input = event.currentTarget;
    const file = input.files?.[0];
    setFileName("");
    setFileInfo("");
    setFileError("");
    if(!file) return;

    const isMp3 = file.type === "audio/mpeg" || file.name.toLowerCase().endsWith(".mp3");
    if(!isMp3){
      setFileError("Only MP3 files are allowed.");
      input.value = "";
      return;
    }
    if(file.size > MAX_FILE_SIZE){
      setFileError("This MP3 is larger than 15 MB.");
      input.value = "";
      return;
    }

    const duration = await getAudioDuration(file);
    if(duration === null){
      setFileError("MOCIFY could not read this MP3. Please choose another file.");
      input.value = "";
      return;
    }
    if(duration > MAX_DURATION_SECONDS + 0.5){
      setFileError("Tracks can be up to 5:00 minutes long.");
      input.value = "";
      return;
    }

    setFileName(file.name);
    setFileInfo(`${formatDuration(duration)} · ${formatMegabytes(file.size)} MB`);
  }

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
      <span className="text-sm font-bold">Choose your MP3</span>
      <span id="audio-formats" className="mt-2 block text-xs text-zinc-400">MP3 only · max. 5:00 min · max. 15 MB</span>
      {fileName&&<span className="selected-file" aria-live="polite">Selected: {fileName}<small className="mt-1 block font-normal text-zinc-400">{fileInfo}</small></span>}
      {fileError&&<span className="mt-3 block text-xs font-bold text-rose-300" role="alert">{fileError}</span>}
      <input type="file" name="audio" accept=".mp3,audio/mpeg" aria-describedby="audio-formats" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" onChange={handleFileChange}/>
    </label>
    <button type="button" disabled title="Publishing is coming in the backend phase" className="m-primary prototype-control mt-6 w-full">Continue <span className="prototype-badge">SOON</span></button>
  </form>;
}

function Field({label,text}:{label:string;text:string}){
  return <label className="text-xs font-bold text-zinc-300">{label}<input name={label.toLowerCase().replaceAll(" ", "-")} placeholder={text} className="mt-2 block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 font-normal text-zinc-300 placeholder:text-zinc-500"/></label>;
}

function getAudioDuration(file: File): Promise<number|null>{
  return new Promise((resolve)=>{
    const url = URL.createObjectURL(file);
    const audio = new Audio();
    const finish = (value: number|null)=>{
      URL.revokeObjectURL(url);
      resolve(value);
    };
    audio.preload = "metadata";
    audio.onloadedmetadata = ()=>finish(Number.isFinite(audio.duration) ? audio.duration : null);
    audio.onerror = ()=>finish(null);
    audio.src = url;
  });
}

function formatDuration(seconds: number){
  const rounded = Math.round(seconds);
  const minutes = Math.floor(rounded/60);
  const rest = String(rounded%60).padStart(2,"0");
  return `${minutes}:${rest}`;
}

function formatMegabytes(bytes: number){
  return (bytes/(1024*1024)).toFixed(1);
}
