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

  const translations={
    en:{kicker:"MANAGE SUBSCRIPTION",title:"Your Artist plan",intro:"Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.",current:"Current plan",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade now",schedule:"Schedule downgrade",active:"ACTIVE",freeTo:"Choose your upgrade",proTo:"Upgrade to Artist Max",maxed:"You are on the highest plan.",freeText:"Artist Free can upgrade to Artist Pro or Artist Max.",proText:"Artist Pro can only upgrade to Artist Max.",maxText:"Artist Max has no higher upgrade.",downgradeText:"A downgrade changes nothing today. Your current features remain active until the end of the billing period.",effective:"Takes effect on",pending:"Scheduled change",cancel:"Cancel scheduled downgrade",back:"Back to Dashboard",immediateNote:"Prototype: payment will be connected later. For now the upgrade is applied immediately to this account.",downgradeFree:"Downgrade to Artist Free",downgradePro:"Downgrade to Artist Pro",month:"month"},
    nl:{kicker:"ABONNEMENT BEHEREN",title:"Jouw Artist-abonnement",intro:"Upgrades gaan direct in. Downgrades worden pas actief aan het einde van je huidige abonnementsperiode.",current:"Huidig abonnement",upgrade:"Upgraden",downgrade:"Downgraden",upgradeNow:"Direct upgraden",schedule:"Downgrade inplannen",active:"ACTIEF",freeTo:"Kies je upgrade",proTo:"Upgrade naar Artist Max",maxed:"Je gebruikt het hoogste abonnement.",freeText:"Artist Free kan upgraden naar Artist Pro of Artist Max.",proText:"Artist Pro kan alleen upgraden naar Artist Max.",maxText:"Artist Max heeft geen hogere upgrade.",downgradeText:"Een downgrade verandert vandaag niets. Je huidige functies blijven actief tot het einde van de abonnementsperiode.",effective:"Wordt actief op",pending:"Geplande wijziging",cancel:"Geplande downgrade annuleren",back:"Terug naar Dashboard",immediateNote:"Prototype: betaling wordt later gekoppeld. Voor nu wordt de upgrade direct op dit account toegepast.",downgradeFree:"Downgrade naar Artist Free",downgradePro:"Downgrade naar Artist Pro",month:"maand"},
    ro:{kicker:"GESTIONEAZĂ ABONAMENTUL",title:"Abonamentul tău Artist",intro:"Upgrade-urile se activează imediat. Downgrade-urile intră în vigoare la sfârșitul perioadei curente.",current:"Abonament curent",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade imediat",schedule:"Programează downgrade",active:"ACTIV",freeTo:"Alege upgrade-ul",proTo:"Upgrade la Artist Max",maxed:"Folosești cel mai înalt abonament.",freeText:"Artist Free poate trece la Artist Pro sau Artist Max.",proText:"Artist Pro poate trece doar la Artist Max.",maxText:"Artist Max nu are un upgrade superior.",downgradeText:"Un downgrade nu schimbă nimic astăzi. Funcțiile actuale rămân active până la sfârșitul perioadei.",effective:"Devine activ la",pending:"Schimbare programată",cancel:"Anulează downgrade-ul",back:"Înapoi la Dashboard",immediateNote:"Prototip: plata va fi conectată ulterior. Momentan upgrade-ul este aplicat imediat.",downgradeFree:"Downgrade la Artist Free",downgradePro:"Downgrade la Artist Pro",month:"lună"},
    de:{kicker:"ABONNEMENT VERWALTEN",title:"Dein Artist-Plan",intro:"Upgrades gelten sofort. Downgrades werden am Ende deiner aktuellen Abrechnungsperiode aktiv.",current:"Aktueller Plan",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Jetzt upgraden",schedule:"Downgrade planen",active:"AKTIV",freeTo:"Wähle dein Upgrade",proTo:"Upgrade auf Artist Max",maxed:"Du nutzt den höchsten Plan.",freeText:"Artist Free kann auf Artist Pro oder Artist Max upgraden.",proText:"Artist Pro kann nur auf Artist Max upgraden.",maxText:"Artist Max hat kein höheres Upgrade.",downgradeText:"Ein Downgrade ändert heute nichts. Deine aktuellen Funktionen bleiben bis zum Ende der Abrechnungsperiode aktiv.",effective:"Wird aktiv am",pending:"Geplante Änderung",cancel:"Geplantes Downgrade abbrechen",back:"Zurück zum Dashboard",immediateNote:"Prototyp: Zahlung wird später verbunden. Vorerst wird das Upgrade sofort auf dieses Konto angewendet.",downgradeFree:"Downgrade auf Artist Free",downgradePro:"Downgrade auf Artist Pro",month:"Monat"},
    fr:{kicker:"GÉRER L’ABONNEMENT",title:"Votre offre Artist",intro:"Les upgrades prennent effet immédiatement. Les downgrades prennent effet à la fin de la période de facturation actuelle.",current:"Offre actuelle",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade immédiat",schedule:"Planifier le downgrade",active:"ACTIF",freeTo:"Choisissez votre upgrade",proTo:"Passer à Artist Max",maxed:"Vous utilisez l’offre la plus élevée.",freeText:"Artist Free peut passer à Artist Pro ou Artist Max.",proText:"Artist Pro peut uniquement passer à Artist Max.",maxText:"Artist Max n’a pas d’upgrade supérieur.",downgradeText:"Un downgrade ne change rien aujourd’hui. Vos fonctions actuelles restent actives jusqu’à la fin de la période.",effective:"Prend effet le",pending:"Changement planifié",cancel:"Annuler le downgrade planifié",back:"Retour au Dashboard",immediateNote:"Prototype : le paiement sera connecté plus tard. Pour l’instant l’upgrade s’applique immédiatement.",downgradeFree:"Downgrade vers Artist Free",downgradePro:"Downgrade vers Artist Pro",month:"mois"},
    es:{kicker:"GESTIONAR SUSCRIPCIÓN",title:"Tu plan Artist",intro:"Las mejoras se aplican de inmediato. Los downgrades se aplican al final del periodo de facturación actual.",current:"Plan actual",upgrade:"Mejorar",downgrade:"Downgrade",upgradeNow:"Mejorar ahora",schedule:"Programar downgrade",active:"ACTIVO",freeTo:"Elige tu mejora",proTo:"Mejorar a Artist Max",maxed:"Ya tienes el plan más alto.",freeText:"Artist Free puede mejorar a Artist Pro o Artist Max.",proText:"Artist Pro solo puede mejorar a Artist Max.",maxText:"Artist Max no tiene una mejora superior.",downgradeText:"Un downgrade no cambia nada hoy. Tus funciones actuales siguen activas hasta el final del periodo.",effective:"Se activa el",pending:"Cambio programado",cancel:"Cancelar downgrade programado",back:"Volver al panel",immediateNote:"Prototipo: el pago se conectará más adelante. Por ahora la mejora se aplica inmediatamente.",downgradeFree:"Downgrade a Artist Free",downgradePro:"Downgrade a Artist Pro",month:"mes"},
    it:{kicker:"GESTISCI ABBONAMENTO",title:"Il tuo piano Artist",intro:"Gli upgrade hanno effetto immediato. I downgrade entrano in vigore alla fine del periodo di fatturazione.",current:"Piano attuale",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade ora",schedule:"Programma downgrade",active:"ATTIVO",freeTo:"Scegli il tuo upgrade",proTo:"Passa ad Artist Max",maxed:"Stai usando il piano più alto.",freeText:"Artist Free può passare ad Artist Pro o Artist Max.",proText:"Artist Pro può passare solo ad Artist Max.",maxText:"Artist Max non ha upgrade superiori.",downgradeText:"Un downgrade non cambia nulla oggi. Le funzioni attuali restano attive fino alla fine del periodo.",effective:"Attivo dal",pending:"Modifica programmata",cancel:"Annulla downgrade programmato",back:"Torna alla Dashboard",immediateNote:"Prototipo: il pagamento sarà collegato più avanti. Per ora l’upgrade viene applicato subito.",downgradeFree:"Downgrade ad Artist Free",downgradePro:"Downgrade ad Artist Pro",month:"mese"},
    pt:{kicker:"GERIR SUBSCRIÇÃO",title:"O teu plano Artist",intro:"Upgrades entram em vigor imediatamente. Downgrades entram em vigor no fim do período atual.",current:"Plano atual",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade agora",schedule:"Agendar downgrade",active:"ATIVO",freeTo:"Escolhe o upgrade",proTo:"Upgrade para Artist Max",maxed:"Estás no plano mais alto.",freeText:"Artist Free pode passar para Artist Pro ou Artist Max.",proText:"Artist Pro só pode passar para Artist Max.",maxText:"Artist Max não tem upgrade superior.",downgradeText:"Um downgrade não muda nada hoje. As funções atuais ficam ativas até ao fim do período.",effective:"Fica ativo em",pending:"Alteração agendada",cancel:"Cancelar downgrade agendado",back:"Voltar ao Dashboard",immediateNote:"Protótipo: o pagamento será ligado mais tarde. Por agora o upgrade é aplicado imediatamente.",downgradeFree:"Downgrade para Artist Free",downgradePro:"Downgrade para Artist Pro",month:"mês"},
    pl:{kicker:"ZARZĄDZAJ SUBSKRYPCJĄ",title:"Twój plan Artist",intro:"Upgrade działa natychmiast. Downgrade wchodzi w życie na końcu obecnego okresu rozliczeniowego.",current:"Obecny plan",upgrade:"Upgrade",downgrade:"Downgrade",upgradeNow:"Upgrade teraz",schedule:"Zaplanuj downgrade",active:"AKTYWNY",freeTo:"Wybierz upgrade",proTo:"Przejdź na Artist Max",maxed:"Masz najwyższy plan.",freeText:"Artist Free może przejść na Artist Pro lub Artist Max.",proText:"Artist Pro może przejść tylko na Artist Max.",maxText:"Artist Max nie ma wyższego upgrade.",downgradeText:"Downgrade nie zmienia nic dzisiaj. Obecne funkcje pozostają aktywne do końca okresu.",effective:"Aktywne od",pending:"Zaplanowana zmiana",cancel:"Anuluj zaplanowany downgrade",back:"Wróć do panelu",immediateNote:"Prototyp: płatność zostanie podłączona później. Na razie upgrade jest stosowany natychmiast.",downgradeFree:"Downgrade do Artist Free",downgradePro:"Downgrade do Artist Pro",month:"miesiąc"},
    tr:{kicker:"ABONELİĞİ YÖNET",title:"Artist planın",intro:"Yükseltmeler hemen geçerli olur. Downgrade mevcut fatura döneminin sonunda geçerli olur.",current:"Mevcut plan",upgrade:"Yükselt",downgrade:"Downgrade",upgradeNow:"Şimdi yükselt",schedule:"Downgrade planla",active:"AKTİF",freeTo:"Yükseltmeni seç",proTo:"Artist Max'e yükselt",maxed:"En yüksek plandasın.",freeText:"Artist Free, Artist Pro veya Artist Max'e yükselebilir.",proText:"Artist Pro yalnızca Artist Max'e yükselebilir.",maxText:"Artist Max'in daha yüksek planı yok.",downgradeText:"Downgrade bugün hiçbir şeyi değiştirmez. Mevcut özelliklerin dönem sonuna kadar aktif kalır.",effective:"Şu tarihte geçerli",pending:"Planlanmış değişiklik",cancel:"Planlanmış downgrade'ı iptal et",back:"Panele dön",immediateNote:"Prototip: ödeme daha sonra bağlanacak. Şimdilik yükseltme hesaba hemen uygulanır.",downgradeFree:"Artist Free'ye downgrade",downgradePro:"Artist Pro'ya downgrade",month:"ay"}
  } as const;
  const t=translations[locale]??translations.en;

  const refresh=()=>{const current=getStoredArtistPlan();setPlan(current);setPending(getPendingArtistPlan());setBillingEnd(current==="free"?0:getArtistBillingEnd())};

  useEffect(()=>{const session=readArtistSession();if(!session){router.replace("/for-artists/login?next=/for-artists/manage-plan");return}refresh();setReady(true)},[router]);

  const upgrades=useMemo<ArtistPlanTier[]>(()=>plan==="free"?["pro","max"]:plan==="pro"?["max"]:[],[plan]);
  const downgrades=useMemo<ArtistPlanTier[]>(()=>plan==="pro"?["free"]:plan==="max"?["pro","free"]:[],[plan]);
  const date=billingEnd?new Intl.DateTimeFormat(({en:"en-GB",nl:"nl-NL",ro:"ro-RO",de:"de-DE",fr:"fr-FR",es:"es-ES",it:"it-IT",pt:"pt-PT",pl:"pl-PL",tr:"tr-TR"} as const)[locale],{day:"numeric",month:"long",year:"numeric"}).format(new Date(billingEnd)):"—";

  const upgrade=(target:ArtistPlanTier)=>{changeArtistPlanImmediate(target);refresh()};
  const downgrade=(target:ArtistPlanTier)=>{scheduleArtistDowngrade(target);refresh()};
  const cancel=()=>{cancelArtistPendingPlan();refresh()};

  if(!ready)return null;
  return <ArtistPortalShell active="plans"><section className="artist-plan-manager"><div className="artist-plan-manager-wrap">
    <div className="artist-plan-manager-head"><p>{t.kicker}</p><h1>{t.title}</h1><span>{t.intro}</span><Link href="/dashboard">← {t.back}</Link></div>

    <section className="artist-current-plan">
      <div className={`artist-plan-emblem artist-plan-emblem-${plan}`}>{meta[plan].icon}</div>
      <div><small>{t.current}</small><h2>{meta[plan].name}</h2><p>{meta[plan].price}{plan!=="free"?` / ${t.month}`:""}</p></div>
      <span>{t.active}</span>
    </section>

    {pending&&<section className="artist-pending-plan"><div><small>{t.pending}</small><b>{meta[pending].icon} {meta[pending].name}</b><p>{t.effective}: {date}</p></div><button onClick={cancel}>{t.cancel}</button></section>}

    <div className={`artist-plan-manager-grid ${mode==="downgrade"?"focus-downgrade":mode==="upgrade"?"focus-upgrade":""}`}>
      <section className="artist-plan-change-card artist-upgrade-card">
        <small>{t.upgrade}</small>
        <h2>{plan==="free"?t.freeTo:plan==="pro"?t.proTo:t.maxed}</h2>
        <p>{plan==="free"?t.freeText:plan==="pro"?t.proText:t.maxText}</p>
        <div className="artist-plan-choice-list">
          {upgrades.map(target=><article key={target} className={`artist-plan-choice artist-plan-choice-${target}`}><div className={`artist-plan-emblem artist-plan-emblem-${target}`}>{meta[target].icon}</div><div><b>{meta[target].name}</b><span>{meta[target].price} / {t.month}</span></div><button onClick={()=>upgrade(target)}>{t.upgradeNow} →</button></article>)}
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
