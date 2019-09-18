import * as THREE from 'three'

import { RandomEnvironmentEntity } from './environment'
import { Player } from './player'
import { Entity } from './entity'
import { CameraEntity } from './camera';

// --------------------------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

scene.background = new THREE.Color( 0x000000 );
scene.fog = new THREE.Fog( 0x000000, 1, 50 );

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

let entities = []
let player = new Player(scene)
entities.push(player)

for(let n=0;n<100;n++)
{
  entities.push(new Entity(scene))
}

entities.push(new RandomEnvironmentEntity(scene))

var camera = new CameraEntity(player.mesh)
entities.push(camera)

// --------------------------------------------------------------------------------

var animate = function () {
  requestAnimationFrame(animate);

  for (let e of entities) {
    e.update();
  }
  renderer.render(scene, camera.camera);
};

animate();

// --------------------------------------------------------------------------------
