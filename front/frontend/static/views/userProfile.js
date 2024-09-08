import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("userProfile");
    }

    async getHtml() {
        return `
        <main style="background-color: black;">
		<div class="container">
			<div class="row gy-3 gx-3" ">
                <!-- <div class="settingDiv">
                    Profile
                </div> -->
                <div class="col-12 " style=" background-color: #; border-radius: 10px;">
                    <div class="box2">
                        <div style="color: white;display: flex;padding-top: 20px;padding-bottom: 20px;padding-left: 20px;">
                            <div style="margin-left: 30px;">
                                <div>
                                    <div style="display: flex;flex-direction: row;">
                                        <img src="./static/assets/images/icon.svg" style="width: 87px;">
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column;justify-content: center;">
                                <div style="padding-left: 20px;padding-right: 20px; background-color: ;">
                                    <div>
                                        <h2>
                                            username
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
			
            <div class="row row-cols-3 g-2   justify-content-start align-items-start" style="background-color: ;" >
                <!-- <div class="row row-cols-3 gx-5" style="background-color: cadetblue;"> -->
                <!-- <div class="col-12" style="margin-top: 20px; background-color: red;"> -->
                    <div class="col-9  gy-3 " style="background-color: ;border-radius: 10px;">
                        <!-- <div class="row row-cols-2 gx-3"> -->
                            <!-- <div class="col-3" style="background-color: ;">
                            </div> -->
                            <div class="col-12 " style="display: flex;justify-content: start; background-color: #282828;color: white;padding-top: 20px;padding-bottom: 20px;padding-left: 20px;border-radius: 10px;">
                                <div class="box2">
                                <div >
                                    <div style="display: flex;justify-content: start;align-items: center;padding-left: 30px;">
                                        <img src="./static/assets/images/icon.svg" style="width: 87px;">
                                    </div>
                                </div>
                                <div>

                                    <div style="display: flex;justify-content: center;" >
                                        <h3 style="display: flex;justify-content: center;width: 300px; border-radius: 10px;padding-bottom: 2px;padding-top: 2px;background-color: #F8BD00;">
                                            RANK:1 LEVEL:10
                                        </h3>
                                    </div>
                                    <div style="background-color: ; display: flex; flex-direction: row;justify-content: center; padding-left: 20px;padding-right: 20px;">
                                        <div >
                                            winnrate:?
                                        </div>
                                        <div style="padding-left: 30px;padding-right: 30px;">
                                            Goal difference: ?
                                        </div>
                                        <div>
                                            Win streak:?
                                        </div>
                                    </div>
                                    <div style="font-size: small; display: flex;justify-content: center;">
                                        Score ? / received ?
                                    </div>
                                </div>
                                </div>
    
                            </div>
                        <!-- </div> -->
                    </div>
                    <div class="col-3 gy2 gx-3" style="margin-top: 20px; height: 150px;border-radius: 10px; background-color: #282828;color: white;">
                        <div class="box2" style="margin-top: 15px;justify-content: center;align-items: center;background-color:;">
                            <div style="display: flex;flex-direction: column; justify-content: center;padding-top: 10px;background-color: ;">
                                <div style="display: flex; justify-content: start;margin: 10px;">
                                    <div>
                                        <img src="static/assets/images/42.svg" style="width: 30px;">
                                    </div>
                                    <div style="margin-left: 10px;">
                                        add friend
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: start;margin: 10px;">
                                    <div>
                                        <img src="static/assets/images/42.svg" style="width: 30px;">
                                    </div>
                                    <div style="margin-left: 10px;">
                                        block
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-12" style="margin-top: 10px; background-color: #282828;border-radius: 10px;">
                    <div class="col overflow-scroll" style="height: 300px; background-color: #282828;border-radius: 10px;">
                        <div style="color: white;display: flex;justify-content: center;">
                            <h2>
                                Match history
                            </h2>
                        </div>
                        <table class="table  table-borderless " style="color: white;">
                            <thead>
                                <tr>
                                    <th>Opponent</th>
                                    <th>Result</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  style="background-color: #494949;">
                                    <td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
                                    <td>Win</td>
                                    <td>?W ?L</td>
                                </tr>
                                <tr >
                                    <td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
                                    <td>Win</td>
                                    <td>?W ?L</td>
                                </tr>
                                <tr  style="background-color: #494949;">
                                    <td><img src="./static/assets/images/icon.svg" style="width: 15px;"> username</td>
                                    <td>Win</td>
                                    <td>?W ?L</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>	
                
            </div>    
        </div>

		<!-- table -->
        
    </div>
        
	</main>
    `;
    }
}