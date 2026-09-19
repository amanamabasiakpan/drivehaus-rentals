export type CategoryId =
  | "economy"
  | "suv"
  | "luxury"
  | "executive"
  | "family"
  | "van";

export type Vehicle = {
  id: string;
  name: string;
  year: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  seats: number;
  pricePerDay: number;
  category: CategoryId;
  badge?: "POPULAR" | "PREMIUM" | "EXECUTIVE";
  available: boolean;
  ac: boolean;
  bluetooth: boolean;
  usb: boolean;
  reverseCamera: boolean;
  driverOption: boolean;
  description: string;
  images: string[];
};

export const categories: {
  id: CategoryId | "all";
  label: string;
  icon: string;
}[] = [
  { id: "economy", label: "Economy", icon: "🚘" },
  { id: "suv", label: "SUVs", icon: "🚙" },
  { id: "luxury", label: "Luxury", icon: "✨" },
  { id: "executive", label: "Executive", icon: "👔" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "van", label: "Vans", icon: "🚐" },
];

export const vehicles: Vehicle[] = [
  {
    id: "toyota-camry",
    name: "Toyota Camry",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 75000,
    category: "economy",
    badge: "POPULAR",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "Comfortable, reliable, and suitable for business trips, family travel, and everyday Lagos driving.",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "toyota-highlander",
    name: "Toyota Highlander",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 7,
    pricePerDay: 120000,
    category: "suv",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "Spacious seven-seater SUV for family weekends, airport groups, and comfortable Lagos travel.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "lexus-rx-350",
    name: "Lexus RX 350",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 180000,
    category: "luxury",
    badge: "PREMIUM",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "A refined luxury crossover for executives, visitors, and special occasions across Lagos.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes-Benz E-Class",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 220000,
    category: "executive",
    badge: "EXECUTIVE",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "Executive sedan for board meetings, VIP arrivals, and polished city transfers.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dca6c6?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    pricePerDay: 65000,
    category: "economy",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "Efficient and easy to drive — a practical choice for daily Lagos mobility.",
    images: [
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b15b?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "toyota-hiace",
    name: "Toyota Hiace",
    year: 2021,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 14,
    pricePerDay: 150000,
    category: "van",
    available: true,
    ac: true,
    bluetooth: true,
    usb: true,
    reverseCamera: true,
    driverOption: true,
    description:
      "Group transport for teams, events, church trips, and airport collections.",
    images: [
      "https://images.unsplash.com/photo-1544620341-11cb2cd7c62d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

export function formatNaira(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}
