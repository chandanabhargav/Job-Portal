import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  baseUri: string = 'http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient, private modalService: NgbModal) { }

  addNotify(data) {
    return this.http.post(this.baseUri + '/addNotify', data, {headers: this.headers})
  }

  getNotifications(userId) {
    return this.http.get(this.baseUri + '/getNotifications/' + userId)
  }
}
