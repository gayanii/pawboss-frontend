import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetDetails } from '../models/petDetails';
import { PetUpdate } from '../models/petUpdate';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(this.baseURL + 'pets/getAllPets');
  }

  addPet(pet: PetDetails) {
    return this.http.post(this.baseURL + 'pets' , pet);
  }

  getAdoptedPets(): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(this.baseURL + 'pets/getAdopted');
  }

  getNotAdoptedPets(): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(this.baseURL + 'pets/getNotAdopted');
  }

  deletePet(id: number) {
    return this.http.delete(this.baseURL + 'pets/' + id);
  }

  updatePet(petUpdate: PetUpdate) {
    return this.http.put(this.baseURL + 'pets' , petUpdate);
  }
}
