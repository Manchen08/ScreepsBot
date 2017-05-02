/// <reference path="../../_references.ts" />
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";

export class creepSpawnCarrierController {
    public static initialize(creep: Creep): void {
        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource._cacheExpire > Game.time)) {
            creepSpawnCarrierController.assignEnergySource(creep);
        }

        if (!creep.memory.path || (creep.memory && creep.memory.path && creep.memory.path._cacheExpire > Game.time)) {
            creepSpawnCarrierController.assignPath(creep, creep.memory.energySource.id);
        }

        // if (creep.transfer(<Source>Game.getObjectById(creep.memory.energySource.id)) == ERR_NOT_IN_RANGE) {
        //     creep.moveByPath(Room.deserializePath(creep.memory.path.serialized));
        // }

    }

    private static assignEnergySource(creep: Creep): void {
        let creepType: string = CREEP_EXTRACTOR;
        let energySources: Source[];

        energySources = roomClass.energySources(creep.room.name);
        energySources = energySources.sort((a: Source, b: Source) => {
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

    private static assignPath(creep: Creep, destinationId: string): PathStep[] {
        let creepPath: PathStep[];
        let serializedPath: string;

        creepPath = creep.pos.findPathTo(<RoomPosition>Game.getObjectById(destinationId));
        serializedPath = Room.serializePath(creepPath);

        creep.memory.path = {
            _cacheExpire: Game.time + config.cacheTimeExpire.serializedPaths,
            objectId: destinationId,
            serialized: serializedPath
        };

        return creepPath;

    }
}