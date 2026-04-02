import { Component, ElementRef, Input, ViewChild} from '@angular/core';
import { Pixel } from '../pixel/pixel';

@Component({
  selector: 'app-screen',
  imports: [Pixel],
  templateUrl: './screen.html',
  styleUrl: './screen.css',
})
export class Screen {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private pixelSize = 1;
  private color = '#000';

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.clear();
    this.drawGrid();
  }

  clear() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, 300, 300);
  }

  drawGrid() {
    this.ctx.strokeStyle = '#eee';
    for (let x = 0; x <= 300; x += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 300);
      this.ctx.stroke();
    }
    for (let y = 0; y <= 300; y += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(300, y);
      this.ctx.stroke();
    }
  }

  paintPixel(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  }
}