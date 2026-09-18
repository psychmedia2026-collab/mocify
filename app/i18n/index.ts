import en from "./en";
import nl from "./nl";
import ro from "./ro";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import pt from "./pt";
import pl from "./pl";
import tr from "./tr";
import id from "./id";
import ja from "./ja";
import ko from "./ko";
import hi from "./hi";

import { defaultLocale, isLocale, supportedLocales, type Locale } from "./config";

const dictionaries={en,nl,ro,de,fr,es,it,pt,pl,tr,id,ja,ko,hi};

export function getDictionary(locale:string){
  const safeLocale:Locale=isLocale(locale)?locale:defaultLocale;
  return dictionaries[safeLocale];
}

export {defaultLocale,isLocale,supportedLocales,type Locale};
