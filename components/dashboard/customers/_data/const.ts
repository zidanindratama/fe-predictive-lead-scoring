import { Option } from "@/components/ui/multi-select";

export const JOB_OPTIONS: Option[] = [
  { value: "admin", label: "Administrative" },
  { value: "blue-collar", label: "Blue Collar" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "housemaid", label: "Housemaid" },
  { value: "management", label: "Management" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "services", label: "Services" },
  { value: "student", label: "Student" },
  { value: "technician", label: "Technician" },
  { value: "unemployed", label: "Unemployed" },
];

export const MARITAL_OPTIONS: Option[] = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
];

export const EDUCATION_OPTIONS: Option[] = [
  { value: "basic.4y", label: "Elementary School (4y)" },
  { value: "basic.6y", label: "Elementary School (6y)" },
  { value: "basic.9y", label: "Middle School" },
  { value: "high.school", label: "High School" },
  { value: "illiterate", label: "Illiterate" },
  { value: "professional.course", label: "Professional Course" },
  { value: "university.degree", label: "University Degree" },
];

export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const CONTACT_OPTIONS: Option[] = [
  { value: "cellular", label: "Cellular" },
  { value: "telephone", label: "Telephone" },
];

export const POUTCOME_OPTIONS: Option[] = [
  { value: "nonexistent", label: "Nonexistent (New Lead)" },
  { value: "failure", label: "Failure" },
  { value: "success", label: "Success" },
];

export const MONTH_OPTIONS: Option[] = [
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];

export const DAY_OPTIONS: Option[] = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
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
