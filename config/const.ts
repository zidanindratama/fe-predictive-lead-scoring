export const PLACEHOLDER_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

export const BANK_JOBS = [
  "admin.",
  "blue-collar",
  "entrepreneur",
  "housemaid",
  "management",
  "retired",
  "self-employed",
  "services",
  "student",
  "technician",
  "unemployed",
  "unknown",
] as const;

export const BANK_MARITAL = [
  "divorced",
  "married",
  "single",
  "unknown",
] as const;

export const BANK_EDUCATION = [
  "basic.4y",
  "basic.6y",
  "basic.9y",
  "high.school",
  "illiterate",
  "professional.course",
  "university.degree",
  "unknown",
] as const;

export const BANK_DEFAULT = ["yes", "no", "unknown"] as const;
export const BANK_HOUSING = ["yes", "no", "unknown"] as const;
export const BANK_LOAN = ["yes", "no", "unknown"] as const;
export const BANK_CONTACT = ["cellular", "telephone"] as const;
export const BANK_POUTCOME = ["failure", "nonexistent", "success"] as const;
