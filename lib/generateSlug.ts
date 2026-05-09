export function generateCleanSlug(title: string, company: string, location: string): string {
  // 1. Clean role - keep only essential words
  let role = title
    .toLowerCase()
    // Remove special characters
    .replace(/[^a-z0-9\s]/g, '')
    // Remove redundant words
    .replace(/\b(non-technical|technical|graduate|apprentice|entry-level|fresher|experienced)\b/g, '')
    .replace(/\b(and|of|the|for|in|to|with|at|by)\b/g, '')
    // Keep only first 3-4 meaningful words
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 4)
    .join('-');
  
  // 2. Clean company - remove legal suffixes only
  let companyClean = company
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(pvt|ltd|private|limited|inc|corp|llp|llc|technologies|solutions|group|holdings|com)\b/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // 3. Clean location - city only (no street/area/road)
  let locationClean = location
    .toLowerCase()
    .split(',')[0] // Take first part only
    .split('-')[0] // Remove hyphens
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(road|street|avenue|lane|drive|court|plaza|tower|block|sector|area|south|north|east|west|central|downtown)\b/g, '')
    .trim()
    .replace(/\s+/g, '-');
  
  // Handle remote/international
  if (locationClean.includes('remote') || locationClean === '') {
    locationClean = 'remote';
  }
  
  if (companyClean === '' && company.length > 0) {
    // Fallback: take first 15 chars of company
    companyClean = company.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 15);
  }
  
  // 4. Combine: role-company-location
  let slug = `${role}-${companyClean}-${locationClean}`;
  
  // 5. Remove duplicate hyphens
  slug = slug.replace(/-+/g, '-');
  
  // 6. Remove leading/trailing hyphens
  slug = slug.replace(/^-|-$/g, '');
  
  // 7. Final length check (max 60 chars for optimal SEO)
  if (slug.length > 60) {
    const parts = slug.split('-');
    if (parts.length > 3) {
      // Keep: role (first) + company (second) + location (last)
      slug = `${parts[0]}-${parts[1]}-${parts[parts.length - 1]}`;
    } else if (parts.length === 3) {
      // Shorten each part
      slug = `${parts[0].substring(0, 15)}-${parts[1].substring(0, 15)}-${parts[2].substring(0, 15)}`;
    }
    // Remove trailing hyphens again
    slug = slug.replace(/-$/, '');
  }
  
  return slug;
}

// Function to clean existing slugs
export function cleanExistingSlug(slug: string): string {
  let cleaned = slug;
  
  // Remove IDs and hashes
  cleaned = cleaned.replace(/-\d{10,}$/, '');
  cleaned = cleaned.replace(/-\d+$/, '');
  cleaned = cleaned.replace(/-[a-f0-9]{7,}$/, '');
  
  // Remove dates
  cleaned = cleaned.replace(/-\d{4}-\d{2}$/, '');
  cleaned = cleaned.replace(/-\d{4}$/, '');
  
  // Remove experience patterns
  cleaned = cleaned.replace(/-\d+-\d+-years?$/, '');
  cleaned = cleaned.replace(/-\d+-\d+-months?$/, '');
  
  // Remove filler words
  const fillerWords = ['non-technical', 'technical', 'graduate', 'apprentice', 'entry-level', 'fresher'];
  fillerWords.forEach(word => {
    cleaned = cleaned.replace(new RegExp(`-${word}-`, 'g'), '-');
    cleaned = cleaned.replace(new RegExp(`-${word}$`), '');
  });
  
  // Remove "com" from company names
  cleaned = cleaned.replace(/-com-/, '-');
  cleaned = cleaned.replace(/-com$/, '');
  
  // Remove location extras
  const locationExtras = ['road', 'street', 'airport', 'south', 'north', 'east', 'west', 'old'];
  locationExtras.forEach(extra => {
    cleaned = cleaned.replace(new RegExp(`-${extra}-`, 'g'), '-');
    cleaned = cleaned.replace(new RegExp(`-${extra}$`), '');
  });
  
  // Remove duplicate hyphens
  cleaned = cleaned.replace(/-+/g, '-');
  
  // Remove trailing hyphens
  cleaned = cleaned.replace(/-$/, '');
  
  return cleaned;
}