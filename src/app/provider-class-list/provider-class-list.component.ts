import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-provider-class-list',
  templateUrl: './provider-class-list.component.html',
  styleUrls: ['./provider-class-list.component.css']
})
export class ProviderClassListComponent implements OnInit {
  ProviderId:any;
  page=1
  limit=100
  classList:any;
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
  //this.photourl = 'https://nodeserver.mydevfactory.com:4290/';
  this.photourl = url;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.classlist()
  }


  classlist(){
    this.service.get_prover_classlist(this.ProviderId,this.page,this.limit).subscribe((response:any)=>{
      console.log(response)
      this.classList = response.data;
    })
  }

  gotoClassDetails(c: any){
    this.router.navigate(['/class-details'],{queryParams : {classId: c._id}});
  }
  bookclss(c: any){
    this.router.navigate(['/user-select-class/'],{queryParams : {classId: c._id}})
  }

}
