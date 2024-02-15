import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

// 1. 장면 만들기
let scene = new THREE.Scene();

// 2. 브라우저에 띄우기
let canvasElement = document.querySelector('#canvas'); // 캔버스 요소 선택
let renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true, // 테두리 부드럽게
});
renderer.outputEncoding = THREE.sRGBEncoding;

// 화면 크기에 맞게 렌더러 사이즈 조정
renderer.setSize(window.innerWidth, window.innerHeight);
// 종횡비 동적 계산 및 적용
let aspectRatio = window.innerWidth / window.innerHeight;

// 카메라, 조명, 배경 세팅
let camera = new THREE.PerspectiveCamera(30, aspectRatio, 0.1, 1000);
camera.position.set(0.1, 0.1, 0.2);

// 새로운 방향성 빛 추가
let directionalLight = new THREE.DirectionalLight(0xffffff, 3); // 색상 및 강도 설정
directionalLight.position.set(3, 10, 5); // 빛의 위치 설정 (x, y, z)
scene.background=new THREE.Color('white');
scene.add(directionalLight);

// 필요하다면, 빛이 특정 방향을 향하도록 target을 설정할 수 있습니다.
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight.target); 

// 모델 로드
let loader = new GLTFLoader();

// OrbitControls 인스턴스 생성 및 설정
const controls = new OrbitControls(camera, renderer.domElement);

loader.load('macbook_final.gltf', function (gltf) {
    gltf.scene.position.x -= 0.25;
    gltf.scene.position.y -= 0.15; 
    scene.add(gltf.scene);

    // 애니메이션 적용
    function animate() {
        requestAnimationFrame(animate);
        gltf.scene.rotation.x = 0.5;
        // gltf.scene.rotation.z = 0.3;
        // gltf.scene.rotation.y += 0.001;
        controls.update(); // 카메라 변환을 마우스 움직임에 맞게 업데이트
        renderer.render(scene, camera);
    }
    animate();
});

// 화면 크기가 변경될 때 렌더러와 카메라의 설정을 업데이트
window.addEventListener('resize', () => {
    // 새 종횡비 계산
    aspectRatio = window.innerWidth / window.innerHeight;
    // 카메라 종횡비 업데이트
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    // 렌더러 사이즈 업데이트
    renderer.setSize(window.innerWidth, window.innerHeight);
});
