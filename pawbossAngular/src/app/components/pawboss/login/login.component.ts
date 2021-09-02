import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private userService: UserService, private alertifyService: AlertifyService, 
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.userLogin(this.loginForm.value).subscribe(next => {
        this.alertifyService.success('Logged in sccessfully');
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
      }, error => {
        this.alertifyService.error('Username or password is incorrect');
      }, () => {
        this.router.navigate(['/pawboss/home']);
      });
    } else {
      this.alertifyService.error('Please fill username and password');
    }
  }
}
