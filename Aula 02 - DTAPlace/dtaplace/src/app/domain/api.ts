import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  protected readonly URL: string = "http://10.234.197.18:5294"

  constructor(protected client: HttpClient) {}
}
