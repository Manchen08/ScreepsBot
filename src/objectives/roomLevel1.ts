/// <reference path="../_references.ts" />
import {roomController} from '../controllers/rooms/roomController';
import {landscapeController} from "../controllers/rooms/landscapeController";
import {pathMapping} from "../classes/rooms/pathMappingClass";
import {creepSpawnController} from "../controllers/creeps/creepSpawnController";

export class roomLevel1 {
    public constructor(roomName: string) {
        roomController.initializeRoom(roomName);
        landscapeController.initialize(roomName);
        pathMapping.initialize(roomName);
        creepSpawnController.initialize(roomName, [
            {type: CREEP_EXTRACTOR,     min: 0, priority: 0},
            {type: CREEP_BUILDER,       min: 0, priority: 0},
            {type: CREEP_UPGRADER,      min: 0, priority: 0},
            {type: CREEP_CARRIER_SPAWN, min: 0, priority: 0},
            {type: CREEP_CARRIER_TOWER, min: 0, priority: 0}
        ]);
    }
}