import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTransactionComponent} from './user-transaction.component';
const routes: Routes = [{ path: '', component: UserTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTransactionRoutingModule { }
