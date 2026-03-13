/**
 * Maps user problem/symptom keywords to doctor specializations.
 * e.g. "cold" → doctors who treat cold/cough (General Medicine, ENT, etc.)
 */
export const problemToSpecializations: Record<string, string[]> = {
  cold: ["General Medicine", "ENT", "General Practice", "Pediatrics", "Pulmonology"],
  cough: ["General Medicine", "ENT", "Pulmonology", "Pediatrics"],
  fever: ["General Medicine", "Pediatrics", "General Practice", "Infectious Disease"],
  medicine: ["General Medicine", "General Practice", "Family Medicine"],
  heart: ["Cardiology", "General Medicine"],
  bone: ["Orthopedics", "Rheumatology"],
  skin: ["Dermatology"],
  child: ["Pediatrics"],
  children: ["Pediatrics"],
  gastric: ["Gastroenterology", "General Medicine"],
  stomach: ["Gastroenterology", "General Medicine"],
  eye: ["Ophthalmology"],
  mental: ["Psychiatry"],
  kidney: ["Nephrology"],
  cancer: ["Oncology"],
  diabetes: ["Endocrinology", "General Medicine"],
  thyroid: ["Endocrinology"],
  lung: ["Pulmonology"],
  allergy: ["ENT", "Dermatology", "General Medicine"],
};

export function getSpecializationsForProblem(problem: string): string[] | null {
  const q = problem.toLowerCase().trim();
  if (!q) return null;
  for (const [key, specs] of Object.entries(problemToSpecializations)) {
    if (q.includes(key) || key.includes(q)) return specs;
  }
  return null;
}

export function doctorMatchesProblem(doctorSpec: string, problem: string): boolean {
  const specs = getSpecializationsForProblem(problem);
  if (specs) {
    return specs.some((s) =>
      doctorSpec.toLowerCase().includes(s.toLowerCase())
    );
  }
  return doctorSpec.toLowerCase().includes(problem.toLowerCase());
}
