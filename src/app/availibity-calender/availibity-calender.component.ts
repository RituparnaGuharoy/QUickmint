import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-availibity-calender',
  templateUrl: './availibity-calender.component.html',
  styleUrls: ['./availibity-calender.component.css']
})
export class AvailibityCalenderComponent implements OnInit {
  currentDate:any;
  monthenddate:any;
  plannerlist:any=[];
  start_select:any;
  end_select:any;
  slot_details:any
  slot_open:boolean;
  slot_indicator:boolean;
  select_index:any;
  //refresh: Subject<any> = new Subject();
  arranageDateArray:any=[];
  slotarray:any=[];
  ProviderId:any;
  serviceid:any;
  day_id:any;
  slect_date:any;
  todate:any;
  activeDayIsOpen: boolean = true;
  months:any;
  start_slot:any;
  constructor(
    private route: ActivatedRoute,
    public service: WebserviceService,
    public router: Router,
    public toast: ToastrService,
    public dialog: MatDialog,
  ) {
    this.slot_open = false;
   this.slot_indicator = false;
   this.route.queryParams.subscribe((params) => { 
    this.serviceid = params.id;
    this.ProviderId = params.provider
    
});
   console.log('service id',this.serviceid)
   console.log('this.ProviderId',this.ProviderId)
   }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.calculatedate();
  }

  


  calculatedate(){
    var dt = new Date(); 
    var enddate =new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    
    /////////// Currentdate ///////////
    var da = dt.getDate().toString().padStart(2, "0");
    var m = (dt.getMonth() + 1).toString().padStart(2, "0");
    var y = dt.getFullYear();
    //this.currentDate = y +'-'+ m + '-' + da + 'T00:00:00.000Z';
    /////////// Currentdate ///////////

    /////////// Month End Date ///////////
    var da_e = enddate.getDate().toString().padStart(2, "0");
    var m_e = (enddate.getMonth() + 1).toString().padStart(2, "0");
    var y_e = enddate.getFullYear();
    //this.monthenddate = y_e +'-'+ m_e + '-' + da_e + 'T00:00:00.000Z';
    /////////// Month End Date ///////////
    
    //this.getplanner();
    this.getcurrentmonth()
  }



  serach_Date(){
    this.currentDate = new Date(this.start_select + 'T00:00:00.000Z');
    this.monthenddate = new Date(this.end_select + 'T00:00:00.000Z');

    console.log(this.currentDate)
    console.log(this.monthenddate)
    this.getplanner(this.currentDate,this.monthenddate);
  }

getinfo(items:any){
console.log(items)
this.slotarray =[]
    if(items.day_time==null){
      this.slot_open = false
      this.slot_details = ''
      this.toast.success('No slots available')
    }else{
      this.slot_open =true
      this.slot_details =items;
      var i = items.total_book_set
      while (i >0) {
        this.slotarray.push(i--)
        
        console.log(this.slotarray)
      }
    }
    
  }

  


  check_dates(event:any){
    console.log(event.target.defaultValue)
    if(event.target.defaultValue =='today'){
    
      this.get_toDate()
     
    }
    if(event.target.defaultValue =='weekly'){
    
      this.getweeklyDate(6)
     
    }
    if(event.target.defaultValue =='forthnight'){
      this.getweeklyDate(14)
    }
    if(event.target.defaultValue =='month'){
      this.getcurrentmonth()
    }
  }

  get_toDate(){
    var date = new Date();
    var firstDay:any = date;
    var lastDay =date;
    this.getplanner(firstDay,new Date(lastDay))
  }
  getweeklyDate(number:any){
    this.arranageDateArray=[]
    var date = new Date();
    var firstDay:any = date
    var lastDay = new Date().setDate(new Date().getDate() + number);
    console.log(firstDay)
    console.log(new Date(lastDay))

     this.getplanner(firstDay,new Date(lastDay))
  }

  getcurrentmonth(){
    this.arranageDateArray=[]
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0);
    console.log(firstDay)
    console.log(lastDay)

   this.getplanner(firstDay,lastDay)
  }


  getplanner(firstDay:any,lastday:any){
        this.arranageDateArray=[]
        this.currentDate = ((firstDay.getFullYear())+'-'+(firstDay.getMonth() + 1).toString().padStart(2, "0"))+'-'+(firstDay.getDate().toString().padStart(2, "0")) + 'T00:00:00.000Z',
        this.monthenddate = ((lastday.getFullYear())+'-'+(lastday.getMonth() + 1).toString().padStart(2, "0"))+'-'+(lastday.getDate().toString().padStart(2, "0")) + 'T00:00:00.000Z'
        this.service.check_availibility(this.currentDate,this.monthenddate,this.ProviderId).subscribe((response:any)=>{
        if(response.count==0){
        this.toast.success('Current date has no schedule.Please select proper date')
        this.slot_indicator =false;
        }else{
        this.slot_indicator =true;
        for (var v in response['data']) {
          console.log('array',response['data'][v])
        for (var i in response['data'][v].schedule) {
        this.plannerlist.push({
        'weekly_day' :response['data'][v].schedule[i].weekly_day,
        'day_time' :response['data'][v].schedule[i].day_time,
          'total_available_set' :response['data'][v].schedule[i].total_available_set,
          'total_book_set' :response['data'][v].schedule[i].total_book_set,
        })
        }

        // for (var i in response['data'][v]) {
        //   this.plannerlist.push({
        //   'weekly_day' :response['data'][v][i].weekly_day,
        //   'day_time' :response['data'][v][i].day_time,
        //   'total_available_set' :response['data'][v][i].total_available_set,
        //   'total_book_set' :response['data'][v][i].total_book_set,
        //   })
        //   }
        }
        while (firstDay <= lastday) {
          let weekly_day = ((firstDay.getFullYear())+'-'+(firstDay.getMonth() + 1).toString().padStart(2, "0"))+'-'+(firstDay.getDate().toString().padStart(2, "0")) + 'T00:00:00.000Z';
          let getSchedule: any = this.isScheduled(weekly_day);
          let total_available_set :any = this.total_available(weekly_day);
          let total_book_set :any= this.total_seat(weekly_day);
          console.log('avail',total_available_set)
          if(getSchedule != 0){
            this.arranageDateArray.push({
              'weekly_day' : weekly_day ,
              'day_time' : getSchedule,
              'total_available_set' :total_available_set,
              'total_book_set' : total_book_set
              })
          }else{
            this.arranageDateArray.push({
              'weekly_day' : weekly_day ,
              'day_time' : null,

              })
          }
          firstDay.setUTCDate(firstDay.getUTCDate() + 1);

        }
        console.log('get',this.arranageDateArray)
        }
        
        
        })
  }

  isScheduled(weekly_day: any){
    var day: any = [];
    //console.log(weekly_day)
    this.plannerlist.forEach((element: any) => {
     // console.log(element)
      if(element['weekly_day'] == weekly_day){
        console.log('ggg',element['day_time'])
        day = element['day_time'];
        
      }
    });

    return day;

  }

  total_available(weekly_day: any){
    var total_available_set :any;
 
  this.plannerlist.forEach((element: any) => {
    
    if(element['weekly_day'] == weekly_day){
      console.log(element['total_available_set'])
      if(element['total_available_set'] !=undefined){
        total_available_set = element['total_available_set'];
      }
      
    }
    
  })
  return total_available_set;
  }


  total_seat(weekly_day: any){
    var total_seat :any;
 
  this.plannerlist.forEach((element: any) => {
    
    if(element['weekly_day'] == weekly_day){
      console.log(element['total_book_set'])
      if(element['total_book_set'] !=undefined){
        total_seat = element['total_book_set'];
      }
      
    }
    
  })
  return total_seat;
  }


  select_slot(id:any,date:any,start_time:any,i:any){
    console.log(i)
    this.start_slot = start_time;
    this.day_id = id;
    this.slect_date = date;
    this.select_index = i;
  }

  bookappointment(){

    console.log(localStorage.getItem('access-token-quickmint'))
    if(localStorage.getItem('access-token-quickmint') == null){
      this.openLoginDialog();
    }else{
      var dt = new Date(); 
    /////////// Currentdate ///////////
    var da = dt.getDate().toString().padStart(2, "0");
    var m = (dt.getMonth() + 1).toString().padStart(2, "0");
    var y = dt.getFullYear();
    this.todate = y +'-'+ m + '-' + da + 'T00:00:00.000Z';
    console.log(dt.getHours().toString().padStart(2, "0"))
    if(this.slect_date<this.todate){
      this.toast.success('Please selecet proper date')
    }else{
      let data={
        'provider_id':this.ProviderId,
        'day_time_id':this.day_id,
        'bookedService':this.serviceid,
        'dey_time_index':this.select_index
      }
      this.service.book_appointment(data).subscribe((response)=>{
        console.log(response)
        this.getcurrentmonth()
      })
    }
 
    }
    
    
  }


  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }


}
