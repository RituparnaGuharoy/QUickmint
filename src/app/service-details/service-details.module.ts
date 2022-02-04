import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceDetailsRoutingModule } from './service-details-routing.module';
import { ServiceDetailsComponent } from './service-details.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { OwlModule } from 'ngx-owl-carousel';
import { RatingModule } from 'ng-starrating';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [ServiceDetailsComponent],
  imports: [
    CommonModule,
    ServiceDetailsRoutingModule,
    FormsModule,MatPaginatorModule,
    NgxStarRatingModule,
    OwlModule
  ]
})
export class ServiceDetailsModule { }
