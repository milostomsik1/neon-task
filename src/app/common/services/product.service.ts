import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
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
    return of(this.products).pipe(delay(500));
  }
}