// import Index from "./views/index.js"
// import Register from "./views/register.js"
// import SignIn from "./views/sign-in.js"
// import Settings from "./views/settings.js"
// import Profile from "./views/profile.js"
// import UserProfile from "./views/userProfile.js"
// import Leaderboard from "./views/leaderboard.js"
// import Er from "./views/error.js"
// import Game from "./views/game.js"

// // to do: if signed and put settings.html from url it doesnt work it shouldd
// // to do: if url is given and user isnt loged send them to somewhere

// import * as THREE from 'three';
// import { threeDimensionGame } from './assets/js/threeDimensionGame.js';

	


// // database need to store the profiles pics
// let profilepic;
// let profilepicP;
// let iconpic;
// let userSigned = true;
// let savedPic;
// let signInValue;
// let globalUserName = "";
// let urlPath;


// const navigateTo = url => {
	
// 	history.pushState(null, null, url); //update the url in the history
// 	router();
// };

// // const scripts = [
// // 	'./static/assets/js/settings.js',
// // 	'./static/assets/js/game.js'
// // ];

// // async function loadScript(arrayScrpt) {
// // 	for (const url of arrayScrpt)
// // 	{
// // 		if (!document.querySelector(`script[src="${url}"]`))
// // 		{
// // 			const scrpt = document.createElement("script");
// // 			scrpt.src = url;
// // 			document.body.appendChild(scrpt);
// // 		}
// // 	}
// // }

// function styleCSS(width, hight)
// {
// 	profilepic.style.display = 'block';
// 	profilepic.style.marginLeft = 'auto';
// 	profilepic.style.marginright = 'auto';
// 	profilepic.style.width = `${width}px`;
// 	profilepic.style.height = `${hight}px`;
// 	profilepic.style.borderRadius = '50%';
// }

// function loadPic()
// {
// 	console.log("inside loadpic" )

// 	//check if the username is in database after
// 	if (globalUserName)
// 	{
// 		let allUsernames = document.querySelectorAll(".usernameValue");
// 		allUsernames.forEach(element => (element.innerHTML = globalUserName));
// 	}
	
// 	//save the pic in a database after
// 	profilepic = document.getElementById("profile-pic");
// 	if (profilepic && profilepic.style)
// 	{
// 		styleCSS(250, 250);
// 		profilepicP = profilepic.cloneNode();
// 		if (profilepicP && profilepicP.style && window.location.pathname !== "/settings.html") 
// 			styleCSS(80, 80);
// 	}
	

// 	iconpic = document.getElementById("icon-pic");
// 	if (iconpic)
// 	{
// 		// console.log(iconpic.src + "<---------- before ----------")
// 	console.log("inside iconpic" )
// 		iconpic.style.borderRadius = '50%';
// 		// if (userSigned) // check if user is signed in database after
// 		// {
// 			if (savedPic)
// 			{
// 					console.log("inside savedpic" )
// 					// console.log( "bef savedpic**>" + savedPic.src)
// 					iconpic.src = savedPic.src;
// 					console.log("savedp.src = " + savedPic.src )

// 					if (profilepic)
// 						profilepic.src = savedPic.src;
// 					// console.log(iconpic.src + "<-- after iconpic ---")
// 					// console.log('im gonna return')
// 					// return;
// 			}
			
// 		// }
// 	}

// 	let inputfile = document.getElementById("input-file");
// 	if (inputfile)
// 	{
// 		// console.log("inside inputfile")
// 		// inputfile.onchange = function(){
// 		inputfile.addEventListener("change", function(event) {
// 			//URL.createObjectURL() is a method that creates a temporary URL (object URL) that points to the selected file, enabling the browser to display it.
// 			profilepic.src = URL.createObjectURL(event.target.files[0]); //accesses the first file selected by the user from the file input (since multiple file selection is possible).
// 		})
// 		// iconpic.src = URL.createObjectURL(inputfile.files[0]);
// 		// console.log( "  bef   " + iconpic.src)

// 		// savedPic = profilepic;
// 		// console.log("  aft    " + savedPic.src)
// 		// }
// 	}
// }

// function checkPathIfSigned(path)
// {
// 	if (path === "/settings.html" || path === "/leaderboard.html" 
// 		|| path === "/profile.html"   || path === "/userProfile.html" 
// 		/*|| path === "/threeDimensionGame.html"*/)
// 		return true;
// 	return false;
// }
// const router = async () => {
// 	const routes = 
// 	[
// 		{path: "/404.html", view: Er},
// 		{path: "/", view: Index},
// 		{path: "/index.html", view: Index},
// 		{path: "/register.html", view: Register},
// 		{path: "/settings.html", view: Settings},
// 		{path: "/profile.html", view: Profile},
// 		{path: "/leaderboard.html", view: Leaderboard},
// 		{path: "/userProfile.html", view: UserProfile},
// 		{path: "/threeDimensionGame.html", view: Game},
// 		{path: "/sign-in.html", view: SignIn}
// 	];

// 	// in exemple route is {path; "/404.html", view: Er} in the first iteration
// 	const potentialMatches = routes.map(route => { // In routes.map(route => {...}), the route parameter represents each element of the routes array as the map function iterates over it.
// 		return {
// 			route: route, // left route is now right route waaw (right route is the value of the routes that map found)
// 			isMatch: window.location.pathname === route.path
// 		};
// 	});

// 	// ----- to do: --------> if user is loged in change the index page so it will have username in navbar instead of register and signin

// 	// console.log( 'here---------> ' +  potentialMatches);
// 	let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);
// 	if (!match)
// 	{
// 		match = {
// 			route: routes[0], //page 404 
// 			// isMatch: true // true false who cares
// 		};
// 	}

// 	urlPath = window.location.pathname;
// 	if (!userSigned && checkPathIfSigned(urlPath))
// 	{
// 		window.alert("log in first");
// 		history.back();
// 		return;
// 	}
// 	else if (userSigned && (urlPath === "/sign-in.html" || urlPath === "/register.html"))
// 	{
// 		window.alert("already signed in");
// 		history.back();
// 		return;
// 	}
	
// 	const view = new match.route.view();
// 	document.querySelector(".new-nav").innerHTML = await view.getHead();
// 	document.querySelector("#new-body").innerHTML = await view.getHtml();
	
// 	// check for the url path 
// 	// const urlPath = window.location.pathname;
// 	// if (urlPath === "/posts.html" || "/")
// 	// {
// 	// try 
// 	// {
// 		const inrhtml = document.querySelector(".usr");
// 		inrhtml.innerHTML = await view.getUsr();
// 		if (inrhtml.innerHTML === "")
// 			inrhtml.remove();

// 		const pongListHtml = document.querySelector(".pongList");
// 		pongListHtml.innerHTML = await view.getFlexPong();
// 		if (pongListHtml.innerHTML === "")
// 			pongListHtml.remove();


// 		// }
// 		// catch (err)
// 		// {
// 			// }
// 			// }
		
// 		//hmmmm  to wait until the dom is created then run the script
		
// 		// await loadScript(scripts);
// 		// const script = document.createElement('script');
// 		// script.src = './static/assets/js/settings.js';
// 		// document.body.appendChild(script);
// 		if (checkPathIfSigned(urlPath))
// 			loadPic(); // add check if the pic is alredy there in the database
// 		if (urlPath !== "/threeDimensionGame.html")
// 		{
// 			console.log("stop music");
// 			document.querySelector("#canv").innerHTML = '';
// 			// window.game.stopMusic();
// 			delete window.game;
// 		}
// };

// // function f()
// // {
// // 	document.addEventListener('DOMContentLoaded', function(){
// // 		window.THREE = THREE;
// // 		const game = new threeDimensionGame();
// // 		window.game = game;
// // 		delete window.game;
// // 	});
// // }
// let data;
// let access;
// 	document.addEventListener("DOMContentLoaded", () => {
// 		document.body.addEventListener("click", e => {
// 			if (e.target.matches("#play"))
// 			{
// 				e.preventDefault();
// 				navigateTo(e.target.href);
// 				// document.addEventListener('DOMContentLoaded', function(){

// 					window.THREE = THREE;
// 					const game = new threeDimensionGame();
// 					window.game = game;
// 					// delete window.game
// 				// });
// 			}
// 			else if (e.target.matches(".registerBtn"))
// 			{
// 				e.preventDefault();
// 				console.log("here form")
// 				let regform = e.target.closest(".registerForm");
// 				if (regform)
// 				{
// 					data = {
// 						username: regform.querySelector("#regUsername").value,
// 						email: regform.querySelector("#regEmail").value,
// 						password: regform.querySelector("#regPassword").value,
// 						confirm_password: regform.querySelector("#regConfirm_password").value
// 					};
// 					console.log(data);
// 				}
// 				fetch("http://localhost:8000/register/", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json"
// 					},
// 					body: JSON.stringify(data)
// 				})
// 				.then(response => response.json())
// 				.then(response => console.log("response from base: " ,response.success))
// 				.catch(err => console.log(err))
// 			}
// 			else if (e.target.matches(".sign-in"))
// 			{
// 				console.log("here")
// 				e.preventDefault();
// 				// let signForm = e.target.closest(".signInForm");
// 				// if (signForm)
// 				// {
// 				// 	userSigned = true; //add check later to see if the log in is a success in database
// 				// 	signInValue = {
// 				// 		username: signForm.querySelector("#username").value,
// 				// 		password: signForm.querySelector("#password").value
// 				// 	}
// 				// 	console.log(signInValue);
// 				// 	if (!signInValue.username || !signInValue.password)
// 				// 	{
// 				// 		window.alert("fill the blank"); // use somthing else to handle errors 
// 				// 		return ;
// 				// 	}
// 				// 	globalUserName = signInValue.username;
// 				// }
// 				let regform = e.target.closest(".signInForm");
// 				if (regform)
// 				{
// 					userSigned = true; //add check later to see if the log in is a success in database
// 					data = {
// 						username: regform.querySelector("#username").value,
// 						password: regform.querySelector("#password").value,
// 					};
// 					console.log(data);
// 				}
// 				fetch("http://localhost:8000/login/", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json"
// 					},
// 					body: JSON.stringify(data)
// 				})
// 				.then(response => response.json())
// 				.then(responseData => {
// 					console.log("first data from json \n--------------", responseData, "-------------")
// 					// console.log(responseData);
// 					// console.log("this is the responseData json ------")
// 					if (responseData.access)  // Check if token is there
// 					{ 
// 						access = responseData.access;
// 						return fetch("http://localhost:8000/user/", { // we have the tokennow we send fetch request
// 							method: 'GET',
// 							headers: {
// 								"Content-Type": "application/json",
// 								"Authorization": "Bearer " + access
// 							},
// 							// credentials: 'include'
// 						});
// 					}
// 					else
// 						throw new Error("Login failed, token not received.");
// 				})
// 				.then(response => response.json())
// 				.then(responseData =>{
// 					globalUserName = responseData.profile.username;
// 					console.log("data from base",responseData);
// 				})
// 				.catch(err => console.log(err))
// 				// navigateTo(e.target.href); //navugate to home page with user loged in
// 			}
// 			// else if (e.target.matches(".registerFrom"))
// 			// {

// 			// }
// 			else if (e.target.matches("[data-link]")) // if the click is a link add href to the history and navigate to it
// 			{
// 				if (e.target.matches(".logout"))
// 					userSigned = false;
// 				e.preventDefault();
// 				navigateTo(e.target.href);
// 			}
// 			else if (e.target.matches(".save"))
// 			{
// 				e.preventDefault();
// 				// console.log("save in dataBase plz") // database
// 				console.log("inside save" )

// 				// add database here for pictures

// 				//Rpan  fill after in database
// 				// const formSave = e.target.closest("form")
// 				// if (formSave)
// 				// {
					
// 				// }

// 				//Lpan
// 				const LpanSave = e.target.closest(".Lpan");
// 				if (LpanSave)
// 				{
// 					console.log("profilpic.src = " + profilepic.src )
					
// 					savedPic = profilepic.cloneNode(true); // deep copy for an object
// 					loadPic(); 

// 				}
// 			}
// 			else if (e.target.matches(".cancel"))
// 			{
// 				e.preventDefault();
// 				console.log("inside cancel" )

// 				// Right panel that have inputs passwrd etc in seetings
// 				const formCancel= e.target.closest("form");
// 				if (formCancel)
// 				{
// 					const inputs = formCancel.querySelectorAll("input");
// 					inputs.forEach(element => {
// 						element.value = "";
// 					});

// 					const country = formCancel.querySelector("select");
// 					if (country)
// 						country.value = "Choose country";
// 				}

// 				// this is left panel that have profilepic in settings
// 				const LpanPic = e.target.closest(".Lpan");
// 				if (LpanPic)
// 				{
					
// 					// LpanPic.querySelector("#profile-pic");
// 					if (profilepic)
// 					{
// 						console.log("inside Lpan prfpic" )
// 						profilepic.src = "static/assets/images/icon.svg";
// 				// console.log("profilpic.src = " + profilepic.src )
// 				// console.log("savedpi.src = " + savedPic.src )
// 				// console.log("iconp.src = " + iconpic.src )
// 						// if (savedPic)
// 						// iconpic.src = "static/assets/images/icon.svg";
// 					}
// 					else
// 						console.log('meh not found')// maybe output something
// 				}
// 			}
// 		})
// 		router();
// 	});


// 	window.addEventListener("popstate", router);

import Index from "./views/index.js"
import Register from "./views/register.js"
import SignIn from "./views/sign-in.js"
import Settings from "./views/settings.js"
import Profile from "./views/profile.js"
import UserProfile from "./views/userProfile.js"
import Leaderboard from "./views/leaderboard.js"
import Er from "./views/error.js"
import Game from "./views/game.js"

// to do: if signed and put settings.html from url it doesnt work it should
// to do: if url is given and user isnt loged send them to somewhere

import * as THREE from 'three';
import { threeDimensionGame } from './assets/js/threeDimensionGame.js';
import error from "./views/error.js"
import profile from "./views/profile.js"

	

class App {
	constructor() {
		this.data = {};
		this.access = null;
		this.apiBaseUrl = "http://localhost:8000";
		this.userSigned = true; // Track the user's sign-in status
		this.globalUserName = ''; // Track the logged-in user's name
		this.profilepic = null;
		this.profilepictoDB = null;
		this.savedPic = null;
		this.DBdata = null;
		this._2fa = false;
		this._2faUsedSuccessfuly = false;

		this.routes = [
			{ path: "/404.html", view: Er },
			{ path: "/", view: Index },
			{ path: "/index.html", view: Index },
			{ path: "/register.html", view: Register },
			{ path: "/settings.html", view: Settings },
			{ path: "/profile.html", view: Profile },
			{ path: "/leaderboard.html", view: Leaderboard },
			{ path: "/userProfile.html", view: UserProfile },
			{ path: "/threeDimensionGame.html", view: Game },
			{ path: "/sign-in.html", view: SignIn }
		];
		this.init();
	}

	init() {
		document.addEventListener("DOMContentLoaded", () => {
			document.body.addEventListener("click", (e) => this.handleBodyClick(e));
			this.router(); // Call router on page load
		});

		// Add popstate listener
		window.addEventListener("popstate", () => this.router()); // Ensure `router` method is called on popstate
	}

	async router() {
		// in exemple route is {path; "/404.html", view: Er} in the first iteration
		const potentialMatches = this.routes.map(route => { // In routes.map(route => {...}), the route parameter represents each element of the routes array as the map function iterates over it.
			return {
				route: route, // left route is now right route waaw (right route is the value of the routes that map found)
				isMatch: window.location.pathname === route.path
			};
		});

		let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
		if (!match) {
			match = { route: this.routes[0] }; // 404 page route
		}

		const urlPath = window.location.pathname;
		if (!this.userSigned && this.checkPathIfSigned(urlPath))
		{
			window.alert("Please log in first.");
			history.back();
			return;
		}
		else if (this.userSigned && (urlPath === "/sign-in.html" || urlPath === "/register.html"))
		{
			window.alert("Already signed in.");
			history.back();
			return;
		}

		try
		{
			const view = new match.route.view();
			await this.updateView(view);
		}
		catch (err)
		{
			console.log(err)
		}

		if (this.checkPathIfSigned(urlPath)) {
			this.loadPic(); // Check if pic is already in the database
		}
		if (urlPath !== "/threeDimensionGame.html") {
			this.stopGameMusic();
		}
		console.log("inside router : ",this.profilepic)
	}

	async updateView(view) {
		const newNavHtml = document.querySelector(".new-nav");
		if (newNavHtml)
			newNavHtml.innerHTML = await view.getHead();

		const newBodyHtml = document.querySelector("#new-body");
		if (newBodyHtml)
			newBodyHtml.innerHTML = await view.getHtml();

		const userHtml = document.querySelector(".usr");
		if (userHtml) {
			userHtml.innerHTML = await view.getUsr();
			if (userHtml.innerHTML === "") {
				userHtml.remove();
			}
		}

		const pongListHtml = document.querySelector(".pongList");
		if (pongListHtml) {
			pongListHtml.innerHTML = await view.getFlexPong();
			if (pongListHtml.innerHTML === "") {
				pongListHtml.remove();
			}
		}
	}
	
	stopGameMusic() {
		console.log("Stop game music");
		document.querySelector("#canv").innerHTML = '';
		delete window.game;
	}

	handleBodyClick(e) {
		if (e.target.matches(".confirmBtn")) {
			this.confirm2FA(e);
		} else if (e.target.matches(".enable")) {
			e.preventDefault();
			this.enable2FA(e);
		} else if (e.target.matches(".disable")) {
			e.preventDefault();
			this.disable2FA(e);
		} else if (e.target.classList.contains("popupQR") || e.target.classList.contains("closeModalQR")) {
			this.closeModalQR(e);
		} else if (e.target.classList.contains("popup2FA") || e.target.classList.contains("closeModal2FA")) {
			this.closeModal("popup2FA");
		} else if (e.target.matches("#play")) {
			e.preventDefault();
			this.startGame(e);
		} else if (e.target.matches(".registerBtn")) {
			e.preventDefault();
			this.registerUser(e);
		} else if (e.target.matches(".sign-in")) {
			e.preventDefault();
			this.signInUser(e);
		} else if (e.target.matches("[data-link]")) {
			e.preventDefault();
			this.handleNavigation(e);
		}else if (e.target.matches(".save")) {
			e.preventDefault();
			this.saveProfilePicture(e);
		} else if (e.target.matches(".cancel")) {
			e.preventDefault();
			this.cancelChanges(e);
		} else if (e.target.matches(".enable")) {
			e.preventDefault();
			this.enable2FA(e);
		} else if (e.target.matches(".disable")) {
			e.preventDefault();
			this.disable2FA(e);
		}
	}

	openPopup(e, popupName)
	{
		const mainDiv = e.target.closest("main");
		const popup = mainDiv.querySelector(`.${popupName}`);
		if (!popup.classList.contains('open'))
			popup.classList.add('open');
		if (!mainDiv.classList.contains(`${popupName}-open`))
			mainDiv.classList.add(`${popupName}-open`);
	}

	async enable2FA(e) // if its enable add a variable in backend to check if its enabled
	{
		const confirmFunc = () => {
			const inputVal = document.querySelector("#input-6digit").value;
			if (inputVal) {
				this._2fa = true;
				const enableBtn = e.target.closest(".enableDiv").querySelector(".enable");
				enableBtn.innerHTML = "disable";
				enableBtn.classList.replace("enable", "disable");
			}
		};
		
		// Attach confirm action
		const confirmBtn = document.querySelector(".confirmBtn");
		confirmBtn.removeEventListener("click", confirmFunc);
		confirmBtn.addEventListener("click", confirmFunc);
		
		try {
			// const data = await this.sendRequest(`${this.apiBaseUrl}/twofa-setup/`, 'GET', null, this.access)
			// if (data)
			// 	{
			// 		console.log("--->>>>>>>" ,data.qrimage)
			// 	}
				this.openPopup(e, "popupQR");
		}
		catch (err)
		{
			console.log(err);
		}

		// make a popup of qrcode
	}

	disable2FA(e)
	{
		const disableBtn = e.target.closest(".enableDiv").querySelector(".disable");
		disableBtn.innerHTML = "enable";
		disableBtn.classList = "enable";
		this._2fa = false;
	}

	closeModalQR(e) {
		const inputValue = document.querySelector("#input-6digit").value;
		if (!inputValue) {
			console.log("Input is empty, keeping the button as 'enable'.");
		} else {
			console.log("Input not empty, button changed.");
		}
		this.closeModal("popupQR");
	}

	closeModal(popName) {
		document.querySelector(`.${popName}.open`).classList.remove('open');
		document.body.classList.remove(`${popName}-open`);
	}

	confirm2FA(e) {
		const inputVal = document.querySelector("#input-6digit").value.trim();
		if (!inputVal) {
			alert("fill the blank")
			console.log("Input is empty, confirmation blocked.");
			return;
		}
		// send inputValue to backend to check if its true or false
			this._2fa = true;
		this.closeModal("popupQR");
	}

	startGame(e) {
		this.handleNavigation(e);
		window.THREE = THREE;
		const game = new threeDimensionGame();
		window.game = game;
	}

	async registerUser(e) {
		const regForm = e.target.closest(".registerForm");
		if (!regForm) return;
	
		// this.data = this.getFormData(regForm, ["regUsername", "regEmail", "regPassword", "regConfirm_password"]);
		this.data = {
			username: regForm.querySelector("#regUsername").value,
			email: regForm.querySelector("#regEmail").value,
			password: regForm.querySelector("#regPassword").value,
			confirm_password: regForm.querySelector("#regConfirm_password").value
		};

		try {
			const response = await this.sendRequest(`${this.apiBaseUrl}/register/`, "POST", this.data);
			console.log("Registration success:", response.success);
		} catch (err) {
			console.error("Error registering user:", err);
		}
	}
	
	
	async getDBdataAndNavigToPage(e, responseData)
	{
		console.log("access data")
		this.access = responseData.access;

		this.DBdata = await this.fetchUserProfile();

		this.globalUserName = this.DBdata.profile.username;
		this.userSigned = true;
		this.handleNavigation(e);
	}

	_2faFunc(e)
	{
		
	}

	async signInUser(e) {
		
		const signInForm = e.target.closest(".signInForm");
		if (!signInForm) return;

		// this.data = this.getFormData(signInForm, ["username", "password"]);
		this.data = {
			username: signInForm.querySelector("#username").value,
			password: signInForm.querySelector("#password").value,
		};

		if (!this.data.username || !this.data.password)
			window.alert("fill the blank outsid");

		try {
			const responseData = await this.sendRequest(`${this.apiBaseUrl}/login/`, "POST", this.data);
			// if (responseData.message) // 2FA is activated if message is there
			if (this._2fa) // test if 2fa is enable
			{
				// this._2faFunc(e); //use this later
				const mainDiv = e.target.closest("main");
				this.openPopup(e, "popup2FA")
				const confirmBtn = mainDiv.querySelector(".confirmBtn");

				const confirmFunc = () => {
					const digitValue = mainDiv.querySelector("#input-6digit").value;
					console.log("here",digitValue)
					if (!digitValue)
					{
						console.log("clicked confirm");
						return;
					}
					this._2faUsedSuccessfuly = true;
					this.getDBdataAndNavigToPage(e, responseData);
				};
				if (confirmBtn)
				{
					confirmBtn.removeEventListener("click", confirmFunc);
					confirmBtn.addEventListener("click", confirmFunc);
				}
				if (!this._2faUsedSuccessfuly)
					return;
			}
			if (responseData.access) {
				this.getDBdataAndNavigToPage(e, responseData);
			} else {
				throw new Error("Login failed, token not received.");
			}
		} catch (err) {
			console.error("Error logging in:", err);
		}
	}

	fetchUserProfile() {
		return this.sendRequest(`${this.apiBaseUrl}/user/`, "GET", null, {
			Authorization: `Bearer ${this.access}`
		});
	}

	handleNavigation(e) {
		if (e.target.matches(".logout"))
		{
			this.userSigned = false;
			this.access = null;
			this._2faUsedSuccessfuly = false;
			this.profilepic = null;
		}
		const href = e.target.href;
		if (!href) return;

		this.navigateTo(href);
	}

	loadPic() {
		console.log("inside loadpic");

		if (this.globalUserName) {
			let allUsernames = document.querySelectorAll(".usernameValue");
			allUsernames.forEach(element => {element.innerHTML = this.globalUserName});
		}

		this.profilepic = document.getElementById("profile-pic");
		if (this.profilepic && this.profilepic.style)
		{
			this.styleCSS(250, 250);
			if (window.location.pathname !== "/settings.html") // change size of profilpic if page is not setting
				this.styleCSS(80, 80);
		}

		//test if the avatar is in the db first to see if we gonna display avatar or deflt img
		if (this.DBdata && this.DBdata.profile.avatar)
		{
			this.profilepic.src = `${this.apiBaseUrl}${this.DBdata.profile.avatar}`;
			console.log("*************************>" ,this.DBdata.profile.avatar)
		}

		const iconpic = document.getElementById("icon-pic");
		if (iconpic)
		{
			iconpic.style.borderRadius = '50%';
			if (this.savedPic)
			{
				iconpic.src = this.savedPic.src;
				if (this.profilepic)
					this.profilepic.src = this.savedPic.src;
			}
		}
	
		// Now handle file input change, just update the profile pic src after selection
		let inputFile = document.getElementById("input-file");
		if (inputFile)
		{
			inputFile.addEventListener('change', e => {
				const file = e.target.files[0];
				this.profilepictoDB = file; // store the img file to send it to db
				this.profilepic.src = URL.createObjectURL(file); //display the profilpic in the cercle

				// const reader = new FileReader();
				// reader.onloadend = () => {
				//     const base64 = reader.result;
				//     console.log("base^^^^^^^^"+base64);
				//     this.profilepic.src = base64;
				//     // const imgData = {
				//     //     'img': base64
				//     // };
				// };
				// reader.readAsDataURL(file);
			});
			// inputFile.addEventListener("change", (event) => {
			// 	const file = event.target.files[0];
			// 	if (file) {
			// 		this.profilepic.src = URL.createObjectURL(file); // Update the profile pic src
			// 	}
			// });
		}
	}

	saveProfilePicture(e) {
		console.log("Profile picture saved");
		const LpanSave = e.target.closest(".Lpan");
		if (LpanSave)
		{
			console.log("profilpic.src = " + this.profilepic.src )
			
			this.savedPic = this.profilepic.cloneNode(true); // deep copy for an object

			this.loadPic();

			const formData = new FormData(); // explain this after in chatgpt
			formData.append('avatar', this.profilepictoDB); // Assuming 'profilepictoDB' is a file input element

			fetch(`${this.apiBaseUrl}/update/`, {
				method: 'PUT',
				headers: {
					"Authorization": `Bearer ${this.access}`  // Include the token if required
				},
				body: formData,  // Send the FormData object
			})
			.then(response => response.json())
			.then(response =>{
				console.log("AVATAR ^^^^^^^Response from backend -> ", response);
			})
			.catch(error => console.log("Err", error));
		}
	}

	cancelChanges(e) {
		// Right panel that have inputs passwrd etc in seetings
		const formCancel= e.target.closest("form");
		if (formCancel)
		{
			const inputs = formCancel.querySelectorAll("input");
			inputs.forEach(element => {
				element.value = "";
			});

			const country = formCancel.querySelector("select");
			if (country)
				country.value = "Choose country";
		}

		const LpanPic = e.target.closest(".Lpan");
		if (LpanPic && this.profilepic)
			this.profilepic.src = "static/assets/images/icon.svg";
		else
			console.log('meh not found')// maybe output something
	}

	async sendRequest(url, method = "GET", body = null, token = {}) {
		const headers = {
			"Content-Type": "application/json",
			...token
		};
		try
		{
			const response = await fetch(url, {
				method,
				headers,
				body: body ? JSON.stringify(body) : null
			});

			if (!response.ok)
				throw new error("error on fetch")

			return await response.json();
		}
		catch (err)
		{
			console.log("error in req")
			throw err;
		}
	}

	checkPathIfSigned(path) {
		const restrictedPaths = ["/settings.html", "/profile.html", "/userProfile.html", "/leaderboard.html"];
		return restrictedPaths.includes(path);
	}	

	styleCSS(width, height) {
		this.profilepic.style.display = 'block';
		this.profilepic.style.marginLeft = 'auto';
		this.profilepic.style.marginRight = 'auto';
		this.profilepic.style.width = `${width}px`;
		this.profilepic.style.height = `${height}px`;
		this.profilepic.style.borderRadius = '50%';
	}

	navigateTo(url) {
		history.pushState(null, null, url);
		this.router(); // Re-route after URL update
	}
}

// Instantiate the App
const app = new App();
