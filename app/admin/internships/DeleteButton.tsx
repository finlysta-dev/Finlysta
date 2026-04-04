"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {

  const router = useRouter();

  const handleDelete = async () => {

    const confirmDelete = confirm("Are you sure you want to delete this internship?");

    if (!confirmDelete) return;

    await fetch(`/api/admin/internships/${id}`, {
      method: "DELETE"
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline text-sm"
    >
      Delete
    </button>
  );

}