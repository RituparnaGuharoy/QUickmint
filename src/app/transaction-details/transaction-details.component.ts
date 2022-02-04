import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transactionid:any;
  Transaction_details:any;
  photourl:any;
  user_type = localStorage.getItem('userType');
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
  ) { 
    this.route.queryParams.subscribe((params) => { 
      this.transactionid = params.transcation;
  });
  // this.photourl = 'https://nodeserver.mydevfactory.com:4290/'
  this.photourl = url
  }

  ngOnInit(): void {

    if(this.user_type =='2'){
      this.get_transaction_details();
    }
    if(this.user_type =='1'){
      this.get_provider_transaction_details();
    }
    
  }


  get_transaction_details(){
    this.service.user_transaction_details(this.transactionid).subscribe((response:any)=>{
      console.log(response)
      this.Transaction_details = response.data;
    })
  }

  get_provider_transaction_details(){
    this.service.provider_transaction_details(this.transactionid).subscribe((response:any)=>{
      console.log(response)
      this.Transaction_details = response.data;
    })
  }

}
