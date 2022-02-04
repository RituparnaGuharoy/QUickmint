import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebserviceService } from 'src/app/services/webservice.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';
//import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorylisting: any;
  providerlisting: any;
  allclass:any;
  allservice:any;
  ArryClass_service:any=[];
  galleryData:any;
  offerGallery:any;
  popularServiceList:any;
  rating:number
  // photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  offers : any[] = [];
  allClasslist:any;
  classList_count:any;
  banners = [
    {
      heading: "What service are you looking for..",
    subHeading: "Search from 25 awesome verified services!",
    buttonLink: "*",
      buttonText: "Book Now!",
      image: "assets/images/banner.png"
    }
];


  constructor(
    public service: WebserviceService,
    public ref: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getBanner();
    this.allclass_service();
    this.getclasslist();
    this.getOffer();
    this.service.categorylisting().subscribe(
      (data) => {
        this.categorylisting = (<any>data)["data"];
      },
      (err) => {
        console.log(err);
      }
    );

    this.service.PopularServiceList().subscribe(
      (data:any) => {
        console.log('service',data)
        this.popularServiceList = data.data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.service.topServiceList().subscribe(
      (data) => {
        this.providerlisting = (<any>data)["data"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBanner() {
    this.service.getBanner().subscribe((resp:any) => {
      this.banners = resp.data;
      this.galleryData = this.banners.filter((item: { image: any; }) => item.image === null);
      this.ref.detectChanges()
    })
  }

  getOffer(){
    this.service.getOffer().subscribe((resp:any) => {
      this.offers = resp.data
      this.offerGallery = this.offers.filter((item: { image: any; }) => item.image === null);
    })
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    margin:16,
    dots: false,
    navSpeed: 300,
    // navText: ['<img src="assets/images/arrow-prev.png">', '<img src="assets/images/arrow-next.png">'],
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  popularOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin:15,
    navSpeed: 300,
    navText: ['<img src="assets/images/arrow-prev.png">', '<img src="assets/images/arrow-next.png">'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  
  allclass_service(){
    this.service.allCategories().subscribe((response:any)=>{
      var newArray
      if(response.success){
        
        this.categorylisting = response.data
        
        // if(newArray.class_title){
        //   this.ArryClass_service.push({
        //     'title' : newArray.class_title,
        //     'image' : newArray.class_image,

        //   })
        // }else if(newArray.title){
        //   this.ArryClass_service.push({
        //     'title' : newArray.title,
        //     'image' : newArray.image
        //   })
        // }
        console.log(newArray)
      }
    })
  }

  getclasslist(){
    
    
    let data={
      'UserType': undefined,
      'SerachType' : undefined,
      'priceMax' :  undefined,
      'priceMini' : undefined,
       'category':undefined,
       'class':undefined,
       'distancemax':undefined,
        // 'Latitude':this.latitude,
        // 'Longitude': this.longitude,
        'age_from':undefined,
        'age_to':undefined,
        'grade_from':undefined,
        'grade_to':undefined,
        'class_type' :undefined,
        'page':1,
        'limit':6,
    }
    this.service.getUserClasList(data).subscribe((resp: any) => {
      console.log('getAllClassesList: ', resp);
      //this.service.classesList = resp.data;
      if(resp.success){
        this.classList_count = resp.count;
        if(resp.count==0){
         // this.toast.success('No class added');
          this.allClasslist = resp.data;
        }else{
          this.allClasslist = resp.data;
        }
      }
    });
  }

  redirectTo_details(type:any){
    console.log(type)
    if(type =='Kids Classes'){
      var types = 'KIDS'
      this.router.navigate(['/sub-category-class'],{queryParams : {type: types}})
      this.select_type(types);
    }
    if(type =='Classes'){
      var types = 'ADULTS'
      this.router.navigate(['/sub-category-class'],{queryParams : {type: types}})
      this.select_type(types);
    }
  }


  select_type(type:any){
   
    this.service.publish_type({
      
      type:type
      });
  }

  gotoClassDetails(c: any){
    this.router.navigate(['/class-details'],{queryParams : {classId: c._id}});
  }
  gotoClassList(c:any){
    this.router.navigate(['/sub-category-class'],{queryParams : {categoryId: c._id}})
  }
}




