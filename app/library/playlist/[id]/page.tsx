"use client";
import{useEffect,useState}from"react";
import{useParams}from"next/navigation";
import Link from"next/link";
import{Shell}from"../../../components";
import{releases}from"../../../data";
import{useListenerPlayer}from"../../../listener-player";
import{useLanguage}from"../../../i18n/language-provider";
import{combinedReleases,hydratedPublishedReleases,readPlaylists,toggleTrackInPlaylist,type ListenerPlaylist,type PublishedRelease}from"../../../listener-account";

const copy={
 en:{back:"Library",missing:"Playlist not found",k:"YOUR PLAYLIST",tracks:"tracks",add:"Add tracks",remove:"Remove",plus:"Add +",play:"Play all",empty:"No tracks in this playlist yet."},
 nl:{back:"Bibliotheek",missing:"Playlist niet gevonden",k:"JOUW PLAYLIST",tracks:"nummers",add:"Nummers toevoegen",remove:"Verwijderen",plus:"Toevoegen +",play:"Alles afspelen",empty:"Deze playlist bevat nog geen nummers."},
 ro:{back:"Bibliotecă",missing:"Playlistul nu a fost găsit",k:"PLAYLISTUL TĂU",tracks:"piese",add:"Adaugă piese",remove:"Elimină",plus:"Adaugă +",play:"Redă tot",empty:"Acest playlist nu are încă piese."},
 de:{back:"Bibliothek",missing:"Playlist nicht gefunden",k:"DEINE PLAYLIST",tracks:"Titel",add:"Titel hinzufügen",remove:"Entfernen",plus:"Hinzufügen +",play:"Alle abspielen",empty:"Diese Playlist enthält noch keine Titel."},
 fr:{back:"Bibliothèque",missing:"Playlist introuvable",k:"VOTRE PLAYLIST",tracks:"titres",add:"Ajouter des titres",remove:"Retirer",plus:"Ajouter +",play:"Tout lire",empty:"Cette playlist ne contient encore aucun titre."},
 es:{back:"Biblioteca",missing:"Playlist no encontrada",k:"TU PLAYLIST",tracks:"pistas",add:"Añadir pistas",remove:"Eliminar",plus:"Añadir +",play:"Reproducir todo",empty:"Esta playlist aún no tiene pistas."},
 it:{back:"Libreria",missing:"Playlist non trovata",k:"LA TUA PLAYLIST",tracks:"brani",add:"Aggiungi brani",remove:"Rimuovi",plus:"Aggiungi +",play:"Riproduci tutto",empty:"Questa playlist non contiene ancora brani."},
 pt:{back:"Biblioteca",missing:"Playlist não encontrada",k:"A TUA PLAYLIST",tracks:"faixas",add:"Adicionar faixas",remove:"Remover",plus:"Adicionar +",play:"Reproduzir tudo",empty:"Esta playlist ainda não tem faixas."},
 pl:{back:"Biblioteka",missing:"Nie znaleziono playlisty",k:"TWOJA PLAYLISTA",tracks:"utwory",add:"Dodaj utwory",remove:"Usuń",plus:"Dodaj +",play:"Odtwórz wszystko",empty:"Ta playlista nie ma jeszcze utworów."},
 tr:{back:"Kütüphane",missing:"Çalma listesi bulunamadı",k:"ÇALMA LİSTEN",tracks:"parça",add:"Parça ekle",remove:"Kaldır",plus:"Ekle +",play:"Tümünü çal",empty:"Bu çalma listesinde henüz parça yok."},
 id:{back:"Perpustakaan",missing:"Playlist tidak ditemukan",k:"PLAYLIST KAMU",tracks:"track",add:"Tambahkan track",remove:"Hapus",plus:"Tambah +",play:"Putar semua",empty:"Playlist ini belum memiliki track."},
 ja:{back:"ライブラリ",missing:"プレイリストが見つかりません",k:"あなたのプレイリスト",tracks:"曲",add:"曲を追加",remove:"削除",plus:"追加 +",play:"すべて再生",empty:"このプレイリストにはまだ曲がありません。"},
 ko:{back:"라이브러리",missing:"플레이리스트를 찾을 수 없음",k:"내 플레이리스트",tracks:"곡",add:"트랙 추가",remove:"삭제",plus:"추가 +",play:"전체 재생",empty:"이 플레이리스트에는 아직 트랙이 없습니다."},
 hi:{back:"लाइब्रेरी",missing:"प्लेलिस्ट नहीं मिली",k:"आपकी प्लेलिस्ट",tracks:"ट्रैक",add:"ट्रैक जोड़ें",remove:"हटाएँ",plus:"जोड़ें +",play:"सभी चलाएँ",empty:"इस प्लेलिस्ट में अभी कोई ट्रैक नहीं है।"}
}as const;

export default function UserPlaylist(){
 const{id}=useParams<{id:string}>(),{locale}=useLanguage(),t=copy[locale]??copy.en,player=useListenerPlayer();
 const[playlist,setPlaylist]=useState<ListenerPlaylist|null>(null),[catalog,setCatalog]=useState<(typeof releases[number]|PublishedRelease)[]>(()=>[...combinedReleases(releases)]);
 const refresh=()=>setPlaylist(readPlaylists().find(p=>p.id===id)||null);
 useEffect(()=>{refresh();void hydratedPublishedReleases().then(p=>setCatalog([...p,...releases]));const sync=()=>{refresh();void hydratedPublishedReleases().then(p=>setCatalog([...p,...releases]))};addEventListener("mocify-library-change",sync);return()=>removeEventListener("mocify-library-change",sync)},[id]);
 if(!playlist)return <Shell active="library"><section className="page-wrap listener-library"><Link href="/library">← {t.back}</Link><h1>{t.missing}</h1></section></Shell>;
 const tracks=playlist.trackIds.map(trackId=>catalog.find(r=>r.id===trackId)).filter(Boolean) as typeof catalog,playable=tracks.filter(r=>Boolean(r.audioSrc));
 return <Shell active="library"><section className="page-wrap listener-library"><Link href="/library">← {t.back}</Link><header><p className="page-kicker">{t.k}</p><h1>{playlist.name}</h1><p>{tracks.length} {t.tracks}</p>{playable.length>0&&<button className="m-primary" type="button" onClick={()=>player.selectTrack(playable[0],playable,true)}>▶ {t.play}</button>}</header><div className="user-playlist-add"><h2>{t.add}</h2>{catalog.map(r=><button key={r.id} onClick={()=>{toggleTrackInPlaylist(playlist.id,r.id);refresh()}}><span className={"library-mini-cover "+r.art}/><span><b>{r.title}</b><small>{r.artist}</small></span><strong>{playlist.trackIds.includes(r.id)?t.remove:t.plus}</strong></button>)}{!catalog.length&&<p>{t.empty}</p>}</div></section></Shell>
}