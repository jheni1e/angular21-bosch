import { Component, EventEmitter, Output } from '@angular/core';
import { LoginDto } from '../../domain/UserInterfaces';
import { AuthApi } from '../../domain/auth.api';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  @Output()
  dataChange: EventEmitter<string> = new EventEmitter();

  constructor(private authApi: AuthApi, private router: Router) { }

  subscribeForm : FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get Username() {
    return this.subscribeForm.get("username")
  }

  get Password() {
    return this.subscribeForm.get("password")
  }

  subscribe() {
    if (!this.subscribeForm.valid) {
      alert('Alguns campos estão inválidos.');
      return;
    }

    const data: LoginDto  = {
      username: this.Username?.value,
      password: this.Password?.value
    }

    this.authApi.subscribe(data).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Cadastro falhou.', err);
        alert('Cadastro falhou: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
