import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import classroom from '../../assets/building-07.gltf';
const loader = new GLTFLoader();

class SceneSubject {
	constructor(scene) {
		this.group = new THREE.Group();
		// this.subjectGeometry = new THREE.TorusKnotBufferGeometry(20, 3, 200, 30);
		// this.subjectMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
		this.speed = 0.2;
		// this.textureOffsetSpeed = 0.02;
		// this.subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
		// this.subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
		// this.subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
		// this.subjectMaterial.alphaMap.repeat.y = 1;
		// this.subjectMesh = new THREE.Mesh(this.subjectGeometry, this.subjectMaterial);
		// this.group.add(this.subjectMesh);

		loader.load(classroom, gltf => {
			gltf.scene.scale.set(2, 2, 2);
			gltf.scene.position.y = -1;
			this.group.add(gltf.scene);
			// scene.add(this.group);
		});

		scene.add(this.group);
		// this.group.rotation.z = Math.PI / 4;
	}

	update(time) {
		const angle = time * this.speed;

		this.group.rotation.y = angle;
		// this.group.rotation.x = angle;
	}
}
export default SceneSubject;
