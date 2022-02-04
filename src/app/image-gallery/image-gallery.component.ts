import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { CommonService } from 'src/app/common.service';
import { AppRoutingModule } from '../app-routing.module';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
type:any;
galleryImages:any;
galleryVideos:any;
baseurl:any;
UserPhoto: any;
vedios:any;
  fileName: any;
  video_link:any
  constructor(
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private toastr : ToastrService
  ) { 
    this.route.queryParams.subscribe((params) => { 
      this.type = params.type;
  });
  //this.baseurl = 'https://nodeserver.mydevfactory.com:4290/';
  this.baseurl =  url;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    if(this.type== 'photo'){
        this.getProfileDetails();
    }else if(this.type== 'video'){
      this.getProfileDetails_video();
    }
  }


  getProfileDetails() {
    
    this.service.getworkerdetails().subscribe((resp: any) => {
      //console.log('getworkerdetails: ', resp.data.schedule[0].schedule);
       console.log('getworkerdetails: ', resp);
      this.galleryImages = resp.data.provider.gallery;

    });
  }

  getProfileDetails_video() {
    
    this.service.getworkerdetails().subscribe((resp: any) => {
      //console.log('getworkerdetails: ', resp.data.schedule[0].schedule);
       console.log('getworkerdetails: ', resp);
      this.galleryVideos = resp.data.provider.video;

    });
  }

  onFileSelected(event: any) {
    // console.log('Before' + this.UserPhoto);

    var files = event.target.files;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // console.log(mimeType);

      this.toastr.warning('Only images are supported.');

      return;
    }

    if (event.target.files.length > 0) {
      // console.log(event.target.files[0].name);
    }
    if (files.length === 0) return;
    // console.log(mimeType);
    if (event.target.files && event.target.files[0]) {
      this.vedios = event.target.files[0];
      // console.log(this.UserPhoto);
      const reader = new FileReader();
      // reader.onload = e => this.selectedUserPhoto = reader.result.toString();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(this.vedios);
      // console.log('After' + this.UserPhoto);
      reader.onload = (ev: any) => {
        //this.galleryImages.push(ev.target.result);
      };
      this.service.workersgallery(this.vedios).subscribe(
        (data) => {
          this.getProfileDetails();
          this.toastr.success((<any>data)['message']);
          // this.profileDetailsFormSubmitted = false;
          // this.profileDetailsForm.reset();
          // this.router.navigate(['/login'])
        },
        (err) => {
          // console.log(err);
        }
      );
    }
  }

  onFileSelected_vedio(event: any){
    console.log(event)
    var files = event.target.files;
    var mimeType = files[0].type;
    

    if (event.target.files.length > 0) {
      // console.log(event.target.files[0].name);
    }
    if (files.length === 0) return;
    // console.log(mimeType);
    if (event.target.files && event.target.files[0]) {
      this.UserPhoto = event.target.files[0];
      // console.log(this.UserPhoto);
      const reader = new FileReader();
      // reader.onload = e => this.selectedUserPhoto = reader.result.toString();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(this.UserPhoto);
      // console.log('After' + this.UserPhoto);
      reader.onload = (ev: any) => {
        //this.galleryImages.push(ev.target.result);
      };
      this.service.workersgallery_video(this.UserPhoto).subscribe(
        (data) => {
          // console.log(data);
          // this.imageUrl = "https://nodeserver.mydevfactory.com:4290/" + (<any>data)["data"]["UserPhoto"]
          // this.presentToast((<any>data)["message"]);
          // this.galleryImages.push(this.UserPhoto);
          this.toastr.success((<any>data)['message']);
          this.getProfileDetails_video()
          // this.profileDetailsFormSubmitted = false;
          // this.profileDetailsForm.reset();
          // this.router.navigate(['/login'])
        },
        (err) => {
          // console.log(err);
        }
      );
    }
  }

  add_link(){
    let data={
     'video_link':this.video_link
    }
    // this.service.videolink(data).subscribe((response:any)=>{
    //   console.log(response)
    // })
  }

  playVideo(){
    console.log('sjdhjs')
  }

  deleteicon(img:any){
    
    // console.log(id)
    let data={
      'galleryPath':img
    }
    this.service.detlete_gallery(data).subscribe(
      (data) => {
        console.log(data);
        if((<any>data)['success']){
          this.toastr.success('Delete gallery file successfully');
          //this.getuserDetails()
        }
      })
  }

}
