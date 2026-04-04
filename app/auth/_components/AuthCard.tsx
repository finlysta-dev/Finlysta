"use client";

import { signIn } from "next-auth/react";
import { Chrome, Github, Linkedin } from "lucide-react";

type AuthCardProps = {
  mode: "signin" | "register";
};

export default function AuthCard({ mode }: AuthCardProps) {
  return (
    <div className="space-y-4">

      <button
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold"
      >
        <Chrome size={18} />
        Continue with Google
      </button>

      <button
        onClick={() => signIn("linkedin")}
        className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold"
      >
        <Linkedin size={18} />
        Continue with LinkedIn
      </button>

      <button
        onClick={() => signIn("github")}
        className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold"
      >
        <Github size={18} />
        Continue with GitHub
      </button>

    </div>
  );
}
