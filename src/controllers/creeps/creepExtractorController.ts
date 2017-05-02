/// <reference path="../../_references.ts" />
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";

export class creepExtractorController {
    public static initialize(creep: Creep): void {
        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource._cacheExpire > Game.time)) {
            creepExtractorController.assignEnergySource(creep);
        }

        if (!creep.memory.path || (creep.memory && creep.memory.path && creep.memory.path._cacheExpire > Game.time)) {
            creepExtractorController.assignPath(creep, creep.memory.energySource.id);
        }

        creepExtractorController.moveToEnergySource(creep, Room.deserializePath(creep.memory.path.serialized));
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

    private static moveToEnergySource(creep: Creep, path: PathStep[]): void {

    }

    private static assignPath(creep: Creep, destinationId: string): PathStep[] {
        let creepPath: PathStep[];

        creepPath = creep.pos.findClosestByPath();



        return creepPath;

    }
}