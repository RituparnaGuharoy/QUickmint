import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProviderServiceAddModalComponent } from '../provider-service-add-modal/provider-service-add-modal.component';
import { FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

// import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

// import * as _ from 'lodash';
import { WebserviceService } from '../services/webservice.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-provider-my-profile',
  templateUrl: './provider-my-profile.component.html',
  styleUrls: ['./provider-my-profile.component.css'],
})
export class ProviderMyProfileComponent implements OnInit {
  UserPhoto: any;
  fileName: any;
  profileDetailsForm: any;
  passwordForm: any;
  passwordFormSubmitted: boolean = false;
  profileDetailsFormSubmitted: boolean = false;
  profileImage = false;
  galleryImages: any;
  searchAdd:any;
  DocumentImages:any=[];
  baseurl:any;
  photo_type:any;
  Docphoto:any;
  services:any=[];
  taxDate:any;
  tax_amount:any;
  sformdate:any;
  eformdate:any;
  dateArray:any=[];
  slot_time:number;
  checkslot:any;
  slot_start:any;
  slot_end:any;
  imageType:boolean
  tax_list: any;
  providerlink:any;
  imagelength:any;
  videolength:any;
  timeZone:any;
  categorylisting: any;
  addreslist:any;
  showDiv:boolean;
  taxdisplay:boolean;
  showedit:boolean;
  Time_zone:any;
  seach_lati:any;
  seach_lang:any;
  seach_add:any;
  address_feild:any;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private domSanitizer: DomSanitizer
  ) {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    this.Time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    this.timeZone=[
      "Central Daylight Time,Chicago (GMT-5)",
      "Mountain Daylight Time,Denver (GMT-6)",
      "Mountain Standard Time,Phoenix (GMT-7)",
      "Pacific Daylight Time,Los Angeles (GMT-7)",
      "Alaska Daylight Time,Anchorage (GMT-8)",
      "Hawaii-Aleutian Standard Time,Honolulu (GMT-10)",
      this.Time_zone
    ]
  }

  ngOnInit(): void {
    this.showDiv = false;
    this.showedit = false
    //this.baseurl = 'https://nodeserver.mydevfactory.com:4290/'
    this.baseurl =url;
    this.profileDetailsForm = this.newForm();

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      UserType: ['user'],
    });
    this.getProfileDetails();
    this.gettaxList();
    this.getCategory();
    this.get_address();
  }

  newForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
     // UserName: ['', [Validators.required]],
      UserFullName: ['', [Validators.required]],
      // UserEmail: ['', [Validators.required, Validators.email]],
      UserPhone: ['', [Validators.required]],
      paypal_account: ['',],
      Address: ['',],
      Latitude: ['',],
      Longitude: ['',],
      about_me : ['', [Validators.required]],
      OnlineStatus: ['', [Validators.required]],
      facebookUrl: ['',],
      instagramUrl : [''],
      twitterUrl : [''],
      tax_status:[''],
      user_time_zon:['',[Validators.required]],
      //ProvidedService: ['',[Validators.required]],
      ProfileName:['']
    });
  }


  autocompleteFocus() {
    let self=this;
    let value={};
    let address = (<HTMLInputElement>document.getElementById("pac-input"));
    console.log("address", address )
    // set the options
    let options = {
    types: [],
    componentRestrictions: {country: []}
    }
    
    let autocomplete1 = new google.maps.places.Autocomplete(address, options);
    
    google.maps.event.addListener(autocomplete1, 'place_changed', function() {
    
    let place = autocomplete1.getPlace();
    let geometry = place.geometry;
    console.log('place',place)
    //self.profileDetailsForm.set('Address').setValue(place.formatted_address);
    //self.profileDetailsForm['Address'].setValue(place.formatted_address);
    self.seach_add = place.formatted_address;
    self.profileDetailsForm.get('Address').setValue(
      place.formatted_address
    );
    // localStorage.setItem('current Address',self.search_addres);
    if ((geometry) !== undefined) {
      self.seach_lati = geometry.location.lat();
      self.seach_lang = geometry.location.lng();
      self.profileDetailsForm.get('Latitude').setValue(
        geometry.location.lat(),
      );
      self.profileDetailsForm.get('Longitude').setValue(
        geometry.location.lng(),
      );
        let data={
        'Name':'Quickmint',
        'Latitude':geometry.location.lat(),
        'Longitude':geometry.location.lng(),
        'Address':place.formatted_address,
        }
        console.log(data)
       // self.add_address(data);
    }
    })
    }


    add_address(){
      let data={
        'Name':'Quickmint',
        'Latitude':this.seach_lati,
        'Longitude':this.seach_lang,
        'Address':this.seach_add,
        }
        console.log(data)
      this.service.addadress(data).subscribe((response)=>{
        this.get_address();
        this.address_feild ='';
        //this.showDiv =false;
      })
    }
    deleteAddress(id:any){
      this.service.delete_addadress(id).subscribe((Response)=>{
        console.log(Response)
        this.get_address();
      })
     }

    getCategory() {
      this.service.categorylisting().subscribe(
        
        (data) => {
          console.log(data);
          
          this.categorylisting = (<any>data)['data'];
          // this.toastr.success((<any>data)["message"]);
  
          // this.router.navigate(['/login'])
        },
        (err) => {
          console.log(err);
        }
      );
      
    }

    get_address() {
      this.service.address_list().subscribe(
        
        (data) => {
          console.log('add',data);
          
          this.addreslist = (<any>data)['data'];
       
        },
        (err) => {
          console.log(err);
        }
      );
    }

  get f() {
    return this.passwordForm.controls;
  }
  get fp() {
    return this.profileDetailsForm.controls;
  }

  passwordFormOnSubmit() {
    if (!this.passwordForm.valid) {
      this.passwordFormSubmitted = true;
      // this.presentToast("Please fill all required data");
      this.toastr.warning('Please fill all required data');
      return;
    }
    if (
      this.passwordForm.value.newPassword !=
      this.passwordForm.value.confirmPassword
    ) {
      this.toastr.warning('Password and confirm password must be matched');
      return;
    }
    this.service.changePassword(this.passwordForm.value).subscribe(
      (data) => {
        // // console.log(data);
        if ((<any>data)['success'] == false) {
          // this.presentToast((<any>data)["message"]);
          this.toastr.warning((<any>data)['message']);
        } else if ((<any>data)['success'] == true) {
          // this.presentToast((<any>data)["message"]);
          this.toastr.success((<any>data)['message']);
          this.passwordFormSubmitted = false;
          // this.passwordForm.reset();
          // this.router.navigate(['/personalinfo'])
        }
      },
      (err) => {
        // console.log(err);
        // this.presentToast(err);
        this.toastr.warning(err);
      }
    );
  }

  onSubmit_1() {
    console.log(this.profileDetailsForm)
    if (!this.profileDetailsForm.valid) {
      this.profileDetailsFormSubmitted = true;
      
      this.toastr.warning('Please fill all required data');

      return;
    }
    const formData = new FormData();
    
      this.service.providerEditDetails(this.profileDetailsForm.value).subscribe(
      (data) => {

        this.toastr.success((<any>data)['message']);
        this.profileDetailsFormSubmitted = false;

      },
      (err) => {
        console.log(err);
      }
    );

    let data = {

        strat_date : this.profileDetailsForm.value.startDate ,
        end_date : this.profileDetailsForm.value.endDate ,
        schedule :this.profileDetailsForm.value.schedule
   
    }
    this.service.postSchedule(data).subscribe(resp => {
      console.log("postSchedule: ", resp);
      this.getProfileDetails();
    })
  }

  onSubmit(){
    if(!this.profileDetailsForm.value.UserFullName || this.profileDetailsForm.value.UserFullName == undefined || this.profileDetailsForm.value.UserFullName ==''){
      this.toastr.warning('Please input your name!!');
    }else if(!this.profileDetailsForm.value.UserPhone || this.profileDetailsForm.value.UserPhone == undefined || this.profileDetailsForm.value.UserPhone ==''){
      this.toastr.warning('Please input your phone number!!');
    }else if(!this.profileDetailsForm.value.about_me || this.profileDetailsForm.value.about_me == undefined || this.profileDetailsForm.value.about_me ==''){
      this.toastr.warning('Please write about yourself!!');
    }else if(!this.profileDetailsForm.value.user_time_zon || this.profileDetailsForm.value.user_time_zon == undefined || this.profileDetailsForm.value.user_time_zon ==''){
      this.toastr.warning('Please select your time zone');
    }else{
      const formData = new FormData();
    
      this.service.providerEditDetails(this.profileDetailsForm.value).subscribe(
      (data) => {

        this.toastr.success((<any>data)['message']);
        this.profileDetailsFormSubmitted = false;

      },
      (err) => {
        console.log(err);
      }
    );

    let data = {

        strat_date : this.profileDetailsForm.value.startDate ,
        end_date : this.profileDetailsForm.value.endDate ,
        schedule :this.profileDetailsForm.value.schedule
   
    }
    this.service.postSchedule(data).subscribe(resp => {
      console.log("postSchedule: ", resp);
      this.getProfileDetails();
    })
    }

  }


  getProfileDetails() {
    window.scrollTo(0, 0);
    this.DocumentImages=[];
    this.service.getworkerdetails().subscribe((resp: any) => {
      //console.log('getworkerdetails: ', resp.data.schedule[0].schedule);
       console.log('getworkerdetails: ', resp);
      this.profileImage = resp.data.imageUrl;
      this.galleryImages = resp.data.provider.gallery;
      this.DocumentImages = resp.data.provider.provider_documents;
      this.imagelength = resp.data.provider.gallery.length;
      this.videolength = resp.data.provider.video.length;
    
    

      //this.services = resp.data.provider.ProvidedService;

      // for(var i = 0;i<resp.data.provider.ProvidedService.length;i++){
      //   this.services.push(resp.data.provider.ProvidedService[i]._id)
      //   console.log('cats',resp.data.provider.ProvidedService[i]._id)
      //   this.profileDetailsForm.controls['ProvidedService'].setValue(
      //     this.services
      //   );
      // }
      if(resp.data.provider.ProfileName == undefined){
        this.providerlink ="http://quickmints.com/" + 'Bussiness Name';
      }else{
        this.providerlink ="http://quickmints.com/" + resp.data.provider.ProfileName;
      }
      
      this.profileDetailsForm.controls['email'].setValue(
        resp.data.provider.UserEmail
      );
      // this.profileDetailsForm.controls['ProfileName'].setValue(
      //   resp.data.provider.ProfileName
      // );
      // this.profileDetailsForm.controls['UserName'].setValue(
      //   resp.data.provider.UserName
      // );
      this.profileDetailsForm.controls['UserFullName'].setValue(
        resp.data.provider.UserFullName
      );
      this.profileDetailsForm.controls['UserPhone'].setValue(
        resp.data.provider.UserPhone
      );
      this.profileDetailsForm.controls['paypal_account'].setValue(
        resp.data.provider.paypal_account
      );

      this.profileDetailsForm.get('about_me').setValue(
        resp.data.provider.about_me
      );
      this.profileDetailsForm.get('OnlineStatus').setValue(
        JSON.stringify(resp.data.provider.OnlineStatus)
      );
      this.profileDetailsForm.get('facebookUrl').setValue(
        resp.data.provider.facebookUrl
      );
      this.profileDetailsForm.get('instagramUrl').setValue(
       resp.data.provider.instagramUrl
      );
      this.profileDetailsForm.get('twitterUrl').setValue(
        resp.data.provider.twitterUrl
      );
      this.profileDetailsForm.get('tax_status').setValue(
        resp.data.provider.tax_status
      );
      this.taxdisplay =  resp.data.provider.tax_status
      if(resp.data.provider.user_time_zon === undefined){
        console.log('profileDetailsForm:2 ', this.profileDetailsForm,this.Time_zone);
        this.profileDetailsForm.get('user_time_zon').setValue(
          this.Time_zone
        );
      }else{
        console.log('profileDetailsForm1: ', this.profileDetailsForm,this.Time_zone);
        this.profileDetailsForm.get('user_time_zon').setValue(
          resp.data.provider.user_time_zon
        );
      }
      
      this.profileDetailsForm.get('ProfileName').setValue(
        resp.data.provider.ProfileName
      );
      //console.log('profileDetailsForm: ', this.profileDetailsForm,this.Time_zone);

    });
  }

  hit(){
    console.log('dhsjhds')
    this.service.providerEditDetails(this.profileDetailsForm.value).subscribe(
      (data) => {

        //this.toastr.success((<any>data)['message']);
        this.profileDetailsFormSubmitted = false;
        this.getProfileDetails()
        this.showedit= false
      },
      (err) => {
        console.log(err);
      }
    );
    
  }
  openAddServiceDialog() {
    const dialogRef = this.dialog.open(ProviderServiceAddModalComponent, {
      width: '620px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
      this.getProfileDetails()
    });
  }


  onProfileImageSelected(event: any) {
    // console.log('Before' + this.UserPhoto);

    var files = event.target.files;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // console.log(mimeType);

      this.toastr.warning('Only images are supported.');

      return;
    }

    if (event.target.files.length > 0) {
      // console.log(event.target.files[0].name);
    }
    if (files.length === 0) return;
    // console.log(mimeType);
    if (event.target.files && event.target.files[0]) {
      this.UserPhoto = event.target.files[0];
      // console.log(this.UserPhoto);
      const reader = new FileReader();
      // reader.onload = e => this.selectedUserPhoto = reader.result.toString();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(this.UserPhoto);
      // console.log('After' + this.UserPhoto);
      reader.onload = (ev: any) => {
        this.profileImage = ev.target.result;
      };
      this.service.providerEditDetailsWithImage(this.UserPhoto).subscribe(
        (data:any) => {
           console.log(data);
          // this.imageUrl = "https://nodeserver.mydevfactory.com:4290/" + (<any>data)["data"]["UserPhoto"]
          // this.profileImage = this.UserPhoto.name;
          this.ref.detectChanges();
          if(data['status']){
            this.service.publishprofileImage({
              Profile_image: this.profileImage
              });
          }
          // this.presentToast((<any>data)["message"]);
          this.toastr.success(data['message']);
          // this.profileDetailsFormSubmitted = false;
          // this.profileDetailsForm.reset();
          // this.router.navigate(['/login'])
        },
        (err) => {
          // console.log(err);
        }
      );
    }
  }
  
  consol(day:number, time:number, index: number) {
    // console.log("day: ", day, "time: ", time, "index: ", index)
    // console.log(this.profileDetailsForm.value)
    // console.log(this.profileDetailsForm.get('schedule'))
    // console.log(this.profileDetailsForm.get('schedule').controls[index])

    let schedule = this.profileDetailsForm.get('schedule').controls[index].value
    // console.log(time, schedule, this.profileDetailsForm.get('schedule').controls[index].value.includes(time))
    if (schedule.includes(time)) {
      let newval = schedule.filter((el:number) => el != time)
      this.profileDetailsForm.get('schedule').controls[index].setValue(newval)
    } else {
      schedule.push(time)
      this.profileDetailsForm.get('schedule').controls[index].setValue(schedule)
    }
    // console.log(this.profileDetailsForm.get('schedule').controls[index].value)

  }

  scheduleIncludes(day:any, time:number, index: number) {
    // console.log("day: ", day, "time: ", time, "index: ", index)
    // console.log("value: ",this.profileDetailsForm.get('schedule').controls[index].value)
    let schedule = this.profileDetailsForm.get('schedule').controls[index].value

    if (schedule.includes(time)) {
      return true
    } else return false

  }


  

  add(){
    this.showDiv =! this.showDiv;
  }

  AddDoc(){
    if(this.photo_type ==undefined){
      this.toastr.show('Please add doc name');
      return
    }
    this.service.documentupload(this.Docphoto,this.photo_type).subscribe(
      (data) => {
        console.log(data);
        
        this.getProfileDetails();
        
        if((<any>data)['status']){
          this.photo_type = '';
          this.toastr.success((<any>data)['message']);
        }else{
          this.toastr.show((<any>data)['message']);
        }
        
        
        // this.profileDetailsFormSubmitted = false;
        // this.profileDetailsForm.reset();
        // this.router.navigate(['/login'])
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  // showDiv={
  //   appear:false
  // }

  deleteicon(id:any){
    
    console.log(id)
    let data={
      'documenid':id
    }
    this.service.detletedoc(data).subscribe(
      (data) => {
        console.log(data);
        if((<any>data)['success']){
          this.toastr.success('Delete document successfully');
          this.getProfileDetails()
        }
      })
  }

  somethingChanged(event:any){
    var today = new Date();
      var da = today.getDate().toString().padStart(2, "0");
      var m = (today.getMonth() + 1).toString().padStart(2, "0");
      var y = today.getFullYear();
      
    var currentDate = y +'-'+ m + '-' + da;
    
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." +today.getMilliseconds()+'Z';
    console.log(currentDate)

    if(this.tax_amount==undefined){
      this.toastr.success('Please add tax amount');
    }else if(this.taxDate<currentDate){
      this.toastr.success('select propper date');
    }
    else{
      let data={
        'tax_amount' :this.tax_amount,
        'start_date' : this.taxDate + 'T00:00:00.000Z'
      }
      console.log(data)
      this.service.addTax(data).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
          this.gettaxList();
        }else{
          this.toastr.info(response.message)
        }
      })
    }
  }


  gettaxList(){
    this.service.taxList().subscribe((response:any)=>{
      console.log(response)
      this.tax_list = response.data

    })
  }


  scheduleDate(){

      const dateArray = [];
      this.dateArray=[]
      let currentDate = new Date(this.sformdate);
      const options = {  year: 'numeric', month: 'long', day: 'numeric' };
      while (currentDate <= new Date(this.eformdate)) {
         dateArray.push(new Date(currentDate));
         this.dateArray.push({
           'day' : (new Date(currentDate)).toLocaleDateString('en-US',{weekday: 'short'}),
           'date' : (new Date(currentDate)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
         })
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }

      console.log(this.dateArray)
  }

  schedule_slot(event:any){
    console.log(event)
    if(event.target.checked){
      this.checkslot= event.target.defaultValue
    }else{
      this.checkslot= ''
    }
    
  }

  getslot(event:any){
    
    var d = new Date();
    var da = d.getDate().toString().padStart(2, "0");
    var m = (d.getMonth() + 1).toString().padStart(2, "0");
    var y = d.getFullYear();
    
    var currentDate = y +'-'+ m + '-' + da;
    var BookingTime:any= currentDate+'T'+this.slot_start+ ':11.971Z'
    //BookingTime.setMinutes(BookingTime.getMinutes()+5);
    console.log((new Date(BookingTime)).getMinutes())
  }

  gotogallery(type:any){
    this.router.navigate(['/image-gallery/'],{ queryParams: {type: type} })
  }

  getSubcategory(event:any){
    var selectcategory=[]
    
    selectcategory.push(event.target.value)
    console.log(selectcategory)
  }

slide(event:any){
  console.log(event.checked)
  this.taxdisplay = event.checked
}

fieldsChange(event:any,id:any,i:any){
    
  console.log(event.target.checked)
  if (event.target.checked) {
    this.services.push(event.target.value)
    this.profileDetailsForm.get('ProvidedService').setValue(
      this.services
    );
    console.log(this.services)
  }else {
    var index = this.services.indexOf(event.target.value); 
    if (index !== -1){
      this.services.splice(index, 1);
      this.profileDetailsForm.get('ProvidedService').setValue(
        this.services
      );
      console.log(this.services)
    }
  }
}
check(tag:any, hobbyArr:any)

{
  ///console.log(tag, hobbyArr)
  if(hobbyArr.indexOf(tag) > -1)
  {
    return true;
  }
  else
  {
    return false;
  }
}

editname(){
this.showedit =! this.showedit;
}

}
