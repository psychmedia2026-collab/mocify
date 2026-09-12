import Link from "next/link";
import {Shell} from "../components";

export default function Login(){
  return <Shell player={false}>
    <section className="page-wrap flex min-h-[68vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-[24px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_80%_0%,rgba(237,53,197,.18),transparent_32%),rgba(255,255,255,.025)] p-8 shadow-[0_0_55px_rgba(107,44,255,.08)]">
        <p className="page-kicker">WELCOME BACK</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Log in to MOCIFY</h1><p className="mt-3 text-sm text-zinc-500">Prototype login — your details are not stored yet.</p>
        <label className="mt-7 block text-xs font-bold">Email<input type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 focus:border-fuchsia-500/40" placeholder="you@example.com"/></label>
        <label className="mt-4 block text-xs font-bold">Password<input type="password" name="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4 focus:border-fuchsia-500/40" placeholder="••••••••"/></label>
        <Link href="/library" className="m-primary mt-6 w-full">Log in</Link><p className="mt-6 text-center text-xs text-zinc-500">New here? <Link className="text-fuchsia-300" href="/signup">Create an account</Link></p>
      </div>
    </section>
  </Shell>
}
