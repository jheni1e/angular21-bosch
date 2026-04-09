import { Injectable } from '@angular/core';
import { Api } from './api';
import { LoginDto } from './UserInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends Api {

  login = (data: LoginDto) => {
    this.client.post(`${this.URL}/auth/login`, data);
  }

  subscribe = (data: LoginDto) => {
    this.client.post(`${this.URL}/auth/subscribe`, data);
  }
}
