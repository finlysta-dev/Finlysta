"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BannedPage() {

  const router = useRouter();

  useEffect(() => {

    const interval = setInterval(async () => {

      const res = await fetch("/api/check-ban");
      const data = await res.json();

      // If unbanned → go to homepage
      if (!data.isBanned) {
        router.push("/");
      }

    }, 3000);

    return () => clearInterval(interval);

  }, [router]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Account Suspended
        </h1>

        <p className="text-gray-600 mb-4">
          Your account has been temporarily suspended for violating Finlysta platform rules.
        </p>

        <p className="text-gray-600 mb-4">
          If you believe this action was taken by mistake, please contact our support team and we will review your case.
        </p>

        <p className="text-sm text-gray-500">
          Support Email:
        </p>

        <a
          href="mailto:Finlystahelp@gmail.com"
          className="text-blue-600 font-medium hover:underline"
        >
          Finlystahelp@gmail.com
        </a>

      </div>

    </div>

  );
}
