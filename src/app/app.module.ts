import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './components/logout/logout.component';
import { LeftNavBarComponent } from './components/left-nav-bar/left-nav-bar.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { PostedJobDetailsComponent } from './components/posted-job-details/posted-job-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    HomeComponent,
    LogoutComponent,
    LeftNavBarComponent,
    TopNavBarComponent,
    PostJobComponent,
    PostedJobDetailsComponent,
    ProfileComponent,
    AppliedJobsComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //for modal 
    NgbModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {}