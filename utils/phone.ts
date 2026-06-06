/**
 * Format a Ugandan phone number to E.164 format for Supabase auth
 * @param phone - Phone number in various formats (e.g., "0771234567", "771234567", "+256771234567")
 * @returns Formatted phone number in E.164 format (e.g., "+256771234567")
 */
export function formatPhoneForAuth(phone: string): string {
  // Remove all spaces, dashes, and parentheses
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If it already starts with +256, return as is
  if (cleaned.startsWith('+256')) {
    return cleaned;
  }
  
  // If it starts with 256, add the +
  if (cleaned.startsWith('256')) {
    return '+' + cleaned;
  }
  
  // If it starts with 0, replace with +256
  if (cleaned.startsWith('0')) {
    return '+256' + cleaned.substring(1);
  }
  
  // Otherwise, assume it's missing the country code
  return '+256' + cleaned;
}

/**
 * Format a phone number for display
 * @param phone - Phone number in E.164 format (e.g., "+256771234567")
 * @returns Formatted phone number for display (e.g., "+256 771 234 567")
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Format as +256 XXX XXX XXX
  if (cleaned.startsWith('+256') && cleaned.length === 13) {
    return `+256 ${cleaned.substring(4, 7)} ${cleaned.substring(7, 10)} ${cleaned.substring(10)}`;
  }
  
  return phone;
}

/**
 * Validate if a phone number is a valid Ugandan number
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export function isValidUgandanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Check if it matches Ugandan phone patterns
  // Valid patterns: 0XXXXXXXXX (10 digits), 256XXXXXXXXX (12 digits), +256XXXXXXXXX (13 chars)
  const patterns = [
    /^0[7][0-9]{8}$/, // 0XXXXXXXXX
    /^256[7][0-9]{8}$/, // 256XXXXXXXXX
    /^\+256[7][0-9]{8}$/, // +256XXXXXXXXX
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}
