/// <reference path="../../_references.ts" />
import {terrainMapping} from "../../classes/rooms/terrainMappingClass";

export class roomClass {
    public static energySources(roomName: string): Source[] {
        let energySources: Source[];
        let terrainEnergySources: {id: string, x: number, y: number, creepsAssigned: { [creepType: string]: number }}[];

        if (Memory.rooms[roomName] && Memory.rooms[roomName].terrain && Memory.rooms[roomName].terrain.energySources) {
            return Memory.rooms[roomName].terrain.energySources
                .map((src: {id: string, x: number, y: number, creepsAssigned: number}) => Game.getObjectById(src.id));
        }

        terrainEnergySources = terrainMapping.mapTerrain(roomName).energySources;
        Memory.rooms[roomName].terrain.energySources = terrainEnergySources;

        energySources = <Source[]>terrainEnergySources.map((src: {id: string, x: number, y: number, creepsAssigned: { [creepType: string]: number }}) => Game.getObjectById(src.id));
        return energySources;
    }
}