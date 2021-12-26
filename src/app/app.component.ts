import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { AddEditProductComponent } from './common/components/add-edit-product/add-edit-product.component';
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
    code: new FormControl(),
    floors: new FormControl(),
    sections: new FormControl(),
  });

  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initWarehouse();
    // with a real BE we would debounce the API calls to only make a call once user stops typing
    // in this case we would separate code search and floor/section subscription
    // because only the typing needs to be debounced and floor/section is a click and doesn't need it
    this.filters.valueChanges
      .pipe(switchMap(form => this.productService.getProducts(this.getFilters(form))))
      .subscribe(products => this.products = products);
  }

  addEditProduct(product?: Product): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      disableClose: true,
      width: '375px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(type => {
      if (type !== 'cancel') {
        this.initWarehouse(this.getFilters(this.filters.value));
      }
    });
  }

  private getFilters(form: any): ProductFilters | undefined {
    const { code, floors, sections } = form;
    const hasFilters = code || floors || sections;
    const filters: ProductFilters = { };

    if (code) {
      filters.code = code;
    }
    if (floors) {
      filters.floors = floors;
    }
    if (sections) {
      filters.sections = sections;
    }

    return hasFilters ? filters : undefined;
  }

  initWarehouse(filters?: ProductFilters): void {
    this.productService.getProducts(filters).subscribe(products => this.products = products);
    this.productService.getSections().subscribe(sections => this.sections = sections);
    this.productService.getFloors().subscribe(floors => this.floors = floors);
  }
}
