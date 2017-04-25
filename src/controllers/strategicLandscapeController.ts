/// <reference path="../_references.ts" />
import {Terrain} from "../interfaces/Terrain";

export class strategicLandscape {
    public static initialize(roomName: string) {
        let terrain: Terrain = Memory.rooms[roomName].terrain;

        Memory.rooms[roomName].strategicLandscape = {
            constructedWallLocations: this.constructedWallLocations(roomName, terrain),
            exitPoints: this.exitPoints(roomName, terrain),
            extensionLocations: this.extensionLocations(roomName, terrain),
            linkLocations: this.linkLocations(roomName, terrain),
            towerLocations: this.towerLocations(roomName, terrain)
        };
    }
    
    private static constructedWallLocations(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        const TOP: number = 2;
        const RIGHT: number = 47;
        const BOTTOM: number = 47;
        const LEFT: number = 2;

        let constructedWallLocations: {x: number, y: number}[] = [];

        constructedWallLocations = constructedWallLocations.concat(xWall(TOP), yWall(RIGHT), xWall(BOTTOM), yWall(LEFT));

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

    private static exitPoints(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;
    }

    private static extensionLocations(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        let spawn: {x: number, y: number, name: string, id: string} = Memory.rooms[roomName].structures.spawns[0];
        let extensionLocations: {x: number, y: number}[] = [];

        for (let rowY=spawn.y-5; rowY<spawn.y+6; rowY+=2) {
            for (let rowX=spawn.x-6; rowX<spawn.x-1; rowX+=1) {
                extensionLocations.push({x: rowX, y: rowY});
            }

            for (let rowX=spawn.x+2; rowX<spawn.x+7; rowX+=1) {
                extensionLocations.push({x: rowX, y: rowY});
            }
        }

        return extensionLocations;
    }

    private static linkLocations(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;
    }

    private static towerLocations(roomName: string, terrain: Terrain): {x: number, y: number}[] {
        let pos: [{x: number, y: number}] = [
            {x:2,y:3},
            {x:2,y:3}
        ];

        return pos;
    }
}