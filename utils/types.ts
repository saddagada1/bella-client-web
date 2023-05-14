export interface Department {
  name: string;
  categories: { name: string; subcategories: string[]; sizes?: string[] }[];
}

export interface Country {
  name: string;
  code: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Condition {
  name: string;
  description: string;
}
