import { Component, OnInit } from '@angular/core';
import { PostjobService } from 'src/app/services/postjob.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  userId;
  jobs;
  constructor(private jobService: PostjobService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('isLoggedIn')) {
      this.userId = sessionStorage.getItem('userId')
      this.getAppliedJobs(this.userId)
    }
    else {
      this.router.navigateByUrl('login')
    }
  }

  formatDate2(d) {
    return moment(d).format('YYYY-MM-DD hh:m a')
  }

  getAppliedJobs(userId) {
    this.jobService.getAppliedJobs(userId).subscribe(data => {
      this.jobs = data
    },
    err => {
      console.log(err)
    })
  }
}
