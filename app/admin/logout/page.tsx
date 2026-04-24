"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout(){

  const router = useRouter();

  useEffect(()=>{

    async function logout(){

      await fetch("/api/admin/logout",{
        method:"POST"
      });

      router.push("/admin-login");

    }

    logout();

  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging out...
    </div>
  );

}
