import { Component, EventEmitter, OnInit, Output,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { CommonService } from '../common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean = false;
  userType :any;
  
  @Output() ev: EventEmitter<any>;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private route :ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

      console.log('class id',this.data);
     

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, { width: '950px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }
  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '950px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }
  userForm: any;
  userFormSubmitted: boolean = false;

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      UserEmail: ['', [Validators.required, Validators.email]],
      UserPassword: ['', [Validators.required]],
      UserType: [''],
    });
  }

  get f() {
    return this.userForm.controls;
  }
 
  signInWithFB() {}
  signInWithGoogle() {}
  signInWithApple() {}

  onSubmit(){
    console.log('hi',this.userForm)
    if (!this.userForm.valid) {
      this.userFormSubmitted = true;
      this.toastr.warning('Please fill all required data');
      //return;
    }
    else if (this.userForm.value.UserType === '' || this.userForm.value.UserType == null){
      this.userFormSubmitted = true;
      this.toastr.warning('Please Choose user type');
      //return;
    }
    else{
      this.service.loginUser(this.userForm.value, this.userForm.value.UserType).subscribe((data)=>{
        console.log(data);
          if ((<any>data)['success'] == false) {
            this.toastr.warning((<any>data)['message']);
          }

          if ((<any>data)['status'] == true) {
            console.log('test');
            this.toastr.success('Login Successful');
            //this.userFormSubmitted = false;
            // this.userForm.reset();
            localStorage.setItem(
              'access-token-quickmint',
              (<any>data)['token']
            );
            localStorage.setItem('stripeCustomeToken',(<any>data)['data']['stripe']['customer_token']);
            localStorage.setItem('userType', this.userForm.value.UserType);
            localStorage.setItem('userId', (<any>data)['data']['_id']);
            localStorage.setItem(
              'UserFullName',
              (<any>data)['data']['UserFullName']
            );
            this.userType =this.userForm.value.UserType;

            this.service.saveLocalData('loginData', this.userForm.value);
            this.service.saveLocalData('userData', (<any>data)['data']);
            this.service.isLoggedIn = true;
            
            
          // this.commonService.publishSomeData('login');
          //   this.service.publishSomeData({
          //     token: (<any>data)['token'],
          //     userType: (<any>data)['data'].UserType
          // });
            this.dialog.closeAll();
          
             if(this.data !=null){
              this.commonService.publishSomeData('login');
              this.service.publishSomeData({
                token: (<any>data)['token'],
                userType: (<any>data)['data'].UserType,
                route:true
            });
              if((<any>data)['data'].UserType =='2'){
                this.router.navigate(['/class-details'],{queryParams : {classId: this.data.classId}});
              }
              
             }else{
              this.commonService.publishSomeData('login');
              this.service.publishSomeData({
                token: (<any>data)['token'],
                userType: (<any>data)['data'].UserType
            });
              if((<any>data)['data'].UserType =='1')
              {
               this.router.navigate(['/provider-dashboard']);
             }
             else if((<any>data)['data'].UserType =='2') {
               this.router.navigate(['/home']);
             }
             }
           
          

          }
          else if ((<any>data)['status'] == false) {
            this.toastr.warning((<any>data)['message']);
          }



      })
    }
  }

  onSubmitE(){
    console.log('hi',this.userForm)
  }

}


