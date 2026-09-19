"use client";

import {useEffect,useMemo,useState} from "react";
import {useListenerPlayer} from "../listener-player";
import {useLanguage} from "../i18n/language-provider";
import {countryCodes,getCountryChart,getRadioQueue,LISTENER_COUNTRY_KEY,localeCountry,type RadioChartSize} from "./radio-system";
import styles from "./radio.module.css";

const copy={
 en:{market:"LOCAL RADIO MARKET",title:"Radio by country",text:"Each country has its own chart, driven by streams from listeners in that country.",start:"Start country radio",now:"NOW PLAYING",chart:"Country charts",rank:"Rank",song:"Song",streams:"Country streams",trend:"28d",play:"Play",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Prototype ranking engine: every country is calculated separately. Production will use verified listener stream events from the backend.",available:"available catalog tracks shown",selected:"SELECTED RADIO COUNTRY"},
 nl:{market:"LOKALE RADIOMARKT",title:"Radio per land",text:"Elk land heeft een eigen hitlijst, bepaald door streams van luisteraars uit dat land.",start:"Start landradio",now:"NU OP DE RADIO",chart:"Hitlijsten per land",rank:"Positie",song:"Song",streams:"Streams in dit land",trend:"28d",play:"Speel",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Prototype-ranking: ieder land wordt afzonderlijk berekend. In productie gebruiken we geverifieerde stream-events uit de backend.",available:"beschikbare catalogustracks getoond",selected:"GESELECTEERD RADIOLAND"},
 ro:{market:"PIAȚĂ RADIO LOCALĂ",title:"Radio pe țări",text:"Fiecare țară are propriul clasament, determinat de redările ascultătorilor din acea țară.",start:"Pornește radio local",now:"ACUM LA RADIO",chart:"Clasamente pe țări",rank:"Poziție",song:"Piesă",streams:"Redări în țară",trend:"28z",play:"Redă",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Motor de clasament prototip: fiecare țară este calculată separat. În producție vom folosi evenimente de redare verificate din backend.",available:"piese disponibile din catalog",selected:"ȚARA RADIO SELECTATĂ"},
 de:{market:"LOKALER RADIOMARKT",title:"Radio nach Land",text:"Jedes Land hat eigene Charts, basierend auf Streams der Hörer in diesem Land.",start:"Länderradio starten",now:"JETZT IM RADIO",chart:"Charts nach Land",rank:"Platz",song:"Song",streams:"Streams im Land",trend:"28T",play:"Abspielen",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Prototyp-Ranking: Jedes Land wird separat berechnet. In Produktion verwenden wir verifizierte Stream-Events aus dem Backend.",available:"verfügbare Katalogtitel",selected:"AUSGEWÄHLTES RADIOLAND"},
 fr:{market:"MARCHÉ RADIO LOCAL",title:"Radio par pays",text:"Chaque pays possède son propre classement, déterminé par les écoutes des auditeurs de ce pays.",start:"Lancer la radio locale",now:"À LA RADIO",chart:"Classements par pays",rank:"Rang",song:"Titre",streams:"Écoutes du pays",trend:"28j",play:"Lire",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Classement prototype : chaque pays est calculé séparément. En production, les écoutes vérifiées du backend seront utilisées.",available:"titres disponibles du catalogue",selected:"PAYS RADIO SÉLECTIONNÉ"},
 es:{market:"MERCADO DE RADIO LOCAL",title:"Radio por país",text:"Cada país tiene su propia lista, determinada por los streams de sus oyentes.",start:"Iniciar radio del país",now:"SONANDO AHORA",chart:"Listas por país",rank:"Puesto",song:"Canción",streams:"Streams del país",trend:"28d",play:"Reproducir",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Ranking prototipo: cada país se calcula por separado. En producción se usarán eventos de streaming verificados del backend.",available:"pistas disponibles del catálogo",selected:"PAÍS DE RADIO SELECCIONADO"},
 it:{market:"MERCATO RADIO LOCALE",title:"Radio per paese",text:"Ogni paese ha una classifica propria, determinata dagli stream degli ascoltatori di quel paese.",start:"Avvia radio del paese",now:"ORA IN RADIO",chart:"Classifiche per paese",rank:"Posizione",song:"Brano",streams:"Stream nel paese",trend:"28g",play:"Riproduci",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Ranking prototipo: ogni paese viene calcolato separatamente. In produzione useremo eventi stream verificati dal backend.",available:"brani disponibili del catalogo",selected:"PAESE RADIO SELEZIONATO"},
 pt:{market:"MERCADO DE RÁDIO LOCAL",title:"Rádio por país",text:"Cada país tem o seu próprio ranking, determinado pelos streams dos ouvintes desse país.",start:"Iniciar rádio do país",now:"A TOCAR AGORA",chart:"Rankings por país",rank:"Posição",song:"Faixa",streams:"Streams no país",trend:"28d",play:"Reproduzir",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Ranking protótipo: cada país é calculado separadamente. Em produção serão usados eventos de stream verificados do backend.",available:"faixas disponíveis do catálogo",selected:"PAÍS DE RÁDIO SELECIONADO"},
 pl:{market:"LOKALNY RYNEK RADIA",title:"Radio według kraju",text:"Każdy kraj ma własny ranking tworzony na podstawie odtworzeń słuchaczy z tego kraju.",start:"Uruchom radio kraju",now:"TERAZ W RADIU",chart:"Rankingi krajowe",rank:"Pozycja",song:"Utwór",streams:"Odtworzenia w kraju",trend:"28d",play:"Odtwórz",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Ranking prototypowy: każdy kraj jest liczony osobno. W produkcji użyjemy zweryfikowanych zdarzeń stream z backendu.",available:"dostępne utwory katalogu",selected:"WYBRANY KRAJ RADIA"},
 tr:{market:"YEREL RADYO PAZARI",title:"Ülkeye göre radyo",text:"Her ülkenin, o ülkedeki dinleyici streamlerine göre oluşan kendi listesi vardır.",start:"Ülke radyosunu başlat",now:"ŞİMDİ RADYODA",chart:"Ülke listeleri",rank:"Sıra",song:"Şarkı",streams:"Ülke streamleri",trend:"28g",play:"Çal",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Prototip sıralama: her ülke ayrı hesaplanır. Üretimde backend'den doğrulanmış stream olayları kullanılacak.",available:"mevcut katalog parçaları",selected:"SEÇİLEN RADYO ÜLKESİ"},
 id:{market:"PASAR RADIO LOKAL",title:"Radio per negara",text:"Setiap negara memiliki chart sendiri berdasarkan stream pendengar di negara tersebut.",start:"Mulai radio negara",now:"SEDANG DIPUTAR",chart:"Chart per negara",rank:"Peringkat",song:"Lagu",streams:"Stream negara",trend:"28h",play:"Putar",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"Ranking prototipe: setiap negara dihitung terpisah. Produksi akan menggunakan event stream terverifikasi dari backend.",available:"track katalog tersedia",selected:"NEGARA RADIO TERPILIH"},
 ja:{market:"ローカルラジオ市場",title:"国別ラジオ",text:"各国のリスナーによる再生数をもとに、その国独自のチャートを作成します。",start:"国別ラジオを開始",now:"現在放送中",chart:"国別チャート",rank:"順位",song:"曲",streams:"国内再生数",trend:"28日",play:"再生",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"プロトタイプでは国ごとに個別計算。本番ではバックエンドの検証済み再生イベントを使用します。",available:"利用可能なカタログ曲",selected:"選択中のラジオ国"},
 ko:{market:"로컬 라디오 시장",title:"국가별 라디오",text:"각 국가는 해당 국가 리스너의 스트림 수에 따라 별도의 차트를 가집니다.",start:"국가 라디오 시작",now:"현재 재생 중",chart:"국가별 차트",rank:"순위",song:"곡",streams:"국가 스트림",trend:"28일",play:"재생",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"프로토타입 순위: 국가별로 별도 계산됩니다. 운영에서는 백엔드의 검증된 스트림 이벤트를 사용합니다.",available:"사용 가능한 카탈로그 트랙",selected:"선택한 라디오 국가"},
 hi:{market:"स्थानीय रेडियो बाज़ार",title:"देश के अनुसार रेडियो",text:"हर देश की अपनी चार्ट होती है, जो उस देश के श्रोताओं के स्ट्रीम पर आधारित है।",start:"देश का रेडियो शुरू करें",now:"अभी रेडियो पर",chart:"देशवार चार्ट",rank:"रैंक",song:"गीत",streams:"देश के स्ट्रीम",trend:"28 दिन",play:"चलाएँ",top40:"Top 40",top100:"Top 100",top1000:"Top 1000",note:"प्रोटोटाइप रैंकिंग: हर देश अलग गणना होता है। प्रोडक्शन में बैकएंड के सत्यापित स्ट्रीम इवेंट उपयोग होंगे।",available:"उपलब्ध कैटलॉग ट्रैक",selected:"चुना हुआ रेडियो देश"}
}as const;

export default function RadioClient(){
 const{locale}=useLanguage();const t=(copy as any)[locale]??copy.en;
 const[playerCountry,setPlayerCountry]=useState("US");
 const[size,setSize]=useState<RadioChartSize>(40);
 const[revision,setRevision]=useState(0);
 const{currentTrack,isPlaying,selectTrack,togglePlay}=useListenerPlayer();

 useEffect(()=>{let saved="";try{saved=localStorage.getItem(LISTENER_COUNTRY_KEY)||""}catch{}const next=saved||localeCountry[locale]||"US";setPlayerCountry(next);try{localStorage.setItem(LISTENER_COUNTRY_KEY,next)}catch{}},[locale]);
 useEffect(()=>{const refresh=()=>setRevision(v=>v+1);addEventListener("mocify-country-stream",refresh);return()=>removeEventListener("mocify-country-stream",refresh)},[]);

 const displayNames=useMemo(()=>{try{return new Intl.DisplayNames([locale],{type:"region"})}catch{return null}},[locale]);
 const countryName=(code:string)=>displayNames?.of(code)||code;
 const countryFlag=(code:string)=>code.toUpperCase().replace(/./g,char=>String.fromCodePoint(127397+char.charCodeAt(0)));
 const countries=useMemo(()=>countryCodes.map(code=>({code,name:countryName(code)})).sort((a,b)=>a.name.localeCompare(b.name,locale)),[displayNames,locale]);
 const chart=useMemo(()=>getCountryChart(playerCountry,size),[playerCountry,size,revision]);
 const radioQueue=useMemo(()=>getRadioQueue(playerCountry),[playerCountry,revision]);
 const radioIds=useMemo(()=>new Set(radioQueue.map(x=>x.id)),[radioQueue]);
 const currentBelongs=radioIds.has(currentTrack.id);

 const changeCountry=(country:string)=>{setPlayerCountry(country);try{localStorage.setItem(LISTENER_COUNTRY_KEY,country)}catch{}};
 const startRadio=()=>{if(!radioQueue.length)return;const first=radioQueue[0];if(currentTrack.id===first.id)togglePlay();else selectTrack(first,radioQueue,true)};
 const playEntry=(track:any)=>{if(currentTrack.id===track.id)togglePlay();else selectTrack(track,radioQueue,true)};

 return <div className={styles.radioShell}>
  <div className={`${styles.countryMasthead} ${styles["country_"+playerCountry.toLowerCase()]||""}`}><small>{t.selected}</small><div><span>{countryFlag(playerCountry)}</span><strong>{countryName(playerCountry)}</strong></div></div>
  <section className={styles.countryBar}>
   <div className={styles.countryCopy}><small>{t.market}</small><h2>{t.title}</h2><p>{t.text}</p></div>
   <select className={styles.countrySelect} value={playerCountry} onChange={e=>changeCountry(e.target.value)} aria-label={t.title}>{countries.map(c=><option key={c.code} value={c.code}>{countryFlag(c.code)} {c.name}</option>)}</select>
  </section>

  <div className={styles.radioActions}><button className={styles.startRadio} onClick={startRadio} disabled={!radioQueue.length}>{currentBelongs&&isPlaying?"Ⅱ":"▶"} {t.start} · {countryName(playerCountry)}</button><span className={styles.stationNote}>MOCIFY {countryName(playerCountry)} Radio</span></div>

  <div className={styles.nowPlaying}><div><strong>{currentTrack.title}</strong><span>{currentTrack.artist} · {currentTrack.genre}</span></div><em>{t.now}</em></div>

  <section className={styles.charts}>
   <header className={styles.chartHead}><div><small>MOCIFY {countryName(playerCountry)}</small><h2>{t.chart}</h2></div><div className={styles.tabs}>{([40,100,1000] as RadioChartSize[]).map(value=><button key={value} className={size===value?styles.active:""} onClick={()=>setSize(value)}>{value===40?t.top40:value===100?t.top100:t.top1000}</button>)}</div></header>
   <div className={styles.chartMeta}>Top {size} · {countryName(playerCountry)} · {chart.length} {t.available}</div>
   <div className={styles.scroll}><div className={styles.chartTable}>
    <div className={styles.chartHeader}><span>{t.rank}</span><span>{t.song}</span><span>{t.streams}</span><span>{t.trend}</span><span>{t.play}</span></div>
    {chart.map(({rank,track,streams,change})=>{const playable="audioSrc"in track&&typeof track.audioSrc==="string";const playing=currentTrack.id===track.id&&isPlaying;return <div className={styles.chartRow} key={track.id}><span className={styles.rank}>{rank}</span><div className={styles.trackCell}><span className={`${styles.cover} ${track.art}`}/><span className={styles.trackCopy}><b>{track.title}</b><small>{track.artist} · {track.genre}</small></span></div><span className={styles.streams}>{new Intl.NumberFormat(locale,{notation:"compact",maximumFractionDigits:1}).format(streams)}</span><span className={`${styles.trend} ${change>=0?styles.up:styles.down}`}>{change>=0?"↑":"↓"} {Math.abs(change).toFixed(1)}%</span><button className={`${styles.play} ${playing?styles.playing:""}`} disabled={!playable} onClick={()=>playEntry(track)} aria-label={`${t.play} ${track.title}`}>{playing?"Ⅱ":"▶"}</button></div>})}
   </div></div>
   <div className={styles.prototype}>{t.note}</div>
  </section>
 </div>;
}
