/// <reference path="../../_references.ts" />
import {TerrainTotals} from "../../interfaces/TerrainTotals";
import {Terrain} from "../../interfaces/Terrain";
import {terrainEnergySourcesMemory} from "../../interfaces/memory/rooms/terrainEnergySourcesMemory";

export class terrainMapping {
    public static mapTerrain(roomName: string): Terrain {
        let mapTerrain: Terrain;
        let area: LookAtResultWithPos[] = terrainMapping.terrainArea(roomName);
        let energySources: {[objectId: string]: terrainEnergySourcesMemory} = terrainMapping.energySources(roomName);
        let totals: TerrainTotals = terrainMapping.terrainTotals(roomName, area);

        mapTerrain = {
            area: area,
            energySources: energySources,
            totals: totals
        };

        return mapTerrain;
    }

    private static terrainArea(roomName: string): LookAtResultWithPos[] {
        let area: LookAtResultWithPos[] = <LookAtResultWithPos[]>Game.rooms[roomName].lookAtArea(0,0,50,50,true);
        return area.filter(spot => spot.type == 'terrain');
    }

    private static energySources(roomName: string): {[objectId: string]: terrainEnergySourcesMemory} {
        let energySources: {[objectId: string]: terrainEnergySourcesMemory} = {};
        let listRoomEnergySources: Resource[] = <Resource[]>Game.rooms[roomName].find(FIND_SOURCES);

        for (let i=0; i<listRoomEnergySources.length; i++) {
            let source: Resource = listRoomEnergySources[i];

            energySources[source.id] = {
                x: source.pos.x,
                y: source.pos.y,
                creepsAssigned: {}
            }
        }

        return energySources;
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
