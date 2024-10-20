import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("sign-in");
    }

	async getFlexPong() {
		return "";
	}

	async getUsr() {
		return "";
	};
	
    async getHead() {
		return `
		<section>
            <nav class="navbar navbarSI navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid justify-content-between">
                    
                   <nav class="pongList"></nav>
				
					<a data-link class="navbar-brand navbar-brandSI mb-3 h1" href="index.html">
                        <img src="./static/assets/balls-golf-svgrepo-com.svg" width="30" height="30" class="d-inline-block align-top" alt="">
                        P O N G E R S
                    </a>
                    
                    
                   <nav class="usr"></nav>

                </div>
            </nav>
        </section>`;
	};
    
    async getHtml() {
        return `<main class="mainSI">
		<div class="container">
			<div class="row">
				<div class="col-md-6 offset-md-3">
					<section>
						<div class="panel">

							<h1>Sign in</h1>
							<form class="signInForm" action="/hna_signin_page">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text" id="basic-addon1">@</span>
									</div>
									<input type="text" class="form-control" placeholder="Username" aria-label="Username"
										aria-describedby="basic-addon1" id="username" name="username" minlength="5"
										maxlength="20" required>
								</div>
								<div class="input-group mb-3">
									<input type="password" class="form-control" placeholder="Password"
										aria-label="Password" aria-describedby="basic-addon2" id="password"
										name="password" required>
								</div>
								<div class="auth-form">
								<button type="button" class="btn btnSI btn-light"><svg width="24" height="24" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_284_776)">
									<path d="M0 30.9565H22.1076V42H33.1395V22.0435H11.0756L33.1395 0H22.1076L0 22.0435V30.9565Z" fill="black"/>
									<path d="M37.8926 11.0435L48.9245 0H37.8926V11.0435Z" fill="black"/>
									<path d="M48.9245 11.0435L37.8926 22.0435V33.0435H48.9245V22.0435L60.0001 11.0435V0H48.9245V11.0435Z" fill="black"/>
									<path d="M60.0004 22.0439L48.9248 33.044H60.0004V22.0439Z" fill="black"/>
									</g>
									<defs>
									<clipPath id="clip0_284_776">
									<rect width="60" height="42" fill="black"/>
									</clipPath>
									</defs>
									</svg></button>
								<button type="button" class="btn btnSI btn-light"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
									<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
									</svg>
								</button>
							</div>
							<br>
							<a data-link href="index.html" type="submit" class="sign-in btn btnSI btn-info btn-gradient-signup btn-gradient-signupSI">Sign In</a>

							<small><br><br><p class="pSI">Don't have an account? <br><a class="aSI" data-link href="register.html">Sign up</a></p></small>
							</form>
						</div>
					</section>
					
					<div class="popup2FA">
						<div class="popup2FA-body ">
							<div style="display: flex;justify-content: center;width:224px;height:22px;font-size: 18px;font-weight: bold;color: #F8F8F8;margin-top:10px;margin-bottom:25px;">2 factor Authentication</div>
							<input id="input-6digit" type="text" style="width:285px;height:36px;margin-bottom:30px;">
							<button class="confirmBtnSignin closeModal2FA"  >confirm</button>
						</div>
					</div>
	</main>`;
    }
}