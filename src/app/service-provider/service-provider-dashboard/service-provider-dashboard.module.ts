import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderDashboardRoutingModule } from './service-provider-dashboard-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,  
    ServiceProviderDashboardRoutingModule
  ]
})
export class ServiceProviderDashboardModule { }
