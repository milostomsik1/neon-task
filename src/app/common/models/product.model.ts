export interface Product {
  id: string;
  floor: number;
  section: number;
  quantity: number;
}

export interface ProductFilters extends Partial<Product> { }
