/// <reference path="../../_references.ts" />
import {LoDashImplicitObjectWrapper, LoDashStatic} from "lodash";
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";
import {creepEnergySourceMemory} from "../../interfaces/memory/creeps/creepEnergySourceMemory";
declare const _: LoDashStatic;

export class creepExtractorController {
    public static initialize(creep: Creep): void {
        let creepCarryAmount: number;

        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource.objectId
            && creep.memory.energySource._cacheExpire > Game.time)) {
            creepExtractorController.assignEnergySource(creep);
        }

        if (!creep.memory.paths || (creep.memory && creep.memory.paths && creep.memory.paths[creep.memory.energySource.objectId]
            && creep.memory.paths[creep.memory.energySource.objectId]._cacheExpire > Game.time)) {
            creepExtractorController.assignPath(creep, creep.memory.energySource.objectId);
        }

        creepCarryAmount = _.sum(creep.carry);
        if (creepCarryAmount < creep.carryCapacity) {
            creepExtractorController.harvestEnergy(creep);
        }

        if (creepCarryAmount >= creep.carryCapacity) {
            creepExtractorController.distributeEnergy(creep);
        }
    }

    private static harvestEnergy(creep: Creep): void {
        if (creep.memory && creep.memory.energySource && creep.harvest(<Source>Game.getObjectById(creep.memory.energySource.objectId)) == ERR_NOT_IN_RANGE) {
            creep.moveByPath(Room.deserializePath(creep.memory.paths[creep.memory.energySource.objectId].serialized));
        }

        if (creep.memory && creep.memory.energySource && creep.memory.energySource.extractedResourceId) {
            creep.harvest(<Source>Game.getObjectById(creep.memory.energySource.extractedResourceId));
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

        extractedResource = <Resource>creep.pos.findInRange(FIND_DROPPED_RESOURCES, 0)[0];

        memoryEnergySource = {
            _cacheExpire: Game.time + config.cacheTimeExpire.creepSource,
            objectId: energySources[0].id,
            extractedResourceId: (extractedResource && extractedResource.id) ? extractedResource.id : ''
        };

        creep.memory.energySource = memoryEnergySource;
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
        let distributeTargets: any[] = [];
        let creeps: Creep[] = <Creep[]>creep.pos.findInRange(FIND_MY_CREEPS, 1)
            .filter((creep: Creep) => _.sum(creep.carry) < creep.carryCapacity);
        let structures: Structure[] = <Structure[]>creep.pos.findInRange(FIND_MY_STRUCTURES, 1)
            .filter((structure: Structure) => structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
            .filter((structure: StructureContainer | StructureStorage) => (structure.store < structure.storeCapacity));

        distributeTargets = distributeTargets.concat(creeps, structures);

        for (let i = 0; i < distributeTargets.length; i++) {
            let target: Creep | Structure = distributeTargets[i];
            creep.transfer(target, RESOURCE_ENERGY);
        }

        if (distributeTargets.length <= 0) {
            creep.drop(RESOURCE_ENERGY);
        }
    }
}