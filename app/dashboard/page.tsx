"use client";
import Link from"next/link";
import{useEffect,useState}from"react";
import{ArtistPortalShell}from"../artist-components";
import ArtistDashboardLayout,{type ArtistPlanTier}from"../artist-dashboard-layout";
import styles from"./dashboard.module.css";

type Plan=ArtistPlanTier;
const plans={free:"Artist Free",pro:"Artist Pro",studio:"MOCIFY STUDIO"}as const;

export default function Dashboard(){
 const[plan,setPlan]=useState<Plan>("free");
 useEffect(()=>{const saved=window.localStorage.getItem("mocify-artist-plan");if(saved==="free"||saved==="pro"||saved==="studio")setPlan(saved)},[]);
 const choosePlan=(p:Plan)=>{setPlan(p);window.localStorage.setItem("mocify-artist-plan",p);window.dispatchEvent(new CustomEvent("mocify-plan-change",{detail:p}))};
 const isFree=plan==="free";
 return <ArtistPortalShell active="studio"><section className={`page-wrap ${styles.page}`}>
  <div className={styles.planSwitcher}><small>PROTOTYPE · PLAN</small>{(["free","pro","studio"]as Plan[]).map(p=><button key={p} className={plan===p?styles.active:""} onClick={()=>choosePlan(p)}>{plans[p]}</button>)}</div>
  <ArtistDashboardLayout plan={plan} showStudioEntry={plan==="studio"}>
   <header className={styles.welcome}><h1>Good evening, Andigo</h1><p>Manage your music, track your progress and reach more listeners.</p></header>
   <div className={styles.metricGrid}>
    <article><span className={styles.purpleIcon}>♫</span><small>Total Tracks</small><strong>{isFree?"0":"3"}</strong><p>{isFree?"No releases yet":"3 active releases"}</p></article>
    <article><span className={styles.greenIcon}>▷</span><small>Total Plays</small><strong>{isFree?"0":"24.8K"}</strong><p>{isFree?"Start releasing to see stats":"+18.4% this period"}</p></article>
    <article><span className={styles.blueIcon}>♟</span><small>Listeners</small><strong>{isFree?"0":"8.2K"}</strong><p>{isFree?"Your audience will appear here":"Unique listeners"}</p></article>
   </div>
   <div className={styles.actionGrid}>
    <section className={styles.actionCard}><div className={styles.actionTitle}><span className={styles.uploadIcon}>↑</span><div><h2>{isFree?"Upload Your First Track":"Upload a New Track"}</h2><p>Share your music with the world in just a few clicks.</p></div></div><Link className={styles.uploadButton} href="/upload">Upload a Track <b>→</b></Link></section>
    <section className={styles.actionCard}><div className={styles.actionTitle}><span className={styles.crownIcon}>♛</span><div><h2>{isFree?"Choose a Plan":plan==="pro"?"Artist Pro Active":"MOCIFY Studio Active"}</h2><p>{isFree?"Unlock more features to grow and promote your music.":plan==="pro"?"Analytics, earnings and promotion tools are unlocked.":"Your full creative environment is unlocked."}</p></div></div>{isFree?<Link className={styles.secondaryButton} href="/for-artists">View Plans</Link>:<span className={styles.activePlan}>{plans[plan]}</span>}</section>
   </div>
   <section className={styles.activity}><h2>Recent Activity</h2><p>Your latest updates and milestones.</p>{isFree?<div className={styles.emptyActivity}><span>♫</span><b>No recent activity</b><small>Upload your first track to get started.</small></div>:<div className={styles.activityRows}>{[["♫","TOCA BONBON","Release is live"],["◫","Analytics updated","24.8K total plays"],["↗","Audience growing","+12.1% listeners"]].map(x=><div key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}</div>}</section>
  </ArtistDashboardLayout>
 </section></ArtistPortalShell>
}
