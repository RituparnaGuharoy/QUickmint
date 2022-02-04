import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuplicateClassComponent } from './duplicate-class.component';
const routes: Routes = [{ path: '', component: DuplicateClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuplicateClassRoutingModule { }
