import Link from "next/link";
import {Shell} from "../components";

export default function Signup(){
  return <Shell player={false}>
    <section className="page-wrap flex min-h-[70vh] items-center justify-center py-14">
      <form className="w-full max-w-lg rounded-[24px] border border-violet-500/20 bg-[radial-gradient(circle_at_15%_0%,rgba(0,208,255,.12),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(237,53,197,.18),transparent_32%),rgba(255,255,255,.025)] p-8" aria-describedby="signup-prototype-note">
        <p className="page-kicker">JOIN MOCIFY</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Create your listener account</h1><p className="mt-3 text-sm text-zinc-400">Discover music, follow artists and build your own listening experience on MOCIFY.</p>
        <label className="mt-7 block text-xs font-bold">Display name<input name="displayName" autoComplete="nickname" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="Your name"/></label>
        <label className="mt-4 block text-xs font-bold">Email<input type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="you@example.com"/></label>
        <label className="mt-4 block text-xs font-bold">Password<input type="password" name="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4" placeholder="Choose a password"/></label>
        <button type="button" disabled title="Account creation is coming soon" className="m-primary prototype-control mt-6 w-full">Create listener account <span className="prototype-badge">SOON</span></button>
        <p id="signup-prototype-note" className="mt-5 text-center text-[11px] leading-5 text-zinc-400">Prototype only: account data is not stored yet.</p>
        <p className="mt-5 text-center text-xs text-zinc-400">Already have an account? <Link className="text-fuchsia-300" href="/login">Log in</Link></p>
      </form>
    </section>
  </Shell>
}
