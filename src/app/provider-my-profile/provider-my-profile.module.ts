import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProviderMyProfileRoutingModule } from './provider-my-profile-routing.module';
import { ProviderMyProfileComponent } from './provider-my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProviderMyProfileComponent],
  imports: [
    CommonModule,
    ProviderMyProfileRoutingModule,MatSlideToggleModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ProviderMyProfileModule { }
