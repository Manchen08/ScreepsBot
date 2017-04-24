/// <reference path="_references.ts" />
import {terrainMapping} from "./classes.terrainMapping";

export class initializeRoom {
    public constructor(roomName: string) {

        if (!Memory || !Memory.rooms || !Memory.rooms[roomName] || typeof Memory.rooms[roomName] === "undefined") {
            Memory.rooms = {};
            Memory.rooms[roomName] = {
                terrain: terrainMapping.mapTerrain(roomName)
            };
        }
    }
}