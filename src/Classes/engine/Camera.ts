/// <reference path="../../typings/index.d.ts" />

/**
 * Nesting THREE.PerspectiveCamera in a class
 * Everything to initialise a Camera and securely moving it
 * @export
 */
export class Camera {
    protected _camera: THREE.PerspectiveCamera;
    protected _fov: number;
    protected _aspect: number;
    protected _near: number;
    protected _far: number;
    protected _position: coord;

    constructor(cameraOptions: camOpt) {
        this._fov = cameraOptions.fov;
        this._aspect = cameraOptions.aspect;
        this._near = cameraOptions.near;
        this._far = cameraOptions.far;
        this._position = {
            x: cameraOptions.x,
            y: cameraOptions.y,
            z: cameraOptions.z
        };

        this._camera = new THREE.PerspectiveCamera(this._fov, this._aspect, this._near, this._far);
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
    }

    /**
     * Push the class properties into the camera
     * @memberof Camera
     */
    protected _update = ():void =>
    {
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
        this._camera.fov = this._fov;
        this._camera.aspect = this._aspect;
        this._camera.near = this._near;
        this._camera.far = this._far;
    }

    /**
     * Get the camera object
     * @return { THREE.PerspectiveCamera }
     * @memberof Camera
     */
    public getCamera = (): THREE.PerspectiveCamera => {
        return this._camera;
    }

    /**
     * set camera properties from an object
     * @param { { [key:string]: number } } properties Properties to push in camera. 
     * @returns { boolean } False if a property is not part of class
     */
    public setProperties = (properties: { [key:string]: number }): Boolean => {
        var toPush: { [key:string]: number };
        for (let index in properties)
        {
            if (typeof this["_" + index] !== undefined) {
            toPush[index] = properties[index];
            }else {
                console.log('Camera.setProperties error. ' + index + ': is not part of camera properties')
                return false;
            }
        }
        this._fov = toPush.fov;
        this._aspect = toPush.aspect;
        this._far = toPush.far;
        this._near = toPush.near;
        this._position = { x: toPush.X, y:toPush.y, z:toPush.z };
        this._update();
        return true;
    }

    /**
     * @return { coord }
     */
    public position = (): coord => {
        return this._position;
    }

    /**
     * Moves the camera to given coordinates.
     * @param { coord } newPosition
     */
    public setPosition = (newPosition: coord) => {
        this._position = newPosition;
        this._update();
    }

    /**
     * Translate the camera on axis for the given direction
     * 
     * @method x
     * @method y
     * @method z
     * @method all
     * @memberof Camera
     */
    public move = {

        /**
         * Translate on x axis
         * @param { number } ox Offset
         */    
        x: (ox:number) => {
            this._position.x += ox;
            this._update();
        },

        /**
         * Translate on y axis
         * @param { number } oy Offset
         */
        y: (oy: number) => {
            this._position.y += oy
            this._update();;
        },

        /**
         * Translate on z axis
         * @param { number } oz Offset
         */
        z: (oz: number) => {
            this._position.z += oz;
            this._update();
        },

        /**
         * Translate on all axis
         * @param { coord } offset Object with the three distances
         */
        all: (offset: coord) =>
        {            
            this._position.x += offset.x;
            this._position.y += offset.y;
            this._position.z += offset.z;        
            this._update();
        }

    };

    /**
     * Rotate the camera on given axis
     * 
     * @method x
     * @method y
     * @method z
     * 
     * @memberof Camera
     */
    public rotate = {
        x: (ax:number) =>
        {
            this._camera.rotateX(ax);
        },
        y: (ay:number) =>
        {
            this._camera.rotateY(ay);
        },
        z:(az:number) =>
        {
            this._camera.rotateZ(az);
        }
    }

    /**
     * Get the direction the camera is looking at.
     * 
     * @returns { THREE.Vector3 } Normalized vector pointing towards camera direction
     * @memberof Camera
     */
    public getDirection = ():THREE.Vector3 => 
    {
        var dir = new THREE.Vector3();
        dir = this._camera.getWorldDirection();

        return dir.normalize();
    }
}

/**
 * All the properties to build a camera
 * 
 * @member { number } fov
 * @member { number } aspect
 * @member { number } near
 * @member { number } far
 * @member { number } x
 * @member { number } y
 * @member { number } z
 * 
 * @export
 * @interface camOpt
 */
export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}

/**
 * The three coordinates of the space (Light Vector3)
 * 
 * @member { number } x
 * @member { number } y
 * @member { number } z
 * 
 * @export
 * @interface coord
 */
export interface coord {
    x, y, z: number;
}
