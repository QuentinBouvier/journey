/// <reference path="../typings/index.d.ts" />

import { Camera } from './Camera';

export class Renderer {
    private _renderer: THREE.WebGLRenderer;
    private _camera: Camera;
    private _mesh: THREE.Mesh[] = [];
    private _scene: THREE.Scene;

    public constructor(blockId: string, rendererOptions: rndOpt, cameraOptions: camOpt) {
        this._renderer = new THREE.WebGLRenderer(rendererOptions.options);
        this._renderer.setSize(rendererOptions.width, rendererOptions.height);

        document.getElementById('cube').appendChild(this._renderer.domElement);

        this._camera = new Camera(cameraOptions);
    }

    public loadScene = () => {
        this._scene = new THREE.Scene();
        this._mesh.forEach(element => {
            this._scene.add(element);
        });

        this._renderer.render(this._scene, this._camera.camera());
    }

    public addMesh = (...mesh: THREE.Mesh[]) => {
        mesh.forEach(element => {
            this._mesh.push(element);
        });
    }
}

export interface rndOpt {
    options: {};
    width, height: number;
}

export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}
