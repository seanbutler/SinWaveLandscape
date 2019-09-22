import * as THREE from 'three'
import * as CANNON from 'cannon'

// --------------------------------------------------------------------------------

let PATCHDIMS = 256
let PATCHDIVS = 64
let PATCHSIZE = PATCHDIMS / PATCHDIVS

class RandomEnvironmentEntity {
  constructor(sc, world) {
    this.geometry = new THREE.PlaneBufferGeometry( PATCHDIMS, PATCHDIMS, PATCHDIVS, PATCHDIVS );
    this.material = new THREE.MeshBasicMaterial( {color: 0xff8800, side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.rotation.x = -Math.PI / 2;


    // Create a plane
    this.body = new CANNON.Body({
      mass: 0 // mass == 0 makes the body static
    });
    this.shape = new CANNON.Plane()
    this.body.addShape(this.shape)

    var axis = new CANNON.Vec3(1,0,0);
    var angle = this.mesh.rotation.x
    this.body.quaternion.setFromAxisAngle(axis, angle);

    
    world.addBody(this.body)
    sc.add(this.mesh)

    this.reset()
  }

  reset() {
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.position.z = 0;

    this.body.position.x = 0;
    this.body.position.y = 0;
    this.body.position.z = 0;
  }

  update() {
  }
}

// --------------------------------------------------------------------------------

export { RandomEnvironmentEntity }

// --------------------------------------------------------------------------------
