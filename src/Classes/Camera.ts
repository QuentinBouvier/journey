/// <reference path="../typings/index.d.ts" />

export class Camera {
    private _camera: THREE.PerspectiveCamera;
    private _properties: { fov: number, aspect: number, near: number, far: number };
    private _position: { x: number, y: number, z: number };

    constructor(cameraOptions: camOpt) {
        this._properties = {
            fov: cameraOptions.fov,
            aspect: cameraOptions.aspect,
            near: cameraOptions.near,
            far: cameraOptions.far
        };
        this._position = {
            x: cameraOptions.x,
            y: cameraOptions.y,
            z: cameraOptions.z
        };

        this._camera = new THREE.PerspectiveCamera(this._properties.fov, this._properties.aspect, this._properties.near, this._properties.far);
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
    }

    private update = ():void =>
    {
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
        this._camera.fov = this._properties.fov;
        this._camera.aspect = this._properties.aspect;
        this._camera.near = this._properties.near;
        this._camera.far = this._properties.far;
    }

    public getCamera = (): THREE.PerspectiveCamera => {
        return this._camera;
    }

    public setProperty = (property: string, value: number): Boolean => {
        if (typeof this._properties[property] !== undefined) {
            this._properties[property] = value;
        }
        else if (typeof this._position[property] !== undefined) {
            this._properties[property] = value;
        } else {
            return false;
        }
        this.update();
        return true;
    }
}

export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}
