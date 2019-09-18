
import * as THREE from 'three'
import { IsKeyDown } from './keyboard'

// --------------------------------------------------------------------------------

class Player {
  constructor(scene) {
    this.geometry = new THREE.ConeGeometry( 3, 5, 3, 1, false, Math.PI/2, Math.PI*1.5 );
    this.material = new THREE.MeshPhysicalMaterial( {color: 0xff7700} );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.maxvelocity = 0.5
    this.reset()
    scene.add(this.mesh)
  }

  reset() {
    this.velocity = 0.0
    this.mesh.rotation.y = Math.PI;
    this.mesh.position.x = 0.0
    this.mesh.position.y = 2.0
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
  }

}

// --------------------------------------------------------------------------------  

export { Player }

// --------------------------------------------------------------------------------

