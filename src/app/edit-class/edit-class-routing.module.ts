import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditClassComponent } from './edit-class.component';
const routes: Routes = [{ path: '', component: EditClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditClassRoutingModule { }
