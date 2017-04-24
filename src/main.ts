/// <reference path="_references.ts" />
import {roomsController} from "./controllers/roomsController";
import {gamePrototype} from "./prototypes/gamePrototype";

export function loop() {
    gamePrototype.init();

    roomsController.executeAll();
}
