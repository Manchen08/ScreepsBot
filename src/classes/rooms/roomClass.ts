/// <reference path="../../_references.ts" />
import {terrainMapping} from "../../classes/rooms/terrainMappingClass";
import {terrainEnergySourcesMemory} from "../../interfaces/memory/rooms/terrainEnergySourcesMemory";

export class roomClass {
    public static energySources(roomName: string): Source[] {
        let energySources: Source[] = [];
        let terrainEnergySources: {[objectId: string]: terrainEnergySourcesMemory} = {};

        if (!Memory.rooms[roomName].terrain.energySources) {
            terrainEnergySources = terrainMapping.mapTerrain(roomName).energySources;
            Memory.rooms[roomName].terrain.energySources = terrainEnergySources;
        } else {
            terrainEnergySources = Memory.rooms[roomName].terrain.energySources
        }

        for (let sourceId in terrainEnergySources) {
            energySources.push(<Source>Game.getObjectById(sourceId));
        }

        return energySources;
    }
}