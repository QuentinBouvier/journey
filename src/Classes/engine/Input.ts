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

    /**
     * Initialize all listeners for the inputs
     * 
     * @memberof Input
     */
    public run = () => {
        this.listenToFocus();
        this.enablePointerLock();
        this.mouse();
        this.keyboard();        
    }

    /**
     * Set listener for mouse movements.
     * Update this._mouse with mousemove offsets
     * 
     * @memberof Input
     */
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

    /**
     * Set listeners on keyup and keydown.
     * Update this._keyboardEvents.
     * 
     * @memberof Input
     */
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

    /**
     * Set a listener on widow's focus event.
     * Update this._hasFocus.
     * 
     * @memberof Input
     */
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

    /**
     * Set pointerlock on the window when the game is clicked
     * Update this._hasFocus when pointer lock is caught or lost.
     * 
     * @memberof Input
     */
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

    /**
     * Set a control key
     * 
     * @param { string } name The control name
     * @param { number } keyCode(...) One or more keycodes for the control
     * @memberof Input
     */
    public setKey = (name: string, ...keyCode: number[]) => 
    {
        this._keyMap[name] = keyCode;
    }

    /**
     * Assign a variable number of controls through an objet.
     * Update this._keymap
     * 
     * @param { [controlName: string]: number[] } keys Collection of { name: [ keyCode1, keyCode2?], ... }
     * @memberof Input
     */
    public assignKeys = (keys: { [controlName: string]: number[] }) =>
    {
        for (let name in keys)
        {
            this._keyMap[name] = keys[name];
        }
    }

    /**
     * this._keyboardEvents getter
     * 
     * @returns { [key: string ]: number[] } this._keyboardEvents
     * @memberof Input
     */
    public keyboardEvents = () => 
    {
        return this._keyboardEvents;
    }

    /**
     * this._keyMap getter
     * 
     * @returns { [index: string]: number[] } this._keymap
     * @memberof Input
     */
    public keyMap = ():{ [index: string]: number[] } => 
    {
        return this._keyMap;
    }

    /**
     * this._mouse getter
     * 
     * @returns { rx:number, ry:number } this._mouse
     * @memberof Input
     */
    public mouseMotion = () => {
        return this._mouse;
    }

    /**
     * Check if key named in the key map is pressed
     * 
     * @param { string } control Control name
     * @returns { boolean } True if corresponding control key is pressed
     * @memberof Input
     */
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

    /**
     * this._hasFocus getter
     * 
     * @returns { boolean } this._hasFocus
     * @memberof Input
     */
    public hasFocus = ():boolean =>
    {
        return this._hasFocus;
    }
}