import { Component, EventEmitter, Output } from '@angular/core';
import { LoginDto } from '../../domain/UserInterfaces';
import { AuthApi } from '../../domain/auth.api';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output()
  dataChange: EventEmitter<string> = new EventEmitter();

  constructor(private authApi: AuthApi, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get Username() {
    return this.loginForm.get("username")
  }

  get Password() {
    return this.loginForm.get("password")
  }

  submit() {
    if (!this.loginForm.valid) {
      alert('Alguns campos estão inválidos.');
      return;
    }

    const data: LoginDto = {
      username: this.Username?.value,
      password: this.Password?.value
    }

    this.authApi.login(data).subscribe(
      res => {
        console.log(res)
        sessionStorage.setItem('token', res);
        location.reload();
      });
  }
}
