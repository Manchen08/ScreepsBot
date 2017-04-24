/// <reference path="_references.ts" />
import {Terrain} from "./interfaces.Terrain";

export class strategicLandscape {
    
    public static initialize(roomName: string) {
        let terrain: Terrain = Memory.rooms[roomName].terrain;
        
        this.constructedWallLocations(roomName, terrain);
        this.extensionLocations(roomName, terrain);
        this.linkLocations(roomName, terrain);
        this.towerLocations(roomName, terrain);
        this.exitPoints(roomName, terrain);
    }
    
    private static constructedWallLocations(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        const TOP: number = 2;
        const RIGHT: number = 47;
        const BOTTOM: number = 47;
        const LEFT: number = 2;

        let constructedWallLocations: {x: number, y: number}[] = [];

        constructedWallLocations.concat(xWall(TOP));
        constructedWallLocations.concat(yWall(RIGHT));
        constructedWallLocations.concat(xWall(BOTTOM));
        constructedWallLocations.concat(yWall(LEFT));

        return constructedWallLocations;

        function xWall(y: number): {x: number, y: number}[] {
            let wallSpots: LookAtResultWithPos[] = terrain.area.filter(spot => spot.y == y && spot.terrain=='plain');
            return wallSpots.map(spot => {return {x: spot.x, y: spot.y}});
        }

        function yWall(x: number): {x: number, y: number}[] {
            let wallSpots: LookAtResultWithPos[] = terrain.area.filter(spot => spot.x == x && spot.terrain=='plain');
            return wallSpots.map(spot => {return {x: spot.x, y: spot.y}});
        }
    }
    
    private static extensionLocations(roomName: string, terrain: Terrain): [{x: number, y: number}] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;    }

    private static linkLocations(roomName: string, terrain: Terrain): [{x: number, y: number}] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;    }

    private static towerLocations(roomName: string, terrain: Terrain): [{x: number, y: number}] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;    }

    private static exitPoints(roomName: string, terrain: Terrain): [{x: number, y: number}] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;    }
}