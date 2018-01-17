/// <reference path="../../typings/index.d.ts" />

export class Input
{
    private _keyboardEvents: { [index: number]: boolean };
    private _keyMap: { [index: string]: number[] };
    private _mouse: { rx:number, ry:number };
    private _hasFocus: boolean = true;

    public constructor()
    {
        this._keyboardEvents = {};
        this._keyMap = {};
        this._mouse = { rx: 0, ry:0 };
    }

    public run = () => {
        this.listenToFocus();
        this.enablePointerLock();
        this.mouse();
        this.keyboard();
        
    }

    public mouse = () => {

        var motionStop = () => {
            this._mouse = {
                rx: 0,
                ry: 0
            }
        }

        window.addEventListener('mousemove', (e) => {

            if (timer) {
                window.clearTimeout(timer);
            }

            var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
            var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

            this._mouse = {
                rx: movementX,
                ry: movementY
            }

            var timer = window.setTimeout(() => { motionStop() }, 15);
        });
    }

    public keyboard = () => {
        window.addEventListener('keydown', (e) => {
            var code: number = e.keyCode;

            if (this._keyboardEvents[code] != true && this._hasFocus)
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
            if (document.hasFocus())
            {
                this._hasFocus = true;
            }
            else
            {
                this._hasFocus = false;
            }
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

        // see https://threejs.org/examples/?q=pointer#misc_controls_pointerlock

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if ( havePointerLock ) {
            var element = document.body;
            var pointerlockchange = (e) => {
                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                    this._hasFocus = true;
                } else {
                    this._hasFocus = false;
                }
            };
            var pointerlockerror = (e) => {
                // Error display
            };
            // Hook pointer lock state change es
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            document.addEventListener( 'click', function (e) {
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

    public mouseMotion = () => {
        return this._mouse;
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

    public hasFocus = ():boolean =>
    {
        return this._hasFocus;
    }
}