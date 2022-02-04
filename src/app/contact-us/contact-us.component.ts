import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  first = new FormControl('');
  contactForm = new FormGroup({
    firstname: new FormControl('', Validators.required ),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
})
  

  get f() {
    return this.contactForm.controls;
  }
  

  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
     this.contactForm.setValue({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
       })
  }

  onSubmit() {
    let contactdata = {
      firstname: this.contactForm.controls.firstname.value,
      lastname: this.contactForm.controls.lastname.value,
      email: this.contactForm.controls.email.value,
      phone: this.contactForm.controls.phone.value,
      subject: this.contactForm.controls.subject.value,
      message: this.contactForm.controls.message.value
    }

    this.service.addContact(contactdata).subscribe(
      (data) => {
        this.toastr.success('Your message has been sent');
        this.contactForm.reset();
      
      },
      (err) => {
        this.toastr.success('Your message has not been sent');
      }
    );
  }
}
