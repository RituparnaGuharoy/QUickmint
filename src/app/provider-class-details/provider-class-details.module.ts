import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderClassDetailsRoutingModule } from './provider-class-details-routing.module';
import { ProviderClassDetailsComponent } from './provider-class-details.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [ProviderClassDetailsComponent],
  imports: [
    CommonModule,NgxStarRatingModule,RatingModule,FormsModule,
    ProviderClassDetailsRoutingModule
  ]
})
export class ProviderClassDetailsModule { }
