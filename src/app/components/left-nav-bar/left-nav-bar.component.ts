import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrls: ['./left-nav-bar.component.css']
})
export class LeftNavBarComponent implements OnInit {

  isEmployer;
  userId;
  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.isEmployer = sessionStorage.getItem('isEmployer')
    this.userId = sessionStorage.getItem('userId')
  }
}