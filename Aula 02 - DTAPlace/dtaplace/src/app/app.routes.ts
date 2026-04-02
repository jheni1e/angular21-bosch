import { Routes } from '@angular/router';
import { Subscribe } from './features/subscribe/subscribe';
import { MainPage } from './features/main-page/main-page';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'register', component: Subscribe },
];
