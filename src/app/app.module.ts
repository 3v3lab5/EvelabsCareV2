import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickModule } from 'ngx-slick';
import {MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatDialogModule,
        MatGridListModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatTableModule,
        MatExpansionModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSidenavModule} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SelectStationComponent } from './select-station/select-station.component';
import { NurseHomeComponent } from './nurse-home/nurse-home.component';
import {AuthService} from './auth.service';
import {AdminService} from './admin.service';
import {NurseService} from './nurse.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminMstationComponent } from './admin-mstation/admin-mstation.component';
import { AdminMuserComponent } from './admin-muser/admin-muser.component';
import { AdminMbedComponent } from './admin-mbed/admin-mbed.component';
import { AdminMivsetComponent } from './admin-mivset/admin-mivset.component';
import { AdminMdripoComponent } from './admin-mdripo/admin-mdripo.component';
import { EdituserDialogComponent } from './edituser-dialog/edituser-dialog.component';
import { DeleteuserDialogComponent } from './deleteuser-dialog/deleteuser-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { EditstationDialogComponent } from './editstation-dialog/editstation-dialog.component';
import { DeletestationDialogComponent } from './deletestation-dialog/deletestation-dialog.component';
import { EditbedDialogComponent } from './editbed-dialog/editbed-dialog.component';
import { DeletebedDialogComponent } from './deletebed-dialog/deletebed-dialog.component';
import { EditivsetDialogComponent } from './editivset-dialog/editivset-dialog.component';
import { DeleteivsetDialogComponent } from './deleteivset-dialog/deleteivset-dialog.component';
import { EditdripoDialogComponent } from './editdripo-dialog/editdripo-dialog.component';
import { DeletedripoDialogComponent } from './deletedripo-dialog/deletedripo-dialog.component';
import { NurseMpatientComponent } from './nurse-mpatient/nurse-mpatient.component';
import { EditpatientDialogComponent } from './editpatient-dialog/editpatient-dialog.component';
import { DischargepatientDialogComponent } from './dischargepatient-dialog/dischargepatient-dialog.component';
import { AddtaskDialogComponent } from './addtask-dialog/addtask-dialog.component';
import { TaskactivityDialogComponent } from './taskactivity-dialog/taskactivity-dialog.component';
import { NursePhistoryComponent } from './nurse-phistory/nurse-phistory.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddpatientDialogComponent } from './addpatient-dialog/addpatient-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SelectStationComponent,
    NurseHomeComponent,
    AdminHomeComponent,
    UnauthorizedComponent,
    AdminMstationComponent,
    AdminMuserComponent,
    AdminMbedComponent,
    AdminMivsetComponent,
    AdminMdripoComponent,
    EdituserDialogComponent,
    DeleteuserDialogComponent,
    EditstationDialogComponent,
    DeletestationDialogComponent,
    EditbedDialogComponent,
    DeletebedDialogComponent,
    EditivsetDialogComponent,
    DeleteivsetDialogComponent,
    EditdripoDialogComponent,
    DeletedripoDialogComponent,
    NurseMpatientComponent,
    EditpatientDialogComponent,
    DischargepatientDialogComponent,
    AddtaskDialogComponent,
    TaskactivityDialogComponent,
    NursePhistoryComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddpatientDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },AuthService,AuthGuard,AdminService,NurseService,HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [EdituserDialogComponent,DeleteuserDialogComponent,EditstationDialogComponent,
  DeletestationDialogComponent,EditbedDialogComponent,DeletebedDialogComponent,EditivsetDialogComponent,
  DeleteivsetDialogComponent,EditdripoDialogComponent,DeletedripoDialogComponent,EditpatientDialogComponent,
  DischargepatientDialogComponent,AddtaskDialogComponent,TaskactivityDialogComponent,AddpatientDialogComponent
]
})
export class AppModule { }
