export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateSlug(title: string, company: string): string {
  const base = `${title}-${company}`.toLowerCase();
  const cleaned = base.replace(/[^a-z0-9]+/g, '-');
  const timestamp = Date.now();
  return `${cleaned}-${timestamp}`;
}