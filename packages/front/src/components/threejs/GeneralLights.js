import * as THREE from 'three';

class GeneralLights {
  constructor(scene) {
    // this.lightIn = new THREE.PointLight('#faf7b1', 30);
    this.lightOut = new THREE.PointLight('#b0dcff', 5);
    this.rad = 80;
    this.lightOut.position.set(40, 20, 40);
    // scene.add(this.lightIn);
    scene.add(this.lightOut);
  }

  update(time) {
    const x = this.rad * Math.sin(time * 0.2);
    // this.lightOut.position.x = x;
  }
}

export default GeneralLights;
