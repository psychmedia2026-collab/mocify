"use client";

import {useState,type FormEvent} from "react";
import {Shell} from "../components";
import {useLanguage} from "../i18n/language-provider";

export default function ContactPage(){
  const {locale}=useLanguage();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [topic,setTopic]=useState("general");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");

  const t=locale==="nl"?{
    kicker:"MOCIFY SUPPORT",
    title:"Neem contact op",
    intro:"Een vraag over luisteren, je account, Premium, Radio of content op MOCIFY? Stuur ons een bericht.",
    name:"Naam",email:"E-mail",topic:"Waar gaat je vraag over?",subject:"Onderwerp",message:"Bericht",
    send:"Bericht versturen",back:"Terug naar MOCIFY",
    topics:{general:"Algemene vraag",account:"Account & inloggen",premium:"Premium & betaling",playback:"Afspelen & Radio",content:"Content melden",other:"Overig"},
    note:"Dit prototype opent momenteel je e-mailapp. Later koppelen we dit formulier rechtstreeks aan MOCIFY Support."
  }:locale==="ro"?{
    kicker:"MOCIFY SUPPORT",
    title:"Contactează-ne",
    intro:"Ai o întrebare despre ascultare, cont, Premium, Radio sau conținut pe MOCIFY? Trimite-ne un mesaj.",
    name:"Nume",email:"E-mail",topic:"Despre ce este întrebarea?",subject:"Subiect",message:"Mesaj",
    send:"Trimite mesaj",back:"Înapoi la MOCIFY",
    topics:{general:"Întrebare generală",account:"Cont & autentificare",premium:"Premium & plată",playback:"Redare & Radio",content:"Raportează conținut",other:"Altele"},
    note:"Acest prototip deschide momentan aplicația de e-mail. Ulterior formularul va fi conectat direct la MOCIFY Support."
  }:{
    kicker:"MOCIFY SUPPORT",
    title:"Contact us",
    intro:"Questions about listening, your account, Premium, Radio or content on MOCIFY? Send us a message.",
    name:"Name",email:"Email",topic:"What is your question about?",subject:"Subject",message:"Message",
    send:"Send message",back:"Back to MOCIFY",
    topics:{general:"General question",account:"Account & sign in",premium:"Premium & billing",playback:"Playback & Radio",content:"Report content",other:"Other"},
    note:"This prototype currently opens your email app. Later this form will connect directly to MOCIFY Support."
  };

  const submit=(e:FormEvent)=>{
    e.preventDefault();
    const topicLabel=t.topics[topic as keyof typeof t.topics];
    const mailSubject=encodeURIComponent(subject||("MOCIFY — "+topicLabel));
    const body=encodeURIComponent("Name: "+name+"\nEmail: "+email+"\nTopic: "+topicLabel+"\n\n"+message);
    window.location.href="mailto:contact@mocify.ai?subject="+mailSubject+"&body="+body;
  };

  return <Shell active="" player>
    <section className="page-wrap listener-contact-page">
      <div className="listener-contact-intro">
        <p className="page-kicker">{t.kicker}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <a href="/">← {t.back}</a>
      </div>
      <form className="listener-contact-form" onSubmit={submit}>
        <div className="listener-contact-row">
          <label><span>{t.name}</span><input required value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>
          <label><span>{t.email}</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label>
        </div>
        <label><span>{t.topic}</span><select value={topic} onChange={e=>setTopic(e.target.value)}>
          {Object.entries(t.topics).map(([value,label])=><option key={value} value={value}>{label}</option>)}
        </select></label>
        <label><span>{t.subject}</span><input value={subject} onChange={e=>setSubject(e.target.value)}/></label>
        <label><span>{t.message}</span><textarea required rows={8} value={message} onChange={e=>setMessage(e.target.value)}/></label>
        <button type="submit" className="m-primary">{t.send} →</button>
        <small>{t.note}</small>
      </form>
    </section>
  </Shell>;
}
