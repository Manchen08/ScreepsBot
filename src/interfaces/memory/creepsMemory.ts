/// <reference path="../../_references.ts" />
import {creepPathMemory} from "./creeps/creepPathMemory";
import {creepEnergySourceMemory} from "./creeps/creepEnergySourceMemory";

export interface creepsMemory {
    energySource: creepEnergySourceMemory,
    paths: {[objectId: string]: creepPathMemory},
    role: string,
    subRole: string,
    action: string,
    room: string
}