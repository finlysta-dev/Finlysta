const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const fixes = [
  {
    old: 'finance-analyst-trainee-nontechnical-cisco-bangalore',
    new: 'finance-analyst-trainee-cisco-bangalore'
  },
  {
    old: 'internfresher-finance-webvillee-indore',
    new: 'intern-finance-webvillee-indore'
  },
  {
    old: 'intern-accounts-finance-offineedscom-bangalore',
    new: 'intern-accounts-finance-offineeds-bangalore'
  }
];

async function applyFixes() {
  console.log('🔧 Applying final slug fixes...\n');
  
  for (const fix of fixes) {
    const result = await prisma.opportunity.updateMany({
      where: { slug: fix.old },
      data: { slug: fix.new }
    });
    
    if (result.count > 0) {
      console.log(`✅ Fixed: ${fix.old}`);
      console.log(`   → ${fix.new}\n`);
    } else {
      console.log(`⚠️ Not found: ${fix.old}\n`);
    }
  }
  
  console.log('🎉 All final fixes applied!');
  process.exit(0);
}

applyFixes().catch(console.error);