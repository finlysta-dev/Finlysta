import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to generate avatar URL
function generateAvatarUrl(name: string): string {
  // Encode the name for URL
  const encodedName = encodeURIComponent(name);
  // Use a default nice blue color
  const backgroundColor = '4F46E5';
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${backgroundColor}&color=fff&bold=true&size=128&rounded=true`;
}

async function fixAvatars() {
  try {
    console.log('🚀 Starting avatar fix...\n');
    
    // Get all users
    const users = await prisma.user.findMany();
    console.log(`📊 Found ${users.length} total users\n`);
    
    let updated = 0;
    let skipped = 0;
    
    for (const user of users) {
      // Check if user already has an image
      if (!user.image) {
        // Generate avatar using name or email
        const nameToUse = user.name || user.email?.split('@')[0] || 'User';
        const avatarUrl = generateAvatarUrl(nameToUse);
        
        // Update user with avatar
        await prisma.user.update({
          where: { id: user.id },
          data: { image: avatarUrl },
        });
        
        console.log(`✅ Updated: ${user.name || user.email} -> ${avatarUrl}`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: ${user.name || user.email} (already has avatar)`);
        skipped++;
      }
    }
    
    console.log(`\n✨ Done! Updated: ${updated}, Skipped: ${skipped}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAvatars();
