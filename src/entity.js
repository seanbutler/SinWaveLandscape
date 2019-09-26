
import * as THREE from 'three'
import * as CANNON from 'cannon'

// --------------------------------------------------------------------------------

class Entity {
  constructor(scene, world) {
    this.size = 1
    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size)
    this.material = new THREE.MeshLambertMaterial({ color: 0x0077FF })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.reset()

    this.body = new CANNON.Body({
       mass: this.size, // kg
       position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
       shape: new CANNON.Box(new CANNON.Vec3(this.size * 0.5, this.size * 0.5, this.size * 0.5))
      })
    world.addBody(this.body)
    scene.add(this.mesh)
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 1.0;
    this.mesh.rotation.x = this.mesh.rotation.y = this.mesh.rotation.z = 0;
    
    this.mesh.position.x = (Math.random() * 20) - 10;
    this.mesh.position.y = (Math.random() * 10);
    this.mesh.position.z = (Math.random() * 20) - 10;
  }

  update() {

    this.mesh.position.copy(this.body.position);

    if(this.body.quaternion){
        this.mesh.quaternion.copy(this.body.quaternion);
    }
  }
}



class Obstacle {
  constructor(scene, world) {
    this.geometry = new THREE.BoxGeometry(10, 10, 10)
    this.material = new THREE.MeshLambertMaterial({ color: 0xff00FF })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.reset()

    this.body = new CANNON.Body({
       mass: 0, // kg
       position: new CANNON.Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), // m
       shape: new CANNON.Box(new CANNON.Vec3(5, 5, 5))
      })
    world.addBody(this.body)

    scene.add(this.mesh)
  }

  reset() {
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = 1.0;
    this.mesh.position.x = (Math.random() * 50) - 25;
    this.mesh.position.y = 5;
    this.mesh.position.z = (Math.random() * 50) - 25;
  }

  update() {
    this.mesh.position.copy(this.body.position);

    if(this.body.quaternion){
        this.mesh.quaternion.copy(this.body.quaternion);
    }
  }
}


// --------------------------------------------------------------------------------  

export { Entity, Obstacle}

// --------------------------------------------------------------------------------

