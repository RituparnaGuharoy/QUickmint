import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css'],
})
export class ProviderEditComponent implements OnInit {
  newServiceForm: any;
  categorylisting: any;
  subcategorylisting: any;
  subcategoryonelisting: any;
  subcategorytwolisting: any;
  showSubCat: boolean;
  newServiceFormSubmitted: boolean;

  image:any;
  imageLink:any;
  title:any;
  description:any;
  category_id:any;
  sub_category_id:any;
  sub_category_one_id:any;
  sub_category_two_id:any;
  job_start:any;
  job_end:any;
  Price:any;
  Id:string;
  servicedetails:any;
  baseurl:any;
  subcatone = false;
  subcattwo = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    public activeRoute: ActivatedRoute,

  ) {
    this.activeRoute.params.subscribe((param)=>{
      // edit-ad/:adId
       this.Id = param.serviceId;
     });
     this.baseurl = 'https://nodeserver.mydevfactory.com:4290/'
  }

  ngOnInit(): void {
    this.getServiceDetails();
  }
  
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageLink = event.target.files[0];
    }
  }

  getCategory() {
    this.service.categorylisting().subscribe(
      (data) => {
        console.log(data);
        this.categorylisting = (<any>data)['data'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSubcategory() {
    //console.log(this.newServiceForm.value.category_id);
    this.service
      .subcategorylisting(this.category_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.subcategorylisting = (<any>data)['data'];
          data.count === 0
            ? (this.showSubCat = false)
            : (this.showSubCat = true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSubCatOne() {
    this.service
      .getsubcategorylistingOne(this.sub_category_id)
      .subscribe(
        (data: any) => {
          console.log('getSubCatOne: ', data);
          this.subcategoryonelisting = (<any>data)['data'];
          data.count === 0 ? (this.subcatone = false) : (this.subcatone = true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSubCatTwo(s: any) {
    this.service
      .getsubcategorylistingTwo(this.sub_category_one_id)
      .subscribe(
        (data: any) => {
          console.log('getSubCatTwo: ', data);
          this.subcategorytwolisting = (<any>data)['data'];
          data.count === 0 ? (this.subcattwo = false) : (this.subcattwo = true);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getServiceDetails(){
this.service.getServiceDetails(this.Id).subscribe(
  (data: any) => {
    console.log('getdetails: ', data);
    this.servicedetails = data.data;
    this.title = data.data.title;
    this.description = data.data.description;
    this.job_start = data.data.job_start;
    this.job_end = data.data.job_end;
    this.Price = data.data.Price;
   // this.category_id.value= data.data.category_id;
    //this.sub_category_one_id = data.data.subOne_category_id;
    this.sub_category_two_id = data.data.subTwo_category_id;
  },
  (err) => {
    console.log(err);
  }
);
  }


  onSubmit() {

    let user_id :any = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append("provider_id",user_id);
    formData.append("category_id", this.category_id);
    formData.append("sub_category_id",this.sub_category_id);
    formData.append("subOne_category_id",this.sub_category_one_id );
    formData.append("subTwo_category_id",this.sub_category_two_id );
    formData.append("Price",this.Price);
    formData.append("title", this.title);
    formData.append("description",this.description);
    formData.append("job_start", this.job_start);
    formData.append("job_end", this.job_end);
    formData.append("images",this.imageLink);
    //formData.append("title",this.rating);

    let data = {
    provider_id:user_id,
    category_id: this.category_id,
    sub_category_id:this.sub_category_id,
    subOne_category_id:this.sub_category_one_id,
    subTwo_category_id:this.sub_category_two_id,
    Price:this.Price,
    title: this.title,
    description:this.description,
    job_start: this.job_start,
    job_end: this.job_end,
    //formData.append("images",this.imageLink);
    }


    this.service.editService(data,this.Id).subscribe(
      (data) => {
        console.log('publicjob: ', data);
        this.toastr.success((<any>data)['message']);
        this.newServiceFormSubmitted = false;
        this.router.navigate(['/service-list']);
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
