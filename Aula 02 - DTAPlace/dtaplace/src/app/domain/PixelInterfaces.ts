import { UserPixel } from "./UserInterfaces";

export interface PixelDto {
  x: number;
  y: number;
  color: string;
}

export interface PaintPixel {
  x: number;
  y: number;
  color: string;
  lastChange: Date;
  user: UserPixel;
}