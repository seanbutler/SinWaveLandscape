import * as THREE from 'three'
import * as CANNON from 'cannon'

// --------------------------------------------------------------------------------

let PATCHDIMS = 64
let PATCHDIVS = 64

class FlatEnvironment {
  constructor(sc, world) {
    this.geometry = new THREE.PlaneBufferGeometry( PATCHDIMS, PATCHDIMS, PATCHDIVS, PATCHDIVS );
    this.material = new THREE.MeshLambertMaterial( {color: 0xff8800} );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

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

class NaturalEnvironment {
  constructor(sc, world) {
    this.material = new THREE.MeshLambertMaterial( {color: 0xff8800 } );

    // Create a heightfield
    var matrix = [];
    var sizeX = 64,
        sizeY = 64;

    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {
            var height = 2.0 * Math.cos(i / sizeX * Math.PI * 5) * Math.cos(j/sizeY * Math.PI * 5) * 2 + 2;
            matrix[i].push(height);
        }
    }

    this.shape = new CANNON.Heightfield(matrix, {
        elementSize: 100 / sizeX
    });

    this.geometry = new THREE.Geometry();
    this.body = new CANNON.Body({ mass: 0 });

    var v0 = new CANNON.Vec3();
    var v1 = new CANNON.Vec3();
    var v2 = new CANNON.Vec3();
    for (var xi = 0; xi < this.shape.data.length - 1; xi++) {
        for (var yi = 0; yi < this.shape.data[xi].length - 1; yi++) {
            for (var k = 0; k < 2; k++) {
              this.shape.getConvexTrianglePillar(xi, yi, k===0);
                v0.copy(this.shape.pillarConvex.vertices[0]);
                v1.copy(this.shape.pillarConvex.vertices[1]);
                v2.copy(this.shape.pillarConvex.vertices[2]);
                v0.vadd(this.shape.pillarOffset, v0);
                v1.vadd(this.shape.pillarOffset, v1);
                v2.vadd(this.shape.pillarOffset, v2);
                this.geometry.vertices.push(
                    new THREE.Vector3(v0.x, v0.y, v0.z),
                    new THREE.Vector3(v1.x, v1.y, v1.z),
                    new THREE.Vector3(v2.x, v2.y, v2.z)
                );
                var i = this.geometry.vertices.length - 3;
                this.geometry.faces.push(new THREE.Face3(i, i+1, i+2));
            }
        }
    }
    this.geometry.computeBoundingSphere();
    this.geometry.computeFaceNormals();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;

    var axis = new CANNON.Vec3(1,0,0)
    var angle = this.mesh.rotation.x
    this.body.quaternion.setFromAxisAngle(axis, angle)

    this.body.addShape(this.shape);
    this.body.position.set(-sizeX * this.shape.elementSize / 2, -sizeY * this.shape.elementSize / 2, -1);

    world.addBody(this.body)
    sc.add(this.mesh)

    this.reset()
  }

  reset() {
    this.mesh.position.x = this.body.position.x = -32;
    this.mesh.position.y = this.body.position.y = 0;
    this.mesh.position.z = this.body.position.z = 32;
  }

  update() {
  }
}

// --------------------------------------------------------------------------------

export { FlatEnvironment, NaturalEnvironment }

// --------------------------------------------------------------------------------
