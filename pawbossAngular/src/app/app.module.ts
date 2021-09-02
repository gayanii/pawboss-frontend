import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PawbossComponent } from './components/pawboss/pawboss.component';
import { LoginComponent } from './components/pawboss/login/login.component';
import { RegisterComponent } from './components/pawboss/register/register.component';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PetService } from './services/pet.service';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { PetCreateComponent } from './components/pet-create/pet-create.component';
import { EmailService } from './services/email.service';

const routes: Routes = [
  {path: 'pawboss', component: PawbossComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {path: 'pawboss/home', component: HomeComponent},
  {path: 'pawboss/profile', component: ProfileComponent},
  {path: 'pawboss/petCreate', component: PetCreateComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PawbossComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PetCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [
    UserService,
    AlertifyService,
    PetService,
    EmailService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
