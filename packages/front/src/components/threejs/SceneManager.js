import * as THREE from 'three';
import SceneSubject from './SceneSubject';
import GeneralLights from './GeneralLights';


class SceneManager {
  constructor(canvas) {
    this.clock = new THREE.Clock();
    this.origin = new THREE.Vector3(0, 0, 0);
    this.screenDimensions = {};
    this.mousePosition = {
      x: 0,
      y: 0,
    };
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    };
    this.canvas = canvas;
    this.scene = this.buildScene();
    this.renderer = null;
    this.buildRender(this.screenDimensions);
    this.camera = this.buildCamera(this.screenDimensions);
    this.sceneSubjects = this.createSceneSubjects(this.scene);
  }

  buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f47173');

    return scene;
  }

  buildRender({ width, height }) {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.renderer.setPixelRatio(DPR);
    this.renderer.setSize(width, height);

    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 4;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.z = 40;

    return camera;
  }

  createSceneSubjects(scene) {
    const sceneSubjects = [
      new GeneralLights(scene),
      new SceneSubject(scene),
    ];

    return sceneSubjects;
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();

    for (let i = 0; i < this.sceneSubjects.length; i++) {
      this.sceneSubjects[i].update(elapsedTime);
    }

    this.updateCameraPositionRelativeToMouse();

    this.renderer.render(this.scene, this.camera);
  }

  updateCameraPositionRelativeToMouse() {
    this.camera.position.x += ((this.mousePosition.x * 0.01) - this.camera.position.x) * 0.1;
    this.camera.position.y += ((this.mousePosition.y * 0.01) - this.camera.position.y) * 0.3;
    this.camera.lookAt(this.origin);
  }

  onWindowResize() {
    const { width, height } = this.canvas;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  onMouseMove(x, y) {
    this.mousePosition.x = x;
    this.mousePosition.y = y;
  }
}

export default SceneManager;
