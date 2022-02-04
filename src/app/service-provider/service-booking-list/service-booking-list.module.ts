import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceBookingListdRoutingModule } from './service-booking-list-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { JitsiComponent } from 'src/app/jitsi/jitsi.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import {ServiceBookingListComponent} from './service-booking-list.component'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatPaginatorModule,
    ServiceBookingListdRoutingModule,
    MatDialogModule
  ]
})
export class ServiceBookingListModule { }
