/// <reference path="../_references.ts" />
import {constructionSitesController}    from "../controllers/rooms/constructionSitesController";
import {creepsController}               from "../controllers/creepsController";
import {spawnsController}               from "../controllers/spawns/spawnsController";
import {terrainEnergySourcesMemory}     from "../interfaces/memory/rooms/terrainEnergySourcesMemory";

export class roomLevel2 {
    public constructor(roomName: string) {
        spawnsController.initialize(roomName, [
            {type: CREEP_EXTRACTOR,     min: 2, priority: 10},
            {type: CREEP_BUILDER,       min: 1, priority: 45},
            {type: CREEP_UPGRADER,      min: 4, priority: 30},
            {type: CREEP_SPAWN_CARRIER, min: 1, priority: 15},
            {type: CREEP_TOWER_CARRIER, min: 0, priority: 0}
        ]);
        creepsController.initialize(roomName);
        this.constructionSites(roomName);
    }

    private constructionSites(roomName: string): void {
        let spawnId: string = Memory.rooms[roomName].structures.spawns[0].id;
        let controllerId: string = Memory.rooms[roomName].structures.controller.id;
        let energySources: {[objectId: string]: terrainEnergySourcesMemory} = Memory.rooms[roomName].terrain.energySources;
        let energySourcesIdArr: string[] = [];

        for (let sourceId in energySources) {
            energySourcesIdArr.push(sourceId);
        }

        constructionSitesController.constructPaths(roomName, [
            {fromId: spawnId,      toIdArr: energySourcesIdArr, priority: 10},
            {fromId: controllerId, toIdArr: energySourcesIdArr, priority: 20}
        ]);
    }
}