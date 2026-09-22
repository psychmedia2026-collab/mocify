"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "./i18n/language-provider";
import {getActiveArtist} from "./artist-access";
import {releases} from "./data";
import{hydratedPublishedReleases}from"./listener-account";

type ArtistTrack={id:string;title:string;artist:string;genre:string;art:string;href?:string;audioSrc:string};
type RepeatMode="off"|"queue"|"track";
const BAR_COUNT=180;
const playerCopy={
en:{empty:"No music yet",expand:"Expand player",minimize:"Minimize player",remove:"Remove favorite",add:"Add favorite",more:"More options",favorite:"Favorite track",open:"Open track",copy:"Copy track link",shuffle:"Shuffle",previous:"Previous track",pause:"Pause",play:"Play",next:"Next track",repeatTrack:"Repeat track",repeatQueue:"Repeat queue",repeatOff:"Repeat off",unmute:"Unmute",mute:"Mute",volume:"Volume",device:"Connect playback device",queue:"Queue",seek:"Seek through track",playback:"ARTIST PLAYBACK"},
nl:{empty:"Nog geen muziek",expand:"Player uitklappen",minimize:"Player minimaliseren",remove:"Favoriet verwijderen",add:"Favoriet toevoegen",more:"Meer opties",favorite:"Favoriete track",open:"Track openen",copy:"Tracklink kopiëren",shuffle:"Shuffle",previous:"Vorige track",pause:"Pauzeren",play:"Afspelen",next:"Volgende track",repeatTrack:"Track herhalen",repeatQueue:"Wachtrij herhalen",repeatOff:"Herhalen uit",unmute:"Geluid aan",mute:"Dempen",volume:"Volume",device:"Afspeelapparaat verbinden",queue:"Wachtrij",seek:"Door track zoeken",playback:"ARTIESTENPLAYER"},
ro:{empty:"Încă nu există muzică",expand:"Extinde playerul",minimize:"Minimizează playerul",remove:"Elimină din favorite",add:"Adaugă la favorite",more:"Mai multe opțiuni",favorite:"Piesă favorită",open:"Deschide piesa",copy:"Copiază linkul piesei",shuffle:"Redare aleatorie",previous:"Piesa anterioară",pause:"Pauză",play:"Redă",next:"Piesa următoare",repeatTrack:"Repetă piesa",repeatQueue:"Repetă coada",repeatOff:"Repetare oprită",unmute:"Activează sunetul",mute:"Dezactivează sunetul",volume:"Volum",device:"Conectează dispozitivul",queue:"Coadă",seek:"Navighează în piesă",playback:"PLAYER ARTIST"},
de:{empty:"Noch keine Musik",expand:"Player erweitern",minimize:"Player minimieren",remove:"Favorit entfernen",add:"Zu Favoriten",more:"Weitere Optionen",favorite:"Favorit",open:"Titel öffnen",copy:"Titellink kopieren",shuffle:"Zufallswiedergabe",previous:"Vorheriger Titel",pause:"Pause",play:"Abspielen",next:"Nächster Titel",repeatTrack:"Titel wiederholen",repeatQueue:"Warteschlange wiederholen",repeatOff:"Wiederholen aus",unmute:"Ton an",mute:"Stumm",volume:"Lautstärke",device:"Wiedergabegerät verbinden",queue:"Warteschlange",seek:"Im Titel suchen",playback:"KÜNSTLER-PLAYER"},
fr:{empty:"Aucune musique",expand:"Agrandir le lecteur",minimize:"Réduire le lecteur",remove:"Retirer des favoris",add:"Ajouter aux favoris",more:"Plus d’options",favorite:"Titre favori",open:"Ouvrir le titre",copy:"Copier le lien",shuffle:"Lecture aléatoire",previous:"Titre précédent",pause:"Pause",play:"Lire",next:"Titre suivant",repeatTrack:"Répéter le titre",repeatQueue:"Répéter la file",repeatOff:"Répétition désactivée",unmute:"Activer le son",mute:"Couper le son",volume:"Volume",device:"Connecter un appareil",queue:"File d’attente",seek:"Parcourir le titre",playback:"LECTEUR ARTISTE"},
es:{empty:"Aún no hay música",expand:"Expandir reproductor",minimize:"Minimizar reproductor",remove:"Quitar de favoritos",add:"Añadir a favoritos",more:"Más opciones",favorite:"Pista favorita",open:"Abrir pista",copy:"Copiar enlace",shuffle:"Aleatorio",previous:"Pista anterior",pause:"Pausa",play:"Reproducir",next:"Pista siguiente",repeatTrack:"Repetir pista",repeatQueue:"Repetir cola",repeatOff:"Repetición desactivada",unmute:"Activar sonido",mute:"Silenciar",volume:"Volumen",device:"Conectar dispositivo",queue:"Cola",seek:"Buscar en la pista",playback:"REPRODUCTOR DE ARTISTA"},
it:{empty:"Ancora nessuna musica",expand:"Espandi lettore",minimize:"Riduci lettore",remove:"Rimuovi dai preferiti",add:"Aggiungi ai preferiti",more:"Altre opzioni",favorite:"Brano preferito",open:"Apri brano",copy:"Copia link",shuffle:"Casuale",previous:"Brano precedente",pause:"Pausa",play:"Riproduci",next:"Brano successivo",repeatTrack:"Ripeti brano",repeatQueue:"Ripeti coda",repeatOff:"Ripetizione disattivata",unmute:"Attiva audio",mute:"Silenzia",volume:"Volume",device:"Collega dispositivo",queue:"Coda",seek:"Cerca nel brano",playback:"PLAYER ARTISTA"},
pt:{empty:"Ainda não há música",expand:"Expandir leitor",minimize:"Minimizar leitor",remove:"Remover dos favoritos",add:"Adicionar aos favoritos",more:"Mais opções",favorite:"Faixa favorita",open:"Abrir faixa",copy:"Copiar ligação",shuffle:"Aleatório",previous:"Faixa anterior",pause:"Pausa",play:"Reproduzir",next:"Faixa seguinte",repeatTrack:"Repetir faixa",repeatQueue:"Repetir fila",repeatOff:"Repetição desligada",unmute:"Ativar som",mute:"Silenciar",volume:"Volume",device:"Ligar dispositivo",queue:"Fila",seek:"Procurar na faixa",playback:"LEITOR DE ARTISTA"},
pl:{empty:"Brak muzyki",expand:"Rozwiń odtwarzacz",minimize:"Zminimalizuj odtwarzacz",remove:"Usuń z ulubionych",add:"Dodaj do ulubionych",more:"Więcej opcji",favorite:"Ulubiony utwór",open:"Otwórz utwór",copy:"Kopiuj link",shuffle:"Losowo",previous:"Poprzedni utwór",pause:"Pauza",play:"Odtwórz",next:"Następny utwór",repeatTrack:"Powtarzaj utwór",repeatQueue:"Powtarzaj kolejkę",repeatOff:"Powtarzanie wyłączone",unmute:"Włącz dźwięk",mute:"Wycisz",volume:"Głośność",device:"Połącz urządzenie",queue:"Kolejka",seek:"Przewiń utwór",playback:"ODTWARZACZ ARTYSTY"},
tr:{empty:"Henüz müzik yok",expand:"Oynatıcıyı genişlet",minimize:"Oynatıcıyı küçült",remove:"Favorilerden çıkar",add:"Favorilere ekle",more:"Daha fazla seçenek",favorite:"Favori parça",open:"Parçayı aç",copy:"Parça bağlantısını kopyala",shuffle:"Karışık çal",previous:"Önceki parça",pause:"Duraklat",play:"Çal",next:"Sonraki parça",repeatTrack:"Parçayı tekrarla",repeatQueue:"Sırayı tekrarla",repeatOff:"Tekrar kapalı",unmute:"Sesi aç",mute:"Sessize al",volume:"Ses",device:"Oynatma cihazı bağla",queue:"Sıra",seek:"Parçada gezin",playback:"SANATÇI OYNATICI"},
id:{empty:"Belum ada musik",expand:"Perbesar pemutar",minimize:"Perkecil pemutar",remove:"Hapus dari favorit",add:"Tambahkan ke favorit",more:"Opsi lainnya",favorite:"Track favorit",open:"Buka track",copy:"Salin tautan track",shuffle:"Acak",previous:"Track sebelumnya",pause:"Jeda",play:"Putar",next:"Track berikutnya",repeatTrack:"Ulangi track",repeatQueue:"Ulangi antrean",repeatOff:"Ulangi mati",unmute:"Aktifkan suara",mute:"Bisukan",volume:"Volume",device:"Hubungkan perangkat",queue:"Antrean",seek:"Telusuri track",playback:"PEMUTAR ARTIS"},
ja:{empty:"まだ音楽がありません",expand:"プレーヤーを展開",minimize:"プレーヤーを最小化",remove:"お気に入りから削除",add:"お気に入りに追加",more:"その他のオプション",favorite:"お気に入りの曲",open:"曲を開く",copy:"曲のリンクをコピー",shuffle:"シャッフル",previous:"前の曲",pause:"一時停止",play:"再生",next:"次の曲",repeatTrack:"曲をリピート",repeatQueue:"キューをリピート",repeatOff:"リピートオフ",unmute:"ミュート解除",mute:"ミュート",volume:"音量",device:"再生デバイスを接続",queue:"キュー",seek:"曲内を移動",playback:"アーティストプレーヤー"},
ko:{empty:"아직 음악이 없습니다",expand:"플레이어 펼치기",minimize:"플레이어 최소화",remove:"즐겨찾기에서 삭제",add:"즐겨찾기에 추가",more:"더 많은 옵션",favorite:"즐겨찾는 트랙",open:"트랙 열기",copy:"트랙 링크 복사",shuffle:"셔플",previous:"이전 트랙",pause:"일시정지",play:"재생",next:"다음 트랙",repeatTrack:"트랙 반복",repeatQueue:"대기열 반복",repeatOff:"반복 끄기",unmute:"음소거 해제",mute:"음소거",volume:"볼륨",device:"재생 장치 연결",queue:"대기열",seek:"트랙 탐색",playback:"아티스트 플레이어"},
hi:{empty:"अभी कोई संगीत नहीं",expand:"प्लेयर फैलाएँ",minimize:"प्लेयर छोटा करें",remove:"पसंदीदा से हटाएँ",add:"पसंदीदा में जोड़ें",more:"और विकल्प",favorite:"पसंदीदा ट्रैक",open:"ट्रैक खोलें",copy:"ट्रैक लिंक कॉपी करें",shuffle:"शफल",previous:"पिछला ट्रैक",pause:"रोकें",play:"चलाएँ",next:"अगला ट्रैक",repeatTrack:"ट्रैक दोहराएँ",repeatQueue:"क्यू दोहराएँ",repeatOff:"रिपीट बंद",unmute:"आवाज़ चालू करें",mute:"म्यूट",volume:"वॉल्यूम",device:"प्लेबैक डिवाइस जोड़ें",queue:"क्यू",seek:"ट्रैक में जाएँ",playback:"आर्टिस्ट प्लेयर"}
} as const;

function Icon({name}:{name:"heart"|"more"|"shuffle"|"prev"|"next"|"repeat"|"volume"|"cast"|"queue"|"play"|"pause"}){
 const common={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.9,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,"aria-hidden":true};
 if(name==="heart")return <svg {...common}><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>;
 if(name==="more")return <svg {...common}><circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none"/></svg>;
 if(name==="shuffle")return <svg {...common}><path d="M3 7h3.5c2.2 0 3.3 1.2 4.3 2.8l2.4 4.1c1 1.6 2.1 3.1 4.3 3.1H21"/><path d="m18 14 3 3-3 3"/><path d="M3 17h3.5c1.7 0 2.8-.7 3.7-1.9"/><path d="M14.2 8.9c.9-1.2 1.9-1.9 3.3-1.9H21"/><path d="m18 4 3 3-3 3"/></svg>;
 if(name==="prev")return <svg {...common}><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z" fill="currentColor" stroke="none"/></svg>;
 if(name==="next")return <svg {...common}><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/></svg>;
 if(name==="repeat")return <svg {...common}><path d="M17 2.8 20.2 6 17 9.2"/><path d="M3.8 10V8.5A2.5 2.5 0 0 1 6.3 6h13.3"/><path d="m7 21.2-3.2-3.2L7 14.8"/><path d="M20.2 14v1.5a2.5 2.5 0 0 1-2.5 2.5H4.4"/></svg>;
 if(name==="volume")return <svg {...common}><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9.2a4 4 0 0 1 0 5.6"/></svg>;
 if(name==="cast")return <svg {...common}><path d="M4 18a2 2 0 0 1 2 2"/><path d="M4 14a6 6 0 0 1 6 6"/><path d="M4 10a10 10 0 0 1 10 10"/><path d="M8 5h9a3 3 0 0 1 3 3v8"/></svg>;
 if(name==="queue")return <svg {...common}><path d="M10 7h10M10 12h10M10 17h10"/><circle cx="5" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
 if(name==="pause")return <svg {...common} width="22" height="22"><path d="M9 6v12M15 6v12" strokeWidth="2.6"/></svg>;
 return <svg {...common} width="22" height="22"><path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/></svg>;
}

function fmt(seconds:number){if(!Number.isFinite(seconds)||seconds<0)return"0:00";const m=Math.floor(seconds/60),s=Math.floor(seconds%60).toString().padStart(2,"0");return `${m}:${s}`}

function staticArtistTracks(artistName:string):ArtistTrack[]{
 return releases.flatMap(track=>{
  if(track.artist!==artistName||!("audioSrc" in track)||typeof track.audioSrc!=="string")return[];
  return [{id:track.id,title:track.title,artist:track.artist,genre:track.genre,art:track.art,href:"href" in track?track.href:undefined,audioSrc:track.audioSrc}];
 });
}

export default function ArtistPlayer(){
 const {locale}=useLanguage();const t=(playerCopy as any)[locale]??playerCopy.en;
 const [artistName,setArtistName]=useState("Andigo");
 const [queue,setQueue]=useState<ArtistTrack[]>([]);
 const [index,setIndex]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [currentTime,setCurrentTime]=useState(0);
 const [duration,setDuration]=useState(0);
 const [volume,setVolumeState]=useState(1);
 const [shuffle,setShuffle]=useState(false);
 const [repeat,setRepeat]=useState<RepeatMode>("off");
 const [queueOpen,setQueueOpen]=useState(false);
 const [moreOpen,setMoreOpen]=useState(false);
 const [minimized,setMinimized]=useState(false);
 const [favoriteIds,setFavoriteIds]=useState<string[]>([]);
 const [spectrum,setSpectrum]=useState<number[]>(()=>Array.from({length:BAR_COUNT},()=>0));
 const audioRef=useRef<HTMLAudioElement|null>(null);
 const audioContextRef=useRef<AudioContext|null>(null);
 const analyserRef=useRef<AnalyserNode|null>(null);
 const spectrumRef=useRef<Uint8Array<ArrayBuffer>|null>(null);
 const gainRef=useRef<GainNode|null>(null);
 const lastVolume=useRef(1);
 const queueRef=useRef<ArtistTrack[]>([]);
 const indexRef=useRef(0);
 const repeatRef=useRef<RepeatMode>("off");
 const shuffleRef=useRef(false);

 const track=queue[index]??({id:"artist-empty",title:t.empty,artist:artistName,genre:"",art:"",audioSrc:""} as ArtistTrack);
 const hasTrack=Boolean(track.audioSrc);
 const progress=duration>0?Math.min(100,currentTime/duration*100):0;
 const favorite=Boolean(hasTrack&&favoriteIds.includes(track.id));

 const loadArtist=()=>{const active=getActiveArtist();const name=active?.name??"Andigo";setArtistName(name);void hydratedPublishedReleases().then(p=>{const own=[...p,...releases].filter(r=>r.artist.toLowerCase()===name.toLowerCase()&&Boolean(r.audioSrc)).map(r=>({...r,audioSrc:r.audioSrc!}));setQueue(own);queueRef.current=own;setIndex(0);indexRef.current=0;setCurrentTime(0);setDuration(0);setPlaying(false);if(audioRef.current){audioRef.current.pause();audioRef.current.src=own[0]?.audioSrc??"";if(own[0])audioRef.current.load()}})};

 useEffect(()=>{loadArtist();const sync=()=>loadArtist();addEventListener("mocify-active-artist-change",sync);addEventListener("mocify-library-change",sync);return()=>{removeEventListener("mocify-active-artist-change",sync);removeEventListener("mocify-library-change",sync)}},[]);
 useEffect(()=>{queueRef.current=queue},[queue]);useEffect(()=>{indexRef.current=index},[index]);useEffect(()=>{repeatRef.current=repeat},[repeat]);useEffect(()=>{shuffleRef.current=shuffle},[shuffle]);
 useEffect(()=>{try{const raw=localStorage.getItem("mocify-artist-favorite-track-ids");const parsed=raw?JSON.parse(raw):[];if(Array.isArray(parsed))setFavoriteIds(parsed.filter((x):x is string=>typeof x==="string"))}catch{}},[]);
 useEffect(()=>{try{setMinimized(localStorage.getItem("mocify-artist-player-minimized")==="1");const saved=Number(localStorage.getItem("mocify-artist-player-volume"));if(Number.isFinite(saved)&&saved>=0&&saved<=1){setVolumeState(saved);lastVolume.current=saved||.8}}catch{}},[]);
 const setMinimizedPersist=(value:boolean)=>{setMinimized(value);try{localStorage.setItem("mocify-artist-player-minimized",value?"1":"0")}catch{}};

 useEffect(()=>{
  const audio=new Audio();audio.preload="metadata";audio.volume=1;audioRef.current=audio;
  const loaded=()=>setDuration(Number.isFinite(audio.duration)?audio.duration:0);
  const time=()=>setCurrentTime(audio.currentTime);
  const play=()=>setPlaying(true),pause=()=>setPlaying(false);
  const ended=()=>{
   if(repeatRef.current==="track"){audio.currentTime=0;void audio.play();return}
   const q=queueRef.current;if(!q.length)return;
   const i=indexRef.current;
   if(repeatRef.current==="off"&&!shuffleRef.current&&i===q.length-1){setPlaying(false);return}
   const choices=q.map((_,n)=>n).filter(n=>n!==i);
   const next=shuffleRef.current&&choices.length?choices[Math.floor(Math.random()*choices.length)]:(i+1)%q.length;
   indexRef.current=next;setIndex(next);setCurrentTime(0);setDuration(0);audio.src=q[next].audioSrc;void audio.play();
  };
  audio.addEventListener("loadedmetadata",loaded);audio.addEventListener("timeupdate",time);audio.addEventListener("play",play);audio.addEventListener("pause",pause);audio.addEventListener("ended",ended);
  return()=>{audio.pause();void audioContextRef.current?.close();audio.removeEventListener("loadedmetadata",loaded);audio.removeEventListener("timeupdate",time);audio.removeEventListener("play",play);audio.removeEventListener("pause",pause);audio.removeEventListener("ended",ended)};
 },[]);

 const ensureAnalysis=()=>{const audio=audioRef.current;if(!audio)return;try{if(!audioContextRef.current){const ctx=new AudioContext(),an=ctx.createAnalyser(),gain=ctx.createGain();an.fftSize=512;an.smoothingTimeConstant=.72;gain.gain.value=volume;const source=ctx.createMediaElementSource(audio);source.connect(an);an.connect(gain);gain.connect(ctx.destination);audio.volume=1;audioContextRef.current=ctx;analyserRef.current=an;gainRef.current=gain;spectrumRef.current=new Uint8Array(an.frequencyBinCount)}if(audioContextRef.current.state==="suspended")void audioContextRef.current.resume()}catch{}};

 useEffect(()=>{let frame=0;const tick=()=>{if(playing&&analyserRef.current&&spectrumRef.current){const data=spectrumRef.current;analyserRef.current.getByteFrequencyData(data);const useful=Math.max(1,Math.floor(data.length*.72));setSpectrum(Array.from({length:BAR_COUNT},(_,bar)=>{const start=Math.floor(bar/BAR_COUNT*useful),end=Math.max(start+1,Math.floor((bar+1)/BAR_COUNT*useful));let total=0;for(let i=start;i<end;i++)total+=data[i];return Math.min(1,total/(end-start)/185)}))}frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[playing]);

 const select=(next:number,autoplay=playing)=>{const t=queue[next],audio=audioRef.current;if(!t||!audio)return;audio.pause();indexRef.current=next;setIndex(next);setCurrentTime(0);setDuration(0);audio.src=t.audioSrc;audio.load();if(autoplay){ensureAnalysis();void audio.play()}};
 const togglePlay=()=>{if(!hasTrack||!audioRef.current)return;const audio=audioRef.current;if(audio.src!==new URL(track.audioSrc,window.location.origin).toString()){audio.src=track.audioSrc;audio.load()}if(audio.paused){ensureAnalysis();void audio.play()}else audio.pause()};
 const prev=()=>{const audio=audioRef.current;if(audio&&audio.currentTime>3){audio.currentTime=0;setCurrentTime(0);return}if(queue.length<2)return;select((index-1+queue.length)%queue.length)};
 const next=()=>{if(queue.length<2)return;const choices=queue.map((_,i)=>i).filter(i=>i!==index);select(shuffle&&choices.length?choices[Math.floor(Math.random()*choices.length)]:(index+1)%queue.length)};
 const seekFrom=(event:React.PointerEvent<HTMLDivElement>)=>{if(!audioRef.current||!duration)return;const rect=event.currentTarget.getBoundingClientRect(),ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));audioRef.current.currentTime=ratio*duration;setCurrentTime(ratio*duration)}; const seekTo=(value:number)=>{if(!audioRef.current||!duration)return;const next=Math.max(0,Math.min(duration,value));audioRef.current.currentTime=next;setCurrentTime(next)}; const seekKey=(event:React.KeyboardEvent<HTMLDivElement>)=>{if(!duration)return;if(event.key==="ArrowLeft"){event.preventDefault();seekTo(currentTime-5)}else if(event.key==="ArrowRight"){event.preventDefault();seekTo(currentTime+5)}else if(event.key==="Home"){event.preventDefault();seekTo(0)}else if(event.key==="End"){event.preventDefault();seekTo(duration)}};
 const setVolume=(value:number)=>{const next=Math.min(1,Math.max(0,value));if(next>0)lastVolume.current=next;setVolumeState(next);if(gainRef.current&&audioContextRef.current)gainRef.current.gain.setTargetAtTime(next,audioContextRef.current.currentTime,.015);else if(audioRef.current)audioRef.current.volume=next;try{localStorage.setItem("mocify-artist-player-volume",String(next))}catch{}};
 const toggleMute=()=>setVolume(volume>0?0:(lastVolume.current||.8));
 const cycleRepeat=()=>setRepeat(r=>r==="off"?"queue":r==="queue"?"track":"off");
 const toggleFavorite=()=>{if(!hasTrack)return;const ids=favorite?favoriteIds.filter(id=>id!==track.id):[...favoriteIds,track.id];setFavoriteIds(ids);try{localStorage.setItem("mocify-artist-favorite-track-ids",JSON.stringify(ids))}catch{}};
 const copyLink=async()=>{if(!hasTrack)return;const href=track.href??`/explore#${track.id}`;try{await navigator.clipboard.writeText(new URL(href,window.location.origin).toString())}catch{}setMoreOpen(false)};
 const requestDevice=()=>{const audio=audioRef.current as (HTMLAudioElement&{webkitShowPlaybackTargetPicker?:()=>void;remote?:{prompt?:()=>Promise<void>}})|null;if(!audio)return;if(typeof audio.webkitShowPlaybackTargetPicker==="function"){audio.webkitShowPlaybackTargetPicker();return}if(typeof audio.remote?.prompt==="function")void audio.remote.prompt()};

 const envelope=(i:number)=>Math.min(1,.18+.34*Math.abs(Math.sin(i*.29+.7))+.22*Math.abs(Math.sin(i*.071+1.3))+.12*Math.abs(Math.sin(i*.83)));

 return <section className={minimized?"artist-m-player minimized":"artist-m-player"} aria-label={`${artistName} · ${t.playback}`}>
  <div className="artist-m-player-inner">
  <button type="button" className="artist-m-minimize" onClick={()=>setMinimizedPersist(!minimized)} aria-label={minimized?t.expand:t.minimize} title={minimized?t.expand:t.minimize}>{minimized?"↗":"—"}</button>
   <div className="artist-m-player-top">
    <div className="artist-m-track-area">
     <Link className="artist-m-track" href={track.href??"/studio/music"}><span className={`artist-m-cover ${track.art}`} aria-hidden="true"/><span><b>{track.title}</b><small>{track.artist}</small></span></Link>
     <button type="button" className={favorite?"artist-m-save active":"artist-m-save"} onClick={toggleFavorite} aria-pressed={favorite} aria-label={favorite?t.remove:t.add} disabled={!hasTrack}><Icon name="heart"/></button>
     <div className="artist-m-more-wrap"><button type="button" className="artist-m-more" onClick={()=>setMoreOpen(v=>!v)} aria-expanded={moreOpen} aria-label={t.more} disabled={!hasTrack}><Icon name="more"/></button>{moreOpen&&<div className="artist-m-more-menu"><button type="button" onClick={toggleFavorite}>{favorite?t.remove:t.favorite}</button><Link href={track.href??"/studio/music"} onClick={()=>setMoreOpen(false)}>{t.open}</Link><button type="button" onClick={copyLink}>{t.copy}</button></div>}</div>
    </div>
    <div className="artist-m-center"><div className="artist-m-controls">
     <button type="button" className={shuffle?"active":""} onClick={()=>setShuffle(v=>!v)} aria-pressed={shuffle} aria-label={t.shuffle}><Icon name="shuffle"/></button>
     <button type="button" onClick={prev} disabled={queue.length<2} aria-label={t.previous}><Icon name="prev"/></button>
     <button type="button" className="artist-m-play" onClick={togglePlay} aria-label={playing?t.pause:t.play} disabled={!hasTrack}><Icon name={playing?"pause":"play"}/></button>
     <button type="button" onClick={next} disabled={queue.length<2} aria-label={t.next}><Icon name="next"/></button>
     <button type="button" className={repeat!=="off"?"active":""} onClick={cycleRepeat} aria-pressed={repeat!=="off"} aria-label={repeat==="track"?t.repeatTrack:repeat==="queue"?t.repeatQueue:t.repeatOff}><Icon name="repeat"/></button>
    </div></div>
    <div className="artist-m-tools">
     <div className="artist-m-volume"><button type="button" onClick={toggleMute} disabled={!hasTrack} aria-label={volume===0?t.unmute:t.mute}><Icon name="volume"/></button><input type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.currentTarget.value))} aria-label={t.volume} disabled={!hasTrack}/></div>
     <button type="button" className="artist-m-cast" onClick={requestDevice} aria-label={t.device} disabled={!hasTrack}><Icon name="cast"/></button>
     <div className="artist-m-queue-wrap"><button type="button" className="artist-m-queue" onClick={()=>setQueueOpen(v=>!v)} aria-expanded={queueOpen} aria-label={t.queue} disabled={!hasTrack}><Icon name="queue"/></button>{queueOpen&&<div className="artist-m-queue-menu"><b>{artistName}</b>{queue.map((t,i)=><button type="button" className={i===index?"current":""} key={t.id} onClick={()=>{select(i,true);setQueueOpen(false)}}><span>{t.title}</span><small>{t.artist}</small></button>)}</div>}</div>
     <div className="artist-m-brand"><img src="/mocify-bird.png?v=2" alt="" aria-hidden="true"/><span><b>MOCIFY</b><small>{t.playback}</small></span></div>
     <div className="artist-m-mini-controls"><button type="button" onClick={prev} disabled={queue.length<2} aria-label={t.previous}><Icon name="prev"/></button><button type="button" className="artist-m-mini-play" onClick={togglePlay} aria-label={playing?t.pause:t.play} disabled={!hasTrack}><Icon name={playing?"pause":"play"}/></button><button type="button" onClick={next} disabled={queue.length<2} aria-label={t.next}><Icon name="next"/></button></div>
    </div>
   </div>
   <div className="artist-m-timeline"><span>{fmt(currentTime)}</span><div className="artist-m-wave" onPointerDown={seekFrom} onKeyDown={seekKey} role="slider" tabIndex={0} aria-valuemin={0} aria-valuemax={Math.round(duration||0)} aria-valuenow={Math.round(currentTime)} aria-label={t.seek}><div className="artist-m-bars" aria-hidden="true">{spectrum.map((level,i)=>{const pct=i/(BAR_COUNT-1)*100,played=pct<=progress,height=Math.round(12+Math.min(1,envelope(i)+(playing?level*.22:0))*88);return <i key={i} className={played?"played":""} style={{"--h":`${height}%`} as React.CSSProperties}/>})}</div><span className="artist-m-playhead" style={{left:`${progress}%`}}/></div><span>{fmt(duration)}</span></div>
  </div>
 </section>
}
