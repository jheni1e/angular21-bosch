import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-pixel',
  imports: [],
  templateUrl: './pixel.html',
  styleUrl: './pixel.css',
})
export class Pixel {
  color = signal('#fff');

  @Input() set initialColor(value: string) {
    this.color.set(value);
  }


}
