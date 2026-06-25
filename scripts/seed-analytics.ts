import { prisma } from '../lib/prisma';

async function seedAnalytics() {
  console.log('🌱 Seeding analytics data...');

  try {
    // Create a test visitor
    const visitor = await prisma.analyticsVisitor.create({
      data: {
        visitorId: 'test-visitor-001',
        isInternal: false,
        userAgent: 'Mozilla/5.0 (Test Browser)',
        ipAddress: '127.0.0.1',
      },
    });

    console.log('✅ Created test visitor:', visitor.id);

    // Add some page views
    const pages = ['/jobs', '/', '/internships', '/jobs/finance-analyst'];
    for (const page of pages) {
      await prisma.analyticsPageView.create({
        data: {
          visitorId: visitor.id,
          path: page,
          referrer: 'https://google.com',
        },
      });
    }
    console.log('✅ Added page views');

    // Add some job views (using a real job ID from your database)
    // First, get a real job ID
    const job = await prisma.job.findFirst({
      where: { status: 'approved' },
      select: { id: true },
    });

    if (job) {
      // Add job views
      for (let i = 0; i < 5; i++) {
        await prisma.analyticsJobView.create({
          data: {
            jobId: job.id,
            visitorId: visitor.id,
          },
        });
      }
      console.log('✅ Added job views');

      // Add apply clicks
      for (let i = 0; i < 3; i++) {
        await prisma.analyticsApplyClick.create({
          data: {
            jobId: job.id,
            visitorId: visitor.id,
          },
        });
      }
      console.log('✅ Added apply clicks');
    } else {
      console.log('⚠️ No approved jobs found to add test data');
    }

    console.log('🎉 Analytics seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding analytics:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAnalytics();