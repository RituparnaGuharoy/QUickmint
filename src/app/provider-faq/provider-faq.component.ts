import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-provider-faq',
  templateUrl: './provider-faq.component.html',
  styleUrls: ['./provider-faq.component.css'],
})
export class ProviderFaqComponent implements OnInit {
  newServiceForm: any;
  categorylisting: any;
  subcategorylisting: any;
  subcategoryonelisting: any;
  subcategorytwolisting: any;
  showSubCat: boolean;
  newServiceFormSubmitted: boolean;
  page:any=1;
  limit:any=5;
  image:any;
  imageLink:any;
  title:any;
  description:any;
  category_id:any;
  sub_category_id:any;
  sub_category_one_id:any;
  sub_category_two_id:any;
  job_start:any;
  job_end:any;
  Price:any;
  Id:string;
  
  count:any;
  subcatone = false;
  subcattwo = false;
  currenturl:any;
  FaqList:any;
  type:any;
  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    public activeRoute: ActivatedRoute,

  ) {
    this.activeRoute.params.subscribe((param)=>{
      // edit-ad/:adId
       this.Id = param.serviceId;
     });

     this.currenturl = router.url
     console.log(this.currenturl);
     
     
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
   this.getfaq_byurl();
  }

  getfaq_byurl(){
    if(this.currenturl=='/provider-faq'){
      this.getFaq('provider')
      this.type = 'provider'
    }else if(this.currenturl=='/customer-faq'){
      this.getFaq('user')
      this.type = 'user'
    }
  }

getFaq(type:any){
 this.service.faq_list(type,this.page,this.limit).subscribe((response:any)=>{
   if(response.success){
    this.FaqList = response.data;
    this.count = response.count;
   }
 })
}

paginationChange(event:any) {
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.getFaq(this.type)
 // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
}

  
  


}
