import validator from 'validator';

export function sanitizeInput(value) {
  if (typeof value !== "string") return "";
  return validator.escape(value.trim());
}

export function sanitizeEmail(value) {
  if (typeof value !== "string") return "";
  return validator.normalizeEmail(value.trim()) || "";
}

export function isStrongPassword(password) {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}