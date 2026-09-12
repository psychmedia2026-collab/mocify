import { permanentRedirect } from "next/navigation";

export default function LegacyArtistPage() {
  permanentRedirect("/artist/andigo");
}
