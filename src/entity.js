
import * as THREE from 'three'
import * as CANNON from 'cannon'

// --------------------------------------------------------------------------------

class Entity {
  constructor(scene, world) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshPhysicalMaterial({ color: 0x0077FF })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.reset()

    this.body = new CANNON.Body({
       mass: 5, // kg
       position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
       shape: new CANNON.Sphere(1)
    })
    world.addBody(this.body)

    scene.add(this.mesh)
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 1.0;
    // this.mesh.rotation.x = Math.random() * ( 2.0 * Math.PI);
    // this.mesh.rotation.y = Math.random() * ( 2.0 * Math.PI);
    // this.mesh.rotation.z = Math.random() * ( 2.0 * Math.PI);

    this.mesh.position.x = (Math.random() * 20) - 10;
    this.mesh.position.y = (Math.random() * 10);
    this.mesh.position.z = (Math.random() * 20) - 10;
  }

  update() {
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.01;
    // this.mesh.rotation.z += 0.01;

    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;

  }
}

// --------------------------------------------------------------------------------  

export { Entity }

// --------------------------------------------------------------------------------

