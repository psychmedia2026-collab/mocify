import { Shell } from "../components";
import RadioClient from "./radio-client";

export default function RadioPage() {
  return <Shell active="radio" player={false}>
    <section className="page-wrap py-12">
      <div className="radio-hero">
        <div>
          <div className="radio-mark">
            <img src="/mocify-bird.png?v=2" alt="" aria-hidden="true" />
            <strong>MOCIFY <span>RADIO</span></strong>
          </div>
          <p className="page-kicker">ALWAYS SOMETHING NEW</p>
          <h1 className="page-title max-w-3xl">Press play. <span className="gradient-text">Let MOCIFY choose.</span></h1>
          <p className="page-lead mt-6">MOCIFY Radio is a continuous discovery mode built around random tracks from the MOCIFY catalog. No playlist decisions — just new music.</p>
        </div>
        <RadioClient />
      </div>
    </section>
  </Shell>;
}
