/// <reference path="../../_references.ts" />
import {LoDashImplicitObjectWrapper, LoDashStatic} from "lodash";
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";
import {creepEnergySourceMemory} from "../../interfaces/memory/creeps/creepEnergySourceMemory";
declare const _: LoDashStatic;

export class creepSpawnCarrierController {
    public static initialize(creep: Creep): void {
        let creepCarryAmount: number;

        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource.objectId
            && creep.memory.energySource._cacheExpire > Game.time)) {

            creepSpawnCarrierController.assignEnergySource(creep);

        }

        if (!creep.memory.paths || (creep.memory && creep.memory.paths && creep.memory.paths[creep.memory.energySource.objectId]
            && creep.memory.paths[creep.memory.energySource.objectId]._cacheExpire > Game.time)) {

            creepSpawnCarrierController.assignPaths(creep,
                [creep.memory.energySource.objectId, Memory.rooms[creep.room.name].structures.spawns[0].id]);

        }

        creepCarryAmount = _.sum(creep.carry);
        if (creepCarryAmount < creep.carryCapacity) {
            creepSpawnCarrierController.fetchEnergy(creep);
        }

        if (creepCarryAmount >= creep.carryCapacity) {
            creepSpawnCarrierController.deliverEnergy(creep);
        }
    }

    private static deliverEnergy(creep: Creep): void {
        let spawn: StructureSpawn = Memory.rooms[creep.room.name].structures.spawns[0];
        if (creep.transfer(<StructureSpawn>Game.getObjectById(spawn.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveByPath(creep.memory.paths[spawn.id].serialized);
        }
    }

    private static fetchEnergy(creep: Creep): void {
        if (creep.memory && creep.memory.energySource && creep.memory.energySource.objectId) {
            creep.moveByPath(Room.deserializePath(creep.memory.paths[creep.memory.energySource.objectId].serialized));
        }
    }

    private static assignEnergySource(creep: Creep): void {
        let creepType: string = CREEP_EXTRACTOR;
        let energySources: Source[];
        let extractedResource: Resource;
        let memoryEnergySource: creepEnergySourceMemory;

        energySources = roomClass.energySources(creep.room.name);
        energySources = energySources.sort((a: Source, b: Source) => {
            let creepAssignedToA: number = Memory.rooms[creep.memory.room].terrain.energySources.filter((src: Source) => src.id === a.id)[0].creepsAssigned[creepType];
            let creepAssignedToB: number = Memory.rooms[creep.memory.room].terrain.energySources.filter((src: Source) => src.id === b.id)[0].creepsAssigned[creepType];
            let creepDistanceToA: number = creep.pos.getRangeTo(a.pos);
            let creepDistanceToB: number = creep.pos.getRangeTo(b.pos);

            return (creepAssignedToA != creepAssignedToB) ? creepAssignedToA - creepAssignedToB : creepDistanceToA - creepDistanceToB;
        });

        extractedResource = <Resource>energySources[0].pos.findInRange(FIND_DROPPED_RESOURCES, 1)[0];

        memoryEnergySource = {
            _cacheExpire: Game.time + config.cacheTimeExpire.creepSource,
            objectId: energySources[0].id,
            extractedResourceId: (extractedResource && extractedResource.id) ? extractedResource.id : ''
        };

        creep.memory.energySource = memoryEnergySource;
    }

    private static assignPaths(creep: Creep, objectIds: string[]): void {
        let creepPath: PathStep[];
        let serializedPath: string;

        if (!creep.memory.paths) {
            creep.memory.paths = {};
        }

        for (let i=0; i<objectIds.length; i++) {
            let destinationId: string = objectIds[i];

            creepPath = creep.pos.findPathTo(<RoomPosition>Game.getObjectById(destinationId));
            serializedPath = Room.serializePath(creepPath);

            creep.memory.paths[destinationId] = {
                _cacheExpire: Game.time + config.cacheTimeExpire.serializedPaths,
                serialized: serializedPath
            };
        }
    }
}