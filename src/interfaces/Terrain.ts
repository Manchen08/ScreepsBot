/// <reference path="../_references.ts" />
import {TerrainTotals} from "./TerrainTotals";

export interface Terrain {
    area: LookAtResultWithPos[],
    totals: TerrainTotals
}