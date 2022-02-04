import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { data } from 'jquery';
import { PopupDetailsComponent } from '../popup-details/popup-details.component';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { WebserviceService } from '../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { StarRatingComponent } from 'ng-starrating';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-service-provider-list',
  templateUrl: 'service-provider-list.component.html',
  styleUrls: ['service-provider-list.component.css'],
})
export class ServiceProviderListComponent implements OnInit {
  @Input() provList: any;

  providersList: any;
  data: any;
  url: string = '';
  baseUrl: any;
  type: any;
  id:any;
  filteredData:any;
  category:any;
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  ProviderList:any;
  category_id:any;
  Latitute:any;
  Longitude:any;
  distance:any;
  origina_serachId:any
  constructor(
    private route: ActivatedRoute,
    public service: WebserviceService,
    public router: Router,
    public dialog: MatDialog,
    private toastr : ToastrService
  ) {
  //  console.log(this.router.getCurrentNavigation());
    // this.route.queryParams.subscribe((params) => {
    //   if (this.router.getCurrentNavigation()!.extras.state) {
    //     this.data = this.router.getCurrentNavigation()!.extras.state!.data;
    //     console.log('this.data: ', this.data);
    //     this.type = this.router.getCurrentNavigation()!.extras.state!.type;
    //     this.id = router.getCurrentNavigation()!.extras.state!.id;
    //   }
    // });
    this.route.queryParams.subscribe((params) => {
     
      this.category_id = params.id,
      this.origina_serachId = params.id,
      this.Latitute = params.Latitude,
      this.Longitude = params.Longitude
      console.log('pass data', this.Latitute)
    })

    this.service.getObservableSerach().subscribe((resp:any) => {
      console.log(resp)
      //this.profile_image = resp['Profile_image']
      if(resp.type=='distance'){
        this.distance= resp.serach_data;
        this.get_provider();
      }
      if(resp.type=='category'){
        this.category_id= resp.serach_data;
        this.get_provider();
      }
      if(resp.type=='clear'){
        this.category_id= this.origina_serachId;
        this.get_provider();
      }
    })

    
  }

  ngOnInit(): void {
    this.get_provider();
    //console.log('this.type: ', this.type);

    // if (this.type === 'none') {
    //   console.log('category service prov');
    // } else if (this.type === 'level 0') {
    //   console.log('subcategory service prov level 0');
    //   this.getProviders(this.data);
    // } else if (this.type === 'level 1') {
    //   console.log('subcategory service prov level 1 ');
    //   this.service
    //     .getTrainingProviders(this.data._id)
    //     .subscribe((resp: any) => {
    //       console.log(resp);
    //       this.providersList = resp.data.providerList;
    //     });
    // } else if (this.type === 'level 2') {
    //   console.log('subcategory service prov level 2 ');
    //   this.service.SubjectProviders(this.data._id).subscribe((resp: any) => {
    //     console.log(resp);
    //     this.providersList = resp.data.providerList;
    //   });
    // } else {
    //   console.log('ye mai kaha aa gaya');
  //this.serviceList();
  }

  

  gotoDetails(id:any){
    this.router.navigate(['/service-details'],{ queryParams: {id: id} })
  }

  getNumber(num:any) {
    console.log(num)
    return new Array(num);   
    
}

   serviceList(){
    if(this.data[0])
   {
    let serviceData = {
      allcategory:this.data[0]._id,
      higherPrice: 10
    }
    this.service.allcategory = this.data[0]._id
    console.log('data1',serviceData)
    this.service.getServiceList(serviceData).subscribe((data: any) => {
     //this.providersList = data.data;
     
     this.service.FilteredData = data.data;
     console.log('initial provider list ', data.data);
   });
   }
   else {
  let serviceData = {
    allcategory:this.data._id,
    higherPrice: 10
  }
  this.service.allcategory = this.data._id;
  console.log('data1',serviceData)
  this.service.getServiceList(serviceData).subscribe((data: any) => {
   //this.providersList = data.data;
   
   this.service.FilteredData = data.data;
   console.log('initial provider list ', data.data);
  });
  }
}

  
  checkValue(){
    let newValue = this.service.FilteredData;
    let temp = newValue;
    newValue = this.filteredData;
    this.filteredData = temp;
  }

  getProviders(data: any) {
   // let latlng = localStorage.getItem('userData')!;

    //let d = JSON.parse(latlng).UserLocation;
    //console.log('data: ', data);
    if(data[0]){
      if(data[0].subTwo_category_id){
        //this.service.allcategory = data[0].subTwo_category_id;
        this.category = data[0].subTwo_category_id;
      }
      else if(data[0].subOne_category_id){
        //this.service.allcategory = data[0].subOne_category_id;
        this.category = data[0].subOne_category_id;
      }
      else if(data[0].sub_category_id){
        //this.service.allcategory = data[0].sub_category_id;
        this.category = data[0].sub_category_id;
      }else if(data[0].category_id){
       // this.service.allcategory = data[0].category_id;
        this.category = data[0].category_id;
      }
    }
      if(data){
        if(data.subTwo_category_id){
          //this.service.allcategory = data.subTwo_category_id;
          this.category = data.subTwo_category_id;
        }
        else if(data.subOne_category_id){
         // this.service.allcategory = data.subOne_category_id;
          this.category = data.subOne_category_id;
        }
        else if(data.sub_category_id){
          //this.service.allcategory = data.sub_category_id;
          this.category = data.sub_category_id;
        }else if(data.category_id){
          //this.service.allcategory = data.category_id;
          //this.service.allcategory = data.category_id;
        }
      }
    
    // console.log(latlng)
    // console.log(d)
    if(data[0]){
      let queryParams1 = {
        //category_id: this.category,
        //sub_category_id: data[0]._id,
       // Latitude: d.Latitude,
       // Longitude: d.Longitude,
       allcategory:this.category._id,
        lowerPrice: data[0].lowerPrice,
        minAge: data[0].minAge,
        maxAge: data[0].maxAge,
      };
      console.log('queryparam1',queryParams1);
      this.service.getServiceList(queryParams1).subscribe((data: any) => {
        this.providersList = data.data;
        //console.log('providersList: ', data.data);
      });
    }
    if(data.category_id){
      let queryParams2 = {
        //category_id: this.category,
        //sub_category_id: data._id,
       // Latitude: d.Latitude,
       // Longitude: d.Longitude,
       allcategory:this.category,
        lowerPrice: data.lowerPrice,
        minAge: data.minAge,
        maxAge: data.maxAge,
      };
      console.log('queryparam2',queryParams2);
      this.service.getServiceList(queryParams2).subscribe((data: any) => {
        this.providersList = data.data;
       // console.log('providersList: ', data.data);
      });
    }
  else{
console.log('no category id')
  }
  }

 

  goToPostANeed(id: any) {
    // let nav: NavigationExtras = {
    //   state: {
    //     ...this.data,
    //     ...d,
    //     subcat_id: this.data._id,
    //     provider_id: d._id,
    //   },
    // };
    // this.router.navigate(['post-a-need'], nav);
    this.router.navigate(['/provider-service-list'],{ queryParams: {id: id} })
  }

  showEducationProviders() {
    throw new Error('Method not implemented.');
  }

  getDetails(data: any): void {
    const dialogRef = this.dialog.open(ServiceDetailsComponent, {
      // width: '250px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onValueChanged(ev: any) {
    console.log('from prov list: ', ev);
    this.data.lowerPrice = ev.price;
    this.data.minAge = ev.minAge;
    this.data.maxAge = ev.maxAge;
    console.log('data: ', this.data);

    this.getProviders(this.data);
  }


  get_provider(){
    let data={
      'category_id': this.category_id,
      'Latitute': this.Latitute,
      'Longitude': this.Longitude,
      'distance':this.distance
    }
   this.service.getAllProvidersList(data).subscribe((response:any)=>{
     console.log('location provider',response)
     if(response['count']==0){
      this.providersList =response['data'];
      this.toastr.warning('No Service provider found.');
     }else{
      this.providersList = response['data']
     }
     
   })
  }
}
