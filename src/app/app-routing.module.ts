import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubmissionsComponent } from './submissions/submissions.component';

const routes: Routes = [
  {path:'',component:SubmissionsComponent},
  {path:'sub',component:SubmissionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
