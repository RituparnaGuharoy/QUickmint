import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/routing-check', pathMatch: 'full' },
  { path: 'routing-check', loadChildren: () => import('./routing-check/routing-check-routing.module').then(m => m.RoutingCheckRoutingModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'sub-category/:id', loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule) },
  { path: 'product-list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'product-details', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'trainer', loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule) },
  { path: 'trainer-profile', loadChildren: () => import('./trainer-profile/trainer-profile.module').then(m => m.TrainerProfileModule) },
  { path: 'book-service', loadChildren: () => import('./book-service/book-service.module').then(m => m.BookServiceModule) },
  { path: 'location-tracking', loadChildren: () => import('./location-tracking/location-tracking.module').then(m => m.LocationTrackingModule) },
  { path: 'my-bookings', loadChildren: () => import('./my-bookings/my-bookings.module').then(m => m.MyBookingsModule) },
  { path: 'my-profile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'offer-price', loadChildren: () => import('./offer-price/offer-price.module').then(m => m.OfferPriceModule) },
  { path: 'service-book-details', loadChildren: () => import('./service-book-details/service-book-details.module').then(m => m.ServiceBookDetailsModule) },
  { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) },
  { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  { path: 'video-call', loadChildren: () => import('./video-call/video-call.module').then(m => m.VideoCallModule) },
  { path: 'provider-my-account', loadChildren: () => import('./provider-my-account/provider-my-account.module').then(m => m.ProviderMyAccountModule) },
  { path: 'provider-my-profile', loadChildren: () => import('./provider-my-profile/provider-my-profile.module').then(m => m.ProviderMyProfileModule) },
  { path: 'provider-service-book-details', loadChildren: () => import('./provider-service-book-details/provider-service-book-details.module').then(m => m.ProviderServiceBookDetailsModule) },
  { path: 'provider-service-book-details-completed', loadChildren: () => import('./provider-service-book-details-completed/provider-service-book-details-completed.module').then(m => m.ProviderServiceBookDetailsCompletedModule) },
  { path: 'registered-customer-list', loadChildren: () => import('./registered-customer-list/registered-customer-list.module').then(m => m.RegisteredCustomerListModule) },
  { path: 'provider-my-booking', loadChildren: () => import('./provider-my-booking/provider-my-booking.module').then(m => m.ProviderMyBookingModule) },
  { path: 'provider-my-transactions', loadChildren: () => import('./provider-my-transactions/provider-my-transactions.module').then(m => m.ProviderMyTransactionsModule) },
  { path: 'provider-my-analysis', loadChildren: () => import('./provider-my-analysis/provider-my-analysis.module').then(m => m.ProviderMyAnalysisModule) },
  { path: 'provider-wallet-history', loadChildren: () => import('./provider-wallet-history/provider-wallet-history.module').then(m => m.ProviderWalletHistoryModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'post-a-need', loadChildren: () => import('./post-a-need/post-a-need.module').then(m => m.PostANeedModule) },
  { path: 'create-event', loadChildren: () => import('./create-event/create-event.module').then(m => m.CreateEventModule) },
  { path: 'provider-service-add-modal', loadChildren: () => import('./provider-service-add-modal/provider-service-add-modal.module').then(m => m.ProviderServiceAddModalModule) },
  { path: 'public-job-list', loadChildren: () => import('./public-job-list/public-job-list.module').then(m => m.PublicJobListModule) },
  {path: 'service-provider-list', loadChildren: ()=> import('./service-provider-list/service-provider-list.module').then(m =>m.ServiceProviderListModule)},
  {path: 'provider-dashboard', loadChildren: ()=> import('./service-provider/service-provider-dashboard/service-provider-dashboard.module').then(m => m.ServiceProviderDashboardModule)},
  {path: 'service-booking-list', loadChildren: ()=> import('./service-provider/service-booking-list/service-booking-list.module').then(m => m.ServiceBookingListModule)},
  { path: 'slots-for-calendar', loadChildren: () => import('./slots-for-calendar/slots-for-calendar.module').then(m => m.SlotsForCalendarModule) },
  { path: 'provider-add', loadChildren: () => import('./provider-add/provider-add.module').then(m => m.ProviderAddModule) },
  { path: 'filter', loadChildren: () => import('./component/filter/filter.module').then(m => m.FilterModule) },
  { path: 'register-class-list', loadChildren: () => import('./register-class-list/register-class-list.module').then(m => m.RegisterClassListModule) },
  { path: 'register-class', loadChildren: () => import('./register-class/register-class.module').then(m => m.RegisterClassModule) },
  { path: 'header', loadChildren: () => import('./shared/header/header-routing.module').then(m => m.HeaderRoutingModule) },
  { path: 'popup-details', loadChildren: () => import('./popup-details/popup-details.module').then(m => m.PopupDetailsModule) },
  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'about-me', loadChildren: () => import('./about-me/about-me.module').then(m => m.AboutMeModule) },
  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'cms-pages', loadChildren: () => import('./cms-pages/cms-pages.module').then(m => m.CmsPagesModule) },
  {path:'service-provider-details',loadChildren:()=> import('./service-details/service-details.module').then(m=>m.ServiceDetailsModule)},
  {path: 'service-list',loadChildren:()=>import('./service-list/service-list.module').then(m => m.ServiceListModule)},
  {path:'service-edit-view',loadChildren:()=>import('./service-edit-view/service-edit-view.module').then(m=>m.ServiceEditViewModule)},
  {path:'service-details',loadChildren:()=>import('./service-details/service-details.module').then(m=>m.ServiceDetailsModule)},
  {path:'sub-category-class',loadChildren:()=>import('./sub-category-class/sub-category-class.module').then(m=>m.SubCategoryClassModule)},
  {path:'sub-category-classA',loadChildren:()=>import('./sub-category-classA/sub-category-classA.module').then(m=>m.SubCategoryClassAModule)},
  {path:'credentials',loadChildren:()=>import('./credentials/credentials.module').then(m=>m.CredentialsModule)},
  {path:'provider-faq-list',loadChildren:()=>import('./provider-faq-list/provider-faq-list.module').then(m=>m.ProviderFaqListModule)},
  {path:'provider-feedback-list',loadChildren:()=>import('./provider-feedback-list/provider-feedback-list.module').then(m=>m.ProviderFeedbackListModule)},
  {path:'class-details',loadChildren:()=>import('./class-details/class-details.module').then(m=>m.ClassDetailsModule)},
  {path:'my-doc',loadChildren:()=>import('./my-doc/my-doc.module').then(m=>m.MyDocModule)},
  {path:'service-calander',loadChildren:()=>import('./service-calender/service-calender.module').then(m=>m.ServiceCalenderModule)},
  {path:'service-planner',loadChildren:()=>import('./service-planner/service-planner.module').then(m=>m.ServicePlannerModule)},
  { path: 'how-work', loadChildren: () => import('./about-new/about-new.module').then(m => m.AboutNewModule) },
  { path: 'term-conditions', loadChildren: () => import('./term-conditions/term-conditions.module').then(m => m.TermConditionsModule) },
  { path: 'image-gallery', loadChildren: () => import('./image-gallery/image-gallery.module').then(m => m.ImageGalleryModule) },
  { path: 'Privacy-policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'provider-faq', loadChildren: () => import('./provider-faq/provider-faq.module').then(m => m.ProviderEditModule) },
  { path: 'customer-faq', loadChildren: () => import('./provider-faq/provider-faq.module').then(m => m.ProviderEditModule) },
  { path: 'provider-service-list', loadChildren: () => import('./provider-servicelist/provider-servicelist.module').then(m => m.ProviderServicelistModule) },
  
  { path: 'avilibity-calender', loadChildren: () => import('./availibity-calender/availibity-calender.module').then(m => m.AvailibityCalenderModule) },
  { path: 'avilibity-calender', loadChildren: () => import('./availibity-calender/availibity-calender.module').then(m => m.AvailibityCalenderModule) },
  { path: 'user-select-class', loadChildren: () => import('./user-select-class/user-select-class.module').then(m => m.UserSelectClassModule) },
  { path: 'booked_class_details', loadChildren: () => import('./provider-class-booking-details/provider-class-booking-details.module').then(m => m.ProviderClassBookingDetailsModule) },
  { path: 'provider_class_list', loadChildren: () => import('./provider-class-list/provider-class-list.module').then(m => m.ProviderClassListModule) },
  { path: 'user-transaction-list', loadChildren: () => import('./user-transaction/user-transaction.module').then(m => m.UserTransactionModule) },
  { path: 'provider-transaction-list', loadChildren: () => import('./provider-transaction/provider-transaction.module').then(m => m.ProviderTransactionModule) },
  { path: 'transaction-details', loadChildren: () => import('./transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule) },
  { path: 'view-details', loadChildren: () => import('./provider-class-details/provider-class-details.module').then(m => m.ProviderClassDetailsModule) },
  { path: 'edit-details', loadChildren: () => import('./edit-class/edit-class.module').then(m => m.EditClassModule) },
  { path: 'ask-question', loadChildren: () => import('./ask-question/ask-question.module').then(m => m.AskQuestionModule) },
  { path: 'duplicate-class', loadChildren: () => import('./duplicate-class/duplicate-class.module').then(m => m.DuplicateClassModule) },
  { path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then(m=>m.PricingModule)},
  { path: 'call-back-list', loadChildren: () => import('./callback-list/callback-list.module').then(m=>m.CallbackListModule)},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
