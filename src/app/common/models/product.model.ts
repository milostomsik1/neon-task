export interface Product {
  id: string;
  floor: number;
  section: number;
  quantity: number;
}

export interface ProductFilters {
  id?: string;
  floors?: number[];
  sections?: number[];
}
