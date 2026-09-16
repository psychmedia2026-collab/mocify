"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArtistPortalShell } from "../artist-components";
import ArtistDashboardLayout, { type ArtistPlanTier } from "../artist-dashboard-layout";
import styles from "./business-workspace.module.css";

type BusinessSection = "analytics" | "earnings" | "promote";

const meta = {
  analytics: { icon: "◫", title: "Analytics", sub: "Bekijk wie luistert, waar je publiek zit en hoe je muziek groeit." },
  earnings: { icon: "€", title: "Earnings", sub: "Volg royalty's, saldo en je uitbetalingsgeschiedenis." },
  promote: { icon: "↗", title: "Promote", sub: "Maak campagnes en zet luisteraars om in volgers en fans." },
} as const;

export default function BusinessWorkspace({ section }: { section: BusinessSection }) {
  const [plan, setPlan] = useState<ArtistPlanTier>("free");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("mocify-artist-plan");
    if (saved === "free" || saved === "pro" || saved === "studio") setPlan(saved);
    const onPlanChange = (event: Event) => {
      const next = (event as CustomEvent<ArtistPlanTier>).detail;
      if (next === "free" || next === "pro" || next === "studio") setPlan(next);
    };
    window.addEventListener("mocify-plan-change", onPlanChange);
    return () => window.removeEventListener("mocify-plan-change", onPlanChange);
  }, []);

  const notify = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2200);
  };
  const current = meta[section];

  return (
    <ArtistPortalShell active="studio">
      <section className={`page-wrap ${styles.dashboardPage}`}>
        <ArtistDashboardLayout plan={plan}>
          <div className={styles.businessMain}>
            <header className={styles.hero}>
              <div>
                <p>ARTIST PRO</p>
                <h1><span>{current.icon}</span>{current.title}</h1>
                <div>{current.sub}</div>
              </div>
              <div className={styles.headerActions}>
                <Link href="/studio/music">My Music</Link>
                <Link href="/upload" className={styles.primary}>+ Upload</Link>
              </div>
            </header>

            {plan === "free" ? <UpgradeGate section={section}/> : (
              <>
                {section === "analytics" && <Analytics/>}
                {section === "earnings" && <Earnings notify={notify}/>} 
                {section === "promote" && <Promote notify={notify}/>} 
              </>
            )}
          </div>
        </ArtistDashboardLayout>
      </section>
      {toast && <div className={styles.toast}>{toast}</div>}
    </ArtistPortalShell>
  );
}

function UpgradeGate({ section }: { section: BusinessSection }) {
  const copy = {
    analytics: ["Analytics is onderdeel van Artist Pro", "Ontgrendel landen, saves, groeitrends, luistergedrag en diepere prestaties per track."],
    earnings: ["Earnings is onderdeel van Artist Pro", "Bekijk royalty's, je beschikbare saldo, uitbetalingen en historische statements."],
    promote: ["Promote is onderdeel van Artist Pro", "Maak campagnes, smart links, pre-save pagina's en promotietools voor releases."],
  } as const;
  return <section className={styles.upgradeGate}>
    <div className={styles.gateIcon}>◇</div>
    <small>ARTIST FREE · VERGRENDELD</small>
    <h2>{copy[section][0]}</h2>
    <p>{copy[section][1]}</p>
    <div className={styles.gateFeatures}>
      <span>✓ My Music en uploads blijven beschikbaar</span>
      <span>✓ Upgrade ontgrendelt alle Artist Pro business tools</span>
      <span>✓ MOCIFY STUDIO blijft een aparte creatieve laag</span>
    </div>
    <div className={styles.gateActions}>
      <Link className={styles.primary} href="/for-artists">Bekijk Artist Pro</Link>
      <Link href="/dashboard">Terug naar Dashboard</Link>
    </div>
  </section>;
}

function Analytics(){
  const[basis,setBasis]=useState("28D");
  const bars=[28,41,35,52,47,68,56,73,61,82,76,94,70,88];
  return <>
    <div className={styles.stats}>{[["24.8K","Streams","+18.4%"],["8.2K","Listeners","+12.1%"],["1,284","Saves","+23.7%"],["€184","Estimated earnings","+16.8%"]].map(x=><article key={x[1]}><small>{x[1]}</small><strong>{x[0]}</strong><em>{x[2]}</em></article>)}</div>
    <section className={styles.card}><div className={styles.cardHead}><div><small>PERFORMANCE</small><h2>Streams over time</h2></div><div className={styles.segment}>{["7D","28D","90D"].map(x=><button className={basis===x?styles.selected:""} onClick={()=>setBasis(x)} key={x}>{x}</button>)}</div></div><div className={styles.chart}>{bars.map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></section>
    <div className={styles.two}><section className={styles.card}><h2>Top tracks</h2>{[["TOCA BONBON","14.2K"],["Digital Touch","8.7K"],["After You","1.9K"]].map((x,i)=><div className={styles.list} key={x[0]}><span>{i+1}</span><b>{x[0]}</b><strong>{x[1]}</strong></div>)}</section><section className={styles.card}><h2>Audience</h2>{[["Netherlands","38%"],["Romania","27%"],["Germany","12%"],["United Kingdom","8%"]].map(x=><div className={styles.country} key={x[0]}><span>{x[0]}</span><div><i style={{width:x[1]}}/></div><b>{x[1]}</b></div>)}</section></div>
  </>;
}

function Earnings({notify}:{notify:(s:string)=>void}){
  return <>
    <div className={styles.balance}><div><small>AVAILABLE BALANCE</small><strong>€184.32</strong><span>Next estimated update · 30 Sep</span></div><button className={styles.primary} onClick={()=>notify("Payout request prepared — backend connection comes next.")}>Request payout</button></div>
    <div className={styles.stats}>{[["€246.18","Lifetime earnings",""],["€61.86","Pending",""],["24.8K","Monetized streams",""]].map(x=><article key={x[1]}><small>{x[1]}</small><strong>{x[0]}</strong></article>)}</div>
    <section className={styles.card}><div className={styles.cardHead}><div><small>ROYALTIES</small><h2>Recent statements</h2></div><button onClick={()=>notify("CSV export prepared for future backend data.")}>Export CSV</button></div>{[["August 2026","€72.41","Paid"],["July 2026","€64.18","Paid"],["June 2026","€48.77","Paid"]].map(x=><div className={styles.statement} key={x[0]}><b>{x[0]}</b><span>Streaming royalties</span><strong>{x[1]}</strong><em>{x[2]}</em></div>)}</section>
  </>;
}

function Promote({notify}:{notify:(s:string)=>void}){
  const[goal,setGoal]=useState("Streams");
  return <>
    <div className={styles.two}><section className={styles.card}><small>NEW CAMPAIGN</small><h2>Push your next release</h2><label>Track<select><option>TOCA BONBON</option><option>Digital Touch</option></select></label><label>Goal<div className={styles.choices}>{["Streams","Followers","Saves"].map(x=><button onClick={()=>setGoal(x)} className={goal===x?styles.selected:""} key={x}>{x}</button>)}</div></label><label>Audience<select><option>Smart audience</option><option>Netherlands</option><option>Romania</option><option>Global</option></select></label><button className={styles.primary} onClick={()=>notify("Campaign draft created.")}>Create campaign</button></section><section className={styles.card}><small>ACTIVE CAMPAIGN</small><h2>TOCA BONBON · Discovery</h2><div className={styles.campaign}><strong>3,842</strong><span>campaign impressions</span><div><i style={{width:"68%"}}/></div><small>68% of prototype goal</small></div></section></div>
    <section className={styles.card}><h2>Promo tools</h2><div className={styles.toolCards}>{["Smart link","Pre-save page","Share card","Artist QR"].map(x=><button onClick={()=>notify(`${x} opened.`)} key={x}><span>↗</span><b>{x}</b><small>Create & share</small></button>)}</div></section>
  </>;
}
