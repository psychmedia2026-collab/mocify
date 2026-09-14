import Link from "next/link";
import { Shell } from "../components";

const plans = [
  {
    name: "ARTIST FREE",
    price: "€0",
    period: "forever",
    intro: "Release your music on MOCIFY without paying a monthly fee.",
    features: ["Artist profile", "Upload AI music", "Publish releases on MOCIFY", "Basic release management"],
    missing: ["Analytics", "Creation & editing tools"],
    cta: "Start for free",
    href: "/signup",
  },
  {
    name: "ARTIST PRO",
    price: "€7.99",
    period: "/ month",
    intro: "For artists who want to understand their audience and grow.",
    features: ["Everything in Artist Free", "Streams & listener analytics", "Likes, saves & top tracks", "Audience countries", "Growth & earnings dashboard"],
    missing: ["Creation & editing tools"],
    cta: "Choose Artist Pro",
    href: "/signup",
    featured: true,
  },
  {
    name: "MOCIFY STUDIO",
    price: "€19.99",
    period: "/ month",
    intro: "The complete MOCIFY workspace for artists who want to create, edit and release.",
    features: ["Everything in Artist Pro", "AI music creation", "Audio editor", "Mix & mastering tools", "Project workspace", "Create → Edit → Master → Release", "Advanced artist tools"],
    missing: [],
    cta: "Get MOCIFY STUDIO",
    href: "/signup",
  },
];

export default function ForArtistsPage() {
  return <Shell active="for artists" player={false}>
    <section className="artist-plans-hero page-wrap">
      <p className="page-kicker">MOCIFY FOR ARTISTS</p>
      <h1>Release your sound.<br/><span className="gradient-text">Build your career.</span></h1>
      <p>Start free, unlock your audience data with Artist Pro, or enter MOCIFY STUDIO for the complete creation workspace.</p>
      <div className="artist-plan-note">Artist subscriptions are separate from listener Premium. Prices shown are prototype prices and can change before launch.</div>
    </section>

    <section className="artist-plans page-wrap" aria-label="Artist subscription plans">
      {plans.map((plan) => <article className={`artist-plan-card${plan.featured ? " artist-plan-featured" : ""}`} key={plan.name}>
        {plan.featured && <span className="artist-plan-badge">POPULAR</span>}
        <p className="page-kicker">{plan.name}</p>
        <div className="artist-plan-price"><strong>{plan.price}</strong><span>{plan.period}</span></div>
        <p className="artist-plan-intro">{plan.intro}</p>
        <div className="artist-plan-features">
          {plan.features.map((feature) => <p key={feature}><span>✓</span>{feature}</p>)}
          {plan.missing.map((feature) => <p className="artist-plan-missing" key={feature}><span>—</span>{feature}</p>)}
        </div>
        <Link className={plan.featured ? "m-primary artist-plan-cta" : "m-secondary artist-plan-cta"} href={plan.href}>{plan.cta} →</Link>
      </article>)}
    </section>

    <section className="studio-path page-wrap">
      <p className="page-kicker">ONE ARTIST JOURNEY</p>
      <h2>Upload → Understand → Create</h2>
      <p>Every artist can release music. Upgrade only when you need deeper analytics or the full creative power of MOCIFY STUDIO.</p>
      <div className="studio-path-steps"><span>ARTIST FREE<br/><b>Release</b></span><i>→</i><span>ARTIST PRO<br/><b>Analyze</b></span><i>→</i><span>MOCIFY STUDIO<br/><b>Create + Edit</b></span></div>
    </section>
  </Shell>;
}
