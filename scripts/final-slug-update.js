const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Copy the generateSlug function here (same as above)
function generateSlug(title, company, location) {
  let role = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(non-technical|technical|graduate|apprentice|entry-level|fresher|experienced|senior)\b/g, '')
    .replace(/\b(and|of|the|for|in|to|with|at|by|a|an)\b/g, '')
    .trim()
    .replace(/\s+/g, '-');
  
  let companyClean = company
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(pvt|ltd|private|limited|inc|corp|llp|llc|technologies|solutions|group|holdings)\b/g, '')
    .replace(/\bcom\b/g, '')
    .replace(/&/g, 'and')
    .trim()
    .replace(/\s+/g, '-');
  
  let locationClean = location
    .toLowerCase()
    .split(',')[0]
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(road|street|avenue|lane|drive|court|plaza|tower|block|sector|area|south|north|east|west|central|downtown|old|new|main|airport|mhel|branch|office)\b/g, '')
    .replace(/\b(remote|work-from-home|wfh)\b/g, 'remote')
    .trim()
    .replace(/\s+/g, '-');
  
  if (!locationClean || locationClean === '') {
    locationClean = location.toLowerCase().includes('remote') ? 'remote' : 'india';
  }
  
  const specialCompanies = {
    'bal raksha bharat': 'bal-raksha-bharat',
    'xl dynamics': 'xl-dynamics',
    'amp & co': 'amp-co',
    'goldman sachs': 'goldman-sachs',
    'manipal hospitals': 'manipal-hospitals',
  };
  
  for (const [key, value] of Object.entries(specialCompanies)) {
    if (companyClean.includes(key.replace(/ /g, '-'))) {
      companyClean = value;
      break;
    }
  }
  
  let slug = `${role}-${companyClean}-${locationClean}`;
  slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  const parts = slug.split('-');
  const uniqueParts = [];
  for (const part of parts) {
    if (!uniqueParts.includes(part) && part.length > 1) {
      uniqueParts.push(part);
    }
  }
  slug = uniqueParts.join('-');
  
  if (slug.length > 70) {
    const shortParts = slug.split('-');
    if (shortParts.length > 3) {
      slug = `${shortParts[0]}-${shortParts[1]}-${shortParts[shortParts.length - 1]}`;
    }
  }
  
  return slug.replace(/-$/, '');
}

async function updateAllSlugs() {
  console.log('🔍 Fetching all opportunities...');
  const opportunities = await prisma.opportunity.findMany();
  
  console.log(`📊 Found ${opportunities.length} opportunities\n`);
  
  let updatedCount = 0;
  
  for (const opp of opportunities) {
    const newSlug = generateSlug(opp.title, opp.company, opp.location);
    
    if (newSlug !== opp.slug) {
      // Check for duplicates
      let finalSlug = newSlug;
      let counter = 1;
      
      let existing = await prisma.opportunity.findFirst({
        where: {
          slug: finalSlug,
          id: { not: opp.id }
        }
      });
      
      while (existing) {
        finalSlug = `${newSlug}-${counter}`;
        existing = await prisma.opportunity.findFirst({
          where: {
            slug: finalSlug,
            id: { not: opp.id }
          }
        });
        counter++;
      }
      
      await prisma.opportunity.update({
        where: { id: opp.id },
        data: { slug: finalSlug }
      });
      
      console.log(`✅ Updated:`);
      console.log(`   Title: ${opp.title.substring(0, 50)}`);
      console.log(`   Before: ${opp.slug}`);
      console.log(`   After:  ${finalSlug}`);
      console.log('---');
      updatedCount++;
    }
  }
  
  console.log(`\n🎉 Updated ${updatedCount} slugs to final format!`);
  process.exit(0);
}

updateAllSlugs().catch(console.error);