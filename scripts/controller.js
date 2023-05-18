var canvas, ctx;

const tilesize = 32;

var orientation = {
    up: 180,
    down: 0,
    left: 270,
    right: 90
}
var player;
var world;
var barrell;

var zombie;
var playerPosX = 3*tilesize;
var playerPosY = 20*tilesize;
var playerVelocityRight = 0;
var playerVelocityLeft = 0;
var playerVelocityUp = 0;
var playerVelocityDown = 0;

var playerOrientation = orientation.down;



function init() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (32 * tilesize).toString());
    canvas.setAttribute("height", (24 * tilesize).toString());
    // canvas = 1024x768

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

    if (playerPosX + playerVelocityRight < canvas.width + 1) {
        playerPosX += playerVelocityRight;
    } else{
        playerPosX = canvas.width - player.width;
    }
    if (playerPosX - playerVelocityLeft > -1) {
        playerPosX -= playerVelocityLeft;
    } else{
        playerPosX = 0;
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

    drawWorld();
    drawBarrell();
    drawPlayer();
    drawZombie();
    //drawAndRotatePlayer()
    //drawRotatedRect(700, 100, 100, 200, 90);
    drawGrid(tilesize);
}

function drawZombie(){
    ctx.drawImage(zombie, 17*tilesize, 11*tilesize);
    ctx.drawImage(zombie, 4*tilesize, 5*tilesize);
}

function drawWorld(){
    ctx.drawImage(world, 0, 0);
}

function drawPlayer(){
    ctx.drawImage(player, playerPosX, playerPosY);
}

function drawBarrell(){
    ctx.drawImage(barrell, 576, 512);
    ctx.drawImage(barrell, 12*tilesize, 4*tilesize);
    ctx.drawImage(barrell, 27*tilesize, 10*tilesize);
}

function drawAndRotatePlayer(){
    // const image = new Image();
    // image.onload = () => {
    //     this.ctx.drawImage(image, player2PosX, player2PosY)
    // };
    // image.src = "player.png";

    ctx.save();
    ctx.translate(playerPosX+player.width / 2, playerPosY+player.height / 2);
    ctx.rotate(playerOrientation*Math.PI/180);
    ctx.drawImage(player, -player.width / 2, -player.height / 2);
    ctx.restore();
}

function drawGrid(spacing){
    var x = 0;

    while (x < canvas.width){
        x += spacing;
        drawLine(x, 0, x, canvas.height);
    }

    var y = 0;

    while (y < canvas.height){
        y += spacing;
        drawLine(0, y, canvas.width, y);
    }
}

function drawLine(fromX, fromY, toX, toY){
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
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
    //player = addImage("assets/c.png");
    player = addImage("assets/player32x64.png");
    world = addImage("assets/testmap.png");
    barrell = addImage("assets/barrell32x64.png");
    zombie = addImage("assets/zombie32x64.png");

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval (gameLoop,40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}

document.addEventListener("DOMContentLoaded", init);