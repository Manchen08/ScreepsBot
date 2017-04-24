/// <reference path="./_references.ts" />
import {TerrainTotals} from "./interfaces.TerrainTotals";

export interface Terrain {
    area: LookAtResultWithPos[],
    totals: TerrainTotals
}