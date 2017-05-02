/// <reference path="../../_references.ts" />

export interface creepsMemory {
    energySource: {
        _cacheExpire: number,
        id: string
    },
    path: {
        _cacheExpire: number,
        objectId: string,
        serialized: string
    },
    role: string,
    subRole: string,
    action: string,
    room: string
}