import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ActivatedRoute , Router,NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from 'src/app/services/webservice.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  askquestion:any;
  giveAnser:any;
  ownDetails:any={};
  constructor(
    public dialogRef: MatDialogRef<AskQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {classId: string ,type:string , id:string},
    public service: WebserviceService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService,
    public dialog: MatDialog,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    this.userDetails();
  }

  userDetails(){
    this.service.userOwnDetails().subscribe((Response:any)=>{
      console.log(Response)
      if(Response.success){
        this.ownDetails = Response.data;
        
      }
    })
  }


  submit(){
    let data={
      class_id:this.data.classId,
      question_title:this.askquestion,
      name:this.ownDetails.UserFullName,
      email:this.ownDetails.UserEmail,
    }

    this.service.askquestion(data).subscribe((response:any)=>{
      console.log(response)
      if(response['success']){
        this.dialog.closeAll();
      }
    })

  }


  answer(){
    let data={
      class_id:this.data.classId,
      answer_id : this.data.id,
      answer_title:this.giveAnser,
      name:this.ownDetails.UserFullName,
      email:this.ownDetails.UserEmail,
    }

    this.service.give_answer(data).subscribe((response:any)=>{
      console.log(response)
      if(response['success']){
        this.dialog.closeAll();
      }
    })

  }



}
