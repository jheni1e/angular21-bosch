import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class PixelApi extends Api {
  getPixel = () : Observable<string> => {
    return this.client.get<string>(`${this.URL}/pixel`).pipe();
  }
}
