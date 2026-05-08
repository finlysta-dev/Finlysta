import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string, company: string, location: string): string {
  const cleanCompany = company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cleanLocation = location.toLowerCase().split(',')[0].replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  let slug = `${cleanCompany}-${cleanTitle}-${cleanLocation}`;
  slug = slug.replace(/-+/g, '-');
  
  if (slug.length > 90) {
    slug = slug.substring(0, 90).replace(/-$/, '');
  }
  
  return slug;
}

async function fixSlugs() {
  const opportunities = await prisma.opportunity.findMany();
  
  for (const opp of opportunities) {
    const newSlug = generateSlug(opp.title, opp.company, opp.location);
    
    // Check if slug exists
    let finalSlug = newSlug;
    let counter = 1;
    
    while (true) {
      const existing = await prisma.opportunity.findFirst({
        where: {
          slug: finalSlug,
          id: { not: opp.id }
        }
      });
      if (!existing) break;
      finalSlug = `${newSlug}-${counter}`;
      counter++;
    }
    
    if (finalSlug !== opp.slug) {
      await prisma.opportunity.update({
        where: { id: opp.id },
        data: { slug: finalSlug }
      });
      console.log(`✅ Fixed: ${opp.title} -> ${finalSlug}`);
    }
  }
  
  console.log('🎉 All slugs fixed!');
}

fixSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());