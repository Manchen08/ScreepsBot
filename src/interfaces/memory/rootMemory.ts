/// <reference path="../../_references.ts" />
import {roomsMemory} from "./roomsMemory";
import {creepsMemory} from "./creepsMemory";

export interface Memory {
    creeps: creepsMemory,
    rooms: roomsMemory
}