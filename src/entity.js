
import * as THREE from 'three'

// --------------------------------------------------------------------------------

class Entity {
  constructor(scene) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh)
    this.reset()
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 2.0;
    this.mesh.rotation.x = Math.random() * ( 2.0 * Math.PI);
    this.mesh.rotation.y = Math.random() * ( 2.0 * Math.PI);
    this.mesh.rotation.z = Math.random() * ( 2.0 * Math.PI);

    this.mesh.position.x = (Math.random() * 100) - 50;
    this.mesh.position.y = 1;
    this.mesh.position.z = (Math.random() * 100) - 50;
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.01;
  }
}

// --------------------------------------------------------------------------------  

export { Entity }

// --------------------------------------------------------------------------------

