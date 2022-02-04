import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailibityCalenderComponent } from './availibity-calender.component';

const routes: Routes = [{ path: '', component: AvailibityCalenderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailibityCalenderRoutingModule { }
