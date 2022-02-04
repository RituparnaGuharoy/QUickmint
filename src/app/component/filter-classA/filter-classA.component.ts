import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-filter-classA',
  templateUrl: './filter-classA.component.html',
  styleUrls: ['./filter-classA.component.css'],
})
export class FilterClassAComponent implements OnInit {
  @Output() onValueChanged = new EventEmitter();
  price: any = '';
  minAge: any = '';
  maxAge: any = '';
  filterQuery: any = {};
  higherPrice:number=0;
  lowerPrice:number=1;
  ClassesFor:string = 'adults';
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

  constructor(private service: WebserviceService,
    private toastr: ToastrService,
    public router: Router,
    )  {}

  ngOnInit(): void {
    this.service.lowerPrice = this.lowerPrice;
    let data = {
      allcategory:this.service.allcategory,
      lowerPrice:this.lowerPrice
     }
     this.service.getServiceList(data).subscribe((data: any) => {
      //this.providersList = data.data;
      this.service.FilteredData = data.data;
      console.log('serviceList: in higher filter ', data.data);
      
    });  
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
  setTimeout(() => {
    this.open = false;
  }, 250);
}

listingDetails(id:any){
  this.router.navigate(['/sub-category/'+id]);
}

onTypeChange(value:any){
  this.service.classType = value;
  this.service.showList = true;
if(this.service.classType =='kids')
{
this.service.categoryId = this.service.kidCategoryId;
this.getSubcategory();
}
else if(this.service.classType =='adults'){
  this.service.categoryId = this.service.adultCategoryId;
  this.getSubcategory();
}

if(this.userType1 == '1'){
this.getMyClasses(this.service.classType);
}else{
  this.getRelatedClasses(this.service.classType,this.service.subCategoryId);
}
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
}



