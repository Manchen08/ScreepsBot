/// <reference path="../_references.ts" />
import {terrainMapping} from "../classes/terrainMapping";

export class initializeRoom {
    public static initialize(roomName: string): void {
        if (!Memory || !Memory.rooms || !Memory.rooms[roomName] || typeof Memory.rooms[roomName] === "undefined") {
            let spawn: StructureSpawn = <StructureSpawn>Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (s: Structure) => s.structureType == STRUCTURE_SPAWN})[0];

            Memory.rooms = {roomName};
            Memory.rooms[roomName] = {
                structures: {
                    spawns: [{
                        id: spawn.id,
                        name: spawn.name,
                        x: spawn.pos.x,
                        y: spawn.pos.y
                    }]
                },
                terrain: terrainMapping.mapTerrain(roomName)
            };
        }
    }
}