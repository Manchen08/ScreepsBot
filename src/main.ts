/// <reference path="_references.ts" />

import {terrainMapping} from "./classes/terrainMapping";
// import {gameData} from "./classes/gameData";
import {gameData} from "./classes/gameData";

export class loop {
    public constructor() {
        let gData = new gameData();
        let map = new terrainMapping();

        console.log(JSON.stringify(map.mapTerrain(gData.initialRoom)));
    }
}