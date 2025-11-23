// Continent types
export type Continent =
  | "asia"
  | "europe"
  | "africa"
  | "north-america"
  | "south-america"
  | "oceania";

// Country types for each continent
export type AsiaCountry =
  | "japan"
  | "korea"
  | "taiwan"
  | "indonesia"
  | "india";

export type EuropeCountry =
  | "germany"
  | "switzerland"
  | "portugal"
  | "czech"
  | "uk";

export type AfricaCountry =
  | "south-africa"
  | "nigeria"
  | "kenya"
  | "ghana"
  | "tanzania";

export type NorthAmericaCountry =
  | "usa"
  | "canada"
  | "mexico"
  | "el-salvador"
  | "costa-rica";

export type SouthAmericaCountry =
  | "brazil"
  | "argentina"
  | "colombia"
  | "chile"
  | "venezuela";

export type OceaniaCountry =
  | "australia"
  | "new-zealand";

// Organization category types
export type OrganizationCategory =
  | "center"
  | "events"
  | "meetups"
  | "mining"
  | "nodes"
  | "retail"
  | "charity"
  | "lightning";

// Resource type for global organizations
export type GlobalResource = {
  name: string;
  description: string;
  url: string;
  logo: string;
};

// Country resources structure
export type CountryResources = {
  [key in OrganizationCategory]?: GlobalResource[];
};

// Asia resources by country
export type AsiaResources = {
  [key in AsiaCountry]: CountryResources;
};

// Europe resources by country
export type EuropeResources = {
  [key in EuropeCountry]: CountryResources;
};

// Africa resources by country
export type AfricaResources = {
  [key in AfricaCountry]: CountryResources;
};

// North America resources by country
export type NorthAmericaResources = {
  [key in NorthAmericaCountry]: CountryResources;
};

// South America resources by country
export type SouthAmericaResources = {
  [key in SouthAmericaCountry]: CountryResources;
};

// Oceania resources by country
export type OceaniaResources = {
  [key in OceaniaCountry]: CountryResources;
};
