import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.css'],
})
export class ProviderAddComponent implements OnInit {
  newServiceForm: any;
  categorylisting: any;
  subcategorylisting: any;
  subcategoryonelisting: any;
  subcategorytwolisting: any;
  showSubCat: boolean;
  newServiceFormSubmitted: boolean;

  image:any;
  imageLink:any;
  title:any;
  description:any;
  category_id:any;
  sub_category_id:any;
  sub_category_one_id:any;
  sub_category_two_id:any;
  job_start:any;
  job_end:any;
  Price:any;
  image1:any;
  time_duration:any;

  subcatone = false;
  subcattwo = false;

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
  ending_time:any
  category_service:any=[];
  service_name:any
  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router
  ) {
    //this.appoinment_status =false
    // this.category_service=[{
    //   'service_name':''
    // }

    // ]
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   // this.newServiceForm = this.newForm();
    this.getCategory();
    
  }
  // newForm() {
  //   return this.formBuilder.group({
  //     title: ['', [Validators.required]],
  //     description: ['', [Validators.required]],
  //     provider_id: [localStorage.getItem('userId')],
  //     category_id: ['', [Validators.required]],
  //     sub_category_id: [''], //[Validators.required]
  //     time: ['', [Validators.required]],
  //     hr: [''],
  //     mn: [''],
  //     Price: ['', [Validators.required]],
  //     start_date: ['', [Validators.required]],
  //     job_start: ['', [Validators.required]],
  //     job_end: ['', [Validators.required]],
  //     sub_category_one_id: '',
  //     sub_category_two_id: '',
  //     age_group: '6-12',
  //   });
  // }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageLink = event.target.files[0];
      this.image1 = event.target.files[0];
     
    }
  }

  getCategory() {
    this.service.select_servicelist().subscribe(
      
      (data) => {
        console.log(data);
        
        this.categorylisting = (<any>data)['data'].ProvidedService;
        // this.toastr.success((<any>data)["message"]);

        // this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSubcategory() {
    //console.log(this.newServiceForm.value.category_id);
    this.service
      .subcategorylisting(this.category_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.subcategorylisting = (<any>data)['data'];
          data.count === 0
            ? (this.showSubCat = false)
            : (this.showSubCat = true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSubCatOne() {

    this.get_servicelist()
    // this.service
    //   .getsubcategorylistingOne(this.sub_category_id)
    //   .subscribe(
    //     (data: any) => {
    //       console.log('getSubCatOne: ', data);
    //       this.subcategoryonelisting = (<any>data)['data'];
    //       data.count === 0 ? (this.subcatone = false) : (this.subcatone = true);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }

  getSubCatTwo(s: any) {
    // console.log(
    //   'sub_category_two_id: ',
    //   this.newServiceForm.value.sub_category_one_id
    // );
    // console.log('sub_category_one_id: ', this.newServiceForm.value);

    this.service
      .getsubcategorylistingTwo(this.sub_category_one_id)
      .subscribe(
        (data: any) => {
          console.log('getSubCatTwo: ', data);
          this.subcategorytwolisting = (<any>data)['data'];
          data.count === 0 ? (this.subcattwo = false) : (this.subcattwo = true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  get_ChildSubcategory(){

  }

  onSubmit() {
    var appoinmentstatus : boolean
    if(this.appoinment_status=='true'){
      appoinmentstatus = true
    }else{
      appoinmentstatus = false
    }
const data:any = {
  'title': this.title,
   'description' : this.description,
   'category_id' : this.category_id,
   'schedule' : this.dateArray,
   'sub_category_id' : this.sub_category_id,
   'service_category':this.childsub,
   'Price': this.Price,
   'strat_date': this.sformdate,
   'end_date': this.eformdate,
   'time_duration' : this.time_duration,
   'appoinment_status':appoinmentstatus
}
    console.log(data)
    

    let user_id :any = localStorage.getItem('userId');

    this.service.addService(data).subscribe(
      (data:any) => {
        console.log('publicjob: ', data);
        
        
        this.newServiceFormSubmitted = false;
      
       if(data.success){
         this.uploadimage(data.data._id)
       }
      
      },
      (err) => {
        console.log(err);
        this.toastr.success('Service has not been added. Please try later')
      }
    );
  }


  uploadimage(id:any){
    // const formData = new FormData();
    // formData.append("addImage",this.imageLink);
    this.service.serviceimage(this.imageLink,id).subscribe((response:any)=>{
      console.log(response)
      if(response.success){
        this.toastr.success('Your service has been added')
        this.router.navigate(['/service-list']);
      }
    })
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
      {'day' :'Mon', 'weekly_day' :new Date() ,'day_time':[]},
      {'day':"Tues",  'weekly_day' :new Date() , 'day_time':[]},
      {'day':"Wednes", 'weekly_day' :new Date() , 'day_time':[]},
      {'day':"Thurs", 'weekly_day' :new Date() , 'day_time':[]},
      {'day':"Fri", 'weekly_day' :new Date() , 'day_time':[]},
      {'day':"Satur", 'weekly_day' :new Date() , 'day_time':[]},
      {'day':"Sun",'weekly_day' :new Date() , 'day_time':[]}
    ]

    console.log(this.dateArray)
}

schedule_slot(event:any){
  console.log(event.target.defaultValue)
  if(event.target.checked){
    this.checkslot= event.target.defaultValue
  }else{
    this.checkslot= ''
  }
  
}

getslot(event:any,j:any, i:any){
  
  var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  var BookingTime_end:any= currentDate+'T'+event
  var date = new Date(BookingTime_end);
  date.setMinutes(date.getMinutes()+this.time_duration);

  //this.slot_end = (date.getHours() + ':' + date.getMinutes())
  const end_time = currentDate+ 'T'+ (date.getHours() + ':' + date.getMinutes()) ;
  // const end_times = (date.getHours() + ':' + date.getMinutes()) 
  
  this.dateArray[j]['day_time'].splice(i, 1);
  this.dateArray[j]['day_time'].splice(i , 0, {
    'start_time':this.starting_time,
    'start_times':this.starting_select,
    'end_time':BookingTime_end,
    'end_times':event,
    'time_duration' : '',
    'available_seat': ''
  });

  console.log( this.dateArray)
  
}

remove(j:number, i:number){
  this.dateArray[j]['day_time'].splice(i, 1);
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
  

  
  

  console.log( this.dateArray)
  
}



addNew(j:any){
  console.log(this.checkslot)
  // this.addInput.splice(j, 0, {
  //   'id': this.addInput.length + 1,
  //   'index': j + 1,
  //   'slot_start':'',
  //   'slot_end':'',
  //   'available_seat': ''
  // });
  // this.addInput.push({
  //   'id': this.addInput.length + 1,
  //   'index': j + 1,
  //   'slot_start':'',
  //   'slot_end':'',
  //   'available_seat': ''
  // })

  // if(this.checkslot !=day){
  //   this.toastr.success('Please select a day')

  // }else{
  let count = this.dateArray[j]['day_time'].length + 1;
  this.dateArray[j]['day_time'].splice(count , 0, {
      'start_time':'',
      'start_times':'',
      'end_time':'',
      'end_times' : '',
      'time_duration' :'',
      'available_seat': ''
    });
  //}


}

appointstus(eve:any){
  console.log(eve)
  this.appoinment_status = eve.target.defaultValue
}


get_servicelist(){


  this.service
      .service_list(this.sub_category_id)
      .subscribe(
        (data: any) => {
          console.log('getSubCatOne: ', data);
          this.subcategoryonelisting = (<any>data)['data'];
          data.count === 0 ? (this.subcatone = false) : (this.subcatone = true);
        },
        (err) => {
          console.log(err);
        }
      );
}

addnewservice(){
console.log(this.service_name)
let data={
  'sub_category_id' : this.sub_category_id,
  'service_category' : this.service_name,
}
this.service.add_servicelist(data).subscribe((Response:any)=>{
  console.log(Response)
  if(Response.success){
    this.get_servicelist();
    this.service_name = ''
  }
})

}




}
