import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { TestComponent } from './test/test.component';
import { AapointmentspageComponent } from './aapointmentspage/aapointmentspage.component';
import { OutpatientcardComponent } from './outpatientcard/outpatientcard.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'editprofile', component: EditprofileComponent },
{ path: 'appointments', component: AapointmentspageComponent },
{ path: 'outpatientcard', component: OutpatientcardComponent },
{ path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
