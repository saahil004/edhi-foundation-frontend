// A loose, international-friendly sanity check rather than strict
// per-country formatting rules — just enough to catch obvious mistakes
// (too short, letters, etc.) without rejecting real numbers.
export function isValidPhoneNumber(phone) {
  const digitsOnly = (phone || '').replace(/\D/g, '')
  return digitsOnly.length >= 7 && digitsOnly.length <= 14
}
