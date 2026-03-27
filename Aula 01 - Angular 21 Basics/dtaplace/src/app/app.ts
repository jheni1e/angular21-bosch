import { Component, computed, Signal, signal } from '@angular/core';
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
  protected _date = signal(new Date());

  protected _stringDate: Signal<string> = computed(() => { //resultado que se atualiza sozinho quando os dados mudam derivado de um signal
    return this._date().toISOString().split('T')[0];
  })

  ngOnInit() {
    console.log(this.title()) //mostra 'dtaplace'
    console.log(`${this._date().getFullYear()}-${this._date().getMonth() + 1}-${this._date().getDate()}`)
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onDateChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this._date.set(new Date(value));
  }

  addDay(add: boolean = true) {
    this._date.update((oldValue) => {
      let day = add ? oldValue.getDate() + 1 : oldValue.getDate() - 1;
      let month = oldValue.getMonth();
      let year = oldValue.getFullYear();

      return new Date(year, month, day);
    })
  }
}
