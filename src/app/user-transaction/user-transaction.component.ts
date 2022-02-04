import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.css']
})
export class UserTransactionComponent implements OnInit {
  ProviderId:any;
  page = 1;
  limit = 5;
  params: any;
  count: Number = 0;
  Transactionlist:any;
  photourl:any
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) { 
    // this.photourl = 'https://nodeserver.mydevfactory.com:4290/'
    this.photourl = url
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.transactionList()
  }

  transactionList(){
    this.service.user_transaction_list(this.page,this.limit).subscribe((response:any)=>{
      console.log(response)
      this.Transactionlist = response.data;
    })
  }


  transactionDetails(t:any){
    this.router.navigate(['/transaction-details'],{queryParams : {transcation: t._id}});
  }

  paginationChange(event:any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.transactionList()
   // this.router.navigate(['/service-list'], { queryParams: { page: this.page, limit: this.limit } });
  }

}
