export default class {
    constructor() {

    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }
    async getHead() {
        return `
		<section>
			<nav class="navbar navbarAB navbar-dark bg-dark">
				<div class="pong">
					
					<nav class="pongList"></nav>
					
					<a data-link class="navbar-brand navbar-brandAB mb-3 h1" href="index.html">
						P O N G E R S
					</a>
					<div class="collapse navbar-collapse justify-content-center" id="expandme"></div>
				</div>

				<div class="usr"></div>

			</nav>
		</section>`;
    }
    async getUsr() {
        return `
		<div class="iconUsername">
                <button class="username">
					<div>
						<img class="userIcon" id="icon-pic" src="static/assets/images/icon.svg">
					</div>
					<div class="usernameValue">
						Username
					</div>
					<!-- <i class="fa fa-caret-down"></i> -->
				</button>
				<div class="dropdown-content">
					<div style="color: white; padding-top: 10px;">
						<h5>
							Username
						</h5>
					</div>
					<div style="display: inherit; flex-direction: inherit; padding-left: 20px;">
						<a aSI data-link  href="profile.html">Profile</a>
						<a aSI data-link  href="#">Friends</a>
						<a aSI data-link  href="settings.html">Settings</a>
						<a aSI data-link class="logout"  href="index.html">Log out</a>
					</div>
				</div>
            </div>`;
    }

    async getFlexPong() {
        return `
		<div class="pongFlex">
			<button class="mBTN">
				<div class="menuBtn">
					<div class="d1"></div>
					<div class="d2"></div>
					<div class="d3"></div>
				</div>
			</button>
			<div class="dropdown-content2">
				<input class="search" type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"> <!-- filterFunction to filter search waw -->
				<div class="cntPadd">
					<a aSI data-link  href="#">
						<img src="static/assets/images/play.svg" alt="no img">
						play
					</a>
					<a aSI data-link  href="leaderboard.html">
						<img src="static/assets/images/Leaderboard.svg" alt="no img">
						Leaderboard
					</a>
					<a aSI data-link  href="#">
						<img src="static/assets/images/tournament.svg" alt="no img">
						tournament
					</a>
					<a aSI data-link  href="#">
						<img src="static/assets/images/chat.svg" alt="no img">
						chat
					</a>
					<a aSI data-link  href="#">
						<img src="static/assets/images/history.svg" alt="no img">
						History
					</a>
					<a aSI data-link  href="settings.html">
						<img src="static/assets/images/settings.svg" alt="no img">
						Settings
					</a>
				</div>
			</div>
		</div>`;
    }
}