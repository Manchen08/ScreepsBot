/// <reference path="../../_references.ts" />

export interface creepsMemory {
    energySource: {
        _cacheExpire: number,
        id: string,
    },
    role: string,
    subRole: string,
    action: string,
    room: string
}