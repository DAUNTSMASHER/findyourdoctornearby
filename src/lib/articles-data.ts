export interface Article {
  id: string;
  title: string;
  disease: string;
  summary: string;
  content: string;
  coverImage: string;
}

export const sampleArticles: Article[] = [
  {
    id: "1",
    title: "What to Do When You Have Fever",
    disease: "Fever",
    summary: "Steps to manage fever at home and when to see a doctor.",
    content: "Rest, stay hydrated, take paracetamol if needed, use cool compresses. See a doctor if fever is above 103°F, lasts more than 3 days, or if you have severe symptoms.",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=240&fit=crop",
  },
  {
    id: "2",
    title: "What to Do When You Have Diarrhea",
    disease: "Diarrhea",
    summary: "How to treat diarrhea and prevent dehydration.",
    content: "Drink plenty of fluids (ORS, water, clear broths). Avoid dairy, fatty foods, and caffeine. Eat BRAT diet (banana, rice, applesauce, toast). See a doctor if it lasts more than 2 days or you have blood in stool.",
    coverImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=240&fit=crop",
  },
  {
    id: "3",
    title: "What to Do When You Have High Blood Pressure",
    disease: "Hypertension",
    summary: "Lifestyle and diet changes for blood pressure management.",
    content: "Reduce sodium, increase potassium-rich foods, exercise regularly, limit alcohol, manage stress, take prescribed medication. Monitor your BP and visit your doctor regularly.",
    coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    title: "What to Do When You Have Diabetes",
    disease: "Diabetes",
    summary: "Daily management and lifestyle tips for diabetics.",
    content: "Monitor blood sugar, follow a balanced diet, take medication as prescribed, exercise regularly, get enough sleep, and schedule regular check-ups. Avoid skipped meals.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    title: "What to Do When You Have Migraine",
    disease: "Migraine",
    summary: "Managing migraine attacks and triggers.",
    content: "Rest in a dark, quiet room. Use cold compresses. Take prescribed medication early. Avoid triggers: stress, lack of sleep, certain foods. Stay hydrated.",
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=240&fit=crop",
  },
  {
    id: "6",
    title: "What to Do When You Have Cold and Cough",
    disease: "Cold",
    summary: "Home remedies and when to seek medical help.",
    content: "Rest, drink warm fluids, use honey for cough, gargle with salt water. Use humidifier. See a doctor if symptoms last more than 10 days or you have high fever.",
    coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=240&fit=crop",
  },
  {
    id: "7",
    title: "What to Do When You Have Stomach Pain",
    disease: "Stomach Pain",
    summary: "First steps and when to get urgent care.",
    content: "Avoid solid food for a few hours. Sip water. Avoid dairy and spicy food. Rest. See a doctor if pain is severe, persistent, or you have vomiting, fever, or blood.",
    coverImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=240&fit=crop",
  },
  {
    id: "8",
    title: "What to Do When You Have Allergies",
    disease: "Allergies",
    summary: "Managing allergic reactions and prevention.",
    content: "Avoid known allergens. Use antihistamines as advised. Keep windows closed during high pollen. Use a mask if needed. See a doctor for severe reactions or if symptoms persist.",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=240&fit=crop",
  },
];
