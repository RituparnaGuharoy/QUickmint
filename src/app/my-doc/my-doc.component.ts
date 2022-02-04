import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

// import * as _ from 'lodash';
@Component({
  selector: 'app-my-doc',
  templateUrl: './my-doc.component.html',
  styleUrls: ['./my-doc.component.css']
})
export class MyDocComponent implements OnInit {
  DocumentImages:any=[];
  baseurl:any;
  imageType:boolean;
  Docphoto:any;
  photo_type:any;
  fileName: any;
  constructor(
    private service: WebserviceService,
    private domSanitizer: DomSanitizer,
    
    private toastr: ToastrService,
  ) {
    this.baseurl = 'https://nodeserver.mydevfactory.com:4290/';
   }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getuserDetails()
  }

  getuserDetails(){
    this.DocumentImages=[]
    this.service.getworkerdetails().subscribe((resp: any) => {
      //this.DocumentImages = resp.data.provider.provider_documents;
      for(var i =0; i<resp.data.provider.provider_documents.length;i++){
        var fileextension=resp.data.provider.provider_documents[i].file_path.split('.').pop()
        
        if(fileextension =='png'||fileextension =='PNG'||fileextension =='jpeg'||fileextension =='JPEG'||fileextension=='jpg'){
          this.imageType=false
          console.log(this.imageType)
          this.DocumentImages.push({
            'file_name': resp.data.provider.provider_documents[i].file_name,
            'file_path': resp.data.provider.provider_documents[i].file_path,
            '_id':resp.data.provider.provider_documents[i]._id,
            'imageType':this.imageType
          })
        }else{
          this.imageType=true
          this.DocumentImages.push({
            'file_name': resp.data.provider.provider_documents[i].file_name,
            'file_path': this.domSanitizer.bypassSecurityTrustResourceUrl(this.baseurl+resp.data.provider.provider_documents[i].file_path),
            '_id':resp.data.provider.provider_documents[i]._id,
            'imageType':this.imageType
          })
          console.log(this.imageType)
        }
      }
      console.log(this.DocumentImages)
    })
  }


  onDocumentFileSelected(event: any) {
    

    var files = event.target.files;
    var mimeType = files[0].type;
    console.log('Before' + event.target.files);
    // if (mimeType.match(/image\/*/) == null) {
    //   // console.log(mimeType);

    //   this.toastr.warning('Only images are supported.');

    //   return;
    // }

    if (event.target.files.length > 0) {
      // console.log(event.target.files[0].name);
    }
    if (files.length === 0) return;
    // console.log(mimeType);
    if (event.target.files && event.target.files[0]) {
      this.Docphoto = event.target.files[0];
      // console.log(this.UserPhoto);
      const reader = new FileReader();
      // reader.onload = e => this.selectedUserPhoto = reader.result.toString();
      this.fileName = event.target.files[0].name;
      //reader.readAsDataURL(this.UserPhoto);
      // console.log('After' + this.UserPhoto);
      reader.onload = (ev: any) => {
        //this.galleryImages.push(ev.target.result);
      };
      console.log(this.photo_type)
      if(this.photo_type ==undefined|| this.photo_type ==''|| this.photo_type ==null){
        this.toastr.show('Please add doc name');
      
      }else{
        this.service.documentupload(this.Docphoto,this.photo_type).subscribe(
          (data) => {
            console.log(data);
            
            this.getuserDetails();
            
            if((<any>data)['status']){
              this.photo_type = '';
              this.toastr.success((<any>data)['message']);
            }else{
              this.toastr.show((<any>data)['message']);
            }
            
          },
          (err) => {
       
          }
        );
      }
      
      
    }
  }

  deleteicon(id:any){
    
    console.log(id)
    let data={
      'documenid':id
    }
    this.service.detletedoc(data).subscribe(
      (data) => {
        console.log(data);
        if((<any>data)['success']){
          this.toastr.success('Delete document successfully');
          this.getuserDetails()
        }
      })
  }

}
