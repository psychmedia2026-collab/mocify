import Link from "next/link";
import { ArtistPortalShell } from "../artist-components";

const plans = [
  {
    name: "ARTIST FREE",
    price: "€0",
    period: "forever",
    intro: "Release your music on MOCIFY without paying a monthly fee.",
    features: ["Artist profile", "Upload AI music", "Publish releases on MOCIFY", "Basic release management"],
    missing: ["Analytics", "Creation & editing tools"],
    cta: "Start for free",
    href: "/for-artists/signup",
  },
  {
    name: "ARTIST PRO",
    price: "€7.99",
    period: "/ month",
    intro: "For artists who want to understand their audience and grow.",
    features: ["Everything in Artist Free", "Streams & listener analytics", "Likes, saves & top tracks", "Audience countries", "Growth & earnings dashboard"],
    missing: ["Creation & editing tools"],
    cta: "Choose Artist Pro",
    href: "/for-artists/signup",
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
    href: "/for-artists/signup",
  },
];

const wave = [30,58,42,78,50,92,62,46,72,98,64,84,48,70,40,88,56,76,50,68,36,82,58,94];

export default function ForArtistsPage() {
  return <ArtistPortalShell active="plans">
    <section className="artist-portal-hero">
      <div className="page-wrap artist-portal-hero-grid">
        <div>
          <span className="artist-portal-eyebrow"><i />MOCIFY CREATOR ENVIRONMENT</span>
          <h1>Release your sound.<br/><span>Enter the studio.</span></h1>
          <p className="artist-portal-hero-copy">A separate MOCIFY space built for artists and creators. Upload releases, understand your audience and grow into a complete creative workspace with MOCIFY STUDIO.</p>
          <div className="artist-portal-hero-actions">
            <Link className="m-primary" href="#artist-plans">View artist plans →</Link>
            <Link className="m-secondary" href="/studio">Preview MOCIFY STUDIO</Link>
          </div>
        </div>

        <div className="artist-portal-console" aria-label="MOCIFY Studio visual preview">
          <div className="artist-console-top"><span>MOCIFY STUDIO / SESSION 01</span><span className="artist-console-lights"><i/><i/><i/></span></div>
          <div className="artist-console-wave" aria-hidden="true">{wave.map((height,index)=><i key={index} style={{height:`${height}%`}} />)}</div>
          <div className="artist-console-controls">
            <span>Project<b>Untitled 01</b></span>
            <span>Tempo<b>124 BPM</b></span>
            <span>Mode<b>Creator</b></span>
            <span>Status<b>Studio ready</b></span>
          </div>
        </div>
      </div>
    </section>

    <section className="artist-portal-section page-wrap">
      <div className="artist-portal-section-head">
        <div><p className="page-kicker">BUILT FOR CREATORS</p><h2>From upload to full studio.</h2></div>
        <p>The listener side of MOCIFY stays focused on discovering and playing music. This portal is the professional side: releases, analytics, earnings and creative tools.</p>
      </div>
    </section>

    <section id="artist-plans" className="artist-plans page-wrap" aria-label="Artist subscription plans">
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
      <h2>Release → Analyze → Create</h2>
      <p>Start simple and upgrade only when you need more. The full Studio experience stays reserved for creators who want the complete workspace.</p>
      <div className="studio-path-steps"><span>ARTIST FREE<br/><b>Release</b></span><i>→</i><span>ARTIST PRO<br/><b>Analyze</b></span><i>→</i><span>MOCIFY STUDIO<br/><b>Create + Edit</b></span></div>
    </section>
  </ArtistPortalShell>;
}
