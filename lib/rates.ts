export const RATES = {
  cities: {
    "New York": {
      housing: {
        base1Bed: 4058, // 1-bed avg rent anchor (Feb 2026)
        base2Bed: 5544,
        rentPerSqft: 3.2,
        utilities: 180,
        internet: 70,
        transport: 160,
      },
      hotel: {
        nightly: { "3-star": 285, "4-star": 370, "5-star": 567 }, // 4/5 anchored, 3-star set by you
      },
    },

    "Los Angeles": {
      housing: {
        base1Bed: 2172, // 1-bed avg rent anchor (Feb 2026)
        base2Bed: 2993,
        rentPerSqft: 2.4,
        utilities: 160,
        internet: 65,
        transport: 140,
      },
      hotel: {
        nightly: { "3-star": 210, "4-star": 290, "5-star": 450 },
      },
    },

    "Chicago": {
      housing: { base1Bed: 1950, base2Bed: 2600, rentPerSqft: 1.8, utilities: 155, internet: 60, transport: 130 },
      hotel: { nightly: { "3-star": 160, "4-star": 230, "5-star": 360 } },
    },

    "Houston": {
      housing: { base1Bed: 1500, base2Bed: 1900, rentPerSqft: 1.3, utilities: 150, internet: 55, transport: 110 },
      hotel: { nightly: { "3-star": 130, "4-star": 190, "5-star": 300 } },
    },
  },

  multipliers: {
    bedrooms: { "Studio": 0.85, "1 Bed": 1.0, "2 Bed": 1.25, "3 Bed": 1.55, "4+ Bed": 1.9 },
    homeType: { Apartment: 1.0, House: 1.12 },
    qualityHousing: { "3-star": 1.0, "4-star": 1.18, "5-star": 1.4 }, // "amenity/luxury level" for housing
  },

  billing: {
    hotelWeeklyDiscount: 0.10,
    hotelMonthlyDiscount: 0.18,
    housingNightlyPremium: 0.25,
    housingWeeklyPremium: 0.12,
  },

  addons: { Furnished: 120, Parking: 80, Pet: 35, Gym: 60, Security: 90 },

  groceryPerPersonMonthly: 370, // baseline
} as const;

