export class roomData {
    public constructor() {}

    public myRooms() {
        let roomsList: {[roomName: string]: Room} = Game.rooms;
        let myRooms: string[] = [];

        for (let roomName in roomsList) {
            let room: Room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my)
                myRooms.push(room['name']);
        }

        return myRooms;
    }
}