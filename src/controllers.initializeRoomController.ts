/// <reference path="_references.ts" />
import {terrainMapping} from "./classes.terrainMapping";

export class initializeRoom {
    public static initialize(roomName: string) {
        if (!Memory || !Memory.rooms || !Memory.rooms[roomName] || typeof Memory.rooms[roomName] === "undefined") {
            Memory.rooms = {
                roomName
            };
            Memory.rooms[roomName] = {
                terrain: terrainMapping.mapTerrain(roomName)
            };
        }
    }
}