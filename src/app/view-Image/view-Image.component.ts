import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebserviceService } from '../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-view-Image',
  templateUrl: './view-Image.component.html',
  styleUrls: ['./view-Image.component.css']
})
export class ViewImageComponent implements OnInit {

  rating:any;
  review:any;
  //photoUrl:string = 'https://nodeserver.mydevfactory.com:4290/';
  photoUrl:string =url;
  providerGallery:any;

  constructor(
    public dialog: MatDialog,
    public service:WebserviceService,
    public toast:ToastrService,
    public dialogRef: MatDialogRef<ViewImageComponent>
  ) { }

  ngOnInit(): void {
    console.log('service details',this.service.galleryPhoto);
    this.providerGallery = this.service.galleryPhoto;
  }



  provideFeedback(){
    let data={
      rating:this.rating,
      review:this.review,
      reviewTo:this.service.provider_Id
    }
    console.log('feedback data',data);
    this.service.provideFeedback(data).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.success == false){
        this.toast.warning(resp.message);
      }
      else{
        this.toast.success(resp.message);
      }
    })
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
