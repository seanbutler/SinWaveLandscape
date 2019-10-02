
import * as THREE from 'three'

// --------------------------------------------------------------------------------

class LightEntity {
  constructor(parent, player) {

    this.light = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.player = player

    this.light = new THREE.DirectionalLight( 0xffffcc )
    this.light.position.set( 5, 5, 5 )
    this.light.target = player
    
    this.light.castShadow = true
    
    const SHADOW_VOL_SIZE = 256
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = SHADOW_VOL_SIZE;
    this.light.shadow.camera.left = -SHADOW_VOL_SIZE;
    this.light.shadow.camera.right = SHADOW_VOL_SIZE;
    this.light.shadow.camera.top = SHADOW_VOL_SIZE;
    this.light.shadow.camera.bottom = -SHADOW_VOL_SIZE;
    
    const SHADOW_MAP_SIZE = 1024
    this.light.shadow.mapSize.width = SHADOW_MAP_SIZE;
    this.light.shadow.mapSize.height = SHADOW_MAP_SIZE;

    this.light.shadowMapBias = 0.0039;
    this.light.shadowMapDarkness = 0.75;
    
    parent.add( this.light );
  }

  reset() {
  }

  update() {
    this.light.position.set( this.player.position.x+10, this.player.position.y+10, this.player.position.z+10 );
    this.light.target.position.set( this.player.position.x, this.player.position.y, this.player.position.z );
  }
}

// --------------------------------------------------------------------------------  

export { LightEntity }

// --------------------------------------------------------------------------------

