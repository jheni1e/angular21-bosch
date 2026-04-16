import { Component, OnInit, signal } from '@angular/core';
import { RoomApi } from '../../domain/room.api';
import { ActivatedRoute } from '@angular/router';
import { PixelDto } from '../../domain/PixelInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-especific-room',
  imports: [],
  templateUrl: './especific-room.html',
  styleUrl: './especific-room.css',
})
export class EspecificRoom implements OnInit {
  constructor(private roomApi: RoomApi, private router: ActivatedRoute) { }

  private idRoom: string = "";
  protected pixels = signal<PixelDto[][]>([]);
  private pixelSubscription!: Subscription;

  ngOnInit(): void {
    this.router.paramMap.forEach(param => {
      this.idRoom = param.get("id") ?? "";
    })

    let lines = [];
    for (let i = 0; i < 50; i++) {
      let line: PixelDto[] = [];
      for (let j = 0; j < 50; j++) {
        line.push({
          color: "gainsboro",
          x: j,
          y: i
        });
      }
      lines.push(line);
    }

    this.pixels.set(lines);

    this.roomApi.connect(this.idRoom);

    this.pixelSubscription = this.roomApi.pixelsObservable.subscribe(res => {
      switch (res.type) {
        case 'FULL_LOAD':
          this.updateOnInit(res.payload);
          break;
        case 'SINGLE_LOAD':
          this.updateSinglePixel(res.payload);
          break;
        default:
          break;
      }
    });
  }

  updateSinglePixel = (data: PixelDto) => {
    this.pixels.update(oldValue => {
      return oldValue.map(line => {
        return line.map(pixel => {
          if (pixel.x == data.x && pixel.y == data.y) {
            return data;
          } else {
            return pixel;
          }
        })
      })
    })
  }

  updateOnInit = (data: PixelDto[]) => {
    this.pixels.update(oldValue => {
      var cloneList = [...oldValue];

      data.forEach(item => {
        cloneList[item.y][item.x] = item;
      })

      return cloneList;
    })
  }

  ngOnDestroy = () => {
    this.roomApi.closeConnection();
    this.pixelSubscription.unsubscribe();
  }
}
