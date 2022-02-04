import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderListRoutingModule } from '../service-provider-list/service-provider-list-routing.module';
import { ServiceProviderListComponent } from '../service-provider-list/service-provider-list.component';
import { FilterModule } from '../component/filter/filter.module';

import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { RatingModule } from 'ng-starrating';
@NgModule({
  
  declarations: [ServiceProviderListComponent],
  imports: [
    CommonModule,MatIconModule,
    RatingModule,MatSelectModule,
    ServiceProviderListRoutingModule,
    FilterModule
  ]
})
export class ServiceProviderListModule { }
