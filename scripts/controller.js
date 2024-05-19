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

var playerImg = AssetLoader.addImage("assets/player/player_full.png");
var barrelImg = AssetLoader.addImage("assets/barrell32x64.png");
var zombieImg = AssetLoader.addImage("assets/zombie/zombie_full.png");
var floorImg = AssetLoader.addImage("assets/floorpanel2_32x32.png");
var explosionImg = AssetLoader.addImage("assets/explosion_full.png");
var wall_horizontal = AssetLoader.addImage("assets/wall_horizontal4_32x32.png");
var wall_horizontal_top = AssetLoader.addImage("assets/wall_horizontal_top_32x32.png");
var wall_vertical = AssetLoader.addImage("assets/wall_vertical2_32x32.png");
var game_over_overlay = AssetLoader.addImage("assets/game_over_overlay.png");
var titlescreen = AssetLoader.addImage("assets/game/Title-Screen.png");
var controls = AssetLoader.addImage("assets/game/controls.png");
var press_key = AssetLoader.addImage("assets/game/controls.png");

const walls = [];
const zombies = [];
const barrels = [];
const bullets = [];
const effects = [];

var maxZombieCount = 5;
var increaseZombieCountProbability = 10; // Probalitity that the ZombieCount increases by one after every killed Zombie
var lastBarrelDrop = 0;

var zombieMinSpeed = 1;
var zombieMaxSpeed = 4.5;

var player;

var frame = 0;              // numbers gameloops cyclically from 0-20; gets updated per gameloop
var start = Date.now();     // Time at which the game was started
var clock = 0;              // Time elapsed since game was started; gets updated per gameloop

var interval = null;        // the Id of the interval that calls the gameLoop() function
var gamePaused = false;
var soundsMuted = false;

var mouseX = 0;             // mouse position X coordinate; currently unused
var mouseY = 0;             // mouse position Y coordinate; currently unused

var debugMode = false;

async function startGame(){
    buildCanvas();

    pressKeyToStartGame();

    startMusic();

    ctx.drawImage(titlescreen, 0, 0);
    await pauseUntilKeyPress();

    ctx.drawImage(controls, 0, 0);
    await pauseUntilKeyPress();

    init();
}

function init() {
    buildCanvas();

    if (!player) player = new Player(playerImg, 3*tilesize, 20*tilesize);

    loadWalls();
    spawnNewZombies();
    spawnBarrels(5);

    if (music.paused) playMusic();

    interval = setInterval(gameLoop,50);        // create interval that calls gameLoop() function every 50ms
}

/**
 * Gets the canvas element from the DOM and initializes it
 */
function buildCanvas(){
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", (tilesX * tilesize).toString());
    canvas.setAttribute("height", (tilesY * tilesize).toString());
    // canvas = 1024x768

    ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pauseGame(){
    gamePaused = true;

    pauseMusic();

    clearInterval(interval);

    ctx.save();
    ctx.font ="bold 300px serif";
    ctx.fillText("PAUSE", tilesize, 15*tilesize);
    ctx.restore();
}

function resumeGame(){
    gamePaused = false;

    playMusic();
    interval = setInterval(gameLoop,50);
}

async function resetGame(){
    clearInterval(interval);

    pauseMusic();

    await pauseUntilKeyPress();

    frame = 0;
    start = Date.now();
    clock = 0;

    maxZombieCount = 4;

    player = new Player(playerImg, 3*tilesize, 20*tilesize, player.highscore)

    walls.splice(0, walls.length);
    zombies.splice(0, zombies.length);
    barrels.splice(0, barrels.length);
    bullets.splice(0, bullets.length);
    effects.splice(0, effects.length);

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

/**
 * This function gets called every 50ms (20x per second). It moves all gameobjects and draws the new frame.
 */
function gameLoop() {
    bullets.forEach(bullet => bullet.move());
    zombies.forEach(zombie => zombie.move(player.posX, player.posY));
    player.move();
    barrels.forEach(barrel => barrel.move());
    effects.forEach(effect => effect.move());

    advanceTime();

    spawnBarrelsEvery(30000);

    draw();
}

/**
 * drops new barrels after a certain period of time
 * 
 * @param {int} milliseconds - the time in milliseconds after which new barrels should drop
 */
function spawnBarrelsEvery(milliseconds) {
    if (clock - lastBarrelDrop > milliseconds && count(barrels) < 10) {
        spawnBarrels(2);
        lastBarrelDrop = clock;
    }
}

/**
 * advances the time variables like clock and frame
 */
function advanceTime(){
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
    effects.forEach(effect => effect.draw());

    player.drawKillCount();

    if (player.dead) ctx.drawImage(game_over_overlay, 0, 0);

    if (debugMode) drawDebugMode();
}

function drawDebugMode() {
    showCollideZones();
    drawGrid(tilesize);
    drawLineFromZombieToPlayer();
    drawLineForWall();
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

function toggleDebugMode() {
    this.debugMode = !debugMode;
}

document.addEventListener("DOMContentLoaded", startGame);