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

let highscore = 0;

var playerImg = AssetLoader.addImage("assets/player/player_full.png");
var barrelImg = AssetLoader.addImage("assets/barrell32x64.png");
var zombieImg = AssetLoader.addImage("assets/zombie/zombie_full.png");
var floorImg = AssetLoader.addImage("assets/floorpanel2_32x32.png");
var wall_horizontal = AssetLoader.addImage("assets/wall_horizontal4_32x32.png");
var wall_horizontal_top = AssetLoader.addImage("assets/wall_horizontal_top_32x32.png");
var wall_vertical = AssetLoader.addImage("assets/wall_vertical2_32x32.png");
var game_over_overlay = AssetLoader.addImage("assets/game_over_overlay.png");

const walls = [];
const zombies = [];
const barrels = [];
const bullets = [];
const effects = [];

var maxZombieCount = 4;
var lastBarrelDrop = 0;

var zombieMinSpeed = 2;
var zombieMaxSpeed = 4.5;

var player;

var frame = 0;
var start = Date.now();     // Time at which the game was started
var clock = 0;              // Time elapsed since game was started

var interval = null;
var gamePaused = false;

var mouseX = 0;
var mouseY = 0;

var music = new Audio("assets/sounds/music.mp3");

function init() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (tilesX * tilesize).toString());
    canvas.setAttribute("height", (tilesY * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    loadWalls();
   // spawnZombies(4);
    spawnBarrels(1);

    music.currentTime = 0;
    music.loop = true;
    music.volume = 0.5;
    music.play();

    interval = setInterval(gameLoop,50);
}

function pauseGame(){
    gamePaused = true;
}

function resumeGame(){
    gamePaused = false;
}

async function reset(){
    clearInterval(interval);

    music.pause();

    await pauseUntilKeyPress();

    frame = 0;
    start = Date.now();
    clock = 0;

    if (player.kills > highscore) highscore = player.kills;

    maxZombieCount = 4;

    walls.splice(0, walls.length);
    zombies.splice(0, zombies.length);
    barrels.splice(0, barrels.length);
    bullets.splice(0, bullets.length);
    effects.splice(0, effects.length);

    player = new Player(playerImg, 3*tilesize, 20*tilesize);

    clearInterval(interval);

    music.currentTime = 0;

    init();
}

function pauseUntilKeyPress() {
    return new Promise((resolve) => {
        const handleKeyPress = (event) => {
            window.removeEventListener('keypress', handleKeyPress);
            resolve(event);
        };
        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('mousedown', handleKeyPress);
    });
}

function gameLoop() {
    bullets.forEach(bullet => bullet.move());
    zombies.forEach(zombie => zombie.move(player.posX, player.posY));
    player.move();
    barrels.forEach(barrel => barrel.move());
    effects.forEach(effect => effect.move());

    (frame === 19) ? frame = 0 : frame ++;
    clock = Date.now() - start;
    if (clock - lastBarrelDrop > 30000 && count(barrels) < 10) {
        spawnBarrels(2);
        lastBarrelDrop = clock;
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFloor()
    walls.forEach(wall => wall.draw());
    barrels.forEach(barrel => barrel.draw());
    player.draw();
    zombies.forEach(zombie => zombie.draw());
    bullets.forEach(bullet => bullet.draw());
    effects.forEach(effect => effect.draw());

    drawKillCount();
    //showCollideZones();
    //drawGrid(tilesize);
    //drawLineFromZombieToPlayer();
    //drawLineForWall();

    if (player.dead) ctx.drawImage(game_over_overlay, 0, 0);
}

function drawKillCount(){
    ctx.save();
    ctx.font ="bold 60px serif";
    let killCountText = "kills: " + player.kills;
    ctx.fillText(killCountText, tilesize, 2*tilesize);
    ctx.font ="bold 25px serif";
    let highscoreText = "highscore: " + highscore;
    if (highscore > 0) ctx.fillText(highscoreText, tilesize, 2.75*tilesize);
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