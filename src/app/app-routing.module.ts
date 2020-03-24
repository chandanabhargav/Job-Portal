import { Routes, Router, RouterModule } from '@angular/router'
import { UserSignupComponent } from './components/user-signup/user-signup.component'
import { NgModule } from '@angular/core'
import { UserLoginComponent } from './components/user-login/user-login.component'
import { HomeComponent } from './components/home/home.component'
import { LogoutComponent } from './components/logout/logout.component'
import { PostJobComponent } from './components/post-job/post-job.component'
import { PostedJobDetailsComponent } from './components/posted-job-details/posted-job-details.component'
import { ProfileComponent } from './components/profile/profile.component'
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { OtpComponent } from './components/otp/otp.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: UserLoginComponent},
    {path: 'signup', component: UserSignupComponent},
    {path: 'home', component: HomeComponent},
    {path: 'postJob', component: PostJobComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'viewPostedJobDetails/:id', component: PostedJobDetailsComponent},
    {path: 'appliedJobs', component: AppliedJobsComponent},
    {path: 'forgotPassword', component: ForgotPasswordComponent},
    {path: 'otp', component: OtpComponent},
    {path: 'changePassword', component: ChangePasswordComponent},
    {path: 'logout', component: LogoutComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}