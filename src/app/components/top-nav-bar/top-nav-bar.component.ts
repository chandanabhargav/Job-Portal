import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostjobService } from 'src/app/services/postjob.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  userName;
  notifications;
  constructor(private router: Router, private modalService: NgbModal, private jobService: PostjobService, private notifyService: NotifyService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName')
    this.getNotifications()
  }

  logOut() { 
    sessionStorage.clear()
    this.router.navigateByUrl('login')
  }

  openLogoutModal(content) {
    this.modalService.open(content, {size: 'lg'})
  }

  getNotifications() {
    this.notifyService.getNotifications(sessionStorage.getItem('userId')).subscribe(data => {
      this.notifications = data
    },
    err => {
      console.log(err)
    })
  }
}