import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  classBookingList:any;
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  page = 1;
  limit = 25;
  params: any;
  count: Number = 0;
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.get_class_bookinglsit();
  }

  get_class_bookinglsit(){
    let data={
      'page':this.page,
        'limit':this.limit,
    }
    this.service.getUserBookedList(data).subscribe((response:any)=>{
      console.log()
      this.classBookingList= response.data;
      this.count= response.count;
    })
  }

  gotoClassDetails(c: any){
    this.router.navigate(['/class-details'],{queryParams : {classId: c.bookedService._id}});
  }
  paginationChange(event:any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.get_class_bookinglsit();
   // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
  }
}
