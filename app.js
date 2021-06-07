import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


// Scene Creation
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.FogExp2(0x87CEFA, 0.002);

// Camera initialization
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(60, 15, 0);


// Light object to add light and set it's features on scene.
var light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

// Ambient light added to the scene
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
scene.add(ambientLight);


// var myPlane = new THREE.Plane(new THREE.Vector3( 1, 1, 0.2 ), 3);
// const helper = new THREE.PlaneHelper(myPlane, 1, 0xffff00);
// scene.add(myPlane);


// Plane/Ground/Ground object to create a floor
var geo = new THREE.PlaneGeometry(15000, 15000, 30, 30);
var mat = new THREE.MeshBasicMaterial({ color: 0x006400, side: THREE.DoubleSide, wireframe: false });
var plane = new THREE.Mesh(geo, mat);

scene.add(plane);
plane.rotation.x = (-Math.PI / 2);


// A grid helps to locate the floor a.k.a ground
const grid = new THREE.GridHelper(3000, 20, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);


// Object to resemble leaves of the tree
var sphere = new THREE.SphereGeometry(38, 28, 29, 0, 6.3, 0, 6.3);
var material = new THREE.MeshBasicMaterial({ color: 0x910f00 });

// Object to create bark of the tree
var poles = new THREE.CylinderGeometry(4, 10, 90, 35);
var material2 = new THREE.MeshPhongMaterial({ color: 0xcccccc });


// Loop to randomly allocate 50 tree like shapes in the view
for (let i = 0; i < 50; i++) {

	var bark = new THREE.Mesh(poles, material2);
	const leaves = new THREE.Mesh(sphere, material);



	let posX = Math.random() * 1600 - 800;
	let posZ = Math.random() * 1600 - 800;


	bark.position.x = posX;
	leaves.position.x = posX;

	bark.position.y += 28;
	leaves.position.y += 100;

	bark.position.z = posZ;
	leaves.position.z = posZ;

	bark.updateMatrix();
	bark.matrixAutoUpdate = false;
	scene.add(bark);
	scene.add(leaves);


}


// Action Array to store the animation actions for our character.
let actions = [];

// FBXLoader is the filmbox extension loader for our character.


// let character = new FBXLoader();
// character.load('./Character/Ch20_nonPBR.fbx', (fbx) => {

// 	fbx.scale.setScalar(0.2);
// 	fbx.traverse(c => {
// 		c.castShadow = true;
// 		c.receiveShadow = false;
// 	});


// 	character.load('./Character/Walking.fbx', function (anim) {

// 		const mixer = new THREE.AnimationMixer(fbx);
// 		mixer.clipAction(anim.animations[0]).play();;
// 		actions.push({ anim, mixer });

// 		anim.traverse(function (child) {

// 			if (child.isMesh) {
// 				child.castShadow = true;
// 				child.receiveShadow = false;
// 			}
// 		});

// 	});

// 	scene.add(fbx);

// });


// Dance Animation of our character

let character = new FBXLoader();
character.load('./Character/Silly Dancing.fbx', function (anim) {

	anim.scale.setScalar(0.2);
	const mixer = new THREE.AnimationMixer(anim);
	mixer.clipAction(anim.animations[0]).play();
	actions.push({anim, mixer});

	anim.traverse(function (child) {

		if (child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = false;
		}
	});

	scene.add(anim);
});


camera.lookAt(new THREE.Vector3(0, 0, 0));


// Renderer object is needed to render the object to the scene
var renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);


// Controls for mouse movement
var controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 150000;

// View to be seen by mouse movement as if it's not set then camera will move 360 degree
// in all directions 
controls.maxPolarAngle = Math.PI / 2.5;


// animation rendering using a clock so that character animation can be rendered with time
// as time goes by.                                                     
const clock = new THREE.Clock();

var animate = function () {

	actions.forEach(({ mixer }) => { mixer.update(clock.getDelta()); });

	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}


window.addEventListener('resize', onWindowResize);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
