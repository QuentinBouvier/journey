/// <reference path="typings/index.d.ts" />

import { Scene } from './Classes/Scene';
import { Camera } from './Classes/Camera';
import { Player } from './Classes/Player';

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

var renderer = new Scene('cube', rendererOptions, new Player(cameraOptions));

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

renderer.addMesh({ "mainCube": meshCube, "secondaryCube": meshCube2 });

meshCube.add(line);
meshCube2.add(line2);

renderer.render();