/// <reference path="../typings/index.d.ts" />

import { Scene, rndOpt } from './engine/Scene';
import { Camera } from './engine/Camera';
import { Player } from './engine/Player';
import { Input } from './engine/Input';

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
        // Création d'une géométrie wireframe pour le cube
        var geometry = new THREE.BoxBufferGeometry(200,200,200);
        var lineGeometry = new THREE.EdgesGeometry(geometry, 1);

        var geometry2 = new THREE.BoxBufferGeometry(200,200,200);
        var lineGeometry2 = new THREE.EdgesGeometry(geometry2, 1);

        // matériau uni noir pour le cube
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000
        });

        var meshCube = new THREE.Mesh(geometry, material);
        var meshCube2 = new THREE.Mesh(geometry2, material);

        meshCube2.position.set(500, 0, 200);

        var line = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({color: 0x777777}));
        var line2 = new THREE.LineSegments(lineGeometry2, new THREE.LineBasicMaterial({color: 0x777777}));

        this.addMesh({ "mainCube": meshCube, "secondaryCube": meshCube2});

        meshCube.add(line);
        meshCube2.add(line2);
        
        this.render();

        this._input.assignKeys({ 
            'up': [ 90, 87 ], // z, w
            'down': [ 83 ], // s
            'left': [ 81, 65 ], // q, a
            'right': [ 68 ] // d
        });
        this._input.run();        
    }

    public animate = () => {
        requestAnimationFrame(() => this.animate());

        if (this._input.hasFocus())
        {
            this.mesh("mainCube").rotation.y += 0.003;

            this.mesh("secondaryCube").rotation.y -= 0.003;

            this.motion();

            this.render();
        }
    }

    public motion = () =>
    {
        var direction = this._camera.getDirection().normalize();
        var speed = 10;
        
        if (this._input.checkInput('up'))
        {
            this._camera.move.all({
                x: direction.x * speed,
                y: 0,
                z: direction.z * speed
            });
        }
        if (this._input.checkInput('down'))
        {
            this._camera.move.all({
                x: - direction.x * speed,
                y: 0,
                z: - direction.z * speed
            });
        }
        if (this._input.checkInput('left'))
        {
            this._camera.move.all({
                x: direction.z * speed,
                y: 0,
                z: - direction.x * speed
            });
        }
        if (this._input.checkInput('right'))
        {
            this._camera.move.all({
                x: - direction.z * speed,
                y: 0,
                z: direction.x * speed
            });
        }

        if (this._input.mouseMotion().rx != 0)
        {
            this._camera.rotate.y(- this._input.mouseMotion().rx * 0.01);
        }
    }
}