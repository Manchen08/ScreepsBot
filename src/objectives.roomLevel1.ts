/// <reference path="_references.ts" />
import {initializeRoom} from "./controllers.initializeRoomController";

export class roomLevel1 {
    public constructor(roomName: string) {
        new initializeRoom(roomName);
    }
}