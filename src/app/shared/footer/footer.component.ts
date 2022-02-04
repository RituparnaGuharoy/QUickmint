import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../../services/webservice.service';
import { Router ,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  cmslist:any = [];
  informationList:any = [];
  otherLinks:any = [];
  yourAccounts: any = [];
  helpLinks : any = [];
  contactList : any = [];

  address:string;
  phone:string;
  email:string;
  fbUrl:string;
  gmailUrl:string;
  appleUrl:string;
  twitter:string;
  insta:string;


  constructor(
    private service: WebserviceService,
    public router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
    
    this.service.getCmsList().subscribe(
      (data:any) => {
        this.cmslist = data.data;
        this.informationList = data.data.information;
        this.otherLinks = data.data.otherlinks;
        this.yourAccounts = data.data.youraccount;
        this.helpLinks = data.data.helplinks;
      },
      (err) => {
        console.log(err);
      }
    );

    this.service.getAdminContact().subscribe(
      (data:any) => {
        this.contactList = data.data;
        for(let i=0;i<=this.contactList.length;i++){
        if(this.contactList[i]){
        if(this.contactList[i].pageSlug==='address'){
          this.address = this.contactList[i].content;
        }
        else if(this.contactList[i].pageSlug==='phone'){
          this.phone = this.contactList[i].content;
        }
        else if(this.contactList[i].pageSlug==='email'){
          this.email = this.contactList[i].content;
        }
        else if(this.contactList[i].pageSlug==='facebook'){
          this.fbUrl = this.contactList[i].url;
        }
        else if(this.contactList[i].pageSlug==='twitter'){
          this.twitter = this.contactList[i].url;
        }
        else if(this.contactList[i].pageSlug==='instagram'){
          this.insta = this.contactList[i].url;
        }
      }
        
      }
  
    },
      (err) => {
        console.log(err);  
    }
    );
  }

  onClick(data : any){
  console.log('click data',data);
  this.service.slugdata = data;
  this.router.navigated = false;
  this.router.navigate(['/cms-pages']);
  }

}
