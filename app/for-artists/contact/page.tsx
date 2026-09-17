"use client";
import {useState,type FormEvent} from "react";
import {ArtistPortalShell} from "../../artist-components";
import {useLanguage} from "../../i18n/language-provider";

export default function ArtistContactPage(){
  const{locale}=useLanguage();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[subject,setSubject]=useState("");
  const[message,setMessage]=useState("");
  const t=locale==="nl"?{
    kicker:"MOCIFY SUPPORT",title:"Contact",intro:"Heb je een vraag over je artiestenaccount, releases, promotie of MOCIFY Studio? Stuur ons een bericht.",
    name:"Naam",email:"E-mail",subject:"Onderwerp",message:"Bericht",send:"Bericht versturen",back:"Terug naar Dashboard",
    note:"Dit prototype opent je e-mailapp. Later koppelen we dit formulier rechtstreeks aan MOCIFY Support."
  }:locale==="ro"?{
    kicker:"MOCIFY SUPPORT",title:"Contact",intro:"Ai o întrebare despre contul de artist, lansări, promovare sau MOCIFY Studio? Trimite-ne un mesaj.",
    name:"Nume",email:"E-mail",subject:"Subiect",message:"Mesaj",send:"Trimite mesaj",back:"Înapoi la Dashboard",
    note:"Acest prototip deschide aplicația de e-mail. Ulterior formularul va fi conectat direct la MOCIFY Support."
  }:{
    kicker:"MOCIFY SUPPORT",title:"Contact",intro:"Have a question about your artist account, releases, promotion or MOCIFY Studio? Send us a message.",
    name:"Name",email:"Email",subject:"Subject",message:"Message",send:"Send message",back:"Back to Dashboard",
    note:"This prototype opens your email app. Later this form will connect directly to MOCIFY Support."
  };
  const submit=(e:FormEvent)=>{e.preventDefault();const mailSubject=encodeURIComponent(subject||"MOCIFY Artist Portal contact");const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);window.location.href=`mailto:contact@mocify.ai?subject=${mailSubject}&body=${body}`};
  return <ArtistPortalShell active="studio"><section className="artist-contact-page"><div className="artist-contact-wrap"><div className="artist-contact-intro"><p>{t.kicker}</p><h1>{t.title}</h1><span>{t.intro}</span><a href="/dashboard">← {t.back}</a></div><form className="artist-contact-form" onSubmit={submit}><div className="artist-contact-row"><label><span>{t.name}</span><input required value={name} onChange={e=>setName(e.target.value)}/></label><label><span>{t.email}</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label></div><label><span>{t.subject}</span><input value={subject} onChange={e=>setSubject(e.target.value)}/></label><label><span>{t.message}</span><textarea required rows={7} value={message} onChange={e=>setMessage(e.target.value)}/></label><button type="submit">{t.send} →</button><small>{t.note}</small></form></div></section></ArtistPortalShell>
}