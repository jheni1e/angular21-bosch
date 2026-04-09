import { Component, ElementRef, ViewChild } from '@angular/core';
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

  gridSize = 300;
  pixelSize = 1;

  pixels: string[][] = [];
  color = '#000';

  ngOnInit() {
    this.pixels = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => '#fff')
    );
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.drawAll();
  }

  setColor(event: any) {
    this.color = event.target.value;
  }

  setPixel(x: number, y: number, color: string) {
    this.pixels[y][x] = color;
    this.drawPixel(x, y, color);
  }

  drawPixel(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  }

  drawAll() {
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        this.drawPixel(x, y, this.pixels[y][x]);
      }
    }
  }

  handleClick(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    const scaleX = this.gridSize / rect.width;
    const scaleY = this.gridSize / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    this.sendPixelToAPI(x, y, this.color);
  }

  sendPixelToAPI(x: number, y: number, color: string) {
    // conecta com a api ?
  }

  onPixelFromAPI(data: { x: number; y: number; color: string }) {
    this.setPixel(data.x, data.y, data.color);
  }
}