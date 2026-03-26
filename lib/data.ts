import { buildCitySlug, buildStateSlug } from "./slug";

export type State = {
  name: string;
  code: string;
  slug: string;
};

export type CityCostIndices = {
  overall: number;
  rent: number;
  homePrice: number;
  utilities: number;
  groceries: number;
  transport: number;
  healthcare: number;
};

export type City = {
  cityName: string;
  stateSlug: string;
  stateCode: string;
  slug: string;
  lat: number;
  lng: number;
  indices: CityCostIndices;
};

export type ProType = "Agent" | "Company";

export type Pro = {
  id: string;
  citySlug: string;
  name: string;
  type: ProType;
  phone: string;
  email: string;
  website: string;
  address: string;
};

export const STATES: State[] = [
  { name: "California", code: "CA", slug: buildStateSlug("California") },
  { name: "Texas", code: "TX", slug: buildStateSlug("Texas") },
  { name: "New York", code: "NY", slug: buildStateSlug("New York") },
  { name: "Florida", code: "FL", slug: buildStateSlug("Florida") },
  { name: "Washington", code: "WA", slug: buildStateSlug("Washington") },
  { name: "Colorado", code: "CO", slug: buildStateSlug("Colorado") },
  { name: "Illinois", code: "IL", slug: buildStateSlug("Illinois") },
  { name: "Georgia", code: "GA", slug: buildStateSlug("Georgia") },
  { name: "Arizona", code: "AZ", slug: buildStateSlug("Arizona") },
  { name: "Massachusetts", code: "MA", slug: buildStateSlug("Massachusetts") }
];

export const CITIES: City[] = [
  {
    cityName: "San Francisco",
    stateSlug: buildStateSlug("California"),
    stateCode: "CA",
    slug: buildCitySlug("San Francisco", "CA"),
    lat: 37.7749,
    lng: -122.4194,
    indices: {
      overall: 190,
      rent: 230,
      homePrice: 260,
      utilities: 120,
      groceries: 140,
      transport: 150,
      healthcare: 125
    }
  },
  {
    cityName: "Los Angeles",
    stateSlug: buildStateSlug("California"),
    stateCode: "CA",
    slug: buildCitySlug("Los Angeles", "CA"),
    lat: 34.0522,
    lng: -118.2437,
    indices: {
      overall: 150,
      rent: 170,
      homePrice: 190,
      utilities: 115,
      groceries: 130,
      transport: 135,
      healthcare: 120
    }
  },
  {
    cityName: "San Diego",
    stateSlug: buildStateSlug("California"),
    stateCode: "CA",
    slug: buildCitySlug("San Diego", "CA"),
    lat: 32.7157,
    lng: -117.1611,
    indices: {
      overall: 145,
      rent: 165,
      homePrice: 185,
      utilities: 110,
      groceries: 125,
      transport: 120,
      healthcare: 118
    }
  },
  {
    cityName: "Austin",
    stateSlug: buildStateSlug("Texas"),
    stateCode: "TX",
    slug: buildCitySlug("Austin", "TX"),
    lat: 30.2672,
    lng: -97.7431,
    indices: {
      overall: 120,
      rent: 130,
      homePrice: 140,
      utilities: 105,
      groceries: 110,
      transport: 110,
      healthcare: 108
    }
  },
  {
    cityName: "Dallas",
    stateSlug: buildStateSlug("Texas"),
    stateCode: "TX",
    slug: buildCitySlug("Dallas", "TX"),
    lat: 32.7767,
    lng: -96.797,
    indices: {
      overall: 105,
      rent: 110,
      homePrice: 115,
      utilities: 100,
      groceries: 102,
      transport: 104,
      healthcare: 101
    }
  },
  {
    cityName: "Houston",
    stateSlug: buildStateSlug("Texas"),
    stateCode: "TX",
    slug: buildCitySlug("Houston", "TX"),
    lat: 29.7604,
    lng: -95.3698,
    indices: {
      overall: 100,
      rent: 95,
      homePrice: 110,
      utilities: 98,
      groceries: 99,
      transport: 97,
      healthcare: 100
    }
  },
  {
    cityName: "New York",
    stateSlug: buildStateSlug("New York"),
    stateCode: "NY",
    slug: buildCitySlug("New York", "NY"),
    lat: 40.7128,
    lng: -74.006,
    indices: {
      overall: 200,
      rent: 250,
      homePrice: 245,
      utilities: 125,
      groceries: 150,
      transport: 160,
      healthcare: 130
    }
  },
  {
    cityName: "Buffalo",
    stateSlug: buildStateSlug("New York"),
    stateCode: "NY",
    slug: buildCitySlug("Buffalo", "NY"),
    lat: 42.8864,
    lng: -78.8784,
    indices: {
      overall: 90,
      rent: 80,
      homePrice: 85,
      utilities: 95,
      groceries: 92,
      transport: 88,
      healthcare: 93
    }
  },
  {
    cityName: "Miami",
    stateSlug: buildStateSlug("Florida"),
    stateCode: "FL",
    slug: buildCitySlug("Miami", "FL"),
    lat: 25.7617,
    lng: -80.1918,
    indices: {
      overall: 125,
      rent: 145,
      homePrice: 150,
      utilities: 110,
      groceries: 118,
      transport: 120,
      healthcare: 112
    }
  },
  {
    cityName: "Orlando",
    stateSlug: buildStateSlug("Florida"),
    stateCode: "FL",
    slug: buildCitySlug("Orlando", "FL"),
    lat: 28.5383,
    lng: -81.3792,
    indices: {
      overall: 110,
      rent: 115,
      homePrice: 118,
      utilities: 104,
      groceries: 106,
      transport: 105,
      healthcare: 103
    }
  },
  {
    cityName: "Seattle",
    stateSlug: buildStateSlug("Washington"),
    stateCode: "WA",
    slug: buildCitySlug("Seattle", "WA"),
    lat: 47.6062,
    lng: -122.3321,
    indices: {
      overall: 155,
      rent: 175,
      homePrice: 190,
      utilities: 115,
      groceries: 132,
      transport: 130,
      healthcare: 120
    }
  },
  {
    cityName: "Spokane",
    stateSlug: buildStateSlug("Washington"),
    stateCode: "WA",
    slug: buildCitySlug("Spokane", "WA"),
    lat: 47.6588,
    lng: -117.426,
    indices: {
      overall: 105,
      rent: 108,
      homePrice: 112,
      utilities: 102,
      groceries: 104,
      transport: 101,
      healthcare: 102
    }
  },
  {
    cityName: "Denver",
    stateSlug: buildStateSlug("Colorado"),
    stateCode: "CO",
    slug: buildCitySlug("Denver", "CO"),
    lat: 39.7392,
    lng: -104.9903,
    indices: {
      overall: 125,
      rent: 130,
      homePrice: 140,
      utilities: 108,
      groceries: 112,
      transport: 115,
      healthcare: 109
    }
  },
  {
    cityName: "Boulder",
    stateSlug: buildStateSlug("Colorado"),
    stateCode: "CO",
    slug: buildCitySlug("Boulder", "CO"),
    lat: 40.01499,
    lng: -105.27055,
    indices: {
      overall: 140,
      rent: 150,
      homePrice: 165,
      utilities: 110,
      groceries: 120,
      transport: 118,
      healthcare: 115
    }
  },
  {
    cityName: "Chicago",
    stateSlug: buildStateSlug("Illinois"),
    stateCode: "IL",
    slug: buildCitySlug("Chicago", "IL"),
    lat: 41.8781,
    lng: -87.6298,
    indices: {
      overall: 120,
      rent: 130,
      homePrice: 135,
      utilities: 105,
      groceries: 110,
      transport: 118,
      healthcare: 112
    }
  },
  {
    cityName: "Atlanta",
    stateSlug: buildStateSlug("Georgia"),
    stateCode: "GA",
    slug: buildCitySlug("Atlanta", "GA"),
    lat: 33.749,
    lng: -84.388,
    indices: {
      overall: 110,
      rent: 115,
      homePrice: 120,
      utilities: 104,
      groceries: 106,
      transport: 109,
      healthcare: 105
    }
  },
  {
    cityName: "Phoenix",
    stateSlug: buildStateSlug("Arizona"),
    stateCode: "AZ",
    slug: buildCitySlug("Phoenix", "AZ"),
    lat: 33.4484,
    lng: -112.074,
    indices: {
      overall: 108,
      rent: 110,
      homePrice: 118,
      utilities: 103,
      groceries: 104,
      transport: 106,
      healthcare: 103
    }
  },
  {
    cityName: "Tucson",
    stateSlug: buildStateSlug("Arizona"),
    stateCode: "AZ",
    slug: buildCitySlug("Tucson", "AZ"),
    lat: 32.2226,
    lng: -110.9747,
    indices: {
      overall: 100,
      rent: 95,
      homePrice: 102,
      utilities: 98,
      groceries: 99,
      transport: 100,
      healthcare: 98
    }
  },
  {
    cityName: "Boston",
    stateSlug: buildStateSlug("Massachusetts"),
    stateCode: "MA",
    slug: buildCitySlug("Boston", "MA"),
    lat: 42.3601,
    lng: -71.0589,
    indices: {
      overall: 155,
      rent: 175,
      homePrice: 185,
      utilities: 118,
      groceries: 135,
      transport: 132,
      healthcare: 125
    }
  },
  {
    cityName: "Cambridge",
    stateSlug: buildStateSlug("Massachusetts"),
    stateCode: "MA",
    slug: buildCitySlug("Cambridge", "MA"),
    lat: 42.3736,
    lng: -71.1097,
    indices: {
      overall: 160,
      rent: 185,
      homePrice: 195,
      utilities: 120,
      groceries: 138,
      transport: 135,
      healthcare: 128
    }
  }
];

export const PROS: Pro[] = [
  {
    id: "pro-ny-1",
    citySlug: "new-york-ny",
    name: "Hudson Home Advisors",
    type: "Agent",
    phone: "(212) 555-0131",
    email: "hello@hudsonhomeadvisors.com",
    website: "https://hudsonhomeadvisors.com",
    address: "245 W 38th St, New York, NY 10018"
  },
  {
    id: "pro-ny-2",
    citySlug: "new-york-ny",
    name: "Metro Borough Realty",
    type: "Company",
    phone: "(212) 555-0174",
    email: "team@metroboroughrealty.com",
    website: "https://metroboroughrealty.com",
    address: "500 7th Ave, New York, NY 10018"
  },
  {
    id: "pro-ny-3",
    citySlug: "new-york-ny",
    name: "Five Borough Relocation Group",
    type: "Agent",
    phone: "(917) 555-0148",
    email: "support@fiveboroughrelocation.com",
    website: "https://fiveboroughrelocation.com",
    address: "100 Church St, New York, NY 10007"
  },
  {
    id: "pro-sf-1",
    citySlug: "san-francisco-ca",
    name: "Golden Gate Property Group",
    type: "Company",
    phone: "(415) 555-0112",
    email: "info@goldengatepropertygroup.com",
    website: "https://goldengatepropertygroup.com",
    address: "1 Market St, San Francisco, CA 94105"
  },
  {
    id: "pro-la-1",
    citySlug: "los-angeles-ca",
    name: "Pacific Move Advisors",
    type: "Agent",
    phone: "(310) 555-0192",
    email: "contact@pacificmoveadvisors.com",
    website: "https://pacificmoveadvisors.com",
    address: "633 W 5th St, Los Angeles, CA 90071"
  },
  {
    id: "pro-aus-1",
    citySlug: "austin-tx",
    name: "Capitol City Realty Team",
    type: "Company",
    phone: "(512) 555-0160",
    email: "team@capitolcityrealtyteam.com",
    website: "https://capitolcityrealtyteam.com",
    address: "600 Congress Ave, Austin, TX 78701"
  },
  {
    id: "pro-dal-1",
    citySlug: "dallas-tx",
    name: "North Texas Home Match",
    type: "Agent",
    phone: "(214) 555-0157",
    email: "hello@northtexashomematch.com",
    website: "https://northtexashomematch.com",
    address: "1910 Pacific Ave, Dallas, TX 75201"
  },
  {
    id: "pro-mia-1",
    citySlug: "miami-fl",
    name: "Suncoast Property Network",
    type: "Company",
    phone: "(305) 555-0129",
    email: "info@suncoastpropertynetwork.com",
    website: "https://suncoastpropertynetwork.com",
    address: "200 S Biscayne Blvd, Miami, FL 33131"
  },
  {
    id: "pro-orl-1",
    citySlug: "orlando-fl",
    name: "Central Florida Home Advisors",
    type: "Agent",
    phone: "(407) 555-0185",
    email: "team@cfhomeadvisors.com",
    website: "https://cfhomeadvisors.com",
    address: "20 N Orange Ave, Orlando, FL 32801"
  },
  {
    id: "pro-sea-1",
    citySlug: "seattle-wa",
    name: "Emerald City Real Estate Co.",
    type: "Company",
    phone: "(206) 555-0108",
    email: "hello@emeraldcityrec.com",
    website: "https://emeraldcityrec.com",
    address: "1420 5th Ave, Seattle, WA 98101"
  },
  {
    id: "pro-den-1",
    citySlug: "denver-co",
    name: "Front Range Relocation",
    type: "Agent",
    phone: "(303) 555-0136",
    email: "support@frontrangerelocation.com",
    website: "https://frontrangerelocation.com",
    address: "1600 Broadway, Denver, CO 80202"
  },
  {
    id: "pro-chi-1",
    citySlug: "chicago-il",
    name: "Lakefront Home Partners",
    type: "Company",
    phone: "(312) 555-0179",
    email: "info@lakefronthomepartners.com",
    website: "https://lakefronthomepartners.com",
    address: "233 S Wacker Dr, Chicago, IL 60606"
  }
];

export function getStates(): State[] {
  return STATES;
}

export function getStateBySlug(slug: string): State | undefined {
  return STATES.find((state) => state.slug === slug);
}

export function getCities(): City[] {
  return CITIES;
}

export function getCitiesByStateSlug(stateSlug: string): City[] {
  return CITIES.filter((city) => city.stateSlug === stateSlug);
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function getProsByCitySlug(citySlug: string): Pro[] {
  return PROS.filter((pro) => pro.citySlug === citySlug);
}
