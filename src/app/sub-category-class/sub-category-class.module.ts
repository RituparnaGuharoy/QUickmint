import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryClassRoutingModule } from './sub-category-class-routing.module';
import { SubCategoryClassComponent } from './sub-category-class.component';
import { FilterClassModule } from '../component/filter-class/filter-class.module';
//import { FilterClassAModule } from '../component/filter-classA/filter-classA.module';
//import { FilterClassA } from '../component/filter-classA/filter-classA.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NgxStarRatingModule } from 'ngx-star-rating';
@NgModule({
  declarations: [SubCategoryClassComponent],
  imports: [
    CommonModule,NgxStarRatingModule,
    SubCategoryClassRoutingModule,FormsModule,ReactiveFormsModule,MatSelectModule,
    FilterClassModule,MatPaginatorModule
    //FilterClassAModule
  ]
})
export class SubCategoryClassModule { }
