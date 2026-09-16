"use client";
import Link from"next/link";
import{useEffect,useState}from"react";
import{ArtistPortalShell}from"../artist-components";
import ArtistDashboardLayout,{type ArtistPlanTier}from"../artist-dashboard-layout";
import styles from"./dashboard.module.css";

type Plan=ArtistPlanTier;
const plans={
 free:{name:"Artist Free",eyebrow:"ARTIST FREE",title:"De basis om te starten.",text:"Upload muziek, beheer releases en bekijk je belangrijkste streamcijfers."},
 pro:{name:"Artist Pro",eyebrow:"ARTIST PRO",title:"Meer data. Meer controle.",text:"Ontgrendel uitgebreide analytics, inkomstenoverzicht en promotietools."},
 studio:{name:"MOCIFY STUDIO",eyebrow:"MOCIFY STUDIO",title:"Alles van Pro + je creatieve werkruimte.",text:"Combineer business tools met Create, Editor, Mastering en Projects."}
}as const;

export default function Dashboard(){
 const[plan,setPlan]=useState<Plan>("free");
 useEffect(()=>{const saved=window.localStorage.getItem("mocify-artist-plan");if(saved==="free"||saved==="pro"||saved==="studio")setPlan(saved)},[]);
 const choosePlan=(p:Plan)=>{setPlan(p);window.localStorage.setItem("mocify-artist-plan",p);window.dispatchEvent(new CustomEvent("mocify-plan-change",{detail:p}))};
 const access=plans[plan];
 const stats=plan==="free"?[["24.8K","TOTALE STREAMS","+18.4%"],["8.2K","LUISTERAARS","+12.1%"],["3","RELEASES","2 live · 1 concept"]]:[["24.8K","TOTALE STREAMS","+18.4%"],["8.2K","LUISTERAARS","+12.1%"],["1,284","SAVES","+23.7%"],["€184","GESCHATTE INKOMSTEN","+16.8%"]];
 return <ArtistPortalShell active="studio"><section className={`page-wrap ${styles.page}`}>
  <header className={styles.head}><div><p className="page-kicker">ARTIST DASHBOARD</p><h1>Welkom terug, <span>Andigo.</span></h1><p>Beheer hier je releases en alles rond de zakelijke kant van je muziek.</p></div><div className={styles.preview}><small>PROTOTYPE · BEKIJK ABONNEMENT</small>{(["free","pro","studio"]as Plan[]).map(p=><button key={p} className={plan===p?styles.active:""} onClick={()=>choosePlan(p)}>{plans[p].name}</button>)}</div></header>
  <ArtistDashboardLayout plan={plan} showStudioEntry={plan==="studio"}>
   <section className={`${styles.planHero} ${styles[`planHero_${plan}`]}`}><div><small>{access.eyebrow}</small><h2>{access.title}</h2><p>{access.text}</p></div>{plan==="free"?<Link href="/for-artists">Ontdek Artist Pro →</Link>:plan==="pro"?<span className={styles.proActive}>PRO ACTIVE</span>:<Link href="/studio/projects">Open MOCIFY STUDIO →</Link>}</section>
   <div className={`${styles.stats} ${plan!=="free"?styles.statsPro:""}`}>{stats.map(x=><article key={x[1]}><small>{x[1]}</small><strong>{x[0]}</strong><em>{x[2]}</em></article>)}</div>
   <section className={styles.card}><div className={styles.cardHead}><div><p className="page-kicker">MUZIEK</p><h2>Recente releases</h2></div><Link href="/studio/music">Alles bekijken →</Link></div>{[["TB","TOCA BONBON","14.2K","Live"],["DT","Digital Touch","8.7K","Live"],["AY","After You","—","Concept"]].map((x,i)=><div className={styles.release} key={x[1]}><span className={styles[`art${i}`]}>{x[0]}</span><div><b>{x[1]}</b><small>{x[3]}</small></div><strong>{x[2]} <small>streams</small></strong></div>)}</section>
   <section className={styles.card}><div className={styles.cardHead}><div><p className="page-kicker">{plan==="free"?"STREAMS":"PRO ANALYTICS"}</p><h2>{plan==="free"?"Basisprestaties":"Uitgebreide prestaties"}</h2></div>{plan!=="free"&&<Link href="/studio/analytics">Volledige analyses →</Link>}</div><div className={styles.chart}>{[31,48,39,57,51,69,62,76,67,88,79,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><p className={styles.note}>{plan==="free"?"Artist Free toont alleen de kerncijfers. Diepere publieksdata, saves, landen en groeitrends horen bij Artist Pro.":"Artist Pro geeft toegang tot diepere publieksdata, saves, landen, groeitrends en inkomsteninzichten."}</p></section>
   {plan==="free"?<section className={styles.proLock}><div><small>VERGRENDELD OP ARTIST FREE</small><h2>Ga verder met Artist Pro</h2><p>Analytics, Earnings en Promote blijven zichtbaar in je menu, maar worden pas ontgrendeld met Artist Pro.</p></div><div className={styles.lockFeatures}>{[["◫","Analytics","Landen, saves, groei en luistergedrag"],["€","Earnings","Royalty's, saldo en uitbetalingen"],["↗","Promote","Campagnes, smart links en pre-saves"]].map(x=><article key={x[1]}><span>{x[0]}</span><div><b>{x[1]}</b><small>{x[2]}</small></div><em>PRO</em></article>)}</div><Link className={styles.upgradeButton} href="/for-artists">Bekijk Artist Pro →</Link></section>:<><div className={styles.proInsights}><section><small>TOP LANDEN</small><strong>Nederland <b>38%</b></strong><strong>Roemenië <b>27%</b></strong><strong>Duitsland <b>12%</b></strong></section><section><small>ENGAGEMENT</small><strong>1,284 <b>saves</b></strong><strong>642 <b>followers</b></strong><strong>7.8% <b>save rate</b></strong></section></div><div className={styles.businessCards}><Link href="/studio/earnings"><span>€</span><div><b>Inkomsten</b><small>Royalty's, saldo en uitbetalingen</small></div></Link><Link href="/studio/promote"><span>↗</span><div><b>Promoten</b><small>Betaalde campagnes voor je muziek</small></div></Link></div></>}
  </ArtistDashboardLayout>
 </section></ArtistPortalShell>
}
