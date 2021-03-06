/// <reference path="../../_references.ts" />
import {LoDashImplicitObjectWrapper, LoDashStatic} from "lodash";
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";
import {creepEnergySourceMemory} from "../../interfaces/memory/creeps/creepEnergySourceMemory";
import {timerClass} from "../../classes/timerClass";
declare const _: LoDashStatic;

export class creepExtractorController {
    public static initialize(creep: Creep): void {
        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource.objectId
            && creep.memory.energySource._cacheExpire < Game.time)) {
            creepExtractorController.assignEnergySource(creep);
        }

        if (!creep.memory.paths || (creep.memory && creep.memory.paths && creep.memory.paths[creep.memory.energySource.objectId]
            && creep.memory.paths[creep.memory.energySource.objectId]._cacheExpire > Game.time)) {
            creepExtractorController.assignPath(creep, creep.memory.energySource.objectId);
        }

        creepExtractorController.doActions(creep);
    }

    private static doActions(creep: Creep): void {
        let creepCarryAmount: number;

        creepCarryAmount = _.sum(creep.carry);
        if (creepCarryAmount < creep.carryCapacity) {
            creepExtractorController.harvestEnergy(creep);
        }

        if (creepCarryAmount >= creep.carryCapacity) {
            var disTimer = new timerClass();
            disTimer.start();
            creepExtractorController.distributeEnergy(creep);
        }
    }

    private static harvestEnergy(creep: Creep): void {
        if (creep.memory && creep.memory.energySource && creep.harvest(<Source>Game.getObjectById(creep.memory.energySource.objectId)) == ERR_NOT_IN_RANGE) {
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
            let cntAssignedToA: number = (!isNaN(parseInt(Memory.rooms[creep.memory.room].terrain.energySources[a.id].creepsAssigned[creepType]))) ? Memory.rooms[creep.memory.room].terrain.energySources[a.id].creepsAssigned[creepType] : 0;
            let cntAssignedToB: number = (!isNaN(parseInt(Memory.rooms[creep.memory.room].terrain.energySources[b.id].creepsAssigned[creepType]))) ? Memory.rooms[creep.memory.room].terrain.energySources[b.id].creepsAssigned[creepType] : 0;
            let creepDistanceToA: number = creep.pos.getRangeTo(a.pos);
            let creepDistanceToB: number = creep.pos.getRangeTo(b.pos);
            return (cntAssignedToA != cntAssignedToB) ? cntAssignedToA - cntAssignedToB : creepDistanceToA - creepDistanceToB;
        });

        extractedResource = <Resource>creep.pos.findInRange(FIND_DROPPED_RESOURCES, 0)[0];

        memoryEnergySource = {
            _cacheExpire: Game.time + config.cacheTimeExpire.creepSource,
            objectId: energySources[0].id,
            extractedResourceId: (extractedResource && extractedResource.id) ? extractedResource.id : ''
        };

        creep.memory.energySource = memoryEnergySource;

        if (Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId]
            && Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId].creepsAssigned
            && Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId].creepsAssigned[creepType])
        {
            Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId].creepsAssigned[creepType]++;
        } else {
            Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId].creepsAssigned = {};
            Memory.rooms[creep.memory.room].terrain.energySources[memoryEnergySource.objectId].creepsAssigned[creepType] = 1;
        }
    }

    private static assignPath(creep: Creep, destinationId: string): void {
        let creepPath: PathStep[];
        let serializedPath: string;

        creepPath = creep.pos.findPathTo(<RoomPosition>Game.getObjectById(destinationId));
        serializedPath = Room.serializePath(creepPath);

        if (!creep.memory.paths) {
            creep.memory.paths = {};
        }

        creep.memory.paths[destinationId] = {
            _cacheExpire: Game.time + config.cacheTimeExpire.serializedPaths,
            serialized: serializedPath
        };
    }

    private static distributeEnergy(creep: Creep): void {
        let structures: Structure[] = <Structure[]>creep.pos.findInRange(FIND_MY_STRUCTURES, 1)
            .filter((structure: Structure) => structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
            .filter((structure: StructureContainer | StructureStorage) => (structure.store < structure.storeCapacity));

        for (let i = 0; i < structures.length; i++) {
            let target: Creep | Structure = structures[i];
            creep.transfer(target, RESOURCE_ENERGY);
        }

        if (structures.length <= 0) {
            creep.drop(RESOURCE_ENERGY);
        }
    }
}