import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  sendEmail(email: Email) {
    return this.http.post(this.baseURL + 'email/send' , email);
  }
}
