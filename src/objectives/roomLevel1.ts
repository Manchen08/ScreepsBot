/// <reference path="../_references.ts" />
import {initializeRoom} from '../controllers/initializeRoomController';
import {strategicLandscape} from "../controllers/strategicLandscapeController";
import {pathMapping} from "../classes/pathMapping";

export class roomLevel1 {
    public constructor(roomName: string) {
        initializeRoom.initialize(roomName);
        strategicLandscape.initialize(roomName);
        pathMapping.initialize(roomName);
    }
}