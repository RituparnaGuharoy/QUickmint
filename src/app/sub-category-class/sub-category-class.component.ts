import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { WebserviceService } from 'src/app/services/webservice.service';
import { JitsiComponent } from '../jitsi/jitsi.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-sub-category-class',
  templateUrl: './sub-category-class.component.html',
  styleUrls: ['./sub-category-class.component.css']
})
export class SubCategoryClassComponent implements OnInit, OnDestroy {
  level = 0
  category_id: any;
  subcategorylisting: any;
  breadcrumbs = [];
  providersList: any = null;
  url: any;
  userType = localStorage.getItem('userType');
  id = localStorage.getItem('userId');
  //kidCategoryId:string="609155f8c1bef37b9230887a";
  //adultCategoryId:string="60b41af8f3286a65034e5572";
  baseUrl: any;
  photoUrl: string = url;

  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  classesList: any;
  //providersList: any;
  data: any;
  serviceData: any;
  trainingValue: any;
  stripeTokenData: any;
  BookingObjectId: any;
  price: number;
  title: string;
  bookedArray: any;
  bookinglist: any = [];
  isDisabled = true;
  currentTime: any;
  serviceTime: any;
  currentdateComponent: any;
  startdateComponent: any;
  currenttimeComponent: any;
  starttimeComponent: any;
  // endDate1:any;
  // endTime1:any;
  enddateComponent: any;
  endtimeComponent: any;
  difference1: any;
  difference2: any;
  showList: boolean = true;
  token: any = localStorage.getItem('access-token-quickmint')
  allClasslist:any;
  Usertype:any;
  Serachtype:any;
  Price:any;
  Class:any;
  
  minPrice :any;
  maxPrice :any;
  Distance:any;
  latitude:any;
  longitude:any;
  grade_from:any;
  grade_to:any;
  age_from:any;
  age_to:any;
  format_type:any=[];
  format_search:any;
  strat_date:any;
  page = 1;
  limit = 25;
  params: any;
  count: Number = 0;
  date_sorting:string='ascending';


  /////////////////////////////////////////

  //price: any = '';
  minAge: any = '';
  maxAge: any = '';
  filterQuery: any = {};
  higherPrice:number=0;
  lowerPrice:number=1;
  ClassesFor:string = 'kids';
  Id = localStorage.getItem('userId');
  userType1 = localStorage.getItem('userType');
  categorylisting: any;
  categorySubcategory:any;
  //subcategorylisting:any;
  //level:any;
  open = false;
  //userType: any;
  searchQuery: any = '';
  list: never[];
  pageCategory:any;
  classcategory:any;
  //format_type:any=[];
  dates_check:any;
  customdate:any;
  custom_date_check:boolean=false
  age_select:any=[]
  price_select:any=[]
  schedule_date:any=[]
  priceRangeArr: any = [
    { "id": '0-25', name: '0-25' },
    { "id": '26-100', name: '26-100' },
    { "id": '101-300', name: '101-300' },
    { "id": '301-300000000', name: '301 Above' }
  ]
  gradeRangeArr:any =['1-5','6-8','9-12']
  ChildageRangeArr:any =['2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17']
  AdultageRangeArr:any =[
    { "id": '18-35', age: '18-35' },
    { "id": '36-55', age: '36-55' },
    { "id": '56-130', age: '55+' },
  
  ]
  distance:any ;
  //=['5','10','15','20','25','30','35']
  Student_type:any;
  classType:any;
  categories:any=[];
  Search_category:any=[];
  activity_type:any;
  overview:any;
  category:any;
  price_range:any;
  distance_serach:any;
  constructor(
    private route: ActivatedRoute,
    public service: WebserviceService,
    public router: Router,
    public dialog: MatDialog,
    public toast: ToastrService

  ) {

  }

  ngOnInit(): void {
    this.getCategory();
    this.getdistancelist();
    this.service.categoryId = this.service.kidCategoryId;
    this.getSubcategories();
    this.userType == '1' ? this.getMyClasses() : this.getRelatedClasses(this.service.classType, this.service.subCategoryId)
    // this.getAllClassesList();
    //this.invokeScript();
    //this.GetUserBookedList();
    
    this.currentTime = moment().toISOString();
    var currentdate = moment(this.currentTime);
    this.currentdateComponent = currentdate.format('YYYY-MM-DD');
    this.currenttimeComponent = currentdate.format('HH:mm:ss');
    console.log('date component1', this.currentdateComponent);
    console.log('time component1', this.currenttimeComponent);
    this.route.queryParams.subscribe((params) => { 
     
      console.log('class id',params);
      this.Search_category = params.categoryId
     
      if(params.serachType =='location'){
        this.latitude =params.Latitude;
        this.longitude = params.Longitude;
        this.Class = 'INPERSON';
        this.Distance = 50;
        this.Search_category = params.classId;
        this.getclasslist();
      }
      else if(params.type){
        this.Usertype = params.type;
        this.getclasslist();
      }
      else{
        
        this.getclasslist();
      }
      
  });
    this.service.getObservableClassSerach().subscribe((resp:any)=>{
      console.log('serach',resp)
      // if(resp.type=='UserType'){
      //     this.Usertype = resp.serach_data;
      //     this.Serachtype = resp.type;
      //     this.getclasslist();
      // }
      // if(resp.type=='Price'){
      //   console.log(resp.serach_data)
      //   if(resp.serach_data !=undefined){
      //     this.Price = resp.serach_data;
      //   this.Serachtype = resp.type;
       
      //   this.getclasslist();
      //   }else if(resp.serach_data ==undefined){
      //     this.Price = undefined;
      //   this.Serachtype = resp.type;
       
      //   this.getclasslist();
      //   }
        
      // }
      // if(resp.type=='Class'){
      //   this.Class = resp.serach_data;
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      // }
      // if(resp.type=='Category'){
      //   this.Search_category = resp.serach_data;
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      // }
      //  if(resp.type=='Distance'){
      //   this.Distance = resp.serach_data;
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      //   this.setCurrentPosition();
      //  }
      //  if(resp.type=='Age'){
        
        
      //   if(resp.serach_data == ''){
      //     this.age_from = undefined
      //     this.Serachtype = resp.type;
      //     console.log(this.age_from)
      //   this.getclasslist();
      //   }else{
      //     this.age_from = resp.serach_data
      //     this.Serachtype = resp.type;
      //     console.log(this.age_from)
      //   this.getclasslist();
      //   }
        
        
      //  }
      //  if(resp.type=='Grade'){
      //   this.grade_from = resp.serach_data.split('-')[0];
      //   this.grade_to = resp.serach_data.split('-')[1];
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      //  }
      //  if(resp.type=='Format'){
      //   this.format_type = resp.serach_data
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      //  }

      //  if(resp.type=='dates'){
      //   this.strat_date = resp.serach_data
      //   this.Serachtype = resp.type;
      //   this.getclasslist();
      //  }
    })
    
  }

setCurrentPosition() {
    //if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('geolocation',this.latitude)
        this.getclasslist();
      });
    //}
  }

  getSubcategories() {
    console.log('subcategories id', this.service.categoryId);
    console.log('access-token-quickmint', localStorage.getItem('access-token-quickmint'));
    this.service.subcategorylisting(this.service.categoryId).subscribe(
      (data: any) => {
        console.log('subcategory', data);
        if (data.count > 0) {
          this.service.subCategorylisting = (<any>data)["data"];
          this.level = 1
        } else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "none"
            }
          }
          this.router.navigate(['service-provider-list'], nav)
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getData(data: any) {
    this.service.subCategoryId = data._id;
    this.service.showList = false;
    this.getRelatedClasses(this.service.classType, this.service.subCategoryId);
  }

  async getProviders(data: any) {
    console.log("level: ", this.level)
    if (this.level == 1) {

      // 1
      this.service.getsubcategorylistingOne(data._id).subscribe((resp: any) => {
        // console.log("level getsubcategorylistingOne: ", this.level)
        console.log(resp)
        // 2
        if (resp.count > 0) {
          this.level = 2
          console.log("leveeeeel: ", this.level)

          this.subcategorylisting = resp.data
        }
        // 3
        else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "level 0"
            }
          }
          this.router.navigate(['service-provider-list'], nav)
        }
      })
    } else if (this.level == 2) {
      this.service.getsubcategorylistingTwo(data._id).subscribe((resp: any) => {
        console.log("level getsubcategorylistingTwo: ", this.level)
        console.log(resp)
        // 2
        if (resp.count > 0) {
          this.level = 3
          this.subcategorylisting = resp.data
        }
        // 3
        else {
          let nav: NavigationExtras = {
            state: {
              data: data,
              type: "level 1"
            }
          }
          this.router.navigate(['service-provider-list'], nav)
        }
      })
    } else if (this.level == 3) {
      let nav: NavigationExtras = {
        state: {
          data: data,
          type: "level 2"
        }
      }
      this.router.navigate(['service-provider-list'], nav)
    }
  }


  meetingEnable(start: any, end: any): Boolean {
    var startdate = moment(start);
    var enddate = moment(end);
    this.startdateComponent = startdate.format('YYYY-MM-DD');
    this.starttimeComponent = startdate.format('HH:mm:ss');
    this.enddateComponent = enddate.format('YYYY-MM-DD');
    this.endtimeComponent = enddate.format('HH:mm:ss');
    if (this.currentdateComponent === this.startdateComponent) {
      var starttime = `${this.starttimeComponent}`;
      var currenttime = `${this.currenttimeComponent}`;
      var endtime = `${this.endtimeComponent}`;

      this.difference1 = moment.utc(moment(starttime, "HH:mm:ss").diff(moment(currenttime, "HH:mm:ss"))).format("HH:mm:ss");
      this.difference2 = moment.utc(moment(currenttime, "HH:mm:ss").diff(moment(endtime, "HH:mm:ss"))).format("HH:mm:ss");
    
      var fifteenmin = 10 * 60;
      var startseconds = this.convertHourstoMinute(this.difference1);
      var endseconds = this.convertHourstoMinute(this.difference2)

      if ((startseconds <= fifteenmin || endseconds <= fifteenmin) || ((starttime < currenttime) && (currenttime < endtime))) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }

  convertHourstoMinute(str: any) {
    let [hours, minutes, seconds] = str.split(':');
    return (+hours * 60 * 60) + (+minutes * 60) + (+seconds);
  }

  joinMeeting(c: any) {
    const dialogRef = this.dialog.open(JitsiComponent, {
      data: {
        provider: { _id: c.provider_id },
        user: { _id: c._id },
      },
    });
  }
  // async GetUserBookedList() {
  //   this.service.getUserBookedList().subscribe((resp: any) => {
  //     this.bookedArray = resp.data;
  //     this.bookinglist = this.bookedArray.filter((data: any) => {
  //       if (data.booking_status === 'accept' && data.user_id == this.id) {
  //         return (data.bookedService._id);
  //       }
  //     }).map((data1: any) => {
  //       return data1.bookedService._id
  //     })
  //   });
  // }

   makePayment(c: any) {
    console.log(c)
    var ref = this;
    ref.price = c.price;
    this.title = c.title;
    let serviceData =
    {
      provider_id: c.provider_id._id,
    }
    let trainingValue = c._id;
    this.service.bookService(serviceData, trainingValue).subscribe((resp: any) => {
      var that = this;
      let stripe;
      that.BookingObjectId = resp.data._id;

      //stripTokenData
      const paymentHandler = (<any>window).StripeCheckout.configure({
        //key: 'pk_test_51J0JswEh4mw6fxvKsQTAQeqhTu5VOD9ojd5Ur2lc65WNaBxSsn8jhrTlJIR1ooBgSgp5Rf5PMoZTwfBHrE71mqxY00Actf65yq',
        key: 'pk_live_51J0JswEh4mw6fxvKaufCiyufE6UH3qcnfhUGwuwnAsuu409DX3Ow0SsSkFbSDUAnpL0GhSEzcGTBV7UWAY93j7dW0042rjibCm',
        token: function (stripeToken: any) {
          console.log('stripeToken', stripeToken);
          that.stripeTokenData = stripeToken.id;
          // alert('token has been created');
          stripe = stripeToken._id
          that.service.trainingPayment(that.BookingObjectId, that.stripeTokenData).subscribe((resp: any) => {
            console.log('training response', resp);
            if (resp.message == 'Success') {
              that.toast.success('booking successful!');
            }
            else {
              that.toast.success('some error has occurred while booking');
            }
           // that.GetUserBookedList();
            // use _id of book response for payment;
          })
        },
      });

      paymentHandler.open({
        name: this.title,
        //description:'products',
        amount: ref.price * 100
      })
    });
  }

  gotoDetails(c: any) {
    this.router.navigate(['/service-details/'],{ queryParams: {providerId: c.provider_id._id} })
  }

  bookclss(c: any){
    if(c.crash_course=='SEMESTER'){
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: c._id,Price: c.class_fees}})

    }else{
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: c._id,Price: c.class_fees}})
    }
    
  }

  invokeScript() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }
  

  getRelatedClasses(value: any, subcategoryId: any) {
    this.service.getRelatedClassList(value, subcategoryId).subscribe((resp: any) => {
      this.service.classesList = resp.data;
    });
  }

  getMyClasses() {
    let value = this.service.classType;
    this.service.getClassesListProvider(this.id, value).subscribe((resp: any) => {
      this.service.classesList = resp.data;
    });
  }

  getAllClassesList() {
    let value = this.service.classType;
    this.service.getClassesList(value).subscribe((resp: any) => {
      this.service.classesList = resp.data;
    });
  }

  displayExpertise(c: any) {
    let exp = '';
    for (let [i, expertise] of c.expertise.entries()) {
      i == c.expertise.length - 1
        ? (exp += expertise)
        : (exp += expertise + ', ');
    }
    return exp;
  }

  ngOnDestroy() {
    this.service.showList = true;
  }

  openLoginDialog(details:any) {
    const dialogRef = this.dialog.open(LoginComponent,
       { width: '620px' ,
       data: {
        classId: details,
        page:'classDetails'
      }
      });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }

  gotoClassDetails(c: any){
    this.router.navigate(['/class-details'],{queryParams : {classId: c._id}});
    
  }

  sortbydate(){
    console.log(this.date_sorting)
    this.getclasslist();
  }

  getclasslist(){
    
    console.log(this.Search_category)
    let data={
      'UserType': this.Student_type,
      'SerachType' : this.Serachtype,
      'price_range' :  this.Price,
      //'priceMini' : this.minPrice,
       'category':this.Search_category,
       'class':this.Class,
       'distancemax':this.Distance,
        'Latitude':this.latitude,
        'Longitude': this.longitude,
        'age_range':this.age_from,
        //'age_to':this.age_to,
        'grade_from':this.grade_from,
        'grade_to':this.grade_to,
        'class_type' :this.format_search,
        'strat_date' :this.strat_date,
        'sorting_date' :this.date_sorting,
        'page':this.page,
        'limit':this.limit,
    }
    this.service.getUserClasList(data).subscribe((resp: any) => {
      console.log('getAllClassesList: ', resp);
      //this.service.classesList = resp.data;
      if(resp.success){
        if(resp.count==0){
          this.toast.success('No class available right now');
          this.allClasslist = resp.data;
          this.count = resp['count'];
        }else{
          this.count = resp['count'];
          this.allClasslist = resp.data
        }
      }
    });
  }

  
  paginationChange(event:any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getclasslist()
   // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
  }



  ////////////////////////////////////////////////////////////////////

  getdistancelist(){
    this.service.distanceList().subscribe((response:any)=>{
      console.log('distance list',response)
      this.distance = response['data']
    })
  }

  onItemChange1(value:any){
    this.service.lowerPrice = this.lowerPrice;
    this.lowerPrice = value;
    this.higherPrice = 0;
    this.serviceList();
 }

 onItemChange2(value:any){
  this.service.higherPrice = this.higherPrice;
  this.higherPrice = value;
  this.lowerPrice = 0;
  this.serviceList();
}

openDropdown() {
  this.open = true;
}

closeDropdown() {
  console.log('on blur: ', this.open);
  setTimeout(() => {
    this.open = false;
  }, 250);
}

listingDetails(id:any){
  this.router.navigate(['/sub-category/'+id]);
}

onTypeChange(value:any){
  
  console.log(value)
  this.Student_type = value;
  this.getclasslist()
}


PriceSearch(event:any){
  console.log(this.price_range)
  //this.search_classlist(this.price_range,'Price')
  if (event.target.checked) {
    var price = event.target.value.split('-');
    this.price_select.push(price[0],price[1]);
    this.Price = this.price_select;
    console.log(this.price_select)
     this.getclasslist();
  }else {
    var price = event.target.value.split('-')
    var index = this.price_select.indexOf(price[0]);
    console.log(index)
    if (index !== -1){
      this.price_select.splice(index,1);
      if(this.price_select.length ==0){
        this.Price = undefined;
      }else{
        this.Price = this.price_select;
      }
      
      console.log(this.price_select)
      this.getclasslist();
     // this.search_classlist(this.price_select,'Price')
    }
  }
}
onTypeChange_class(value:any){
  console.log(this.latitude)
  this.Class = value
  //this.getclasslist()
  if(this.Class =='INPERSON'){
    if(this.latitude== undefined && this.longitude == undefined){
      // this.setCurrentPosition();
      this.toast.success('Please search by address.');
    }else{
      this.getclasslist();
    }
  }else if(this.Class =='ONLINE'){
    this.Distance = undefined;
    this.getclasslist();
  }
  
}


GradeSearch(item:any){
  console.log(item)
  //this.search_classlist(item,'Grade')
}

ondates_checkChange(value:any){
  console.log(value)

  if(value =='Today'){
    this.custom_date_check = false
    var currentDate = new Date();
    var day = (currentDate.getDate() < 10) ? "0" + currentDate.getDate().toString() : currentDate.getDate();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    var year = currentDate.getFullYear();
    var date = year + '-' + month + '-' + day +'T00:00:00.000Z';
    this.strat_date = date;
    console.log(value,date);
    this.getclasslist()
  }
  if(value =='Tomorrow'){
    this.custom_date_check = false
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = (currentDate.getDate() < 10) ? "0" + currentDate.getDate().toString() : currentDate.getDate();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    var year = currentDate.getFullYear();
    var date = year + '-' + month + '-' + day +'T00:00:00.000Z';
    this.strat_date = date;
    console.log(value,date);
    this.getclasslist()
  }
  if(value =='Customdate'){
    this.custom_date_check = true
  }
}



addToKeywords(){
  console.log(this.customdate)
  var date = this.customdate +'T00:00:00.000Z';
  this.strat_date = date;
  this.getclasslist()
}

FormatSerach(event:any){
  console.log(event)
  //this.search_classlist(item,'Format')
  if (event.target.checked) {
    this.format_type.push(event.target.value)
    this.format_search = this.format_type;
    console.log(this.categories)
    this.getclasslist();
  }else {
    var index = this.format_type.indexOf(event.target.value); 
    if (index !== -1){
      this.format_type.splice(index, 1);

      if(this.format_type.length==0){
        this.format_search =undefined;
      }else{
        this.format_search = this.format_type;
      }
      
      console.log(this.format_type)
      this.getclasslist();
    }
  }
}

serachbyid(event:any,id:any,i:any){
  console.log(id)
  console.log(event.target.checked)
    if (event.target.checked) {
      this.categories.push(event.target.value)
      this.Search_category= this.categories;
      console.log(this.Search_category)
       this.getclasslist();
    }else {
      var index = this.categories.indexOf(event.target.value); 
      if (index !== -1){
        this.categories.splice(index, 1);
        if(this.categories.length==0){
          this.Search_category= undefined;
        }else{
          this.Search_category= this.categories;
        }
        
        console.log(this.categories)
        this.getclasslist();
      }
    }
  //this.search_classlist(id,'Category')
}

ageSerach(event:any){
  console.log( event.target.value)
  //this.age_select.push(age[0],age[1])
  
  if (event.target.checked) {
    var age = event.target.value.split('-')
    this.age_select.push(event.target.value);
    this.age_from = this.age_select;
    console.log(this.age_from)
    this.getclasslist();
  }else {
    var age = event.target.value.split('-')
    var index = this.age_select.indexOf(event.target.value);
    console.log(index)
    if (index !== -1){
      this.age_select.splice(index,1);
      
      if(this.age_select.length==0){
        this.age_from = undefined;
      }else{
        this.age_from = this.age_select;
      }
      
      console.log(this.age_from)
      this.getclasslist();
    }
  }
  
}


distanceSerach(item:any){
  //this.setCurrentPosition();
  console.log(
    item
  )
  this.Distance = item
  
  
 //this.search_classlist(item,'Distance')
 this.getclasslist();
}




getSubcategory(){
  console.log('getsubcategory id',this.service.categoryId);
    this.service.subcategorylisting(this.service.categoryId).subscribe(
      (data: any) => {
        console.log('subcategory',data);
          this.service.subCategorylisting = (<any>data)["data"];
          this.level = 1
        },
      (err) => {
        console.log(err);
      }
    );
}

onSearch(ev: any) {
  this.categorySubcategory = {...this.categorySubcategory};
}

onSearchChange(arg: any) {}


 serviceList(){
   if(this.higherPrice === 0){
   let data = {
     allcategory:this.service.allcategory,
     lowerPrice: this.lowerPrice,
     Latitude:this.service.Latitude,
     Longitude:this.service.Longitude,
     distancemini:0
   }
   this.service.getServiceList(data).subscribe((data: any) => {
   
    this.service.FilteredData = data.data;
  });
  }else if(this.lowerPrice === 0){
    let data = {
    allcategory:this.service.allcategory,
    higherPrice:this.higherPrice,
    Latitude:this.service.Latitude,
    Longitude:this.service.Longitude,
    distancemini:0
   }
   this.service.getServiceList(data).subscribe((data: any) => {
    this.service.FilteredData = data.data;
  });
  }
}

// getRelatedClasses(value:any,subCategoryId:any){
//   this.service.getRelatedClassList(value,subCategoryId).subscribe((resp: any) => {
//     this.service.classesList = resp.data;
//    });
// }


// getAllClassesList(value:any) {
//   this.service.getClassesList(value).subscribe((resp: any) => {
//     this.service.classesList = resp.data;
//   });
// }

// getMyClasses(value:any) {
//   this.service.getClassesListProvider(this.Id,value).subscribe((resp: any) => {
//     this.service.classesList = resp.data;
//   });
// }

  // filter() {
  //   this.price !== '' && this.price !== null && this.price !== undefined
  //     ? (this.filterQuery.price = this.price)
  //     : (this.filterQuery.price = 0);

  //   this.minAge !== '' && this.minAge !== null && this.minAge !== undefined
  //     ? (this.filterQuery.minAge = this.minAge)
  //     : (this.filterQuery.minAge = 6);

  //   this.maxAge !== '' && this.maxAge !== null && this.maxAge !== undefined
  //     ? (this.filterQuery.maxAge = this.maxAge)
  //     : (this.filterQuery.maxAge = 12);
      
  //   this.onValueChanged.emit(this.filterQuery);
  // }

  getCategory(){
    var that = this;
    let data={
      'page':1,
      'limit':200,
    }
    this.service.gerclasscategory(data).subscribe((resp:any)=>{
      console.log( 'adult response',resp);
      this.classcategory= resp.data;
    })
    

  }
  clear_serach(){
    console.log(this.overview)
    this.overview = null;
    this.Student_type = undefined;
    this.getclasslist();
  }

  clear_classtype(){
    this.activity_type = null;
    this.Class = undefined;
    this.getclasslist();
  }
  clear_distance(){
    this.distance_serach = null;
    this.distance = undefined;
  }
  clear_date(){
    this.dates_check = null;
    this.strat_date = undefined;
    this.getclasslist();
  }
  clear_category(){
    var items=document.getElementsByName('acs');
   
				for(var i=0; i<items.length; i++){
          console.log(items[i])
					// if(items[i].type=='checkbox')
					// 	items[i].checked=false;
				}
  }

  getclassDay(name:any){
    var dates:any =[];
   // console.log(name)
    for(var i=0; i<name.length;i++){
      dates.push(name[i].day)
    }
   
    this.schedule_date = dates.filter((c:any, index:any) => {
      return dates.indexOf(c) === index;
  });
  if(this.schedule_date.length == 0){
    return 'No day selected'
  }else{
    return this.schedule_date;
  }
  console.log(this.schedule_date)
  
  }

  getNumber(num:any) {
    
    var rates = parseInt(num)
    console.log(rates)
    return new Array(rates);   
    
}
}
