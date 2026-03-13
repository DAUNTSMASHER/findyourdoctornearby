/**
 * Generates 3000 doctors, 300 articles, 300 info items.
 * Run: node scripts/generate-enriched-data.js
 * Output: src/lib/enriched/generated.ts (or .json)
 */

const fs = require("fs");
const path = require("path");

const FIRST_NAMES = [
  "Abu", "Fatima", "Karim", "Nasrin", "Hasan", "Ayesha", "Rahim", "Zara",
  "Omar", "Layla", "Yusuf", "Sana", "Ali", "Mariam", "Khalid", "Nadia",
  "Imran", "Sara", "Tariq", "Hana", "Rashid", "Amira", "Faisal", "Leila",
  "Ahmed", "Yasmin", "Bilal", "Zainab", "Javed", "Amina", "Salman", "Farida",
];

const LAST_NAMES = [
  "Rahman", "Ahmed", "Khan", "Hossain", "Ali", "Islam", "Chowdhury", "Akter",
  "Mahmud", "Haque", "Siddique", "Begum", "Mia", "Sultana", "Mollah", "Rahman",
];

const SPECIALIZATIONS = [
  "General Medicine", "Cardiology", "Pediatrics", "Dermatology", "Orthopedics",
  "Neurology", "Gastroenterology", "Psychiatry", "Ophthalmology", "ENT",
  "Gynecology", "Urology", "Rheumatology", "Pulmonology", "Endocrinology",
  "Nephrology", "Oncology", "General Practice", "Family Medicine",
];

const COUNTRIES = ["Bangladesh", "India", "Pakistan"];
const CITIES_BD = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];
const CITIES_IN = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad"];
const CITIES_PK = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Peshawar"];
const AREAS_BD = {
  Dhaka: ["Uttara", "Dhanmondi", "Gulshan", "Mirpur", "Bashundhara", "Banani", "Motijheel", "Mohakhali", "Farmgate", "Shyamoli", "Kamalapur", "Old Dhaka"],
  Chittagong: ["Agrabad", "GEC", "Oxygen", "Halishahar", "Patenga"],
  Sylhet: ["Zindabazar", "Uposhohor", "Amberkhana"],
  Rajshahi: ["Shaheb Bazar", "Boalia"],
  Khulna: ["Sonadanga", "Khalishpur"],
};
const AREAS_GENERIC = ["Medical", "Hospital", "Clinic", "Center", "Colony", "Block", "Sector"];
const AREA_COORDS = {
  Uttara: [23.87, 90.38],
  Dhanmondi: [23.75, 90.37],
  Gulshan: [23.78, 90.42],
  Mirpur: [23.80, 90.37],
  Bashundhara: [23.81, 90.42],
  Banani: [23.79, 90.41],
  Motijheel: [23.73, 90.42],
  Mohakhali: [23.78, 90.40],
  Farmgate: [23.75, 90.39],
  Shyamoli: [23.75, 90.37],
  Agrabad: [22.33, 91.82],
  Zindabazar: [24.90, 91.87],
};

const HOSPITALS = [
  "Medical College Hospital", "Square Hospital", "Apollo Hospital", "United Hospital",
  "Ibn Sina Hospital", "Labaid Hospital", "Popular Hospital", "City Hospital",
  "Community Health Center", "Private Clinic", "General Hospital",
];

const UNSPLASH_DOCTOR_IDS = [
  "1559839734-2b71ea197ec2", "1551076805-e1869033e561", "1612349317150-e413f6a5b16d",
  "1594824476967-48c8b964273f", "1622253692010-333f2da6031d", "1559839734-2b71ea197ec2",
];

function seed(i) {
  return (i * 9301 + 49297) % 233280;
}

function pick(arr, i) {
  return arr[seed(i) % arr.length];
}

function phone(i) {
  return "01" + String(seed(i) % 90000000 + 10000000);
}

function generateDoctors() {
  const doctors = [];
  let idx = 0;
  for (let c = 0; c < COUNTRIES.length; c++) {
    const country = COUNTRIES[c];
    const cities = country === "Bangladesh" ? CITIES_BD : country === "India" ? CITIES_IN : CITIES_PK;
    const count = country === "Bangladesh" ? 1500 : country === "India" ? 1000 : 500;
    for (let i = 0; i < count; i++) {
      idx++;
      const city = pick(cities, idx);
      const cityAreas = (country === "Bangladesh" && AREAS_BD[city]) || [];
      const area = cityAreas.length
        ? pick(cityAreas, idx + 1)
        : pick(AREAS_GENERIC, idx + 1) + " " + city;
      const spec = pick(SPECIALIZATIONS, idx + 2);
      const workplace = pick(HOSPITALS, idx + 3) + ", " + city;
      const baseCoords = AREA_COORDS[area] || (country === "Bangladesh" ? [23.7 + (seed(idx) % 30) / 100, 90.3 + (seed(idx + 1) % 20) / 100] : [28.5 + (seed(idx) % 10) / 10, 77 + (seed(idx) % 5) / 10]);
      doctors.push({
        id: String(idx),
        name: `Dr. ${pick(FIRST_NAMES, idx)} ${pick(LAST_NAMES, idx)}`,
        specialization: spec,
        workplace,
        phone: phone(idx),
        country,
        city,
        area,
        imageUrl: `https://images.unsplash.com/photo-${pick(UNSPLASH_DOCTOR_IDS, idx)}?w=200&h=200&fit=crop`,
        latitude: baseCoords[0] + (seed(idx) % 20 - 10) / 1000,
        longitude: baseCoords[1] + (seed(idx + 1) % 20 - 10) / 1000,
        distanceKm: 1 + (seed(idx) % 15),
        totalViews: 100 + seed(idx) % 5000,
        recommendationCount: 10 + seed(idx) % 200,
        transportOptions: [
          { mode: "car", label: "Car", timeMinutes: 5 + (seed(idx) % 30), cost: "৳50" },
          { mode: "transit", label: "Bus/CNG", timeMinutes: 10 + (seed(idx) % 40), cost: "৳20" },
          { mode: "bike", label: "Bike", timeMinutes: 8 + (seed(idx) % 35), cost: "৳15" },
          { mode: "walk", label: "Walk", timeMinutes: 15 + (seed(idx) % 60) },
        ],
      });
    }
  }
  return doctors;
}

const DISEASES = [
  "Fever", "Diarrhea", "Hypertension", "Diabetes", "Migraine", "Cold",
  "Stomach Pain", "Allergies", "Asthma", "Arthritis", "Anemia", "Acne",
  "Anxiety", "Bronchitis", "Back Pain", "Constipation", "Cough", "Dermatitis",
  "Eczema", "Fatigue", "Flu", "GERD", "Headache", "Insomnia", "Irritable Bowel",
];

const ARTICLE_TEMPLATES = [
  { title: "What to Do When You Have {disease}", content: "Rest, stay hydrated, and follow your doctor's advice. Monitor symptoms and seek medical help if they worsen." },
  { title: "Understanding {disease}: A Complete Guide", content: "{disease} affects many people. Early detection and proper management can improve outcomes significantly." },
  { title: "Home Remedies for {disease}", content: "Simple lifestyle changes and home care can help. Always consult a doctor for persistent symptoms." },
  { title: "When to See a Doctor for {disease}", content: "If symptoms persist beyond a few days or worsen, visit your healthcare provider promptly." },
  { title: "Preventing {disease}: Tips and Strategies", content: "A healthy diet, exercise, and regular check-ups can help reduce your risk of {disease}." },
];

const COVER_IDS = [
  "1584308666744-24d5c474f2ae", "1559757148-5c350d0d3c56", "1579684385127-1ef15d508118",
  "1576091160550-2173dba999ef", "1505751172876-fa1923c5c528", "1559757175-5700dde675bc",
  "1587854692152-cbe660dbde88",
];

function generateArticles() {
  const articles = [];
  for (let i = 0; i < 300; i++) {
    const disease = DISEASES[i % DISEASES.length];
    const tpl = ARTICLE_TEMPLATES[i % ARTICLE_TEMPLATES.length];
    const title = tpl.title.replace(/{disease}/g, disease);
    const content = tpl.content.replace(/{disease}/g, disease) + " " +
      "Maintain a balanced diet, get adequate sleep, and avoid stress. " +
      "Regular exercise and hydration support overall health.";
    articles.push({
      id: String(i + 1),
      title,
      disease,
      summary: `Practical guide for managing ${disease}. Learn when to seek help.`,
      content,
      coverImage: `https://images.unsplash.com/photo-${COVER_IDS[i % COVER_IDS.length]}?w=400&h=240&fit=crop`,
    });
  }
  return articles;
}

const TIP_TITLES = [
  "How to Improve Skin", "Best Foods for Health", "Healthy Sleep Habits", "Daily Stretching",
  "Stress Relief", "Balanced Diet", "Reduce Dark Circles", "Morning Hydration",
  "Boost Immunity", "Heart Health Tips", "Mental Wellness", "Eye Care",
  "Bone Health", "Digestive Health", "Weight Management", "Anti-Aging",
];
const TIP_CATEGORIES = ["Skin", "Diet", "Sleep", "Exercise", "Mental Health", "General"];

function generateTips() {
  const tips = [];
  for (let i = 0; i < 300; i++) {
    const cat = TIP_CATEGORIES[i % TIP_CATEGORIES.length];
    const title = TIP_TITLES[i % TIP_TITLES.length] + ` (${i + 1})`;
    tips.push({
      id: String(i + 1),
      title,
      category: cat,
      summary: `Practical health tips for ${cat.toLowerCase()}.`,
      content: "Maintain a healthy lifestyle with balanced diet, exercise, and adequate rest. Consult a healthcare provider for personalized advice.",
      coverImage: `https://images.unsplash.com/photo-${COVER_IDS[i % COVER_IDS.length]}?w=400&h=240&fit=crop`,
    });
  }
  return tips;
}

const INFO_TOPICS = [
  "smoking", "heart disease", "diabetes", "depression", "road accidents",
  "stroke", "cancer", "malaria", "obesity", "alcohol", "air pollution",
  "drowning", "suicide", "tuberculosis", "HIV", "malnutrition", "pneumonia",
];

function generateInfo() {
  const items = [];
  const baseStats = [
    { daily: 22000, monthly: 660000, yearly: 8000000 },
    { daily: 49000, monthly: 1500000, yearly: 17900000 },
    { daily: 4200, monthly: 125000, yearly: 1500000 },
    { daily: 0, monthly: 0, yearly: 280000000 },
    { daily: 3700, monthly: 110000, yearly: 1350000 },
    { daily: 16500, monthly: 500000, yearly: 6000000 },
    { daily: 27400, monthly: 820000, yearly: 10000000 },
    { daily: 1200, monthly: 36000, yearly: 430000 },
  ];
  for (let i = 0; i < 300; i++) {
    const topic = INFO_TOPICS[i % INFO_TOPICS.length] + (i >= INFO_TOPICS.length ? ` variant ${Math.floor(i / INFO_TOPICS.length)}` : "");
    const s = baseStats[i % baseStats.length];
    items.push({
      id: String(i + 1),
      topic: topic.replace(/\s+variant \d+$/, ""),
      keywords: [topic.split(" ")[0]],
      label: `deaths/affected by ${topic}`,
      unit: "people",
      daily: s.daily,
      monthly: s.monthly,
      yearly: s.yearly,
      summary: "Health statistics from global sources. Consult professionals for accurate information.",
    });
  }
  return items;
}

const dataDir = path.join(__dirname, "..", "data");
fs.mkdirSync(dataDir, { recursive: true });

const doctors = generateDoctors();
const articles = generateArticles();
const info = generateInfo();

const tips = generateTips();

fs.writeFileSync(path.join(dataDir, "doctors.json"), JSON.stringify(doctors));
fs.writeFileSync(path.join(dataDir, "articles.json"), JSON.stringify(articles));
fs.writeFileSync(path.join(dataDir, "info.json"), JSON.stringify(info));
fs.writeFileSync(path.join(dataDir, "tips.json"), JSON.stringify(tips));

console.log("Generated: 3000 doctors, 300 articles, 300 tips, 300 info items");
