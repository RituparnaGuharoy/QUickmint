import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header.component';

const routes: Routes = [{ path: '', component: HeaderComponent },
//{ path: 'service-provider-list/:id', loadChildren: () => import('../../service-provider-list/service-provider-list.module').then(m => m.ServiceProviderListModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
