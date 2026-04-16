import { PixelDto } from "./PixelInterfaces";

export interface WebSocketMessage<T> {
    Type: MessageType,
    Data: T
}

export enum MessageType {
    Message,
    PlayerAction,
    FirstConnection
}

export type CanvasAction =
    |  {type: "FULL_LOAD"; payload: PixelDto[]}
    |  {type: "SINGLE_LOAD"; payload: PixelDto}