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
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  scheduleForm: any;
  classFormSubmitted = false;
  id = localStorage.getItem('userId');
  title:string;
  overview:string;
  total_strength:string;
  price:string;
  image:any;
  classLength:string;
  day:string;
  startDate:string;
  endDate:string;
  startTime:string;
  endTime:string;
  UserType:string = 'kids';
  selection:any = [];
  expertise:any;
  selectedDays:any;
  selectedDays_array:any=[]
  selectedExpertise:any;
  imageLink:any;
  category:string="";
  policy:any;
  formatTime:any;
  kidCategory1:any;
  AdultsCategory1:any;
  end_time:boolean;
  classlenth_value:any;
  activity_type:string;
  gradelist_1:any=[1,2,3,4,5,6,7,8,9,10,11];
  gradelist_2:any=[2,3,4,5,6,7,8,9,10,11,12];
  select_grade:string="";
  select_cat:string="";
  age_start:any;
  age_end:any;
  create_class:any={};
  dateArray:any=[];
  grade_range:any;
  age_range: any;
  class_fees: any;
  select_days:any=[];
  select_paymmnet:any=[];
  classId:any;
  category_name:any={}
  // baseurl = 'https://nodeserver.mydevfactory.com:4290/'
  baseurl = url;
  isShown: boolean = false ;
  schedule_date:any=[]
  constructor(
    public dialog: MatDialog,
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => { 
      // this.classDetails= this.router.getCurrentNavigation()!.extras.state!.data;
      // console.log('this.classDetails: ', this.classDetails);
      console.log('class id',params.classId);
      this.classId = params.classId;
  });
  this.dateArray=[
    {'day' :'Sunday', 'day_index':0, 'day_time':[]},
    {'day' :'Monday', 'day_index':1, 'day_time':[]},
    {'day':"Tuesday", 'day_index':2,  'day_time':[]},
    {'day':"Wednesday", 'day_index':3, 'day_time':[]},
    {'day':"Thursday",  'day_index':4, 'day_time':[]},
    {'day':"Friday", 'day_index':5, 'day_time':[]},
    {'day':"Saturday", 'day_index':6,  'day_time':[]},
    
  ]
   
    this.getclassDeails();
    this.getCategory();
  }


  getclassDeails(){
    var dates:any =[];
    this.service.getClassDetail_provider(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.create_class= response.data;
        this.category_name= response.data.class_category
        if(response.data.UserLocation){
          this.create_class.class_location = response.data.UserLocation.Address
        }
        /////// START TIME ///////
        var sd = response.data.start_tiem.split('T')[1];
        var stime = sd.split(':');
        var starttime = stime[0]+ ':' + stime[1];
        this.create_class.start_tiem = starttime;
        console.log(starttime);
        /////// END TIME ///////
        var ed = response.data.end_time.split('T')[1];
        var etime = ed.split(':');
        var etarttime = etime[0]+ ':' + etime[1];
        this.create_class.end_time = etarttime;
        console.log(starttime);

        ////////////////// START DATE ////////////
        var startDate = response.data.strat_date.split('T')[0];
        this.create_class.strat_date = startDate;

        ////////////////// END DATE ////////////
        var endDate = response.data.end_date.split('T')[0];
        this.create_class.end_date = endDate;

        for(var i=0; i<response.data.select_day.length;i++){
          dates.push(response.data.select_day[i].day)
        }
        console.log(dates)
        this.schedule_date = dates.filter((c:any, index:any) => {
          return dates.indexOf(c) === index;
      });
      console.log(this.schedule_date)
      }
      
    })
  }


  radioChange(){
    console.log('radio',this.create_class.overview);
  }

  radioChange_able(event:any){
    //
    //console.log('able',event);
    if(event.target.defaultValue =='PERCLASS'){
      this.create_class.able_to_perclass= 'PERCLASS'
    }

    if(event.target.defaultValue =='WEEKLY'){
      this.create_class.able_to_weekly= 'WEEKLY'
    }

    if(event.target.defaultValue =='MONTHLY'){
      this.create_class.able_to_monthly= 'MONTHLY'
    }

    //this.select_paymmnet = event.target.defaultValue
    console.log('able', this.create_class);
  }

  getCategory(){
    var that = this;
    let data={
      'page':1,
      'limit':200,
    }
    this.service.gerclasscategory(data).subscribe((resp:any)=>{
      console.log( 'adult response',resp);
      this.AdultsCategory1= resp.data;
    })
    

  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageLink = event.target.files[0];
      
      //this.se
    }
  }


  check_fees(){
    if(this.create_class.able_to_perclass== 'PERCLASS'){
      if(!this.create_class.able_to_fees_perclass){
        this.toastr.success("Please add per class fees amount!");
        
      }
      
    }
    else if(this.create_class.able_to_weekly== 'WEEKLY'){
      if(!this.create_class.able_to_fees_weekly){
        this.toastr.success("Please add weekly class fees amount!");
      }
    }
  
    else if(this.create_class.able_to_monthly== 'MONTHLY'){
      if(!this.create_class.able_to_fees_monthly){
        this.toastr.success("Please add monthly class fees amount!");
      }
    }else{
       
    }

}


checktimespan(event:any){
  console.log(event.target.defaultValue)
  if(event.target.defaultValue == 'OneTime'){
    this.end_time = false;
  }
  if(event.target.defaultValue == 'Weekly'){
    this.end_time = true;
    this.classlenth_value =6
  }
  if(event.target.defaultValue == 'Monthly'){
    this.end_time = true;
    this.classlenth_value = 30
  }
}

serach_Date(){
  if(this.create_class.crash_course=='SINGELDAY'){
    var d = new Date(this.create_class.strat_date);
  var n = d.getDay()
  console.log(n)
  this.selectedDays_array.push({
    'day_index': n
  })
  console.log(this.selectedDays_array)
  }
  
  // if(this.end_time == true){
  //   var date = new Date(this.startDate);
  //   var firstDay:any = date
  //   var lastDay = firstDay.setDate(firstDay.getDate() + this.classlenth_value);
  //   var da_e = new Date(lastDay).getDate().toString().padStart(2, "0");
  //   var m_e = (new Date(lastDay).getMonth() + 1).toString().padStart(2, "0");
  //   var y_e = new Date(lastDay).getFullYear();
  //   this.endDate = y_e +'-'+ m_e + '-' + da_e ;
  //   console.log(this.startDate)
  //   console.log(this.endDate)
  // }

}

activityChange(){
  console.log('course length',this.create_class.crash_course);
}

getgradelist(){
this.service.get_gradelist().subscribe((response:any)=>{
  //this.gradelist= response.data
})
}

select_gardes(){
  console.log(this.select_grade)
}
select_category(){
  console.log(this.select_cat)
}
ageCheck_start(){
  if(this.create_class.overview=='ADULTS'){
    if(this.create_class.age_from <18){
      this.toastr.success("Please add proper age");
    }
  }

  if(this.create_class.overview=='KIDS'){
    if(this.create_class.age_from >= 18){
      this.toastr.success("You are now allowed in this group");
    }
  }
}

ageCheck_end(){
  if(this.create_class.age_from == this.create_class.age_to){
    this.toastr.success("Please add proper age");
  }
  else if(this.create_class.age_from >this.create_class.age_to){
    this.toastr.success("Please add proper age");
  }
}

select_day_in(ind:any,event:any){
  
  console.log(event.target.value)
  
  if (event.target.checked) {
    this.selectedDays_array.push({
      'day_index':event.target.value
    })
    console.log(this.selectedDays_array)
  }else {
    // var index = this.selectedDays_array.findIndex(event.target.value); 
    var index = this.selectedDays_array.findIndex((x: { day_index: string; }) => x.day_index === event.target.value); 
    console.log(index)
    this.selectedDays_array.splice(index, 1);
    console.log(this.selectedDays_array)
    // if (index == -1){
    //   this.selectedDays_array.splice(index, event.target.value);
    //   console.log(this.selectedDays_array)
    // }
  }
}

autocompleteFocus() {
  let self=this;
  let value={};
  let address = (<HTMLInputElement>document.getElementById("pac-input"));
  console.log("address", address )
  // set the options
  let options = {
  types: [],
  componentRestrictions: {country: []}
  }
  
  let autocomplete1 = new google.maps.places.Autocomplete(address, options);
  
  google.maps.event.addListener(autocomplete1, 'place_changed', function() {
  
  let place = autocomplete1.getPlace();
  let geometry = place.geometry;
  console.log('place',place)
  //self.profileDetailsForm.set('Address').setValue(place.formatted_address);
  //self.profileDetailsForm['Address'].setValue(place.formatted_address);
  // self.profileDetailsForm.get('Address').setValue(
  //   place.formatted_address
  // );
  self.create_class.class_location = place.formatted_address;
  
  // localStorage.setItem('current Address',self.search_addres);
  if ((geometry) !== undefined) {
    self.create_class.Latitude = geometry.location.lat();
    self.create_class.Longitude = geometry.location.lng();
  }
  })
  }

  EditClass_validation(){
    this.edit_class_details();
  }


  edit_class_details(){

    var d = new Date();
  var da = d.getDate().toString().padStart(2, "0");
  var m = (d.getMonth() + 1).toString().padStart(2, "0");
  var y = d.getFullYear();
  
  var currentDate = y +'-'+ m + '-' + da;
  let startTime2 =currentDate+'T' + moment(this.create_class.start_tiem, ["h:mm A"]).format("HH:mm") +':00.000Z';
  let endTime2 = currentDate+'T' + moment(this.create_class.end_time,["h:mm A"]).format("HH:mm")+':00.000Z';
   this.age_range ={
              "age_from":this.create_class.age_from,
          "age_to":this.create_class.age_to,
  }

  this.class_fees ={
        "tota_fees": this.create_class.tota_fees,
        "able_to":this.create_class.able_to,
        "able_to_fees": this.create_class.able_to_fees
    }

   this.select_days=[{
        "day_index":this.selectedDays_array
  
    }]
   this.grade_range={
          "grade_from":this.create_class.grade_from,
          "grade_to":this.create_class.grade_to
      }
    
let data={
  "class_title":this.create_class.class_title,
    "class_description":this.create_class.class_description,
    
    "class_type":this.create_class.class_type,
  
    "overview":this.create_class.overview,
    "Address": this.create_class.class_location,
    "Latitude" :this.create_class.Latitude,
    "Longitude" :this.create_class.Longitude,
    "class_category":this.create_class.class_category._id,
    
    "age_range":{
        "age_from":this.create_class.age_range.age_from,
        "age_to":this.create_class.age_range.age_to,
    },
    "grade_range":{
        "grade_from":this.create_class.grade_range.grade_from,
        "grade_to":this.create_class.grade_range.grade_to
    },
    "able_to_monthly":this.create_class.able_to_monthly,
    "able_to_fees_monthly":this.create_class.able_to_fees_monthly,
    "able_to_weekly":this.create_class.able_to_weekly,
    "able_to_fees_weekly":this.create_class.able_to_fees_weekly,
    "able_to_perclass":this.create_class.able_to_perclass,
    "able_to_fees_perclass":this.create_class.able_to_fees_perclass,

    "crash_course":this.create_class.crash_course,
    "total_strenght":this.create_class.total_strenght,
    "class_fees":this.create_class.class_fees,
    "strat_date":this.create_class.strat_date,
    "end_date":this.create_class.end_date,
    "semesetenddate":this.create_class.end_date,
    "start_tiem":startTime2,
    "end_time":endTime2,
    "vidoe_class_link" :this.create_class.vidoe_class_link,
    "select_day" : this.selectedDays_array,   
}

const formData = new FormData();
    // formData.append("class_title", this.create_class.class_title);
    // formData.append("class_description", this.create_class.class_description);
    // formData.append("class_type",this.create_class.class_type);
    // formData.append("overview",this.create_class.overview);
    // formData.append("age_range", JSON.stringify(this.age_range));
    // formData.append("crash_course",this.create_class.crash_course,);
    // formData.append("total_strenght",this.create_class.total_strenght);
    // formData.append("class_fees", this.create_class.tota_fees);
    // formData.append("grade_range", JSON.stringify(this.grade_range));
    // formData.append( "strat_date",this.create_class.strat_date,);
    // formData.append("semesetenddate",this.create_class.semesetenddate,);
    // formData.append("start_tiem",startTime2);
    // formData.append("end_time",endTime2);
    // formData.append("select_day",JSON.stringify(this.select_days));
    // formData.append("image", this.imageLink);
    // formData.forEach((value,key) => {
    //   console.log(key+value)
    //    });
this.service.edit_class(data,this.classId).subscribe((resp: any) => {

 
  console.log("Add resp: ", resp);
 if(resp.success){
   if(this.imageLink ==undefined){
    this.toastr.success("Your Class has been edited successfully!");
    this.router.navigate(['/register-class-list']);
   }else{
    this.uploadimage();
   }
   
 }else{
  this.toastr.error(resp.message);
 }
});

  }

  uploadimage(){
    const formData = new FormData();
    formData.append("image", this.imageLink);
    this.service.postclassImage(formData,this.classId).subscribe((response:any)=>{
      console.log(response)
      if(response.status){
        this.toastr.success("Your Class has been edited successfully!");
        this.router.navigate(['/register-class-list']);
        
      }
    })
  }
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }
 

}
