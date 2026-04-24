"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserActions({
  id,
  banned
}: {
  id: string;
  banned: boolean;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleBan = async () => {
    try {

      setLoading(true);

      const res = await fetch(`/api/admin/users/${id}/ban`, {
        method: "PUT",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to update user status");
        return;
      }

      router.refresh();

    } catch (error) {

      console.error("Ban error:", error);
      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  const deleteUser = async () => {

    const confirmed = confirm("Delete this user?");
    if (!confirmed) return;

    try {

      setLoading(true);

      const res = await fetch(`/api/admin/users/${id}/delete`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
        return;
      }

      router.refresh();

    } catch (error) {

      console.error("Delete error:", error);
      alert("Something went wrong");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="flex gap-4">

      <button
        onClick={toggleBan}
        disabled={loading}
        className={`text-sm ${
          banned ? "text-green-600" : "text-yellow-600"
        } hover:underline`}
      >
        {banned ? "Unban" : "Ban"}
      </button>

      <button
        onClick={deleteUser}
        disabled={loading}
        className="text-red-600 hover:underline text-sm"
      >
        Delete
      </button>

    </div>

  );
}
