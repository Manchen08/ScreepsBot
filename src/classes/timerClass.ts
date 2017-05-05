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
        if (this.startTime && !this.endTime)
            this.end();

        let result: number = this.endTime - this.startTime;

        if (roundToMs)
            result = Math.round(result);

        return result;
    }

    public watchdog(minimumMs :number, output: Function | string=null): void {
        let resultMs: number = this.result();
        let bark: string;
        if (resultMs < minimumMs)
            return;

        if (typeof output === "string") {
            bark = output;
        } else if (typeof output === "function") {
            bark = output(resultMs);
        } else {
            bark = '[timerClass.watchdog('+minimumMs+'ms)] Recorded '+resultMs+'ms';
        }

        console.warn(bark);
    }
}