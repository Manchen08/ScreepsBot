/// <reference path="../../../_references.ts" />

export interface terrainEnergySourcesMemory {
    x: number,
    y: number,
    creepsAssigned: { [creepType: string]: number }
}