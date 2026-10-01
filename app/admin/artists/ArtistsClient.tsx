"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAdminLanguage } from "../AdminLanguage";

type ApiPlan = "ARTIST_FREE" | "ARTIST_PRO" | "ARTIST_MAX";
type Plan = "Artist Free" | "Artist Pro" | "Artist Max";
type Artist = {
  id: string;
  name: string;
  email: string;
  plan: ApiPlan;
  verification: string;
  status: string;
  countryCode: string | null;
  trackCount: number;
  totalStreams: number;
};

const planLabel = (plan: ApiPlan): Plan =>
  plan === "ARTIST_MAX" ? "Artist Max" : plan === "ARTIST_PRO" ? "Artist Pro" : "Artist Free";

const formatStreams = (value: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export default function ArtistsClient() {
  const { t } = useAdminLanguage();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [q, setQ] = useState("");
  const [v, setV] = useState("ALL");
  const [p, setP] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/artists", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.ok) throw new Error(data.error || "Artist database query failed");
        if (active) setArtists(data.artists);
      })
      .catch(() => active && setError(t("Artiesten konden niet uit de database worden geladen.", "Artists could not be loaded from the database.")))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [t]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return artists.filter((a) => {
      const label = planLabel(a.plan);
      const verificationMatches = v === "ALL" || a.verification === v;
      const planMatches = p === "ALL" || label === p;
      const haystack = [a.id, a.name, a.email, label, a.verification, a.status, a.countryCode ?? "", a.trackCount, a.totalStreams].join(" ").toLowerCase();
      return verificationMatches && planMatches && (!needle || haystack.includes(needle));
    });
  }, [artists, q, v, p]);

  const planClass = (plan: Plan) => plan === "Artist Max" ? "revenue" : plan === "Artist Pro" ? "premium" : "free";

  return <>
    <div className="adminPageHead"><div><div className="adminEyebrow">{t("MAKERS", "CREATORS")}</div><h1 className="adminTitle">{t("Artiesten", "Artists")}</h1><p className="adminMuted">{t("Iedere artiest heeft een permanent MOCIFY Artiest-ID en een duidelijk zichtbaar Artist Free-, Pro- of Max-abonnement.", "Every artist has a permanent MOCIFY Artist ID and a clearly visible Artist Free, Pro or Max plan.")}</p></div><button className="adminPrimaryBtn" onClick={() => alert(t("De databasekoppeling is actief. Het invoerformulier bouwen we als volgende stap.", "The database connection is active. The creation form is the next step."))}>+ {t("Artiest toevoegen", "Add artist")}</button></div>
    <div className="adminArtistSearch"><span>⌕</span><input value={q} onChange={e => setQ(e.target.value)} placeholder={t("Zoek Artiest-ID, naam, e-mail, abonnement, status of catalogus…", "Search Artist ID, name, email, plan, status or catalogue…")}/><select value={p} onChange={e => setP(e.target.value)}><option value="ALL">{t("Alle abonnementen", "All plans")}</option><option>Artist Free</option><option>Artist Pro</option><option>Artist Max</option></select><select value={v} onChange={e => setV(e.target.value)}><option value="ALL">{t("Alle verificaties", "All verification")}</option><option value="VERIFIED">{t("Geverifieerd", "Verified")}</option><option value="PENDING">{t("In afwachting", "Pending")}</option><option value="REJECTED">{t("Afgewezen", "Rejected")}</option></select></div>
    <div className="adminArtistCount">{loading ? t("Database laden…", "Loading database…") : error || `${shown.length} ${t("artiesten gevonden", "artists found")}`}</div>
    <div className="adminTableWrap adminArtistTable adminArtistScroll" style={{maxHeight:"560px",overflowY:"auto"}}><table className="adminTable"><thead><tr><th>{t("ARTIEST-ID","ARTIST ID")}</th><th>{t("ARTIEST","ARTIST")}</th><th>{t("ABONNEMENT","PLAN")}</th><th>{t("VERIFICATIE","VERIFICATION")}</th><th>{t("CATALOGUS","CATALOGUE")}</th><th>{t("TOTALE STREAMS","TOTAL STREAMS")}</th><th>STATUS</th><th></th></tr></thead><tbody>{shown.map(a => { const label = planLabel(a.plan); return <tr key={a.id}><td><strong>{a.id}</strong></td><td><Link className="adminArtistLink" href={`/admin/artists/${a.id}`}><strong>{a.name}</strong><small>{a.email}</small></Link></td><td><span className={`adminBadge ${planClass(label)}`}><strong>{label}</strong></span></td><td>{a.verification === "VERIFIED" ? t("Geverifieerd","Verified") : a.verification === "REJECTED" ? t("Afgewezen","Rejected") : t("In afwachting","Pending")}</td><td>{a.trackCount} {t("tracks","tracks")}</td><td><strong>{formatStreams(a.totalStreams)}</strong></td><td><span className="adminBadge">{a.status === "ACTIVE" ? t("Actief","Active") : a.status === "SUSPENDED" ? t("Geschorst","Suspended") : t("Gesloten","Closed")}</span></td><td><Link className="adminOpenBtn" href={`/admin/artists/${a.id}`}>{t("Account openen","Open account")} →</Link></td></tr>})}</tbody></table></div>
  </>;
}
