import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUri: string = 'http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient, private modalService: NgbModal) { }
  
  getProfile(id) {
    return this.http.get(this.baseUri + '/getProfile/' + id)
  }

  saveProfile(data) {
    return this.http.post(this.baseUri + '/saveProfile', data, {headers: this.headers})
  }

  saveResume(data) {
    return this.http.post(this.baseUri + '/saveResume', data, {headers: this.headers})
  }

  addExp(data) {
    return this.http.post(this.baseUri + '/addExp', data, {headers: this.headers})
  }

  editProfile(data) {
    return this.http.post(this.baseUri + '/editProfile', data, {headers: this.headers})
  }
}
