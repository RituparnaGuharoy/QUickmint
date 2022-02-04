import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RateProviderComponent } from '../rate-provider/rate-provider.component';
import { LoginComponent } from '../login/login.component';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { CommonService } from 'src/app/common.service';
import { AppRoutingModule } from '../app-routing.module';
import { ViewImageComponent } from '../view-Image/view-Image.component';
import { ViewClassComponent } from '../view-Class/view-Class.component';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
declare var $: any;
@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
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
  page:string;
  otherClass:any;
  classReceived:any;
  classId:string;
  token: any = localStorage.getItem('access-token-quickmint');
 classDetails:any={};
  category_classlist:any=[];
  no_class:boolean
  provider_details:any={};
  choosePrice:any;
  choose_type:any;
  ask_list:any;
  ratingList:any;
  schedule_date:any=[];
  classRating:any={};
  ProviderRating:any={};
  constructor(
    public dialog: MatDialog,
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private toastr : ToastrService,
  ) { 
    
  }

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


  qusklist(){
    this.service.ask_question_list(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.ask_list= response.data.question_answer;
        
      }
      
    })
  }
  getNumber(num:any) {
    
    var rates = parseInt(num)
    console.log(rates)
    return new Array(rates);   
    
}

  getclassDeails(){
    var dates:any =[];
    this.service.getClassDetail(this.classId).subscribe((response:any)=>{
      if(response.success){
        this.classDetails= response.data;
        this.classRating = response.data.ratin_avg
        this.provider_details = response.data.provider_id;
        this.ProviderRating = response.data.provider_id.ratin_avg;
        console.log('///////////////////////////////', this.classRating);
        
        this.categorywise_class(response.data.class_category._id,response.data.provider_id._id);
        this.qusklist();
        this.ratinglist();

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

  ClassRatingCount(num:any) {
    
    var rates = parseInt(num)
    console.log(rates)
    return new Array(rates);   
    
}

  categorywise_class(id:any,providerID:any){
    let data={
      'provider_id': providerID,
      'category_id' : id
    }
    this.service.getclasslistbycategory(data).subscribe((response:any)=>{
      if(response.success){
        if(response.count ==0){
          this.category_classlist= response.data;
         
        }else{
          this.category_classlist= response.data;
              this.no_class = false;
          //  for(var i=0; i< response.data.length;i++){
          //   if(response.data[i]._id == this.classId){
          //     this.no_class = true;
          //   }else if(response.data[i]._id != this.classId){
          //     this.category_classlist.push( response.data[i]);
          //     this.no_class = false;
          //     console.log(this.category_classlist)
          //   }
          //  }
        }
      }
      
    })

  }

  gotoDetails(id:any){
    this.router.navigate(['/service-details'],{ queryParams: {id: id} });
  }

  gotoClassDetails(c: any){
    this.router.navigate(['/class-details'],{queryParams : {classId: c._id}});
  }

  bookclss(){

    if(this.token ==null || this.token == undefined){
       this.openLoginDialog();
    }else{
      console.log(this.choosePrice ,this.choose_type)
    if(this.choosePrice ==undefined){
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: this.classId,Price: this.classDetails.class_fees,payment_type: 'TOTALAMOUNT'}});
    }
    // else if(this.choosePrice == 0){
    //   this.toastr.success("No Price added for this mode!Please select another mode.");
    // }
    else{
      this.router.navigate(['/user-select-class/'],{queryParams : {classId: this.classId,Price: this.choosePrice,payment_type: this.choose_type}});
    }
    }
    
    
  }
  fees_check(event:any){
    console.log(event)
    this.choosePrice = event.target.defaultValue.split('_')[0];
    this.choose_type = event.target.defaultValue.split('_')[1];
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }

  askquestion(type:any,id:any){
   // this.router.navigate(['/ask-question/'],{queryParams : {classId: this.classId}});
   const dialogRef = this.dialog.open(AskQuestionComponent, {
      width: '620px',
      data: {
        classId: this.classId,
        type: type,
        id:id

      }
     });
   dialogRef.afterClosed().subscribe((result) => {
     console.log(`Dialog result`,result);
     this.qusklist();
   });
  }

  answerquestion(type:any,id:any){
    const dialogRef = this.dialog.open(AskQuestionComponent, {
      width: '620px',
      data: {
        classId: this.classId,
        type: type,
        id:id

      }
     });
   dialogRef.afterClosed().subscribe((result) => {
     console.log(`Dialog result`,result);
     this.qusklist();
   });
  }


  RateService(data: any): void {
    const dialogRef = this.dialog.open(RateProviderComponent, {
      // width: '250px',
      data: this.classId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ratinglist();
    });
  }

  ratinglist(){
    this.service.class_rating_list_user(this.classId).subscribe((response:any)=>{
     if(response['success']){
      this.ratingList = response['data']
     }
    })
  }
}
