import json
import os
import uuid

doctors_path = r"d:\After App making\findyourdoctornearby\data\doctors.json"

with open(doctors_path, "r", encoding="utf-8") as f:
    data = json.load(f)

new_doctors = [
  {
    "id": str(uuid.uuid4()),
    "name": "Dr. Abdullahel Wafee",
    "specialization": "Orthopedic Surgeon (Bone, Joint, Rheumatology, Spine & Trauma Specialist)",
    "workplace": "House # 19, Gareeb-e-Nawaz Ave, Sector 13",
    "phone": "017XX-XXXXXX", # Missing exact in prompt, placeholder
    "country": "Bangladesh",
    "city": "Dhaka",
    "area": "Uttara",
    "latitude": 23.8720,
    "longitude": 90.3950,
    "distanceKm": 0.6,
    "totalViews": 5000,
    "recommendationCount": 490,
    "description": "High user rating (5.0) and known as a reliable orthopedic specialist in Uttara."
  },
  {
    "id": str(uuid.uuid4()),
    "name": "Dr. Mohammad Mahfuzul Hoque Raihan",
    "specialization": "Medicine Specialist (Internal Medicine & General Healthcare)",
    "workplace": "Uttara Crescent Diagnostic & Consultation Center, Sector 7",
    "phone": "01707-704150",
    "country": "Bangladesh",
    "city": "Dhaka",
    "area": "Uttara",
    "latitude": 23.8700,
    "longitude": 90.3900,
    "distanceKm": 1.5,
    "totalViews": 4500,
    "recommendationCount": 320,
    "description": "Highly qualified specialist with expertise in internal medicine."
  },
  {
    "id": str(uuid.uuid4()),
    "name": "Dr. Md. Zahidul Islam",
    "specialization": "Chest & Asthma Specialist (Respiratory Medicine)",
    "workplace": "Popular Diagnostic Center, Sector 4, Jasimuddin Mor",
    "phone": "09613-787805",
    "country": "Bangladesh",
    "city": "Dhaka",
    "area": "Uttara",
    "latitude": 23.8650,
    "longitude": 90.4000,
    "distanceKm": 2.0,
    "totalViews": 3200,
    "recommendationCount": 210,
    "description": "Recognized consultant at Popular Diagnostic Centre for respiratory issues."
  },
  {
    "id": str(uuid.uuid4()),
    "name": "Dr. Washim Ahmed",
    "specialization": "Medicine Specialist (FCPS)",
    "workplace": "Uttara Adhunik Medical College",
    "phone": "09610-009612",
    "country": "Bangladesh",
    "city": "Dhaka",
    "area": "Uttara",
    "latitude": 23.8800,
    "longitude": 90.3800,
    "distanceKm": 1.8,
    "totalViews": 3800,
    "recommendationCount": 210,
    "description": "Ranked among top Medicine Specialists in Uttara by community recommendations."
  },
  {
    "id": str(uuid.uuid4()),
    "name": "BRAC Healthcare, Uttara",
    "specialization": "General Medicine and Comprehensive Care",
    "workplace": "House # 15, Road No. 12, Sector 12",
    "phone": "09677-444888",
    "country": "Bangladesh",
    "city": "Dhaka",
    "area": "Uttara 12",
    "latitude": 23.8759,
    "longitude": 90.3951,
    "distanceKm": 0.1,
    "totalViews": 4800,
    "recommendationCount": 450,
    "description": "Highly rated (4.8) for experienced doctors, patient-centric care, and convenient location."
  }
]

data = new_doctors + data

with open(doctors_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

print("Updated doctors.json with new Uttara 12 entities.")
