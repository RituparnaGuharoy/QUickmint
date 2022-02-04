import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [ServiceListComponent],
  imports: [
    CommonModule,MatTabsModule,
    ServiceListRoutingModule
  ]
})
export class ServiceListModule { }
