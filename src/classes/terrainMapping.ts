/// <reference path="../_references.ts" />

import {terrainTotals} from "../interfaces/terrainTotals";
import {terrain} from "../interfaces/terrain";

export class terrainMapping {
    public mapTerrain(roomName: string): terrain {
        return { totals: this.terrainTotals(roomName) };
    }

    private terrainTotals(roomName: string): terrainTotals {
        let roomLookAtArea: LookAtResultMatrix | LookAtResultWithPos[] = Game.rooms[roomName].lookAtArea(0,0,50,50,true);
        let terrainArea: LookAtResultWithPos[] = <LookAtResultWithPos[]>roomLookAtArea;
        let terrainType: terrainTotals = { plains: 0, swamps: 0, walls: 0, total: 0 };

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