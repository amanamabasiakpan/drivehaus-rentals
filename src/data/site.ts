export const site = {
  name: "DriveHaus",
  legalName: "DriveHaus Rentals",
  tagline: "Your journey. Your car. Your way.",
  descriptor: "CAR RENTALS",
  location: "Lagos, Nigeria",
  phone: "+234 803 555 0136",
  phoneRaw: "2348035550136",
  whatsapp: "2348035550136",
  email: "hello@drivehaus.ng",
  hours: "Mon – Sun | 7:00 AM – 10:00 PM",
  hoursShort: "Mon – Sun · 7:00 AM – 10:00 PM",
  serviceAreas: [
    "Lagos",
    "Victoria Island",
    "Lekki",
    "Ikoyi",
    "Ikeja",
    "Airport Transfers",
    "Abuja",
  ],
  locations: [
    "Lekki",
    "Ajah",
    "Ikoyi",
    "Victoria Island",
    "Ikeja",
    "Yaba",
    "Surulere",
    "Gbagada",
    "Airport",
    "Oniru",
  ],
  social: {
    instagram: "https://instagram.com/drivehaus",
    facebook: "https://facebook.com/drivehaus",
    tiktok: "https://tiktok.com/@drivehaus",
    linkedin: "https://linkedin.com/company/drivehaus",
  },
} as const;

export const pickupOptions = [
  "Lagos",
  "Airport",
  "Hotel",
  "Custom Location",
] as const;

export const vehicleTypes = [
  "All Cars",
  "Economy",
  "SUV",
  "Luxury",
  "Executive",
  "Family",
  "Van",
] as const;
