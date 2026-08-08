'use client';

import Link from 'next/link';

interface JobData {
  id: string;
  title: string;
  company: string;
  views: number;
  applyClicks: number;
}

interface TopJobsTablesProps {
  topViewed: JobData[];
  topApplied: JobData[];
}

export default function TopJobsTables({ topViewed, topApplied }: TopJobsTablesProps) {
  const renderTable = (data: JobData[], title: string) => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Apply Clicks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                    {job.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{job.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{job.applyClicks.toLocaleString()}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {renderTable(topViewed, 'Top 10 Viewed Jobs')}
      {renderTable(topApplied, 'Top 10 Applied Jobs')}
    </div>
  );
}