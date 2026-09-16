"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./dashboard/dashboard.module.css";

const dashboardItems = [
  { id: "overview", icon: "⌂", label: "Overview", href: "/dashboard" },
  { id: "music", icon: "♫", label: "My Music", href: "/studio/music" },
  { id: "release", icon: "↑", label: "Upload / Release", href: "/upload" },
  { id: "analytics", icon: "◫", label: "Analytics", href: "/studio/analytics" },
] as const;

function itemIsActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ArtistDashboardLayout({
  children,
  planName = "Artist Free",
  showStudioEntry = false,
}: {
  children: ReactNode;
  planName?: string;
  showStudioEntry?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.grid}>
      <aside className={styles.side}>
        <div className={styles.artist}>
          <span>AN</span>
          <div>
            <b>Andigo</b>
            <small>{planName}</small>
          </div>
        </div>

        <p>DASHBOARD</p>
        <nav aria-label="Artist dashboard">
          {dashboardItems.map((item) => {
            const active = itemIsActive(pathname, item.href);
            return (
              <Link
                href={item.href}
                key={item.id}
                className={active ? styles.activeNav : ""}
                aria-current={active ? "page" : undefined}
              >
                <i>{item.icon}</i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {showStudioEntry && (
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
