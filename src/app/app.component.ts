import { CommonModule, formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  userObj: Usuario = new Usuario();
  userList: Usuario[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null){
      this.userList = JSON.parse(localData);
    }
    
  }
  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    this.userObj = new Usuario();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  saveUser() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
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
    this.closeModel();
  }
  editUser(item: Usuario) {
    this.userObj = item;
    this.openModel();
  }
  updateUser(){
    const currentRecord = this.userList.find(m => m.id == this.userObj.id);
    if(currentRecord != undefined){
      currentRecord.nombre = this.userObj.nombre;
      currentRecord.correo = this.userObj.correo;
      currentRecord.contrasenia = this.userObj.contrasenia;
      currentRecord.rol= this.userObj.rol;
      currentRecord.fecha_alta= this.userObj.fecha_alta;
      currentRecord.imagen_perfil= this.userObj.imagen_perfil;

    };
    localStorage.setItem('angular17crud', JSON.stringify(this.userList));
    this.closeModel();
  }
  deleteUser(item: Usuario) {
    const isDeleted = confirm("¿Estás seguro que deseas eliminar este usuario?");

    if(isDeleted){
      const currentRecord = this.userList.findIndex(m => m.id == this.userObj.id);
      this.userList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.userList));
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
