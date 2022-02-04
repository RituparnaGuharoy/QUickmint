import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebserviceService } from '../services/webservice.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-provider',
  templateUrl: './rate-provider.component.html',
  styleUrls: ['./rate-provider.component.css']
})
export class RateProviderComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialog: MatDialog,
    public service:WebserviceService,
    public toast:ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RateProviderComponent>,
    //public dialogRef: MatDialogRef<RateProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    console.log('data in rate');
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      review1: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(){
    if(!this.form.value.rating1){
      this.toast.warning('please give rating');
    }
    else if(!this.form.value.review1){
      this.toast.warning('please give review');
    }else{
    let data={
      rating:this.form.value.rating1,
      review:this.form.value.review1,
      class_id:this.data
    }
    console.log('form data',data);
    this.service.classfeedback(data).subscribe((resp:any)=>{
      console.log('resp',resp);
      if(resp.success == false){
        this.toast.warning(resp.message);
      }
      else{
        this.toast.success(resp.message);
        this.closeDialog();
      }
    })
  }
  }


  closeDialog() {
    this.dialogRef.close('closed!');
  }

}
