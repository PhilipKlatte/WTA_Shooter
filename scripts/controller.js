var canvas, ctx;

const tilesize = 32;
var tilesX = 32;
var tilesY = 24;

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
    canvas.setAttribute("width", (tilesX * tilesize).toString());
    canvas.setAttribute("height", (tilesY * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    loadWalls();

    zombies.push(new Zombie(zombieImg, 4*tilesize, 3*tilesize, getRandomNumberIn(2, 9)));
    zombies.push(new Zombie(zombieImg, 28*tilesize, 5*tilesize, getRandomNumberIn(2, 9)));
    zombies.push(new Zombie(zombieImg, 20*tilesize, 20*tilesize, getRandomNumberIn(2, 9)));
    zombies.push(new Zombie(zombieImg,7*tilesize, 6*tilesize, getRandomNumberIn(2, 9)));

    barrels.push(new Barrel(barrelImg, 12*tilesize,15*tilesize));

    setInterval(gameLoop,60);
}

function gameLoop() {
    bullets.forEach(bullet => bullet.move());
    zombies.forEach(zombie => zombie.move(player.posX, player.posY));
    player.move();
    barrels.forEach(barrel => barrel.move());

    draw();
}

function shoot(direction){
    bullets.push(new Bullet(
        null,
        player.posX + playerImg.width/2,
        player.posY + playerImg.height/2,
        direction));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor()
    walls.forEach(wall => drawWall(wall));
    barrels.forEach(barrel => barrel.draw());
    player.draw();
    zombies.forEach(zombie => zombie.draw());
    bullets.forEach(bullet => bullet.draw());

    //showCollideZones();
    //drawGrid(tilesize);
    //drawLineFromZombieToPlayer();
    //drawLineForWall();
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

document.addEventListener("DOMContentLoaded", init);
