import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';
@Component({
  selector: 'app-service-planner',
  templateUrl: './service-planner.component.html',
  styleUrls: ['./service-planner.component.css']
})
export class ServicePlannerComponent implements OnInit {
  sformdate:any;
  eformdate:any;
  dateArray:any=[];
  slot_time:number;
  checkslot:any;
  slot_start:any;
  slot_end:any=[];
  addInput:any=[];
  appoinment_status:any;
  childsub:any;
  starting_select:any;
  starting_time:any;
  ending_time:any;
  Aformdate: any;
  additionalArray:any=[];
  Addi_starting_select:any;
  Addi_starting_time:any;
  Addi_ending_time:any;
  constructor(
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
  }

  scheduleDate(){
    this.dateArray=[]
    let currentDate = new Date();
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    while (currentDate <= new Date(this.eformdate)) {
       //dateArray.push(new Date(currentDate));
      //  this.dateArray.push({
      //    'day' : (new Date(currentDate)).toLocaleDateString('en-US',{weekday: 'short'}),
      //    'weekly_day' : (new Date(currentDate)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      //    'day_time': []
      //  })
      // Use UTC date to prevent problems with time zones and DST
      
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    
    this.dateArray=[
      {'day' :'Sunday', 'day_index':0, 'day_time':[]},
      {'day' :'Monday', 'day_index':1, 'day_time':[]},
      {'day':"Tuesday", 'day_index':2,  'day_time':[]},
      {'day':"Wednesday", 'day_index':3, 'day_time':[]},
      {'day':"Thursday",  'day_index':4, 'day_time':[]},
      {'day':"Friday", 'day_index':5, 'day_time':[]},
      {'day':"Saturday", 'day_index':6,  'day_time':[]},
      
    ]

    console.log(this.dateArray)
}

additional(){
  let currentDate = new Date();
  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  //while (currentDate <= new Date(this.Aformdate)) {
     
    //  this.additionalArray.push({
    //    'day' : (new Date(this.Aformdate)).toLocaleDateString('en-US',{weekday: 'short'}),
    //    'weekly_day' : this.Aformdate,
    //    'day_time': []
    //  })
    this.additionalArray=[{
      'day' : (new Date(this.Aformdate)).toLocaleDateString('en-US',{weekday: 'short'}),
      'weekly_day' : this.Aformdate,
      'day_time': []
    }]
    //Use UTC date to prevent problems with time zones and DST
    
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  //}

  console.log(this.additionalArray)
}

schedule_slot(event:any){
  console.log(event)
  if(event.target.checked){
    this.checkslot= event.target.defaultValue
  }else{
    this.checkslot= ''
  }
  //this.checkslot = event.target.checked
  console.log(this.checkslot)
}

getslot(event:any,j:any, i:any){
  
  var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  var BookingTime_end:any= currentDate+'T'+event
  var date = new Date(BookingTime_end);
  //date.setMinutes(date.getMinutes()+this.time_duration);

  //this.slot_end = (date.getHours() + ':' + date.getMinutes())
  const end_time = currentDate+ 'T'+ (date.getHours() + ':' + date.getMinutes()) ;
  // const end_times = (date.getHours() + ':' + date.getMinutes()) 
  if(this.starting_select>event){
    this.toastr.success('Please select propper end time')
  }else{
    this.dateArray[j]['day_time'].splice(i, 1);
  this.dateArray[j]['day_time'].splice(i , 0, {
    'start_time':this.starting_time,
    'start_times':this.starting_select,
    'end_time':BookingTime_end,
    'end_times':event,
    'available_seat': 1
  });

  console.log( this.dateArray)
  }
  
  
}

remove(j:number, i:number){
  this.dateArray[j]['day_time'].splice(i, 1);
}

remove_add(j:number, i:number){
  this.additionalArray[j]['day_time'].splice(i, 1);
}
getslot_d(event:any,j:any, i:any){
 
  var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  var BookingTime:any= currentDate+'T'+event;
  this.starting_select = event
  this.starting_time = BookingTime
  

  
  

  console.log(document.getElementById('start_times'))
  console.log(event)
  
}



addNew(j:any,dayindex:any){
  console.log(this.checkslot,dayindex)
  if(this.checkslot==dayindex){
    let count = this.dateArray[j]['day_time'].length + 1;
    this.dateArray[j]['day_time'].splice(count , 0, {
      'start_time':'',
      'start_times':'',
      'end_time':'',
      'end_times' : '',
      'available_seat': 1
    });
  }else if(this.checkslot !=dayindex){

  }
  
  
}

onSubmit(){
  let data={
    'strat_date': this.sformdate,
   'end_date': this.eformdate,
   'schedule'  :this.dateArray
  }
  this.service.postSchedule(data).subscribe((response:any)=>{
    console.log(response)
    if(response.success){
      this.toastr.success('create Service Planner sucessfully')
      this.router.navigate(['/service-calander']);
    }
  })
}

addNew_additional(j:any){
  console.log(this.checkslot)
  
  let count = this.additionalArray[j]['day_time'].length + 1;
  this.additionalArray[j]['day_time'].splice(count , 0, {
      'start_time':'',
      'start_times':'',
      'end_time':'',
      'end_times' : '',
      'available_seat': 1
    });
}

getslot_addi(event:any,j:any, i:any){
 
  var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  var BookingTime:any= currentDate+'T'+event;
  this.Addi_starting_select = event
  this.Addi_starting_time = BookingTime
  console.log(document.getElementById('start_times'))
  console.log(event)
  
}

getslot_end_additional(event:any,j:any, i:any){
  
  var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  var BookingTime_end:any= currentDate+'T'+event
  var date = new Date(BookingTime_end);
  //date.setMinutes(date.getMinutes()+this.time_duration);

  //this.slot_end = (date.getHours() + ':' + date.getMinutes())
  const end_time = currentDate+ 'T'+ (date.getHours() + ':' + date.getMinutes()) ;
  // const end_times = (date.getHours() + ':' + date.getMinutes()) 

  if(this.Addi_starting_select>event){
    this.toastr.success('Please select propper end time')
  }else{
    this.additionalArray[j]['day_time'].splice(i, 1);
    this.additionalArray[j]['day_time'].splice(i , 0, {
      'start_time':this.Addi_starting_time,
      'start_times':this.Addi_starting_select,
      'end_time':BookingTime_end,
      'end_times':event,
      'available_seat': 1
    });
  }
  
 

  console.log( this.additionalArray)
  
}

onSubmit_additional(){
  let data={
    'schedule'  :this.additionalArray
  }
  this.service.post_additionalSchedule(data).subscribe((response:any)=>{
    console.log(response)
    if(response.success){
      this.toastr.success('create additional Service Planner sucessfully')
    }
  })
}



}
