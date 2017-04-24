/// <reference path="./_references.ts" />

import {TerrainTotals} from "./interfaces.TerrainTotals";
import {Terrain} from "./interfaces.Terrain";

export class terrainMapping {
    public static mapTerrain(roomName: string): Terrain {
        let area: LookAtResultWithPos[] = terrainMapping.terrainArea(roomName);
        let totals: TerrainTotals = terrainMapping.terrainTotals(roomName, area);

        return { area: area, totals: totals };
    }

    private static terrainArea(roomName: string): LookAtResultWithPos[] {
        let area: LookAtResultWithPos[] = <LookAtResultWithPos[]>Game.rooms[roomName].lookAtArea(0,0,50,50,true);
        return area.filter(spot => spot.type == 'terrain');
    }

    private static terrainTotals(roomName: string, area: LookAtResultWithPos[]): TerrainTotals {
        let terrainType: TerrainTotals = { plains: 0, swamps: 0, walls: 0, total: 0 };

        for(let i=0;i<area.length;i++) {
            let spot = area[i];

            if (spot.terrain == 'plain') terrainType.plains++;
            if (spot.terrain == 'swamp') terrainType.swamps++;
            if (spot.terrain == 'wall') terrainType.walls++;

            terrainType.total++
        }
        return terrainType;
    }
}