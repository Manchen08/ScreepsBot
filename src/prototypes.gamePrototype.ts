/// <reference path="./_references.ts" />

export class gamePrototype {
    public static init() {
        Object.assign(Game, {
            ownedRooms: function(): { [roomName: string]: Room } {
                let roomsList: { [roomName: string]: Room } = Game.rooms;
                let ownedRooms: { [roomName: string]: Room } = {};

                for (let roomName in roomsList) {
                    let room: Room = Game.rooms[roomName];
                    if (room && room.controller && room.controller.my) {
                        ownedRooms[roomName] = room;
                    }
                }

                return ownedRooms;
            }
        });
    }
}

