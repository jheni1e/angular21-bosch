import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';
import { PixelDto } from './PixelInterfaces';

@Injectable({
  providedIn: 'root',
})
export class PixelApi extends Api {
  getPixel = () : Observable<PixelDto[]> => {
    return this.client.get<PixelDto[]>(`${this.URL}/pixel`).pipe();
  }
}
