const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSlugs() {
  const opportunities = await prisma.opportunity.findMany({
    select: {
      id: true,
      title: true,
      company: true,
      slug: true,
    }
  });
  
  console.log('\n📋 CURRENT SLUGS:\n');
  console.log('='.repeat(80));
  
  opportunities.forEach(opp => {
    console.log(`\nTitle: ${opp.title.substring(0, 50)}`);
    console.log(`Company: ${opp.company}`);
    console.log(`Slug: ${opp.slug}`);
    console.log('-'.repeat(40));
  });
  
  console.log(`\n✅ Total: ${opportunities.length} opportunities`);
  
  process.exit(0);
}

checkSlugs().catch(console.error);