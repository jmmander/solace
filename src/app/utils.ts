/**
 * Formats a phone number string into a readable format
 * 
 * Examples:
 * - 1234567890 becomes (123) 456-7890
 * - 123-456-7890 becomes (123) 456-7890
 * - (123)456-7890 becomes (123) 456-7890
 * 
 * @param phoneNumber The phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber?: string): string {
    if (!phoneNumber) return ""
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if the input is valid
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    // If the phone number is not 10 digits, return the original number
    return phoneNumber;
  }