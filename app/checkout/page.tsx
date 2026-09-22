"use client";
import {Suspense,useEffect,useState} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import Link from "next/link";
import {Shell} from "../components";
import {readListenerAccount,readListenerSession} from "../listener-account";

function CheckoutContent(){
 const router=useRouter(),params=useSearchParams(),[ready,setReady]=useState(false);
 const plan=params.get("plan")||"MOCIFY Premium",paymentStatus=params.get("payment");
 useEffect(()=>{if(!readListenerSession()){router.replace("/login?next=/plans");return}setReady(true)},[router]);
 if(!ready)return <section className="page-wrap mocify-checkout"><p>Loading checkout…</p></section>;
 const account=readListenerAccount();
 if(paymentStatus==="failed")return <section className="page-wrap mocify-checkout"><div className="mocify-checkout-card mocify-payment-failed"><div className="mocify-payment-status-icon" aria-hidden="true">!</div><p className="page-kicker">PAYMENT FAILED</p><h1>Your Premium payment was not completed</h1><p className="mocify-checkout-intro">Your MOCIFY account was created successfully. Because the Premium payment did not succeed, your account is currently active as <strong>MOCIFY Free</strong>.</p><div className="mocify-checkout-account"><span>Your account</span><strong>{account?.displayName}</strong><small>{account?.email}</small><span className="mocify-checkout-free-badge">MOCIFY FREE · ACTIVE</span></div><p className="mocify-payment-reassurance">You do not need to register again. You can use MOCIFY Free now, or try the Premium payment again.</p><div className="mocify-payment-actions"><Link className="m-primary" href={`/checkout?plan=${encodeURIComponent(plan)}`}>Try Premium payment again</Link><Link className="m-secondary" href="/explore">Continue with MOCIFY Free</Link></div></div></section>;
 return <section className="page-wrap mocify-checkout"><div className="mocify-checkout-card"><p className="page-kicker">UPGRADE YOUR ACCOUNT</p><h1>Continue with {plan}</h1><p className="mocify-checkout-intro">You are upgrading your existing MOCIFY account. No new listener account will be created.</p><div className="mocify-checkout-account"><span>Account</span><strong>{account?.displayName}</strong><small>{account?.email}</small></div><div className="mocify-checkout-payment"><h2>Payment</h2><p>Your first successful payment will activate Premium on this account. If payment fails, your registered account stays active as MOCIFY Free and you can retry without registering again.</p><button className="m-primary" type="button" disabled>Payment connection coming next</button></div><Link className="m-secondary" href="/plans#listener-plans">← Back to plans</Link></div></section>
}
export default function CheckoutPage(){return <Shell active="plans"><Suspense fallback={<section className="page-wrap mocify-checkout"><p>Loading checkout…</p></section>}><CheckoutContent/></Suspense></Shell>}
