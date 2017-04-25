/// <reference path="../_references.ts" />
import {TerrainTotals} from "../interfaces/TerrainTotals";
import {Terrain} from "../interfaces/Terrain";

export class terrainMapping {
    public static mapTerrain(roomName: string): Terrain {
        let area: LookAtResultWithPos[] = terrainMapping.terrainArea(roomName);
        let energySources: {id: string, x: number, y: number}[] = terrainMapping.energySources(roomName);
        let totals: TerrainTotals = terrainMapping.terrainTotals(roomName, area);

        return { area: area, energySources: energySources, totals: totals };
    }

    private static terrainArea(roomName: string): LookAtResultWithPos[] {
        let area: LookAtResultWithPos[] = <LookAtResultWithPos[]>Game.rooms[roomName].lookAtArea(0,0,50,50,true);
        return area.filter(spot => spot.type == 'terrain');
    }

    private static energySources(roomName: string): {id: string, x: number, y: number}[] {
        let energySources: Resource[] = <Resource[]>Game.rooms[roomName].find(FIND_SOURCES);
        return energySources.map(source => {return {id: source.id, x: source.pos.x, y: source.pos.y}});
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
