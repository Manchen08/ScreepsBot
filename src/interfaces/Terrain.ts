/// <reference path="../_references.ts" />
import {TerrainTotals} from "./TerrainTotals";

export interface Terrain {
    area: LookAtResultWithPos[],
    energySources: {
        id: string,
        x: number,
        y: number,
        creepsAssigned: number
    }[],
    totals: TerrainTotals
}