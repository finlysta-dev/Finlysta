"use client";

export default function DeletePostButton({ postId }: { postId: string }) {
  return (
    <button
      className="text-red-600 text-sm underline"
      onClick={async () => {
        const res = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          window.location.reload();
        } else {
          alert("Failed to delete post");
        }
      }}
    >
      Delete
    </button>
  );
}
