import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-filter-class',
  templateUrl: './filter-class.component.html',
  styleUrls: ['./filter-class.component.css'],
})
export class FilterClassComponent implements OnInit {
  @Output() onValueChanged = new EventEmitter();
  price: any = '';
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
  subcategorylisting:any;
  level:any;
  open = false;
  userType: any;
  searchQuery: any = '';
  list: never[];
  pageCategory:any;
  classcategory:any;
  format_type:any=[];
  dates_check:any;
  customdate:any;
  custom_date_check:boolean=false
  age_select:any=[]
  price_select:any=[]
  priceRangeArr: any = [
    { "id": '0-25', name: '0-25' },
    { "id": '26-100', name: '26-100' },
    { "id": '101-300', name: '101-300' },
    { "id": '301-300000000', name: '301 Above' }
  ]
  gradeRangeArr:any =['1-5','6-8','9-12']
  ChildageRangeArr:any =['2-8','9-13','14-17']
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
  activity_type:any;
  overview:any;
  category:any;
  price_range:any;
  constructor(private service: WebserviceService,
    private toastr: ToastrService,
    public router: Router,
    )  {
      this.service.getObservable_type().subscribe((resp:any)=>{
        
        this.overview = resp.type
        console.log('filter',this.overview)
      })


    }

  ngOnInit(): void {
    this.getCategory();
    this.getdistancelist();
    this.service.lowerPrice = this.lowerPrice;
    let data = {
      allcategory:this.service.allcategory,
      lowerPrice:this.lowerPrice
     }
     this.service.getServiceList(data).subscribe((data: any) => {
      this.service.FilteredData = data.data;
    }); 
  }

  
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
 this.search_classlist(value,'UserType')
}

onTypeChange1(value:any){
  
  console.log(value)
  this.Student_type = value;
 this.search_classlist(value,'UserType')
}
PriceSearch(event:any){
  console.log(this.price_range)
  //this.search_classlist(this.price_range,'Price')
  if (event.target.checked) {
    var price = event.target.value.split('-')
    this.price_select.push(price[0],price[1])
    console.log(this.price_select)
    this.search_classlist(this.price_select,'Price')
  }else {
    var price = event.target.value.split('-')
    var index = this.price_select.indexOf(price[0]);
    console.log(index)
    if (index !== -1){
      this.price_select.splice(index,2);
      console.log(this.price_select)
      this.search_classlist(this.price_select,'Price')
    }
  }
}
onTypeChange_class(value:any){
  console.log(value)
  this.classType = value
  this.search_classlist(value,'Class')
}

onTypeChange_class1(value:any){
  console.log(value)
  this.classType = value
  this.search_classlist(value,'Class')
} 
GradeSearch(item:any){
  console.log(item)
  this.search_classlist(item,'Grade')
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
    console.log(value,date);
    this.search_classlist(date,'dates');
  }
  if(value =='Tomorrow'){
    this.custom_date_check = false
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = (currentDate.getDate() < 10) ? "0" + currentDate.getDate().toString() : currentDate.getDate();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    var year = currentDate.getFullYear();
    var date = year + '-' + month + '-' + day +'T00:00:00.000Z';
    console.log(value,date);
    this.search_classlist(date,'dates');
  }
  if(value =='Customdate'){
    this.custom_date_check = true
  }
}



addToKeywords(){
  console.log(this.customdate)
  var date = this.customdate +'T00:00:00.000Z';
  this.search_classlist(date,'dates');
}

FormatSerach(event:any){
  console.log(event)
  //this.search_classlist(item,'Format')
  if (event.target.checked) {
    this.format_type.push(event.target.value)
    console.log(this.categories)
    this.search_classlist(this.format_type,'Format')
  }else {
    var index = this.format_type.indexOf(event.target.value); 
    if (index !== -1){
      this.format_type.splice(index, 1);
      console.log(this.format_type)
      this.search_classlist(this.format_type,'Format')
    }
  }
}

serachbyid(event:any,id:any,i:any){
  console.log(id)
  console.log(event.target.checked)
    if (event.target.checked) {
      this.categories.push(event.target.value)
      console.log(this.categories)
      this.search_classlist(this.categories,'Category')
    }else {
      var index = this.categories.indexOf(event.target.value); 
      if (index !== -1){
        this.categories.splice(index, 1);
        console.log(this.categories)
        this.search_classlist(this.categories,'Category')
      }
    }
  //this.search_classlist(id,'Category')
}

ageSerach(event:any){
  console.log(event.target.checked)
  //this.age_select.push(age[0],age[1])
  
  if (event.target.checked) {
    var age = event.target.value.split('-')
    this.age_select.push(age[0],age[1])
    console.log(this.age_select)
    this.search_classlist(this.age_select,'Age')
  }else {
    var age = event.target.value.split('-')
    var index = this.age_select.indexOf(age[0]);
    console.log(index)
    if (index !== -1){
      this.age_select.splice(index,2);
      console.log(this.age_select)
      this.search_classlist(this.age_select,'Age')
    }
  }
  
}


distanceSerach(item:any){
  this.search_classlist(item,'Distance')
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

getRelatedClasses(value:any,subCategoryId:any){
  this.service.getRelatedClassList(value,subCategoryId).subscribe((resp: any) => {
    this.service.classesList = resp.data;
   });
}


getAllClassesList(value:any) {
  this.service.getClassesList(value).subscribe((resp: any) => {
    this.service.classesList = resp.data;
  });
}

getMyClasses(value:any) {
  this.service.getClassesListProvider(this.Id,value).subscribe((resp: any) => {
    this.service.classesList = resp.data;
  });
}

  filter() {
    this.price !== '' && this.price !== null && this.price !== undefined
      ? (this.filterQuery.price = this.price)
      : (this.filterQuery.price = 0);

    this.minAge !== '' && this.minAge !== null && this.minAge !== undefined
      ? (this.filterQuery.minAge = this.minAge)
      : (this.filterQuery.minAge = 6);

    this.maxAge !== '' && this.maxAge !== null && this.maxAge !== undefined
      ? (this.filterQuery.maxAge = this.maxAge)
      : (this.filterQuery.maxAge = 12);
      
    this.onValueChanged.emit(this.filterQuery);
  }

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

 


  search_classlist(data:any,type:any){
    console.log(data,type)
    this.service.publishClassserach({
      serach_data: data,
      type:type
      });
  }

  clear_serach(type:any){
    console.log(type)
    if(type=='Category'){
      this.search_classlist(undefined,'Category');
      this.category = null;
    }
    if(type=='Class'){
      this.search_classlist(undefined,'Class');
      this.activity_type =null;
      
    }

    if(type=='UserType'){
      this.search_classlist(undefined,'UserType');
      this.overview = null;
    }

    if(type=='Price'){
      this.search_classlist(undefined,'Price');
      this.price_range = null;
    }

    if(type=='Format'){
      this.search_classlist(undefined,'Format');
    }
  }
}



