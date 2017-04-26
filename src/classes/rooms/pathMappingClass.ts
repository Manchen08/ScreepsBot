/// <reference path="../../_references.ts" />

export class pathMapping {
    public static initialize(roomName: string): void {
        if (Memory && Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].structurePaths)
            return;

        let focalPoint: any = Memory.rooms[roomName].structures.spawns[0];

        let items: {id: string, x: number, y: number}[] = [];
        items = items.concat(
            [Memory.rooms[roomName].structures.controller],
            Memory.rooms[roomName].terrain.energySources,
            Memory.rooms[roomName].structures.spawns
        );

        Memory.rooms[roomName].structurePaths = pathMapping.pathsFromFocal(roomName, focalPoint, items);
    }

    private static pathsFromFocal(roomName: string, focalPoint: {id: string, x: number, y: number}, items: {id: string, x: number, y: number}[])
                        : {fromId: string, toId: string, serializedPath: string}[] {
        let pathsFromFocal: {fromId: string, toId: string, serializedPath: string}[] = [];

        for (let i=0;i<items.length;i++) {
            let item: {id: string, x: number, y: number} = items[i];
            let focalPointPos: RoomPosition = new RoomPosition(focalPoint.x, focalPoint.y, roomName);
            let path: PathStep[] = [];

            path = focalPointPos.findPathTo(item.x, item.y);
            pathsFromFocal.push({ fromId: focalPoint.id, toId: items[i].id, serializedPath: Room.serializePath(path) });
        }

        return pathsFromFocal;
    }
}
