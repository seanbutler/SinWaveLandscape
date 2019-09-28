
import * as THREE from 'three'
import * as CANNON from 'cannon'

import { IsKeyDown } from './keyboard'

// --------------------------------------------------------------------------------

class Player {
  constructor(scene, world) {

    this.geometry = new THREE.SphereGeometry(1, 16, 16)
    this.material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true
    this.maxvelocity = 0.5
    this.userForce = new CANNON.Vec3(0.0, 0.0, 0.0)
    this.reset()
    scene.add(this.mesh)

    this.body = new CANNON.Body({
      mass: 10, // kg
      position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
      shape: new CANNON.Sphere(1.0)
    })
    world.addBody(this.body)
  }

  reset() {
    this.velocity = 0.0
    // this.mesh.rotation.y = Math.PI;
    this.mesh.position.x = 0.0
    this.mesh.position.y = 5.0
    this.mesh.position.z = 0.0
  }

  update() {
    this.userForce = new CANNON.Vec3(0.0, 0.0, 0.0)
 
    if (IsKeyDown(65)) {
      this.mesh.rotation.y += 0.02;
    }
    else if (IsKeyDown(68)) {
      this.mesh.rotation.y -= 0.02;
    }

    if (IsKeyDown(87)) {
      // if (this.velocity < this.maxvelocity) {
      //   this.velocity += 0.01
      // }

      this.userForce = new CANNON.Vec3(0.0, 0.0, 100)
    }
    else if (IsKeyDown(83)) {

      this.userForce = new CANNON.Vec3(0.0, 0.0, -100)

      // if (this.velocity > 0) {
      //   this.velocity -= 0.01
      // }
      // else {
      //   this.velocity = 0.0
      // }
    }
    // this.mesh.translateZ(this.velocity)

    // this.body.position.x = this.mesh.position.x
    // this.body.position.y = this.mesh.position.y
    // this.body.position.z = this.mesh.position.z

    let centerInWorldCoords = this.body.pointToWorldFrame(new CANNON.Vec3())

    this.body.applyForce(this.userForce, centerInWorldCoords)

    this.mesh.position.copy(this.body.position);

    if(this.body.quaternion){
        // this.mesh.quaternion.copy(this.body.quaternion);
    }

  }
}

// --------------------------------------------------------------------------------  

export { Player }

// --------------------------------------------------------------------------------
