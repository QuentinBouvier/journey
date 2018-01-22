/// <reference path="../typings/index.d.ts" />

import { Scene } from './engine/Scene';
import { Camera } from './engine/Camera';
import { Player } from './engine/Player';
import { Input } from './engine/Input';
import { FramedBox } from './engine/FramedBox';
import { BoxGenerator } from './BoxGenerator';
import { rndOpt } from './engine/types';
import * as Utils from './engine/utils';
import { BoxGeometry } from 'three';

export class GameScene extends Scene
{
    protected _camera: Player;
    protected _input: Input;
    private _boxes: FramedBox[];
    private _generator: BoxGenerator;

    constructor(blockId: string, rendererOptions: rndOpt, camera: Player) {

        super(blockId, rendererOptions, camera);

        this._input = new Input();
        // range of the generator defines the scene size.
        this._generator = new BoxGenerator(100, -9000, 9000);
        this._boxes = [];
    }

    public launch = () =>
    {
        this.init();
        this.animate();
    }

    public init = () => 
    {
        
        this.load();
    
        // using the generator range to define the floor size
        var floor = new FramedBox("floor", { x: this._generator.range().max * 2, y: 0, z: this._generator.range().max * 2}, { x: 0, y: -101, z: 0 });

        this._mesh[floor.name()] = floor.mesh();

        this._boxes = this._generator.generateBoxes();
        this._boxes.forEach(element => {
            this._mesh[element.name()] = element.mesh();
        });
        this.pushMeshes();

        this._prevTime = performance.now();
        this.render();

        this._input.assignKeys({
            'up': [ 90, 87 ], // z, w
            'down': [ 83 ], // s
            'left': [ 81, 65 ], // q, a
            'right': [ 68 ], // d
            'pos': [ 80 ]
        });
        this._input.run();
    }

    public animate = () => 
    {
        requestAnimationFrame(() => this.animate());
        this._frameCount++;

        if (this._input.hasFocus())
        {
            var time = performance.now();
            var delta = (time - this._prevTime);

            // get rotation speed from FramedBox directly
            this._boxes.forEach(element => {
                element.mesh().rotation.y += element.rDir() * element.rSpeed() * delta;
            });

            // invoke input motion with time diference between two frames
            this.motion(delta);

            if (this._frameCount % 10 == 0)
            {
                //moves farest boxes in generator range every 10 frames
                this._generator.updateBoxes(this._camera.getCamera(), this._boxes);
            }

            this.render();

            this._prevTime = performance.now();
            this._elapsed += delta;
        }
    }

    public motion = (delta: number) =>
    {
        var direction = this._camera.getDirection().normalize();
        var speed = 0.5;
        
        if (this._input.checkInput('up'))
        {
            this._camera.move.all({
                x: direction.x * speed * delta,
                y: 0,
                z: direction.z * speed * delta
            });
            this._mesh.floor.position.x += direction.x * speed * delta;
            this._mesh.floor.position.z += direction.z * speed * delta;
        }
        if (this._input.checkInput('down'))
        {
            this._camera.move.all({
                x: - direction.x * speed * delta,
                y: 0,
                z: - direction.z * speed * delta
            });
            this._mesh.floor.position.x += - direction.x * speed * delta;
            this._mesh.floor.position.z += - direction.z * speed * delta;
        }
        if (this._input.checkInput('left'))
        {
            this._camera.move.all({
                x: direction.z * speed * delta,
                y: 0,
                z: - direction.x * speed * delta
            });
            this._mesh.floor.position.x += direction.z * speed * delta;
            this._mesh.floor.position.z += - direction.x * speed * delta;
        }
        if (this._input.checkInput('right'))
        {
            this._camera.move.all({
                x: - direction.z * speed * delta,
                y: 0,
                z: direction.x * speed * delta
            });
            this._mesh.floor.position.x += - direction.z * speed * delta;
            this._mesh.floor.position.z += direction.x * speed * delta;
        }

        if (this._input.mouseMotion().rx != 0)
        {
            this._camera.rotate.y(- this._input.mouseMotion().rx * 0.0005 * delta);
            this._mesh.floor.rotation.y += - this._input.mouseMotion().rx * 0.0005 * delta;
        }

        if (this._input.checkInput('pos'))
        {
            console.log(this._camera.position());
        }
    }
}