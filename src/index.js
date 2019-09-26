import * as THREE from 'three'
import * as CANNON from 'cannon'

import { RandomEnvironmentEntity } from './environment'
import { Player } from './player'
import { Entity, Obstacle } from './entity'
import { CameraEntity } from './camera';


// --------------------------------------------------------------------------------

var date = new Date();
var n = date.getTime(); 

// --------------------------------------------------------------------------------

var world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // m/s²

// --------------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0x000000, 1, 100 );

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

let entities = []
let player = new Player(scene, world)
entities.push(player)

for(let n=0;n<100;n++)
{
  entities.push(new Entity(scene, world))
}

for(let n=0;n<5;n++)
{
  entities.push(new Obstacle(scene, world))
}


entities.push(new RandomEnvironmentEntity(scene, world))

var camera = new CameraEntity(player.mesh)
entities.push(camera)

// --------------------------------------------------------------------------------

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 300;

// Start the simulation loop
var lastTime = date.getTime();

var animate = function () {
  requestAnimationFrame(animate);

  var dt = (date.getTime() - lastTime) / 1000;
  world.step(fixedTimeStep, dt, maxSubSteps);
  // console.log("Sphere z position: " + sphereBody.position.z);

  for (let e of entities) {
    e.update();
  }
  renderer.render(scene, camera.camera);
  lastTime = date.getTime();
};

animate();

// --------------------------------------------------------------------------------
