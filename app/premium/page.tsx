import {Shell} from "../components";
import SectionHero from "../section-hero";

const plans=[
  {name:"Free",price:"€0",text:"Start exploring MOCIFY.",features:["Stream AI music","Discover artists","Build your library"]},
  {name:"Premium",price:"€6.99",text:"For listeners who want the full experience.",features:["Ad-free listening","Higher audio quality","Unlimited favorites","Early feature access"]},
  {name:"Artist",price:"€9.99",text:"For creators building an audience.",features:["Upload releases","Artist profile","Audience insights","Creator tools"]},
];
export default function PremiumPage(){return <Shell active="premium" player={false}>
  <div className="page-wrap py-10"><SectionHero theme="premium" kicker="MOCIFY PREMIUM" title="Hear More." accent="Interrupt Less." text="Unlock the full MOCIFY listening experience with fewer interruptions, more freedom and premium sound." cta="See Premium" href="#premium-plans"/></div>
  <section id="premium-plans" className="premium-grid page-wrap grid scroll-mt-24 gap-5 pb-20 md:grid-cols-3">{plans.map((p,i)=><article key={p.name} className={`premium-card relative flex h-full flex-col rounded-[24px] border p-7 ${i===1?"border-fuchsia-500/35 bg-[radial-gradient(circle_at_80%_0%,rgba(237,53,197,.18),transparent_30%),rgba(255,255,255,.045)] shadow-[0_0_50px_rgba(124,60,255,.08)]":"border-white/10 bg-white/[.025]"}`}>{i===1&&<span className="absolute right-5 top-5 rounded-full bg-fuchsia-500/15 px-3 py-1 text-[9px] font-black tracking-widest text-fuchsia-300">POPULAR</span>}<p className="page-kicker">{p.name}</p><div className="mt-4 text-4xl font-black">{p.price}<span className="text-sm font-normal text-zinc-400"> / month</span></div><p className="mt-4 min-h-12 text-sm text-zinc-300">{p.text}</p><div className="my-6 h-px bg-white/10"/>{p.features.map(f=><p key={f} className="mb-3 text-sm text-zinc-300">✓ <span className="ml-2">{f}</span></p>)}<button type="button" disabled title="Subscriptions are coming soon" className={`${i===1?"m-primary":"m-secondary"} premium-plan-button mt-auto w-full`}>{i===0?"Free prototype":"Choose "+p.name}<span className="prototype-badge">SOON</span></button></article>)}</section>
</Shell>}
