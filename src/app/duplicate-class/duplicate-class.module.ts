import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuplicateClassRoutingModule } from './duplicate-class-routing.module';
import { DuplicateClassComponent } from './duplicate-class.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FilterModule } from '../component/filter/filter.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [DuplicateClassComponent],
  imports: [
    CommonModule,
    DuplicateClassRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    FilterModule,
    MatSelectModule
  ]
})
export class DuplicateClassModule { }
