import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signupForm: FormGroup
  submitted = false
  status = ''
  isEmployer:boolean = false;
  isFilled:boolean = false;

  constructor(private fb: FormBuilder, private apiService: SignupService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      status: [''],
      isEmployer: ['', Validators.required],
      isCompany: ['']
    })
  }

  isEmployerOnChange(element) {
    //debugger
    var isEmployer = element.value
    if(isEmployer == '1') { //is an employer 
      this.isEmployer = true
      this.isFilled = true
    } 
    else {
      this.isEmployer = false
      this.isFilled = true
      //document.getElementById('isCompany')
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    //debugger
    this.submitted = true
    //console.log(this.signupForm.value)
    if(this.signupForm.valid) {
      let user = this.signupForm.value
      this.apiService.signup(user).subscribe((data) => {
        if(data['code'] && data['code'] == 'ER_DUP_ENTRY') {
          this.status = 'Are you a member ? Your email already exists'
        }
        else {
          console.log('Success: ' + data)
          this.status = 'Your Account has been created'
        }
      },
      (error) => {
        console.log(error)
        this.status = 'There was a problem creating your account'
      })
    }
    else {
      return;
    }
  }
}