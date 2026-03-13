export type Locale = "en" | "bn" | "hi" | "ur";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
  hi: "हिन्दी",
  ur: "اردو",
};

export const countryToLocales: Record<string, Locale[]> = {
  BD: ["bn", "en"],
  IN: ["hi", "en"],
  PK: ["ur", "en"],
};

export interface Translations {
  nav: {
    home: string;
    medicine: string;
    articles: string;
    tips: string;
    know: string;
  };
  brand: {
    findYour: string;
    doctorNearby: string;
  };
  home: {
    topDoctors: string;
    nearLocation: string;
    withinRadius: string;
    mile: string;
    problemSymptom: string;
    country: string;
    city: string;
    area: string;
    radius: string;
    searchNow: string;
      foundDoctors: string;
      noDoctorsFound: string;
      previous: string;
    next: string;
    page: string;
    of: string;
      seeLocationMap: string;
      call: string;
      bookAppointment: string;
    recommendDoctor: string;
    recommended: string;
    fromYourLocation: string;
    views: string;
    recommendations: string;
    bestWayToGo: string;
    transport: string;
    time: string;
    cost: string;
    best: string;
  };
  medicine: {
    title: string;
    subtitle: string;
    needMedicineFor: string;
    conditionPlaceholder: string;
    selectCountry: string;
    selectState: string;
    findMedicine: string;
    availableIn: string;
    for: string;
    noMedicinesFound: string;
    tryConditions: string;
  };
  articles: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    diseaseGuides: string;
    whatToDo: string;
    tapToRead: string;
    tapToCollapse: string;
    noArticlesFound: string;
  };
  tips: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    topTips: string;
    noTipsFound: string;
  };
  doYouKnow: {
    title: string;
    subtitle: string;
    question: string;
    showStatistics: string;
    daily: string;
    monthly: string;
    yearly: string;
    noMatchFound: string;
  };
  disclaimer: {
    title: string;
    text: string;
    compact: string;
    close: string;
  };
    crawl: {
      realTimeInfo: string;
      doctorsFromGoogle: string;
      getRealTimeInfo: string;
    loading: string;
    noResults: string;
    error: string;
    noApiConfigured: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: "Home",
      medicine: "Medicine",
      articles: "Articles",
      tips: "Tips",
      know: "Know",
    },
    brand: { findYour: "Find Your", doctorNearby: "Doctor Nearby" },
    home: {
      topDoctors: "Top Doctors",
      nearLocation: "Near",
      withinRadius: "within radius of",
      mile: "mile",
      problemSymptom: "Problem / Symptom",
      country: "Country",
      city: "City",
      area: "Area",
      radius: "Radius",
      searchNow: "Search Now",
      foundDoctors: "We have Found {count} doctors near your area",
      noDoctorsFound: "No doctors found. Try adjusting your search filters.",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      seeLocationMap: "See location at Map",
      call: "Call",
      bookAppointment: "Book appointment",
      recommendDoctor: "Recommend this doctor",
      recommended: "Recommended",
      fromYourLocation: "from your location",
      views: "views",
      recommendations: "recommendations",
      bestWayToGo: "Best way to go from your location",
      transport: "Transport",
      time: "Time",
      cost: "Cost",
      best: "Best",
    },
    medicine: {
      title: "Find Medicine",
      subtitle: "Get basic medicine suggestions by condition, country and state",
      needMedicineFor: "I need medicine for",
      conditionPlaceholder: "e.g. gastric, fever, headache, cold",
      selectCountry: "Select country",
      selectState: "Select state",
      findMedicine: "Find Medicine",
      availableIn: "Available in",
      for: "For",
      noMedicinesFound: "No medicines found",
      tryConditions: "Try: gastric, fever, headache, cold, diarrhea",
    },
    articles: {
      title: "Health Articles",
      subtitle: "What to do in case of common diseases and health issues",
      searchPlaceholder: "Search articles...",
      diseaseGuides: "Disease Guides",
      whatToDo: "What to do:",
      tapToRead: "Tap to read more",
      tapToCollapse: "Tap to collapse",
      noArticlesFound: "No articles found",
    },
    tips: {
      title: "Health Tips",
      subtitle: "Simple ways to improve your health and wellness",
      searchPlaceholder: "Search tips...",
      topTips: "Top Tips",
      noTipsFound: "No tips found",
    },
    doYouKnow: {
      title: "Do You Know?",
      subtitle: "How many are affected — discover the numbers",
      question: "Do you know how many are affected by",
      showStatistics: "Show Statistics",
      daily: "daily",
      monthly: "monthly",
      yearly: "yearly",
      noMatchFound: "No match found",
    },
    disclaimer: {
      title: "Disclaimer",
      text: "I am not a doctor. This information is for reference only. Please consult a nearby doctor for clear medication and proper medical advice before taking any treatment.",
      compact: "Not medical advice. Consult a nearby doctor for proper medication and treatment.",
      close: "Close",
    },
    crawl: {
      realTimeInfo: "Real-time information",
      doctorsFromGoogle: "Doctors from Google",
      getRealTimeInfo: "Get real-time info",
      loading: "Searching the web...",
      noResults: "No results found.",
      error: "Could not fetch. Try again.",
      noApiConfigured: "Search API not configured.",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      medicine: "ওষুধ",
      articles: "আর্টিকেল",
      tips: "টিপস",
      know: "জানুন",
    },
    brand: { findYour: "খুঁজুন আপনার", doctorNearby: "কাছের ডাক্তার" },
    home: {
      topDoctors: "শীর্ষ ডাক্তার",
      nearLocation: "কাছে",
      withinRadius: "এর মধ্যে",
      mile: "মাইল",
      problemSymptom: "সমস্যা / লক্ষণ",
      country: "দেশ",
      city: "শহর",
      area: "এলাকা",
      radius: "ব্যাসার্ধ",
      searchNow: "খুঁজুন",
      foundDoctors: "আমরা আপনার অঞ্চলে {count} জন ডাক্তার পেয়েছি",
      noDoctorsFound: "কোন ডাক্তার পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করে চেষ্টা করুন।",
      previous: "আগে",
      next: "পরবর্তী",
      page: "পৃষ্ঠা",
      of: "/",
      seeLocationMap: "ম্যাপে দেখুন",
      call: "কল করুন",
      bookAppointment: "অ্যাপয়েন্টমেন্ট বুক করুন",
      recommendDoctor: "ডাক্তার সুপারিশ করুন",
      recommended: "সুপারিশকৃত",
      fromYourLocation: "আপনার অবস্থান থেকে",
      views: "দর্শন",
      recommendations: "সুপারিশ",
      bestWayToGo: "যাওয়ার সেরা উপায়",
      transport: "পরিবহন",
      time: "সময়",
      cost: "খরচ",
      best: "সেরা",
    },
    medicine: {
      title: "ওষুধ খুঁজুন",
      subtitle: "অবস্থা, দেশ ও অঞ্চল অনুযায়ী ওষুধের পরামর্শ",
      needMedicineFor: "আমার প্রয়োজন",
      conditionPlaceholder: "যেমন গ্যাস্ট্রিক, জ্বর, মাথাব্যথা",
      selectCountry: "দেশ নির্বাচন করুন",
      selectState: "অঞ্চল নির্বাচন করুন",
      findMedicine: "ওষুধ খুঁজুন",
      availableIn: "পাওয়া যাবে",
      for: "জন্য",
      noMedicinesFound: "কোন ওষুধ পাওয়া যায়নি",
      tryConditions: "চেষ্টা করুন: গ্যাস্ট্রিক, জ্বর, মাথাব্যথা",
    },
    articles: {
      title: "স্বাস্থ্য আর্টিকেল",
      subtitle: "রোগের ক্ষেত্রে কি করবেন",
      searchPlaceholder: "আর্টিকেল খুঁজুন...",
      diseaseGuides: "রোগ নির্দেশিকা",
      whatToDo: "কি করবেন:",
      tapToRead: "আরও পড়ুন",
      tapToCollapse: "বন্ধ করুন",
      noArticlesFound: "কোন আর্টিকেল নেই",
    },
    tips: {
      title: "স্বাস্থ্য টিপস",
      subtitle: "স্বাস্থ্য ও সুস্থতার সহজ উপায়",
      searchPlaceholder: "টিপস খুঁজুন...",
      topTips: "শীর্ষ টিপস",
      noTipsFound: "কোন টিপস নেই",
    },
    doYouKnow: {
      title: "আপনি কি জানেন?",
      subtitle: "কতজন প্রভাবিত — সংখ্যা জানুন",
      question: "আপনি কি জানেন কতজন প্রভাবিত",
      showStatistics: "পরিসংখ্যান দেখুন",
      daily: "দৈনিক",
      monthly: "মাসিক",
      yearly: "বার্ষিক",
      noMatchFound: "কোন মিল নেই",
    },
    disclaimer: {
      title: "দাবিত্যাগ",
      text: "আমি ডাক্তার নই। এটি শুধুমাত্র তথ্যের জন্য। ওষুধ ও চিকিৎসার জন্য কাছের ডাক্তারের পরামর্শ নিন।",
      compact: "চিকিৎসা পরামর্শ নয়। সঠিক ওষুধের জন্য কাছের ডাক্তারের সাথে পরামর্শ করুন।",
      close: "বন্ধ করুন",
    },
    crawl: {
      realTimeInfo: "রিয়েল-টাইম তথ্য",
      doctorsFromGoogle: "গুগল থেকে ডাক্তার",
      getRealTimeInfo: "রিয়েল-টাইম তথ্য দেখুন",
      loading: "অনুসন্ধান চলছে...",
      noResults: "কোন ফলাফল নেই।",
      error: "লোড হয়নি। আবার চেষ্টা করুন।",
      noApiConfigured: "অনুসন্ধান API কনফিগার করা নেই।",
    },
  },
  hi: {
    nav: {
      home: "होम",
      medicine: "दवा",
      articles: "आर्टिकल",
      tips: "टिप्स",
      know: "जानें",
    },
    brand: { findYour: "खोजें अपने", doctorNearby: "पास के डॉक्टर" },
    home: {
      topDoctors: "शीर्ष डॉक्टर",
      nearLocation: "पास",
      withinRadius: "के भीतर",
      mile: "मील",
      problemSymptom: "समस्या / लक्षण",
      country: "देश",
      city: "शहर",
      area: "क्षेत्र",
      radius: "दूरी",
      searchNow: "खोजें",
      foundDoctors: "हमें आपके इलाके में {count} डॉक्टर मिले",
      noDoctorsFound: "कोई डॉक्टर नहीं मिला। खोज बदलकर कोशिश करें।",
      previous: "पिछला",
      next: "अगला",
      page: "पृष्ठ",
      of: "/",
      seeLocationMap: "मैप पर देखें",
      call: "कॉल करें",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      recommendDoctor: "डॉक्टर की सिफारिश करें",
      recommended: "सिफारिश की गई",
      fromYourLocation: "आपके स्थान से",
      views: "देखे गए",
      recommendations: "सिफारिशें",
      bestWayToGo: "जाने का सबसे अच्छा तरीका",
      transport: "यातायात",
      time: "समय",
      cost: "लागत",
      best: "सर्वश्रेष्ठ",
    },
    medicine: {
      title: "दवा खोजें",
      subtitle: "स्थिति, देश और राज्य के अनुसार दवा सुझाव",
      needMedicineFor: "मुझे चाहिए",
      conditionPlaceholder: "जैसे पेट दर्द, बुखार, सिरदर्द",
      selectCountry: "देश चुनें",
      selectState: "राज्य चुनें",
      findMedicine: "दवा खोजें",
      availableIn: "उपलब्ध",
      for: "के लिए",
      noMedicinesFound: "कोई दवा नहीं मिली",
      tryConditions: "आज़माएं: पेट दर्द, बुखार, सिरदर्द",
    },
    articles: {
      title: "स्वास्थ्य आर्टिकल",
      subtitle: "बीमारी के मामले में क्या करें",
      searchPlaceholder: "आर्टिकल खोजें...",
      diseaseGuides: "रोग मार्गदर्शन",
      whatToDo: "क्या करें:",
      tapToRead: "और पढ़ें",
      tapToCollapse: "बंद करें",
      noArticlesFound: "कोई आर्टिकल नहीं मिला",
    },
    tips: {
      title: "स्वास्थ्य टिप्स",
      subtitle: "स्वास्थ्य के लिए सरल उपाय",
      searchPlaceholder: "टिप्स खोजें...",
      topTips: "शीर्ष टिप्स",
      noTipsFound: "कोई टिप्स नहीं मिला",
    },
    doYouKnow: {
      title: "क्या आप जानते हैं?",
      subtitle: "कितने प्रभावित — संख्याएँ देखें",
      question: "क्या आप जानते हैं कितने प्रभावित",
      showStatistics: "आंकड़े दिखाएं",
      daily: "दैनिक",
      monthly: "मासिक",
      yearly: "वार्षिक",
      noMatchFound: "कोई मिलान नहीं मिला",
    },
    disclaimer: {
      title: "अस्वीकरण",
      text: "मैं डॉक्टर नहीं हूं। यह केवल जानकारी के लिए है। दवा और इलाज के लिए पास के डॉक्टर से सलाह लें।",
      compact: "चिकित्सा सलाह नहीं। सही दवा के लिए पास के डॉक्टर से सलाह लें।",
      close: "बंद करें",
    },
    crawl: {
      realTimeInfo: "रीयल-टाइम जानकारी",
      doctorsFromGoogle: "गूगल से डॉक्टर",
      getRealTimeInfo: "रीयल-टाइम जानकारी लाएं",
      loading: "खोज हो रही है...",
      noResults: "कोई परिणाम नहीं मिला।",
      error: "लोड नहीं हो पाया। फिर कोशिश करें।",
      noApiConfigured: "खोज API कॉन्फ़िगर नहीं है।",
    },
  },
  ur: {
    nav: {
      home: "ہوم",
      medicine: "دوائی",
      articles: "آرٹیکل",
      tips: "ٹپس",
      know: "جانیں",
    },
    brand: { findYour: "تلاش کریں اپنے", doctorNearby: "قریبی ڈاکٹر" },
    home: {
      topDoctors: "اعلیٰ ڈاکٹر",
      nearLocation: "قریب",
      withinRadius: "کے اندر",
      mile: "میل",
      problemSymptom: "مسئلہ / علامت",
      country: "ملک",
      city: "شہر",
      area: "علاقہ",
      radius: "فاصلہ",
      searchNow: "تلاش کریں",
      foundDoctors: "ہمیں آپ کے علاقے میں {count} ڈاکٹر ملے",
      noDoctorsFound: "کوئی ڈاکٹر نہیں ملا۔ تلاش بدل کر کوشش کریں۔",
      previous: "پچھلا",
      next: "اگلا",
      page: "صفحہ",
      of: "/",
      seeLocationMap: "نقشے پر دیکھیں",
      call: "کال کریں",
      bookAppointment: "اپائنٹمنٹ بک کریں",
      recommendDoctor: "ڈاکٹر کی سفارش کریں",
      recommended: "سفارش شدہ",
      fromYourLocation: "آپ کے مقام سے",
      views: "ملاحظات",
      recommendations: "سفارشات",
      bestWayToGo: "جانے کا بہترین طریقہ",
      transport: "آمدورفت",
      time: "وقت",
      cost: "لاگت",
      best: "بہترین",
    },
    medicine: {
      title: "دوائی تلاش کریں",
      subtitle: "حالت، ملک اور صوبہ کے مطابق دوائی کی تجاویز",
      needMedicineFor: "مجھے چاہیے",
      conditionPlaceholder: "جیسے پیٹ، بخار، سر درد",
      selectCountry: "ملک منتخب کریں",
      selectState: "صوبہ منتخب کریں",
      findMedicine: "دوائی تلاش کریں",
      availableIn: "دستیاب",
      for: "کے لیے",
      noMedicinesFound: "کوئی دوائی نہیں ملی",
      tryConditions: "کوشش کریں: پیٹ، بخار، سر درد",
    },
    articles: {
      title: "صحت کے آرٹیکل",
      subtitle: "بیماری کی صورت میں کیا کریں",
      searchPlaceholder: "آرٹیکل تلاش کریں...",
      diseaseGuides: "بیماری گائیڈ",
      whatToDo: "کیا کریں:",
      tapToRead: "مزید پڑھیں",
      tapToCollapse: "بند کریں",
      noArticlesFound: "کوئی آرٹیکل نہیں ملا",
    },
    tips: {
      title: "صحت کے ٹپس",
      subtitle: "صحت کے لیے آسان طریقے",
      searchPlaceholder: "ٹپس تلاش کریں...",
      topTips: "اعلیٰ ٹپس",
      noTipsFound: "کوئی ٹپس نہیں ملی",
    },
    doYouKnow: {
      title: "کیا آپ جانتے ہیں؟",
      subtitle: "کتنے متاثر — اعداد و شمار دیکھیں",
      question: "کیا آپ جانتے ہیں کتنے متاثر",
      showStatistics: "شماریات دکھائیں",
      daily: "روزانہ",
      monthly: "ماہانہ",
      yearly: "سالانہ",
      noMatchFound: "کوئی میل نہیں ملا",
    },
    disclaimer: {
      title: "دستبرداری",
      text: "میں ڈاکٹر نہیں ہوں۔ یہ صرف معلومات کے لیے ہے۔ دوائی اور علاج کے لیے قریبی ڈاکٹر سے مشورہ کریں۔",
      compact: "طبی مشورہ نہیں۔ صحیح دوائی کے لیے قریبی ڈاکٹر سے مشورہ کریں۔",
      close: "بند کریں",
    },
    crawl: {
      realTimeInfo: "ریئل ٹائم معلومات",
      doctorsFromGoogle: "گوگل سے ڈاکٹر",
      getRealTimeInfo: "ریئل ٹائم معلومات حاصل کریں",
      loading: "تلاش ہو رہی ہے...",
      noResults: "کوئی نتیجہ نہیں ملا۔",
      error: "لوڈ نہیں ہوا۔ دوبارہ کوشش کریں۔",
      noApiConfigured: "تلاش API سیٹ اپ نہیں ہے۔",
    },
  },
};

function interpolate(str: string, vars: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  const str = typeof value === "string" ? value : key;
  return vars ? interpolate(str, vars) : str;
}
