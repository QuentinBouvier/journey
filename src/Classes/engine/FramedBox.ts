/// <reference path="../../typings/index.d.ts" />

import { coord } from "./types";
import * as Utils from "./Utils";

export class FramedBox
{
    protected _box: THREE.BoxBufferGeometry;
    protected _material: THREE.MeshBasicMaterial;
    protected _line: THREE.LineSegments;
    protected _mesh: THREE.Mesh;
    protected _name: string;
    protected _rotationSpeed: number;
    protected _rotationDir: number;
    
    constructor(name: string, size: coord, position: coord = {x:0, y:0, z:0})
    {
        this._name = name;
        this._box = new THREE.BoxBufferGeometry(size.x,size.y,size.z);
        var lineGeometry = new THREE.EdgesGeometry(this._box, 1);

        this._material = new THREE.MeshBasicMaterial({
            color: 0x000000
        });

        this._mesh = new THREE.Mesh(this._box, this._material);

        this._mesh.position.set(position.x, position.y, position.z);

        this._line = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({color: 0x777777}));

        this._mesh.add(this._line);

        if (Math.random() >= 0.5)
        {
            this._rotationDir = 1;
        }
        else
        {
            this._rotationDir = -1;
        }

        this._rotationSpeed = Utils.random(5, 8) / 10000;
        console.log(this._rotationSpeed);
    }

    public mesh = ():THREE.Mesh =>
    {
        return this._mesh;
    }

    public name = ():string => {
        return this._name;
    }

    public getPosition = ():THREE.Vector3 =>
    {
        return this._mesh.position;
    }

    public rSpeed = () => 
    {
        return this._rotationSpeed;
    }

    public rDir = () => 
    {
        return this._rotationDir;
    }
}