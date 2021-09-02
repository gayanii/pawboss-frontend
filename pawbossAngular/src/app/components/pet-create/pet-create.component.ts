import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetDetails } from 'src/app/models/petDetails';
import { UserDetails } from 'src/app/models/userDetails';
import { Username } from 'src/app/models/username';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {

  createPetForm!: FormGroup;
  petDetails: PetDetails;
  user: Username;
  userDetails: UserDetails;
  imageSrc: string;
  
  constructor(private formBuilder: FormBuilder, private petService: PetService, 
    private alertifyService: AlertifyService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.petCreate()
  }

  petCreate() {
    this.createPetForm = this.formBuilder.group({
      area: ['', Validators.required],
      description: ['', Validators.required],
      fileSource:['', [Validators.required]]
    });
  }

  createPet() {
    if(this.createPetForm.valid) {
      this.user = Object.assign({username: localStorage.getItem('username')});
      this.userService.getUserDetailsByUsername(this.user).subscribe((userDetails: UserDetails) => {
        this.userDetails = userDetails;

      this.petDetails = Object.assign({area: this.createPetForm.value.area}, 
        {description: this.createPetForm.value.description}, 
        {foundedOn: new Date(Date.now())},
        {foundedById: userDetails.id},
        {identityPhoto: this.createPetForm.value.fileSource});

      this.petService.addPet(this.petDetails).subscribe((petDetails: PetDetails) => {
        this.petDetails = petDetails;
        this.alertifyService.success('Pet added successfully');
      }, error => {
        this.alertifyService.error('Invalid Form');
      }, () => {
        this.router.navigate(['/pawboss/home']);
      });
    });
    } else {
      this.alertifyService.error('Invalid form');
    }
  }
  reset(){
    this.imageSrc = null;
    }

     
  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.createPetForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }
    
  
}


