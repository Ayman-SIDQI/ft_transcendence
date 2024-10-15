import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Index");
    }
	
	async getFlexPong() {
		return "";
	}

	async getUsr() {
		return `<div>
					<a data-link href="sign-in.html" class="btn btn-dark mr-2 btn-gradient-login">Log In</a>
					<a data-link href="register.html" class="btn btn-info btn-gradient-signup btn-gradient-signupIndex">Sign Up</a>
				</div>`;
	}

	async getHead() {
		return `
		<section>
            <nav class="navbar navbarIndex navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid container-fluidIndex justify-content-between">
                    
                   <nav class="pongList"></nav>
				
					<a data-link class="navbar-brand navbar-brandIndex mb-3 h1" href="index.html">
                        <img class="imgIndex" src="./static/assets/balls-golf-svgrepo-com.svg" width="30" height="30" class="d-inline-block align-top" alt="">
                        P O N G E R S
                    </a>
                    
                    
                   <nav class="usr"></nav>

                </div>
            </nav>
        </section>

		
	<section>
		<div class="container-fluid container-fluidIndex">
			<h1 id="paddle-1"></h1>
			<h1 id="paddle-2"></h1>
		</div>
	</section>`
	};

    async getHtml() {
        return `<main class="mainIndex">

            <h2 id="hookIndex">PONG</h2>
            <div>
                <h2 id="description">Dive into the Classic Pong Experience Redefined!</h2>
            </div>
            <div>
                <a data-link href="/threeDimensionGame.html" class="btn btn-info btn-gradient-signup btn-gradient-signupIndex" id="play">P L A Y</a>    
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-9 slightly-right">
                        <img class="imgIndex" src="./static/assets/kenney_planets/Planets/planet01.png" class="rounded" alt="A picture of a planet that signifies the ball in pong game">
                    </div>
                </div>
            </div>
        </main>`;
    }
}