
import * as THREE from 'three'
import * as CANNON from 'cannon'

import { IsKeyDown } from './keyboard'

// --------------------------------------------------------------------------------

class Player {
  constructor(scene, world) {

    // this.geometry = new THREE.SphereGeometry(1, 16, 16)
    this.geometry = new THREE.CubeGeometry(1, 1, 1)
    this.material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true
    this.maxvelocity = 0.5
    this.userForce = new CANNON.Vec3(0.0, 0.0, 0.0)
    this.reset()
    this.scene = scene
    this.scene.add(this.mesh)

    this.body = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
      shape: new CANNON.Sphere(1.0)
    })
    world.addBody(this.body)
  }

  reset() {
    this.velocity = 0.0
    // this.mesh.rotation.y = Math.PI;
    this.mesh.position.x = Math.random() * -32
    this.mesh.position.y = 32.0
    this.mesh.position.z = Math.random() * -32
  }

  update() {
    this.driveForce = new CANNON.Vec3(0.0, 0.0, 0.0)
    this.jumpForce = new CANNON.Vec3(0.0, 0.0, 0.0)

    if (IsKeyDown(65)) {
      this.mesh.rotation.y += 0.02;
    }
    else if (IsKeyDown(68)) {
      this.mesh.rotation.y -= 0.02;
    }

    if (IsKeyDown(87)) {
      var rotMatrix = new THREE.Matrix4()
      rotMatrix.extractRotation(this.mesh.matrix)
      var direction = new THREE.Vector3( 0, 0, 1 )
      direction.applyMatrix4(rotMatrix)

      this.driveForce = direction.normalize().multiplyScalar(10)
    }
    else if (IsKeyDown(83)) {
      var rotMatrix = new THREE.Matrix4()
      rotMatrix.extractRotation(this.mesh.matrix)
      var direction = new THREE.Vector3( 0, 0, -1 )
      direction.applyMatrix4(rotMatrix)

      this.driveForce = direction.normalize().multiplyScalar(10)
    }
    
    if (IsKeyDown(32)) {
      var rotMatrix = new THREE.Matrix4()
      rotMatrix.extractRotation(this.mesh.matrix)
      var direction = new THREE.Vector3( 0, 1, 0 )
      direction.applyMatrix4(rotMatrix)

      this.jumpForce = direction.normalize().multiplyScalar(50)
    }
    let center = this.body.pointToWorldFrame(new CANNON.Vec3())
    // let center = new CANNON.Vec3(0, 0, 0)
    
    this.mesh.position.copy(this.body.position)

    // this.body.applyLocalForce(this.userForce, center)
    this.body.applyForce(this.driveForce, center)
    this.body.applyForce(this.jumpForce, center)

    if(this.body.quaternion){
        // this.mesh.quaternion.copy(this.body.quaternion);
    }

  }
}

// --------------------------------------------------------------------------------  

export { Player }

// --------------------------------------------------------------------------------
