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
var floorImg;
var wall_horizontal;
var wall_horizontal_top;
var wall_vertical;

const walls = [];
const zombies = [];
const barrels = [];
const bullets = [];

var player;

var barrel1 = new Barrel(barrelImg, ctx, 12*tilesize,15*tilesize);

var playerOrientation = orientation.down;

var bulletSpeed = 10;


function init() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (32 * tilesize).toString());
    canvas.setAttribute("height", (24 * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    player = new Player(3*tilesize, ctx, 3*tilesize, 20*tilesize);

    loadWalls();

    // walls.push(new Wall(9*tilesize, 10*tilesize,0*tilesize,15*tilesize));
    // walls.push(new Wall(24*tilesize,16*tilesize,7*tilesize,8*tilesize));
    // walls.push(new Wall(24*tilesize,6*tilesize,21*tilesize,22*tilesize));

    zombies.push(new Zombie(zombieImg, ctx, 20*tilesize, 20*tilesize, 0.9));
    zombies.push(new Zombie(zombieImg, ctx,7*tilesize, 6*tilesize, 1.5));

    barrels.push(new Barrel(barrelImg, ctx, 12*tilesize,15*tilesize));

    preloadAssets();

    setInterval(gameLoop,60);
}

function gameLoop() {
    moveBullets();
    moveZombies();
    player.move();
    moveBarrels();
    draw();

    if (collidesWithOneOf(player, walls) != null){
        console.log("collides");
    } else{
        console.log("doesnt collide");
    }

    //console.log("bullets:", bullets.length);

    //console.log("player orientation: ", player.orientation);
}

function moveBarrels(){
    barrels.forEach(barrel => {
        barrel.move();
    })
}

function moveBullets(){
    bullets.forEach(bullet => {
        bullet.move();
    })
}

function shoot(direction){
    bullets.push(new Bullet(
        null,
        ctx,
        player.posX + playerImg.width/2,
        player.posY + playerImg.height/2,
        direction));
}

function moveZombies(){
    zombies.forEach(zombie => {
        if (zombie.seesPlayer()) zombie.move(player.posX, player.posY);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor()
    drawWorld();
    drawBarrels();
    drawPlayer();
    drawZombie();
    drawBullets();
    showCollideZones();
    //drawGrid(tilesize);
    drawLineFromZombieToPlayer();
    //drawLineForWall();
}

function showCollideZones(){
    player.showCollideZone();

    walls.forEach(wall => {
        wall.showCollideZone();
    })

    zombies.forEach(zombie => {
        zombie.showCollideZone();
    })

    barrels.forEach(barrel => {
        barrel.showCollideZone();
    })
}

function drawBullets(){
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.posX, bullet.posY,4,0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
    })
}

function drawLineFromZombieToPlayer(){
    zombies.forEach(zombie => {
        drawLine(zombie.posX, zombie.posY, player.posX, player.posY);
    });
}

function drawLineForWall(){
    drawLine(0, 304, 32*tilesize, 304);
}

function drawZombie() {
    zombies.forEach(zombie => {
        ctx.drawImage(zombieImg, zombie.posX, zombie.posY);
    })
}

function drawPlayer() {
    ctx.drawImage(playerImg, player.posX, player.posY);
}

function drawBarrels() {
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

function drawFloor(){
    let x = 0;
    let y = 0;

    ctx.drawImage(floorImg, 10*tilesize, 10*tilesize);

    while (x < canvas.width){
        while (y < canvas.height){
            ctx.drawImage(floorImg, x, y);
            y += tilesize;
        }
        x += tilesize;
    }

    for (let i = 0; i < canvas.width; i+=tilesize) {
        for (let j = 0; j < canvas.height; j+=tilesize) {
            ctx.drawImage(floorImg, i, j);
        }
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
    floorImg = addImage("assets/floorpanel2_32x32.png")
    wall_horizontal = addImage("assets/wall_horizontal4_32x32.png")
    wall_horizontal_top = addImage("assets/wall_horizontal_top_32x32.png")
    wall_vertical = addImage("assets/wall_vertical2_32x32.png")

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval(gameLoop, 40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}

document.addEventListener("DOMContentLoaded", init);
