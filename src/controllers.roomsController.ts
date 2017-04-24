/// <reference path="./_references.ts" />
import {objectivesController} from './controllers.objectivesController';

interface _Game extends Game{
    ownedRooms(): { [roomName: string]: Room }
}

export class roomsController {
    public static executeAll() {
        let objectivesCtl: objectivesController = new objectivesController();
        let _Game: _Game = <any>Game;
        let ownedRooms: { [roomName: string]: Room } = _Game.ownedRooms();

        for (let myRoom in ownedRooms) {
            let level: number = 1; // TODO: FIND ROOM LEVEL DYNAMICALLY FROM MEMORY
            objectivesCtl.pursueRoomLevel(myRoom, level);
        }
    }
}