/// <reference path="_references.ts" />
import {gameController} from "./controllers/gameController";
import {roomsController} from "./controllers/roomsController";
import {gamePrototype} from "./prototypes/gamePrototype";

gameController.initialize();

export function loop() {
    gamePrototype.initialize();
    roomsController.initialize();
}
