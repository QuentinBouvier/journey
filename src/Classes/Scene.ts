/// <reference path="../typings/index.d.ts" />

import { Camera } from './Camera';

/**
 * Handles a scene to render and an animation function
 * includes one renderer and one camera
 * has a collection of meshes to render
 */

export class Scene {
    private _renderer: THREE.WebGLRenderer;
    private _camera: Camera;
    private _mesh: { [index: string]: THREE.Mesh } = {};
    private _scene: THREE.Scene;

    constructor(blockId: string, rendererOptions: rndOpt, camera: Camera) {
        this._renderer = new THREE.WebGLRenderer(rendererOptions.options);
        this._renderer.setSize(rendererOptions.width, rendererOptions.height);

        this._camera = camera;
    }

    /**
     * Collect all meshes and render
     * @returns { Void }
     */
    public render = () => {
        document.getElementById('cube').appendChild(this._renderer.domElement);
        this._scene = new THREE.Scene();
        for (let element in this._mesh)
        {
            this._scene.add(this._mesh[element]);
        }

        this._renderer.render(this._scene, this._camera.getCamera());
    }

    /**
     * adds meshes to the scene
     * @argument { [index: string]: THREE.Mesh } ...mesh Meshes to be added to the render pool.
     * @returns { Void }
     */
    public addMesh = (mesh: { [index: string]:THREE.Mesh }) => {
        for (let element in mesh)
        {
            this._mesh[element] = mesh[element];
        }  
    }

    /**  */
    public animate = () => 
    {
        requestAnimationFrame(()=>this.animate());

        this._game();
    }

    /** Main animation function */
    private _game() {
        
    }

    /**
     * _mesh getter
     * @returns {{ [index: string]: THREE.Mesh }}
     */
    public meshes = ():{ [index: string]: THREE.Mesh } => {
        return this._mesh;
    }
}

/**
 * Interfacing for renderer options constructor.
 */
export interface rndOpt {
    options: {[key:string]:any};
    width, height: number;
}

/**
 * Interfacing for camera options constructor.
 */
export interface camOpt {
    fov, aspect, near, far: number;
    x, y, z: number;
}
