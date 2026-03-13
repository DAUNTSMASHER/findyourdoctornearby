export interface Tip {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string;
}

export const tipCategories = ["Skin", "Diet", "Sleep", "Exercise", "Mental Health", "General"];

export const sampleTips: Tip[] = [
  {
    id: "1",
    title: "How to Improve Skin Colour Naturally",
    category: "Skin",
    summary: "Simple, natural ways to achieve a healthier, glowing complexion.",
    content: "Stay hydrated, eat foods rich in antioxidants (berries, leafy greens), protect from sun with SPF, get adequate sleep, and avoid smoking. Vitamin C serum can help brighten skin.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=240&fit=crop",
  },
  {
    id: "2",
    title: "Best Foods for Glowing Skin",
    category: "Skin",
    summary: "Foods that promote clear, radiant skin from within.",
    content: "Include fatty fish, avocados, walnuts, sunflower seeds, sweet potatoes, and green tea. These provide omega-3, vitamins E and C, and antioxidants.",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=240&fit=crop",
  },
  {
    id: "3",
    title: "Healthy Sleep Habits",
    category: "Sleep",
    summary: "Tips for better quality sleep and energy.",
    content: "Keep a consistent sleep schedule, avoid screens 1 hour before bed, keep your room cool and dark, and limit caffeine after 2 PM.",
    coverImage: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    title: "Daily Stretching Routine",
    category: "Exercise",
    summary: "A quick morning stretch to boost flexibility and energy.",
    content: "Spend 5–10 minutes stretching major muscle groups: neck, shoulders, back, hamstrings. Hold each stretch for 20–30 seconds.",
    coverImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    title: "Stress Relief Techniques",
    category: "Mental Health",
    summary: "Quick ways to calm your mind and body.",
    content: "Try deep breathing (4-7-8), short walks, listening to music, or 5 minutes of meditation. Stay connected with friends and family.",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=240&fit=crop",
  },
  {
    id: "6",
    title: "Balanced Diet Basics",
    category: "Diet",
    summary: "Simple rules for a nutritious daily diet.",
    content: "Eat a variety of fruits, vegetables, whole grains, and lean protein. Limit processed foods and sugar. Drink plenty of water.",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=240&fit=crop",
  },
  {
    id: "7",
    title: "Reduce Dark Circles",
    category: "Skin",
    summary: "Natural remedies for under-eye dark circles.",
    content: "Get enough sleep, stay hydrated, apply cold compresses, use caffeine-based eye creams, and ensure adequate iron and vitamin K.",
    coverImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=240&fit=crop",
  },
  {
    id: "8",
    title: "Morning Hydration Routine",
    category: "Diet",
    summary: "Start your day with proper hydration.",
    content: "Drink a glass of water as soon as you wake up. Add lemon or cucumber for flavour. Avoid sugary drinks in the morning.",
    coverImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=240&fit=crop",
  },
];
