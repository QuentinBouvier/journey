/// <reference path="../../typings/index.d.ts" />

import { Camera } from "./Camera";
import { Input } from "./Input";

export class Player extends Camera
{
    //private _controls: Controls;
    private _dir: THREE.Vector3;
    private _input: Input;
    private _rayCaster: THREE.Raycaster;
}