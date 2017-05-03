/// <reference path="../_references.ts" />
import {creepsController} from "../controllers/creepsController";
import {landscapeController} from "../controllers/rooms/landscapeController";
import {pathMapping} from "../classes/rooms/pathMappingClass";
import {spawnsController} from "../controllers/spawns/spawnsController";
import {initializeRoomController} from "../controllers/rooms/initializeRoomController";

export class roomLevel2 {
    public constructor(roomName: string) {
        initializeRoomController.initialize(roomName);
        landscapeController.initialize(roomName);
        pathMapping.initialize(roomName);
        spawnsController.initialize(roomName, [
            {type: CREEP_EXTRACTOR,     min: 2, priority: 10},
            {type: CREEP_BUILDER,       min: 1, priority: 45},
            {type: CREEP_UPGRADER,      min: 4, priority: 30},
            {type: CREEP_SPAWN_CARRIER, min: 1, priority: 15},
            {type: CREEP_TOWER_CARRIER, min: 0, priority: 0}
        ]);
        creepsController.initialize(roomName);
    }
}