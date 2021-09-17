import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SubjectComponent } from './pages/subject/subject.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  
  { path: 'login-callback', component: LoginComponent },  
  { path: 'subject', component: SubjectComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
