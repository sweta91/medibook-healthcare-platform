
import { Doctor } from "../types/doctor";

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    qualification: "MBBS, MD - Cardiology",
    experience: 12,
    rating: 4.9,
    reviews: 128,
    consultationFee: 800,
    availability: "Available Today",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Neurologist",
    qualification: "MBBS, DM - Neurology",
    experience: 10,
    rating: 4.8,
    reviews: 96,
    consultationFee: 1000,
    availability: "Available Tomorrow",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 3,
    name: "Dr. Priya Desai",
    specialty: "Dermatologist",
    qualification: "MBBS, MD - Dermatology",
    experience: 8,
    rating: 4.9,
    reviews: 112,
    consultationFee: 700,
    availability: "Available Today",
    image: "https://i.pravatar.cc/300?img=44",
  },
];
