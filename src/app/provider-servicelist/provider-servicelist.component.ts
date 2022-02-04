import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
@Component({
  selector: 'app-provider-servicelist',
  templateUrl: './provider-servicelist.component.html',
  styleUrls: ['./provider-servicelist.component.css']
})
export class ProviderServicelistComponent implements OnInit {
  ProviderId:any;
  page=1
  limit=100
  serviceList:any;
  photourl:any
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) {
    this.route.queryParams.subscribe((params) => { 
      this.ProviderId = params.id;
  });
  this.photourl = 'https://nodeserver.mydevfactory.com:4290/'
   }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.servicelist()
  }


  servicelist(){
    this.service.get_prover_servicelist(this.ProviderId,this.page,this.limit).subscribe((response:any)=>{
      console.log(response)
      this.serviceList = response.data;
    })
  }

  checkavilabity(id:any){
    //()
    this.router.navigate(['/avilibity-calender'],{ queryParams: {id: id,provider: this.ProviderId} })
  }

}
