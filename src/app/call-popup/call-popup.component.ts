import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { JitsiComponent } from '../jitsi/jitsi.component';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';

@Component({
  selector: 'app-call-popup',
  templateUrl: './call-popup.component.html',
  styleUrls: ['./call-popup.component.css'],
})
export class CallPopupComponent implements OnInit {
  callback:any={}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {providerid: string},
    public dialogRef: MatDialogRef<CallPopupComponent>,
    public dialog: MatDialog,
    public service: WebserviceService,
    private toastr : ToastrService,
  ) {
    console.log(this.data)
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JitsiComponent, {
      // width: '250px',
      data: { ...this.data },
    });
  }

  onSubmitRequest(){

    if(!this.callback.name){
      this.toastr.warning("Please add name!");
    }
    else if(!this.callback.email){
      this.toastr.warning("Please add email!");
    }
    else if(!this.callback.phn){
      this.toastr.warning("Please add contact number!");
    }else{

      let data={
        'user_id':this.data.providerid,
        'call_back_email':this.callback.email,
        'call_back_phone':this.callback.phn,
        'call_back_name':this.callback.name
        }
        this.service.sendcallback(data).subscribe((response:any)=>{
          console.log(response)
          if(response['success']){
            this.toastr.success("Sucessfully send callback request!!");
            this.dialog.closeAll();
          }
        })
    }
    
  }

  close(){
    this.dialog.closeAll();
  }
}
