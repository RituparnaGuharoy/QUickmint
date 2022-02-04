import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackListComponent } from './callback-list.component'
const routes: Routes = [{ path: '', component: CallbackListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallbackListRoutingModule { }
