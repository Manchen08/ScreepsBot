/// <reference path="_references.ts" />
import {gameController} from "./controllers/gameController";
import {roomsController} from "./controllers/roomsController";
import {gamePrototype} from "./prototypes/gamePrototype";
import {consolePrototype} from "./prototypes/consolePrototype";
gameController.initialize();


export function loop() {
    consolePrototype.initialize();
    gamePrototype.initialize();
    roomsController.initialize();
}
