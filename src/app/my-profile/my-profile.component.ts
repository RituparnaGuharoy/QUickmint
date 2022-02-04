import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
// import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

// import * as _ from 'lodash';
import { WebserviceService } from '../services/webservice.service';

// import { CustomerService } from '../services/customer.service';
import { environment } from 'src/environments/environment.prod';
var url = environment.api;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  passwordForm: any;
  passwordFormSubmitted: boolean = false;
  photoUrl:string = url;
  userForm: any;
  userFormSubmitted: boolean = false;
  userData: any;


  cardForm: any;
  cardFormSubmitted: boolean = false;
  bankData = [];

  stripeToken: any;
  selectedUserPhoto: any;
  fileName: any;
  UserPhoto: any;
  imageUrl: any;
  // stripeKey = environment.publishableKey;

  constructor(private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router) {

  }

  passwordFormOnSubmit() {
    if (!this.passwordForm.valid) {
      this.passwordFormSubmitted = true;
      // this.presentToast("Please fill all required data");
      this.toastr.warning("Please fill all required data");
      return;
    }
    if (this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword) {
      this.toastr.warning("Password and confirm password must be matched");
      return;
    }
    this.service.changePassword(this.passwordForm.value).subscribe(
      (data) => {
        console.log(data);
        if ((<any>data)["success"] == false) {
          // this.presentToast((<any>data)["message"]);
          this.toastr.warning((<any>data)["message"]);
        }
        else if ((<any>data)["success"] == true) {
          // this.presentToast((<any>data)["message"]);
          this.toastr.success((<any>data)["message"]);
          this.passwordFormSubmitted = false;
          // this.passwordForm.reset();
          // this.router.navigate(['/personalinfo'])
        }

      },
      (err) => {
        console.log(err);
        // this.presentToast(err);
        this.toastr.warning(err);
      }
    );
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      UserType: ["user"]
    });
    this.userForm = this.formBuilder.group({
      UserName: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")],],
      // UserFirstName: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")],],
      UserFullName: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")],],
      UserEmail: ["", [Validators.required, Validators.email]],
      UserPhone: ["", [Validators.required]],
      //user_date_of_birth :[""],
      // UserAddress: ["", [Validators.required]],
      UserType: [2],
    });
    this.service.userOwnDetails().subscribe(
      (data) => {
        console.log(data);
        this.userData = (<any>data)["data"]
        this.imageUrl = (<any>data)["imageUrl"]
        // this.presentToast((<any>data)["message"]);
        this.userForm = this.formBuilder.group({
          UserName: [this.userData.UserName, [Validators.required, Validators.pattern("^[A-Za-z]+$")],],
          UserFullName: [this.userData.UserFullName, [Validators.required, Validators.pattern("^[A-Za-z ]+$")],],
          // UserLastName: [this.userData.UserLastName, [Validators.required, Validators.pattern("^[A-Za-z ]+$")],],
          UserEmail: [this.userData.UserEmail, [Validators.required, Validators.email]],
          UserPhone: [this.userData.UserPhone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          //user_date_of_birth :[this.userData.UserPhone.user_date_of_birth],
          // Address: [this.userData.UserAddress, [Validators.required]],
          UserType: [2],
        });
      },
      (err) => {
        console.log(err);
      }
    );
    // "{
    //   UserFullName:String
    //   UserName:String
    //   UserEmail:String
    //   UserGender:String
    //   UserPhone:Pnone Number
    //   Latitude:Number
    //   Longitude:Number
    //   Address:String
    //   }"
    this.cardForm = this.formBuilder.group({
      accountHolderName: ["", [Validators.required, Validators.pattern("^[A-Za-z]+$")]],
      bankAccountNumber: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      cvv: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      expireDate: ["", [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$")]],
    });
    this.getCardData()
  }

  get f() {
    return this.passwordForm.controls;
  }
  get fp() {
    return this.userForm.controls;
  }
  onFileSelected(event: any) {
    console.log("Before" + this.UserPhoto);

    var files = event.target.files
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log(mimeType);

      this.toastr.warning("Only images are supported.");

      return;
    }
    // if (!_.includes(this.allowed_types, mimeType)) {
    //   this.toastr.warning("Only images and PDF are supported.");
    //   return;
    // }

    if (event.target.files.length > 0) {
      console.log(event.target.files[0].name);
      // document.getElementById("demo").innerHTML = event.target.files[0].name;
    }
    if (files.length === 0)
      return;



    // console.log("Event"+event.target.files[0].name);
    // console.log("File"+files[0].name);
    console.log(mimeType);
    if (event.target.files && event.target.files[0]) {
      this.UserPhoto = event.target.files[0];
      console.log(this.UserPhoto);
      const reader = new FileReader();
      // reader.onload = e => this.selectedUserPhoto = reader.result.toString();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(this.UserPhoto);
      console.log('After' + this.UserPhoto);
      this.service.editDetailsWithImage(this.UserPhoto).subscribe(
        (data) => {
          console.log(data);
          this.imageUrl = "https://nodeserver.mydevfactory.com:4290/" + (<any>data)["data"]["UserPhoto"]
          // this.presentToast((<any>data)["message"]);
          this.toastr.success((<any>data)["message"]);
          // this.userFormSubmitted = false;
          // this.userForm.reset();
          // this.router.navigate(['/login'])
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userFormSubmitted = true;
      // this.presentToast("Please fill all required data");
      this.toastr.warning("Please fill all required data");

      return;
    }
    this.service.editDetails(this.userForm.value).subscribe(
      (data) => {
        console.log(data);
        // this.presentToast((<any>data)["message"]);
        this.toastr.success((<any>data)["message"]);
        this.userFormSubmitted = false;
        // this.userForm.reset();
        // this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err);
      }
    );
  }








  getCardData() {
    this.bankData = []
    // this.service.getMyCardDetails().subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.bankData.push((<any>data)["data"])
    //     // this.presentToast((<any>data)["message"]);

    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }


  get fc() {
    return this.cardForm.controls;
  }


  CardOnSubmit() {
    if (!this.cardForm.valid) {
      this.cardFormSubmitted = true;
      // this.presentToast("Please fill all required data");
      this.toastr.warning("Please fill all required data");

      return;
    }

    this.cardForm.value.month = this.cardForm.value.expireDate.split("/")[0]
    this.cardForm.value.year = this.cardForm.value.expireDate.split("/")[1]
    console.log(this.cardForm.value)
    let card = {
      number: this.cardForm.value.bankAccountNumber,
      expMonth: this.cardForm.value.month,
      expYear: this.cardForm.value.year,
      cvc: this.cardForm.value.cvv,
      name: this.cardForm.value.accountHolderName
    }
    // this.service.createCardToken(card)
    //   .subscribe(token => {
    //     // this.LoadingService.hideLoading();
    //     this.stripeToken = token['data']['id']
    //     //localStorage.setItem('stripe_card_token', this.stripeToken)
    //     console.log(token)
    //     this.saveStripeCardDetails(this.stripeToken)
    //   })




    // this.stripe.setPublishableKey(this.stripeKey)
    // console.log('stripe bank', this.stripeKey)
    // create bank token

    // this.stripe.createCardToken(card)
    //   .then(token => {
    //     // this.LoadingService.hideLoading();
    //     this.stripeToken = token.id
    //     //localStorage.setItem('stripe_card_token', this.stripeToken)
    //     console.log(token)
    //     this.saveStripeCardDetails(token.id)
    //   })
    //   .catch(error =>
    //     console.error(error)

    //   )


  }
  // saveStripeCardDetails(cardToken) {
  //   // //this._utilityService.showLoading();
  //   this.service.saveCardStripe({ 'CardToken': cardToken, 'cardname': this.cardForm.value.accountHolderName }).subscribe((response) => {
  //     console.log('card saved successfully', response)
  //     if (response) {

  //       console.log('card saved successfully', response)
  //       // let alert = { message: response.message, duration: 2000 };
  //       // this.ToasterService.ShowMsg(alert);
  //       // this.presentToast(response["message"]);
  //       this.cardForm.reset()
  //       this.toastr.success(response["message"]);

  //     }
  //     else {
  //       // let alert = { message: response.message, duration: 2000 };
  //       // this.ToasterService.ShowMsg(alert);
  //       // this.presentToast(response["message"]);
  //       this.toastr.success(response["message"]);


  //       // console.log(response.message);

  //     }
  //   })
  // }


}
