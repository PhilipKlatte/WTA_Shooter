var canvas, ctx;

var player2PosX = 200;
var player2PosY = 200;
let playerVelocityRight = 0;
let playerVelocityLeft = 0;
let playerVelocityUp = 0;
let playerVelocityDown = 0;
let player2orientation = 0;

var player2;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    preloadAssets();

    setInterval(gameLoop,60);
}

function gameLoop() {
    movePlayer();
    draw();
}

function movePlayer(){
    let centerX = player2PosX + player2.width / 2;
    let centerY = player2PosY + player2.height / 2;

    if (centerX + player2.height / 2 + playerVelocityRight < canvas.width + 1) {
        player2PosX += playerVelocityRight;
    } else{
        player2PosX = canvas.width - player2.width / 2 * 3;
    }
    if (centerX - player2.height / 2 - playerVelocityLeft > -1) {
        player2PosX -= playerVelocityLeft;
    } else{
        player2PosX = player2.width / 2;
    }
    if (player2PosY - playerVelocityUp > -1) {
        player2PosY -= playerVelocityUp;
    } else{
        player2PosY = 0;
    }
    if (player2PosY + playerVelocityDown < canvas.height - player2.height) {
        player2PosY += playerVelocityDown;
    } else {
        player2PosY = canvas.height - player2.height;
    }

    // console.log("X", player2PosX);
    // console.log("Y", player2PosY);
    // console.log("centerX", centerX);
    // console.log("centerY", centerY);

    //player2PosX += playerVelocityRight;
    //player2PosX -= playerVelocityLeft;
    //player2PosY -= playerVelocityUp;
    //player2PosY += playerVelocityDown;
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawPlayer2()
    drawRotatedRect(700, 100, 100, 200, 90);
    drawGrid();
}

function drawPlayer2(){
    // const image = new Image();
    // image.onload = () => {
    //     this.ctx.drawImage(image, player2PosX, player2PosY)
    // };
    // image.src = "player.png";

    ctx.save();
    ctx.beginPath();
    ctx.translate(player2PosX+player2.width / 2, player2PosY+player2.height / 2);
    ctx.rotate(player2orientation*Math.PI/180);
    ctx.drawImage(player2, -player2.width / 2, -player2.height / 2);
    ctx.restore();
}

function drawGrid(){
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100,600);
    ctx.moveTo(200, 0);
    ctx.lineTo(200,600);
    ctx.moveTo(300, 0);
    ctx.lineTo(300,600);
    ctx.moveTo(400, 0);
    ctx.lineTo(400,600);
    ctx.moveTo(500, 0);
    ctx.lineTo(500,600);
    ctx.moveTo(600, 0);
    ctx.lineTo(600,600);
    ctx.moveTo(700, 0);
    ctx.lineTo(700,600);
    ctx.moveTo(800, 0);
    ctx.lineTo(800,600);

    ctx.moveTo(0, 100);
    ctx.lineTo(900, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(900, 200);
    ctx.moveTo(0, 300);
    ctx.lineTo(900, 300);
    ctx.moveTo(0, 400);
    ctx.lineTo(900, 400);
    ctx.moveTo(0, 500);
    ctx.lineTo(900, 500);
    ctx.stroke();
}

function drawRotatedRect(x,y,width,height,degrees){
    ctx.save();
    ctx.beginPath();
    ctx.translate( x+width/2, y+height/2 );
    ctx.rotate(degrees*Math.PI/180);
    ctx.fillStyle = "brown";
    ctx.fillRect( -width/2, -height/2, width, height);
    ctx.restore();
}

function keyboardPressed(ev) {
    var key_pressed = String.fromCharCode(ev.keyCode);

    if (key_pressed === "W") {
        movePlayerIfDoesntCollide(player2PosX, player2PosY - 5);
    }
    if (key_pressed === "A") {
        movePlayerIfDoesntCollide(player2PosX - 5, player2PosY);
    }
    if (key_pressed === "S") {
        movePlayerIfDoesntCollide(player2PosX, player2PosY + 5);
    }
    if (key_pressed === "D") {
        movePlayerIfDoesntCollide(player2PosX + 5, player2PosY);
    }
}

function movePlayerIfDoesntCollide(newx, newy){
    if (newx > -1 && newx + 50 < 901 && newy > -1 && newy + 50 < 601) {
        player2PosX = newx;
        player2PosY = newy;
    }
}

function preloadAssets() {
    var _toPreload = 0;

    var addImage = function (src) {

        var img = new Image();
        img.src = src;
        _toPreload++;

        img.addEventListener('load', function () {
            _toPreload--;
        }, false);
        return img;
    }

    background = addImage("https://picsum.photos/640/480");
    player = addImage("assets/ufo356x50x4.png");
    player2 = addImage("c.png")

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval (gameLoop,40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}

document.addEventListener("DOMContentLoaded", init);