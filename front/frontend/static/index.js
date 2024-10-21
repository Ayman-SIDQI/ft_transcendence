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
		this.userSigned = false; // Track the user's sign-in status
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

	async confirm2FASignin(e)
	{
		const inputVal = document.querySelector("#input-6digit").value.trim();
		if (!inputVal) {
			alert("fill the blank")
			console.log("Input is empty, confirmation blocked.");
			return;
		}
		try
		{
			const sendDigit = {
				username: 'a', // zak this is empty need to check how to solv it
				// username: this.globalUserName, // zak this is empty need to check how to solv it
				otp: inputVal
			}
			console.log("confirm in sign in clicked ################", sendDigit.username)
			const data = await this.sendRequest(`${this.apiBaseUrl}/twofa/`, "POST", sendDigit, {
				Authorization: `Bearer ${localStorage.getItem('token')}` // zak changed this.access to ${localStorage.getItem('token')
			});
			console.log("wa la")
			if (data)
			{
				if (data.access)
				{
					console.log("hahaha is good")
					const maind = e.target.closest("main") // go back to main befor closing popup because e.target is only in qrpopup html not in main
					this.closeModal("popup2FA");
					// localStorage.removeItem('token')
					// localStorage.removeItem('refresh')
					localStorage.setItem('token', data.access)
					localStorage.setItem('refresh', data.refresh)
					this._2fa = true;
					this.getDBdataAndNavigToPage(e, data);
				}
				else
				{
					console.log("2fa failed")
					window.alert("wrong number 1")
					return;
				}
			}
			else
				console.log("response 2fa",data.error)
		}
		catch (err)
		{
			console.log(err);
			return
		}
	}

	handleBodyClick(e) {
		if (e.target.matches(".confirmBtn")) {
			this.confirm2FA(e);
		} else if (e.target.matches(".confirmBtnSignin")) {
			this.confirm2FASignin(e);
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
		document.querySelector("#input-6digit").value = '';
		try
		{
			// const response = await this.sendRequest(`${this.apiBaseUrl}//`,,,)
			const data = await this.sendRequest(`${this.apiBaseUrl}/twofa-setup/?username=a`, 'GET', null, {
				Authorization: `Bearer ${this.access}`
			});
			if (data)
			{
				// console.log("--->>>>>>>" ,data.qrimage)
				this.openPopup(e, "popupQR");

				// show the qr code in the img
				const maindv = e.target.closest("main");
				if (maindv)
				{
					const imgQR = maindv.querySelector("#imgQRrecieved");
					if (imgQR)
					{
						if (data.qrimage.startsWith("data:image"))
							imgQR.src = data.qrimage;  // This is already in the correct format
						else
							imgQR.src = `data:image/png;base64,${data.qrimage}`;
						// console.log("here--------------",imgQR.src)
					}
				}
			}
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

	async confirm2FA(e) {
		const inputVal = document.querySelector("#input-6digit").value.trim();
		if (!inputVal) {
			alert("fill the blank")
			console.log("Input is empty, confirmation blocked.");
			return;
		}
		try
		{
			const sendDigit = {
				username: this.globalUserName,
				otp: inputVal
			}
			const data = await this.sendRequest(`${this.apiBaseUrl}/twofa-setup/`, "POST", sendDigit, {
				Authorization: `Bearer ${this.access}`
			});

			if (data)
			{
				if (data.twofa === 'Succesfully enabled')
				{
					console.log("2fa is good")
					const maind = e.target.closest("main") // go back to main befor closing popup because e.target is only in qrpopup html not in main
					this.closeModal("popupQR");
					const enableBtn = maind.querySelector(".enableDiv")
					if (enableBtn)
					{

						const en = enableBtn.querySelector(".enable");
						en.innerHTML = "disable";
						en.classList.replace("enable", "disable");
					}
					this._2fa = true;
				}
				else
				{
					console.log("2fa failed")
					window.alert("wrong number 1")
					return;
				}
			}
			else
				console.log("response 2fa",data.twofa)
		}
		catch (err)
		{
			console.log(err);
			return
		}

		// send inputValue to backend to check if its true or false
		// this._2fa = true;
		// this.closeModal("popupQR");
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
		console.log("access data", responseData)
		// store it in local storage
		console.log("this:", this);
		this.access = localStorage.getItem('token');
		console.log("this.access:", this.access);
		if (!this.access)
		{
			localStorage.setItem('token', responseData.access);
			localStorage.setItem('refresh', responseData.refresh);
			this.access = localStorage.getItem('token');
		}
		// localStorage.removeItem('token'); // to clear token if the 15min is passed
		// this.access = responseData.access
		this.DBdata = await this.fetchUserProfile();
		this.globalUserName = responseData.username;
		console.log("access data", responseData.username, responseData)
		// this.globalUserName = this.DBdata.profile.username; // zak this is data base not response
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
			console.log("here *************",responseData) // zak check if database send profile data that greyone send in discord

			if (responseData.message === '2FA OTP required') // test if 2fa is enable
			{
				console.log("entered *************")
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
					console.log("2fa enable ^^^^^^^^^^^^^^^^")
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
			else  {
					console.log("outside ^^^^^^^^^^^^^^^^")
					this.getDBdataAndNavigToPage(e, responseData);
			} 
			// else {
			// 	throw new Error("Login failed, token not received.");
			// }
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
			// localStorage.removeItem('token')
			// localStorage.removeItem('refresh')
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
			console.log("error in req xd", err)
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
