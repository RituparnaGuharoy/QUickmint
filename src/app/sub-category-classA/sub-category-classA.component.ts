import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { WebserviceService } from 'src/app/services/webservice.service';
import { JitsiComponent } from '../jitsi/jitsi.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-sub-category-classA',
  templateUrl: './sub-category-classA.component.html',
  styleUrls: ['./sub-category-classA.component.css']
})
export class SubCategoryClassAComponent implements OnInit,OnDestroy {
  level = 0
  category_id: any;
  subcategorylisting: any;
  breadcrumbs = [];
  providersList: any = null;
  url: any;
  userType = localStorage.getItem('userType');
  id = localStorage.getItem('userId');
  baseUrl: any;
  // photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  classesList: any;
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
  enddateComponent:any;
  endtimeComponent:any;
  difference1:any;
  difference2:any;
  showList : boolean =true;
  token: any = localStorage.getItem('access-token-quickmint');
  page = 1;
  limit = 25;
  params: any;
  count: Number = 0;
  constructor(
    private route: ActivatedRoute,
    public service: WebserviceService,
    public router: Router,
    public dialog: MatDialog,
    public toast: ToastrService

  ) { }

  ngOnInit(): void {
   this.service.categoryId=this.service.adultCategoryId;
    this.getSubcategories();
    this.userType == '1' ? this.getMyClasses() : this.getRelatedClasses(this.service.classType,this.service.subCategoryId)
   this.invokeScript();

   this.checkPayment();
   this.GetUserBookedList();
  
  this.currentTime = moment().toISOString();
  var currentdate = moment(this.currentTime);
  this.currentdateComponent = currentdate.format('YYYY-MM-DD');
  this.currenttimeComponent= currentdate.format('HH:mm:ss');
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }


  getSubcategories() {
    this.service.subcategorylisting(this.service.categoryId).subscribe(
      (data: any) => {
        console.log('subcategory',data);
        if (data.count > 0) {
          this.service.subCategorylisting = (<any>data)["data"];
          this.level = 1
        } else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "none"
            }
          }
          this.router.navigate(['service-provider-list'], nav)
        }
        },
      (err) => {
        console.log(err);
      }
    );
  }

  getData(data:any){
    this.service.subCategoryId = data._id;
    this.service.showList = false;
    this.getRelatedClasses(this.service.classType,this.service.subCategoryId);
  }

  async getProviders(data: any) {
    console.log("level: ", this.level)
    if(this.level == 1) {
      // check if any subcat
      // yes, change level to 2, call subcatTwo
      // no, sp list TrainingProviders

      // 1
      this.service.getsubcategorylistingOne(data._id).subscribe((resp:any) => {
   // console.log("level getsubcategorylistingOne: ", this.level)
        console.log(resp)
      // 2
        if (resp.count > 0) {
          this.level = 2
    console.log("leveeeeel: ", this.level)

          this.subcategorylisting = resp.data
        }
        // 3
        else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "level 0"
            }
          }
          this.router.navigate(['service-provider-list'], nav)
        }
      })
    } else if (this.level == 2) {
      // check if any subcat
      // yes, change level to 3, call ???
      // no, sp list SubjectProviders
      this.service.getsubcategorylistingTwo(data._id).subscribe((resp:any) => {
        console.log("level getsubcategorylistingTwo: ", this.level)
            console.log(resp)
          // 2
            if (resp.count > 0) {
              this.level = 3
              this.subcategorylisting = resp.data
            }
            // 3
            else {
              let nav: NavigationExtras = {
                state: {
                  data: data,
                  type: "level 1"
                }
              }
              this.router.navigate(['service-provider-list'], nav)
            }
          })


    } else if (this.level == 3) {
      let nav: NavigationExtras = {
        state: {
          data: data,
          type: "level 2"
        }
      }
      this.router.navigate(['service-provider-list'], nav)
    }
    }


    meetingEnable(start:any,end:any):Boolean{
       var startdate = moment(start);
       var enddate = moment(end);
       this.startdateComponent = startdate.format('YYYY-MM-DD');
       this.starttimeComponent = startdate.format('HH:mm:ss');
       this.enddateComponent = enddate.format('YYYY-MM-DD');
       this.endtimeComponent = enddate.format('HH:mm:ss');
       if(this.currentdateComponent === this.startdateComponent)
       {
         var starttime  = `${this.starttimeComponent}`;
         var currenttime = `${this.currenttimeComponent}`;
         var endtime = `${this.endtimeComponent}`;
         this.difference1 = moment.utc(moment(starttime,"HH:mm:ss").diff(moment(currenttime,"HH:mm:ss"))).format("HH:mm:ss");
         this.difference2 = moment.utc(moment(currenttime,"HH:mm:ss").diff(moment(endtime,"HH:mm:ss"))).format("HH:mm:ss");
      
         var fifteenmin = 10*60;
         var startseconds = this.convertHourstoMinute(this.difference1);
         var endseconds = this.convertHourstoMinute(this.difference2)
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

     joinMeeting(c: any) {
      const dialogRef = this.dialog.open(JitsiComponent, {
        // width: '250px',
        data: {
          provider: { _id: c.provider_id },
          user: { _id: c._id },
        },
      });
    }
    async GetUserBookedList(){
      var that = this;
      let data={
        'page':this.page,
          'limit':this.limit,
      }
      this.service.getUserBookedList(data).subscribe((resp: any) => {
        console.log('get User booked list ', resp);
        this.bookedArray = resp.data;
        this.bookinglist = this.bookedArray.filter((data:any)=>{
         if(data.booking_status === 'accept' && data.user_id == this.id){
            return (data.bookedService._id);
         }
        }).map((data1:any)=>{
          return data1.bookedService._id
        })
        console.log('checked list',this.bookinglist);
  
      });
      console.log('booked array',this.bookedArray);
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
     this.service.bookService(serviceData,trainingValue).subscribe((resp:any)=>{
      var that = this;
      let stripe;
      that.BookingObjectId = resp.data._id;
      //stripTokenData
      const paymentHandler = (<any>window).StripeCheckout.configure({
          //key:'pk_test_51J0JswEh4mw6fxvKsQTAQeqhTu5VOD9ojd5Ur2lc65WNaBxSsn8jhrTlJIR1ooBgSgp5Rf5PMoZTwfBHrE71mqxY00Actf65yq',
          key: 'pk_live_51J0JswEh4mw6fxvKaufCiyufE6UH3qcnfhUGwuwnAsuu409DX3Ow0SsSkFbSDUAnpL0GhSEzcGTBV7UWAY93j7dW0042rjibCm',
          token:function(stripeToken:any){
            that.stripeTokenData = stripeToken.id;
           // alert('token has been created');
           stripe = stripeToken._id
           that.service.trainingPayment(that.BookingObjectId,that.stripeTokenData).subscribe((resp:any)=>{
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
    });  
    }
  
    gotoDetails(c: any) {
      this.router.navigate(['/service-details/'],{ queryParams: {providerId: c.provider_id._id} })
    }

    gotoClassDetails(c: any){
      console.log(c)
      let nav: NavigationExtras = {
        state: {
          data: c,
          //type: "none"
        }
      }
      //let nav =JSON.st(c)
      this.router.navigate(['/class-details'],nav)
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
    checkPayment(){
      let _id = '60f0bc3e0de8ca794683cc68';
      this.service.getbookedTraining(_id).subscribe((resp: any) => {
        console.log('getbookedTraining: ', resp);
      });
    }

    getRelatedClasses(value:any,subcategoryId:any){
       this.service.getRelatedClassList(value,subcategoryId).subscribe((resp: any) => {
          this.service.classesList = resp.data;
        });
     }

    getMyClasses() {
      let value = this.service.classType;
      this.service.getClassesListProvider(this.id,value).subscribe((resp: any) => {
        this.service.classesList = resp.data;
      });
    }
  
    getAllClassesList() {
      let value = this.service.classType;
      this.service.getClassesList(value).subscribe((resp: any) => {
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

    ngOnDestroy(){
    this.service.showList = true;
    }
  
    }
  