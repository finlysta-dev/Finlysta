"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminSessionGuard() {

  const router = useRouter();

  useEffect(() => {

    let timer: any;

    const logout = async () => {

      await fetch("/api/admin/logout", {
        method: "POST"
      });

      router.push("/admin-login");

    };

    // logout after 5 minutes
    const startTimer = () => {

      clearTimeout(timer);

      timer = setTimeout(() => {
        logout();
      }, 5 * 60 * 1000);

    };

    startTimer();

    // reset timer if activity
    const events = ["mousemove", "keydown", "click"];

    events.forEach(event =>
      window.addEventListener(event, startTimer)
    );

    // logout when tab closes
    window.addEventListener("beforeunload", logout);

    return () => {

      clearTimeout(timer);

      events.forEach(event =>
        window.removeEventListener(event, startTimer)
      );

      window.removeEventListener("beforeunload", logout);

    };

  }, [router]);

  return null;
}