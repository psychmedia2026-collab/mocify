import Link from "next/link";
import {Shell} from "../components";

export default function Settings(){
  const rows=[["Profile","Manage your public name and profile."],["Playback","Audio quality and playback preferences."],["Notifications","Choose what MOCIFY can notify you about."],["Privacy","Control profile visibility and activity."]];
  return <Shell player={false}>
    <section className="page-wrap max-w-3xl py-16"><p className="page-kicker">ACCOUNT</p><h1 className="page-title">Settings</h1><p className="page-lead mt-5">These controls are visual placeholders until accounts are connected.</p><div className="mt-9 space-y-3">{rows.map(([title,text])=><button type="button" disabled title={`${title} settings are coming soon`} key={title} className="settings-row flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-5 text-left"><span><span className="block font-bold">{title}</span><span className="mt-1 block text-xs text-zinc-400">{text}</span></span><span className="prototype-badge">SOON</span></button>)}</div><Link href="/" className="mt-8 inline-block text-xs text-zinc-400">← Back to MOCIFY</Link></section>
  </Shell>
}
