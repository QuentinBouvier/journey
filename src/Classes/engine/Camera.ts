/// <reference path="../../typings/index.d.ts" />


/**
 * Nesting THREE.PerspectiveCamera in a class
 * Everything to initialise a Camera and securely moving it
 */
export class Camera {
    private _camera: THREE.PerspectiveCamera;
    private _fov: number;
    private _aspect: number;
    private _near: number;
    private _far: number;
    private _position: coord;

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
     * Push properties into the camera
     */
    private _update = ():void =>
    {
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
        this._camera.fov = this._fov;
        this._camera.aspect = this._aspect;
        this._camera.near = this._near;
        this._camera.far = this._far;
    }

    /**
     * @return { THREE.PerspectiveCamera }
     */
    public getCamera = (): THREE.PerspectiveCamera => {
        return this._camera;
    }

    /**
     * set camera properties by a collection of given properties
     */
    public setProperties = (properties: { [key:string]: number }): Boolean => {
        for (let index in properties)
        {
            if (typeof this[index] !== undefined) {
            this[index] = properties[index];
            }else {
                return false;
            }
        }
        this._update();
        return true;
    }

    /**
     * @return { coord }
     */
    public getPosition = (): coord => {
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
     * Moves the camera with given offset
     * @param { coord } offset
     */
    public move = (offset: coord) => {
        this._position.x += offset.x;
        this._position.y += offset.y;
        this._position.z += offset.y;

        this._update();
    }
}

export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}

export interface coord {
    x, y, z: number;
}
