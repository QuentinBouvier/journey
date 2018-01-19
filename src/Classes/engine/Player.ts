/// <reference path="../../typings/index.d.ts" />

import { Camera } from "./Camera";
import { Input } from "./Input";
import { camOpt } from './types';

export class Player extends Camera
{
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
}