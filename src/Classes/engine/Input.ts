/// <reference path="../../typings/index.d.ts" />

export class Input
{
    private _keyboardEvents: { [index: number]: boolean };
    private _keyMap: { [index: string]: number[] };

    public constructor()
    {
        this._keyboardEvents = {};
    }

    public run = () => {
        this.listenToFocus();
        
        window.addEventListener('keydown', (e) => {
            var code: number = e.keyCode;

            if (this._keyboardEvents[code] != true)
            {
                this._keyboardEvents[code] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            var code:number = e.keyCode;
            this._keyboardEvents[code] = false;
        });
    }

    public listenToFocus = () =>
    {
        // see https://coderwall.com/p/cwpdaw/how-to-tell-if-app-page-has-focus

        var visibilityChange;
        if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
        }

        var focusChanged = function() {
            for (let v of this._keyboardEvents)
            {
                v = false;
            }
        }

        document.addEventListener(visibilityChange, focusChanged);
        window.addEventListener("focus", focusChanged);
        window.addEventListener("blur", focusChanged);
    }

    public getKey(keyCode: number): boolean
    {
        return this._keyboardEvents[keyCode];
    }
}