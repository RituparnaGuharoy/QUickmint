import { Component, OnInit } from '@angular/core';
import { MatDialog,  } from '@angular/material/dialog';
import { JitsiComponent } from 'src/app/jitsi/jitsi.component';
import { WebserviceService } from 'src/app/services/webservice.service';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-service-booking-list',
  templateUrl: './service-booking-list.component.html',
  styleUrls: ['./service-booking-list.component.css']
})
export class ServiceBookingListComponent implements OnInit {
  privateJobList: any = [];
  acceptedJobList: any = [];
  animal: any;
  classBookingList:any;
  Inactiveclass_list:any;
   bookingList:any;
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  page=1;
  limit=25;
  count:any;
  constructor(
    public service: WebserviceService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    //this.getprivateJobsList();
    // this.getBookingList();
    // this.getInactiveBookingList();
    this.classwise_booking();
  }

  openDialog(job:any): void {
    const dialogRef = this.dialog.open(JitsiComponent, {
      // width: '250px',
      data: {
        provider: job.provider_id,
        user: job.user_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  calling() {

  }

  getprivateJobsList() {
    console.log("getPrivateJobList",)

    this.service.getProviderPrivateJobList().subscribe((data: any) => {
      let temp = data.data
      temp.filter((e: any) => {
        e.job_status == 1 ? this.privateJobList.push(e) : this.acceptedJobList.push(e)
      })

      console.log("getPrivateJobList", data)
    })
  }

  goToDetails(job: any) {
    console.log("got job for details: ", job)
  }

  getStatusText(job: number) {
    if (job === 1) {
      return "Awaiting"
    } else if (job === 2) {
      return "Accepted"
    } else if (job === 3) {
      return "Declined"
    } else if (job === 4) {
      return "Started"
    } else {
      return "Completed"
    }
  }

  acceptJob(job: any) {
    this.privateJobList.filter((e: any, index: any) => {
      // console.log(e)
      // console.log(job)
      if (e._id === job._id) { this.privateJobList.splice(index, 1) }
    })
    this.changePrivateJobStatus(job, 2)
    this.acceptedJobList.push(job)

    console.log("this.privateJobList accept job:", this.privateJobList)
    console.log("this.acceptedJobList accept job:", this.acceptedJobList)
  }

  declineJob(job: any) {
    this.privateJobList.filter((e: any) => {
      return e !== job
    })
    this.changePrivateJobStatus(job, 3)

    this.acceptedJobList.push(job)
    console.log("this.privateJobList decline job:", this.privateJobList)
    console.log("this.acceptedJobList decline job:", this.acceptedJobList)
  }

  changePrivateJobStatus(job: any, n: number) {
    let data = {
      job_id: job._id,
      job_status: n,
      user_id: job.user_id._id,
      provider_id: job.provider_id._id

    }

    this.service.changePrivateJobStatus(data).subscribe(resp => {
      console.log("changePrivateJobStatus resp: ", resp)
    })
  }


  getBookingList(){
    this.service.getActive_bookinglist().subscribe((response:any)=>{
      console.log(response)
      if(response.data.length ==0){
        this.toastr.success('No active class found');
      }else{
        this.classBookingList= response.data
      }
      
    })
  }

  getInactiveBookingList(){
    this.service.getInActive_bookinglist().subscribe((response:any)=>{
      console.log(response)
      this.Inactiveclass_list= response.data
    })
  }

  gotoClassDetails(c:any){
    this.router.navigate(['/booked_class_details'],{queryParams : {classId: c._id}});
  }

  classwise_booking(){
    let data={
      page:this.page,
      limit : this.limit
    }
    this.service.get_classwise_booking(data).subscribe((response:any)=>{
      console.log(response)

      if(response['success']){
        this.classBookingList= response.data;
        this.count = response['count'];
        // this.bookingList = response.data.
       for(var i =0; i<response.data.length;i++){
        console.log(response.data[i].studentdetails.length)
        this.bookingList = response.data[i].studentdetails.length

       }
      }
      
    })
  }
  paginationChange(event:any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.classwise_booking()
   // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
  }
  showbooking(id:any){
    
  }

}
