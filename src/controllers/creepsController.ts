/// <reference path="../_references.ts" />
import {creepsClass} from "../classes/creeps/creepsClass";

export class creepsController {
    public static initialize(roomName: string): void {
        creepsController.executeAllCreeps();
    }

    public static executeAllCreeps(): void {
        let ownedCreeps: { [creepName: string]: Creep } = Game.creeps;

        for (let ownedCreep in ownedCreeps) {
            let myCreep: Creep = Game.creeps[ownedCreep];
            let myCreepController: creepRoleController = creepsClass.creepRolesControllers[myCreep.memory.role];

            myCreepController.initialize(myCreep);
        }
    }
}

interface creepRoleController {
    initialize(creep: Creep): void
}