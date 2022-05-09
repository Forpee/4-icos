import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertex.glsl';
import vertexParticles from './shaders/vertexParticles.glsl';
import fragmentShader from './shaders/fragment.glsl';
import fragmentLines from './shaders/fragmentLines.glsl';
import gsap from 'gsap';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.IcosahedronBufferGeometry(1, 5);

// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
});
const material1 = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentLines,
    side: THREE.DoubleSide
});
const material2 = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentLines,
    side: THREE.DoubleSide
});
const edgeGeo = new THREE.EdgesGeometry(geometry);
// Mesh
const mesh = new THREE.Mesh(geometry, material);
const meshLines = new THREE.LineSegments(edgeGeo, material1);
const meshPoints = new THREE.Points(geometry, material2);
scene.add(mesh);
scene.add(meshLines);
scene.add(meshPoints);
scene.add(new THREE.Mesh(
    new THREE.SphereBufferGeometry(1.08, 32, 32),
    new THREE.MeshMatcapMaterial({
        matcap: new THREE.TextureLoader().load('/1.png'),
        transparent: true,
        opacity: 0.5
    })
));
meshLines.scale.set(1.001, 1.001, 1.001);
meshPoints.scale.set(1.01, 1.01, 1.01);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    // Update controls
    controls.update();

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime();

    // Update uniforms
    material.uniforms.uTime.value = elapsedTime;
    material1.uniforms.uTime.value = elapsedTime;
    material2.uniforms.uTime.value = elapsedTime;

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();