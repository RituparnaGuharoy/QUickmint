import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderTransactionComponent } from './provider-transaction.component';
const routes: Routes = [{ path: '', component: ProviderTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderTransactionRoutingModule { }
