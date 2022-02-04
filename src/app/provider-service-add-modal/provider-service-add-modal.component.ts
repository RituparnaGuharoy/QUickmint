import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../services/webservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-provider-service-add-modal',
  templateUrl: './provider-service-add-modal.component.html',
  styleUrls: ['./provider-service-add-modal.component.css']
})
export class ProviderServiceAddModalComponent implements OnInit {
  categoryList:any;
  addcategories:any=[];
  services:any=[]
  constructor(
    public dialog: MatDialog,
    private service: WebserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getservicelist();
    this.getProfileDetails();
  }

  getProfileDetails() {
    this.service.getworkerdetails().subscribe((resp: any) => {
      
      for(var i = 0;i<resp.data.provider.ProvidedService.length;i++){
        this.services.push(resp.data.provider.ProvidedService[i]._id)
        // /console.log(this.services)
      }
    })
  }

  getservicelist(){
    this.service.servicelist().subscribe((response:any)=>{
      console.log(response)
      this.categoryList = response.data
      // this.addcategories.push()
    })
  }

  fieldsChange(event:any,id:any,i:any){
    
    console.log(event.target.checked)
    if (event.target.checked) {
      this.services.push(event.target.value)
      console.log(this.services)
    }else {
      var index = this.services.indexOf(event.target.value); 
      if (index !== -1){
        this.services.splice(index, 1);
        console.log(this.services)
      }
    }
  //   var index =  this.addcategories.indexOf(id);
  // console.log("this.id",id)
  // if(index !== -1){
   
  //   this.addcategories.splice(index,1);
  //   console.log("this.id1",this.addcategories)
  // }else{
  //   this.addcategories.push(id);
  //   console.log("this.id2",this.addcategories)
  // }
  }


  addService(){
    let data={
      'provided_service' : this.services,
    }
    this.service.Addservice_provider(data).subscribe((response:any)=>{
      console.log(response)
      if(response.status){
        this.dialog.closeAll()
      }
    })
  }

  check(tag:any, hobbyArr:any)

  {
    //console.log(tag, hobbyArr)
    if(hobbyArr.indexOf(tag) > -1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  gotoservice(){
    this.dialog.closeAll();
    this.router.navigate(['/provider-add']);
  }

  gotoclass(){
    this.dialog.closeAll();
    this.router.navigate(['/register-class-list']);
  }

  gotoserviceplanner(){
    this.dialog.closeAll();
    this.router.navigate(['/service-planner']);
  }

}
