import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermConditionsComponent } from './term-conditions.component';
const routes: Routes = [{ path: '', component: TermConditionsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermConditionsRoutingModule { }
