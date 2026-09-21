import {releases,type Release} from "../data";
import {combinedReleases,type PublishedRelease} from "../listener-account";

export type RadioChartSize=40|100|1000;
export type CountryChartEntry={rank:number;track:Release|PublishedRelease;streams:number;change:number};

export const LISTENER_COUNTRY_KEY="mocify-listener-country";
const STREAM_KEY="mocify-country-streams-v1";

/** ISO 3166-1 alpha-2 countries. The ranking engine accepts any code in this list. */
export const countryCodes=[
"AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
] as const;

export const localeCountry:Record<string,string>={
 en:"US",nl:"NL",ro:"RO",de:"DE",fr:"FR",es:"ES",it:"IT",pt:"PT",pl:"PL",tr:"TR",id:"ID",ja:"JP",ko:"KR",hi:"IN"
};

function hash(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function prototypeStreams(country:string,trackId:string){
 const h=hash(country+"|"+trackId);
 const market=3500+(hash(country)%26000);
 const multiplier=.48+((h%170)/100);
 return Math.round(market*multiplier);
}
function prototypeChange(country:string,trackId:string){const h=hash("change|"+country+"|"+trackId);return ((h%181)-70)/10}

type StoredStreams=Record<string,Record<string,number>>;
function readStored():StoredStreams{
 if(typeof window==="undefined")return{};
 try{const raw=localStorage.getItem(STREAM_KEY);const parsed=raw?JSON.parse(raw):{};return parsed&&typeof parsed==="object"?parsed:{}}catch{return{}}
}
export function recordCountryStream(country:string,trackId:string){
 if(typeof window==="undefined")return;
 const code=country.toUpperCase();
 const data=readStored();
 data[code]??={};
 data[code][trackId]=(data[code][trackId]??0)+1;
 try{localStorage.setItem(STREAM_KEY,JSON.stringify(data));window.dispatchEvent(new CustomEvent("mocify-country-stream",{detail:{country:code,trackId}}))}catch{}
}
export function getCountryChart(country:string,size:RadioChartSize):CountryChartEntry[]{
 const code=country.toUpperCase();
 const stored=readStored()[code]??{};
 return combinedReleases(releases).filter(track=>!track.country||track.country==="INT"||track.country===code).map(track=>({
   track,
   streams:prototypeStreams(code,track.id)+(stored[track.id]??0),
   change:prototypeChange(code,track.id),
   rank:0
 })).sort((a,b)=>b.streams-a.streams||a.track.title.localeCompare(b.track.title))
   .slice(0,size)
   .map((entry,index)=>({...entry,rank:index+1}));
}
export function getRadioQueue(country:string){
 return getCountryChart(country,40).map(x=>x.track).filter(track=>"audioSrc"in track&&typeof track.audioSrc==="string");
}
