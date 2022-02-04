import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderClassDetailsComponent } from './provider-class-details.component';
const routes: Routes = [{ path: '', component: ProviderClassDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderClassDetailsRoutingModule { }
