import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://dev.megamation.com/o4w940/8503/dlwebOI10.php/O4W_API"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http : HttpClient ) { }

  getElement(branch : string): Observable<any>{
    return this.http.get(`${this.url}?branch=${encodeURI(branch)}`, this.httpOptions)
  }
}
