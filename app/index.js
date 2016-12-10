window.onload = function () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 10;
  pointLight.position.y = 5000;
  pointLight.position.z = 3000;
  scene.add(pointLight);

  const points = [];
  for (let i = 0; i < 300; i++) {
    const point = new THREE.Points(
      new THREE.SphereGeometry(10, 16, 16)
    );
    points.push(point);
    scene.add(point);
  }

  offset = {
    x: points.map((p, i) => Math.random() * 100 - 50),
    y: points.map((p, i) => Math.random() * 100 - 50),
    z: points.map((p, i) => Math.random() * -100 + 50),
  }


  camera.position.z = 50;

    function render() {
      requestAnimationFrame( render );

      const now = performance.now();
      points.forEach((point, i) => {
        point.position.x = Math.sin(now/30 + i * 400) * (10 * (i % 11 +1)) + offset.x[i];
        point.position.y = Math.sin(now/30 + i * 700) * (10 * (i % 13 +1)) + offset.y[i];
        point.position.z = Math.pow(Math.sin(now/100 + i * 9), 3) * (i % 11 +1) + offset.z[i];
      })

      renderer.render( scene, camera );
    }
    render();
};
