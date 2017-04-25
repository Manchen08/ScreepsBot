/// <reference path="../../_references.ts" />
import {Terrain} from "../Terrain";
import {StrategicLandscape} from "../StrategicLandscape";

export interface roomsMemory {
    terrain: Terrain,
    strategicLandscape: StrategicLandscape
    structures: {
        containers: {x: number, y: number}[],
        controllers: {x: number, y: number}[],
        extensions: {x: number, y: number}[],
        extractors: {x: number, y: number}[],
        keeperlairs: {x: number, y: number}[],
        labs: {x: number, y: number}[],
        links: {x: number, y: number}[],
        nukers: {x: number, y: number}[],
        observers: {x: number, y: number}[],
        powerbanks: {x: number, y: number}[],
        powerspawns: {x: number, y: number}[],
        portals: {x: number, y: number}[],
        ramparts: {x: number, y: number}[],
        roads: {x: number, y: number}[],
        spawns: {x: number, y: number, name: string, id: string}[],
        storages: {x: number, y: number}[],
        terminals: {x: number, y: number}[],
        towers: {x: number, y: number}[],
        walls: {x: number, y: number}[]
    }
}