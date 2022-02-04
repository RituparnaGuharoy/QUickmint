import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {


  serviceList:any;

  constructor( private router: Router, private service: WebserviceService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
   this.getList();
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

  editService(ServiceId:any){
    this.router.navigate(['/service-edit-view'])
    this.router.navigate(['/service-list/provider-edit'+'/'+ServiceId]);
  }

  deleteService(ServiceId:any){
    this.service.deleteService(ServiceId).subscribe((data:any)=>{
      console.log('deleted',data);
    },
    (err)=>{
      console.log('error',err);
    });
   this.ngOnInit();
  }

  tabClick(tab:any) {
    console.log(tab);
  }

}
