/// <reference path="../_references.ts" />
import {roomController} from '../controllers/rooms/roomController';
import {landscapeController} from "../controllers/rooms/landscapeController";
import {pathMapping} from "../classes/rooms/pathMappingClass";
import {spawnsController} from "../controllers/spawns/spawnsController";
import {creepsController} from "../controllers/creeps/creepsController";

export class roomLevel1 {
    public constructor(roomName: string) {
        roomController.initializeRoom(roomName);
        landscapeController.initialize(roomName);
        pathMapping.initialize(roomName);
        spawnsController.initialize(roomName, [
            {type: CREEP_EXTRACTOR,     min: 1, priority: 10},
            {type: CREEP_BUILDER,       min: 0, priority: 0},
            {type: CREEP_UPGRADER,      min: 0, priority: 0},
            {type: CREEP_CARRIER_SPAWN, min: 1, priority: 15},
            {type: CREEP_CARRIER_TOWER, min: 0, priority: 0}
        ]);
        creepsController.initialize(roomName);
    }
}