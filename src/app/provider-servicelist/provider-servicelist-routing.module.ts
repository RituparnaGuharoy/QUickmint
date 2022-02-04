import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderServicelistComponent } from './provider-servicelist.component';
const routes: Routes = [{ path: '', component: ProviderServicelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderServicelistRoutingModule { }
