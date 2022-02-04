import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderFaqRoutingModule } from './provider-faq-routing.module';
import { ProviderFaqComponent } from './provider-faq.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProviderFaqComponent],
  imports: [
    CommonModule,
    ProviderFaqRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    FormsModule, MatPaginatorModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ]
})
export class ProviderEditModule { }
