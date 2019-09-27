import * as THREE from 'three';

class GeneralLights {
  constructor(scene) {
    this.lightIn = new THREE.PointLight('#4CAF50', 30);
    this.lightOut = new THREE.PointLight('#2196F3', 10);
    this.rad = 80;
    this.lightOut.position.set(40, 20, 40);
    scene.add(this.lightIn);
    scene.add(this.lightOut);
  }

  update(time) {
    const x = this.rad * Math.sin(time * 0.2);
    this.lightOut.position.x = x;
  }
}

export default GeneralLights;
