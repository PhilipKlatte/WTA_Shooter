var canvas, ctx;

const tilesize = 32;

var orientation = {
    up: 180,
    down: 0,
    left: 270,
    right: 90
}

var playerImg = AssetLoader.addImage("assets/player32x64.png");
var barrelImg = AssetLoader.addImage("assets/barrell32x64.png");
var zombieImg = AssetLoader.addImage("assets/zombie32x64.png");
var floorImg = AssetLoader.addImage("assets/floorpanel2_32x32.png");
var wall_horizontal = AssetLoader.addImage("assets/wall_horizontal4_32x32.png");
var wall_horizontal_top = AssetLoader.addImage("assets/wall_horizontal_top_32x32.png");
var wall_vertical = AssetLoader.addImage("assets/wall_vertical2_32x32.png");

const walls = [];
const zombies = [];
const barrels = [];
const bullets = [];

var player;

var playerOrientation = orientation.down;

function init() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (32 * tilesize).toString());
    canvas.setAttribute("height", (24 * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    loadWalls();

    zombies.push(new Zombie(zombieImg, 4*tilesize, 3*tilesize, getRandomNumber(2, 9)));
    zombies.push(new Zombie(zombieImg, 28*tilesize, 5*tilesize, getRandomNumber(2, 9)));
    zombies.push(new Zombie(zombieImg, 20*tilesize, 20*tilesize, getRandomNumber(2, 9)));
    zombies.push(new Zombie(zombieImg,7*tilesize, 6*tilesize, getRandomNumber(2, 9)));

    barrels.push(new Barrel(barrelImg, 12*tilesize,15*tilesize));

    setInterval(gameLoop,60);
}

function gameLoop() {
    moveBullets();
    moveZombies();
    player.move();
    moveBarrels();
    draw();
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
        player.posX + playerImg.width/2,
        player.posY + playerImg.height/2,
        direction));
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function moveZombies(){
    zombies.forEach(zombie => {
        if (zombie.seesPlayer()) zombie.move(player.posX, player.posY);
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor()
    drawWalls();
    barrels.forEach(barrel => barrel.draw());
    player.draw();
    zombies.forEach(zombie => zombie.draw());
    drawBullets();
    //showCollideZones();
    //drawGrid(tilesize);
    //drawLineFromZombieToPlayer();
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

document.addEventListener("DOMContentLoaded", init);
