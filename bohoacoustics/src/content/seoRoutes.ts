export type ServiceConfig = {
  key: "acoustic-consultant" | "soundproofing" | "home-theatre-acoustics";
  name: string;
  primaryKeyword: string;
};

export type CityConfig = {
  city: string;
  state: string;
  region: "Maharashtra" | "South India" | "North India" | "West India" | "East India" | "Central India" | "Pan India";
  nearbyAreas: string[];
};

export const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    key: "acoustic-consultant",
    name: "Acoustic Consultant",
    primaryKeyword: "acoustic consultant",
  },
  {
    key: "soundproofing",
    name: "Soundproofing Services",
    primaryKeyword: "soundproofing services",
  },
  {
    key: "home-theatre-acoustics",
    name: "Home Theatre Acoustics",
    primaryKeyword: "home theatre acoustics",
  },
];

export const CITY_CONFIGS: CityConfig[] = [
  { city: "Mumbai", state: "Maharashtra", region: "Maharashtra", nearbyAreas: ["Bandra", "Andheri", "Powai", "Worli", "Lower Parel", "Juhu"] },
  { city: "Pune", state: "Maharashtra", region: "Maharashtra", nearbyAreas: ["Baner", "Wakad", "Hinjewadi", "Viman Nagar", "Kothrud", "Kharadi"] },
  { city: "Nagpur", state: "Maharashtra", region: "Maharashtra", nearbyAreas: ["Dharampeth", "Sitabuldi", "Manish Nagar", "Wardha Road", "Pratap Nagar"] },
  { city: "Nashik", state: "Maharashtra", region: "Maharashtra", nearbyAreas: ["Gangapur Road", "College Road", "Indira Nagar", "Satpur", "CIDCO"] },
  { city: "Aurangabad", state: "Maharashtra", region: "Maharashtra", nearbyAreas: ["CIDCO", "Jalna Road", "Garkheda", "Bajaj Nagar", "Waluj"] },
  { city: "Chennai", state: "Tamil Nadu", region: "South India", nearbyAreas: ["OMR", "Anna Nagar", "Adyar", "Velachery", "T Nagar", "Porur"] },
  { city: "Bangalore", state: "Karnataka", region: "South India", nearbyAreas: ["Whitefield", "Indiranagar", "HSR Layout", "Koramangala", "Electronic City", "Jayanagar"] },
  { city: "Hyderabad", state: "Telangana", region: "South India", nearbyAreas: ["Gachibowli", "HITEC City", "Jubilee Hills", "Madhapur", "Kondapur", "Banjara Hills"] },
  { city: "Coimbatore", state: "Tamil Nadu", region: "South India", nearbyAreas: ["RS Puram", "Saibaba Colony", "Peelamedu", "Saravanampatti", "Gandhipuram"] },
  { city: "Kochi", state: "Kerala", region: "South India", nearbyAreas: ["Kakkanad", "Panampilly Nagar", "Edappally", "Fort Kochi", "Kadavanthra"] },
  { city: "Mysore", state: "Karnataka", region: "South India", nearbyAreas: ["Vijayanagar", "Gokulam", "Hebbal", "Kuvempunagar", "Saraswathipuram"] },
  { city: "Trivandrum", state: "Kerala", region: "South India", nearbyAreas: ["Kowdiar", "Technopark", "Kazhakkoottam", "Pattom", "Vellayambalam"] },
  { city: "Delhi", state: "Delhi", region: "North India", nearbyAreas: ["South Delhi", "Dwarka", "Rohini", "Noida", "Gurugram", "Saket"] },
  { city: "Jaipur", state: "Rajasthan", region: "North India", nearbyAreas: ["Vaishali Nagar", "Malviya Nagar", "Mansarovar", "C-Scheme", "Jagatpura"] },
  { city: "Lucknow", state: "Uttar Pradesh", region: "North India", nearbyAreas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar"] },
  { city: "Chandigarh", state: "Chandigarh", region: "North India", nearbyAreas: ["Sector 17", "Sector 35", "Mohali", "Panchkula", "Manimajra"] },
  { city: "Noida", state: "Uttar Pradesh", region: "North India", nearbyAreas: ["Sector 62", "Sector 18", "Noida Extension", "Greater Noida", "Sector 150"] },
  { city: "Gurugram", state: "Haryana", region: "North India", nearbyAreas: ["DLF Phase 1", "DLF Phase 5", "Golf Course Road", "Sohna Road", "New Gurgaon"] },
  { city: "Ahmedabad", state: "Gujarat", region: "West India", nearbyAreas: ["SG Highway", "Prahlad Nagar", "Bodakdev", "Satellite", "Navrangpura"] },
  { city: "Surat", state: "Gujarat", region: "West India", nearbyAreas: ["Vesu", "Adajan", "Piplod", "Katargam", "Athwa"] },
  { city: "Vadodara", state: "Gujarat", region: "West India", nearbyAreas: ["Alkapuri", "Gotri", "Akota", "Manjalpur", "Karelibaug"] },
  { city: "Rajkot", state: "Gujarat", region: "West India", nearbyAreas: ["Kalawad Road", "Raiya", "Yagnik Road", "Gondal Road", "Mavdi"] },
  { city: "Kolkata", state: "West Bengal", region: "East India", nearbyAreas: ["Salt Lake", "New Town", "Ballygunge", "Park Street", "Howrah"] },
  { city: "Bhubaneswar", state: "Odisha", region: "East India", nearbyAreas: ["Patia", "Saheed Nagar", "Nayapalli", "Khandagiri", "Old Town"] },
  { city: "Visakhapatnam", state: "Andhra Pradesh", region: "East India", nearbyAreas: ["MVP Colony", "Madhurawada", "Dwaraka Nagar", "Gajuwaka", "Seethammadhara"] },
  { city: "Patna", state: "Bihar", region: "East India", nearbyAreas: ["Boring Road", "Kankarbagh", "Bailey Road", "Danapur", "Rajendra Nagar"] },
  { city: "Indore", state: "Madhya Pradesh", region: "Central India", nearbyAreas: ["Vijay Nagar", "Palasia", "AB Road", "Rau", "MR 10"] },
  { city: "Bhopal", state: "Madhya Pradesh", region: "Central India", nearbyAreas: ["Arera Colony", "Kolar Road", "MP Nagar", "Bawadia Kalan", "Hoshangabad Road"] },
  { city: "Raipur", state: "Chhattisgarh", region: "Central India", nearbyAreas: ["Shankar Nagar", "Telibandha", "Pandri", "Civil Lines", "Naya Raipur"] },
  { city: "Kanpur", state: "Uttar Pradesh", region: "Central India", nearbyAreas: ["Swaroop Nagar", "Kidwai Nagar", "Kakadeo", "Civil Lines", "Shastri Nagar"] },
  { city: "Acoustic Consultant India", state: "India", region: "Pan India", nearbyAreas: ["Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad", "Chennai"] },
];

export type SeoRouteConfig = {
  path: string;
  city: string;
  state: string;
  service: string;
  keyword: string;
  nearbyAreas: string[];
  region: CityConfig["region"];
};

const toSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

const normalizeCityName = (city: string) => (city === "Acoustic Consultant India" ? "India" : city);

export const SEO_ROUTE_CONFIGS: SeoRouteConfig[] = CITY_CONFIGS.flatMap((cityConfig) => {
  const cityName = normalizeCityName(cityConfig.city);
  if (cityName === "India") {
    return [
      {
        path: "/acoustic-consultant-india",
        city: "India",
        state: "India",
        service: "Acoustic Consultant",
        keyword: "acoustic consultant India",
        nearbyAreas: cityConfig.nearbyAreas,
        region: cityConfig.region,
      },
    ];
  }

  return SERVICE_CONFIGS.map((serviceConfig) => ({
    path: `/${serviceConfig.key}-${toSlug(cityName)}`,
    city: cityName,
    state: cityConfig.state,
    service: serviceConfig.name,
    keyword: `${serviceConfig.primaryKeyword} ${cityName.toLowerCase()}`,
    nearbyAreas: cityConfig.nearbyAreas,
    region: cityConfig.region,
  }));
});
