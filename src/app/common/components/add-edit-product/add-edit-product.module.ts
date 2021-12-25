import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AddEditProductComponent } from './add-edit-product.component';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    AddEditProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule,
  ],
  exports: [
    AddEditProductComponent,
  ],
})
export class AddEditProductModule { }
