/// <reference path="typings/index.d.ts" />
/// <reference path="./Classes/Classes.d.ts" />

import { Renderer } from './Classes/Renderer';
import { Camera } from './Classes/Camera';

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

var renderer = new Renderer('cube', rendererOptions, cameraOptions);

// Création d'une géométrie wireframe pour le cube
var geometry = new THREE.BoxBufferGeometry(200,200,200);
var lineGeometry = new THREE.EdgesGeometry(geometry, 1);

// matériau uni noir pour le cube
var material = new THREE.MeshBasicMaterial({
    color: 0x000000
});

var meshCube = new THREE.Mesh(geometry, material);

var line = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({color: 0x777777}));

renderer.addMesh(meshCube);

meshCube.add(line);

renderer.loadScene();