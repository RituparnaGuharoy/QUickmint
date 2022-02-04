import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
@Component({
  selector: 'app-callback-list',
  templateUrl: './callback-list.component.html',
  styleUrls: ['./callback-list.component.css']
})
export class CallbackListComponent implements OnInit {
call_backlist:any;
  constructor(
    public service: WebserviceService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.getcallback_list()
  }

  getcallback_list(){
    this.service.request_list().subscribe((response:any)=>{
      console.log('request list',response)
      if(response['success']){
        if(response['count']==0){

        }else{
          this.call_backlist = response['data']
        }
      }
    })
  }

}
