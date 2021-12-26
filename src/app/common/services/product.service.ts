import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { Product, ProductFilters } from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  products: Product[] = [
    {
      code: 'MYTZ 123456',
      quantity: 12,
      floor: 1,
      section: 3
    },
    {
      code: 'MY 3247',
      quantity: 41,
      floor: 2,
      section: 1
    },
    {
      code: 'TTS 94448',
      quantity: 22,
      floor: 5,
      section: 3
    },
    {
      code: 'MS 2244',
      quantity: 9,
      floor: 2,
      section: 2
    },
  ];
  
  getProducts(filters?: ProductFilters): Observable<Product[]> {
    // BE could also return something like { data: products, meta: { floors, sections } }
    // so we avoid calls for floors and sections
    return of(this.products).pipe(map(products => this.filterProducts(products, filters)));
  }

  getFloors(): Observable<number[]> {
    return of(this.products)
      .pipe(
        map(products => {
          return products
            .map(product => product.floor)
            // return unique values only
            .filter((val, i, arr) => arr.indexOf(val) === i)
            .sort((a, b) => a - b)
        })
      );
  }

  getSections(): Observable<number[]> {
    return of(this.products)
    .pipe(
      map(products => {
        return products
          .map(product => product.section)
          // return unique values only
          .filter((val, i, arr) => arr.indexOf(val) === i)
          .sort((a, b) => a - b)
      })
    );
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    let product = this.products.find(p => p.code === updatedProduct.code);

    if (product) {
      product.quantity = updatedProduct.quantity;
      product.floor = updatedProduct.floor;
      product.section = updatedProduct.section;
    } else {
      product = updatedProduct;
    }

    return of(product);
  }

  addProduct(product: Product): Observable<Product> {
    const codeTaken = this.products.find(p => p.code === product.code);

    if (!codeTaken) {
      this.products.push(product);
      return of(product);
    } else {
      return throwError('Code Already Taken');
    }
  }

  private filterProducts(products: Product[], filters?: ProductFilters): Product[] {
    // something like https://github.com/nextapps-de/flexsearch could be used here,
    // but in best case scenario Backend would handle this
    if (!filters) {
      return products;
    } else {
      let filteredProducts = [...products];
      if (filters?.code) {
        filteredProducts = filteredProducts.filter(product => filters?.code && product.code.includes(filters.code));
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