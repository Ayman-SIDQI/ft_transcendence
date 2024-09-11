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
// Object_6 is for score p2 and Object_4 is for the score p1


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let AKeyState = false
let DKeyState = false
let ArrowLeftKeyState = false
let ArrowRightKeyState = false
let Score1 = 0;
let Score2 = 0;
let stringScore = Score1 + "   " + Score2;



// function GenerateRandomDir() {
//     return Boolean(Math.floor(Math.random() * 2))
// }

export class threeDimensionGame {
    speedX = 1;
    speedZ = 1;


    constructor() {

        this.gameObjects = {
            paddle1: null,
            paddle2: null,
            ball: null,
            boundingBox: null,
            boundingWall: null,
            boundingWallTwo: null,
            boundingPaddle1: null,
            boundingPaddle2: null,
            boundingGoal1: null,
            boundingGoal2: null,
            wall1: null,
            wall2: null,
            goal1: null,
            goal2: null,
            textMesh: null
        };

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

        const gradientMaterial = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            void main() {
                gl_FragColor = vec4(mix(vec3(0.0039, 0.0392, 0.0275), vec3(0.0235, 0.098, 0.1176), gl_FragCoord.y / 1000.0), 1.0);
            }
            `,
            depthWrite: false
        });

        const gradientPlane = new THREE.PlaneGeometry(2, 2);
        const gradientMesh = new THREE.Mesh(gradientPlane, gradientMaterial);
        this.scene.add(gradientMesh);

        this.camera.position.set(10, 10,);

        const axisHelper = new THREE.AxesHelper(100);
        this.scene.add(axisHelper);
        const grid = new THREE.GridHelper(50);
        this.scene.add(grid);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const fontLoader = new FontLoader();
        const self = this; // Store reference to the class instance

        fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            const textGeometry = new TextGeometry(stringScore, {
                font: font,
                size: 1,          // Size of the text
                height: 0.2,      // Depth of the text extrusion
                curveSegments: 12, // Number of segments for curves
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 5
            });

            const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            textMesh.position.set(-3, -3, -10); // Position the text
            self.scene.add(textMesh);
        });
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        const loader = new GLTFLoader();
        loader.load(
            './assets/models/day_6_video_game/scene.gltf',
            (gltf) => {
                const findObject = (gltf, name) => {
                    console.log('Searching for object:', name);
                    let foundObject = null;
                    gltf.scene.traverse((object) => {
                        if (name == object.name) {
                            console.log('Found object:', object.name);
                            foundObject = object;
                        }
                    });
                    console.log('Loaded GLTF object:', gltf);

                    return foundObject;
                };

                this.gameObjects.paddle1 = findObject(gltf, 'Object_12');
                this.gameObjects.paddle2 = findObject(gltf, 'Object_14');
                this.gameObjects.ball = findObject(gltf, 'Object_16');
                this.gameObjects.wall1 = findObject(gltf, 'Object_12001');
                this.gameObjects.wall2 = findObject(gltf, 'Object_12002');
                this.gameObjects.goal1 = findObject(gltf, 'Goal1');
                this.gameObjects.goal2 = findObject(gltf, 'Goal2');
                // create a bounding box for the ball
                this.gameObjects.boundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingBox.setFromObject(this.gameObjects.ball);
                console.log('Bounding box:', this.gameObjects.boundingBox);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingWall = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingWall.setFromObject(this.gameObjects.wall2);
                console.log('Bounding wall:', this.gameObjects.boundingWall);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingWallTwo = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingWallTwo.setFromObject(this.gameObjects.wall1);
                console.log('Bounding paddle2:', this.gameObjects.boundingWallTwo);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingPaddle1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingPaddle1.setFromObject(this.gameObjects.paddle1);
                console.log('Bounding paddle1:', this.gameObjects.boundingPaddle1);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingPaddle2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingPaddle2.setFromObject(this.gameObjects.paddle2);
                console.log('Bounding paddle2:', this.gameObjects.boundingPaddle2);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingGoal1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingGoal1.setFromObject(this.gameObjects.goal1);
                console.log('Bounding paddle2:', this.gameObjects.boundingGoal1);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                this.gameObjects.boundingGoal2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
                this.gameObjects.boundingGoal2.setFromObject(this.gameObjects.goal2);
                console.log('Bounding paddle2:', this.gameObjects.boundingGoal2);
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // box helper for bounding box
                const boxHelper = new THREE.Box3Helper(this.gameObjects.boundingBox, 0xffff00);
                this.scene.add(boxHelper);
                const wallHelper = new THREE.Box3Helper(this.gameObjects.boundingWall, 0xffff00);
                this.scene.add(wallHelper);
                const wallTwoHelper = new THREE.Box3Helper(this.gameObjects.boundingWallTwo, 0xffff00);
                this.scene.add(wallTwoHelper);
                const paddle1Helper = new THREE.Box3Helper(this.gameObjects.boundingPaddle1, 0xffff00);
                this.scene.add(paddle1Helper);
                const paddle2Helper = new THREE.Box3Helper(this.gameObjects.boundingPaddle2, 0xffff00);
                this.scene.add(paddle2Helper);
                const Goal1Helper = new THREE.Box3Helper(this.gameObjects.boundingGoal1, 0xffff00);
                this.scene.add(Goal1Helper);
                const Goal2Helper = new THREE.Box3Helper(this.gameObjects.boundingGoal2, 0xffff00);
                this.scene.add(Goal2Helper);


                console.log("Game objects loaded successfully", this.gameObjects);

                this.scene.add(gltf.scene);
            },
            (progress) => {
                console.log('Loading progress: ' + (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('An error occurred while loading the new model', error);
            }
        );


        // GUI setup
        this.gui = new dat.GUI();
        const options = {
            sphereColor: '#00C0FF',
        };
        this.gui.addColor(options, 'sphereColor').onChange((e) => {

        });

        // Window resize handler
        window.addEventListener('resize', this.onWindowResize.bind(this));
        // init event listeners
        this.initEventListeners();

        // Start animation
        this.animate();
    }
    initEventListeners() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUP.bind(this));
    }

    handleKeyUP(e) {
        console.log(e.key);
        if (e.key == "a") AKeyState = false
        if (e.key == "d") DKeyState = false
        if (e.key == "ArrowLeft") ArrowLeftKeyState = false
        if (e.key == "ArrowRight") ArrowRightKeyState = false
    }
    handleKeyDown(e) {
        if (!this.gameObjects) return;

        if (e.key === "a") AKeyState = true
        if (e.key === "d") DKeyState = true
        if (e.key === "ArrowLeft") ArrowLeftKeyState = true
        if (e.key === "ArrowRight") ArrowRightKeyState = true
    }
    movePaddles() {
        // Move paddle 1
        if (DKeyState && !this.gameObjects.boundingPaddle1.intersectsBox(this.gameObjects.boundingWallTwo))
            this.gameObjects.paddle1.position.z += 1;
        if (AKeyState && !this.gameObjects.boundingPaddle1.intersectsBox(this.gameObjects.boundingWall))
            this.gameObjects.paddle1.position.z -= 1;
        // Move paddle 2
        if (ArrowLeftKeyState && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWallTwo))
            this.gameObjects.paddle2.position.z += 1;
        if (ArrowRightKeyState && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWall))
            this.gameObjects.paddle2.position.z -= 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    // speedX = 0.01;
    // speedZ = 0.01 = ;
    resetBall() {

        // Randomize ball speed
        const minSpeed = 0.3; // Minimum speed to ensure it's not zero
        const maxSpeed = 0.9; // Maximum speed to keep under 1
        
        // Generate random direction
        const directionX = Math.random() > 0.5 ? 1 : -1;
        const directionZ = Math.random() > 0.5 ? 1 : -1;
        
        // Generate random speed values
        this.speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
        this.speedZ = minSpeed + Math.random() * (maxSpeed - minSpeed);
        
        // Apply direction
        this.speedX *= directionX;
        this.speedZ *= directionZ;
    
        // Reset ball position
        this.gameObjects.ball.position.set(0, 0, 0);
    }
    
    // escapePaddle() {
    //     // if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingWallTwo)
    //     while ((this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle1)
    //         || this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle2)) && this.gameObjects.boundingBox.position.z > 5) 
    //     {
    //         this.gameObjects.ball.position.z -= this.speedZ
    //     }
    //   }
  
    ballPhysics(ball) {
        const paddle1Center = new THREE.Vector3();
        const paddle2Center = new THREE.Vector3();
        const ballCenter = new THREE.Vector3();
        
        this.gameObjects.boundingPaddle1.getCenter(paddle1Center);
        this.gameObjects.boundingPaddle2.getCenter(paddle2Center);
        this.gameObjects.boundingBox.getCenter(ballCenter);

        if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingWallTwo)
            || this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingWall)) this.speedZ = -this.speedZ

        if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle1)) {
            if (ballCenter.z - paddle1Center.z > 0) {
                this.speedX = -this.speedX
                this.speedZ = -this.speedZ
            }
            else
                this.speedX = -this.speedX
            this.speedZ = -this.speedZ
        }
        if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle2)) {
            if (ballCenter.z - paddle2Center.z > 0) {
                this.speedX = -this.speedX
                this.speedZ = -this.speedZ
            }
            else {
                this.speedX = -this.speedX
            }
        }

        this.gameObjects.ball.position.z += this.speedZ
        this.gameObjects.ball.position.x += this.speedX
        if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingGoal1)) {
            Score1++;
            this.resetBall();
        }
        
        else if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingGoal2)) {
            Score2++;
            this.resetBall();
        }
        console.log("string score: ", stringScore);
        this.updateText();
        stringScore = Score1 + "   " + Score2;
        // console.log("Score1:", Score1);
        // console.log("Score2:", Score2);
        // ball position - paddle center == if possitive move right else move left
    }

    updateText() {
        const self = this;
        const textGeometry = new TextGeometry(stringScore, {
            font: self.font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelSegments: 5
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        if (self.textMesh) {
            self.scene.remove(self.textMesh);
            self.textMesh.geometry.dispose();
            self.textMesh.material.dispose();
        }

        // Create new text mesh
        self.textMesh = new THREE.Mesh(textGeometry, textMaterial);
        self.textMesh.position.set(-3, -3, -10); // Position the text
        self.scene.add(self.textMesh); // Add new text to the scene
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));


        // update the helper box
        this.gameObjects.boundingBox.setFromObject(this.gameObjects.ball);
        this.gameObjects.boundingWall.setFromObject(this.gameObjects.wall2);
        this.gameObjects.boundingWallTwo.setFromObject(this.gameObjects.wall1);
        this.gameObjects.boundingPaddle1.setFromObject(this.gameObjects.paddle1);
        this.gameObjects.boundingPaddle2.setFromObject(this.gameObjects.paddle2);
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // move ball
        this.ballPhysics(this.gameObjects.ball)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
        // move paddles
        this.movePaddles();


        this.orbit.update();
        this.renderer.render(this.scene, this.camera);
        // this.scene.add(textMesh);
    }
}