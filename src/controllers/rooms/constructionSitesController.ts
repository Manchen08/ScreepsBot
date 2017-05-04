/// <reference path="../../_references.ts" />
import {structurePathMemory} from "../../interfaces/memory/rooms/structurePathMemory";

export interface pathGoal {
    fromIdArr: string[],
    toIdArr: string[],
    priority: number
}

export class constructionSitesController {
    public static constructPaths(roomName: string, pathGoals: pathGoal[], focusedBuild: boolean=true): void {
        pathGoals.sort((a: pathGoal, b: pathGoal) => a.priority - b.priority);

        for (let p=0; p<pathGoals.length; p++) {
            let pathGoal: pathGoal = pathGoals[p];
            for (let f=0; f<pathGoal.fromIdArr.length; f++) {
                let fromId: string = pathGoal.fromIdArr[f];
                for (let t=0; t<pathGoal.toIdArr.length; t++) {

                    let toId: string = pathGoal.toIdArr[t];
                    let structurePath: structurePathMemory;
                    let pathArr: PathStep[] = [];

                    structurePath = Memory.rooms[roomName].structurePaths
                        .filter((path: structurePathMemory) => path.fromId == fromId && path.toId == toId)[0];

                    if (!structurePath) {
                        let fromObj: RoomObject = <RoomObject>Game.getObjectById(fromId);
                        let toObj: RoomObject = <RoomObject>Game.getObjectById(toId);

                        pathArr = fromObj.pos.findPathTo(toObj.pos);
                        Memory.rooms[roomName].structurePaths.push({fromId: fromId, toId: toId, serializedPath: Room.serializePath(pathArr)});
                    } else {
                        pathArr = Room.deserializePath(structurePath.serializedPath);
                    }

                    pathArr.forEach((path: PathStep) => {
                        let roomPosition: RoomPosition = new RoomPosition(path.x, path.y, roomName);
                        Game.rooms[roomName].createConstructionSite(roomPosition, STRUCTURE_ROAD);
                    });
                    Memory.rooms[roomName].structurePaths
                        .filter((path: structurePathMemory) => path.fromId == fromId && path.toId == toId)[0].plotted = true;

                }
            }
        }
    }
}