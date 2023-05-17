export interface Department {
  name: string;
  categories: { name: string; subcategories: string[]; sizes?: string[] }[];
}

export interface Country {
  name: string;
  code: string;
}

export interface Designer {
  id: number;
  name: string;
  slug: string;
}

export interface Condition {
  name: string;
  description: string;
}

export interface Colour {
  name: string;
  code: string;
}

export interface Classifiers {
  departments: Department[];
  countries: Country[];
  designers: Designer[];
  conditions: Condition[];
  colours: Colour[];
  eras: string[];
  sources: string[];
  styles: string[];
}
