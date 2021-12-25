import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Product, ProductFilters } from './common/models/product.model';
import { ProductService } from './common/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  floors: number[] = [];
  sections: number[] = [];

  filters = new FormGroup({
    id: new FormControl(),
    floors: new FormControl(),
    sections: new FormControl(),
  });

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.productService.getSections().subscribe(sections => this.sections = sections);
    this.productService.getFloors().subscribe(floors => this.floors = floors);
    
    this.filters.valueChanges
      .pipe(switchMap(form => this.productService.getProducts(this.getFilters(form))))
      .subscribe(products => this.products = products);
  }

  private getFilters(form: any): ProductFilters | undefined {
    const { id, floors, sections } = form;
    const hasFilters = id || floors || sections;
    const filters: ProductFilters = { };

    if (id) {
      filters.id = id;
    }
    if (floors) {
      filters.floors = floors;
    }
    if (sections) {
      filters.sections = sections;
    }

    return hasFilters ? filters : undefined;
  }
}
