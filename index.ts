// Import stylesheets
import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SphereGeometry } from 'three/src/geometries/Geometries';
import { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial';
import { Mesh } from 'three/src/objects/Mesh';

//配置webgl渲染器
const aspectRatio = window.innerWidth / window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x0000000);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//设置相机为正交投影
const camera = new THREE.OrthographicCamera(
  (150 * aspectRatio) / -2,
  (150 * aspectRatio) / 2,
  150 / 2,
  150 / -2,
  10,
  300
);
camera.position.set(150, 150, 150);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const limit = 20;
const generateRandomPts = (num: number) => {
  return new Array(num).fill([]).map((val) => {
    return {
      x: Math.random() * limit * 2 - limit,
      y: Math.random() * limit * 2 - limit,
      z: Math.random() * limit * 2 - limit,
    };
  });
};

const pts = generateRandomPts(25); //15个点
const drawPts = (points: typeof pts) => {
  for (let pt of points) {
    const geometry = new SphereGeometry(0.5);
    const mesh = new Mesh(
      geometry,
      new MeshLambertMaterial({
        color: `hsl(${(pt.y * 360) / limit},,100%,100%)`,
      })
    );
    mesh.position.set(pt.x, pt.y, pt.z);
    scene.add(mesh);
  }
};
drawPts(pts);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};
animate();
