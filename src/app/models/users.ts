export class Usuario {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    register_date: string;
    profile_image: string;
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.password = '';
      this.role = '';
      this.register_date = '';
      this.profile_image = '';
  
    }
  }