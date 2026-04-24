"use client";

import { useRouter } from "next/navigation";

export default function TrendingButton({
  id,
  isTrending
}: {
  id: string;
  isTrending: boolean;
}) {

  const router = useRouter();

  const toggleTrending = async () => {

    await fetch(`/api/admin/internships/${id}/toggle-trending`, {
      method: "PUT"
    });

    router.refresh();
  };

  return (
    <button
      onClick={toggleTrending}
      className={`text-sm ${
        isTrending ? "text-yellow-600" : "text-gray-500"
      }`}
    >
      {isTrending ? "★ Trending" : "☆ Make Trending"}
    </button>
  );
}
