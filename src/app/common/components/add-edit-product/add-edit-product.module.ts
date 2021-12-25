import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AddEditProductComponent } from './add-edit-product.component';

@NgModule({
  declarations: [
    AddEditProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    AddEditProductComponent,
  ],
})
export class AddEditProductModule { }
