import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../services/webservice.service';
@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.css']
})
export class TermConditionsComponent implements OnInit {
  pageContent = {} ;
  page:string;
  title:string;
  constructor(private service: WebserviceService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    console.log('in privacy-policy page');
    this.service.GetCms('term_conditions').subscribe(
      (data) => {
        console.log('about: ', data);
        this.page = (<any>data)["data"].pageContent;
        this.title = (<any>data)["data"].pageTitle;
        //this.userData = (<any>data)["data"]
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
