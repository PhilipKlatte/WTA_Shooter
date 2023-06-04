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

var playerImg = AssetLoader.addImage("assets/player_gun_down.png");
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

var maxZombieCount = 4;

var player;

var frame = 0;
var start = Date.now();     // Time at which the game was started
var clock = 0;              // Time elapsed since game was started

var interval = null;

function init() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (tilesX * tilesize).toString());
    canvas.setAttribute("height", (tilesY * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    loadWalls();

    //spawnZombies(maxZombieCount);

    spawnBarrels(3);

    interval = setInterval(gameLoop,50);
}

function reset(){
    frame = 0;
    start = Date.now();
    clock = 0;

    maxZombieCount = 4;

    walls.splice(0, walls.length);
    zombies.splice(0, zombies.length);
    barrels.splice(0, barrels.length);
    bullets.splice(0, bullets.length);

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    clearInterval(interval);

    init();
}

function gameLoop() {
    bullets.forEach(bullet => bullet.move());
    zombies.forEach(zombie => zombie.move(player.posX, player.posY));
    player.move();
    barrels.forEach(barrel => barrel.move());

    draw();

    (frame === 19) ? frame = 0 : frame ++;
    clock = Date.now() - start;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor()
    walls.forEach(wall => wall.draw());
    barrels.forEach(barrel => barrel.draw());
    player.draw();
    zombies.forEach(zombie => zombie.draw());
    bullets.forEach(bullet => bullet.draw());

    drawKillCount();

    //showCollideZones();
    //drawGrid(tilesize);
    //drawLineFromZombieToPlayer();
    //drawLineForWall();
}

function drawKillCount(){
    let text = "kills: " + player.killCount;
    ctx.save();
    ctx.font ="bold 60px serif";
    ctx.fillText(text, tilesize, 2*tilesize);
    ctx.restore();
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