import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-pixel',
  imports: [],
  templateUrl: './pixel.html',
  styleUrl: './pixel.css',
})
export class Pixel {
  @Input() initialColor = '#fff';

  color = signal(this.initialColor);

  toggleColor() {
    this.color.set(this.color() === '#fff' ? '#000' : '#fff');
  }
}
