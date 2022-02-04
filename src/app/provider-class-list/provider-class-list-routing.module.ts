import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderClassListComponent } from './provider-class-list.component';
const routes: Routes = [{ path: '', component: ProviderClassListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderClassListRoutingModule { }
