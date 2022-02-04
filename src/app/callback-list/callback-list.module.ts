import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallbackListRoutingModule } from './callback-list-routing.module';
import { CallbackListComponent } from './callback-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [CallbackListComponent],
  imports: [
    CommonModule,MatPaginatorModule,
    CallbackListRoutingModule
  ]
})
export class CallbackListModule { }
