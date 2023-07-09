import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const boxGeo = new THREE.BoxGeometry(1, 0.1, 1);
const lightSq = new THREE.MeshBasicMaterial({ color: "ash" });
const darkSq = new THREE.MeshBasicMaterial({ color: "brown" });

let board = new THREE.Group();

for (let x = 0; x < 10; x++) {
  for (let z = 0; z < 10; z++) {
    let cube;
    if (z % 2 == 0) {
      cube = new THREE.Mesh(boxGeo, x % 2 == 0 ? lightSq : darkSq);
    } else {
      cube = new THREE.Mesh(boxGeo, x % 2 == 0 ? darkSq : lightSq);
    }

    cube.position.set(x, 0, z);
    board.add(cube);
  }
}

scene.add(board);

camera.position.y = 1;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();
controls.target.set(4.5, 0, 4.5);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2;
controls.maxDistance = 10;

document.body.appendChild(renderer.domElement);

window.requestAnimationFrame(animate);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();
