import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser!: Register;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertifyService: AlertifyService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
        this.alertifyService.error('Password does not match');
        return;
      }
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.userService.userRegister(this.registerForm.value).subscribe(next => {
        this.alertifyService.success('Registration Successsful');
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
      }, error => {
        this.alertifyService.error('Username is already used');
      }, () => {
        this.userService.userLogin(this.registerForm.value).subscribe(next => {
          this.router.navigate(['/pawboss/home']);
        });
      });
    } else {
      this.alertifyService.error('Invalid form');
    }
  }
}
