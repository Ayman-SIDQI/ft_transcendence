import AbstractView from "./AbstractView.js";
// the class doesnt have name because its only used externally when its imported, if u gonn use it in the same file u have to name it
export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("error");
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
        return ` <h2 style="color:white;">404 not found</h2> `;
    }
}