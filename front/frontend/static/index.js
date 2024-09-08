import Index from "./views/index.js"
import Register from "./views/register.js"
import SignIn from "./views/sign-in.js"
import Settings from "./views/settings.js"
import Profile from "./views/profile.js"
import UserProfile from "./views/userProfile.js"
import Leaderboard from "./views/leaderboard.js"
import Er from "./views/error.js"

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
function loadPic()
{
	//save the pic in a database after
	let profilepic = document.getElementById("profile-pic");
	let iconpic = document.getElementById("icon-pic");
	let inputfile = document.getElementById("input-file");
	
	if (profilepic && profilepic.style) 
	{
		profilepic.style.display = 'block';
		profilepic.style.marginLeft = 'auto';
		profilepic.style.marginright = 'auto';
		profilepic.style.width = '250px';
		profilepic.style.height = '250px';
		profilepic.style.borderRadius = '50%';
	
		iconpic.style.borderRadius = '50%';
	}
	if (inputfile)
	{
		inputfile.onchange = function(){
			profilepic.src = URL.createObjectURL(inputfile.files[0]);
			iconpic.src = URL.createObjectURL(inputfile.files[0]);
		}
	}
}

const router = async () => {
	const routes = 
	[
		{path: "/404.html", view: Er},
		{path: "/", view: Index},
		{path: "/register.html", view: Register},
		{path: "/settings.html", view: Settings},
		{path: "/profile.html", view: Profile},
		{path: "/leaderboard.html", view: Leaderboard},
		{path: "/userProfile.html", view: UserProfile},
		{path: "/sign-in.html", view: SignIn}
	];

	// in exemple route is {path; "/404.html", view: Er} in the first iteration
	const potentialMatches = routes.map(route => { // In routes.map(route => {...}), the route parameter represents each element of the routes array as the map function iterates over it.
		return {
			route: route, // left route is now right route waaw (right route is the value of the routes that map found)
			isMatch: window.location.pathname === route.path
		};
	});

	// console.log( 'here---------> ' +  potentialMatches);
	let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);
	if (!match)
	{
		match = {
			route: routes[0], //page 404 
			// isMatch: true // true false who cares
		};
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
		
		loadPic(); // add check if the pic is alredy there in the database
		
};

	document.addEventListener("DOMContentLoaded", () => {
		document.body.addEventListener("click", e => {
			if (e.target.matches("[data-link")) // if the click is a link add href to the history and navigate to it
			{
				e.preventDefault();
				navigateTo(e.target.href);
			}
		})
		router();
	});


	window.addEventListener("popstate", router);


