# Scene
- `new Scene()`
- `scene.add(mesh: Mesh)`

# Camera
- `new THREE.PerspectiveCamera(75, aspectRatio: number, 0.1, 1000)`;
- `camera.position.x`

# Renderer
- `new WebGLRenderer()`
- `renderer.domElement: DOMElement`
- `renderer.setSize(width: number, height: number)`
- `renderer.render(scene: Scene, camera: Camera)`

# Geometry
- `new BoxGeometry(width, height, depth)`

# Material
- `new MeshBasicMaterial({ color: number })` : ライト効かない
- `new MeshDepthMaterial({ color: number })`: 白黒
- `new MeshLambertMaterial({ color: number })`: つやなし
- `new MeshPhongMaterial({ color: number })`: つやあり
- `new MeshStandardMaterial({ color: number })`: テッカテカ



# Mesh
- `new Mesh(geometry: Geometry, material: Material)`
- `renderer.domElement: DOMElement`
- `renderer.setSize(width: number, height: number)`
- `renderer.render(scene: Scene, camera: Camera)`
