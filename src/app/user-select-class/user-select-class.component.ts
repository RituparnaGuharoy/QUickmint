import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';
import { data } from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-user-select-class',
  templateUrl: './user-select-class.component.html',
  styleUrls: ['./user-select-class.component.css']
})
export class UserSelectClassComponent implements OnInit {
  classId:string;
  classDetails:any={};
  class_booking :any ={};
  ownDetails:any={};
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  stripeTokenData: any;
  UserAge:any={};
  token: any = localStorage.getItem('access-token-quickmint');
  select_price:any;
  payment_type:any;
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => { 
      // this.classDetails= this.router.getCurrentNavigation()!.extras.state!.data;
      // console.log('this.classDetails: ', this.classDetails);
      console.log('class id',params.classId);
      this.classId = params.classId;
      this.select_price= params.Price;
      this.payment_type = params.payment_type
  });
  
  this.getclassDeails();
  
  }


  userDetails(){
    this.service.userOwnDetails().subscribe((Response:any)=>{
      console.log(Response)
      if(Response.success){
        this.ownDetails = Response.data;
        
      }
    })
  }

  calculateAge(birthday:any) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //return Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log(Math.abs(ageDate.getUTCFullYear() - 1970))
    this.UserAge = Math.abs(ageDate.getUTCFullYear() - 1970);
}


  getclassDeails(){
    this.service.getClassDetail(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.classDetails = response.data;
        this.userDetails();
      }
      
    })
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }

  Book_class(classtype:any){

    // if(!this.class_booking.student_name){
    // this.toastr.success('Please input student name');
    // }
    // else if(!this.class_booking.parent_name){
    // this.toastr.success('Please input parent name');
    // }
    // else if(!this.class_booking.parent_ph_number){
    // this.toastr.success('Please input parent phone number');
    // }
    // else if(!this.class_booking.address){
    //   this.toastr.success('Please input address');
    // }

    if(this.select_price==0){
      this.toastr.success("No Price added for this mode!Please select another mode.");
    }else{
      let data={
        'provider_id': this.classDetails.provider_id._id,
        'student_name' : this.ownDetails.UserFullName,
        'student_email' : this.ownDetails.UserEmail,
         'student_ph_number': this.ownDetails.UserPhone,
         'parent_name':this.class_booking.parent_name,
          'parent_ph_number':this.class_booking.parent_ph_number,
          'payment_type':classtype,
          'student_age' : this.class_booking.student_age,
          'able_to' : this.payment_type,
          'able_to_fees' :this.select_price,
      }
  
      this.service.bookClass(this.classId,data).subscribe((response:any)=>{
        console.log('booking class',response)
        if(response.success){
          if(classtype == 'cash'){
            this.toastr.success('Thanks' + '  ' + this.ownDetails.UserFullName + ' ' + 'for the payment confirmation' + ' '  +this.classDetails.provider_id.UserFullName + ' ' + 'or some one from Quickmint Support Team will communicate with you asap.');
          this.router.navigate(['/my-bookings']);
          } 
          if(classtype == 'online'){
            this.makePayment(response.data._id);
            
          }
        }else{
          this.toastr.error(response.message);
        }
       
        
      })


    }
    
      
    //}

    

  }


  makePayment(BookingId:any) {
    //console.log(c)
    var ref = this;
    // ref.price = c.price;
    // this.title = c.title;
    var that = this;
    let stripe;

      //stripTokenData
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51J0JswEh4mw6fxvKsQTAQeqhTu5VOD9ojd5Ur2lc65WNaBxSsn8jhrTlJIR1ooBgSgp5Rf5PMoZTwfBHrE71mqxY00Actf65yq',
         //key: 'pk_live_51J0JswEh4mw6fxvKaufCiyufE6UH3qcnfhUGwuwnAsuu409DX3Ow0SsSkFbSDUAnpL0GhSEzcGTBV7UWAY93j7dW0042rjibCm',
        token: function (stripeToken: any) {
          console.log('stripeToken', stripeToken);
          that.stripeTokenData = stripeToken.id;
          // alert('token has been created');
          stripe = stripeToken._id
          that.service.trainingPayment(BookingId, that.stripeTokenData).subscribe((resp: any) => {
            console.log('training response', resp);
            if (resp.message == 'Success') {
              that.toastr.success('booking successful!');
              //this.router.navigate(['/my-bookings'])
              that.router.navigate(['/my-bookings'])
            }
            else {
              that.toastr.success('some error has occurred while booking');
            }
            //that.GetUserBookedList();
            // use _id of book response for payment;
          })
        },
      });

      paymentHandler.open({
        //name: this.title,
        // //description:'products',
        amount: that.select_price * 100
      })
    
  }

}
