/// <reference path="../../_references.ts" />
import {spawnDataMemory} from "../../interfaces/memory/rooms/spawnDataMemory";

export class creepSpawnController {
    public static initialize(roomName: string, creepGoals: creepGoal[]): void {
        creepGoals = creepSpawnController.sortCreeps(roomName, creepGoals);

        for (let i=0; i<creepGoals.length; i++) {
            let creepGoal: creepGoal = creepGoals[i];

            creepSpawnController.createCreep(roomName, creepGoal);
        }
    }

    private static createCreep(roomName: string, creepGoal: creepGoal ): boolean {
        let spawn: StructureSpawn = Memory.rooms[roomName].structures.spawns[0];

        return true;
    }

    private static sortCreeps(roomName: string, creepGoals: creepGoal[]): creepGoal[] {
        let gametime: number = Game.time;

        return creepGoals.sort((a,b) => {
            let aTimeLastSpawned: number = 0;
            let bTimeLastSpawned: number = 0;

            if (Memory && Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].spawnData) {
                let spawnData: spawnDataMemory = Memory.rooms[roomName].spawnData;
                aTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepType == a.type)[0].gameTime;
                bTimeLastSpawned = spawnData.lastSpawnGameTime.filter(lastspawn => lastspawn.creepType == b.type)[0].gameTime;
            }

            return (a.priority/(aTimeLastSpawned-gametime)) - (b.priority/(bTimeLastSpawned-gametime))
        });
    }
}

export interface creepGoal {
    type: string,
    min: number,
    priority: number,
    timeLastSpawned?: number
}