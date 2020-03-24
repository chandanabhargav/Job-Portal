import { Component, OnInit } from '@angular/core';
import { PostjobService } from 'src/app/services/postjob.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posted-job-details',
  templateUrl: './posted-job-details.component.html',
  styleUrls: ['./posted-job-details.component.css']
})
export class PostedJobDetailsComponent implements OnInit {

  details;
  isEmployer;
  status;
  jobId;
  constructor(private jobService: PostjobService, private notifyService: NotifyService, private activatedRoute: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    var jobId = this.activatedRoute.snapshot.params.id
    this.jobId = jobId
    this.isEmployer = sessionStorage.getItem('isEmployer')
    if(sessionStorage.getItem('isEmployer') == '1')
      this.getPostedJobDetails(jobId)
    else 
      this.getEmpJobDetails(jobId)
  }

  getPostedJobDetails(jobId) {
    this.jobService.getPostedJobDetails(jobId).subscribe(data => {
      
      this.details = data
    }, 
    err => {
      console.log(err)
    })
  }

  getEmpJobDetails(jobId) {
    this.jobService.getEmpJobDetails(jobId).subscribe(data => {
      this.details = data
    }, 
    err => {
      console.log(err)
    })
  }

  accept(elem, appId) {
    //this.addNotify(elem, appId, 1)
  }

  reject(elem, appId) {
    //this.addNotify(elem, appId, 0)
  }

  shortlist(elem, appId, id) {
    
    var data = {
      "isShortlisted": 1,
      "id": id
    }
    
    this.jobService.shortlist(data).subscribe(result => {
      this.addNotify(elem, appId, 2)
    }, 
    error => {
      console.log(error)
    })
    this.addNotify(elem, appId, 2)
  }

  openModal(content) {
    this.modalService.open(content, {size: 'lg'})
  }

  addNotify(elem, appId, isAccepted) {
    var status

    if(isAccepted == '1')
      status = "accepted"
    else if(isAccepted == '0')
      status = "rejected"
    else
      status = "shorlisted"

    this.status = status

    var data = {
      "toUserId": Number(appId),
      "msg": "Your job application to company " + sessionStorage.getItem('userName') + " has been " + status
    }
    
    this.notifyService.addNotify(data).subscribe(result => {
      document.getElementById('openModalBtn').click()  
      //elem.innerText = "Shortlisted"
      this.getPostedJobDetails(this.jobId)
    },
      err => { 
        console.log(err)
    })
  }
}
