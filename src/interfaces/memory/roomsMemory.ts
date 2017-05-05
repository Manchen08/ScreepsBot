/// <reference path="../../_references.ts" />
import {Terrain} from "../Terrain";
import {StrategicLandscape} from "../StrategicLandscape";
import {structureMemory} from "./rooms/structureMemory";
import {structurePathMemory} from "./rooms/structurePathMemory";
import {spawnDataMemory} from "./rooms/spawnDataMemory";

export interface roomsMemory {
    creepsCount: {[type: string]: number},
    structurePaths: structurePathMemory[],
    terrain: Terrain,
    spawnData: spawnDataMemory,
    strategicLandscape: StrategicLandscape
    structures: {
        containers: structureMemory[],
        controller: structureMemory,
        extensions: structureMemory[],
        extractors: structureMemory[],
        keeperlairs: structureMemory[],
        labs: structureMemory[],
        links: structureMemory[],
        nukers: structureMemory[],
        observers: structureMemory[],
        powerbanks: structureMemory[],
        powerspawns: structureMemory[],
        portals: structureMemory[],
        ramparts: structureMemory[],
        roads: structureMemory[],
        spawns: structureMemory[],
        storages: structureMemory[],
        terminals: structureMemory[],
        towers: structureMemory[],
        walls: structureMemory[]
    }
}