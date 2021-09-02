import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PetDetails } from 'src/app/models/petDetails';
import { Username } from 'src/app/models/username';
import { UserDetails } from 'src/app/models/userDetails';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserId } from 'src/app/models/userId';
import { PetUpdate } from 'src/app/models/petUpdate';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adoptedPetDetails!: PetDetails[];
  notAdoptedPetDetails!: PetDetails[];
  username: string;
  foundedDate: Date;
  userDetails: UserDetails;
  allUserDetails: UserDetails[];
  updatePet: PetUpdate;
  email: Email;
  user: Username;
  userId: UserId;
  imagesrc:string;
  petId = 0;
  petIndex = 0;
  area: string;
  foundedOn:string;
  foundedBy: string;
  description: string;
  isAdopted: string;
  adoptedBy: string;
  updatePetForm!: FormGroup;

  constructor(private petService: PetService, private datePipe: DatePipe, private formBuilder: FormBuilder,
    private userService: UserService, private alertifyService: AlertifyService, private emailService: EmailService,
    private router: Router) { }

  ngOnInit() {
    this.petService.getNotAdoptedPets().subscribe((petDetails: PetDetails[]) => {
      this.notAdoptedPetDetails = petDetails;
    });
    this.petService.getAdoptedPets().subscribe((petDetails: PetDetails[]) => {
      this.adoptedPetDetails = petDetails;
    });
    this.user = Object.assign({username: localStorage.getItem('username')});
    this.userService.getUserDetailsByUsername(this.user).subscribe((userDetails: UserDetails) => {
      this.userDetails = userDetails;
      localStorage.setItem('isAdmin', JSON.stringify(userDetails.isAdmin));
      
    });
    this.username = localStorage.getItem('username');
    this.petUpdate();
  }

  dateFormat(date) {
    this.foundedDate = new Date(date);
    return this.datePipe.transform(this.foundedDate, 'MMM d, y');
  }

  isAdmin() {
    return JSON.parse(localStorage.getItem('isAdmin'));
  }

  deleteButtonClick(id, index) {
    this.petId = id;
    this.petIndex = index;
  }

  deletePet() {
    this.notAdoptedPetDetails.splice(this.petIndex, 1);
    this.petService.deletePet(this.petId).subscribe(data => {
      this.alertifyService.success('Pet deleted successfully');
    }, error => {
      this.alertifyService.error('Pet delete failed');
    })
  }

  petUpdate() {
    this.updatePetForm = this.formBuilder.group({
      id: ['', Validators.required],
      area: ['', Validators.required],
      description: ['', Validators.required],
      isAdopted: ['false', Validators.required],
      adopterId: ['', Validators.required]
    });
  }

  clicked(id, area, foundedOn, foundedById, description, isAdopted) {
    this.userId = Object.assign({id: foundedById});
    this.area = area;
    this.foundedOn = foundedOn;
    this.description = description;
    this.isAdopted = isAdopted;
    this.petId = id;
    this.userService.getUserDetailsById(this.userId).subscribe((userDetails: UserDetails) => {
      this.userDetails = userDetails;
      this.foundedBy = userDetails['username'];
    });

    this.updatePetForm.patchValue({
      id: id,
      area: this.area,
      description: this.description,
      isAdopted: this.isAdopted,
      adopterId: this.adoptedBy
    });
  }

  radioChange(radioValue) {
    this.userService.getAllUsers().subscribe((userDetails: UserDetails[]) => {
      this.isAdopted = JSON.parse(radioValue.target.value);
      if (JSON.parse(this.isAdopted) == true) {
        this.allUserDetails = userDetails;
      } else {
        this.allUserDetails = null;
      }
    });
  }

  adoptedByChange(adopter) {
    this.adoptedBy = adopter.target.value;
  }

  updatePetDetails() {
    this.updatePet = Object.assign({id: this.petId}, {area: this.updatePetForm.value.area}, {adopterId: parseInt(this.adoptedBy)}, 
    {description: this.updatePetForm.value.description}, {isAdopted: JSON.parse(this.isAdopted)});
    if (this.updatePetForm.valid) {
      if (JSON.parse(this.isAdopted) == true) {
        this.petService.updatePet(this.updatePet).subscribe(next => {
          this.alertifyService.success('Pet updated successfully');
          window.location.reload();
        }, error => {
          this.alertifyService.error('Pet update failed');
        });
      } else {
        this.adoptedBy = null;
        this.alertifyService.error('Invalid form');
        return;
      }
    } else {
      this.alertifyService.error('Invalid form');
    }
  }

  addNew() {
    this.router.navigate(['/pawboss/petCreate']);
  }

  emailSend(username) {
    this.email = Object.assign({toEmail: "ukgk.silva@gmail.com"}, {subject: "PawBoss Request"},
    {body: username + " is interested on pet with the id " + this.petId + ". Please contact " + username +".<br/><br/>Thank you."}, {username: username});
    this.emailService.sendEmail(this.email).subscribe(next => {
      this.alertifyService.success('Email sent');
    }, error => {
      this.alertifyService.error('Email failed');
    });
  }
}
