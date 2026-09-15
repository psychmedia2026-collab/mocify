import { Shell } from "../components";
import SectionHero from "../section-hero";
import RadioClient from "./radio-client";

export default function RadioPage(){return <Shell active="radio">
  <div className="page-wrap mockup-page-top"><SectionHero theme="radio" kicker="MOCIFY RADIO" title="Music Never" accent="Stops" text="Random tracks. Fresh discoveries. Always on. Always AI." cta="Start Radio" href="#radio-player"/></div>
  <section id="radio-player" className="page-wrap mockup-section scroll-mt-24"><div className="mockup-heading"><h2>Currently Playing</h2></div><RadioClient/></section>
</Shell>}
