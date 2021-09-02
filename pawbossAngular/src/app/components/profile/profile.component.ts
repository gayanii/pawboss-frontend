import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Username } from 'src/app/models/username';
import { UserDetails } from 'src/app/models/userDetails';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { UserUpdate } from 'src/app/models/userUpdate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfileForm!: FormGroup;
  user: Username;
  userDetails: UserDetails;
  userUpdate: UserUpdate;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private formBuilder: FormBuilder, private alertifyService: AlertifyService,
    private userService: UserService) { }

  ngOnInit() {
    this.user = Object.assign({username: localStorage.getItem('username')});
    this.userService.getUserDetailsByUsername(this.user).subscribe((userDetails: UserDetails) => {
      this.userDetails = userDetails;

      this.editProfileForm.patchValue({
        id: this.userDetails.id,
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        username: this.userDetails.username,
        email: this.userDetails.email,
        contactNo: this.userDetails.contactNo,
        address: this.userDetails.address
      });
    });
    this.updateProfile();
  }

  updateProfile() {
    this.editProfileForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  updateUser() {
    if (this.editProfileForm.valid) {
      this.userService.updateUser(this.editProfileForm.value).subscribe(next => {
        this.alertifyService.success('Profile updated successfully');
      }, error => {
        this.alertifyService.error('Username is already used');
      });
    } else {
      this.alertifyService.error('Invalid form');
    }
  }

  reset() {
    this.ngOnInit();
  }

}
