/// <reference path="./_references.ts" />
import {Terrain} from "./interfaces.Terrain";
import {strategicLandscape} from "./interfaces.strategicLandscape";

export interface roomsMemory {
    terrain: Terrain,
    strategicLandscape: strategicLandscape
}