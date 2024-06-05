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
      this.fecha_alta = '';
      this.imagen_perfil = '';
  
    }
  }