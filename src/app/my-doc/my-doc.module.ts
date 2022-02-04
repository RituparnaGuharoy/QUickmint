import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDocRoutingModule } from './my-doc-routing.module';
import { MyDocComponent } from './my-doc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyDocComponent],
  imports: [
    CommonModule,
    MyDocRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class MyDocModule { }
