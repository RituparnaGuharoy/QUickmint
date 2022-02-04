import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlModule } from 'ngx-owl-carousel';  
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ServiceBookingListComponent } from './service-provider/service-booking-list/service-booking-list.component';
import { ServiceProviderDashboardComponent } from './service-provider/service-provider-dashboard/service-provider-dashboard.component';
import { ServiceBookingListModule } from './service-provider/service-booking-list/service-booking-list.module';
import { ServiceProviderDashboardModule } from './service-provider/service-provider-dashboard/service-provider-dashboard.module';
import { RoutingCheckComponent } from './routing-check/routing-check.component';
import { RoutingCheckModule } from './routing-check/routing-check.module';
import { SearchFilterPipe } from './search-filter.pipe';
import { JitsiComponent } from './jitsi/jitsi.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassDetailsPopupComponent } from './class-details-popup/class-details-popup.component';
import { CallPopupComponent } from './call-popup/call-popup.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CmsPagesComponent } from './cms-pages/cms-pages.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ServiceCalenderComponent } from './service-calender/service-calender.component';
import { ServicePlannerComponent } from './service-planner/service-planner.component';
import { AboutNewComponent } from './about-new/about-new.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AvailibityCalenderComponent } from './availibity-calender/availibity-calender.component';
//import { NgChartsModule } from 'ng2-charts';
// import { UserTransactionComponent } from './user-transaction/user-transaction.component';
// import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ServiceBookingListComponent,
    ServiceProviderDashboardComponent,
    RoutingCheckComponent,
    SearchFilterPipe,
    JitsiComponent,
    ClassDetailsPopupComponent,
    CallPopupComponent,
    ClassDetailsComponent,
    ServiceCalenderComponent,
    ServicePlannerComponent,
    AboutNewComponent,
    TermConditionsComponent,
    ImageGalleryComponent,AvailibityCalenderComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjhOO660KV12k_YRTz2quLsk6IwM4WfT4',
      libraries: ['places'],
    }),
    MatGoogleMapsAutocompleteModule,
    BrowserModule,
    OwlModule,MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    // MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    ServiceBookingListModule,
    ServiceProviderDashboardModule,
    RoutingCheckModule,
    MatDialogModule,MatPaginatorModule,
    MatFormFieldModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
