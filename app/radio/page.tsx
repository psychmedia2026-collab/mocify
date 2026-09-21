"use client";
import { Shell } from "../components";
import RadioClient from "./radio-client";
import SectionHero from "../section-hero";
import { useLanguage } from "../i18n/language-provider";
export default function RadioPage(){const{dictionary}=useLanguage();const h=dictionary.heroes.radio;return <Shell active="radio"><section className="page-wrap mockup-page-top"><SectionHero theme="radio" {...h} href="#radio-player"/></section><section id="radio-player" className="page-wrap scroll-mt-24"><RadioClient/></section></Shell>}
