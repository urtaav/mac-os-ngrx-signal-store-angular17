import { Routes } from '@angular/router';
import { BootComponent } from './core/boot/boot.component';

export const routes: Routes = [
    { path: 'boot', component: BootComponent },
    { path: 'login', loadComponent: () => import('./core/login/login.component').then((m) => m.LoginComponent) },
    { path: 'desktop', loadChildren: () => import('./applications/applications.routes').then((m) => m.APPLICATIONS_ROUTES) },
    { path: '', redirectTo: '/boot', pathMatch: 'full' },
    { path: '**', redirectTo: '/boot' }

];
