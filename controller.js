var canvas, ctx;

var playerPosX = 200;
var playerPosY = 200;
var playerVelocityRight = 0;
var playerVelocityLeft = 0;
var playerVelocityUp = 0;
var playerVelocityDown = 0;
var playerOrientation = 0;

var player;

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
    let centerX = playerPosX + player.width / 2;
    let centerY = playerPosY + player.height / 2;

    if (centerX + player.height / 2 + playerVelocityRight < canvas.width + 1) {
        playerPosX += playerVelocityRight;
    } else{
        playerPosX = canvas.width - player.width / 2 * 3;
    }
    if (centerX - player.height / 2 - playerVelocityLeft > -1) {
        playerPosX -= playerVelocityLeft;
    } else{
        playerPosX = player.width / 2;
    }
    if (playerPosY - playerVelocityUp > -1) {
        playerPosY -= playerVelocityUp;
    } else{
        playerPosY = 0;
    }
    if (playerPosY + playerVelocityDown < canvas.height - player.height) {
        playerPosY += playerVelocityDown;
    } else {
        playerPosY = canvas.height - player.height;
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

    drawPlayer()
    drawRotatedRect(700, 100, 100, 200, 90);
    drawGrid();
}

function drawPlayer(){
    // const image = new Image();
    // image.onload = () => {
    //     this.ctx.drawImage(image, player2PosX, player2PosY)
    // };
    // image.src = "player.png";

    ctx.save();
    ctx.beginPath();
    ctx.translate(playerPosX+player.width / 2, playerPosY+player.height / 2);
    ctx.rotate(playerOrientation*Math.PI/180);
    ctx.drawImage(player, -player.width / 2, -player.height / 2);
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
    player = addImage("c.png")

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval (gameLoop,40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}

document.addEventListener("DOMContentLoaded", init);