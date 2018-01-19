/// <reference path="../typings/index.d.ts" />

import { Scene } from './engine/Scene';
import { Camera } from './engine/Camera';
import { Player } from './engine/Player';
import { Input } from './engine/Input';
import { rndOpt } from './engine/types';
import { FramedBox } from './engine/FramedBox';

export class GameScene extends Scene
{
    protected _camera: Player;
    protected _input: Input;

    constructor(blockId: string, rendererOptions: rndOpt, camera: Player) {

        super(blockId, rendererOptions, camera);

        this._input = new Input();
    }

    public launch = () =>
    {
        this.init();
        this.animate();
    }

    public init = () => {
        
        this.load();
        
        var box1 = new FramedBox("box1", {x: 200, y: 200, z: 200});
        var floor = new FramedBox("floor", { x: 5000, y: 0, z: 5000}, { x: 0, y: -101, z: 0 });

        this._mesh[floor.name()] = floor.mesh();
        this.pushMeshes();

        //this._camera.getCamera().add(floor.mesh());

        this._prevTime = performance.now();
        this.render();

        this._input.assignKeys({ 
            'up': [ 90, 87 ], // z, w
            'down': [ 83 ], // s
            'left': [ 81, 65 ], // q, a
            'right': [ 68 ], // d
            'translate': [ 82 ] // r
        });
        this._input.run();        
    }

    public animate = () => {
        requestAnimationFrame(() => this.animate());

        if (this._input.hasFocus())
        {
            var time = performance.now();
            var delta = (time - this._prevTime);

            this.mesh("box1").rotation.y += 0.0003 * delta;

            this.motion(delta);

            this.render();

            this._prevTime = performance.now();
        }
    }

    public motion = (delta: number) =>
    {
        var direction = this._camera.getDirection().normalize();
        var speed = 0.5;

        if(this._input.checkInput('translate'))
        {
            this._mesh.box1.translateZ(10);
        }
        
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
    }
}