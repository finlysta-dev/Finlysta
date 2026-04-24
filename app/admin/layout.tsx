import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";
import { NotificationProvider } from "@/context/NotificationContext";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 🔐 BLOCK non-admin users
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <NotificationProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </NotificationProvider>
  );
}
