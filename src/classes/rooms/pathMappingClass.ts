/// <reference path="../../_references.ts" />

import {structurePathMemory} from "../../interfaces/memory/rooms/structurePathMemory";
export class pathMapping {
    public static initialize(roomName: string): void {
        let items: {id: string, x: number, y: number}[] = [];

        if (Memory && Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].structurePaths)
            return;

        let energySources: {id: string, x: number, y: number}[] = [];
        for (let sourceId in Memory.rooms[roomName].terrain.energySources) {
            energySources.push({
                id: sourceId,
                x: Memory.rooms[roomName].terrain.energySources[sourceId].x,
                y: Memory.rooms[roomName].terrain.energySources[sourceId].y
            });
        }

        items = items.concat(items, [Memory.rooms[roomName].structures.controller]);
        items = items.concat(items, energySources);
        items = items.concat(items, Memory.rooms[roomName].structures.spawns);

        Memory.rooms[roomName].structurePaths = pathMapping.pathsFromFocal(roomName, Memory.rooms[roomName].structures.spawns[0], items);
    }

    private static pathsFromFocal(roomName: string, focalPoint: {id: string, x: number, y: number}, items: {id: string, x: number, y: number}[]): structurePathMemory[] {
        let pathsFromFocal: structurePathMemory[] = [];

        for (let i=0;i<items.length;i++) {
            let item: {id: string, x: number, y: number} = items[i];
            let focalPointPos: RoomPosition = new RoomPosition(focalPoint.x, focalPoint.y, roomName);
            let path: PathStep[] = [];

            if (item.id === focalPoint.id) continue;

            path = focalPointPos.findPathTo(item.x, item.y);
            pathsFromFocal.push({ fromId: focalPoint.id, toId: items[i].id, serializedPath: Room.serializePath(path), built: false, plotted: false });
        }

        return pathsFromFocal;
    }
}
