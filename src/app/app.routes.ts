import { Routes } from '@angular/router';
import { LoginComponent } from '@modules/auth/login/login.component';
import { HomeComponent } from '@modules/home/pages/home-page/home.component';
import { NotFoundComponent } from '@modules/not-found/not-found.component';
import { UsuariosComponent } from '@modules/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth-routes').then(m => m.authRoutes) //Importación dinámica
    },
    
    { path: '', redirectTo: 'login', pathMatch: 'full'}, //Establecer condicion para que redirija al login o dashboard
    {
        path: 'home', 
        component: HomeComponent
        //loadChildren: () => import('./modules/home/home-routes').then(m => m.homeRoutes), //Importación dinámica
        //canActivate: [sessionGuardFunctional] //Puede contener varios guardianes
    },
    { path: 'login', component: LoginComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: '**', component: NotFoundComponent}
];
