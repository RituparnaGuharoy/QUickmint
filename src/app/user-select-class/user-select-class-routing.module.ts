import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectClassComponent } from './user-select-class.component';

const routes: Routes = [{ path: '', component: UserSelectClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSelectClassRoutingModule { }
