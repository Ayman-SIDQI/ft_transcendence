const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let docHeight, docWidth;
let Pad2YPos;
let Pad1YPos;
dirY = true; // Initialize dirY as a property of Obj
dirX = true;

function drawPads(Pad1YPos, Pad2YPos) {
    let Pad1 = new Obj(50, Pad1YPos, 25, 100, 'pink');
    let Pad2 = new Obj(docWidth - 75, Pad2YPos, 25, 100, 'blue');
    Pad1.drawPad();
    Pad2.drawPad();
}

class Obj {
    constructor(x, y, radius, height, color) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.height = height;
        // this.width = width;
        this.speed = 8;
        // this.dirY = true; // Initialize dirY as a property of Obj
        // this.dirX = true;
    }

    drawPad() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius, this.height);
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    moveBall() {
        if (dirY) this.y += this.speed
        if (dirX) this.x += this.speed
        if (!dirY) this.y -= this.speed
        if (!dirX) this.x -= this.speed
        if (this.y > docHeight) dirY = false
        if (this.y < 0) dirY = true
        ctx.clearRect(0, 0, docWidth + 100, docHeight)
        drawPads(Pad1YPos, Pad2YPos)
        ctx.fillRect(docWidth / 2 - 5, 0, 10, docHeight)
        ctx.fillStyle = "white"
        ctx.fill()
        this.drawBall()
        checkCollision(this.y, this.x)
    }
}

function canvasSetup() {
    docHeight = window.innerHeight;
    docWidth = window.innerWidth;
    canvas.height = docHeight;
    canvas.width = docWidth;
    Pad2YPos = docHeight / 2;
    Pad1YPos = docHeight / 2;
    drawPads(Pad1YPos, Pad2YPos)
    let ball = new Obj(docWidth / 2, docHeight / 2, 10, 10, 'red');
    ball.drawBall();
}

function checkCollision(ballY, ballX) {
    ballX = ballX - 5
    let LoclPad1XPos = 50 + 12.5
    distance1 = Math.abs(ballX - LoclPad1XPos)

    if (distance1 < 5 && ballY > (Pad1YPos - 50) && Pad1YPos + 100 > ballY) dirX = true
    ballX = ballX + 10
    let LoclPad2XPos = docWidth - 50
    distance2 = Math.abs(ballX - LoclPad2XPos)
    if (distance2 < 5 && ballY > (Pad2YPos - 50) && Pad2YPos + 100 > ballY) dirX = false
}


canvasSetup();




let RequestFrame = false;

canvas.onclick = () => {
    if (!RequestFrame) {
        var ball = new Obj(DocWidth / 2, DocHeight / 2, 10)
        ball.drawBall()
        RequestFrame = true
        MoveBallLoop(ball)
    }
}

function moveBallLoop(ball) {
    ball.moveBall();
    if (WKeyState && Pad1YPos > 0) Pad1YPos -= 10;
    if (SKeyState && Pad1YPos < window.innerHeight - 100) Pad1YPos += 10;
    if (OKeyState && Pad2YPos > 0) Pad2YPos -= 10;
    if (LKeyState && Pad2YPos < window.innerHeight - 100) Pad2YPos += 10;
    if (RequestFrame) requestAnimationFrame(() => { moveBallLoop(ball); });
}

function checkCollision(ballY, ballX) {
    let LoclPad1XPos = 50 + 12.5;
    let distance1 = Math.abs(ballX - LoclPad1XPos);

    if (distance1 < 10 && ballY > (Pad1YPos - 50) && Pad1YPos + 100 > ballY) dirX = true;

    let LoclPad2XPos = docWidth - 75 + 12.5;
    let distance2 = Math.abs(ballX - LoclPad2XPos);

    if (distance2 < 10 && ballY > (Pad2YPos - 50) && Pad2YPos + 100 > ballY) dirX = false;
}

let WKeyState = false;
let SKeyState = false;
let OKeyState = false;
let LKeyState = false;

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key == "w") WKeyState = true;
    if (e.key == "s") SKeyState = true;
    if (e.key == "ArrowUp") OKeyState = true;
    if (e.key == "ArrowDown") LKeyState = true;
    if (e.key == "Enter" && !RequestFrame) {
        ball = new Obj(docWidth / 2, docHeight / 2, 10, 10, 'red');
        RequestFrame = true;
        moveBallLoop(ball);
    }
});

document.addEventListener('keyup', (e) => {
    console.log(e.key)
    if (e.key == "w") WKeyState = false;
    if (e.key == "s") SKeyState = false;
    if (e.key == "ArrowUp") OKeyState = false;
    if (e.key == "ArrowDown") LKeyState = false;
});
