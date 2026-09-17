import BusinessWorkspace from"../business-workspace";
import StudioWorkspace from"../workspace-client";
import type{CSSProperties}from"react";

const business=["analytics","earnings","promote"]as const;
const creative=["create","editor","mastering","projects"]as const;

type BusinessSection=typeof business[number];
type CreativeSection=typeof creative[number];

const businessHero:Record<BusinessSection,string>={
 analytics:"/heroes/artist/hero-analytics-hq.jpg",
 earnings:"/heroes/artist/hero-earnings-hq.jpg",
 promote:"/heroes/artist/hero-promote-hq.jpg"
};

export default async function Page({params}:{params:Promise<{section:string}>}){
 const{section}=await params;
 if((business as readonly string[]).includes(section)){
  const key=section as BusinessSection;
  return <div style={{"--business-hero":`url('${businessHero[key]}')`} as CSSProperties}><BusinessWorkspace section={key}/></div>;
 }
 const safe=(creative as readonly string[]).includes(section)?section as CreativeSection:"projects";
 return <StudioWorkspace section={safe}/>;
}
