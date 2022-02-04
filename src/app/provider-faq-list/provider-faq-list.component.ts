import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormsModule, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-provider-faq-list',
  templateUrl: './provider-faq-list.component.html',
  styleUrls: ['./provider-faq-list.component.css']
})
export class ProviderFaqListComponent implements OnInit {
  serviceList:any;
  question:string;
  answer:string;
  showFAQ = false;
  FAQlist:any;
  
  constructor( private router: Router, 
    private service: WebserviceService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { }

  ngOnInit(): void {
   this.getList();
   this.getFaqList();
  }

  addFAQ(){ 
    if(this.showFAQ==true){
    let data ={
      question:this.question,
      answer:this.answer
    }
    if(!this.question){
      this.toast.warning('Please add question');
    }
    else if(!this.answer){
      this.toast.warning('Please add answer');
    }
    else{
      console.log('faq data',data);
        this.service.addFAQs(data).subscribe((resp:any)=>{
            console.log('faq res',resp);
            if(resp.success==true){
              this.toast.success('FAQ has been added');
            }
        })
        this.showFAQ=false;
        this.getFaqList();
    }
  }
  this.showFAQ = true;
  }

  deleteFAQ(id:any){
    this.service.deleteFaq(id).subscribe((resp:any)=>{
     // this.FAQlist=resp.data;
      console.log('FaqList',this.FAQlist);
    })
    this.getFaqList();
  }

  getFaqList(){
    this.service.getfaqList().subscribe((resp:any)=>{
      this.FAQlist=resp.data;
      console.log('FaqList',this.FAQlist);
    })
  }

  getList(){
    this.service
    .Servicelisting()
    .subscribe(
      (data: any) => {
        this.serviceList = data.data;
        console.log('data', this.serviceList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
