import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  pageContent = {} ;
  page:string;
  title:string;
  aboutMe:any=[]
  constructor(
    private service: WebserviceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(){
    window.scrollTo(0, 0)
    this.service.GetCms('about_us').subscribe(
      (data) => {
        console.log('about: ', data);
        this.page = (<any>data)["data"].pageContent;
        this.title = (<any>data)["data"].pageTitle;
       
        this.yaGetBanner((data as any).data.pageContent);
      },
      (err) => {
        console.log(err);
      }
    );
    //this.getuserDetails();
  }

  // tslint:disable-next-line:typedef
  yaGetBanner(pageContent: string)
{
  
  console.log(pageContent);
  const el: any  = document.getElementById("yabanner")
  el.innerHTML = pageContent;
}


getuserDetails(){
  this.service.getworkerdetails().subscribe((resp: any) => {
    this.aboutMe= resp.data.provider.about_me
  })
}

openRegisterDialog(){
  const dialogRef = this.dialog.open(RegisterComponent, { width: '950px' });
  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result`);
  });
}

}
