import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [MyBookingsComponent],
  imports: [
    CommonModule,MatPaginatorModule,
    MyBookingsRoutingModule
  ]
})
export class MyBookingsModule { }
