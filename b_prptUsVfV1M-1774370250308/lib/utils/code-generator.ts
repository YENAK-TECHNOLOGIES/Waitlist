/**
 * Generate a unique, readable referral code
 * Format: 4 uppercase letters + 4 digits (e.g., ABCD1234)
 */
export function generateRandomCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'

  let code = ''

  // Generate 4 random letters
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  // Generate 4 random digits
  for (let i = 0; i < 4; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length))
  }

  return code
}

/**
 * Validate a referral code format
 */
export function isValidReferralCode(code: string): boolean {
  return /^[A-Z]{4}\d{4}$/.test(code)
}
