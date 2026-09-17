import BusinessWorkspace from "../business-workspace";
import type{CSSProperties}from"react";

export default function AnalyticsPage(){
  return <div style={{"--business-hero":"url('/heroes/artist/hero-analytics-hq.jpg')"} as CSSProperties}><BusinessWorkspace section="analytics"/></div>;
}
