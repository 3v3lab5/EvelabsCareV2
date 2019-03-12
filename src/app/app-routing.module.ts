import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component'
import { SelectStationComponent } from './select-station/select-station.component';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import { AdminHomeComponent} from './admin-home/admin-home.component';
import { AdminMuserComponent } from './admin-muser/admin-muser.component';
import { AdminMstationComponent } from './admin-mstation/admin-mstation.component';
import { AdminMbedComponent } from './admin-mbed/admin-mbed.component';
import { AdminMivsetComponent } from './admin-mivset/admin-mivset.component';
import { AdminMdripoComponent } from './admin-mdripo/admin-mdripo.component';
import { NurseMpatientComponent } from './nurse-mpatient/nurse-mpatient.component';
import { NursePhistoryComponent } from './nurse-phistory/nurse-phistory.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {AuthGuard} from './auth.guard';
import { RoleGuardService} from './role-guard.service'

const routes: Routes = [
	{
		path:'',
		redirectTo:'/login',
		pathMatch:'full'
	},
	{
		path:'*',
		redirectTo:'/login',
		pathMatch:'full'
	},
	{
		path:'register',
		component:RegisterComponent
	},
	{
		path:'activate/:token',
		component:ActivateAccountComponent
	},
	{
		path:'forgotpassword',
		component:ForgotPasswordComponent
	},

	{
		path:'resetpassword/:token',
		component:ResetPasswordComponent
	},

	{
		path:'login',
		component: LoginComponent
	},
	{
		path:'unauthorized',
		component:UnauthorizedComponent
	},
	{
		path:'admin/home',
		component:AdminHomeComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},
	{
		path:'admin/manageusers',
		component:AdminMuserComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},
	{
		path:'admin/managestations',
		component:AdminMstationComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},
	{
		path:'admin/managebeds',
		component:AdminMbedComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},

	{
		path:'admin/manageivsets',
		component:AdminMivsetComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},
	{
		path:'admin/managedripos',
		component:AdminMdripoComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'admin'
		   	} 	
	},

	{
		path:'nurse/selectstation',
		component:SelectStationComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'nurse'
		   	} 
	},
	{
		path:'nurse/home',
		component:NurseHomeComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'nurse'
		   	} 

	},
	{
		path:'nurse/managepatients',
		component:NurseMpatientComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'nurse'
		   	} 

	},
	{
		path:'nurse/patienthistory/:id',
		component:NursePhistoryComponent,
		canActivate: [RoleGuardService], 
		   	data: { 
		      expectedRole: 'nurse'
		   	} 

	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
