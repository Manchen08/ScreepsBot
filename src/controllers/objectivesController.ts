/// <reference path="../_references.ts" />
import {roomLevel1} from '../objectives/roomLevel1';
import {roomLevel2} from '../objectives/roomLevel2';
import {timerClass} from "../classes/timerClass";

export class objectivesController {

    private roomObjectives = {
        1: roomLevel1,
        2: roomLevel2
    };

    public pursueRoomLevel(roomName: string, roomLevel: number) {
        var roomTimer = new timerClass();
        roomTimer.start();

        new this.roomObjectives[roomLevel](roomName);

        roomTimer.end();
        roomTimer.watchdog(25, (t: number) => 'this.roomObjectives['+roomLevel+']['+roomName+']: '+t+'ms');
    }
}