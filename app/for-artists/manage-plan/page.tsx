"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {ArtistPortalShell} from "../../artist-components";
import {useLanguage} from "../../i18n/language-provider";
import {
  cancelArtistPendingPlan,
  changeArtistPlanImmediate,
  getArtistBillingEnd,
  getPendingArtistPlan,
  getStoredArtistPlan,
  readArtistSession,
  scheduleArtistDowngrade,
  type ArtistPlanTier
} from "../../artist-access";

const meta={
  free:{name:"Artist Free",icon:"○",price:"€0",tone:"free"},
  pro:{name:"Artist Pro",icon:"◈",price:"€7.99",tone:"pro"},
  max:{name:"Artist Max",icon:"♛",price:"€19.99",tone:"max"}
}as const;

export default function ManagePlanPage(){
  const router=useRouter();
  const params=useSearchParams();
  const{locale}=useLanguage();
  const[plan,setPlan]=useState<ArtistPlanTier>("free");
  const[pending,setPending]=useState<ArtistPlanTier|null>(null);
  const[billingEnd,setBillingEnd]=useState(0);
  const[ready,setReady]=useState(false);
  const mode=params.get("mode");

  const t=locale==="nl"?{
    kicker:"ABONNEMENT BEHEREN",title:"Jouw Artist-abonnement",intro:"Upgrades gaan direct in. Downgrades worden pas actief aan het einde van je huidige abonnementsperiode.",
    current:"Huidig abonnement",upgrade:"Upgraden",downgrade:"Downgraden",upgradeNow:"Direct upgraden",schedule:"Downgrade inplannen",active:"ACTIEF",
    freeTo:"Kies je upgrade",proTo:"Upgrade naar Artist Max",maxed:"Je gebruikt het hoogste abonnement.",
    freeText:"Artist Free kan upgraden naar Artist Pro of Artist Max.",proText:"Artist Pro kan alleen upgraden naar Artist Max.",maxText:"Artist Max heeft geen hogere upgrade.",
    downgradeText:"Een downgrade verandert vandaag niets. Je huidige functies blijven actief tot het einde van de abonnementsperiode.",
    effective:"Wordt actief op",pending:"Geplande wijziging",cancel:"Geplande downgrade annuleren",back:"Terug naar Dashboard",
    immediateNote:"Prototype: betaling wordt later gekoppeld. Voor nu wordt de upgrade direct op dit account toegepast.",
    downgradeFree:"Downgrade naar Artist Free",downgradePro:"Downgrade naar Artist Pro"
  }:locale==="ro"?{
    kicker:"GESTIONEAZĂ ABONAMENTUL",title:"Abonamentul tău Artist",intro:"Upgrade-urile se activează imediat. Downgrade-urile intră în vigoare la sfârșitul perioadei curente.",
    current:"Abonament curent",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade imediat",schedule:"Programează downgrade",active:"ACTIV",
    freeTo:"Alege upgrade-ul",proTo:"Upgrade la Artist Max",maxed:"Folosești cel mai înalt abonament.",
    freeText:"Artist Free poate trece la Artist Pro sau Artist Max.",proText:"Artist Pro poate trece doar la Artist Max.",maxText:"Artist Max nu are un upgrade superior.",
    downgradeText:"Un downgrade nu schimbă nimic astăzi. Funcțiile actuale rămân active până la sfârșitul perioadei.",
    effective:"Devine activ la",pending:"Schimbare programată",cancel:"Anulează downgrade-ul",back:"Înapoi la Dashboard",
    immediateNote:"Prototip: plata va fi conectată ulterior. Momentan upgrade-ul este aplicat imediat.",
    downgradeFree:"Downgrade la Artist Free",downgradePro:"Downgrade la Artist Pro"
  }:{
    kicker:"MANAGE SUBSCRIPTION",title:"Your Artist plan",intro:"Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.",
    current:"Current plan",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade now",schedule:"Schedule downgrade",active:"ACTIVE",
    freeTo:"Choose your upgrade",proTo:"Upgrade to Artist Max",maxed:"You are on the highest plan.",
    freeText:"Artist Free can upgrade to Artist Pro or Artist Max.",proText:"Artist Pro can only upgrade to Artist Max.",maxText:"Artist Max has no higher upgrade.",
    downgradeText:"A downgrade changes nothing today. Your current features remain active until the end of the billing period.",
    effective:"Takes effect on",pending:"Scheduled change",cancel:"Cancel scheduled downgrade",back:"Back to Dashboard",
    immediateNote:"Prototype: payment will be connected later. For now the upgrade is applied immediately to this account.",
    downgradeFree:"Downgrade to Artist Free",downgradePro:"Downgrade to Artist Pro"
  };

  const refresh=()=>{const current=getStoredArtistPlan();setPlan(current);setPending(getPendingArtistPlan());setBillingEnd(current==="free"?0:getArtistBillingEnd())};

  useEffect(()=>{const session=readArtistSession();if(!session){router.replace("/for-artists/login?next=/for-artists/manage-plan");return}refresh();setReady(true)},[router]);

  const upgrades=useMemo<ArtistPlanTier[]>(()=>plan==="free"?["pro","max"]:plan==="pro"?["max"]:[],[plan]);
  const downgrades=useMemo<ArtistPlanTier[]>(()=>plan==="pro"?["free"]:plan==="max"?["pro","free"]:[],[plan]);
  const date=billingEnd?new Intl.DateTimeFormat(locale==="nl"?"nl-NL":locale==="ro"?"ro-RO":"en-GB",{day:"numeric",month:"long",year:"numeric"}).format(new Date(billingEnd)):"—";

  const upgrade=(target:ArtistPlanTier)=>{changeArtistPlanImmediate(target);refresh()};
  const downgrade=(target:ArtistPlanTier)=>{scheduleArtistDowngrade(target);refresh()};
  const cancel=()=>{cancelArtistPendingPlan();refresh()};

  if(!ready)return null;
  return <ArtistPortalShell active="plans"><section className="artist-plan-manager"><div className="artist-plan-manager-wrap">
    <div className="artist-plan-manager-head"><p>{t.kicker}</p><h1>{t.title}</h1><span>{t.intro}</span><Link href="/dashboard">← {t.back}</Link></div>

    <section className="artist-current-plan">
      <div className={`artist-plan-emblem artist-plan-emblem-${plan}`}>{meta[plan].icon}</div>
      <div><small>{t.current}</small><h2>{meta[plan].name}</h2><p>{meta[plan].price}{plan!=="free"?" / month":""}</p></div>
      <span>{t.active}</span>
    </section>

    {pending&&<section className="artist-pending-plan"><div><small>{t.pending}</small><b>{meta[pending].icon} {meta[pending].name}</b><p>{t.effective}: {date}</p></div><button onClick={cancel}>{t.cancel}</button></section>}

    <div className={`artist-plan-manager-grid ${mode==="downgrade"?"focus-downgrade":mode==="upgrade"?"focus-upgrade":""}`}>
      <section className="artist-plan-change-card artist-upgrade-card">
        <small>{t.upgrade}</small>
        <h2>{plan==="free"?t.freeTo:plan==="pro"?t.proTo:t.maxed}</h2>
        <p>{plan==="free"?t.freeText:plan==="pro"?t.proText:t.maxText}</p>
        <div className="artist-plan-choice-list">
          {upgrades.map(target=><article key={target} className={`artist-plan-choice artist-plan-choice-${target}`}><div className={`artist-plan-emblem artist-plan-emblem-${target}`}>{meta[target].icon}</div><div><b>{meta[target].name}</b><span>{meta[target].price} / month</span></div><button onClick={()=>upgrade(target)}>{t.upgradeNow} →</button></article>)}
          {!upgrades.length&&<div className="artist-plan-empty">♛ Artist Max</div>}
        </div>
        {!!upgrades.length&&<em>{t.immediateNote}</em>}
      </section>

      {plan!=="free"&&<section className="artist-plan-change-card artist-downgrade-card">
        <small>{t.downgrade}</small>
        <h2>{t.downgrade}</h2>
        <p>{t.downgradeText}</p>
        <div className="artist-plan-choice-list">
          {downgrades.map(target=><article key={target} className={`artist-plan-choice artist-plan-choice-${target}`}><div className={`artist-plan-emblem artist-plan-emblem-${target}`}>{meta[target].icon}</div><div><b>{target==="free"?t.downgradeFree:t.downgradePro}</b><span>{t.effective}: {date}</span></div><button disabled={pending===target} onClick={()=>downgrade(target)}>{pending===target?t.pending:t.schedule} →</button></article>)}
        </div>
      </section>}
    </div>
  </div></section></ArtistPortalShell>
}
