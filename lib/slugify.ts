export function generateSlug(title: string, company: string, location: string): string {
  // Step 1: Clean the role (keep only essential words)
  let role = title
    .toLowerCase()
    // Remove special characters
    .replace(/[^a-z0-9\s]/g, '')
    // Remove filler words
    .replace(/\b(non-technical|technical|graduate|apprentice|entry-level|fresher|experienced|senior)\b/g, '')
    .replace(/\b(and|of|the|for|in|to|with|at|by|a|an)\b/g, '')
    // Remove duplicate spaces
    .trim()
    .replace(/\s+/g, '-');
  
  // Step 2: Clean company name (keep the brand, remove legal suffixes)
  let companyClean = company
    .toLowerCase()
    // Remove special characters
    .replace(/[^a-z0-9\s]/g, '')
    // Remove legal suffixes
    .replace(/\b(pvt|ltd|private|limited|inc|corp|llp|llc|technologies|solutions|group|holdings)\b/g, '')
    // Remove .com
    .replace(/\bcom\b/g, '')
    // Replace & with and
    .replace(/&/g, 'and')
    .trim()
    .replace(/\s+/g, '-');
  
  // Step 3: Clean location (city only, no extras)
  let locationClean = location
    .toLowerCase()
    // Take first part before comma
    .split(',')[0]
    // Remove special characters
    .replace(/[^a-z0-9\s]/g, '')
    // Remove extra location words
    .replace(/\b(road|street|avenue|lane|drive|court|plaza|tower|block|sector|area|south|north|east|west|central|downtown|old|new|main|airport|mhel|branch|office)\b/g, '')
    // Handle remote
    .replace(/\b(remote|work-from-home|wfh)\b/g, 'remote')
    .trim()
    .replace(/\s+/g, '-');
  
  // If location is empty, use 'india' or 'remote'
  if (!locationClean || locationClean === '') {
    locationClean = location.toLowerCase().includes('remote') ? 'remote' : 'india';
  }
  
  // Step 4: Handle special cases for specific companies
  const specialCompanies: { [key: string]: string } = {
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
  
  // Step 5: Combine: role-company-location
  let slug = `${role}-${companyClean}-${locationClean}`;
  
  // Step 6: Remove duplicate hyphens
  slug = slug.replace(/-+/g, '-');
  
  // Step 7: Remove leading/trailing hyphens
  slug = slug.replace(/^-|-$/g, '');
  
  // Step 8: Remove duplicate words in slug
  const parts = slug.split('-');
  const uniqueParts: string[] = [];
  for (const part of parts) {
    if (!uniqueParts.includes(part) && part.length > 1) {
      uniqueParts.push(part);
    }
  }
  slug = uniqueParts.join('-');
  
  // Step 9: Limit length to 70 characters
  if (slug.length > 70) {
    const shortParts = slug.split('-');
    if (shortParts.length > 3) {
      // Keep: role (first) + company (second) + location (last)
      slug = `${shortParts[0]}-${shortParts[1]}-${shortParts[shortParts.length - 1]}`;
    } else if (slug.length > 70) {
      slug = slug.substring(0, 70);
    }
  }
  
  // Step 10: Final cleanup - remove trailing hyphens
  slug = slug.replace(/-$/, '');
  
  return slug;
}

// Function to get URL for an opportunity
export function getOpportunityUrl(type: string, slug: string): string {
  const basePath = type === 'job' ? 'jobs' : 'internships';
  return `/${basePath}/${slug}`;
}
