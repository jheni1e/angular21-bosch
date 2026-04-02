import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonInfo } from '../../shared/button-info/button-info';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, ButtonInfo],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  salvar() {
    console.log('Salvando...');
  }
}
