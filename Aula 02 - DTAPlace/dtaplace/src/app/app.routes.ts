import { Routes } from '@angular/router';
import { Subscribe } from './features/subscribe/subscribe';
import { MainPage } from './features/main-page/main-page';
import { Login } from './features/login/login';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'register', component: Subscribe },
    { path: 'login', component: Login },
];
