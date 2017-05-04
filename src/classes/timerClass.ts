/// <reference path="../_references.ts" />

export class timerClass {
    private startTime: number;
    private endTime: number;

    public start(): number {
        this.startTime = performance.now();
        return this.startTime;
    }

    public end(): number {
        this.endTime = performance.now();
        return this.endTime;
    }

    public result(roundToMs: boolean=true): number {
        let result: number = this.endTime - this.startTime;

        if (roundToMs)
            result = Math.round(result);

        return result;
    }
}