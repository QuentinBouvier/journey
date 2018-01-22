/// <reference path="../typings/index.d.ts" />

import { FramedBox } from './engine/FramedBox';
import * as Utils from './engine/Utils';

export class BoxGenerator
{
    private _nOfBox;
    private _range: { min:number, max: number};

    constructor(nOfBox:number, min: number, max: number)
    {
        this._nOfBox = nOfBox;
        this._range = {
            min: min,
            max: max
        };
    }

    public generateBoxes = () =>
    {
        var boxes = [];
        for (let i = 0; i < this._nOfBox; i++)
        {
            boxes[i] = new FramedBox("box" + i, 
            {x: 200, y: 200, z: 200}, 
            {
                x: Utils.randomInt(this._range.min, this._range.max),
                y: 0,
                z: Utils.randomInt(this._range.min, this._range.max)
            });
        }
        return boxes;
    }

    public updateBoxes = (origin: THREE.Object3D, boxes: FramedBox[]) =>
    {
        var originCoords = origin.position;
        var distance, boxCoord;
        for (let i = 0; i < boxes.length; i++)
        {
            boxCoord = boxes[i].mesh().position;
            distance = originCoords.distanceTo(boxCoord);

            if (distance > this._range.max + this._range.max * 20/100)
            {
                boxes[i].mesh().position.set(
                    Utils.randomInt(originCoords.x + this._range.min, originCoords.x + this._range.max * 2),
                    0,
                    Utils.randomInt(originCoords.z + this._range.min, originCoords.z + this._range.max * 2)
                );
                console.log('Moved box ' + i + ' to ' + boxes[i].mesh().position.x + ', ' + boxes[i].mesh().position.z + ', ');
            }
        }
    }

    public range = () =>
    {
        return this._range;
    }
}