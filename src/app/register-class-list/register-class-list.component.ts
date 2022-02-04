import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassDetailsPopupComponent } from '../class-details-popup/class-details-popup.component';
import { JitsiComponent } from '../jitsi/jitsi.component';
import { WebserviceService } from '../services/webservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment.prod';

var url = environment.api;
@Component({
  selector: 'app-register-class-list',
  templateUrl: './register-class-list.component.html',
  styleUrls: ['./register-class-list.component.css'],
})
export class RegisterClassListComponent implements OnInit {
  
  @ViewChild('meeting') mapElement: ElementRef;
  userType = localStorage.getItem('userType');
  id = localStorage.getItem('userId');
  userData = JSON.parse(localStorage.getItem('userData')!);
  // photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;

  classesList: any;
  providersList: any;
  data: any;
  serviceData:any;
  trainingValue:any;
  stripeTokenData:any;
  BookingObjectId:any;
  price:number;
  title:string;
  bookedArray:any;
  bookinglist :any = [];
  isDisabled = true;
  currentTime :any;
  serviceTime:any;
  currentdateComponent:any;
  startdateComponent:any;
  currenttimeComponent:any;
  starttimeComponent:any;
  // endDate1:any;
  // endTime1:any;
  enddateComponent:any;
  endtimeComponent:any;
  difference1:any;
  difference2:any;

  //Ridtuparna//
  allClasslist:any
  offset:number;
  page = 1;
  limit = 25;
  params: any;
  count: Number = 0;
  constructor(
    public service: WebserviceService,
    public dialog: MatDialog,
    public toast: ToastrService,
    private router: Router,
  ) {
    this.offset = (new Date().getTimezoneOffset());
  }

  ngOnInit(): void {
   this.userType == '1' ? this.getMyClasses() : this.getAllClassesList();
   this.getclasslist();
   this.invokeScript();
   
  // this.checkPayment();
   this.GetUserBookedList();
   //console.log('booked list',this.bookedArray);
  //this.currentTime = new Date().toISOString();
  
  this.currentTime = moment().toISOString();
  console.log('current time :',this.currentTime);
  //var str1 = this.currentTime;
  var currentdate = moment(this.currentTime);
  this.currentdateComponent = currentdate.format('YYYY-MM-DD');
  this.currenttimeComponent= currentdate.format('HH:mm:ss');
  console.log('date component1',this.currentdateComponent);
  console.log('time component1',this.currenttimeComponent);
  }


  meetingEnable(start:any,end:any):Boolean{
 // console.log('class time1',start)
  var startdate = moment(start);
  var enddate = moment(end);
  this.startdateComponent = startdate.format('YYYY-MM-DD');
  this.starttimeComponent = startdate.format('HH:mm:ss');
  this.enddateComponent = enddate.format('YYYY-MM-DD');
  this.endtimeComponent = enddate.format('HH:mm:ss');
  // console.log('date component2',this.startdateComponent);
  // console.log('time component2',this.starttimeComponent);
  // console.log('time compenent1',this.currenttimeComponent);
  if(this.currentdateComponent === this.startdateComponent)
  {
    
    var starttime  = `${this.starttimeComponent}`;
    var currenttime = `${this.currenttimeComponent}`;
    var endtime = `${this.endtimeComponent}`;

    this.difference1 = moment.utc(moment(starttime,"HH:mm:ss").diff(moment(currenttime,"HH:mm:ss"))).format("HH:mm:ss");
    console.log('difference1',this.difference1);

    this.difference2 = moment.utc(moment(currenttime,"HH:mm:ss").diff(moment(endtime,"HH:mm:ss"))).format("HH:mm:ss");
    console.log('difference2',this.difference2);
    
    //console.log( "javascript convert hours to minutes : ", this.convertHourstoMinute(this.difference));
    var fifteenmin = 10*60;
    var startseconds = this.convertHourstoMinute(this.difference1);
    var endseconds = this.convertHourstoMinute(this.difference2)
    console.log('seconds',startseconds , 'fifteen',fifteenmin);


    var currentTime1= moment(this.currentTime, 'HH:mm:ss')
    var startTime1 = moment(starttime, 'HH:mm:ss');
    var endTime1 = moment(endtime, 'HH:mm:ss');
    // var timecheck1 = start.isBefore(this.currentTime);
    // var timecheck2 = enddate.isAfter(this.currentTime);
    console.log('start time',starttime, 'current time',currenttime,'end time', endtime);
    //console.log('time check2',timecheck2);  //true

    if((startseconds<=fifteenmin || endseconds<=fifteenmin) || ((starttime<currenttime)&&(currenttime<endtime))){
      return false;
    }
  return true;
  }else{
   return true;
  }
  }

convertHourstoMinute(str:any) {
    let [hours, minutes,seconds] = str.split(':');
    return (+hours * 60 *60) + (+minutes *60) + (+seconds);
}


  // checkPayment(){
  //   let _id = '60f0bc3e0de8ca794683cc68';
  //   this.service.getbookedTraining(_id).subscribe((resp: any) => {
      
  //     console.log('getbookedTraining: ', resp);
  //   });
  // }

  async GetUserBookedList(){
    var that = this;
    let data={
      'page':this.page,
        'limit':this.limit,
    }
    this.service.getUserBookedList(data).subscribe((resp: any) => {
      console.log('get User booked list ', resp);
      this.bookedArray = resp.data;
      //this.bookedArray.push(...resp.data);

      //to getting list of id's accepted payment in booking list
      this.bookinglist = this.bookedArray.filter((data:any)=>{
       if(data.booking_status === 'accept' && data.user_id == this.id){
          return (data.bookedService._id);
       }
      }).map((data1:any)=>{
        return data1.bookedService._id
      })
      console.log('checked list',this.bookinglist);
      window.scrollTo(0, 0);
    });
    //this.bookedArray = that.bookedArray;
    console.log('booked array',this.bookedArray);
  }


  invokeScript(){
    if(!window.document.getElementById('stripe-script')){
      const script = window.document.createElement('script');
      script.id= 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }

  Payment(c:any){
    console.log('class', c);
    this.price = c.price;
    this.title = c.title;
    this.serviceData =
    {
      provider_id:c.provider_id._id,
    }
   this.trainingValue = c._id;

    //console.log('book request',Servicedata);
    //BookingObject
 this.service.bookService(this.serviceData,this.trainingValue).subscribe((resp:any)=>{
  console.log('book response',resp);
  this.BookingObjectId = resp._id;
  // use _id of book response for payment;
});
   
    //stripTokenData
    const paymentHandler = (<any>window).StripeCheckout.configure({
        key:'pk_test_51J0JswEh4mw6fxvKsQTAQeqhTu5VOD9ojd5Ur2lc65WNaBxSsn8jhrTlJIR1ooBgSgp5Rf5PMoZTwfBHrE71mqxY00Actf65yq',
        token:function(stripeToken:any){
          console.log('stripeToken',stripeToken);
          this.stripeTokenData = stripeToken._id;
         // alert('token has been created');
         return stripeToken;
        },
      });

    paymentHandler.open({
    name:this.title,
    //description:'products',
    amount:400*100
    })
    
    this.service.trainingPayment(this.BookingObjectId,this.stripeTokenData).subscribe((resp:any)=>{
      console.log( 'training response',resp);
      // use _id of book response for payment;
    })

    setTimeout(()=>{                           // <<<---using ()=> syntax
      console.log('price',this.price);
      console.log('stripeTokenData',this.stripeTokenData);
      console.log('booking object',this.BookingObjectId);
  }, 6000);
    
  }


 async makePayment(c:any){
    console.log('class', c);
    var ref = this;
    ref.price = c.price;
    this.title = c.title;
    let serviceData =
    {
      provider_id:c.provider_id._id,
    }
    let trainingValue = c._id;

    //console.log('book request',Servicedata);
    //BookingObject
   this.service.bookService(serviceData,trainingValue).subscribe((resp:any)=>{
    console.log('book response',resp);
    var that = this;
   // let booking = resp._id;
    let stripe;
    that.BookingObjectId = resp.data._id;
    //console.log('that.booking',this.BookingObjectId);
    // use _id of book response for payment;

    //stripTokenData
    const paymentHandler = (<any>window).StripeCheckout.configure({
        key:'pk_test_51J0JswEh4mw6fxvKsQTAQeqhTu5VOD9ojd5Ur2lc65WNaBxSsn8jhrTlJIR1ooBgSgp5Rf5PMoZTwfBHrE71mqxY00Actf65yq',
        token:function(stripeToken:any){
          console.log('stripeToken',stripeToken);
          that.stripeTokenData = stripeToken.id;
         // alert('token has been created');
         stripe = stripeToken._id
         that.service.trainingPayment(that.BookingObjectId,that.stripeTokenData).subscribe((resp:any)=>{
          console.log( 'training response',resp);
          if(resp.message == 'Success'){
            that.toast.success('booking successful!');
          }
          else{
            that.toast.success('some error has occurred while booking');
          }
          that.GetUserBookedList();
          // use _id of book response for payment;
        })
        },
      });

    paymentHandler.open({
    name:this.title,
    //description:'products',
    amount:ref.price*100
    })
   // console.log('that book',that.BookingObjectId);
  });  
  }

  gotoDetails(c:any){
    //console.log('details',c);
    //this.router.navigate(['/view-details/'])
    this.router.navigate(['/view-details/'],{queryParams : {classId: c._id}})
  }

  editclass(c:any){
    this.router.navigate(['/edit-details/'],{queryParams : {classId: c._id}})
  }

  duplicate(c:any){
    this.router.navigate(['/duplicate-class/'],{queryParams : {classId: c._id}})
  }

 BookService(c:any){
    console.log('class', c);
    let Servicedata =
    {
      provider_id:c.provider_id._id,
    }
    let trainingValue = c._id;
    console.log('book request',Servicedata);
    this.service.bookService(Servicedata,trainingValue).subscribe((resp:any)=>{
      console.log('book response',resp);
      // use _id of book response for payment;
    })
  }

  getMyClasses() {
    let value = this.service.classType;
    this.service.getClassesListProvider(this.id,value).subscribe((resp: any) => {
      console.log('getMyClasses: ', resp);
      this.service.classesList = resp.data;
    });
  }

  getAllClassesList() {
    let value = this.service.classType;
    this.service.getClasList().subscribe((resp: any) => {
      console.log('getAllClassesList: ', resp);
      this.service.classesList = resp.data;
    });
  }

  displayExpertise(c: any) {
    // console.log("c",  c)
    let exp = '';
    for (let [i, expertise] of c.expertise.entries()) {
      i == c.expertise.length - 1
        ? (exp += expertise)
        : (exp += expertise + ', ');
    }
    return exp;
  }

  doaction(c: any) {
    if (this.id === c.provider_id) {
      return this.joinMeeting(c);
    } else {
      for (let student of c.booked_students) {
        if (this.id! == student.Student_id) {
          return this.joinMeeting(c);
        }
      }
      return this.registerForClass(c);
    }
  }

  joinMeeting(c: any) {
    const dialogRef = this.dialog.open(JitsiComponent, {
      // width: '250px',
      data: {
        provider: { _id: c.provider_id },
        user: { _id: c._id },
      },
    });
  }

  registerForClass(c: any) {
    let data = {
      Student_id: this.id,
      Student_email: this.userData.UserEmail,
      Student_name: this.userData.UserFullName,
    };
    this.service.bookClass(c._id, data).subscribe((resp: any) => {
      console.log('registerForClass: ', resp);

      if (resp.success) {
        this.toast.success('Registered successfully!');
        this.getAllClassesList();
      }
    });
  }

  setButtonText(c: any) {
    if (this.id === c.provider_id) {
      return 'Join Meeting';
    } else {
      for (let student of c.booked_students) {
        if (this.id! == student.Student_id) {
          return 'Join Meeting';
        }
      }
      return 'Register for class';
    }
  }
  onValueChanged(ev: any) {
    console.log('from prov list: ', ev);
    this.data.lowerPrice = ev.price;
    this.data.minAge = ev.minAge;
    this.data.maxAge = ev.maxAge;
    console.log('data: ', this.data);

    this.getProviders(this.data);
  }

  getProviders(data: any) {
    
    let latlng = localStorage.getItem('userData')!;

    let d = JSON.parse(latlng).UserLocation;
    console.log('data: ', data);
    // console.log(latlng)
    // console.log(d)
    let queryParams = {
      category_id: data.category_id._id,
      sub_category_id: data._id,
      Latitude: d.Latitude,
      Longitude: d.Longitude,
      url: '',
      lowerPrice: data.lowerPrice,
      minAge: data.minAge,
      maxAge: data.maxAge,
    };
    this.service.getProvidersList(queryParams).subscribe((data: any) => {
      this.providersList = data.data;
      console.log('providersList: ', data.data);
    });
  }

  openDialog(job: any): void {
    const dialogRef = this.dialog.open(ClassDetailsPopupComponent, {
      // width: '250px',
      data: {
        job,
      },
    });
  }



  getclasslist(){
    this.service.getClasList().subscribe((resp: any) => {
      console.log('getAllClassesList: ', resp);
      //this.service.classesList = resp.data;
      if(resp.success){
        if(resp.count==0){
          this.toast.success('No class added');
        }else{
          this.allClasslist = resp.data
        }
      }
    });
  }

  delete(c:any){
    if (confirm('Are you sure you want to delete this class?')) {
      // Save it!
      console.log('Thing was saved to the database.');
      this.service.delete_class(c._id).subscribe((response:any)=>{
        console.log()
        if(response.success){
          this.getclasslist();
        }
      })
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

  noaccess(){
    this.toast.info("General Services is under construction. Please check back later.");
  }
}
