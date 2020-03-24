import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostjobService } from 'src/app/services/postjob.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  
  postJobForm: FormGroup;
  submitted:boolean = false;
  userId: string;
  constructor(private fb: FormBuilder, private apiService: PostjobService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('isLoggedIn')) {
      this.userId = sessionStorage.getItem('userId')
      this.postJobForm = this.fb.group({
        position: ['', [Validators.required, Validators.minLength(1)]],
        salary: ['', [Validators.required, Validators.minLength(1)]],
        description: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        userId: [this.userId]
      })
    }
    else {
      this.router.navigateByUrl('login')
    }
  }

  openModal(content) {
    this.modalService.open(content, {size: 'lg'})
  }

  get f() {
    return this.postJobForm.controls;
  }

  onSubmit() { 
    this.submitted = true
    if(this.postJobForm.valid) {
      this.apiService.postJob(this.postJobForm.value).subscribe(data => { 
        console.log(data)
        this.clearAllValues()
        document.getElementById('openModalBtn').click()
      },
      error => {
        console.log(error)
      })
    }
  }

  clearAllValues() {
    this.submitted = false
    this.postJobForm.reset()
  }
}
