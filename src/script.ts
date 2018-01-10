/// <reference path="typings/index.d.ts" />

import { GameScene } from './Classes/GameScene';
import { Player } from './Classes/engine/Player';

var rendererOptions = {
    options: {antialias: true},
    width: window.innerWidth,
    height: window.innerHeight
};

var cameraOptions = {
    fov: 50, 
    aspect: rendererOptions.width / rendererOptions.height,
    near: 1,
    far: 10000,
    x: 200,
    y: -50,
    z: 800
};

var game = new GameScene('cube', rendererOptions, new Player(cameraOptions));