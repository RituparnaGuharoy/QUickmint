import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryClassARoutingModule } from './sub-category-classA-routing.module';
import { SubCategoryClassAComponent } from './sub-category-classA.component';
//import { FilterClassModule } from '../component/filter-class/filter-class.module';
import { FilterClassAModule } from '../component/filter-classA/filter-classA.module';
//import { FilterClassA } from '../component/filter-classA/filter-classA.component';


@NgModule({
  declarations: [SubCategoryClassAComponent],
  imports: [
    CommonModule,
    SubCategoryClassARoutingModule,
    FilterClassAModule,
    //FilterClassAModule
  ]
})
export class SubCategoryClassAModule { }
