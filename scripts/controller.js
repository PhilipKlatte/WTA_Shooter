var canvas, ctx;

const tilesize = 32;

var orientation = {
    up: 180,
    down: 0,
    left: 270,
    right: 90
}

var playerImg;
var worldImg;
var barrelImg;
var zombieImg;

const walls = [];
const zombies = [];
const barrels = [];

var player;

var barrel1 = new Barrel(barrelImg, ctx, 12*tilesize,15*tilesize);

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

    player = new Player(3*tilesize,20*tilesize);

    walls.push(new Wall(10*tilesize, 9*tilesize,0*tilesize,15*tilesize));
    walls.push(new Wall(24*tilesize,16*tilesize,7*tilesize,8*tilesize));
    walls.push(new Wall(24*tilesize,6*tilesize,21*tilesize,22*tilesize));

    zombies.push(new Zombie(zombieImg, ctx, 5*tilesize, 5*tilesize, 0.9));
    zombies.push(new Zombie(zombieImg, ctx,7*tilesize, 6*tilesize, 1.5));

    barrels.push(new Barrel(barrelImg, ctx, 12*tilesize,15*tilesize));

    preloadAssets();

    setInterval(gameLoop,60);
}

function gameLoop() {
    if(detectColision(walls[0])
    && detectColision(walls[1])
    && detectColision(walls[2])){
        if(detectColisionBarrelPlayer(barrel1)){
            player.movePlayer(playerVelocityRight, playerVelocityLeft, playerVelocityUp, playerVelocityDown);
        }
    }
    
    zombies[0].move(player.posX, player.posY);
    zombies[1].move(player.posX, player.posY);
    draw();
}

function detectColision(Wand){
    var newPosX = player.posX + playerVelocityRight -playerVelocityLeft;
    var newPosY = player.posY - playerVelocityUp + playerVelocityDown;

    if(
        newPosX < Wand.xRechts &&
        newPosX + playerImg.width > Wand.xLinks &&
        newPosY + (playerImg.height/2) < Wand.yOben &&
        newPosY + playerImg.height > Wand.yUnten
    ){
        console.log('ColisionDetectetPlayerWand');
        return false;
    }
    else{
        return true;
    }
}

function detectColisionBarrelPlayer(barrel){

    var newPosX = player.posX + playerVelocityRight -playerVelocityLeft;
    var newPosY = player.posY - playerVelocityUp + playerVelocityDown;

    if(
        newPosX < barrel.posX+barrelImg.width &&
        newPosX + playerImg.width > barrel.posX
        &&
        newPosY < barrel.posY+ barrelImg.height &&
        newPosY + (playerImg.height/2) > barrel.posY
    ){
        console.log('ColisionDetectetPlayerBarrel');
        return detectColisionBarrelWand(barrel,walls[0]);
    }
    else{
        return true;
    }
}


function detectColisionBarrelWand(barrel, wall){

    var newPosX = barrel.posX + playerVelocityRight -playerVelocityLeft;
    var newPosY = barrel.posY - playerVelocityUp + playerVelocityDown;

    if(
        //newPosX > wall.xLinks &&
        //newPosX + barrelImg.width < wall.xRechts
        //&&
        newPosY < wall.yOben &&
        newPosY + (barrelImg.height/2) > wall.yUnten
        /*
        newPosX < wall.xRechts &&
        newPosX + barrelImg.width > wall.xLinks &&
        newPosY + (barrelImg.height/2) < wall.yOben &&
        newPosY + barrelImg.height > wall.yUnten
        */
    ){
        console.log('ColisionDetectetBarrelWand');
        return false;
    }
    else{
        barrel.moveBarrel(playerVelocityRight,playerVelocityLeft,playerVelocityUp,playerVelocityDown)
        return true;
    }
}


function detectColisionZom(Wand,ZomPosX, ZomPosY) {

//var newPosX = playerPosX + playerVelocityRight -playerVelocityLeft;
//var newPosY = playerPosY - playerVelocityUp + playerVelocityDown;

    if (
        ZomPosX < Wand.xRechts &&
        ZomPosX + playerImg.width > Wand.xLinks &&
        ZomPosY < Wand.yOben &&
        ZomPosY + playerImg.height > Wand.yUnten
    ) {
        //console.log('ColisionDetectetZom');
        return false;
    } else {
        return true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld();
    drawBarrell();
    drawPlayer();
    drawZombie();
    //drawAndRotatePlayer()
    //drawRotatedRect(700, 100, 100, 200, 90);
    drawGrid(tilesize);
}

function drawZombie() {
    ctx.drawImage(zombieImg, zombies[0].posX, zombies[0].posY);
    ctx.drawImage(zombieImg, zombies[1].posX, zombies[1].posY);

}

function drawWorld() {
    ctx.drawImage(worldImg, 0, 0);
}

function drawPlayer() {
    ctx.drawImage(playerImg, player.posX, player.posY);
}

function drawBarrell() {
    ctx.drawImage(barrelImg, barrel1.posX, barrel1.posY);
}

function drawAndRotatePlayer() {
    // const image = new Image();
    // image.onload = () => {
    //     this.ctx.drawImage(image, player2PosX, player2PosY)
    // };
    // image.src = "player.png";

    ctx.save();
    ctx.translate(playerPosX + player.width / 2, playerPosY + player.height / 2);
    ctx.rotate(playerOrientation * Math.PI / 180);
    ctx.drawImage(player, -player.width / 2, -player.height / 2);
    ctx.restore();
}

function drawGrid(spacing) {
    var x = 0;

    while (x < canvas.width) {
        x += spacing;
        drawLine(x, 0, x, canvas.height);
    }

    var y = 0;

    while (y < canvas.height) {
        y += spacing;
        drawLine(0, y, canvas.width, y);
    }
}

function drawLine(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}

function drawRotatedRect(x, y, width, height, degrees) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = "brown";
    ctx.fillRect(-width / 2, -height / 2, width, height);
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
    playerImg = addImage("assets/player32x64.png");
    worldImg = addImage("assets/testmap.png");
    barrelImg = addImage("assets/barrell32x64.png");
    zombieImg = addImage("assets/zombie32x64.png");

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval(gameLoop, 40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}

document.addEventListener("DOMContentLoaded", init);
