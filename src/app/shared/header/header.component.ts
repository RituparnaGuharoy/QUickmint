/// <reference types="@types/googlemaps" />
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { CommonService } from 'src/app/common.service';

import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
import {
  Location,
  Appearance,
  GermanAddress,
} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //for maps
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  baseurl =url;
  categorylisting: any;
  categorySubcategory:any;
  subcategorylisting:any;
  level:any;
  open = false;
  userType: any;
  searchQuery: any = '';
  list: never[];
  stripeToken:any;
  User_fullName:any;
  UserData:any={}
  token= localStorage.getItem('access-token-quickmint')
  profile_image:any;
  categoryId:any;
  constructor(
    public dialog: MatDialog,
    public service: WebserviceService,
    public router: Router,
    public ref: ChangeDetectorRef,
    public commonService: CommonService,
    private titleService: Title,
    private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.stripeToken = localStorage.getItem('stripeCustomeToken');
    //maps
    // this.titleService.setTitle(
    //   'Home | @angular-material-extensions/google-maps-autocomplete'
    // );

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();
     this.getProfileDetails()
    //maps end
    console.log('Header loaded');
    console.log('stripeToken',this.stripeToken);
    // this.ref.detectChanges()
    this.service.getObservable().subscribe((resp) => {
      console.log('Header should change: ', resp);
      if (resp.token) {
        this.userType = localStorage.getItem('userType');
        this.User_fullName = localStorage.getItem('UserFullName');
        
        this.ref.markForCheck();
        if(resp.userType == '2'){
          //location.reload();
          if(resp.route == true){
            this.userDetails();
          }else{
            location.reload();
            this.userDetails();
          }
          
        }
        if(resp.userType == '1'){
        
          this.ProviderDetails();
        }
        this.ref.detectChanges();
      }
    });

    this.service.getObservableProfileimage().subscribe((resp:any) => {
      console.log(resp)
      //this.profile_image = resp['Profile_image']
      this.getProfileDetails()
    })
    
    this.userType = localStorage.getItem('userType');
    if(this.token){
      if(localStorage.getItem('userType') == '2'){
        this.userDetails();
      }
      if(localStorage.getItem('userType') == '1'){
        this.ProviderDetails();
      }
    }
    
    // this.service.categorylisting().subscribe(
    //   (data) => {
    //     console.log('category',data);
    //     this.categorylisting = (<any>data)['data'];
      
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    // this.service.categorySubcategory().subscribe(
    //   (data) => {
    //     this.categorySubcategory = (<any>data)['data'];
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    let data={
      'page':1,
      'limit':200,
    }
    this.service.gerclasscategory(data).subscribe(
      (data) => {
        this.categorylisting = (<any>data)['data'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }


  getProfileDetails() {
    
    this.service.getworkerdetails().subscribe((resp: any) => {
      //console.log('getworkerdetails: ', resp.data.schedule[0].schedule);
       console.log('getworkerdetails: ', resp);
      this.profile_image = resp.data.imageUrl;
      
    
    

      //this.services = resp.data.provider.ProvidedService;

    
      // console.log('profileDetailsForm: ', this.profileDetailsForm.get('schedule'));

    });
  }

  addStripeAccount(){
    this.service.AddStripeAccount().subscribe(
      (data:any) => {
       if(data.success === false){
        this.toastr.warning('token has been created');
       }
       else{
         window.open(data.data.url,'_blank');
       }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  verifyStripeAccount(){
    this.service.VerifyStripeAccount().subscribe(
      (data:any) => {
       if(data.success === false)
       this.toastr.warning(data.message);
       else
       this.toastr.success(data.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listingDetails(id:any,name:any){
    // const found = this.categorylisting.some((data:any) => data._id === id);
    // if(found){
    // this.router.navigate(['/sub-category/'+id]);
    // }
    // else{
    //   this.service.subcategorylisting(id).subscribe(
    //     (data: any) => {
    //       console.log('reached here',data);
    //         let nav: NavigationExtras = {
    //           state: {
    //             data: data.data,
    //             type: 'level 0'
    //           }
    //         }
    //         this.router.navigate(['service-provider-list'], nav)
    //       },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
    console.log(id)
    this.searchQuery = name
    this.categoryId = id;
    this.toastr.info('Please enter your preferred location')
  }

  getSubcategories(id:any) {
    this.service.subcategorylisting(id).subscribe(
      (data: any) => {
        console.log(data);
        if (data.count > 0) {
          this.subcategorylisting = (<any>data)["data"];
          this.level = 1
        } else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "none"
            }
          }
          this.router.navigate(['/service-provider-list'], nav)
        }
        },
      (err) => {
        console.log(err);
      }
    );
  }

  gotoCredentials(){
    this.router.navigate(['/credentials']);
  }

  gotoQuestions(){
    this.router.navigate(['/provider-feedback-list']);
  }

  gotocallback(){
    this.router.navigate(['/call-back-list']);
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;

    this.service.Latitude = location.latitude;
    this.service.Longitude = location.longitude;
    let nav: NavigationExtras = {
      state: {
        data: this.categoryId,
        type: "none"
      }
    }
    //this.router.navigate(['/service-provider-list/'],{ queryParams: {id: this.categoryId,Latitude: location.latitude,Longitude: location.longitude} })
    this.router.navigate(['/sub-category-class'],{queryParams : {classId: this.categoryId,Latitude: location.latitude,Longitude: location.longitude,serachType:'location'}});
  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
    this.service.Address = $event.displayAddress;
  }

  // tslint:disable-next-line:typedef
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }
  logout() {
    console.log('logout called');
    console.log(this.service.isLoggedIn);
    localStorage.removeItem('access-token-quickmint');
    localStorage.removeItem('loginData');
    localStorage.removeItem('userData');
    localStorage.removeItem('stripeCustomeToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('UserFullName');
    this.service.isLoggedIn = false;
    this.router.navigate(['/home']);
    this.service.publishlogoutData({
      user_token: null
      });
  }
  gotoProfile() {
    this.router.navigate(['/my-profile']);
  }
  gotoProviderProfile() {
    this.router.navigate(['/provider-my-profile']);
  }

  goToJobList() {
    this.router.navigate(['/public-job-list']);
  }

  goToBookingList() {
    this.router.navigate(['/service-booking-list']);
  }

  goToBooking(){
    this.router.navigate(['/my-bookings'])
  }
gotologo(){
  if(this.userType =='1'){
    this.router.navigate(['/provider-dashboard'])
  }else{
    this.router.navigate(['/home'])
  }
}
  gotoSubcategory(id:any){
    console.log('header id',id);
    // var kidsid = "609155f8c1bef37b9230887a";
    // var adultsid = "60b41af8f3286a65034e5572";
    // console.log('kidsid',kidsid);
    // console.log('adultid',adultsid);
    // if(id==adultsid){
    //   this.service.classAdult = false;
    //   this.service.classType = 'adults';
    //   this.service.showList = true;
    // }
    // if(id==kidsid){
    //   this.service.classType = 'kids';
    //   this.router.navigate(['/sub-category-class']);
    // }
    // else if(id==adultsid){
    //   this.service.classType = 'adults';
    //   this.router.navigate(['/sub-category-classA']);
    // }
    // else{
    // this.router.navigate(['/sub-category/'+id]);
    // }
  }

  onSearchChange(arg: any) {
    console.log('evevevevevevev', arg);
  }

  onSearch(ev: any) {
    console.log('evevevevevevev', ev);

   this.categorylisting = { ...this.categorylisting };
   
    //this.categorySubcategory = {...this.categorySubcategory};
    console.log('list after search', this.list);
  }

  openDropdown() {
    console.log('on focus: ', this.open);
    this.open = true;
  }

  closeDropdown() {
    console.log('on blur: ', this.open);
    setTimeout(() => {
      this.open = false;
    }, 250);
  }
  showw(i: any) {
    console.log(i);
    return JSON.stringify(i);
  }

  gotToSubCat(item: any) {
    console.log('clicked');

    this.router.navigateByUrl('/sub-category/' + item._id);
  }

  userDetails(){
    this.service.userOwnDetails().subscribe(
      (data) => {
        this.UserData =(<any>data)["data"]
      })
  }
  ProviderDetails(){
    this.service.getworkerdetails().subscribe(
      (data) => {
        this.UserData =(<any>data)["data"].provider
      })
  }

  goToTransaction_user(){
    this.router.navigateByUrl('/user-transaction-list');
  }
  goToTransaction_provider(){
    this.router.navigateByUrl('/provider-transaction-list');
  }
  openRegisterDialog(){
    const dialogRef = this.dialog.open(RegisterComponent, { width: '950px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }
}
