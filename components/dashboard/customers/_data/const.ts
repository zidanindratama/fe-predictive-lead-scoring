export type Option = {
  label: string;
  value: string;
  disable?: boolean;
};

export const JOB_OPTIONS: Option[] = [
  { value: "admin.", label: "Administrative" },
  { value: "blue-collar", label: "Blue Collar" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "housemaid", label: "Housemaid" },
  { value: "management", label: "Management" },
  { value: "retired", label: "Retired" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "services", label: "Services" },
  { value: "student", label: "Student" },
  { value: "technician", label: "Technician" },
  { value: "unemployed", label: "Unemployed" },
  { value: "unknown", label: "Unknown" },
];

export const EDUCATION_OPTIONS: Option[] = [
  { value: "basic.4y", label: "Basic Education (4 Years)" },
  { value: "basic.6y", label: "Basic Education (6 Years)" },
  { value: "basic.9y", label: "Basic Education (9 Years)" },
  { value: "high.school", label: "High School" },
  { value: "illiterate", label: "Illiterate" },
  { value: "professional.course", label: "Professional Course" },
  { value: "university.degree", label: "University Degree" },
  { value: "unknown", label: "Unknown" },
];

export const MARITAL_OPTIONS: Option[] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "unknown", label: "Unknown" },
];

export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Unknown" },
];

export const CONTACT_OPTIONS: Option[] = [
  { value: "cellular", label: "Cellular" },
  { value: "telephone", label: "Telephone" },
];

export const POUTCOME_OPTIONS: Option[] = [
  { value: "nonexistent", label: "Nonexistent" },
  { value: "failure", label: "Failure" },
  { value: "success", label: "Success" },
];

export const mapValuesToOptions = (
  values: string[],
  optionsSource: Option[]
): Option[] => {
  return values.map((v) => {
    const found = optionsSource.find((opt) => opt.value === v);
    return found || { label: v, value: v };
  });
};