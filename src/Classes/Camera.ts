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

    public camera = (): THREE.PerspectiveCamera => {
        return this._camera;
    }
}

export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}
