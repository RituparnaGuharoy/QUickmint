import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserTransactionComponent} from './user-transaction.component';
import { UserTransactionRoutingModule } from './user-transaction-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserTransactionComponent],
  imports: [
    CommonModule,MatPaginatorModule,
    UserTransactionRoutingModule
  ]
})
export class UserTransactionModule { }
