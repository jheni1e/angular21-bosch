import { Injectable } from '@angular/core';
import { Api } from './api';
import { LoginDto } from './UserInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends Api {
  login = (data: LoginDto) : Observable<string> => {
    return this.client.post<string>(`${this.URL}/auth/login`, data).pipe();
  }

  subscribe = (data: LoginDto) : Observable<void> => {
    return this.client.post<void>(`${this.URL}/auth/subscribe`, data).pipe();
  }
}
