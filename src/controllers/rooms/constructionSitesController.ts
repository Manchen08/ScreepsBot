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

        if (!Memory.rooms[roomName].constructionSites)
            Memory.rooms[roomName].constructionSites = [];

        for (let p=0; p<pathGoals.length; p++) {
            let pathGoal: pathGoal = pathGoals[p];
            for (let t=0; t<pathGoal.toIdArr.length; t++) {

                let fromId: string = pathGoal.fromId;
                let toId: string = pathGoal.toIdArr[t];
                let fromObj: RoomObject = <RoomObject>Game.getObjectById(fromId);
                let toObj: RoomObject = <RoomObject>Game.getObjectById(toId);
                let pathArr: PathStep[];
                let structurePathIndex: number = 0;
                let serializedPath: string;
                let structurePath: structurePathMemory;

                // Find pathGoal (structurePaths) in memory
                for (; structurePathIndex<Memory.rooms[roomName].structurePaths.length; structurePathIndex++) {
                    let memStructurePath: structurePathMemory = Memory.rooms[roomName].structurePaths[structurePathIndex];
                    if ((memStructurePath.fromId == fromId && memStructurePath.toId == toId) || (memStructurePath.fromId == toId && memStructurePath.toId == fromId)) {
                        structurePath = memStructurePath;
                        break;
                    }
                }

                if (structurePath && structurePath.built == true) {
                    continue;
                } else if (structurePath && structurePath.built == false) {
                    if (structurePath.serialized && constructionSitesController.pathIsRoads(roomName, structurePath.serialized)) {
                        Memory.rooms[roomName].structurePaths[structurePathIndex].built = true;
                    }
                    return;
                }

                pathArr = fromObj.pos.findPathTo(toObj.pos);
                serializedPath = Room.serializePath(pathArr);

                Memory.rooms[roomName].structurePaths.push({
                    fromId: fromId,
                    toId: toId,
                    serialized: serializedPath,
                    built: false
                });

                pathArr.forEach((path: PathStep) => Game.rooms[roomName].createConstructionSite(path.x, path.y, STRUCTURE_ROAD));

                if (focusedBuild)
                    return
            }
        }
    }

    private static pathIsRoads(roomName: string, serializedPath: string): boolean {
        let pathArr: PathStep[] = Room.deserializePath(serializedPath);

        let roadsOnPath: PathStep[] = pathArr.filter((path: PathStep) => {
            let lookForAt: Structure = <Structure>Game.rooms[roomName].lookForAt(LOOK_STRUCTURES, path.x, path.y)[0];
            return (lookForAt && lookForAt.structureType == 'road');
        });

        return roadsOnPath.length >= pathArr.length-2; // To/From
    }
}