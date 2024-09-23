import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("game");
    }
	
	async getFlexPong() {
		return "";
	}

	async getUsr() {
		return ``;
	}

	async getHead() {
		return `
				<nav class="pongList"></nav>
				<div class="usr"></div>
        `
	};

    async getHtml() {
        return ` <h2 style="color:white;">the game should be here</h2> `;
    }
}