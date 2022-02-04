import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {
  Location,
  Appearance,
  GermanAddress,
} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;
  userForm: any;
  userFormSubmitted: boolean = false;
  public latitude: number;
  public longitude: number;
  public address: any;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }

  constructor(private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,

    // public translate: TranslateService
  ) {

  }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      UserFullName: [
        "",
        [Validators.required, Validators.pattern("^[A-Za-z ]+$")],
      ],
      // UserName: [
      //   "",
      //   [Validators.required, Validators.pattern("^[A-Za-z]+$")],
      // ],
      UserPhone: [
        "",
        //[Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)],
        [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/im)],
      ],
      UserEmail: ["", [Validators.required, Validators.email]],
      UserPassword: ["", [Validators.required]],
      UserConfirmPassword: ["", [Validators.required]],
      UserType: ["2"],
      City:["",[Validators.required]]
    });
  }
  // "{
  //   UserFullName:String
  //   UserName:String
  //   UserType:String(2==customer)
  //   UserEmail:String,
  //   UserPhone:Number
  //   UserPassword:String
  //   }"
  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    console.log(this.userForm)
    if (!this.userForm.valid) {
      this.userFormSubmitted = true;
      this.toastr.warning("Please fill all required data");
      return;
    }
    if (this.userForm.value.UserPassword != this.userForm.value.UserConfirmPassword) {
      this.toastr.warning("Password and confirm password must be matched");
      return;
    }
    if (this.userForm.value.UserType == "2") {
      console.log("User")
      let register = {
        UserFullName : this.userForm.controls.UserFullName.value,
       // UserName : this.userForm.controls.UserName.value,
        UserType : this.userForm.controls.UserType.value,
        UserEmail : this.userForm.controls.UserEmail.value,
        UserPhone : this.userForm.controls.UserPhone.value,
        UserPassword: this.userForm.controls.UserPassword.value, 
        Latitude: this.latitude,
        Longitude: this.longitude,
        Address: this.address
      }
      this.service.registerUser(register).subscribe(
        (data:any) => {
          console.log(data);
          this.toastr.success((<any>data)["message"]);
          this.userFormSubmitted = false;

          if (data.success) {
            this.dialog.closeAll();
            this.userForm.reset();
            this.openLoginDialog()
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else {
      // this.dialog.closeAll();
      console.log("provider")

      let register = {
        UserFullName : this.userForm.controls.UserFullName.value,
       // UserName : this.userForm.controls.UserName.value,
        UserType : this.userForm.controls.UserType.value,
        UserEmail : this.userForm.controls.UserEmail.value,
        UserPhone : this.userForm.controls.UserPhone.value,
        UserPassword: this.userForm.controls.UserPassword.value, 
        Latitude: this.latitude,
        Longitude: this.longitude,
        Address: this.address
      }

      this.service.registerProvider(register).subscribe(
        (data:any) => {
          console.log(data);
          this.toastr.success((<any>data)["message"]);
          this.userFormSubmitted = false;
          if (data.success) {
            this.dialog.closeAll();
            this.userForm.reset();
            //this.router.navigate(['/login'])
            this.openLoginDialog()
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }


  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, { width: '620px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    // this.latitude = location.latitude;
    // this.longitude = location.longitude;
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  onGermanAddressMapped(event: GermanAddress) {
    console.log('onGermanAddressMapped', event);
    this.address = event.displayAddress;
    console.log('german address',this.address)
}

onChange(event : any){
console.log('event',event.target.value);
}
}
