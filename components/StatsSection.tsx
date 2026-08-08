"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Building2,
  Users,
  Award,
  Sparkles,
} from "lucide-react";

type Stat = {
  id: string;
  label: string;
  value: string;
  icon?: string | null;
};

const iconMap: Record<string, React.ElementType> = {
  trending: TrendingUp,
  building: Building2,
  users: Users,
  award: Award,
};

const colors: Record<string, string> = {
  trending:
    "text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
  building:
    "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
  users:
    "text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
  award:
    "text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
};

const gradientBackgrounds: Record<string, string> = {
  trending: "from-blue-500/5 to-blue-600/5",
  building: "from-purple-500/5 to-purple-600/5",
  users: "from-emerald-500/5 to-emerald-600/5",
  award: "from-orange-500/5 to-orange-600/5",
};

const numberGradients: Record<string, string> = {
  trending: "from-blue-600 to-blue-500",
  building: "from-purple-600 to-purple-500",
  users: "from-emerald-600 to-emerald-500",
  award: "from-orange-600 to-orange-500",
};

/* -------- Format Number Automatically -------- */

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(".0", "") + "M+";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K+";
  }
  return num + "+";
}

/* -------- Count Up -------- */

function CountUp({ value }: { value: string }) {
  const numberValue = Number(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!numberValue || isNaN(numberValue)) {
      setDisplay(0);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(easeOut * numberValue));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [numberValue]);

  return <span>{formatNumber(display)}</span>;
}

/* -------- Main Component -------- */

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");

        if (!res.ok) throw new Error("Stats API failed");

        const data = await res.json();

        /* sanitize API response */
        const formatted: Stat[] = (data.data || []).map((s: any) => ({
        id: s.id,
        label: s.label,
        value: s.value,
        icon: s.icon ?? "trending",
        }));
        setStats(formatted);

      } catch (error) {
        console.error("Stats fetch error:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return null;
  if (!stats.length) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
            <Sparkles className="text-blue-600 w-4 h-4" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">
              Platform Stats
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Our Impact in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>

          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            Empowering the next generation of Indian talent with real opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const iconKey = stat.icon ?? "trending";
            const Icon = iconMap[iconKey] || TrendingUp;
            const style = colors[iconKey] || colors.trending;
            const bgGradient =
              gradientBackgrounds[iconKey] || gradientBackgrounds.trending;
            const numberGradient =
              numberGradients[iconKey] || numberGradients.trending;

            return (
              <div key={stat.id} className="group relative">
                <div className="relative p-8 rounded-3xl border-2 border-slate-200 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">

                    <div
                      className={`w-14 h-14 rounded-2xl border-2 ${style} flex items-center justify-center mb-6`}
                    >
                      <Icon size={26} strokeWidth={2.5} />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-5xl font-black tracking-tighter leading-none bg-gradient-to-r ${numberGradient} bg-clip-text text-transparent`}
                      >
                        <CountUp value={stat.value} />
                      </h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                        {stat.label}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
