/// <reference path="../_references.ts" />
import {TerrainTotals} from "./TerrainTotals";
import {terrainEnergySourcesMemory} from "./memory/rooms/terrainEnergySourcesMemory";

export interface Terrain {
    area: LookAtResultWithPos[],
    energySources: {[objectId: string]: terrainEnergySourcesMemory},
    totals: TerrainTotals
}