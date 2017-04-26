/// <reference path="_references.ts" />
import {gameController} from "./controllers/gameController";
import {loopController} from "./controllers/loopController";

gameController.initialize();

export function loop() {
    loopController.initialize();
}
