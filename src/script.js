import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Constants and Local Variables
 */
const sizes = {
    width: window.innerWidth,
	height: window.innerHeight
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 3;
scene.add(camera);

// Cube
const geo = new THREE.BoxBufferGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
});
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// OrbitControls
const controls = new OrbitControls(
    camera,
    renderer.domElement
);
controls.enableDamping = true;
controls.update();

const clock = new THREE.Clock();
clock.start();

function loop () {

	// Animation
	const elapsedTime = clock.getElapsedTime()

	// Update controls
	controls.update()

	// Render scene again
	renderer.render(scene, camera)

	// RequestAnimationFrame
	window.requestAnimationFrame(loop)
}

loop();

window.addEventListener('resize', function () {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}, false)