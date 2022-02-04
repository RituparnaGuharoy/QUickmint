import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormsModule, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-provider-feedback-list',
  templateUrl: './provider-feedback-list.component.html',
  styleUrls: ['./provider-feedback-list.component.css']
})
export class ProviderFeedbackListComponent implements OnInit {
  serviceList:any;
  question:string;
  answer:string;
  showFAQ = false;
  Feedbacklist:any;
  
  constructor( private router: Router, 
    private service: WebserviceService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { }

  ngOnInit(): void {
   this.getFeedbackList();
  }


  getFeedbackList(){
    this.service.getfeedbackList().subscribe((resp:any)=>{
      this.Feedbacklist=resp.data;
    })
  }

}
