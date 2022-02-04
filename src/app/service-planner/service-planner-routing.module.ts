import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicePlannerComponent } from './service-planner.component';
const routes: Routes = [{ path: '', component: ServicePlannerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePlannerRoutingModule { }
