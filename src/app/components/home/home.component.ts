import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { PostjobService } from 'src/app/services/postjob.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class HomeComponent implements OnInit {

  homeForm: FormGroup;
  imageSrc: string; //
  tweet: string;
  closeResult: string;
  tweetImgSet = false; //
  info;
  msgTitle;
  msgBody;
  users;
  userId;
  isEmployer;
  intervalId;
  jobs;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private router: Router, private activatedRoute: ActivatedRoute, private jobsService: PostjobService, private notifyService: NotifyService) { }

  ngOnInit() { 
    if(sessionStorage.getItem('isLoggedIn')) { 
      this.userId = sessionStorage.getItem('userId')
      this.isEmployer = sessionStorage.getItem('isEmployer')
      if(this.isEmployer == '1')
        this.getAllPostedJobs()
      else
        this.getAllJobs()
    }
    else {
      this.router.navigateByUrl('login')
    }
  }

  getAllJobs() {
    this.jobsService.getAllJobs(this.userId).subscribe(jobs => { 
      this.jobs = jobs
    },
    err => {
      console.log(err)
    })
  }

  getAllPostedJobs() {
    this.jobsService.getAllPostedJobs(this.userId).subscribe(jobs => {
      this.jobs = jobs
      
    },
    err => {
      console.log(err)
    })
  }

  formatDate(d) {
    return moment(d).format('YYYY-MM-DD')
  }

  formatDate2(d) {
    return moment(d).format('YYYY-MM-DD hh:m a')
  }

  openModal(content) { 
    this.modalService.open(content, {size: 'lg'})
  }

  addNotify(toUserId, position) {
    var data = {
      "toUserId": Number(toUserId),
      "msg": sessionStorage.getItem('userName') + " has applied to a job on position " + position
    }
    this.notifyService.addNotify(data).subscribe(result => {
    },
    error => {
    })
  }
  
  applyForJob(jobId) { 
    var data = { 
      "applicantId": sessionStorage.getItem('userId'),
      "jobId": jobId
    }
    this.jobsService.applyForJob(data).subscribe(data => {
      if(data['errno'])
        return;
      if(data[0]) {
        this.addNotify(data[0]['userId'], data[0]['position'])
        document.getElementById('openModalBtn').click()
        document.getElementById(jobId).remove()
      }
    }, 
    err => {
      console.log(err)
    })
  }
}