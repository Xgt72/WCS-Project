import * as THREE from 'three';
import alphaTexture from '../../assets/abstract-4431599_1920.jpg';

class SceneSubject {
  constructor(scene) {
    this.group = new THREE.Group();
    this.subjectGeometry = new THREE.TorusKnotBufferGeometry(20, 3, 200, 30);
    this.subjectMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.speed = 0.2;
    this.textureOffsetSpeed = 0.02;
    this.subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
    this.subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
    this.subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
    this.subjectMaterial.alphaMap.repeat.y = 1;
    this.subjectMesh = new THREE.Mesh(this.subjectGeometry, this.subjectMaterial);
    this.group.add(this.subjectMesh);
    // this.group.add(this.subjectWireframe);
    scene.add(this.group);
    this.group.rotation.z = Math.PI / 4;
  }


  update(time) {
    const angle = time * this.speed;

    this.group.rotation.y = angle;

    // this.subjectMaterial.alphaMap.offset.y = 0.55 + time * this.textureOffsetSpeed;

    // this.subjectWireframe.material.color.setHSL(Math.sin(angle * 2), 0.5, 0.5);

    // const scale = (Math.sin(angle * 8) + 6.4) / 5;
    // this.subjectWireframe.scale.set(scale, scale, scale);
  }
}
export default SceneSubject;
