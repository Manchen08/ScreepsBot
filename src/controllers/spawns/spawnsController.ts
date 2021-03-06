/// <reference path="../../_references.ts" />
import {spawnDataMemory} from "../../interfaces/memory/rooms/spawnDataMemory";
import {creepsClass} from "../../classes/creeps/creepsClass";

export interface creepGoal {
    type: string,
    min: number,
    priority: number,
    timeLastSpawned?: number
}

export class spawnsController {
    public static initialize(roomName: string, creepGoals: creepGoal[]): void {
        let creepsCnt: {[type: string]: number} = creepsClass.creepsCount(roomName);

        creepGoals = creepGoals.filter(creepGoal => creepsCnt[creepGoal.type] < creepGoal.min);
        creepGoals = spawnsController.sortCreeps(roomName, creepGoals);

        for (let i=0; i<creepGoals.length; i++) {
            let creepGoal: creepGoal = creepGoals[i];
            if (spawnsController.createCreep(roomName, creepGoal.type)) break;
        }
    }

    private static createCreep(roomName: string, creepRole: string): boolean {
        let spawn: StructureSpawn = <StructureSpawn>Game.getObjectById(Memory.rooms[roomName].structures.spawns[0].id);
        let spawnData: spawnDataMemory = Memory.rooms[roomName].spawnData;
        let bodyParts: string[] = creepsClass.bodyParts(creepRole);
        let creepName: number | string = spawn.createCreep(bodyParts, null, {role: creepRole, room: roomName});

        if (typeof creepName != "string")
            return false;

        creepsClass.increaseCreepCount(roomName, creepRole);

        if (Memory && Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].spawnData && Memory.rooms[roomName].spawnData.lastSpawnGameTime) {
            let spawnDataIndex: number  = spawnData.lastSpawnGameTime.map(lastspawn => lastspawn.creepRole).indexOf(creepRole);
            Memory.rooms[roomName].spawnData.lastSpawnGameTime[spawnDataIndex] = {creepRole: creepRole, gameTime: Game.time};
        }

        return true;
    }

    private static sortCreeps(roomName: string, creepGoals: creepGoal[]): creepGoal[] {
        let gametime: number = Game.time;

        return creepGoals.sort((a,b) => {
            let aTimeLastSpawned: number = 0;
            let bTimeLastSpawned: number = 0;

            if (Memory && Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].spawnData) {
                let spawnData: spawnDataMemory = Memory.rooms[roomName].spawnData;
                aTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepRole == a.type)[0].gameTime;
                bTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepRole == b.type)[0].gameTime;
            }

            return (a.priority/(aTimeLastSpawned-gametime)) - (b.priority/(bTimeLastSpawned-gametime))
        });
    }
}