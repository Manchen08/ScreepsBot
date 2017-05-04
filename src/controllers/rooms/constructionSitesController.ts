/// <reference path="../../_references.ts" />

import {structurePathMemory} from "../../interfaces/memory/rooms/structurePathMemory";
export interface pathGoal {
    fromId: string,
    toIdArr: string[],
    priority: number
}

export class constructionSitesController {
    public static constructPaths(roomName: string, pathGoals: pathGoal[], focusedBuild: boolean=true): void {
        pathGoals.sort((a: pathGoal, b: pathGoal) => a.priority - b.priority);

        if (!Memory.rooms[roomName].structurePaths)
            Memory.rooms[roomName].structurePaths = [];

        for (let p=0; p<pathGoals.length; p++) {
            let pathGoal: pathGoal = pathGoals[p];
            for (let t=0; t<pathGoal.toIdArr.length; t++) {

                let fromId: string = pathGoal.fromId;
                let toId: string = pathGoal.toIdArr[t];
                let fromObj: RoomObject;
                let toObj: RoomObject;
                let pathArr: PathStep[];
                let structurePath: structurePathMemory;

                for (let i=0; i<Memory.rooms[roomName].structurePaths.length; i++) {
                    let memStructurePath: structurePathMemory = Memory.rooms[roomName].structurePaths[i];
                    if ((memStructurePath.fromId == fromId && memStructurePath.toId == toId) || (memStructurePath.fromId == toId && memStructurePath.toId == fromId)) {
                        structurePath = memStructurePath;
                    }
                }

                if (structurePath && structurePath.built == true) {
                    continue
                } else if (structurePath && structurePath.built == false) {
                    return
                }

                fromObj = <RoomObject>Game.getObjectById(fromId);
                toObj = <RoomObject>Game.getObjectById(toId);
                pathArr = fromObj.pos.findPathTo(toObj.pos);

                Memory.rooms[roomName].structurePaths.push({
                    fromId: fromId,
                    toId: toId,
                    built: false
                });

                pathArr.forEach((path: PathStep) => {
                    let roomPosition: RoomPosition = new RoomPosition(path.x, path.y, roomName);
                    Game.rooms[roomName].createConstructionSite(roomPosition, STRUCTURE_ROAD);
                });

                if (focusedBuild)
                    return
            }
        }

    }
}