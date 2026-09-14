import Link from "next/link";
import { Shell } from "../components";
import styles from "./studio.module.css";

const tools = [
  { icon: "✦", title: "Create", text: "Generate new music ideas, versions and future AI creations.", status: "Coming soon" },
  { icon: "≋", title: "Editor", text: "Shape your audio, arrange sections and prepare your final track.", status: "Coming soon" },
  { icon: "♫", title: "My Music", text: "Keep your projects, drafts and finished songs together.", status: "Coming soon" },
  { icon: "↑", title: "Upload / Release", text: "Upload AI music and prepare it for release on MOCIFY.", href: "/upload", status: "Available" },
  { icon: "◫", title: "Analytics", text: "Follow streams, listeners, saves and audience growth.", status: "Coming soon" },
  { icon: "€", title: "Earnings", text: "View future revenue, payouts and performance in one place.", status: "Coming soon" },
  { icon: "↗", title: "Promote", text: "Run promoted-track and featured-artist campaigns inside MOCIFY.", status: "Coming soon" },
  { icon: "◎", title: "Artist Profile", text: "Manage your identity, bio, artwork and public artist page.", status: "Coming soon" },
];

export default function StudioPage() {
  return <Shell active="mocify studio" player={false}>
    <section className={`page-wrap ${styles.studio}`}>
      <div className={styles.hero}>
        <div>
          <p className="page-kicker">MOCIFY STUDIO</p>
          <h1>Your music.<br/><span>Your workspace.</span></h1>
          <p>Create, edit, release, promote and grow your music from one artist dashboard. MOCIFY Studio is being built as the creative control room behind every MOCIFY artist.</p>
          <div className={styles.actions}>
            <Link className="m-primary" href="/upload">Upload / Release →</Link>
            <span className={styles.badge}>STUDIO PREVIEW</span>
          </div>
        </div>

        <div className={styles.overview} aria-label="Studio overview preview">
          <div className={styles.overviewTop}><span>Artist dashboard</span><b>PREVIEW</b></div>
          <div className={styles.stats}>
            <div><strong>—</strong><span>Streams</span></div>
            <div><strong>—</strong><span>Listeners</span></div>
            <div><strong>—</strong><span>Earnings</span></div>
          </div>
          <div className={styles.wave} aria-hidden="true">
            {[28,52,36,76,48,88,58,42,70,95,62,80,44,68,38,84,54,72,46,64].map((height,index)=><i key={index} style={{height:`${height}%`}} />)}
          </div>
          <small>Real analytics will appear here after accounts and the backend are connected.</small>
        </div>
      </div>

      <div className={styles.sectionHeading}>
        <div><p className="page-kicker">ARTIST TOOLKIT</p><h2>Everything starts in Studio.</h2></div>
        <p>We are building these modules step by step. Features marked “Coming soon” are visual previews and are not active yet.</p>
      </div>

      <div className={styles.grid}>
        {tools.map((tool) => {
          const content = <>
            <div className={styles.cardTop}><span className={styles.icon}>{tool.icon}</span><small className={tool.href ? styles.live : styles.soon}>{tool.status}</small></div>
            <h3>{tool.title}</h3>
            <p>{tool.text}</p>
            <span className={styles.cardArrow}>{tool.href ? "Open →" : "Soon"}</span>
          </>;
          return tool.href
            ? <Link className={`${styles.card} ${styles.cardLive}`} href={tool.href} key={tool.title}>{content}</Link>
            : <article className={styles.card} key={tool.title}>{content}</article>;
        })}
      </div>

      <div className={styles.flow}>
        <p className="page-kicker">THE MOCIFY FLOW</p>
        <h2>CREATE <span>→</span> EDIT <span>→</span> RELEASE <span>→</span> PROMOTE <span>→</span> STREAM <span>→</span> EARN</h2>
      </div>
    </section>
  </Shell>;
}
