/* 
Dear Devops dude,
In order for Three.js to work, you need to install it using npm.
here is a step by step guide to do so:
1. Open your terminal :D
2. Navigate to the root directory of the project :DD
3. Run the following command: npm install --save three
4. Run the following command: npm install --save-dev vite
5. To host the file we run : npx vite
*/

// z -> forward and backward
// x -> left and right
// y -> up and down
// import * as dat from 'dat.gui';

import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'https://unpkg.com/three/examples/jsm/loaders/FontLoader.js';

import { TextGeometry } from 'https://unpkg.com/three/examples/jsm/geometries/TextGeometry.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/loaders/RGBELoader.js';



let AKeyState = false
let DKeyState = false
let ArrowLeftKeyState = false
let ArrowRightKeyState = false
let gameStarted = false;
let gamePaused = false;


export class threeDimensionGame {
	speedX = 0.1;
	speedZ = 0.1;
	backgroundMusic = null;
	PathAI = false;
	once = true;

	constructor() {
		// const roomName = 'default';
		this.url = `ws://${window.location.host}/ws/game/matchmaking/`;
		// this.url = `ws://${window.location.host}/ws/game/${roomName}/`;
		this.remoteSocket = new WebSocket(this.url);

		this.remoteSocket.onopen = function () {
			console.log('WebSocket connection established');
		};
		this.remoteSocket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			console('Data: ', data);

			// switch (data.type) {
			// 	case 'connection_established':
			// 		console.log('Connected with ID:', data.player_id);
			// 		// Start matchmaking when connected
			// 		findMatch();
			// 		break;

			// 	case 'matchmaking_status':
			// 		console.log('Matchmaking status:', data.status);
			// 		// Update UI to show waiting status
			// 		break;

			// 	case 'match_found':
			// 		console.log('Match found! Game ID:', data.game_id);
			// 		// Initialize game with opponent
			// 		initGame(data.player1, data.player2);
			// 		// Send ready status
			// 		gameSocket.send(JSON.stringify({ type: 'player_ready' }));
			// 		break;

			// 	case 'game_start':
			// 		console.log('Both players ready, starting game!');
			// 		startGame();
			// 		break;

			// 	case 'game_update':
			// 		// Update game state based on opponent's data
			// 		handleGameUpdate(data.game_state);
			// 		break;

			// 	case 'player_disconnected':
			// 		handlePlayerDisconnect(data.player_id);
			// 		break;
			// }
			// this.remoteSocket.onclose = function (event) {
			// 	console.log('WebSocket connection closed');
			// };
			// function findMatch() {
			// 	gameSocket.send(JSON.stringify({ type: 'find_match' }));
			// }

			// function sendGameUpdate(gameState) {
			// 	gameSocket.send(JSON.stringify({
			// 		type: 'game_update',
			// 		game_state: gameState
			// 	}));
			// }
		}

		this.Score1 = 0;
		this.Score2 = 0;
		this.stringScore = String(this.Score1).padStart(2, '0') + " " + String(this.Score2).padStart(2, '0');
		this.gameObjects = {

			paddle1: null,
			paddle2: null,
			ball: null,
			ballAI: null,
			wallAI: null,
			boundingBox: null,
			boundingBoxAI: null,
			boundingWall: null,
			boundingWallTwo: null,
			boundingWallAI: null,
			boundingPaddle1: null,
			boundingPaddle2: null,
			boundingGoal1: null,
			boundingGoal2: null,
			wall1: null,
			wall2: null,
			goal1: null,
			goal2: null,
			coin: null,
			textMesh: null
		};


		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);


		document.querySelector("#canv").appendChild(this.renderer.domElement);




		this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

		const hdrTextureURL = 'static/assets/background/';
		new RGBELoader().setPath(hdrTextureURL).load(
			'winter_evening_8k.hdr',
			texture => {
				texture.mapping = THREE.EquirectangularReflectionMapping;
				this.scene.background = texture;
				this.scene.environment = texture;
			},
			undefined,
			error => console.error('Error loading HDR texture:', error)
		)


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
		const listener = new THREE.AudioListener();
		this.camera.add(listener);

		const audioLoader = new THREE.AudioLoader();
		this.backgroundMusic = new THREE.Audio(listener);



		audioLoader.load('static/assets/soundtracks/TOM.mp3', (buffer) => {
			this.backgroundMusic.setBuffer(buffer);
			this.backgroundMusic.setLoop(true); // sound will repeat when done
			this.backgroundMusic.setVolume(0.5);
		},
			(progress) => {
				console.log('Loading progress: ' + (progress.loaded / progress.total * 100) + '%');
			},
			(error) => {
				console.error('An error occurred while loading the background music', error);
			});
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		this.createTextMesh(this.stringScore);


		const loader = new GLTFLoader();
		loader.load(
			'static/assets/models/day_6_video_game/scene.gltf',
			(gltf) => {
				this.model = gltf.scene;
				const findObject = (gltf, name) => {
					// console.log('Searching for object:', name);
					let foundObject = null;
					gltf.scene.traverse((object) => {
						if (name == object.name) {
							foundObject = object;
						}
					});
					return foundObject;
				};


				// const objectNames =
				// {
				// 	paddle1: 'Object_12',
				// 	paddle2: 'Object_14',
				// 	ball: 'Object_16',
				// 	ballAI: 'AI_ball',
				// 	wallAI: 'AI_target',
				// 	wall1: 'Object_12001',
				// 	wall2: 'Object_12002',
				// 	goal1: 'Goal1',
				// 	goal2: 'Goal2',
				// 	coin: 'Object_20',
				// };
				// for (const [key, name] of Object.entries(objectNames)) {
				// 	this.gameObjects[key] = findObject(gltf, name);
				// }
				this.gameObjects.paddle1 = findObject(gltf, 'Object_12');
				this.gameObjects.paddle2 = findObject(gltf, 'Object_14');
				this.gameObjects.ball = findObject(gltf, 'Object_16');
				this.gameObjects.ballAI = findObject(gltf, 'AI_ball');
				this.gameObjects.wallAI = findObject(gltf, 'AI_target');
				this.gameObjects.wall1 = findObject(gltf, 'Object_12001');
				this.gameObjects.wall2 = findObject(gltf, 'Object_12002');
				this.gameObjects.goal1 = findObject(gltf, 'Goal1');
				this.gameObjects.goal2 = findObject(gltf, 'Goal2');
				this.gameObjects.coin = findObject(gltf, 'Object_20');
				// create a bounding box for the ball

				this.gameObjects.boundingWallAI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingWallAI.setFromObject(this.gameObjects.wallAI);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				this.gameObjects.boundingBoxAI = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingBoxAI.setFromObject(this.gameObjects.ballAI);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				this.gameObjects.boundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingBox.setFromObject(this.gameObjects.ball);

				// console.log('Bounding box:', this.gameObjects.boundingBox);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingWall = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingWall.setFromObject(this.gameObjects.wall2);

				// console.log('Bounding wall:', this.gameObjects.boundingWall);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingWallTwo = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingWallTwo.setFromObject(this.gameObjects.wall1);

				// console.log('Bounding paddle2:', this.gameObjects.boundingWallTwo);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingPaddle1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingPaddle1.setFromObject(this.gameObjects.paddle1);

				// console.log('Bounding paddle1:', this.gameObjects.boundingPaddle1);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingPaddle2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingPaddle2.setFromObject(this.gameObjects.paddle2);

				// console.log('Bounding paddle2:', this.gameObjects.boundingPaddle2);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingGoal1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingGoal1.setFromObject(this.gameObjects.goal1);

				// console.log('Bounding paddle2:', this.gameObjects.boundingGoal1);

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				this.gameObjects.boundingGoal2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
				this.gameObjects.boundingGoal2.setFromObject(this.gameObjects.goal2);
				// // console.log('Bounding paddle2:', this.gameObjects.boundingGoal2);

				// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				// // box helper for bounding box

				// const AIwallHelper = new THREE.Box3Helper(this.gameObjects.boundingWallAI, 0xffff00);
				// this.scene.add(AIwallHelper);
				// const AIboxHelper = new THREE.Box3Helper(this.gameObjects.boundingBoxAI, 0xffff00);
				// this.scene.add(AIboxHelper);
				// const boxHelper = new THREE.Box3Helper(this.gameObjects.boundingBox, 0xffff00);
				// this.scene.add(boxHelper);
				// const wallHelper = new THREE.Box3Helper(this.gameObjects.boundingWall, 0xffff00);
				// this.scene.add(wallHelper);
				// const wallTwoHelper = new THREE.Box3Helper(this.gameObjects.boundingWallTwo, 0xffff00);
				// this.scene.add(wallTwoHelper);
				// const paddle1Helper = new THREE.Box3Helper(this.gameObjects.boundingPaddle1, 0xffff00);
				// this.scene.add(paddle1Helper);
				// const paddle2Helper = new THREE.Box3Helper(this.gameObjects.boundingPaddle2, 0xffff00);
				// this.scene.add(paddle2Helper);
				// const Goal1Helper = new THREE.Box3Helper(this.gameObjects.boundingGoal1, 0xffff00);
				// this.scene.add(Goal1Helper);
				// const Goal2Helper = new THREE.Box3Helper(this.gameObjects.boundingGoal2, 0xffff00);
				// this.scene.add(Goal2Helper);
				this.scene.add(gltf.scene);
			},
			(progress) => {
				console.log('Loading progress: ' + (progress.loaded / progress.total * 100) + '%');
			},
			(error) => {
				console.error('An error occurred while loading the new model', error);
			}
		);

		window.addEventListener('resize', this.onWindowResize.bind(this));
		this.initEventListeners();

		this.animate();
	}



	createTextMesh(stringScore) {
		const fontLoader = new FontLoader();
		const self = this; // Store reference to the class instance

		fontLoader.load('static/assets/fonts/Bit5x3_Regular.json', function (font) {
			const textGeometry = new TextGeometry(stringScore, {
				font: font,
				size: 1.5,          // Size of the text
				depth: 0.2,       // Depth of the text extrusion
				curveSegments: 12, // Number of segments for curves
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelSegments: 5
			});
			const textMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
			const textMesh = new THREE.Mesh(textGeometry, textMaterial);
			self.gameObjects.textMesh = textMesh;
			textMesh.position.set(-2.5, -0.3, -4); // Position the text
			textMesh.rotation.x = -Math.PI / 2;
			self.scene.add(textMesh);
		});

	}



	initEventListeners() {
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUP.bind(this));
		// Start game when pressing 'Enter'
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' && !gameStarted) {
				gameStarted = true;
				gamePaused = false;
			}
		});

		// Pause game when pressing 'Space'
		document.addEventListener('keydown', (event) => {
			if (event.key === 'p') {
				gamePaused = !gamePaused;
			}
		});
		// window.addEventListener('beforeunload', this.resetScore.bind(this));
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
		if (DKeyState && !this.gameObjects.boundingPaddle1.intersectsBox(this.gameObjects.boundingWallTwo))
			this.gameObjects.paddle1.position.z += 1;
		if (AKeyState && !this.gameObjects.boundingPaddle1.intersectsBox(this.gameObjects.boundingWall))
			this.gameObjects.paddle1.position.z -= 1;
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	resetBall() {
		// Randomize ball speed
		const minSpeed = 0.3;
		const maxSpeed = 0.9;
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
		this.PathAI = false;
		this.once = true;
	}


	updateText(stringScore) {
		// this.stringScore = String(this.Score1).padStart(2, '0') + " " + String(this.Score2).padStart(2, '0');
		if (this.gameObjects.textMesh) {
			this.scene.remove(this.gameObjects.textMesh);
			this.gameObjects.textMesh.geometry.dispose();
			this.gameObjects.textMesh.material.dispose();
			this.gameObjects.textMesh = null;
		}
		this.createTextMesh(stringScore);
	}


	setBounders() {
		this.gameObjects.boundingBox.setFromObject(this.gameObjects.ball);
		this.gameObjects.boundingWall.setFromObject(this.gameObjects.wall2);
		this.gameObjects.boundingWallTwo.setFromObject(this.gameObjects.wall1);
		this.gameObjects.boundingPaddle1.setFromObject(this.gameObjects.paddle1);
		this.gameObjects.boundingPaddle2.setFromObject(this.gameObjects.paddle2);
		this.gameObjects.boundingBoxAI.setFromObject(this.gameObjects.ballAI);
	}


	ballPhysics(ball) {

		const paddle1Center = new THREE.Vector3();
		const paddle2Center = new THREE.Vector3();
		const ballCenter = new THREE.Vector3();

		this.gameObjects.boundingPaddle1.getCenter(paddle1Center);
		this.gameObjects.boundingPaddle2.getCenter(paddle2Center);
		this.gameObjects.boundingBox.getCenter(ballCenter);


		if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingWallTwo)) {
			if (ballCenter.x - paddle1Center.x > 0 && this.speedZ > 0) this.speedZ = -this.speedZ
			else if (this.speedZ > 0) this.speedZ = -this.speedZ
		}
		if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingWall)) {
			if (ballCenter.x - paddle2Center.x > 0 && this.speedZ < 0) this.speedZ = -this.speedZ
			else if (this.speedZ < 0) this.speedZ = -this.speedZ
		}


		if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle1)) {
			// ai ball is spawned in the intersection place :p
			this.gameObjects.ballAI.position.copy(this.gameObjects.ball.position);
			this.PathAI = true;

			if (ballCenter.z - paddle1Center.z > 0 && this.speedX < 0) {
				this.speedX = -this.speedX
				this.speedZ = -this.speedZ
			}
			else if (this.speedX < 0) {
				this.speedX = -this.speedX
				this.speedZ = -this.speedZ
			}
		}

		if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingPaddle2)) {
			if (ballCenter.z - paddle2Center.z > 0 && this.speedX > 0) {
				this.speedX = -this.speedX;
				this.speedZ = -this.speedZ;
			}
			else if (this.speedX > 0) {
				this.speedX = -this.speedX;
			}
		}

		this.gameObjects.ball.position.z += this.speedZ;
		this.gameObjects.ball.position.x += this.speedX;

		if (this.PathAI) {
			// console.log(this.aiSpeedMultiplier);
			this.updateAIBallPhysics(this.speedZ, this.speedX);
		}
		if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingGoal1)) {
			this.Score1++;
			this.stringScore = String(this.Score1).padStart(2, '0') + " " + String(this.Score2).padStart(2, '0');
			this.resetBall();
			this.updateText(this.stringScore);
			// console.log(stringScore);
		}
		else if (this.gameObjects.boundingBox.intersectsBox(this.gameObjects.boundingGoal2)) {
			this.Score2++;
			this.stringScore = String(this.Score1).padStart(2, '0') + " " + String(this.Score2).padStart(2, '0');
			this.resetBall();
			this.updateText(this.stringScore);
		}
	}
	updateAIBallPhysics(aiSpeedZ, aiSpeedX) {
		const paddle1Center = new THREE.Vector3();
		const paddle2Center = new THREE.Vector3();
		const aiBallCenter = new THREE.Vector3();
		const aiSpeedMultiplier = 1.5;
		const targetPositionZ = this.gameObjects.ballAI.position.z;


		if (this.once) {
			this.aiSpeedZ = aiSpeedZ;
			this.aiSpeedX = aiSpeedX;
			this.once = false;
			console.log(aiSpeedZ
				, aiSpeedX);
		}
		console.log(this.once);

		this.gameObjects.boundingPaddle1.getCenter(paddle1Center);
		this.gameObjects.boundingPaddle2.getCenter(paddle2Center);
		this.gameObjects.boundingBoxAI.getCenter(aiBallCenter);
		// console.log(this.gameObjects.boundingPaddle1.getCenter(paddle1Center));

		// AI ball independent intersection logic
		if (this.gameObjects.boundingBoxAI.intersectsBox(this.gameObjects.boundingWallTwo)) {
			if (aiBallCenter.x - paddle1Center.x > 0 && this.aiSpeedZ > 0) this.aiSpeedZ = -this.aiSpeedZ
			else if (this.aiSpeedZ > 0) this.aiSpeedZ = -this.aiSpeedZ
		}
		if (this.gameObjects.boundingBoxAI.intersectsBox(this.gameObjects.boundingWall)) {
			if (aiBallCenter.x - paddle2Center.x > 0 && this.aiSpeedZ < 0) this.aiSpeedZ = -this.aiSpeedZ
			else if (this.aiSpeedZ < 0) this.aiSpeedZ = -this.aiSpeedZ
		}

		if (this.gameObjects.boundingBoxAI.intersectsBox(this.gameObjects.boundingPaddle1)) {
			if (aiBallCenter.z - paddle1Center.z > 0 && this.aiSpeedX < 0) {
				this.aiSpeedX = -this.aiSpeedX;
				this.aiSpeedZ = -this.aiSpeedZ;
			} else if (this.aiSpeedX < 0) {
				this.aiSpeedX = -this.aiSpeedX;
				this.aiSpeedZ = -this.aiSpeedZ;
			}
		}

		if (this.gameObjects.boundingBoxAI.intersectsBox(this.gameObjects.boundingPaddle2)) {
			if (aiBallCenter.z - paddle2Center.z > 0 && this.aiSpeedX > 0) {
				this.aiSpeedX = -this.aiSpeedX;
				this.aiSpeedZ = -this.aiSpeedZ;
			} else if (this.aiSpeedX > 0) {
				this.aiSpeedX = -this.aiSpeedX;
			}
		}

		// Update AI ball position, scaled by a speed multiplier
		if (!this.gameObjects.boundingBoxAI.intersectsBox(this.gameObjects.boundingWallAI)) {
			this.gameObjects.ballAI.position.z += this.aiSpeedZ * aiSpeedMultiplier;
			this.gameObjects.ballAI.position.x += this.aiSpeedX * aiSpeedMultiplier;
		}


		if (ArrowLeftKeyState && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWallTwo)) {
			this.gameObjects.paddle2.position.z += 1;
		} else if (ArrowRightKeyState && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWall)) {
			this.gameObjects.paddle2.position.z -= 1;
		}

		const deadZone = 6.1;
		const distanceToBall = this.gameObjects.ballAI.position.z - this.gameObjects.paddle2.position.z;

		if (Math.abs(distanceToBall) > deadZone) {
			const paddleSpeed = 1;
			if (distanceToBall > 0 && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWallTwo)) {
				this.gameObjects.paddle2.position.z += paddleSpeed; // Move paddle forward
			} else if (distanceToBall < 0 && !this.gameObjects.boundingPaddle2.intersectsBox(this.gameObjects.boundingWall)) {
				this.gameObjects.paddle2.position.z -= paddleSpeed; // Move paddle backward
			}
		}

	}



	animate(time) {
		requestAnimationFrame(this.animate.bind(this));
		if (window.location.pathname !== "/threeDimensionGame.html") {
			this.backgroundMusic.stop();
			gameStarted = false;
		}
		if (gameStarted && !gamePaused) {
			this.gameObjects.coin.position.y = -0.2;
			if (!this.backgroundMusic.isPlaying)
				this.backgroundMusic.play();
			this.setBounders();
			this.ballPhysics(this.gameObjects.ball);
			this.movePaddles();
		}
		else {
			if (this.gameObjects.coin && !gameStarted) {
				if (this.gameObjects.coin.position.y < 0.1)
					this.gameObjects.coin.position.y += 0.1;
				else if (this.gameObjects.coin.position.y >= 0.1) {
					setTimeout(() => {
						this.gameObjects.coin.position.y = -0.2;
					}, 1000);
				}
			}
		}
		this.orbit.update();
		this.renderer.render(this.scene, this.camera);
	}
}
