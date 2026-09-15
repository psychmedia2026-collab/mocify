import Link from "next/link";
import {Shell} from "../components";
import SectionHero from "../section-hero";

const benefits=[
  ["♕","Ad-free Listening","Pure music. No interruptions."],
  ["◇","Higher Quality","Enjoy the best sound."],
  ["⇩","Offline Mode","Your music everywhere."],
  ["♔","Early Access","Be first to new releases."],
];

const plans=[
  {name:"Free",price:"€0",period:"forever",text:"Start listening and discovering AI music.",features:["Music discovery","MOCIFY Radio","Create your Library","Standard audio quality"],cta:"Start Listening",href:"/signup"},
  {name:"Premium",price:"€7.99",period:"/ month",text:"The complete MOCIFY listening experience.",features:["No advertising","Higher audio quality","Offline listening","Early access to releases"],cta:"Go Premium",href:"/signup",featured:true},
];

export default function PremiumPage(){return <Shell active="premium">
  <div className="page-wrap mockup-page-top"><SectionHero theme="premium" kicker="PREMIUM" title="Hear More." accent="Interrupt Less." text="Unlock the full MOCIFY experience. Higher quality. More music. No limits." cta="View Plans" href="#listener-plans"/></div>
  <section id="premium-benefits" className="page-wrap mockup-section scroll-mt-24">
    <div className="mockup-heading"><h2>Premium Benefits</h2></div>
    <div className="mockup-benefits">{benefits.map(([icon,title,text])=><article className="mockup-benefit" key={title}><span aria-hidden="true">{icon}</span><div><b>{title}</b><p>{text}</p></div></article>)}</div>
  </section>
  <section id="listener-plans" className="page-wrap mockup-section listener-pricing scroll-mt-24">
    <div className="mockup-heading listener-pricing-heading"><div><h2>Choose Your Plan</h2><p>Listen your way. Upgrade whenever you want.</p></div></div>
    <div className="listener-plan-grid">{plans.map(plan=><article className={`listener-plan-card${plan.featured?" featured":""}`} key={plan.name}>
      {plan.featured&&<span className="listener-plan-badge">MOST POPULAR</span>}
      <h3>{plan.name}</h3>
      <div className="listener-plan-price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
      <p className="listener-plan-copy">{plan.text}</p>
      <ul>{plan.features.map(feature=><li key={feature}><span>✓</span>{feature}</li>)}</ul>
      <Link className="listener-plan-cta" href={plan.href}>{plan.cta}</Link>
    </article>)}</div>
    <p className="listener-plan-note">Listener plans only. Artist subscriptions are managed separately in MOCIFY for Artists.</p>
  </section>
</Shell>}
