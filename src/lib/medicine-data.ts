export interface Medicine {
  name: string;
  condition: string;
  country: string;
  states: string[];
  note?: string;
}

export const countriesWithStates: Record<string, string[]> = {
  Bangladesh: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"],
  India: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Punjab", "Gujarat"],
};

export const conditionKeywords: Record<string, string[]> = {
  gastric: ["gastric", "acidity", "acid", "heartburn", "stomach"],
  fever: ["fever", "pyrexia", "temperature"],
  headache: ["headache", "migraine", "pain"],
  cold: ["cold", "cough", "flu", "cold and cough"],
  allergy: ["allergy", "allergic"],
  pain: ["pain", "body pain", "joint pain"],
  diarrhea: ["diarrhea", "loose motion"],
};

export const medicines: Medicine[] = [
  // Bangladesh - Gastric
  { name: "Xeldrin", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"], note: "Common for gastric and acidity" },
  { name: "Omidon", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet"], note: "Gastric relief" },
  { name: "Fexo", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal"] },
  { name: "Pantoprazole", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"] },
  { name: "Omeprazole", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"] },
  { name: "Eno", condition: "gastric", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"], note: "Antacid" },
  // Bangladesh - Fever
  { name: "Napa", condition: "fever", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"] },
  { name: "Paracetamol", condition: "fever", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"] },
  { name: "Ace", condition: "fever", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet"] },
  // Bangladesh - Headache
  { name: "Napa Extend", condition: "headache", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"] },
  { name: "Sumo", condition: "headache", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet"] },
  { name: "Paracetamol", condition: "headache", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"] },
  // Bangladesh - Cold
  { name: "Fexo", condition: "cold", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"] },
  { name: "Histacin", condition: "cold", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet"] },
  { name: "Tuska", condition: "cold", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"], note: "For cough" },
  // Bangladesh - Diarrhea
  { name: "Orsaline", condition: "diarrhea", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"], note: "ORS" },
  { name: "Normix", condition: "diarrhea", country: "Bangladesh", states: ["Dhaka", "Chittagong", "Sylhet"] },
  // India - Gastric
  { name: "Gelusil", condition: "gastric", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"] },
  { name: "Digene", condition: "gastric", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Punjab", "Gujarat"] },
  { name: "Pantoprazole", condition: "gastric", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Punjab", "Gujarat"] },
  // India - Fever
  { name: "Dolo 650", condition: "fever", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Punjab", "Gujarat"] },
  { name: "Paracetamol", condition: "fever", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Punjab", "Gujarat"] },
  // India - Cold
  { name: "Covosil Plus", condition: "cold", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai"] },
  { name: "Benadryl", condition: "cold", country: "India", states: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"] },
];

export function findMedicines(
  conditionInput: string,
  country: string,
  state: string
): Medicine[] {
  if (!conditionInput.trim() || !country || !state) return [];

  const q = conditionInput.toLowerCase().trim();

  for (const [condition, keywords] of Object.entries(conditionKeywords)) {
    if (keywords.some((k) => q.includes(k) || k.includes(q))) {
      return medicines.filter(
        (m) =>
          m.condition === condition &&
          m.country.toLowerCase() === country.toLowerCase() &&
          m.states.some((s) => s.toLowerCase() === state.toLowerCase())
      );
    }
  }

  return medicines.filter(
    (m) =>
      (m.condition.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)) &&
      m.country.toLowerCase() === country.toLowerCase() &&
      m.states.some((s) => s.toLowerCase() === state.toLowerCase())
  );
}
