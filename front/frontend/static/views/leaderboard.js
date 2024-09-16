import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("leaderboard");
    }

    async getHtml() {
        return `
        <main style="background-color: black;">
		<div class="container">
			<div class="row gy-3 gx-3" >
                <div class="settingDiv">
                    leaderboard
                </div>
                <div class="col-12 " style=" background-color: ;">
                    <div class="box">
						<div style="margin-left: 30px;">
							<div>
								<div style="display: flex;flex-direction: row;">
									<img src="./static/assets/images/icon.svg" style="width: 36px;">
									<img id="profile-pic" src="./static/assets/images/icon.svg" style="width: 64px;">
								</div>
							</div>
						</div>
						<div style="display: flex; flex-direction: column;justify-content: center;">
							<div style="padding-left: 20px;padding-right: 20px; background-color: ;">
								<div>
									<h4 class="usernameValue">
										username
									</h4>
								</div>
								<div style="display: flex; ">
									<div >
										level
									</div>
									<div style="margin-left: 30px;">
										winrate
									</div>
									<div style="margin-left: 30px;">
										10w0L
									</div>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
			<div class="row row-cols-3 g-2   justify-content-center align-items-center" >
            <!-- <div class="row row-cols-3 gx-5" style="background-color: cadetblue;"> -->
                <div class="col-4  gy-3" style="background-color: ;">
                    
					<div class="box">
						<div >
							<div>
								<div style="display: flex;flex-direction: row;">
									<img src="./static/assets/images/icon.svg" style="width: 26px;">
									<img src="./static/assets/images/icon.svg" style="width: 46px;">
								</div>
								<div style="padding-top: 10px;">
									Winrate: ?
								</div>
							</div>
						</div>
						<div style="background-color: ; display: flex; flex-direction: column;justify-content: center; padding-left: 20px;padding-right: 20px;">
							<div>
								username
							</div>
							<div>
								level: ?
							</div>
							<div>
								?W ?L
							</div>
						</div>
					</div>

                </div>
                <div class="col-4 gx-3 gy-3" style=" background-color: ;">
                    
					<div class="box">
						<div >
							<div>
								<div style="display: flex;flex-direction: row;">
									<img src="./static/assets/images/icon.svg" style="width: 26px;">
									<img src="./static/assets/images/icon.svg" style="width: 46px;">
								</div>
								<div style="padding-top: 10px;">
									Winrate: ?
								</div>
							</div>
						</div>
						<div style="background-color: ; display: flex; flex-direction: column;justify-content: center; padding-left: 20px;padding-right: 20px;">
							<div>
								username
							</div>
							<div>
								level: ?
							</div>
							<div>
								?W ?L
							</div>
						</div>
					</div>

                </div>
                <div class="col-4  gy-3" style="background-color: ;">
					
					<div class="box">
						<div >
							<div>
								<div style="display: flex;flex-direction: row;">
									<img src="./static/assets/images/icon.svg" style="width: 26px;">
									<img src="./static/assets/images/icon.svg" style="width: 46px;">
								</div>
								<div style="padding-top: 10px;">
									Winrate: ?
								</div>
							</div>
						</div>
						<div style="background-color: ; display: flex; flex-direction: column;justify-content: center; padding-left: 20px;padding-right: 20px;">
							<div>
								username
							</div>
							<div>
								level: ?
							</div>
							<div>
								?W ?L
							</div>
						</div>
					</div>

                </div>    
            </div>
        </div>

		<!-- table -->
		<div class="container" style="margin-top: 10px;">
			<div class="col overflow-scroll" style="height: 300px; background-color: #282828;border-radius: 10px;">
				<table class="table  table-borderless " style="color: white;">
					<thead>
						<tr>
							<th>Rank</th>
							<th>Name</th>
							<th>Level</th>
							<th>Win Rate</th>
							<th>Games Played</th>
						</tr>
					</thead>
					<tbody>
						<tr  style="background-color: #494949;">
							<td>5</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr>
							<td>6</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr  style="background-color: #494949;">
							<td>7</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr>
							<td>6</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr  style="background-color: #494949;">
							<td>7</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr>
							<td>6</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr  style="background-color: #494949;">
							<td>7</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr>
							<td>6</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
						<tr  style="background-color: #494949;">
							<td>7</td>
							<td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
							<td>level: ?</td>
							<td>Winrate: ?</td>
							<td>?W ?L</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>		
	</main>
    `;
    }
}