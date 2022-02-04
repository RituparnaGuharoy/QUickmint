import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { Router,NavigationExtras } from '@angular/router';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
declare var CanvasJS:any;
@Component({
  selector: 'app-service-provider-dashboard',
  templateUrl: './service-provider-dashboard.component.html',
  styleUrls: ['./service-provider-dashboard.component.css']
})
export class ServiceProviderDashboardComponent implements OnInit {
  Service_categoryList:any;
  class_categoryList:any;
  baseurl:any;
  classtagP:boolean;
  classtagC:boolean;
  view_count:any=0;
  class_count:any=0;
  Appointment_booked :any=0;
  service_booked:any=0;
  monthly_revenue:any;
  mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  selectmonth:any=3;
  yearly_revenue:any;
  monthly_length:any;
  yearly_length:any;
  current_revenue:any=0;
  total_Revenue:any=0;
  start_Date:any;
  end_date:any;
  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  dateRangeForm: FormGroup;
  constructor(
    public service: WebserviceService,
    public router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.baseurl = 'https://nodeserver.mydevfactory.com:4290/';
    this.dateRangeForm = this.formBuilder.group({
      start: new FormControl(''),
      end: new FormControl('')
    });
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var da = firstDay.getDate().toString().padStart(2, "0");
      var m = (firstDay.getMonth() + 1).toString().padStart(2, "0");
      var y = firstDay.getFullYear();
      this.start_Date = y +'-'+ m + '-' + da;
      //////////////////////////
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      var eda = lastDay.getDate().toString().padStart(2, "0");
      var em = (lastDay.getMonth() + 1).toString().padStart(2, "0");
      var ey = lastDay.getFullYear();
      this.end_date = ey +'-'+ em + '-' + eda;
      console.log(this.start_Date,this.end_date)
  }

  ngOnInit(): void {
    // this.service_catlist();
    // this.calss_catlist();
    this.getView_count();
    this.getclassBook_count();
    this.get_monthlyrevenue();
    this.get_yearlyrevenue();
    this.currentRevenue();
    this.totalRevenue();
    this.chartdisplay();
  }

  service_catlist(){
    this.service.Servicelisting().subscribe((response:any)=>{
      console.log('service',response)
      if(response.data.length ==0){
        this.classtagP = true
      }else{
        this.classtagP = false
        this.Service_categoryList = response.data;
      }
      
    })
  }

  calss_catlist(){
    this.service.Addservice_list('class').subscribe((response:any)=>{
      console.log('service',response)
      
      if(response.data.length ==0){
        this.classtagC = true
      }else{
        this.classtagC = false
        this.class_categoryList = response.data;
      }
    })
  }

  getView_count(){
    this.service.provider_viewCount().subscribe((response:any)=>{
      console.log(response)
      if(response.success){
        this.view_count = response.count
      }
    })
  }

  getclassBook_count(){
    this.service.provider_classbookcount().subscribe((response:any)=>{
      console.log(response)
      if(response.success){
        this.class_count = response.bookclasscount
      }
    })
  }

  goToBooking(){
    this.router.navigate(['/service-booking-list'])
  }

  get_monthlyrevenue(){
    let data={
      month:this.selectmonth
    }
   
    this.service.monthlyrevenue_list(data).subscribe((response:any)=>{
     
      if(response.success){
        this.monthly_revenue = response.data;
        console.log(this.monthly_revenue)
      }
    })
  }

  getMonth(month:any){
     var date = new Date(month+'/01' +'/2021')
    return this.mlist[date.getMonth()];

  }
  select_month(){
    console.log(this.selectmonth);
    this.get_monthlyrevenue();
  }


  get_yearlyrevenue(){
    let data={
      
    }
   
    this.service.yearlyrevenue_list(data).subscribe((response:any)=>{
     
      if(response.success){
        this.yearly_revenue = response.data;
        this.monthly_length = response.count
        console.log(this.yearly_revenue)
      }
    })
  }

  chartdisplay(){
   
    var chart = new CanvasJS.Chart("chartContainer", {
        data: [
        {
            type: "column",
            dataPoints: [
            { x: 10, y: 10 },
            { x: 20, y: 15 },
            { x: 30, y: 25 },
            { x: 40, y: 30 },
            { x: 50, y: 28 }
            ]
        }
        ]
    });

    chart.render();

}


totalRevenue(){
  this.service.totalRevenue().subscribe((res:any)=>{
    console.log(res)
    if(res.success){
      this.total_Revenue= res.data[0].total
    }
  })
}

startDate(type: string, event:any) {
  //this.events.push(`${type}: ${event.value}`);
  
  var sD:any=event.value
  var d = new Date(sD);
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  this.start_Date = y +'-'+ m + '-' + da;
  //console.log(this.start_Date)
}
endDate(type: string, event: any) {
  //this.events.push(`${type}: ${event.value}`);
  //console.log('end',event)
  var eD:any=event.value
  var d = new Date(eD);
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  this.end_date =  y +'-'+ m + '-' + da;
  this.currentRevenue();
}

currentRevenue(){
  let data={
    'start_date': this.start_Date,
    'end_date' : this.end_date
  }
  this.service.currentRevenue(data).subscribe((response:any)=>{
    console.log('current revenue',response)
    if(response.success){
      if(response.count==0){
        this.current_revenue=response.count;
      }else{
        this.current_revenue= response.data[0].total;
      }
      
    }
  })
} 
}
