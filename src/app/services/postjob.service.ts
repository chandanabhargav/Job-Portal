import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PostjobService {

  baseUri: string = 'http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  postJob(data) {
    return this.http.post(this.baseUri + '/postJob', data, {headers: this.headers})
  }

  getAllPostedJobs(userId) {
    return this.http.get(this.baseUri + '/getAllPostedJobs/' + userId)
  }

  getAllJobs(userId) {
    return this.http.get(this.baseUri + '/getAllJobs/' + userId)
  }

  getAppliedJobs(userId) {
    return this.http.get(this.baseUri + '/getAppliedJobs/' + userId)
  }

  getPostedJobDetails(jobId) {
    return this.http.get(this.baseUri + '/getPostedJobDetails/' + jobId)
  }

  getEmpJobDetails(jobId) {
    return this.http.get(this.baseUri + '/getEmpJobDetails/' + jobId)
  }

  applyForJob(data) {
    return this.http.post(this.baseUri + '/applyForJob', data, {headers: this.headers})
  }

  shortlist(data) { 
    return this.http.post(this.baseUri + '/shortlist', data, {headers: this.headers})
  }
}
