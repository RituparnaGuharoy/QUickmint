import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailsComponent } from './transaction-details.component';
import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';


@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [
    CommonModule,
    TransactionDetailsRoutingModule
  ]
})
export class TransactionDetailsModule { }
