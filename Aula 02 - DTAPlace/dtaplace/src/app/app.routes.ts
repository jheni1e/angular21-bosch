import { Routes } from '@angular/router';
import { Subscribe } from './features/subscribe/subscribe';
import { MainPage } from './features/main-page/main-page';
import { Login } from './features/login/login';
import { authGuard } from './domain/auth-guard';

export const routes: Routes = [
    { path: 'register', component: Subscribe },
    { path: 'login', component: Login },
    { path: '', component: MainPage, canMatch: [authGuard] },
];
