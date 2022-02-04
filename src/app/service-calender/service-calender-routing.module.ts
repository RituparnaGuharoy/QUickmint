import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCalenderComponent } from './service-calender.component';
const routes: Routes = [
  { path: '', component: ServiceCalenderComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCalenderRoutingModule { }
