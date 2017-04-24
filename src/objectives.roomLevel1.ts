/// <reference path="_references.ts" />
import {initializeRoom} from "./controllers.initializeRoomController";
import {strategicLandscape} from "./controllers.strategicLandscapeController";

export class roomLevel1 {
    public constructor(roomName: string) {
        initializeRoom.initialize(roomName);
        strategicLandscape.initialize(roomName);
    }
}