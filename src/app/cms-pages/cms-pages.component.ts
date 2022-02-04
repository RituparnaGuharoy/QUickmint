import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-cms-pages',
  templateUrl: './cms-pages.component.html',
  styleUrls: ['./cms-pages.component.css']
})
export class CmsPagesComponent implements OnInit {

  pageContent = {} ;
  page: any;
  title: any;
  slug: any = 'term_conditions';

  constructor(private service: WebserviceService,
    public   router : Router,
    private _activatedRoute: ActivatedRoute
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
  }


ngOnInit(): void {
    this.slug = this.service.slugdata;
    console.log('in terms and condition page');
    this.service.GetCms(this.slug).subscribe(
      (data) => {
        this.title = (<any>data)["data"].pageTitle;
        this.yaGetBanner((data as any).data.pageContent);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // tslint:disable-next-line:typedef
  yaGetBanner(pageContent: string)
{
  
  console.log(pageContent);
  const el: any  = document.getElementById("yabanner")
  el.innerHTML = pageContent;
}

}
