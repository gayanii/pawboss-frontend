import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { Username } from '../models/username';
import { UserUpdate } from '../models/userUpdate';
import { UserId } from '../models/userId';
import { UserDetails } from '../models/userDetails';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  userLogin(login: Login) {
    localStorage.setItem('username', login.username);
    return this.http.post(this.baseURL + 'users/login' , login);
  }

  userRegister(register: Register) {
    localStorage.setItem('username', register.username);
    return this.http.post(this.baseURL + 'users' , register);
  }

  getUserDetailsByUsername(user: Username) {
    return this.http.post(this.baseURL + 'users/getUserByUsername' , user);
  }

  getUserDetailsById(user: UserId) {
    return this.http.post(this.baseURL + 'users/getUserById' , user);
  }

  updateUser(userUpdate: UserUpdate) {
    return this.http.put(this.baseURL + 'users' , userUpdate);
  }

  getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.baseURL + 'users');
  }
}
