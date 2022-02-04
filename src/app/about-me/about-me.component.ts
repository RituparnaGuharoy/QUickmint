import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  aboutMe:any=[]
  constructor(
    private service: WebserviceService
  ) { }

  ngOnInit(): void {
    this.getuserDetails()
  }

  getuserDetails(){
    this.service.getworkerdetails().subscribe((resp: any) => {
      this.aboutMe= resp.data.provider.about_me
    })
  }

}
