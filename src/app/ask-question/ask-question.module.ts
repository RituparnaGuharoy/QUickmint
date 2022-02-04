import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskQuestionRoutingModule } from './ask-question-routing.module';
import { AskQuestionComponent } from './ask-question.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AskQuestionComponent],
  imports: [
    CommonModule,MatDialogModule,FormsModule, ReactiveFormsModule,
    AskQuestionRoutingModule
  ]
})
export class AskQuestionModule { }
