import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PaintPixel, PixelDto } from '../../domain/PixelInterfaces';
import { PixelApi } from '../../domain/pixel.api';

@Component({
  selector: 'app-screen',
  imports: [],
  templateUrl: './screen.html',
  styleUrl: './screen.css',
})
export class Screen {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  gridSize = 100;
  pixelSize = 1;
  color = '#000';

  pixels: string[][] = Array.from({ length: 100 }, () => Array(100).fill('#ffffff'));

  constructor(private pixelApi: PixelApi) { }

  ngOnInit() {
    this.pixelApi.getPixel().subscribe((res) => {
      console.log(res)
      this.applyDataToMatrix(res);
      if (this.ctx) {
        this.drawAll();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCanvas();
      this.drawAll();
    }, 0);
  }

  private initCanvas() {
    const canvas = this.canvas.nativeElement;
    canvas.width = canvas.clientWidth || 500;
    canvas.height = canvas.clientHeight || 500;

    this.ctx = canvas.getContext('2d')!;
    this.pixelSize = canvas.width / this.gridSize;
  }

  private applyDataToMatrix(data: PixelDto[]) {
    data.forEach((pixel) => {
      if (pixel.x >= 0 && pixel.x < this.gridSize && pixel.y >= 0 && pixel.y < this.gridSize) {
        this.pixels[pixel.y][pixel.x] = pixel.color;
      }
    });
  }

  drawAll() {
    if (!this.ctx) return;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        if (this.pixels[y][x] !== '#ffffff') {
          this.drawPixel(x, y, this.pixels[y][x]);
        }
      }
    }
  }

  drawPixel(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.pixelSize,
      y * this.pixelSize,
      this.pixelSize,
      this.pixelSize
    );
  }

  handleClick(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.pixelSize);
    const y = Math.floor((event.clientY - rect.top) / this.pixelSize);

    this.setPixel(x, y, this.color);
  }

  setPixel(x: number, y: number, color: string) {
    if (x < 0 || y < 0 || x >= this.gridSize || y >= this.gridSize) return;
    this.pixels[y][x] = color;
    this.drawPixel(x, y, color);

    const newPixel: PaintPixel = {
      color: color,
      lastChange: new Date(),
      user: {
        username: sessionStorage.getItem('username')!
      },
      x: x,
      y: y
    }

    this.pixelApi.drawPixel(newPixel).subscribe(res => console.log(res));
  }

  setColor(e: any) {
    this.color = e.target.value;
  }
}
