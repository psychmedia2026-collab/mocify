import { Shell } from "../components";
import SectionHero from "../section-hero";
import RadioClient from "./radio-client";

export default function RadioPage() {
  return <Shell active="radio" player={false}>
    <div className="page-wrap py-10"><SectionHero theme="radio" kicker="MOCIFY RADIO" title="Music Never" accent="Stops" text="Random tracks. Fresh discoveries. Press play once and let MOCIFY choose what comes next." cta="Start radio" href="#radio-player"/></div>
    <section id="radio-player" className="page-wrap scroll-mt-24 pb-16"><div className="radio-hero"><div><div className="radio-mark"><img src="/mocify-bird.png?v=2" alt="" aria-hidden="true"/><strong>MOCIFY <span>RADIO</span></strong></div><p className="page-kicker">ALWAYS SOMETHING NEW</p><h2 className="page-title max-w-3xl">Press play. <span className="gradient-text">Let MOCIFY choose.</span></h2><p className="page-lead mt-6">Continuous discovery built around random tracks from the MOCIFY catalog.</p></div><RadioClient/></div></section>
  </Shell>;
}
