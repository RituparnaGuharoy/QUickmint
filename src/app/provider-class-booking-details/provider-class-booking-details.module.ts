import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderClassBookingDetailsRoutingModule } from './provider-class-booking-details-routing.module';
import { ProviderClassBookingDetailsComponent } from './provider-class-booking-details.component';


@NgModule({
  declarations: [ProviderClassBookingDetailsComponent],
  imports: [
    CommonModule,
    ProviderClassBookingDetailsRoutingModule
  ]
})
export class ProviderClassBookingDetailsModule { }
