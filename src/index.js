import * as THREE from 'three'
import * as CANNON from 'cannon'


import { NaturalEnvironment } from './environment'
import { Player } from './player'
import { Entity, Obstacle } from './entity'
import { CameraEntity } from './camera'
import { LightEntity } from './light'

// --------------------------------------------------------------------------------

var date = new Date();
var n = date.getTime(); 

// --------------------------------------------------------------------------------

var world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // m/s²

// --------------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

scene.background = new THREE.Color( 0xAAAAAFF );
scene.fog = new THREE.Fog( 0xAAAAFF, 1, 256 );

// Ambient Light 
let ambient = new THREE.AmbientLight( 0xFFFFFF, 0.25);
scene.add( ambient );

let entities = []
let player = new Player(scene, world)
entities.push(player)

for(let n=0;n<50;n++)
{
  // entities.push(new Entity(scene, world))
}

for(let n=0;n<5;n++)
{
  // entities.push(new Obstacle(scene, world))
}

entities.push(new NaturalEnvironment(scene, world))

var camera = new CameraEntity(player.mesh)
entities.push(camera)

var light = new LightEntity(scene, player.mesh)
entities.push(light )


// --------------------------------------------------------------------------------

var fixedTimeStep = 1.0 / 30.0; // seconds
var maxSubSteps = 300;
var lastTime = date.getTime();

var animate = function () {
  requestAnimationFrame(animate);

  var dt = (date.getTime() - lastTime) / 1000;
  world.step(fixedTimeStep, dt, maxSubSteps);

  for (let e of entities) {
    e.update();
  }
  renderer.render(scene, camera.camera);
  lastTime = date.getTime();
};

animate();

// --------------------------------------------------------------------------------
