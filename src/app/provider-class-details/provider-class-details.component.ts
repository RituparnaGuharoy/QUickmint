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
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
declare var $: any;

@Component({
  selector: 'app-provider-class-details',
  templateUrl: './provider-class-details.component.html',
  styleUrls: ['./provider-class-details.component.css']
})
export class ProviderClassDetailsComponent implements OnInit {
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string = url;
  ProviderId:string;
  providerData:any;
  providerGallery:any;
  following:boolean = true;
  liking:boolean = true;
  like1:any;
  follow1:any;
  averageRating:number;
  page:string;
  otherClass:any;
  classReceived:any;
  classId:string;
  ask_list:any;
 classDetails:any={};
  category_classlist:any=[];
  no_class:boolean
  provider_details:any={};
  choosePrice:any;
  question_list_length:any;
  ratingList:any;
  schedule_date:any=[]
  constructor(
    public dialog: MatDialog,
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => { 
      // this.classDetails= this.router.getCurrentNavigation()!.extras.state!.data;
      // console.log('this.classDetails: ', this.classDetails);
      console.log('class id',params.classId);
      this.classId = params.classId;
  });
    //console.log('class list in service',this.service.classesList);
    // this.classReceived = this.service.classesList.filter((data:any)=>{
    //   return data._id == this.classId;
    // })
    // console.log('classReceived',this.classReceived);
    this.getclassDeails();
    this.qusklist();
    this.ratinglist();
    //this.classDetails = {...this.classReceived};
    // this.classDetails = this.classReceived[0];
    // console.log('classDetails',this.classDetails);

    $("#s1").click(function() {
      $('html, body').animate({
          scrollTop: $("#about").offset().top-170
        }, 1000);
    return false;
    });
  
    $("#s2").click(function() {
        $('html, body').animate({
            scrollTop: $("#schedule").offset().top-170
        }, 1000);
    return false;
    });
  
    $("#s3").click(function() {
        $('html, body').animate({
            scrollTop: $("#reviews").offset().top-170
        }, 1000);
    return false;
    });
    $("#s4").click(function() {
        $('html, body').animate({
            scrollTop: $("#provider").offset().top-170
        }, 1000);
    return false;
    });
    $(document).ready(function() {
      var $window = $(window);  
      var $sidebar = $(".cd-sidebar-right"); 
      var $sidebarHeight = $sidebar.innerHeight();   
      var $footerOffsetTop = $(".footer").offset().top; 
      var $sidebarOffset = $sidebar.offset();
      
      $window.scroll(function() {
          if($window.scrollTop() > 176) {
          $sidebar.addClass("fixed");   
          $('.cd-navbar-top').addClass('fixed-header');
          } else {
          $sidebar.removeClass("fixed");  
          $('.cd-navbar-top').removeClass('fixed-header'); 
          }    
          // if($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
          // $sidebar.css({"top" : -($window.scrollTop() + $sidebarHeight - $footerOffsetTop)});        
          // } else {
          // $sidebar.css({"top": "0",});  
          // }    
      });   

      
      });
  }
  getclassDeails(){
    
    var dates:any =[];
    this.service.getClassDetail_provider(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.classDetails= response.data;
        this.provider_details = response.data.provider_id;
        console.log(this.classDetails);
        for(var i=0; i<response.data.select_day.length;i++){
          dates.push(response.data.select_day[i].day)
        }
        console.log(dates)
        this.schedule_date = dates.filter((c:any, index:any) => {
          return dates.indexOf(c) === index;
      });
      console.log(this.schedule_date)
        //
        //this.categorywise_class(response.data.class_category._id,response.data.provider_id._id);
      }
      
    })
  }

  qusklist(){
    this.service.ask_question_list_provider(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.ask_list= response.data.question_answer;
        console.log(this.ask_list)
        //this.question_list_length = response.data.length;
      //   this.question_list_length = response.data.length;
      //   for(var i= 0; response.data.length>i;i++){
      //     this.ask_list = response.data[i].question_answer;
        
      //   }
        
      }
      
    })
  }

  ratinglist(){
    this.service.class_rating_list_provider(this.classId).subscribe((response:any)=>{
     if(response['success']){
      this.ratingList = response['data']
     }
    })
  }
}
