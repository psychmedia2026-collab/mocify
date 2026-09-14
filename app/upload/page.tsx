import Link from "next/link";
import { ArtistPortalShell } from "../artist-components";
import UploadForm from "./UploadForm";

export default function UploadPage(){
  return <ArtistPortalShell active="upload">
    <section className="page-wrap grid gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div>
        <p className="page-kicker">MOCIFY STUDIO · RELEASE</p>
        <h1 className="page-title">Bring your sound to <span className="gradient-text">MOCIFY.</span></h1>
        <p className="page-lead mt-6">You are still inside your artist workspace. Upload your track, prepare the release and continue working without leaving the studio environment.</p>
        <div className="mt-8 space-y-3 text-sm text-zinc-300">
          <p>✦ Stay inside your artist workspace</p>
          <p>♫ Upload and prepare your release</p>
          <p>◎ Publish to listeners on MOCIFY</p>
        </div>
        <Link className="m-secondary mt-8 inline-flex" href="/studio">← Back to Studio</Link>
      </div>
      <UploadForm/>
    </section>
  </ArtistPortalShell>
}
