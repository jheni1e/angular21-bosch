import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonInfo } from '../../shared/button-info/button-info';
import { Screen } from '../../components/screen/screen';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, ButtonInfo, Screen],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  constructor(private router: Router) { }

  goToRegister = () => {
    this.router.navigate(['/register']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

  salvar = () => {
    console.log("...");
  }
}
