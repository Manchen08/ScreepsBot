/// <reference path="./_references.ts" />

import {TerrainTotals} from "./interfaces.TerrainTotals";
import {Terrain} from "./interfaces.Terrain";

export class terrainMapping {
    public static mapTerrain(roomName: string): Terrain {
        return { totals: terrainMapping.terrainTotals(roomName) };
    }

    private static terrainTotals(roomName: string): TerrainTotals {
        let roomLookAtArea: LookAtResultMatrix | LookAtResultWithPos[] = Game.rooms[roomName].lookAtArea(0,0,50,50,true);
        let terrainArea: LookAtResultWithPos[] = <LookAtResultWithPos[]>roomLookAtArea;
        let terrainType: TerrainTotals = { plains: 0, swamps: 0, walls: 0, total: 0 };

        for(let i=0;i<terrainArea.length;i++) {
            let spot = terrainArea[i];
            if (spot['type'] != 'terrain') continue;

            if (spot['terrain'] == 'plain') terrainType.plains++;
            if (spot['terrain'] == 'swamp') terrainType.swamps++;
            if (spot['terrain'] == 'wall') terrainType.walls++;

            terrainType.total++
        }
        return terrainType;
    }
}