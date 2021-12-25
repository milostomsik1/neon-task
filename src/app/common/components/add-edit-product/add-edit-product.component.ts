import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: 'add-edit-product.component.html',
  styleUrls: [ 'add-edit-product.component.scss' ]
})
export class AddEditProductComponent implements OnInit {
  isEditing = false;

  product = new FormGroup({
    code: new FormControl(null),
    quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
    floor: new FormControl(null, [Validators.required, Validators.min(1)]),
    section: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    private readonly productService: ProductService,
  ) { }

  ngOnInit(): void {
    if (this.data?.product) {
      this.isEditing = true;
      this.product.setValue({...this.data.product});
      this.product.get('code')?.disable();
    }
  }

  close(type: 'cancel' | 'add' | 'update'): void {
    this.dialogRef.close(type);
  }

  updateProduct(): void {
    const product = this.product.getRawValue();
    this.productService.updateProduct(product).subscribe(() => this.close('update'));
  }
}
