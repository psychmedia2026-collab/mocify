"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArtistPortalShell } from "../artist-components";
import styles from "./studio.module.css";

type Plan = "free" | "pro" | "studio";

const planInfo = {
  free: { label: "Artist Free", price: "€0", note: "Upload and release music on MOCIFY." },
  pro: { label: "Artist Pro", price: "€7.99/mo", note: "Release music and unlock audience analytics." },
  studio: { label: "MOCIFY STUDIO", price: "€19.99/mo", note: "Full creation, editing and artist toolkit." },
} as const;

const navItems = [
  { icon: "⌂", label: "Overview", access: "free" as Plan },
  { icon: "♫", label: "My Music", access: "free" as Plan },
  { icon: "↑", label: "Upload / Release", access: "free" as Plan, href: "/upload" },
  { icon: "◫", label: "Analytics", access: "pro" as Plan },
  { icon: "€", label: "Earnings", access: "pro" as Plan },
  { icon: "↗", label: "Promote", access: "pro" as Plan },
];

const studioItems = [
  { icon: "✦", label: "Create", description: "Generate new music with MOCIFY AI." },
  { icon: "≋", label: "Editor", description: "Edit, arrange and shape your track." },
  { icon: "◆", label: "Mastering", description: "Prepare your final sound for release." },
  { icon: "▣", label: "Projects", description: "Keep works in progress in one workspace." },
];

const rank: Record<Plan, number> = { free: 0, pro: 1, studio: 2 };

export default function StudioPage() {
  const [plan, setPlan] = useState<Plan>("free");
  const current = planInfo[plan];
  const hasAccess = (required: Plan) => rank[plan] >= rank[required];

  const metrics = useMemo(() => {
    if (!hasAccess("pro")) return [
      ["—", "Streams"], ["—", "Listeners"], ["—", "Earnings"]
    ];
    return [["24.8K", "Streams"], ["8.2K", "Listeners"], ["€184", "Earnings"]];
  }, [plan]);

  return <ArtistPortalShell active="studio">
    <section className={`page-wrap ${styles.dashboard}`}>
      <div className={styles.topbar}>
        <div>
          <p className="page-kicker">ARTIST DASHBOARD</p>
          <h1>Welcome back, <span>Andigo.</span></h1>
          <p>{current.note}</p>
        </div>

        <div className={styles.planPreview} aria-label="Prototype plan switcher">
          <small>PROTOTYPE VIEW</small>
          <div>
            {(["free", "pro", "studio"] as Plan[]).map((item) =>
              <button key={item} type="button" onClick={() => setPlan(item)} className={plan === item ? styles.planActive : ""}>{planInfo[item].label}</button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <aside className={styles.sidebar}>
          <div className={styles.artistCard}>
            <span className={styles.avatar}>AN</span>
            <div><b>Andigo</b><small>{current.label}</small></div>
            <span className={styles.planPrice}>{current.price}</span>
          </div>

          <nav aria-label="Artist dashboard navigation">
            <p>DASHBOARD</p>
            {navItems.map((item) => {
              const unlocked = hasAccess(item.access);
              if (item.href && unlocked) return <Link key={item.label} href={item.href}><span>{item.icon}</span>{item.label}</Link>;
              return <button key={item.label} type="button" className={!unlocked ? styles.locked : ""} disabled={!unlocked}><span>{item.icon}</span>{item.label}{!unlocked && <i>🔒</i>}</button>;
            })}
          </nav>

          <div className={styles.studioNav}>
            <div className={styles.studioLabel}><span>MOCIFY STUDIO</span>{plan !== "studio" && <b>LOCKED</b>}</div>
            {studioItems.map((item) => <button type="button" key={item.label} disabled={plan !== "studio"} className={plan !== "studio" ? styles.locked : ""}><span>{item.icon}</span>{item.label}{plan !== "studio" && <i>🔒</i>}</button>)}
            {plan !== "studio" && <Link className={styles.upgrade} href="/for-artists">Upgrade to Studio →</Link>}
          </div>
        </aside>

        <main className={styles.mainPanel}>
          <div className={styles.summaryRow}>
            {metrics.map(([value, label]) => <article key={label} className={!hasAccess("pro") ? styles.metricLocked : ""}>
              <span>{label}</span><strong>{value}</strong>{!hasAccess("pro") && <small>Artist Pro</small>}
            </article>)}
          </div>

          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><p className="page-kicker">YOUR MUSIC</p><h2>Recent releases</h2></div><Link href="/upload">Upload new track →</Link></div>
            <div className={styles.releaseList}>
              <div><span className={styles.coverA}>TB</span><div><b>TOCA BONBON</b><small>Published · 3:28</small></div><em>Live</em></div>
              <div><span className={styles.coverB}>DM</span><div><b>Digital Touch</b><small>Published · 3:25</small></div><em>Live</em></div>
              <div><span className={styles.coverC}>AY</span><div><b>After You</b><small>Draft · 3:32</small></div><em className={styles.draft}>Draft</em></div>
            </div>
          </section>

          <section className={`${styles.panel} ${styles.analyticsPanel}`}>
            <div className={styles.panelHeading}><div><p className="page-kicker">PERFORMANCE</p><h2>Audience overview</h2></div>{hasAccess("pro") ? <span className={styles.liveBadge}>LIVE PREVIEW</span> : <Link href="/for-artists">Unlock with Artist Pro →</Link>}</div>
            {hasAccess("pro") ? <>
              <div className={styles.chart} aria-hidden="true">{[32,45,38,59,48,67,61,76,69,88,82,96].map((height,index)=><i key={index} style={{height:`${height}%`}} />)}</div>
              <div className={styles.analyticsFooter}><span>Top country <b>Netherlands</b></span><span>Top track <b>TOCA BONBON</b></span><span>Saves <b>1,284</b></span></div>
            </> : <div className={styles.lockState}><span>◫</span><h3>Analytics are locked</h3><p>Upgrade to Artist Pro to see streams, listeners, countries, saves and growth.</p><Link className="m-primary" href="/for-artists">View Artist Pro →</Link></div>}
          </section>

          <section className={`${styles.panel} ${styles.studioPanel}`}>
            <div className={styles.panelHeading}><div><p className="page-kicker">MOCIFY STUDIO</p><h2>Create. Edit. Finish.</h2></div>{plan === "studio" ? <span className={styles.liveBadge}>UNLOCKED</span> : <Link href="/for-artists">Upgrade to Studio →</Link>}</div>
            <div className={styles.toolGrid}>
              {studioItems.map((tool) => <article key={tool.label} className={plan !== "studio" ? styles.toolLocked : ""}>
                <span>{tool.icon}</span><div><h3>{tool.label}</h3><p>{tool.description}</p></div>{plan !== "studio" && <b>🔒</b>}
              </article>)}
            </div>
          </section>
        </main>
      </div>

      <p className={styles.prototypeNote}>Prototype only — the plan switcher is for development preview and will disappear when real artist accounts and subscriptions are connected.</p>
    </section>
  </ArtistPortalShell>;
}
