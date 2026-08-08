export function exportToExcel(data: any, startDate: Date | null, endDate: Date | null) {
  try {
    // Format date for filename
    const dateStr = new Date().toISOString().split('T')[0];
    let filename = `analytics-report-${dateStr}`;
    
    if (startDate && endDate) {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      filename = `analytics-${start}-to-${end}`;
    }

    // Create CSV content
    let csvContent = '';

    // Headers
    csvContent += 'Finlysta Analytics Report\n';
    csvContent += `Generated on: ${new Date().toLocaleString('en-IN')}\n\n`;

    // Metrics Summary
    csvContent += 'METRICS SUMMARY\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Visitors,${data.metrics.totalVisitors}\n`;
    csvContent += `Unique Visitors,${data.metrics.uniqueVisitors}\n`;
    csvContent += `Job Views,${data.metrics.jobViews}\n`;
    csvContent += `Apply Clicks,${data.metrics.applyClicks}\n`;
    csvContent += `Active Jobs,${data.metrics.activeJobs}\n`;
    csvContent += `Active Internships,${data.metrics.activeInternships}\n`;
    csvContent += `Total Opportunities,${data.metrics.totalOpportunities}\n`;
    csvContent += `Added Today,${data.metrics.addedToday}\n`;
    csvContent += `Added This Week,${data.metrics.addedThisWeek}\n\n`;

    // Top Viewed Jobs
    csvContent += 'TOP 10 VIEWED JOBS\n';
    csvContent += 'Rank,Title,Company,Views,Apply Clicks\n';
    data.topViewedJobs.forEach((job: any, index: number) => {
      csvContent += `${index + 1},"${job.title}","${job.company}",${job.views},${job.applyClicks}\n`;
    });
    csvContent += '\n';

    // Top Applied Jobs
    csvContent += 'TOP 10 APPLIED JOBS\n';
    csvContent += 'Rank,Title,Company,Views,Apply Clicks\n';
    data.topAppliedJobs.forEach((job: any, index: number) => {
      csvContent += `${index + 1},"${job.title}","${job.company}",${job.views},${job.applyClicks}\n`;
    });
    csvContent += '\n';

    // Daily Metrics
    if (data.dailyMetrics && data.dailyMetrics.length > 0) {
      csvContent += 'DAILY METRICS\n';
      csvContent += 'Date,Total Visitors,Unique Visitors,Job Views,Apply Clicks,New Jobs\n';
      data.dailyMetrics.forEach((metric: any) => {
        const date = new Date(metric.date).toLocaleDateString('en-IN');
        csvContent += `${date},${metric.totalVisitors},${metric.uniqueVisitors},${metric.jobViews},${metric.applyClicks},${metric.addedToday}\n`;
      });
    }

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('✅ Excel/CSV exported successfully');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Failed to export data. Please try again.');
  }
}