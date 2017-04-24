/// <reference path="../_references.ts" />
import {Room} from "../interfaces/Room";

export class roomClass implements Room {
    public controller: Controller | undefined;
    public energyAvailable: number;
    public energyCapacityAvailable: number;
    public memory: any;
    public mode: string;
    public name: string;
    public storage: StructureStorage | undefined;
    public terminal: Terminal | undefined;
    public visual: RoomVisual;

    public constructor(roomName: string) {
        this.name = roomName;
        this.memory = Memory.rooms[roomName];
    }
}