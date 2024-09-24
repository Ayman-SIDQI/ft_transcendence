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

	


// database need to store the profiles pics
let profilepic;
let profilepicP;
let iconpic;
let userSigned = false;
let savedPic;
let signInValue;
let globalUserName = "";
let urlPath;


const navigateTo = url => {
	
	history.pushState(null, null, url); //update the url in the history
	router();
};

// const scripts = [
// 	'./static/assets/js/settings.js',
// 	'./static/assets/js/game.js'
// ];

// async function loadScript(arrayScrpt) {
// 	for (const url of arrayScrpt)
// 	{
// 		if (!document.querySelector(`script[src="${url}"]`))
// 		{
// 			const scrpt = document.createElement("script");
// 			scrpt.src = url;
// 			document.body.appendChild(scrpt);
// 		}
// 	}
// }

function styleCSS(width, hight)
{
	profilepic.style.display = 'block';
	profilepic.style.marginLeft = 'auto';
	profilepic.style.marginright = 'auto';
	profilepic.style.width = `${width}px`;
	profilepic.style.height = `${hight}px`;
	profilepic.style.borderRadius = '50%';
}

function loadPic()
{
	console.log("inside loadpic" )

	//check if the username is in database after
	if (globalUserName)
	{
		let allUsernames = document.querySelectorAll(".usernameValue");
		allUsernames.forEach(element => (element.innerHTML = globalUserName));
	}
	
	//save the pic in a database after
	profilepic = document.getElementById("profile-pic");
	if (profilepic && profilepic.style)
	{
		styleCSS(250, 250);
		profilepicP = profilepic.cloneNode();
		if (profilepicP && profilepicP.style && window.location.pathname !== "/settings.html") 
			styleCSS(80, 80);
	}
	

	iconpic = document.getElementById("icon-pic");
	if (iconpic)
	{
		// console.log(iconpic.src + "<---------- before ----------")
	console.log("inside iconpic" )
		iconpic.style.borderRadius = '50%';
		// if (userSigned) // check if user is signed in database after
		// {
			if (savedPic)
			{
					console.log("inside savedpic" )
					// console.log( "bef savedpic**>" + savedPic.src)
					iconpic.src = savedPic.src;
					console.log("savedp.src = " + savedPic.src )

					if (profilepic)
						profilepic.src = savedPic.src;
					// console.log(iconpic.src + "<-- after iconpic ---")
					// console.log('im gonna return')
					// return;
			}
			
		// }
	}

	let inputfile = document.getElementById("input-file");
	if (inputfile)
	{
		// console.log("inside inputfile")
		inputfile.onchange = function(){
		profilepic.src = URL.createObjectURL(inputfile.files[0]);
		// iconpic.src = URL.createObjectURL(inputfile.files[0]);
		// console.log( "  bef   " + iconpic.src)

		// savedPic = profilepic;
		// console.log("  aft    " + savedPic.src)
		}
	}
}

function checkPathIfSigned(path)
{
	if (path === "/settings.html" || path === "/leaderboard.html" 
		|| path === "/profile.html"   || path === "/userProfile.html" 
		|| path === "/threeDimensionGame.html")
		return true;
	return false;
}
const router = async () => {
	const routes = 
	[
		{path: "/404.html", view: Er},
		{path: "/", view: Index},
		{path: "/index.html", view: Index},
		{path: "/register.html", view: Register},
		{path: "/settings.html", view: Settings},
		{path: "/profile.html", view: Profile},
		{path: "/leaderboard.html", view: Leaderboard},
		{path: "/userProfile.html", view: UserProfile},
		{path: "/threeDimensionGame.html", view: Game},
		{path: "/sign-in.html", view: SignIn}
	];

	// in exemple route is {path; "/404.html", view: Er} in the first iteration
	const potentialMatches = routes.map(route => { // In routes.map(route => {...}), the route parameter represents each element of the routes array as the map function iterates over it.
		return {
			route: route, // left route is now right route waaw (right route is the value of the routes that map found)
			isMatch: window.location.pathname === route.path
		};
	});

	// ----- to do: --------> if user is loged in change the index page so it will have username in navbar instead of register and signin

	// console.log( 'here---------> ' +  potentialMatches);
	let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);
	if (!match)
	{
		match = {
			route: routes[0], //page 404 
			// isMatch: true // true false who cares
		};
	}

	urlPath = window.location.pathname;
	if (!userSigned && checkPathIfSigned(urlPath))
	{
		window.alert("log in first");
		history.back();
		return;
	}
	else if (userSigned && (urlPath === "/sign-in.html" || urlPath === "/register.html"))
	{
		window.alert("already signed in");
		history.back();
		return;
	}
	
	const view = new match.route.view();
	document.querySelector(".new-nav").innerHTML = await view.getHead();
	document.querySelector("#new-body").innerHTML = await view.getHtml();
	
	// check for the url path 
	// const urlPath = window.location.pathname;
	// if (urlPath === "/posts.html" || "/")
	// {
	// try 
	// {
		const inrhtml = document.querySelector(".usr");
		inrhtml.innerHTML = await view.getUsr();
		if (inrhtml.innerHTML === "")
			inrhtml.remove();

		const pongListHtml = document.querySelector(".pongList");
		pongListHtml.innerHTML = await view.getFlexPong();
		if (pongListHtml.innerHTML === "")
			pongListHtml.remove();


		// }
		// catch (err)
		// {
			// }
			// }
		
		//hmmmm  to wait until the dom is created then run the script
		
		// await loadScript(scripts);
		// const script = document.createElement('script');
		// script.src = './static/assets/js/settings.js';
		// document.body.appendChild(script);
		if (checkPathIfSigned(urlPath))
			loadPic(); // add check if the pic is alredy there in the database
		if (urlPath !== "/threeDimensionGame.html")
		{
			console.log("stop music");
			document.querySelector("#canv").innerHTML = '';
			// window.game.stopMusic();
			delete window.game;
		}
};

// function f()
// {
// 	document.addEventListener('DOMContentLoaded', function(){
// 		window.THREE = THREE;
// 		const game = new threeDimensionGame();
// 		window.game = game;
// 		delete window.game;
// 	});
// }

	document.addEventListener("DOMContentLoaded", () => {
		document.body.addEventListener("click", e => {
			if (e.target.matches("#play"))
			{
				e.preventDefault();
				navigateTo(e.target.href);
				// document.addEventListener('DOMContentLoaded', function(){

					window.THREE = THREE;
					const game = new threeDimensionGame();
					window.game = game;
					// delete window.game
				// });
			}
			else if (e.target.matches(".sign-in"))
			{
				console.log("here")
				e.preventDefault();
				let signForm = e.target.closest(".signInForm");
				if (signForm)
				{
					userSigned = true;//add check later to see if the log in is a success in database
					signInValue ={
						username: signForm.querySelector("#username").value,
						password: signForm.querySelector("#password").value
					}
					console.log(signInValue);
					if (!signInValue.username || !signInValue.password)
					{
						window.alert("fill the blank"); // use somthing else to handle errors 
						return ;
					}
					globalUserName = signInValue.username;
				}
				// navigateTo(e.target.href); //navugate to home page with user loged in
			}
			// else if (e.target.matches(".registerFrom"))
			// {

			// }
			else if (e.target.matches("[data-link]")) // if the click is a link add href to the history and navigate to it
			{
				if (e.target.matches(".logout"))
					userSigned = false;
				e.preventDefault();
				navigateTo(e.target.href);
			}
			else if (e.target.matches(".save"))
			{
				e.preventDefault();
				// console.log("save in dataBase plz") // database
				console.log("inside save" )

				// add database here for pictures

				//Rpan  fill after in database
				// const formSave = e.target.closest("form")
				// if (formSave)
				// {
					
				// }

				//Lpan
				const LpanSave = e.target.closest(".Lpan");
				if (LpanSave)
				{
					console.log("profilpic.src = " + profilepic.src )
					
					savedPic = profilepic.cloneNode(true); // deep copy for an object
					loadPic(); 

				}
			}
			else if (e.target.matches(".cancel"))
			{
				e.preventDefault();
				console.log("inside cancel" )

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

				// this is left panel that have profilepic in settings
				const LpanPic = e.target.closest(".Lpan");
				if (LpanPic)
				{
					
					// LpanPic.querySelector("#profile-pic");
					if (profilepic)
					{
						console.log("inside Lpan prfpic" )
						profilepic.src = "static/assets/images/icon.svg";
				// console.log("profilpic.src = " + profilepic.src )
				// console.log("savedpi.src = " + savedPic.src )
				// console.log("iconp.src = " + iconpic.src )
						// if (savedPic)
						// iconpic.src = "static/assets/images/icon.svg";
					}
					else
						console.log('meh not found')// maybe output something
				}
			}
		})
		router();
	});


	window.addEventListener("popstate", router);


