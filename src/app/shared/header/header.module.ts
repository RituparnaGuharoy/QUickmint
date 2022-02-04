import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { RouterModule } from '@angular/router';

import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


@NgModule({
  declarations: [],
  imports: [
    MatGoogleMapsAutocompleteModule,
    CommonModule,
    HeaderRoutingModule,
    RouterModule,
  ],
  exports: [CommonModule],
})
export class HeaderModule {}
