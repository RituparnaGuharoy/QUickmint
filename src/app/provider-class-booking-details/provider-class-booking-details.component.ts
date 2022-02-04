import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';
import { data } from 'jquery';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-provider-class-booking-details',
  templateUrl: './provider-class-booking-details.component.html',
  styleUrls: ['./provider-class-booking-details.component.css']
})
export class ProviderClassBookingDetailsComponent implements OnInit {
  classId:string;
  classDetails:any;
  class_booking :any ={};
  ownDetails:any={};
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  stripeTokenData: any;
  UserAge:any={}
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { 
    this.route.queryParams.subscribe((params) => { 
      // this.classDetails= this.router.getCurrentNavigation()!.extras.state!.data;
      // console.log('this.classDetails: ', this.classDetails);
      console.log('class id',params.classId);
      this.classId = params.classId;
  });
  }

  ngOnInit(): void {

    this.bookingDetails();
  }

  bookingDetails(){
    this.service.class_bookingDetails(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.classDetails = response.data;
       
      }
      
    })
  }

  Approve_class(id:any){
    this.service.Approve_class(id).subscribe((response:any)=>{
      if(response.success){
        this.bookingDetails();
       
      }
      
    })
  }
}
