import Link from "next/link";
import { ArtistPortalShell } from "../artist-components";
import ArtistDashboardLayout from "../artist-dashboard-layout";
import UploadForm from "./UploadForm";

export default function UploadPage(){
  return <ArtistPortalShell active="upload">
    <section className="artist-dashboard-page">
      <ArtistDashboardLayout>
        <div className="mx-1 mt-5 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_84%_30%,rgba(237,53,197,.16),transparent_18%),radial-gradient(circle_at_74%_45%,rgba(116,56,255,.20),transparent_30%),linear-gradient(120deg,#0a0d1b,#11102b_68%,#150a20)] px-7 py-7">
          <p className="text-[9px] font-black tracking-[.16em] text-fuchsia-400">ARTIST DASHBOARD · RELEASE</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-.05em] text-white md:text-5xl">Release on <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">MOCIFY.</span></h1>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-zinc-400">Upload je definitieve track, voeg artwork en metadata toe en bepaal wanneer je release beschikbaar wordt voor luisteraars.</p>
        </div>
        <div className="mx-1 grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="rounded-xl border border-white/10 bg-[linear-gradient(145deg,#0e101c,#090b15)] p-6">
            <p className="text-[9px] font-black tracking-[.14em] text-fuchsia-400">RELEASE FLOW</p>
            <h2 className="mt-2 text-2xl font-black text-white">Van master naar release.</h2>
            <div className="mt-6 space-y-3 text-xs text-zinc-300"><p className="rounded-lg border border-white/10 bg-black/20 p-4"><b className="mr-3 text-fuchsia-400">01</b>Upload je definitieve track</p><p className="rounded-lg border border-white/10 bg-black/20 p-4"><b className="mr-3 text-violet-400">02</b>Beheer titel, artwork en metadata</p><p className="rounded-lg border border-white/10 bg-black/20 p-4"><b className="mr-3 text-cyan-400">03</b>Kies direct publiceren of een releasedatum</p></div>
            <Link className="mt-6 inline-flex rounded-lg border border-violet-500/50 bg-violet-500/10 px-4 py-3 text-xs text-white no-underline" href="/dashboard">← Terug naar Dashboard</Link>
          </aside>
          <UploadForm/>
        </div>
      </ArtistDashboardLayout>
    </section>
  </ArtistPortalShell>
}