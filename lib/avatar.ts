// Generate a consistent color based on name
export function getAvatarColor(name: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7B05E', '#6C5B7B', '#F08A5D',
    '#B83B5E', '#2F5D62', '#5E8B7E', '#A7C4BC', '#DF5E5E',
    '#2C3A47', '#D6A2A2', '#6C9EBF', '#E8A87C', '#C38D9E'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Generate initials from name
export function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

// Generate a random avatar using UI Avatars API
export function getRandomAvatar(name: string): string {
  const color = getAvatarColor(name).replace('#', '');
  const initials = getInitials(name);
  return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&bold=true&size=128&rounded=true`;
}

// Get user avatar with priority:
// 1. User's uploaded image
// 2. OAuth provider image (Google/GitHub)
// 3. Generated avatar based on name
export function getUserAvatar(user: {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}): string {
  // Priority 1: User's uploaded image
  if (user.image && user.image.startsWith('http')) {
    return user.image;
  }
  
  // Priority 2: Generated avatar from name
  if (user.name) {
    return getRandomAvatar(user.name);
  }
  
  // Priority 3: Generated avatar from email
  if (user.email) {
    const nameFromEmail = user.email.split('@')[0];
    return getRandomAvatar(nameFromEmail);
  }
  
  // Fallback: Default avatar
  return 'https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff&bold=true&size=128&rounded=true';
}