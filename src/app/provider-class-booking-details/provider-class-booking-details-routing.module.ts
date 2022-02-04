import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderClassBookingDetailsComponent } from './provider-class-booking-details.component';
const routes: Routes = [{ path: '', component: ProviderClassBookingDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderClassBookingDetailsRoutingModule { }
