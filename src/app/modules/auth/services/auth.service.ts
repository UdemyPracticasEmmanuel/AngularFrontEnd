import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { loginCtrl } from '@controller/auth';
import { Usuario } from '@models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private readonly URL = environment.api
  
  mockUser = {
    name: 'Admin',
    email: 'admin@test.com',
    password: '12345678',
    rolr: 'Administrador',
    register_date: '2024-01-01',
    profile_image: ''
  };
  userList: Usuario[] = [];
  
  constructor() { 

  }

  sendCredentials(email: string, password: string): Observable<any>{
    let body = {
      email,
      password
    };
    let validarArray = false;
    const localData = localStorage.getItem("angular17crud");
    
    
    if(localData != null){
      this.userList = JSON.parse(localData);
      this.userList.forEach(user => {
        if (user.email === email && user.password === password){
          validarArray = true;
        }
      });
    }

    if((email === this.mockUser.email && password === this.mockUser.password) || validarArray){
      console.log(this.userList);
      return of(body);
    }
    else{
      throw Error("Credenciales incorrectas");
    }
    //return new Observable<any>;
     //this.http.post('/controller', //validar el email y el password con uno existente, no se ocupa POST, ni crear APIs
    //body, {withCredentials: false}); //después settear a true
  }
}
