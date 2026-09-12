import {Shell} from "../components";

export default function Settings(){
  const rows=[["Profile","Manage your public name and profile."],["Playback","Audio quality and playback preferences."],["Notifications","Choose what MOCIFY can notify you about."],["Privacy","Control profile visibility and activity."]];
  return <Shell player={false}>
    <section className="page-wrap max-w-3xl py-16"><p className="page-kicker">ACCOUNT</p><h1 className="page-title">Settings</h1><div className="mt-9 space-y-3">{rows.map(([title,text])=><button key={title} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-5 text-left transition hover:border-fuchsia-500/20 hover:bg-white/[.04]"><div><h2 className="font-bold">{title}</h2><p className="mt-1 text-xs text-zinc-500">{text}</p></div><span className="text-zinc-600">›</span></button>)}</div><a href="/" className="mt-8 inline-block text-xs text-zinc-500">Log out of prototype</a></section>
  </Shell>
}
