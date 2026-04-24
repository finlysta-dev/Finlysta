"use client";

import { useState } from "react";

type Props = {
  name?: string;
  image?: string | null;
  size?: number;
};

export default function UserAvatar({ name = "User", image, size = 40 }: Props) {
  const [imgError, setImgError] = useState(false);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=0D8ABC&color=fff&size=128`;

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
    >
      {!imgError && image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <img
          src={fallbackAvatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
