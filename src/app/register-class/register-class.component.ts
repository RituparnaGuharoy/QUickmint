import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-register-class',
  templateUrl: './register-class.component.html',
  styleUrls: ['./register-class.component.css'],
})
export class RegisterClassComponent implements OnInit {
  
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
  select_paymmnet:any=[]
  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dateArray=[
      {'day' :'Sunday', 'day_index':0, 'day_time':[]},
      {'day' :'Monday', 'day_index':1, 'day_time':[]},
      {'day':"Tuesday", 'day_index':2,  'day_time':[]},
      {'day':"Wednesday", 'day_index':3, 'day_time':[]},
      {'day':"Thursday",  'day_index':4, 'day_time':[]},
      {'day':"Friday", 'day_index':5, 'day_time':[]},
      {'day':"Saturday", 'day_index':6,  'day_time':[]},
      
    ]

    
  }

  ngOnInit(): void {
    // this.classForm = this.newForm();
    // this.scheduleForm = this.newScheduleForm()
    this.getCategory();
    this.getgradelist();
  }

  radioChange(){
    console.log('radio',this.create_class.overview);
  }

  radioChange_able(event:any){
    //
    console.log('able',event);
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
    //console.log('able', this.create_class);
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

  newForm() {
    return this.formBuilder.group({
      provider_id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      bussiness_name: ['', [Validators.required]],
      total_strength: ['', [Validators.required]],
      expertise: [[]],
      cost: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      Slot: [{ days: 1, time: '3:00 PM' }, [Validators.required]],
      days: [''],
      time: [''],
      Location: [
        { latitude: '54.4545', longitude: '32.454' },
        [Validators.required],
      ],
    });
  }

  selectChange(){
    console.log('category',this.category);
  }

 
registerClass_(){
  let startTime2 = moment(this.startTime, ["h:mm A"]).format("HH:mm:ss");
  let endTime2 = moment(this.endTime,["h:mm A"]).format("HH:mm:ss");
 
  if(!this.title){
    this.toastr.warning("Please add Title");
  }else if(!this.UserType){
    this.toastr.warning("Please select User Type in top:Adult or Kids");
  }else if(!this.total_strength){
    this.toastr.warning("Please enter total strength of class");
  }else if(!this.price){
    this.toastr.warning("Please enter price");
  }
  else if(!this.startDate){
    this.toastr.warning("Please enter start Date");
  }
  else if(!this.startTime){
    this.toastr.warning("Please enter start Time");
  }
  else if(!this.endTime){
    this.toastr.warning("Please enter end Time");
  }
  else if(!this.policy){
    this.toastr.warning("Please select policy");
  }
else{
  const formData = new FormData();
    formData.append("title", this.title);
    formData.append("overview", this.overview);
    formData.append("class_for",this.UserType);
    formData.append("expertise", this.selectedExpertise);
    formData.append("total_strength", this.total_strength);
    formData.append("price", this.price);
    formData.append("sub_category_id",this.category);
    formData.append("class_length", this.classLength);
    formData.append("strat_date",moment(this.startDate).format());
    formData.append("start_tiem", moment(`${this.startDate} ${startTime2}`).format());
    formData.append("end_time",moment(`${this.startDate} ${endTime2}`).format());
    formData.append("select_day", this.selectedDays);
    formData.append("image", this.imageLink);

    this.service.servicebooking(formData).subscribe((resp: any) => {
      console.log("Add resp: ", resp);
     if(resp.success == true){
      this.toastr.success("Your Class has been added!");
     }

      this.title = "",
      this.overview = "",
      this.UserType = "kids",
      this.selectedExpertise = "";
      this.price="",
      this.category = "",
      this.classLength = "",
      this.startDate = "",
      this.startTime = "",
      this.endTime ="",
      this.selectedDays = ""
   });
  
  }
}

registerClass_validation(){
  console.log(this.imageLink)
  if(!this.create_class.class_title){
    this.toastr.success("Please add activity name!");
  }
  else if(!this.create_class.class_type){
    this.toastr.success("Please add activity name!");
  }
  else if(!this.create_class.class_description){
    this.toastr.success("Please add activity description!");
  }
  // else if(this.create_class.class_type =='INPERSON'){
  //   if(!this.create_class.class_location){
  //     this.toastr.success("Please add class location!");
  //   }
  // }
  // else if(this.create_class.class_type =='ONLINE'){
  //   if(!this.create_class.vidoe_class_link){
  //     this.toastr.success("Please add online class meeting link!");
  //   }
  // }
  else if(this.imageLink === undefined){
    console.log(this.imageLink)
    this.toastr.success("Please add a class image!");
  }
  else if(!this.create_class.crash_course){
    this.toastr.success("Please select class type!");
  }
  else if(!this.select_cat){
    this.toastr.success("Please select class category!");
  }
  else if(!this.create_class.overview){
    this.toastr.success("Please select class carete for!");
  }
  // else if(!this.create_class.age_from  || !this.create_class.age_to ){
  //   this.toastr.success("Please  add student age!");
  // }

  else if(!this.create_class.tota_fees){
    this.toastr.success("Please select class fees!");
  }
  else if(!this.create_class.total_strenght){
    this.toastr.success("Please select class strength!");
  }
  else if(!this.create_class.total_strenght){
    this.toastr.success("Please select class strength!");
  }

  // else if(this.create_class.crash_course =='SEMESTER'){
  //   // if(this.create_class.able_to_perclass== 'PERCLASS'){
  //   //   if(!this.create_class.able_to_fees_perclass){
  //   //     this.toastr.success("Please add per class fees amount!");
  //   //   }

  //   // }
  //   // if(this.create_class.able_to_weekly== 'WEEKLY'){
  //   //   if(!this.create_class.able_to_fees_weekly){
  //   //     this.toastr.success("Please add weekly class fees amount!");
  //   //   }
  //   // }
  
  //   // if(this.create_class.able_to_monthly== 'MONTHLY'){
  //   //   if(!this.create_class.able_to_fees_monthly){
  //   //     this.toastr.success("Please add monthly class fees amount!");
  //   //   }
  //   // }
   
  
  // }

 
  else if(!this.create_class.strat_date){
    this.toastr.success("Please select class strat date!");
  }

  else if(!this.create_class.start_tiem || !this.create_class.end_time){
    this.toastr.success("Please add class time!");
  }
  // else if(this.create_class.crash_course !='SINGELDAY'){
  //   console.log(this.create_class.crash_course)
  //   if(!this.select_day){
  //     this.toastr.success("Please select weekly day!");
  //   }

  // }

  else{
    this.registerClass()
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

registerClass(){
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
    "class_category":this.select_cat,
    "age_range":{
        "age_from":this.create_class.age_from,
        "age_to":this.create_class.age_to,
    },
    "grade_range":{
        "grade_from":this.create_class.grade_from,
        "grade_to":this.create_class.grade_to
    },
    "able_to_monthly":this.create_class.able_to_monthly,
    "able_to_fees_monthly":this.create_class.able_to_fees_monthly,
    "able_to_weekly":this.create_class.able_to_weekly,
    "able_to_fees_weekly":this.create_class.able_to_fees_weekly,
    "able_to_perclass":this.create_class.able_to_perclass,
    "able_to_fees_perclass":this.create_class.able_to_fees_perclass,

    "crash_course":this.create_class.crash_course,
    "total_strenght":this.create_class.total_strenght,
    "class_fees":this.create_class.tota_fees,
    "strat_date":this.create_class.strat_date,
    "end_date":this.create_class.end_date,
    "semesetenddate":this.create_class.semesetenddate,
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
this.service.servicebooking(data).subscribe((resp: any) => {

 
  console.log("Add resp: ", resp);
 if(resp.success){
   this.uploadimage(resp.data._id)
 }
});


}

uploadimage(id:any){
  const formData = new FormData();
  formData.append("image", this.imageLink);
  this.service.postclassImage(formData,id).subscribe((response:any)=>{
    console.log(response)
    if(response.status){
      this.toastr.success("Your Class has been added!");
      this.router.navigate(['/register-class-list']);
      
    }
  })
}

getSelection(item:any) {
  return this.selection.findIndex((s:any) => s.id === item.id) !== -1;
}


newScheduleForm() {
  return this.formBuilder.group({
    startDate: [moment(new Date()).format('DD/MM/YYYY'), [Validators.required]],
    endDate: ['', [Validators.required]],
    schedule: new FormArray([
      new FormControl([]),
      new FormControl([]),
      new FormControl([]),
      new FormControl([]),
      new FormControl([]),
      new FormControl([]),
      new FormControl([]),
    ]),
  });
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

select_day(event:any){
  var select =[]
  this.selectedDays_array =[]
  console.log(this.selectedDays)

  
  for (var i in this.selectedDays) {
    this.selectedDays_array.push({
      'day_index': this.selectedDays[i]
    })
    console.log(this.selectedDays_array)
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

  
}
