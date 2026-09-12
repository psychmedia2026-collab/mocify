import {Shell} from "../components";
import UploadForm from "./UploadForm";

export default function UploadPage(){
  return <Shell active="upload" player={false}>
    <section className="page-wrap grid gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
      <div><p className="page-kicker">FOR ARTISTS</p><h1 className="page-title">Bring your sound to <span className="gradient-text">MOCIFY.</span></h1><p className="page-lead mt-6">Upload AI-generated music, shape your artist identity and prepare your release for listeners around the world.</p><div className="mt-8 space-y-3 text-sm text-zinc-300"><p>✦ Build your artist profile</p><p>♫ Publish your releases</p><p>◎ Reach listeners inside MOCIFY</p></div></div>
      <UploadForm/>
    </section>
  </Shell>
}
