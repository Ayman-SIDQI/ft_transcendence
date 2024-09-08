/* 
Dear Devops dude,
In order for Three.js to work, you need to install it using npm.
here is a step by step guide to do so:
1. Open your terminal :D
2. Navigate to the root directory of the project :DD
3. Run the following command: npm install --save three
renderer.setClearColor(0xF5F5DC, 1);
4. Run the following command: npm install --save-dev vite
5. To host the file we run : npx vite
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export class threeDimensionGame {
    constructor() {
        this.step = 1000;
        this.speed = 0.05;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

        const planeGeometry = new THREE.PlaneGeometry(300, 300, 300);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x5f3d02,
            side: THREE.DoubleSide
        });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = -0.5 * Math.PI;
        this.scene.add(planeMesh);

        this.renderer.setClearColor(0xF5F5DC, 1);
        this.camera.position.set(10, 3, 5);

        // Debugging helpers
        const axisHelper = new THREE.AxesHelper(100);
        this.scene.add(axisHelper);
        const grid = new THREE.GridHelper(50);
        this.scene.add(grid);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);

        // Ball
        // const ballGeometry = new THREE.SphereGeometry(1, 64, 64);
        // const ballMaterial = new THREE.MeshStandardMaterial({
        //     color: 0x00C0FF,
        //     wireframe: false
        // });
        // this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
        // this.ball.position.set(0.5, 1.48, 0);
        // this.ball.castShadow = true;
        // this.scene.add(this.ball);

        // load gltf model
        const loader = new GLTFLoader();
        loader.load(
            './assets/models/golf_ball/scene.gltf',
            (gltf) => {
                gltf.scene.position.set(10, 3, 0);
                gltf.scene.scale.set(0.1, 0.1, 0.1);
                console.log('Model loaded successfully', gltf);
                this.scene.add(gltf.scene);
            });
        const tLoader = new THREE.TextureLoader();
        tLoader.load(`./assets/models/golf_ball/02___Default_normal.png`, function(texture) {
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material.map = texture;
                }
            } );
        });

        // GUI setup
        this.gui = new dat.GUI();
        const options = {
            sphereColor: '#00C0FF',
        };
        this.gui.addColor(options, 'sphereColor').onChange((e) => {

        });

        // Window resize handler
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start animation
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);


        // this.ball.position.y = Math.abs(Math.sin(this.step) * 10);
        // this.ball.position.x = Math.abs(Math.sin(this.step) * 10);
        // this.ball.position.z = Math.abs(Math.sin(this.step) * 10);

        this.orbit.update();
        // const currentURL = window.location.href;
        // console.log(currentURL);

    }
}