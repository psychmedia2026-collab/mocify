import Link from "next/link";
import {financeSummary,platformSummary} from "@/lib/server/platform-admin";
export const dynamic="force-dynamic";
const money=(n:unknown)=>new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR"}).format(Number(n??0)/100);
export default async function AdminPage(){
 const [p,f]=await Promise.all([platformSummary(),financeSummary()]);
 const kpis=[
  ["Accounts",p.active_accounts,"Active accounts","/admin/users","blue"],
  ["Artists",p.artists,"Artist Free · Pro · Max","/admin/artists","purple"],
  ["Businesses",p.businesses,"Business accounts","/admin/business","cyan"],
  ["Tracks",p.tracks,"Database catalogue","/admin/content","cyan"],
  ["Releases",p.releases,"Singles · EPs · albums","/admin/content","purple"],
  ["Streams",p.streams,"Counted stream events","/admin/reports","green"],
  ["Subscriptions",p.active_subscriptions,"Active subscriptions","/admin/payments","green"],
  ["Open risk cases",p.open_risk_cases,"Require review","/admin/reports","red"]
 ];
 return <><div className="adminTopline"><div><div className="adminEyebrow">MOCIFY OWNER COMMAND CENTER · DATABASE</div><h1 className="adminTitle">MOCIFY platform overview</h1><p className="adminMuted adminLead">Live totals from the local PostgreSQL backend. Empty values are real zeroes until accounts, music and transactions are added.</p></div><span className="adminDemoBadge">BACKEND LIVE</span></div>
 <section className="adminKpiGrid">{kpis.map(([label,value,detail,href,tone])=><Link className={`adminKpi adminTone-${tone}`} href={String(href)} key={String(label)}><div className="adminKpiHead"><span>{label}</span><b>LIVE</b></div><strong>{String(value)}</strong><small>{detail}</small></Link>)}</section>
 <div className="adminSectionHead"><div><div className="adminEyebrow">ACTION CENTER</div><h2>Items requiring attention</h2></div></div><section className="adminActionGrid"><Link href="/admin/reports" className="adminActionCard adminTone-red"><div><span className="adminActionCount">{p.open_risk_cases}</span><h3>Risk cases</h3><p>Open fraud or safety investigations.</p></div><span className="adminArrow">→</span></Link><Link href="/admin/reports" className="adminActionCard adminTone-blue"><div><span className="adminActionCount">{p.open_support_tickets}</span><h3>Support tickets</h3><p>Open questions that still need handling.</p></div><span className="adminArrow">→</span></Link><Link href="/admin/payments" className="adminActionCard adminTone-orange"><div><span className="adminActionCount">{f.payout_count}</span><h3>Payout records</h3><p>Artist payout records in the database.</p></div><span className="adminArrow">→</span></Link></section>
 <section className="adminRevenue"><div><div className="adminEyebrow">FINANCE CONTROL · DATABASE</div><h2>Money in & money out</h2><p className="adminMuted">Values below are calculated directly from payment and payout records.</p></div><div className="adminRevenueItems"><div><span>Settled revenue</span><strong>{money(f.settled_revenue_minor)}</strong><small>{f.payment_count} payment records</small></div><div><span>Pending revenue</span><strong>{money(f.pending_revenue_minor)}</strong></div><div><span>Paid to artists</span><strong>{money(f.paid_out_minor)}</strong></div><div><span>Pending payouts</span><strong>{money(f.pending_payout_minor)}</strong><small>{f.payout_count} payout records</small></div></div><div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"}}><Link className="adminPrimaryBtn" href="/admin/payments">Open payments & payouts →</Link><Link className="adminPrimaryBtn" href="/admin/artists">Open artists →</Link></div></section>
 <section className="adminDemoSection"><div className="adminEyebrow">BACKEND STATUS</div><h2>Core administration is now reading PostgreSQL</h2><div className="adminMiniGrid"><div><span>ACCOUNTS</span><strong>{p.active_accounts}</strong><small>Active database accounts</small></div><div><span>CATALOGUE</span><strong>{p.tracks}</strong><small>Tracks · {p.releases} releases</small></div><div><span>STREAMING</span><strong>{p.streams}</strong><small>Counted stream events</small></div><div><span>OPERATIONS</span><strong>{Number(p.open_risk_cases)+Number(p.open_support_tickets)}</strong><small>Open risk + support cases</small></div></div></section></>;
}
