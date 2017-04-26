/// <reference path="../_references.ts" />
import {objectivesController} from '../controllers/objectivesController';
import {gamePrototype} from "../prototypes/gamePrototype";

interface _Game extends Game {
    ownedRooms(): { [roomName: string]: Room }
}

export class loopController {
    public static initialize(): void {
        // console.log('loopController()');
        gamePrototype.init();
        loopController.executeAllRooms();
    }

    public static executeAllRooms(): void {
        let _Game: _Game = <_Game>Game;
        let objectivesCtl: objectivesController = new objectivesController();
        let ownedRooms: { [roomName: string]: Room } = _Game.ownedRooms();

        for (let myRoom in ownedRooms) {
            let level: number = 1; // TODO: FIND ROOM LEVEL DYNAMICALLY FROM MEMORY
            objectivesCtl.pursueRoomLevel(myRoom, level);
        }
    }
}