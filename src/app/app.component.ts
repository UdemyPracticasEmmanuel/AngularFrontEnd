import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavmenuComponent } from '@modules/navmenu/navmenu.component';
import { UsuariosComponent } from '@modules/usuarios/usuarios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavmenuComponent, UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '';
}