import {notFound} from "next/navigation";
import {artists,releases} from "../../data";
import {Shell} from "../../components";
import ArtistCatalogProfile from "../artist-catalog-profile";

const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export default async function ArtistProfile({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const artist=artists.find(a=>slugify(a.name)===slug);if(!artist)notFound();const tracks=releases.filter(r=>r.artist===artist.name);return <Shell active="artists"><ArtistCatalogProfile artist={artist} tracks={tracks}/></Shell>}