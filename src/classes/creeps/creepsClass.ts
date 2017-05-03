import {LoDashImplicitObjectWrapper, LoDashStatic} from "lodash";
import {config} from "../../config";
import {creepBuilderController} from "../../controllers/creeps/creepBuilderController";
import {creepExtractorController} from "../../controllers/creeps/creepExtractorController";
import {creepSpawnCarrierController} from "../../controllers/creeps/creepSpawnCarrierController";
import {creepTowerCarrierController} from "../../controllers/creeps/creepTowerCarrierController";
import {creepUpgraderController} from "../../controllers/creeps/creepUpgraderController";
import {creepWorkerController} from "../../controllers/creeps/creepWorkerController";
declare const _: LoDashStatic;

export class creepsClass {
    public static creepRoles: string[] = [CREEP_EXTRACTOR, CREEP_BUILDER, CREEP_UPGRADER, CREEP_SPAWN_CARRIER, CREEP_TOWER_CARRIER, CREEP_WORKER];
    public static creepRolesControllers: {[role: string]: any} = {
        [CREEP_EXTRACTOR]: creepExtractorController,
        [CREEP_BUILDER]: creepBuilderController,
        [CREEP_UPGRADER]: creepUpgraderController,
        [CREEP_SPAWN_CARRIER]: creepSpawnCarrierController,
        [CREEP_TOWER_CARRIER]: creepTowerCarrierController,
        [CREEP_WORKER]: creepWorkerController
    };

    public static bodyParts(creepRole?: string): string[] {
        let bodyParts: string[] = [];
        creepRole = (creepRole) ? creepRole : CREEP_WORKER;

        switch (creepRole) {
            case CREEP_EXTRACTOR: {
                bodyParts = [WORK, MOVE, CARRY];
                break;
            }
            case CREEP_BUILDER: {
                bodyParts = [WORK, MOVE, CARRY];
                break;
            }
            case CREEP_UPGRADER: {
                bodyParts = [WORK, MOVE, CARRY];
                break;
            }
            case CREEP_SPAWN_CARRIER: {
                bodyParts = [CARRY, MOVE];
                break;
            }
            case CREEP_TOWER_CARRIER: {
                bodyParts = [CARRY, MOVE];
                break;
            }
            case CREEP_WORKER:
            default:  {
                bodyParts = [WORK, MOVE, CARRY];
                break;
            }
        }

        return bodyParts;
    }

    public static creepsCount(roomName: string, bustCache: boolean=false): {[type: string]: number} {
        let creepsCount: {[type: string]: number} = {};
        if (!Game || !Game.creeps) return creepsCount;

        if (!bustCache && (Memory.rooms[roomName] && Memory.rooms[roomName].creepsCount && Memory.rooms[roomName].creepsCount._cacheExpire && Memory.rooms[roomName].creepsCount._cacheExpire > Game.time)) {
            return Memory.rooms[roomName].creepsCount;
        }

        for (let i=0; i<creepsClass.creepRoles.length; i++) {
            let creepRole: string = creepsClass.creepRoles[i];
            let creeps: Creep[] = [];

            creeps = _.filter(Game.creeps, (creep: Creep) => creep.memory.room == roomName);
            creeps = _.filter(creeps, (creep: Creep) => creep.memory.role == creepRole);

            creepsCount[creepRole] = creeps.length;
        }

        if (roomName && Memory.rooms && Memory.rooms[roomName]) {
            Memory.rooms[roomName].creepsCount = creepsCount;
            Memory.rooms[roomName].creepsCount._cacheExpire = Game.time+config.cacheTimeExpire.creepsCount;
        }

        return creepsCount;
    }

    public static increaseCreepCount(roomName: string, increaseCreepRole: string) {
        let creepsCount: {[type: string]: number} = {};

        for (let i=0; i<creepsClass.creepRoles.length; i++) {
            let creepRole: string = creepsClass.creepRoles[i];
            let creeps: Creep[] = [];

            creeps = _.filter(Game.creeps, (creep: Creep) => creep.memory.room == roomName);
            creeps = _.filter(creeps, (creep: Creep) => creep.memory.role == creepRole);

            creepsCount[creepRole] = (creepRole == increaseCreepRole) ? creeps.length++: creeps.length;
        }

        Memory.rooms[roomName].creepsCount = creepsCount;
    }
}