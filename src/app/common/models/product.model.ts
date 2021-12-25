export interface Product {
  code: string;
  quantity: number;
  floor: number;
  section: number;
}

export interface ProductFilters {
  code?: string;
  floors?: number[];
  sections?: number[];
}
