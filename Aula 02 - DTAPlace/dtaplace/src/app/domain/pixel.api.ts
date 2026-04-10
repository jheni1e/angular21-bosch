import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { PixelDto } from './PixelInterfaces';

@Injectable({
  providedIn: 'root',
})
export class PixelApi extends Api {
  getPixel = (): Observable<PixelDto[]> => {
    return this.client.get<PixelDto[]>(`${this.URL}/pixel`).pipe();
  }

  drawPixel = (data: PixelDto): Observable<void> => {
    const token = sessionStorage.getItem('token');

    const headers = {
      'Authorization': `${token}`
    };

    return this.client.post<void>(`${this.URL}/pixel`, data, { headers }).pipe();
  }
}
