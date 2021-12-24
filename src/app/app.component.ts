import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Product } from './common/models/product.model';
import { ProductService } from './common/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  filters = new FormGroup({
    id: new FormControl(''),
    floors: new FormControl([]),
    sections: new FormControl([]),
  });

  constructor(private readonly productService: ProductService) {}

  get floors(): number[] {
    return this.products.map(product => product.floor).filter((val, i, arr) => arr.indexOf(val) === i);
  }

  get sections(): number[] {
    return this.products.map(product => product.section).filter((val, i, arr) => arr.indexOf(val) === i);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.filters.valueChanges
      .pipe(
        switchMap(value => {
          console.log(value);
          const filters = { };
          return this.productService.getProducts();
        })
      )
      .subscribe(products => {
        this.products = products;
        console.log(this.products);
      });
  }

  // searchById(partialId: string, products: Product[]): Observable<Product[]> {
  //   return of(products)
  //     .pipe(
  //       map(products => products.filter(product => product.id.includes(partialId.trim()))),
  //     );
  // }
}
