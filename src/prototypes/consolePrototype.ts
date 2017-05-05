/// <reference path="../_references.ts" />

export class consolePrototype {
    public static initialize() {
        Object.assign(console, {
            warn: function (text: string): void {
                console.log('<span style="color: darkorange">'+text+'</span>');
            },
            info: function (text: string): void {
                console.log('<span style="color: aqua">'+text+'</span>');
            },
            error: function (text: string): void {
                console.log('<span style="color: red">'+text+'</span>');
            }
        });
    }
}

