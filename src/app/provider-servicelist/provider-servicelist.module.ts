import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderServicelistRoutingModule } from './provider-servicelist-routing.module';
import { ProviderServicelistComponent } from './provider-servicelist.component';


@NgModule({
  declarations: [ProviderServicelistComponent],
  imports: [
    CommonModule,
    ProviderServicelistRoutingModule
  ]
})
export class ProviderServicelistModule { }
