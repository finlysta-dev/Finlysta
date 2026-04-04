"use client";

import { useEffect, useState } from "react";

export default function TrustSection(){

  const [stats,setStats] = useState({
    totalInternships:0,
    activeInternships:0,
    totalCompanies:0
  });

  useEffect(()=>{

    async function load(){

      const res = await fetch("/api/platform-stats");
      const data = await res.json();

      setStats(data.data || []);
    }

    load();

  },[]);

  return(

    <section className="py-20">

      <h2 className="text-3xl font-bold text-center mb-12">
        Why Students Trust Internify
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="border p-6 rounded-xl">

          <h3 className="font-semibold mb-2">
            Every Listing is Verified
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Our team reviews every internship before publishing.
          </p>

          <p className="text-3xl font-bold">
            {stats.totalInternships}+
          </p>

          <p className="text-sm text-gray-500">
            Verified Listings
          </p>

        </div>


        <div className="border p-6 rounded-xl">

          <h3 className="font-semibold mb-2">
            Only Active Openings
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            We remove internships when they close.
          </p>

          <p className="text-3xl font-bold">
            {stats.activeInternships}+
          </p>

          <p className="text-sm text-gray-500">
            Active Internships
          </p>

        </div>


        <div className="border p-6 rounded-xl">

          <h3 className="font-semibold mb-2">
            Free for Students
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            No paywalls. No premium tiers.
          </p>

          <p className="text-3xl font-bold">
            ₹0
          </p>

          <p className="text-sm text-gray-500">
            Cost for Students
          </p>

        </div>

      </div>

    </section>

  )

}