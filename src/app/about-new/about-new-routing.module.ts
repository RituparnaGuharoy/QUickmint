import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutNewComponent} from '../about-new/about-new.component'
const routes: Routes = [{ path: '', component: AboutNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutNewRoutingModule { }
