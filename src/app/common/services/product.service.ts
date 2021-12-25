import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, of } from 'rxjs';
import { Product, ProductFilters } from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  products: Product[] = [
    {
      id: 'MYTZ 123456',
      quantity: 12,
      floor: 1,
      section: 3
    },
    {
      id: 'MY 3247',
      quantity: 41,
      floor: 2,
      section: 1
    },
    {
      id: 'TTS 94448',
      quantity: 22,
      floor: 5,
      section: 3
    },
  ];
  
  getProducts(filters?: ProductFilters): Observable<Product[]> {
    console.log('filters:', filters);
    return of(this.products)
      .pipe(
        map(products => this.filterProducts(products, filters)),
        delay(500)
      );
  }

  getFloors(): Observable<number[]> {
    return of(this.products)
      .pipe(map(products => products.map(product => product.floor).filter((val, i, arr) => arr.indexOf(val) === i)));
  }

  getSections(): Observable<number[]> {
    return of(this.products)
      .pipe(map(products => products.map(product => product.section).filter((val, i, arr) => arr.indexOf(val) === i)));
  }

  private filterProducts(products: Product[], filters?: ProductFilters): Product[] {
    if (!filters) {
      return products;
    } else {
      let filteredProducts = [...products];
      if (filters?.id) {
        filteredProducts = filteredProducts.filter(product => filters?.id && product.id.includes(filters.id));
      }
      if (filters?.floors && filters.floors.length > 0) {
        filteredProducts = filteredProducts.filter(product => filters?.floors && filters.floors.length > 0 && filters.floors.includes(product.floor));
      }
      if (filters?.sections && filters.sections.length > 0) {
        filteredProducts = filteredProducts.filter(product => filters?.sections && filters.sections.length > 0 && filters.sections.includes(product.section));
      }
      return filteredProducts;
    }
  }
}