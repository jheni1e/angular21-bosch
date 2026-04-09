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

  private gridSize = 300;
  private pixelSize = 1;
  private color = '#000';

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.gridSize, this.gridSize);
  }

  setColor(event: any) {
    this.color = event.target.value;
  }

  paintPixel(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    const scaleX = this.gridSize / rect.width;
    const scaleY = this.gridSize / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, 1, 1);
  }
}