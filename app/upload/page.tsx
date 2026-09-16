import Link from "next/link";
import { ArtistPortalShell } from "../artist-components";
import ArtistDashboardLayout from "../artist-dashboard-layout";
import UploadForm from "./UploadForm";

export default function UploadPage(){
  return <ArtistPortalShell active="upload">
    <section className="page-wrap py-16">
      <ArtistDashboardLayout>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="page-kicker">ARTIST DASHBOARD · RELEASE</p>
            <h1 className="page-title">Breng je muziek uit op <span className="gradient-text">MOCIFY.</span></h1>
            <p className="page-lead mt-6">Upload je track, vul de releasegegevens in en plan wanneer je muziek voor luisteraars beschikbaar wordt. Uitbrengen hoort bij je zakelijke Artist Dashboard, niet bij MOCIFY STUDIO.</p>
            <div className="mt-8 space-y-3 text-sm text-zinc-300">
              <p>↑ Upload je definitieve track</p>
              <p>♫ Beheer titel, artwork en metadata</p>
              <p>◷ Kies direct publiceren of een releasedatum</p>
            </div>
            <Link className="m-secondary mt-8 inline-flex" href="/dashboard">← Terug naar Dashboard</Link>
          </div>
          <UploadForm/>
        </div>
      </ArtistDashboardLayout>
    </section>
  </ArtistPortalShell>
}
