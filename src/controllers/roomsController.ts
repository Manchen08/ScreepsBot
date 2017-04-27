/// <reference path="../_references.ts" />
import {objectivesController}   from '../controllers/objectivesController';

interface _Game extends Game {
    ownedRooms(): { [roomName: string]: Room }
}

export class roomsController {
    public static initialize(): void {
        roomsController.executeAllRooms();
    }

    public static executeAllRooms(): void {
        let _Game: _Game = <_Game>Game;
        let objectivesCtl: objectivesController = new objectivesController();
        let ownedRooms: { [roomName: string]: Room } = _Game.ownedRooms();

        for (let myRoom in ownedRooms) {
            let level: number = (Game.rooms[myRoom].controller) ? Game.rooms[myRoom].controller.level : 1;
            objectivesCtl.pursueRoomLevel(myRoom, level);
        }
    }
}