import Link from "next/link";
import {Shell} from "../components";

export default function Signup(){
  return <Shell player={false}>
    <section className="page-wrap flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-lg rounded-[24px] border border-violet-500/20 bg-[radial-gradient(circle_at_15%_0%,rgba(0,208,255,.12),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(237,53,197,.18),transparent_32%),rgba(255,255,255,.025)] p-8">
        <p className="page-kicker">JOIN THE FUTURE OF MUSIC</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Create your account</h1><p className="mt-3 text-sm text-zinc-500">Start as a listener. You can become an artist later.</p>
        <div className="mt-7 grid grid-cols-2 gap-3"><button className="rounded-xl border border-fuchsia-400/35 bg-fuchsia-500/10 p-4 text-sm font-bold">Listener</button><button className="rounded-xl border border-white/10 bg-white/[.025] p-4 text-sm font-bold">Artist</button></div>
        <label className="mt-5 block text-xs font-bold">Display name<input className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="Your name"/></label>
        <label className="mt-4 block text-xs font-bold">Email<input className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="you@example.com"/></label>
        <label className="mt-4 block text-xs font-bold">Password<input type="password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="Choose a password"/></label>
        <Link href="/library" className="m-primary mt-6 w-full">Create account</Link><p className="mt-5 text-center text-[10px] text-zinc-600">Prototype: account data is not stored yet.</p>
      </div>
    </section>
  </Shell>
}
