const stats = [
  ["Listeners", "12,840"], ["Artists", "1,126"], ["Tracks", "8,492"], ["Business accounts", "184"]
];
const activity = [
  ["Artist registration", "Nova Ray", "Review"],
  ["Track upload", "Neon Memory", "Pending"],
  ["Business license", "Campaign request #1048", "New"],
  ["Subscription", "Premium activation", "Completed"]
];
export default function AdminPage(){return <>
  <div className="adminEyebrow">Control center · demo data</div>
  <h1 className="adminTitle">Platform overview</h1>
  <p className="adminMuted">One operational view across Mocify listeners, artists and Mocify Business. Live data will replace these placeholders when the central backend is connected.</p>
  <section className="adminGrid">{stats.map(([label,value])=><article className="adminCard" key={label}><span className="adminMuted">{label}</span><strong>{value}</strong></article>)}</section>
  <h2 style={{marginTop:36}}>Recent activity</h2>
  <table className="adminTable"><thead><tr><th>Type</th><th>Activity</th><th>Status</th></tr></thead><tbody>{activity.map(([type,name,status])=><tr key={name}><td>{type}</td><td>{name}</td><td><span className="adminBadge">{status}</span></td></tr>)}</tbody></table>
</>}
