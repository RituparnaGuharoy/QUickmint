import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RateProviderComponent } from '../rate-provider/rate-provider.component';

import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { CommonService } from 'src/app/common.service';
import { AppRoutingModule } from '../app-routing.module';
import { ViewImageComponent } from '../view-Image/view-Image.component';
import { ViewClassComponent } from '../view-Class/view-Class.component';
import { CallPopupComponent } from '../call-popup/call-popup.component'
import { LoginComponent } from '../login/login.component';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  photoUrl:string = url;
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  ProviderId:string;
  providerData:any;
  providerGallery:any;
  following:boolean = true;
  liking:boolean = true;
  like1:any;
  follow1:any;
  averageRating:number;
  page =1;
  limit=5;
  otherClass:any;
  class_list:any;
  token: any = localStorage.getItem('access-token-quickmint');
  question_list:any;
  rating_list:any;
  rating_list_length:any;
  question_list_length:any;
  count=0;
  constructor(
    public dialog: MatDialog,
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private toastr : ToastrService
  ) { 
    this.route.queryParams.subscribe((params) => { 
        this.ProviderId = params.id;
    });
  }

  ngOnInit(): void {
    this.service.provider_Id = this.ProviderId;  
    this.viewDetails();
    // this.checkFollowing();
    // this.checkLiking();
  }

  SlideOptions = { items: 3, dots: false, nav: true, margin:15 };  

  checkFollowing(){
    this.service.checkFollowing(this.ProviderId).subscribe((data:any)=>{
      console.log('check follow data',data);
      if(data.data.follow == true){
        this.following = false;
      }
    })
  }
  goToPostANeed() {

    // this.router.navigate(['/provider-service-list'],{ queryParams: {id: this.ProviderId} })
    
    this.router.navigate(['/provider_class_list'],{ queryParams: {id: this.ProviderId} })
  }
  

  checkLiking(){
    this.service.checkLiking(this.ProviderId).subscribe((data:any)=>{
      console.log('check like data',data);
      if(data.data.like==true){
        this.liking = false;
      }
    })
  }

  viewDetails(){
    this.service.viewDetails(this.ProviderId).subscribe((data:any)=>{
      console.log('details data', data);
      this.providerData = data;
      this.providerGallery = data.providerdetails.gallery;
      this.like1= this.providerData.like;
      this.follow1 = this.providerData.follow;
      this.averageRating = this.providerData.providerdetails.averageRating;
      this.service.galleryPhoto = this.providerGallery;
      //this.page = this.providerData.providerdetails.credentials;
      this.otherClass = this.providerData.otheclass;
      this.service.serviceList = this.otherClass;
      console.log('average rating',this.averageRating);
      this.get_classlist();
      this.allquestionlist();
      this.allrevies();
    })
  }

  follow(){
    let data={
      provider_id : this.ProviderId,
      follow:'true'
    }
    this.following = false;
    this.service.follow(data).subscribe((data:any)=>{
      console.log('follow back data',data);
    })
    var that = this;
    setTimeout(function(){
      that.viewDetails();
    },500);
  }
  unfollow(){
    let data={
      provider_id : this.ProviderId,
      follow:'false'
    }
    this.following = true;
    this.service.follow(data).subscribe((data:any)=>{
      console.log('follow back data',data);
    })
    var that = this;
    setTimeout(function(){
      that.viewDetails();
    },500);
  }

  like(){
    let data={
      provider_id : this.ProviderId,
      like:'true'
      }
      this.liking=false;
    this.service.like(data).subscribe((data:any)=>{
      console.log('like list',data);
    })
    var that = this;
    setTimeout(function(){
      that.viewDetails();
    },500);
  }
  unlike(){
    let data={
      provider_id : this.ProviderId,
      like:'false'
      }
    this.liking=true;
    this.service.like(data).subscribe((data:any)=>{
      console.log('like list',data);
    })
    //this.checkLiking();
    var that = this;
    setTimeout(function(){
      that.viewDetails();
    },500);
  }

  RateService(data: any): void {
    const dialogRef = this.dialog.open(RateProviderComponent, {
      // width: '250px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ViewImage(): void {
    const dialogRef = this.dialog.open(ViewImageComponent, {
      // width: '250px',
      data: this.providerGallery,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ViewClasses(): void {
    const dialogRef = this.dialog.open(ViewClassComponent, {
      // width: '250px',
      data: this.otherClass
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  get_classlist(){
    this.service.get_prover_classlist(this.ProviderId,this.page,this.limit).subscribe((data:any)=>{
      console.log('details data', data);
      this.class_list = data['data'];
      this.count = data['count'];
    })
  }
  paginationChange(event:any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.get_classlist()
   // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
  }

  bookclss(c: any){
    if(c.crash_course=='SEMESTER'){
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: c._id,Price: c.class_fees}})

    }else{
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: c._id,Price: c.class_fees}})
    }
    
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }


  allquestionlist(){
    console.log(this.page)
    this.service.all_askquestion(this.ProviderId,this.page,this.limit).subscribe((response:any)=>{
      console.log(response)
      if(response['success']){
        //this.question_list = response.data;
        this.question_list_length = response.data.length;
        for(var i= 0; response.data.length>i;i++){
          this.question_list = response.data[i].question_answer;
        // this.question_list_length = response.data.length;
        }
        
      }

    })
  }


  allrevies(){
    console.log(this.page)
    this.service.rating_list_user(this.ProviderId,this.page,this.limit).subscribe((response:any)=>{
      console.log(response)
      if(response['success']){
        this.rating_list = response.data;
        this.rating_list_length = response.data.length;
      }

    })
  }


  callback(): void {
    const dialogRef = this.dialog.open(CallPopupComponent, {
      width: '620px',
      data: {
        providerid: this.ProviderId
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
