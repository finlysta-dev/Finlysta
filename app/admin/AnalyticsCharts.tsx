"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

// Define proper types for the chart data
interface ChartDataPoint {
  date: string;
  users?: number;
  applications?: number;
  internships?: number;
}

interface AnalyticsChartsProps {
  userData: ChartDataPoint[];
  appData: ChartDataPoint[];
  internshipData: ChartDataPoint[];
}

export default function AnalyticsCharts({ 
  userData, 
  appData, 
  internshipData 
}: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* User Growth */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">User Growth (30 days)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={userData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Application Growth */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Applications Growth (30 days)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={appData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Internship Posting Trend */}
      <div className="bg-white border rounded-xl p-6 lg:col-span-2">
        <h2 className="font-semibold mb-4">Internships Posted (30 days)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={internshipData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="internships"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}