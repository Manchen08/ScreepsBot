/// <reference path="../../_references.ts" />
import {LoDashImplicitObjectWrapper, LoDashStatic} from "lodash";
import {roomClass} from "../../classes/rooms/roomClass";
import {config} from "../../config";
import {creepEnergySourceMemory} from "../../interfaces/memory/creeps/creepEnergySourceMemory";
declare const _: LoDashStatic;

export class creepBuilderController {
    public static initialize(creep: Creep): void {
        if (!creep.memory.energySource || (creep.memory && creep.memory.energySource && creep.memory.energySource.objectId
            && creep.memory.energySource._cacheExpire < Game.time)) {

            creepBuilderController.assignEnergySource(creep);
        }

        creepBuilderController.doActions(creep);
    }

    private static doActions(creep: Creep): void {
        let creepCarryAmount: number = _.sum(creep.carry);

        if (creepCarryAmount <= 0 && creep.memory.action == 'build') {
            creep.memory.action = 'fetch';
        }

        if (creepCarryAmount >= creep.carryCapacity && creep.memory.action == 'fetch') {
            creep.memory.action = 'build';
        }

        if (!creep.memory.action) {
            creep.memory.action = 'fetch';
        }

        switch (creep.memory.action) {
            case 'build': {
                creepBuilderController.goBuild(creep);
                break;
            }
            case 'fetch': {
                creepBuilderController.fetchEnergy(creep);
                break;
            }
        }
    }

    private static goBuild(creep: Creep): void {
        let buildTarget: ConstructionSite = <ConstructionSite>Game.getObjectById(creep.memory.subRole);

        if (!buildTarget) {
            buildTarget = <ConstructionSite>creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            creep.memory.subRole = buildTarget.id;
        }

        if (creep.build(buildTarget) == ERR_NOT_IN_RANGE) {
            creep.moveTo(buildTarget);
        }
    }

    private static fetchEnergy(creep: Creep): void {
        let extractedResource: Resource = null;
        let energySource: Source = null;

        if (creep.memory.energySource && creep.memory.energySource.extractedResourceId)
            extractedResource = <Resource>Game.getObjectById(creep.memory.energySource.extractedResourceId);

        if (creep.memory.energySource && creep.memory.energySource.objectId)
            energySource = <Source>Game.getObjectById(creep.memory.energySource.objectId);

        if (!extractedResource || !energySource)
            creepBuilderController.assignEnergySource(creep);

        if (creep.memory && creep.memory.energySource && creep.memory.energySource.extractedResourceId
            && Game.getObjectById(creep.memory.energySource.extractedResourceId)
            && creep.pickup(<Resource>Game.getObjectById(creep.memory.energySource.extractedResourceId)) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(<Resource>Game.getObjectById(creep.memory.energySource.extractedResourceId));
        } else if (creep.memory && creep.memory.energySource && creep.harvest(<Source>Game.getObjectById(creep.memory.energySource.objectId)) == ERR_NOT_IN_RANGE) {
            // creep.moveTo(<Source>Game.getObjectById(creep.memory.energySource.objectId));
            if (creep.memory.energySource && creep.memory.energySource.objectId && creep.memory.paths && creep.memory.paths[creep.memory.energySource.objectId] && creep.memory.paths[creep.memory.energySource.objectId].serialized) {
                creep.moveByPath(Room.deserializePath(creep.memory.paths[creep.memory.energySource.objectId].serialized));
            }
        }
    }

    private static assignEnergySource(creep: Creep): void {
        let creepType: string = CREEP_UPGRADER;
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

        extractedResource = <Resource>energySources[0].pos.findInRange(FIND_DROPPED_RESOURCES, 1)[0];

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
}