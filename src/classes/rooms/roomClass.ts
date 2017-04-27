/// <reference path="../../_references.ts" />
import {terrainMapping} from "./terrainMappingClass";

export class roomClass {
    public static energySourcesSorted(roomName: string, roomObject: RoomObject): Source[] {
        let energySourcesSorted: Source[] = [];
        let terrainEnergySources: {id: string, x: number, y: number, creepsAssigned: number}[] = [];

        terrainEnergySources = terrainMapping.mapTerrain(roomName).energySources;

        // TODO

        energySourcesSorted = <Source[]>terrainEnergySources.map((src: {id: string, x: number, y: number, creepsAssigned: number}) => Game.getObjectById(src.id));

        return energySourcesSorted;
    }

    public static energySources(roomName: string): Source[] {
        let energySources: Source[] = [];
        let terrainEnergySources: {id: string, x: number, y: number, creepsAssigned: number}[] = [];

        if (Memory.rooms[roomName] && Memory.rooms[roomName].terrain && Memory.rooms[roomName].terrain.energySources) {
            return Memory.rooms[roomName].terrain.energySources
                .map((src: {id: string, x: number, y: number, creepsAssigned: number}) => Game.getObjectById(src.id));
        }

        terrainEnergySources = terrainMapping.mapTerrain(roomName).energySources;
        energySources = <Source[]>terrainEnergySources.map((src: {id: string, x: number, y: number, creepsAssigned: number}) => Game.getObjectById(src.id));

        Memory.rooms[roomName].terrain.energySources = terrainEnergySources;

        return energySources;
    }
}