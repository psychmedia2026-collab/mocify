import Link from "next/link";

const kpis=[
 {label:"Listeners",value:"12,840",detail:"Guest · Free · Premium",change:"+8.4%",href:"/admin/users"},
 {label:"Artists",value:"1,126",detail:"38 awaiting review",change:"+4.1%",href:"/admin/artists"},
 {label:"Tracks",value:"8,492",detail:"126 pending moderation",change:"+11.7%",href:"/admin/content"},
 {label:"Business",value:"184",detail:"21 active requests",change:"+6.2%",href:"/admin/business"},
 {label:"Subscriptions",value:"3,284",detail:"Paid listener + artist plans",change:"+5.8%",href:"/admin/users"},
 {label:"Promote revenue",value:"€2,460",detail:"Current demo month",change:"+14.3%",href:"/admin/content"},
 {label:"Business revenue",value:"€4,820",detail:"Licensing · demo month",change:"+9.6%",href:"/admin/licenses"},
 {label:"Open alerts",value:"17",detail:"Rights · fraud · reports",change:"Needs review",href:"/admin/content"}
];
const actions=[
 {title:"Artist approvals",count:"38",text:"New artist profiles waiting for review.",href:"/admin/artists"},
 {title:"Release moderation",count:"126",text:"Tracks waiting for content and rights checks.",href:"/admin/content"},
 {title:"Business requests",count:"21",text:"New licensing and business enquiries.",href:"/admin/business"},
 {title:"License requests",count:"14",text:"Commercial music uses requiring review.",href:"/admin/licenses"}
];
const activity=[
 ["Artist registration","Nova Ray","Artist","Review"],
 ["Track upload","Neon Memory","Content","Pending"],
 ["Promote campaign","Midnight Drive · €75","Promote","Active"],
 ["Business license","Campaign request #1048","Business","New"],
 ["Subscription","Premium activation","Listener","Completed"],
 ["Rights report","Track #8291","Moderation","Urgent"]
];
const health=[
 ["Platform","Operational","Frontend demo environment"],
 ["Payments","Backend pending","Connect payment provider later"],
 ["Streaming analytics","Backend pending","Real stream validation not connected"],
 ["Artist payouts","Backend pending","Royalty engine not connected"],
 ["AI cover generation","Backend pending","Secure server-side API task"],
];
export default function AdminPage(){return <>
 <div className="adminTopline"><div><div className="adminEyebrow">MOCIFY CONTROL CENTER · FRONTEND DEMO</div><h1 className="adminTitle">Platform overview</h1><p className="adminMuted adminLead">One management view across listeners, artists, music, Promote and MOCIFY Business. Numbers below are mock data until the backend is connected.</p></div><span className="adminDemoBadge">DEMO DATA</span></div>
 <section className="adminKpiGrid">{kpis.map(x=><Link className="adminKpi" href={x.href} key={x.label}><div className="adminKpiHead"><span>{x.label}</span><b>{x.change}</b></div><strong>{x.value}</strong><small>{x.detail}</small></Link>)}</section>
 <div className="adminSectionHead"><div><div className="adminEyebrow">ACTION CENTER</div><h2>Needs your attention</h2></div><span className="adminMuted">Mock queues · backend-ready UI</span></div>
 <section className="adminActionGrid">{actions.map(x=><Link href={x.href} className="adminActionCard" key={x.title}><div><span className="adminActionCount">{x.count}</span><h3>{x.title}</h3><p>{x.text}</p></div><span className="adminArrow">→</span></Link>)}</section>
 <section className="adminSplit">
  <div><div className="adminSectionHead compact"><div><div className="adminEyebrow">ACTIVITY</div><h2>Recent platform activity</h2></div></div><div className="adminTableWrap"><table className="adminTable"><thead><tr><th>Type</th><th>Activity</th><th>Area</th><th>Status</th></tr></thead><tbody>{activity.map(([type,name,area,status])=><tr key={type+name}><td>{type}</td><td><strong>{name}</strong></td><td>{area}</td><td><span className={`adminBadge adminStatus-${status.toLowerCase()}`}>{status}</span></td></tr>)}</tbody></table></div></div>
  <aside className="adminHealth"><div className="adminEyebrow">SYSTEM</div><h2>Platform readiness</h2><p className="adminMuted">Clear separation between what is visible now and what still needs the central backend.</p>{health.map(([name,status,note])=><div className="adminHealthRow" key={name}><div><strong>{name}</strong><small>{note}</small></div><span className={status==="Operational"?"adminReady":"adminPending"}>{status}</span></div>)}</aside>
 </section>
 <section className="adminRevenue"><div><div className="adminEyebrow">REVENUE SNAPSHOT</div><h2>How MOCIFY earns</h2><p className="adminMuted">Demo overview only. Real accounting, payment reconciliation and artist payouts are backend tasks.</p></div><div className="adminRevenueItems"><div><span>Subscriptions</span><strong>€6,940</strong></div><div><span>MOCIFY Promote</span><strong>€2,460</strong></div><div><span>Business licensing</span><strong>€4,820</strong></div><div className="adminRevenueTotal"><span>Demo gross revenue</span><strong>€14,220</strong></div></div></section>
 </>}
