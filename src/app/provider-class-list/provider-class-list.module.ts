import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderClassListRoutingModule } from './provider-class-list-routing.module';
import { ProviderClassListComponent } from './provider-class-list.component';


@NgModule({
  declarations: [ProviderClassListComponent],
  imports: [
    CommonModule,
    ProviderClassListRoutingModule
  ]
})
export class ProviderClassListModule { }
