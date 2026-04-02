import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-info',
  standalone: true,
  imports: [],
  templateUrl: './button-info.html',
  styleUrl: './button-info.css',
})
export class ButtonInfo {
  @Input() label = '';
  @Input() action!: () => void;

  execute() {
    if (this.action) {
      this.action();
    }
  }
}
