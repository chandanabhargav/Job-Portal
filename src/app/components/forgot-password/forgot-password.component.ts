import { Component, OnInit } from '@angular/core';
import { debug } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private email: String;
  constructor(private router: Router) { }

  ngOnInit() {}

  sendEmail() {
    var email = this.email;
    //send email
    this.router.navigateByUrl('/otp');
  }
}
