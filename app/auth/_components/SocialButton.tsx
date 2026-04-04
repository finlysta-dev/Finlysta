"use client";

import { signIn } from "next-auth/react";

type Provider = "google" | "github" | "linkedin";

export default function SocialButton({
  provider,
  label,
  icon,
}: {
  provider: Provider;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        signIn(provider, {
          callbackUrl: "/dashboard",
        })
      }
      className="w-full flex items-center justify-center gap-3 py-2.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition"
    >
      {icon}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}
