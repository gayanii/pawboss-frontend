import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  appTitle: string = 'Pawboss';
  username: string;

  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  loggedIn() {
    return JSON.parse(localStorage.getItem('isLoggedIn'));
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
  }
}
