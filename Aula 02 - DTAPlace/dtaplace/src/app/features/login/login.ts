import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output()
  dataChange: EventEmitter<string> = new EventEmitter();

  user: string = "";
  pw: string = "";

  userChanged = (e: Event) => {
    this.user = (e.target as HTMLInputElement).value;
  }

  pwChanged(e: Event) {
    this.pw = (e.target as HTMLInputElement).value;
  }

  submit() {
    if (!this.pw) {
      alert('Please type a password.');
      return;
    }

    if (!this.user) {
      alert('Please type a username.');
      return;
    }

    console.log("Account logged successfuly!");
    console.log("user: " + this.user + " pw: " + this.pw);
  }
}
