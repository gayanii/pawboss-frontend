import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pawboss',
  templateUrl: './pawboss.component.html',
  styleUrls: ['./pawboss.component.css']
})
export class PawbossComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    return false;
  }
}
