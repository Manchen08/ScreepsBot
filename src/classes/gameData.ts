import {roomData} from "./roomData";
export class gameData {
    public initialRoom: string;

    public constructor() {
        this.setupGameData();
    }

    private setupGameData() {
        let rData = new roomData();
        this.initialRoom = rData.myRooms()[0];
    }
}