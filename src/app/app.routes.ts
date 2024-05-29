import { Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/pages/home-page/home.component';

export const routes: Routes = [
    // {
    //     path: 'auth', //TODO: localhost:4200/home/dashboard
    //     loadChildren: () => import('./modules/auth/auth-routes').then(m => m.authRoutes) //Importación dinámica
    // },
    {
        path: '', 
        component: HomeComponent,
        loadChildren: () => import('./modules/home/home-routes').then(m => m.homeRoutes), //Importación dinámica
        //canActivate: [sessionGuardFunctional] //Puede contener varios guardianes
    }
];
