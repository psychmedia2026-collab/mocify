"use client";
import {Suspense,useEffect,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import Link from "next/link";
import {Shell} from "../components";
import {readListenerAccount,readListenerSession} from "../listener-account";

function CheckoutContent(){
 const router=useRouter(),params=useSearchParams(),[ready,setReady]=useState(false);
 const plan=params.get("plan")||"MOCIFY Premium";
 useEffect(()=>{if(!readListenerSession()){router.replace("/login?next=/premium");return}setReady(true)},[router]);
 if(!ready)return <section className="page-wrap mocify-checkout"><p>Loading checkout…</p></section>;
 const account=readListenerAccount();
 return <section className="page-wrap mocify-checkout"><div className="mocify-checkout-card"><p className="page-kicker">UPGRADE YOUR ACCOUNT</p><h1>Continue with {plan}</h1><p className="mocify-checkout-intro">You are upgrading your existing MOCIFY account. No new listener account will be created.</p><div className="mocify-checkout-account"><span>Account</span><strong>{account?.displayName}</strong><small>{account?.email}</small></div><div className="mocify-checkout-payment"><h2>Payment</h2><p>Secure payment methods such as iDEAL/Wero and other supported options will appear here when the payment provider is connected.</p><button className="m-primary" type="button" disabled>Payment connection coming next</button></div><Link className="m-secondary" href="/premium#listener-plans">← Back to plans</Link></div></section>
}
export default function CheckoutPage(){return <Shell active="premium"><Suspense fallback={<section className="page-wrap mocify-checkout"><p>Loading checkout…</p></section>}><CheckoutContent/></Suspense></Shell>}
