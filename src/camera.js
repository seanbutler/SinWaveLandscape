
import * as THREE from 'three'

// --------------------------------------------------------------------------------

class CameraEntity {
  constructor(parent) {

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    parent.add(this.camera)
    this.reset()
  }

  reset() {
    this.camera.rotation.y += Math.PI
    this.camera.position.y = 3
    this.camera.position.z = -10
  }

  update() {
  }
}

// --------------------------------------------------------------------------------  

export { CameraEntity }

// --------------------------------------------------------------------------------

