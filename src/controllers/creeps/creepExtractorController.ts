/// <reference path="../../_references.ts" />
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";

export class creepExtractorController {
    public static initialize(creep: Creep): void {
        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource._cacheExpire > Game.time)) {
            creepExtractorController.assignEnergySource(creep);
        }
    }

    private static assignEnergySource(creep: Creep): void {
        let creepType: string = CREEP_EXTRACTOR;
        let energySources: Source[];

        energySources = roomClass.energySources(creep.room.name);
        energySources = energySources.sort((a:Source,b:Source) => {
            let creepAssignedToA: number = Memory.rooms[creep.memory.room].terrain.energySources.filter((src: Source) => src.id === a.id)[0].creepsAssigned[creepType];
            let creepAssignedToB: number = Memory.rooms[creep.memory.room].terrain.energySources.filter((src: Source) => src.id === b.id)[0].creepsAssigned[creepType];

            let creepDistanceToA: number = creep.pos.getRangeTo(a.pos);
            let creepDistanceToB: number = creep.pos.getRangeTo(b.pos);


            return (creepAssignedToA != creepAssignedToB) ? creepAssignedToA - creepAssignedToB : creepDistanceToA - creepDistanceToB;
        });

        creep.memory.energySource = {
            _cacheExpire: Game.time + config.cacheTimeExpire.creepSource,
            id: energySources[0].id
        };
    }

    private static moveToEnergySource(): void {

    }
}