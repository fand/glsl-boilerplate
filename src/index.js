const THREE          = require('three');
const glsl           = require('glslify');
const vertexShader   = glsl.file('./vs/index.vert');
const fragmentShader = glsl.file('./fs/index.frag');

const width  = window.innerWidth;
const height = window.innerHeight;

const uniforms = {
  time : {
    type  : 'f',
    value : 0.0,
  },
  resolution : {
    type  : 'v2',
    value : new THREE.Vector2()
  },
  mouse : {
    type  : 'v2',
    value : new THREE.Vector2()
  },
};

uniforms.resolution.value.x = width;
uniforms.resolution.value.y = height;

window.onload = function () {
  const scene    = new THREE.Scene();
  const camera   = new THREE.OrthographicCamera(0, 0, 0, 0, 0, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 1, 1),
    new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
  );
  scene.add(plane);

  const START = performance.now() / 1000.0;

  let pos = [0, 0];
  window.onmousemove = function (e) {
    pos = [e.clientX / width, 1.0 - e.clientY / height];
  };

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    // Update uniform values
    uniforms.time.value = performance.now() / 1000.0 - START;
    uniforms.mouse.value.set(...pos);
  }
  render();
};
