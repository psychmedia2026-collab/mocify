"use client";

import Link from "next/link";
import { useState } from "react";
import { ArtistPortalShell } from "../../artist-components";
import ArtistDashboardLayout from "../../artist-dashboard-layout";
import styles from "../workspace.module.css";

export default function AnalyticsPage(){
  const [basis,setBasis]=useState("28D");
  const bars=[28,41,35,52,47,68,56,73,61,82,76,94,70,88];

  return <ArtistPortalShell active="studio">
    <section className="page-wrap py-12">
      <ArtistDashboardLayout>
        <header className={styles.hero}>
          <div>
            <p>ARTIST PRO</p>
            <h1><span>◫</span>Analytics</h1>
            <div>Understand who is listening and how your music is growing.</div>
          </div>
          <div className={styles.headerActions}>
            <Link href="/studio/music">My Music</Link>
            <Link href="/upload" className={styles.primary}>+ Upload</Link>
          </div>
        </header>

        <div className={styles.stats}>
          {[["24.8K","Streams","+18.4%"],["8.2K","Listeners","+12.1%"],["1,284","Saves","+23.7%"],["€184","Estimated earnings","+16.8%"]].map(x=><article key={x[1]}><small>{x[1]}</small><strong>{x[0]}</strong><em>{x[2]}</em></article>)}
        </div>

        <section className={styles.card}>
          <div className={styles.cardHead}>
            <div><small>PERFORMANCE</small><h2>Streams over time</h2></div>
            <div className={styles.segment}>{["7D","28D","90D"].map(x=><button className={basis===x?styles.selected:""} onClick={()=>setBasis(x)} key={x}>{x}</button>)}</div>
          </div>
          <div className={styles.chart}>{bars.map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>
        </section>

        <div className={styles.two}>
          <section className={styles.card}>
            <h2>Top tracks</h2>
            {[["TOCA BONBON","14.2K"],["Digital Touch","8.7K"],["After You","1.9K"]].map((x,i)=><div className={styles.list} key={x[0]}><span>{i+1}</span><b>{x[0]}</b><strong>{x[1]}</strong></div>)}
          </section>
          <section className={styles.card}>
            <h2>Audience</h2>
            {[["Netherlands","38%"],["Romania","27%"],["Germany","12%"],["United Kingdom","8%"]].map(x=><div className={styles.country} key={x[0]}><span>{x[0]}</span><div><i style={{width:x[1]}}/></div><b>{x[1]}</b></div>)}
          </section>
        </div>
      </ArtistDashboardLayout>
    </section>
  </ArtistPortalShell>
}
