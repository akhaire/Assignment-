import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTaskComponent } from './components/all-task/all-task.component';

const routes: Routes = [
  {
    path:'',
    component:AllTaskComponent
  },
  {
    path:'all-task',
    component:AllTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
