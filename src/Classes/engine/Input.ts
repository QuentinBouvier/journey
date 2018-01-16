/// <reference path="../../typings/index.d.ts" />

export class Input
{
    private _keyboardEvents: { [index: number]: boolean };
    private _keyMap: { [index: string]: number[] };

    public constructor()
    {
        this._keyboardEvents = {};
        this._keyMap = {};
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

        var focusChanged = (input) => {
            for (let i in input._keyboardEvents)
            {
                input._keyboardEvents[i] = false;
            }
        }

        document.addEventListener(visibilityChange, () => focusChanged(this));
        window.addEventListener("focus", () => focusChanged(this));
        window.addEventListener("blur", () => focusChanged(this));
    }

    public enablePointerLock = () => {
        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if ( havePointerLock ) {
            var element = document.body;
            var pointerlockchange = function ( event ) {
                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                    // Enable pointerLock
                } else {
                    // disable PointerLock
                }
            };
            var pointerlockerror = function ( event ) {
                // Error display
            };
            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            document.addEventListener( 'click', function (event) {
                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                element.requestPointerLock();
            }, false);
        } else {
            alert('Your browser doesn\'t seem to support Pointer Lock API');
        }
    }

    public setKey = (name: string, ...keyCode: number[]) => 
    {
        this._keyMap[name] = keyCode;
    }

    public keyboardEvents = () => 
    {
        return this._keyboardEvents;
    }

    public assignKeys = (keys: { [controlName: string]: number[] }) =>
    {
        for (let name in keys)
        {
            this._keyMap[name] = keys[name];
        }
    }

    public keyMap = ():{ [index: string]: number[] } => 
    {
        return this._keyMap;
    }

    public checkInput = (control: string):boolean =>
    {
        var pressed:boolean = false;
        for (let assignedKey of this._keyMap[control])
        {
            if (this._keyboardEvents[assignedKey] === true)
            {
                pressed = true;
                break;
            }
        }

        return pressed;
    }
}