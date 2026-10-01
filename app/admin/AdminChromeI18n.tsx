"use client";
import{useAdminLanguage}from"./AdminLanguage";
export default function AdminChromeI18n(){const{t}=useAdminLanguage();return <><div className="adminSideStatus"><i></i><span>{t("Beheerdersomgeving","Admin workspace")}</span></div><div className="adminSideFoot"><strong>{t("Frontendmodus","Frontend mode")}</strong><span>{t("Demodata · backend volgt","Mock data · backend later")}</span></div></>}
