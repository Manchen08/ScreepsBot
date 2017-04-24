/// <reference path="_references.ts" />
import {roomLevel1} from './objectives.roomLevel1';
import {roomLevel2} from './objectives.roomLevel2';

export class objectivesController {

    private roomObjectives = {
        1: roomLevel1,
        2: roomLevel2
    };

    public pursueRoomLevel(roomName: string, roomLevel: number) {
        new this.roomObjectives[roomLevel](roomName);
    }
}