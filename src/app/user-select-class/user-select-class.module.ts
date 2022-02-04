import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSelectClassRoutingModule } from './user-select-class-routing.module';
import { UserSelectClassComponent } from './user-select-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserSelectClassComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,
    UserSelectClassRoutingModule
  ]
})
export class UserSelectClassModule { }
