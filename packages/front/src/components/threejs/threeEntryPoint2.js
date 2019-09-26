// import SceneManager from './SceneManager';

// export default (container) => {
//   const canvas = createCanvas(document, container);
//   const sceneManager = new SceneManager(canvas);

//   blindEventListeners();
//   render();
//   canvas.addEventListener('mousemove', (e) => {
//     const rect = canvas.getBoundingClientRect();
//     sceneManager.onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
//     sceneManager.updateCameraPositionRelativeToMouse();
//   });

//   function createCanvas(document, container) {
//     const canvas = document.createElement('canvas');
//     container.appendChild(canvas);
//     return canvas;
//   }

//   function blindEventListeners() {
//     window.onresize = resizeCanvas;
//     resizeCanvas();
//   }

//   function resizeCanvas() {
//     canvas.style.width = '100%';
//     canvas.style.height = '100%';

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     sceneManager.onWindowResize();
//   }

//   function render() {
//     requestAnimationFrame(render);
//     sceneManager.update();
//   }
// };
