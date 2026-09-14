import {Shell} from "../components";
import SectionHero from "../section-hero";

const benefits=[
  ["♕","Ad-free Listening","Pure music. No interruptions."],
  ["◇","Higher Quality","Enjoy the best sound."],
  ["⇩","Offline Mode","Your music everywhere."],
  ["♔","Early Access","Be first to new releases."],
];

export default function PremiumPage(){return <Shell active="premium" player={false}>
  <div className="page-wrap mockup-page-top"><SectionHero theme="premium" kicker="PREMIUM" title="Hear More." accent="Interrupt Less." text="Unlock the full MOCIFY experience. Higher quality. More music. No limits." cta="Go Premium" href="#premium-benefits"/></div>
  <section id="premium-benefits" className="page-wrap mockup-section scroll-mt-24">
    <div className="mockup-heading"><h2>Premium Benefits</h2></div>
    <div className="mockup-benefits">{benefits.map(([icon,title,text])=><article className="mockup-benefit" key={title}><span aria-hidden="true">{icon}</span><div><b>{title}</b><p>{text}</p></div></article>)}</div>
  </section>
</Shell>}
