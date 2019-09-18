import * as THREE from 'three'

// --------------------------------------------------------------------------------

let PATCHDIMS = 256
let PATCHDIVS = 64
let PATCHSIZE = PATCHDIMS / PATCHDIVS

class RandomEnvironmentEntity {
  constructor(sc) {
    this.geometry = new THREE.PlaneBufferGeometry( PATCHDIMS, PATCHDIMS, PATCHDIVS, PATCHDIVS );
    this.geometry.rotateX( - Math.PI / 2 );

    var position = this.geometry.attributes.position;

    var vertex = new THREE.Vector3()
    var i, l;
    for ( i = 0, l = position.count; i < l; i ++ ) {
      vertex.fromBufferAttribute( position, i )
      vertex.x += Math.random() * PATCHSIZE - (PATCHSIZE/2) 
      vertex.y += Math.random() * 1.0
      vertex.z += Math.random() * PATCHSIZE - (PATCHSIZE/2)
      position.setXYZ( i, vertex.x, vertex.y, vertex.z )
    }

    this.geometry = this.geometry.toNonIndexed() // ensure each face has unique vertices
    position = this.geometry.attributes.position
    var color = new THREE.Color();
    var colors = [];
    for ( var i = 0, l = position.count; i < l; i ++ ) {
      color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      colors.push( color.r, color.g, color.b );
    }
    this.geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    this.material = new THREE.MeshPhysicalMaterial( { vertexColors: THREE.VertexColors } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.reset()
    sc.add(this.mesh)
  }

  reset() {
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.position.z = 0;
  }

  update() {
  }
}

// --------------------------------------------------------------------------------

export { RandomEnvironmentEntity }

// --------------------------------------------------------------------------------
