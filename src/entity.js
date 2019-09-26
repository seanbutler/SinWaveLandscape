
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
       shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
      })
    world.addBody(this.body)
    scene.add(this.mesh)
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 1.0;
    this.mesh.position.x = (Math.random() * 20) - 10;
    this.mesh.position.y = (Math.random() * 10);
    this.mesh.position.z = (Math.random() * 20) - 10;
    // this.mesh.position.x = 0;
    // this.mesh.position.y = (Math.random() * 200);
    // this.mesh.position.z = 0;    
  }

  update() {
    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;
  }
}



class Obstacle {
  constructor(scene, world) {
    this.geometry = new THREE.BoxGeometry(10, 10, 10)
    this.material = new THREE.MeshPhysicalMaterial({ color: 0xff00FF })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.reset()

    this.body = new CANNON.Body({
       mass: 500, // kg
       position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
       shape: new CANNON.Box(new CANNON.Vec3(5, 5, 5))
      })
    world.addBody(this.body)

    scene.add(this.mesh)
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 1.0;
    this.mesh.position.x = (Math.random() * 50) - 25;
    this.mesh.position.y = (Math.random() * 20);
    this.mesh.position.z = (Math.random() * 50) - 25;
  }

  update() {
    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;

  }
}


// --------------------------------------------------------------------------------  

export { Entity, Obstacle}

// --------------------------------------------------------------------------------

