/// <reference path="../../typings/index.d.ts" />

import { Camera, camOpt } from "./Camera";
import { Input } from "./Input";

export class Player extends Camera
{
    //private _controls: Controls;
    private _dir: THREE.Vector3;
    private _rayCaster: THREE.Raycaster;

    public bindRayCaster = (raycaster: THREE.Raycaster) =>
    {
        this._rayCaster = raycaster;
    }

    public rayCaster = ():THREE.Raycaster =>
    {
        return this._rayCaster;
    }

    public getDirection = ():THREE.Vector3 => 
    {
        var dir = new THREE.Vector3();
        dir = this._camera.getWorldDirection();

        return dir.normalize();
    }
}