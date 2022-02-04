import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderTransactionRoutingModule } from './provider-transaction-routing.module';
import { ProviderTransactionComponent } from './provider-transaction.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ProviderTransactionComponent],
  imports: [
    CommonModule,MatPaginatorModule,
    ProviderTransactionRoutingModule
  ]
})
export class ProviderTransactionModule { }
