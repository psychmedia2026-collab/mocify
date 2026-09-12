import {Shell} from "../components";

export default function UploadPage(){
  return <Shell active="upload" player={false}>
    <section className="page-wrap grid gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div><p className="page-kicker">FOR ARTISTS</p><h1 className="page-title">Bring your sound to <span className="gradient-text">MOCIFY.</span></h1><p className="page-lead mt-6">Upload AI-generated music, shape your artist identity and prepare your release for listeners around the world.</p><div className="mt-8 space-y-3 text-sm text-zinc-400"><p>✦ Build your artist profile</p><p>♫ Publish your releases</p><p>◎ Reach listeners inside MOCIFY</p></div></div>

      <div className="rounded-[26px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_80%_0%,rgba(236,40,210,.18),transparent_35%),rgba(255,255,255,.025)] p-6 md:p-8">
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-2xl shadow-[0_0_30px_rgba(237,53,197,.25)]">↑</div>
        <h2 className="text-3xl font-black tracking-[-.04em]">Upload a track</h2><p className="mt-2 text-sm leading-6 text-zinc-500">Prototype flow — storage and publishing will be connected in the backend phase.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2"><Field label="Track title" text="Enter track title"/><Field label="Artist name" text="Your artist name"/><Field label="Genre" text="Choose genre"/><Field label="AI creation tool" text="Suno, Udio or other"/></div>
        <label className="relative mt-4 block cursor-pointer rounded-2xl border border-dashed border-violet-400/30 bg-black/25 px-6 py-10 text-center focus-within:outline-2 focus-within:outline-cyan-400"><span className="text-sm font-bold">Choose your audio file</span><span id="audio-formats" className="mt-2 block text-xs text-zinc-500">WAV, MP3 or FLAC</span><input type="file" name="audio" accept=".wav,.mp3,.flac" aria-describedby="audio-formats" className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/></label>
        <button type="button" className="m-primary mt-6 w-full">Continue →</button>
      </div>
    </section>
  </Shell>
}
function Field({label,text}:{label:string,text:string}){return <label className="text-xs font-bold text-zinc-300">{label}<input name={label.toLowerCase().replaceAll(" ", "-")} placeholder={text} className="mt-2 block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 font-normal text-zinc-300 placeholder:text-zinc-600"/></label>}
