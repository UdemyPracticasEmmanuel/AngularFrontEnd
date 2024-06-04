import { CommonModule, NgFor, NgIf, formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  userObj: Usuario = new Usuario();
  userList: Usuario[] = [];

  base64String: string = '';
  imagePath:any;
  showImage: boolean = false;

  comprobarPass: string = '';
  matchedPass: boolean = true;

  emptyFields?: boolean;

  constructor(private domSanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null){
      this.userList = JSON.parse(localData);
    }
    
  }
  empatarContrasenias(pass:string, passComprobacion: string):boolean{
    return (pass == passComprobacion) ? true: false;
  }
  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    this.userObj = new Usuario();
    this.base64String = '';
    this.matchedPass = true;
    this.emptyFields = false;
    this.imagePath = null;
    this.showImage = false;
    this.comprobarPass ='';

    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
    
  }
  validarCampos(campos: Usuario): boolean{

    if(campos.nombre == '' ||
      campos.correo == '' ||
      campos.contrasenia == '' ||
      campos.rol == '' ||
      campos.fecha_alta == '' ||
      campos.imagen_perfil == ''){
        return true;
      }
    return false;
  }
  saveUser() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
    
    this.userObj.imagen_perfil = this.base64String;
    this.matchedPass = this.empatarContrasenias(this.userObj.contrasenia, this.comprobarPass);
    this.emptyFields = this.validarCampos(this.userObj);

    if(!this.emptyFields){
      if (this.matchedPass){
        if (isLocalPresent != null) {
          const oldArray = JSON.parse(isLocalPresent);
          this.userObj.id = oldArray.length + 1;
          oldArray.push(this.userObj);
          this.userList = oldArray;
          localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    
        } else {
          const newArr = [];
          newArr.push(this.userObj);
          this.userObj.id = 1;
          this.userList = newArr;
          localStorage.setItem('angular17crud', JSON.stringify(newArr));
        }
        
        alert("Usuario creado correctamente");
        this.closeModel();
      }
    } 
  }
  editUser(item: Usuario) {
    this.userObj = item;
    this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(item.imagen_perfil);
    this.openModel();
  }
  updateUser(){
    debugger;
    const currentRecord = this.userList.find(m => m.id == this.userObj.id);

    this.matchedPass = this.empatarContrasenias(this.userObj.contrasenia, this.comprobarPass);
    this.emptyFields = this.validarCampos(this.userObj);

    if(!this.emptyFields){
      if(this.matchedPass){
        if(currentRecord != undefined){
          currentRecord.nombre = this.userObj.nombre;
          currentRecord.correo = this.userObj.correo;
          currentRecord.contrasenia = this.userObj.contrasenia;
          currentRecord.rol= this.userObj.rol;
          currentRecord.fecha_alta= this.userObj.fecha_alta;
          currentRecord.imagen_perfil= this.userObj.imagen_perfil;
    
        };
        localStorage.setItem('angular17crud', JSON.stringify(this.userList));
        alert("Usuario actualizado correctamente");
        this.closeModel();
      }
    }
  }
  deleteUser(item: Usuario) {
    const isDeleted = confirm("¿Estás seguro que deseas eliminar este usuario?");

    if(isDeleted){
      const currentRecord = this.userList.findIndex(m => m.id == this.userObj.id);
      this.userList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.userList));
    }
  }
  onFileChange(event: any){
    //debugger;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.base64String = reader.result as string;
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(this.base64String);
    }
    if(file){
      reader.readAsDataURL(file);
      // this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      //            + this.base64String);
    }
  }

}

export class Usuario {
  id: number;
  nombre: string;
  correo: string;
  contrasenia: string;
  rol: string;
  fecha_alta: string;
  imagen_perfil: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.correo = '';
    this.contrasenia = '';
    this.rol = '';
    this.fecha_alta = ''; //formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.imagen_perfil = '';

  }
}
