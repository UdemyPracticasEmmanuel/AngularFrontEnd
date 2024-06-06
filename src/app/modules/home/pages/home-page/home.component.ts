import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavmenuComponent } from '@modules/navmenu/navmenu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavmenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}


