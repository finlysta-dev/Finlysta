"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BanWatcher() {

  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {

    // 1️⃣ Do not run inside admin panel
    if (pathname.startsWith("/admin")) return;

    // 2️⃣ Do not run if admin user
    if (session?.user?.role === "ADMIN") return;

    const interval = setInterval(async () => {

      try {

        const res = await fetch("/api/check-ban");
        const data = await res.json();

        // If banned → redirect
        if (data.isBanned && pathname !== "/banned") {
          router.push("/banned");
        }

      } catch (error) {
        console.error("Ban check failed");
      }

    }, 3000);

    return () => clearInterval(interval);

  }, [router, pathname, session]);

  return null;
}