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

  const translations={
    en:{kicker:"MOCIFY SUPPORT",title:"Contact us",intro:"Questions about listening, your account, Premium, Radio or content on MOCIFY? Send us a message.",name:"Name",email:"Email",topic:"What is your question about?",subject:"Subject",message:"Message",send:"Send message",back:"Back to MOCIFY",topics:{general:"General question",account:"Account & sign in",premium:"Premium & billing",playback:"Playback & Radio",content:"Report content",other:"Other"},note:"This prototype currently opens your email app. Later this form will connect directly to MOCIFY Support."},
    nl:{kicker:"MOCIFY SUPPORT",title:"Neem contact op",intro:"Een vraag over luisteren, je account, Premium, Radio of content op MOCIFY? Stuur ons een bericht.",name:"Naam",email:"E-mail",topic:"Waar gaat je vraag over?",subject:"Onderwerp",message:"Bericht",send:"Bericht versturen",back:"Terug naar MOCIFY",topics:{general:"Algemene vraag",account:"Account & inloggen",premium:"Premium & betaling",playback:"Afspelen & Radio",content:"Content melden",other:"Overig"},note:"Dit prototype opent momenteel je e-mailapp. Later koppelen we dit formulier rechtstreeks aan MOCIFY Support."},
    ro:{kicker:"MOCIFY SUPPORT",title:"Contactează-ne",intro:"Ai o întrebare despre ascultare, cont, Premium, Radio sau conținut pe MOCIFY? Trimite-ne un mesaj.",name:"Nume",email:"E-mail",topic:"Despre ce este întrebarea?",subject:"Subiect",message:"Mesaj",send:"Trimite mesaj",back:"Înapoi la MOCIFY",topics:{general:"Întrebare generală",account:"Cont & autentificare",premium:"Premium & plată",playback:"Redare & Radio",content:"Raportează conținut",other:"Altele"},note:"Acest prototip deschide momentan aplicația de e-mail. Ulterior formularul va fi conectat direct la MOCIFY Support."},
    de:{kicker:"MOCIFY SUPPORT",title:"Kontakt",intro:"Fragen zum Hören, deinem Konto, Premium, Radio oder zu Inhalten auf MOCIFY? Schreib uns.",name:"Name",email:"E-Mail",topic:"Worum geht es?",subject:"Betreff",message:"Nachricht",send:"Nachricht senden",back:"Zurück zu MOCIFY",topics:{general:"Allgemeine Frage",account:"Konto & Anmeldung",premium:"Premium & Zahlung",playback:"Wiedergabe & Radio",content:"Inhalt melden",other:"Sonstiges"},note:"Dieser Prototyp öffnet derzeit deine E-Mail-App. Später wird das Formular direkt mit MOCIFY Support verbunden."},
    fr:{kicker:"MOCIFY SUPPORT",title:"Contactez-nous",intro:"Une question sur l’écoute, votre compte, Premium, Radio ou un contenu MOCIFY ? Envoyez-nous un message.",name:"Nom",email:"E-mail",topic:"Quel est le sujet ?",subject:"Objet",message:"Message",send:"Envoyer le message",back:"Retour à MOCIFY",topics:{general:"Question générale",account:"Compte & connexion",premium:"Premium & paiement",playback:"Lecture & Radio",content:"Signaler un contenu",other:"Autre"},note:"Ce prototype ouvre actuellement votre application e-mail. Le formulaire sera ensuite relié directement au support MOCIFY."},
    es:{kicker:"MOCIFY SUPPORT",title:"Contacto",intro:"¿Tienes preguntas sobre la escucha, tu cuenta, Premium, Radio o contenido de MOCIFY? Envíanos un mensaje.",name:"Nombre",email:"Correo",topic:"¿Sobre qué es tu consulta?",subject:"Asunto",message:"Mensaje",send:"Enviar mensaje",back:"Volver a MOCIFY",topics:{general:"Consulta general",account:"Cuenta e inicio de sesión",premium:"Premium y pagos",playback:"Reproducción y Radio",content:"Reportar contenido",other:"Otro"},note:"Este prototipo abre actualmente tu aplicación de correo. Más adelante el formulario se conectará directamente con MOCIFY Support."},
    it:{kicker:"MOCIFY SUPPORT",title:"Contattaci",intro:"Hai domande sull’ascolto, sul tuo account, Premium, Radio o sui contenuti MOCIFY? Inviaci un messaggio.",name:"Nome",email:"E-mail",topic:"Di cosa riguarda la domanda?",subject:"Oggetto",message:"Messaggio",send:"Invia messaggio",back:"Torna a MOCIFY",topics:{general:"Domanda generale",account:"Account e accesso",premium:"Premium e pagamenti",playback:"Riproduzione e Radio",content:"Segnala contenuto",other:"Altro"},note:"Questo prototipo apre attualmente la tua app e-mail. In seguito il modulo sarà collegato direttamente al supporto MOCIFY."},
    pt:{kicker:"MOCIFY SUPPORT",title:"Contacta-nos",intro:"Tens perguntas sobre audição, conta, Premium, Rádio ou conteúdo no MOCIFY? Envia-nos uma mensagem.",name:"Nome",email:"E-mail",topic:"Sobre o que é a tua questão?",subject:"Assunto",message:"Mensagem",send:"Enviar mensagem",back:"Voltar ao MOCIFY",topics:{general:"Questão geral",account:"Conta e login",premium:"Premium e pagamentos",playback:"Reprodução e Rádio",content:"Denunciar conteúdo",other:"Outro"},note:"Este protótipo abre atualmente a aplicação de e-mail. Mais tarde o formulário será ligado diretamente ao suporte MOCIFY."},
    pl:{kicker:"MOCIFY SUPPORT",title:"Kontakt",intro:"Masz pytanie o słuchanie, konto, Premium, Radio lub treści w MOCIFY? Napisz do nas.",name:"Imię",email:"E-mail",topic:"Czego dotyczy pytanie?",subject:"Temat",message:"Wiadomość",send:"Wyślij wiadomość",back:"Wróć do MOCIFY",topics:{general:"Pytanie ogólne",account:"Konto i logowanie",premium:"Premium i płatności",playback:"Odtwarzanie i Radio",content:"Zgłoś treść",other:"Inne"},note:"Ten prototyp obecnie otwiera aplikację pocztową. Później formularz zostanie połączony bezpośrednio z MOCIFY Support."},
    tr:{kicker:"MOCIFY SUPPORT",title:"Bize ulaş",intro:"Dinleme, hesabın, Premium, Radyo veya MOCIFY içeriği hakkında soruların mı var? Bize mesaj gönder.",name:"Ad",email:"E-posta",topic:"Sorun ne hakkında?",subject:"Konu",message:"Mesaj",send:"Mesaj gönder",back:"MOCIFY'a dön",topics:{general:"Genel soru",account:"Hesap ve giriş",premium:"Premium ve ödeme",playback:"Oynatma ve Radyo",content:"İçerik bildir",other:"Diğer"},note:"Bu prototip şu anda e-posta uygulamanı açar. Daha sonra form doğrudan MOCIFY Support'a bağlanacaktır."}
  } as const;
  const t=translations[locale]??translations.en;

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
