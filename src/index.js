const THREE          = require('three');
const glsl           = require('glslify');
const vertexShader   = glsl.file('./index.vs.glsl');
const fragmentShader = glsl.file('./index.fs.glsl');

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
  const camera   = new THREE.OrthographicCamera(1, -1, -1, 1, 1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    // new THREE.MeshBasicMaterial({color: 0xff0000 })
    new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
  );
  scene.add(plane);

  camera.position.z = 50;

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    uniforms.time.value += 0.05;
  }
  render();
};
