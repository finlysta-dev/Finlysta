import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BanWatcher from "@/components/BanWatcher";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  // Not logged in
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Fetch latest user data from DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      isBanned: true
    }
  });

  // If banned → block immediately
  if (user?.isBanned) {
    redirect("/banned");
  }

  // Otherwise go to profile
  redirect(`/profile/${user?.id}`);

}
<BanWatcher />