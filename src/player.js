
import * as THREE from 'three'
import * as CANNON from 'cannon'

import { IsKeyDown } from './keyboard'

// --------------------------------------------------------------------------------

class Player {
  constructor(scene, world) {

    this.geometry = new THREE.BoxGeometry(2, 1, 2)
    this.material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true
    this.maxvelocity = 0.5
    this.reset()
    scene.add(this.mesh)

    this.body = new CANNON.Body({
      mass: 10, // kg
      position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
      shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 1))
    })
    world.addBody(this.body)
  }

  reset() {
    this.velocity = 0.0
    // this.mesh.rotation.y = Math.PI;
    this.mesh.position.x = 0.0
    this.mesh.position.y = 0.75
    this.mesh.position.z = 0.0
  }

  update() {
    if (IsKeyDown(65)) {
      this.mesh.rotation.y += 0.02;
    }
    else if (IsKeyDown(68)) {
      this.mesh.rotation.y -= 0.02;
    }

    if (IsKeyDown(87)) {
      if (this.velocity < this.maxvelocity) {
        this.velocity += 0.01
      }
    }
    else if (IsKeyDown(83)) {
      if (this.velocity > 0) {
        this.velocity -= 0.01
      }
      else {
        this.velocity = 0.0
      }
    }
    this.mesh.translateZ(this.velocity)    // this.position = this.position + this.velocity

    this.body.position.x = this.mesh.position.x
    this.body.position.y = this.mesh.position.y
    this.body.position.z = this.mesh.position.z
  }
}

// --------------------------------------------------------------------------------  

export { Player }

// --------------------------------------------------------------------------------
