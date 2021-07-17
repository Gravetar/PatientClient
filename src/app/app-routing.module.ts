import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentspageComponent } from './appointmentspage/appointmentspage.component';
import { OutpatientcardComponent } from './outpatientcard/outpatientcard.component';
import { AddappointmentComponent } from './addappointment/addappointment.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'editprofile', component: EditprofileComponent },
{ path: 'appointments', component: AppointmentspageComponent },
{ path: 'outpatientcard', component: OutpatientcardComponent },
{ path: 'addappointment', component: AddappointmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
