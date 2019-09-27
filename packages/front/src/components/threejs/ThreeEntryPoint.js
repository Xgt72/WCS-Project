import SceneManager from './SceneManager';

class ThreeEntryPoint {
  constructor(container) {
    this.canvas = this.createCanvas(document, container);
    this.sceneManager = new SceneManager(this.canvas);
    this.blindEventListeners();
    this.render();
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.sceneManager.onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
      this.sceneManager.updateCameraPositionRelativeToMouse();
    });
  }

  createCanvas(document, container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas;
  }

  blindEventListeners() {
    window.onresize = () => { this.resizeCanvas(); };
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.sceneManager.onWindowResize();
  }

  render() {
    requestAnimationFrame(
      () => {
        this.render();
      },
    );
    this.sceneManager.update();
  }
}

export default ThreeEntryPoint;
