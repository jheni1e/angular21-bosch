import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dtaplace');
  protected _date = signal(this.formatDate(new Date()));

  ngOnInit() {
    console.log(this.title()) //mostra 'dtaplace'
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
