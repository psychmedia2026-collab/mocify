"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./dashboard/dashboard.module.css";

export type ArtistPlanTier = "free" | "pro" | "studio";

const planInfo = {
  free: { name: "Artist Free", badge: "FREE" },
  pro: { name: "Artist Pro", badge: "PRO" },
  studio: { name: "MOCIFY STUDIO", badge: "STUDIO" },
} as const;

const dashboardItems = [
  { id: "overview", icon: "⌂", label: "Overview", href: "/dashboard", min: "free" },
  { id: "music", icon: "♫", label: "My Music", href: "/studio/music", min: "free" },
  { id: "release", icon: "↑", label: "Upload / Release", href: "/upload", min: "free" },
  { id: "analytics", icon: "◫", label: "Analytics", href: "/studio/analytics", min: "pro" },
  { id: "earnings", icon: "€", label: "Earnings", href: "/studio/earnings", min: "pro" },
  { id: "promote", icon: "↗", label: "Promote", href: "/studio/promote", min: "pro" },
] as const;

function itemIsActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ArtistDashboardLayout({
  children,
  plan,
  showStudioEntry,
}: {
  children: ReactNode;
  plan?: ArtistPlanTier;
  showStudioEntry?: boolean;
}) {
  const pathname = usePathname();
  const [storedPlan, setStoredPlan] = useState<ArtistPlanTier>(plan ?? "free");

  useEffect(() => {
    if (plan) {
      setStoredPlan(plan);
      return;
    }
    const saved = window.localStorage.getItem("mocify-artist-plan");
    if (saved === "free" || saved === "pro" || saved === "studio") setStoredPlan(saved);

    const onPlanChange = (event: Event) => {
      const next = (event as CustomEvent<ArtistPlanTier>).detail;
      if (next === "free" || next === "pro" || next === "studio") setStoredPlan(next);
    };
    window.addEventListener("mocify-plan-change", onPlanChange);
    return () => window.removeEventListener("mocify-plan-change", onPlanChange);
  }, [plan]);

  const currentPlan = plan ?? storedPlan;
  const info = planInfo[currentPlan];
  const studioVisible = showStudioEntry ?? currentPlan === "studio";

  return (
    <div className={styles.grid}>
      <aside className={`${styles.side} ${styles[`side_${currentPlan}`]}`}>
        <div className={`${styles.artist} ${styles[`artist_${currentPlan}`]}`}>
          <span>AN</span>
          <div>
            <b>Andigo</b>
            <small>{info.name}</small>
          </div>
          <em className={`${styles.planBadge} ${styles[`planBadge_${currentPlan}`]}`}>{info.badge}</em>
        </div>

        <p>DASHBOARD</p>
        <nav aria-label="Artist dashboard">
          {dashboardItems.map((item) => {
            const locked = item.min === "pro" && currentPlan === "free";
            const active = !locked && itemIsActive(pathname, item.href);
            return (
              <Link
                href={locked ? "/for-artists" : item.href}
                key={item.id}
                className={`${active ? styles.activeNav : ""} ${locked ? styles.lockedNav : ""}`}
                aria-current={active ? "page" : undefined}
                title={locked ? `${item.label} is beschikbaar met Artist Pro` : undefined}
              >
                <i>{item.icon}</i>
                <span>{item.label}</span>
                {locked && <em className={styles.proPill}>PRO</em>}
              </Link>
            );
          })}
        </nav>

        {currentPlan === "free" && (
          <div className={styles.freeUpgrade}>
            <small>ARTIST PRO</small>
            <b>Meer inzicht. Meer controle.</b>
            <p>Ontgrendel Analytics, Earnings en Promote.</p>
            <Link href="/for-artists">Bekijk Artist Pro →</Link>
          </div>
        )}

        {currentPlan === "pro" && (
          <div className={styles.proStatus}>
            <small>PRO ACTIVE</small>
            <b>Artist Pro</b>
            <p>Analytics, inkomsten en promotietools zijn ontgrendeld.</p>
          </div>
        )}

        {studioVisible && (
          <div className={styles.studioEntry}>
            <small>CREATIVE ENVIRONMENT</small>
            <b>MOCIFY STUDIO</b>
            <p>Create · Edit · Mix · Master</p>
            <Link href="/studio/projects">Open Studio →</Link>
          </div>
        )}
      </aside>

      <div className={styles.main}>{children}</div>
    </div>
  );
}
