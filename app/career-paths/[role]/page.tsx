import type { Metadata } from "next";
import { redirect } from "next/navigation";

// For now, redirect to financial-analyst as the default
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Financial Analyst Career Path | Finlysta",
  };
}

export default function CareerPathsRolePage() {
  redirect("/career-paths/financial-analyst");
}
