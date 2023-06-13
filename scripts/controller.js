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
var pressE;

const walls = [];
const zombies = [];
const barrels = [];
const bullets = [];

var player;

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

    //zombies.push(new Zombie(zombieImg, ctx, 10*tilesize, 20*tilesize, 0.9));
    zombies.push(new Zombie(zombieImg, ctx,7*tilesize, 6*tilesize, 1.5));

    barrels.push(new Barrel(barrelImg, ctx, 12*tilesize,15*tilesize));

    preloadAssets();

    startX=0;
    startY=0;
    const end = { x: 3, y: 8 };
    findeDenWeg(startX,startY,end);


    //findeDenWeg();
    setInterval(gameLoop,60);
}

/*
function findeDenWeg(){
    const grid = [
        [new Cell(0, 0, false), new Cell(1, 0, false), new Cell(2, 0, false)],
        [new Cell(0, 1, true), new Cell(1, 1, true), new Cell(2, 1, false)],
        [new Cell(0, 2, false), new Cell(1, 2, false), new Cell(2, 2, false)]
      ];
      
      const start = { x: 0, y: 0 };
      const end = { x: 2, y: 2 };
      
      new findeDenWeg(grid,start,end);
      const path = findeDenWeg.astar(grid, start, end);
      console.log(path); // Gib den gefundenen Pfad aus
    }
*/

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
        ctx,
        player.posX + playerImg.width/2,
        player.posY + playerImg.height/2,
        direction));
}

function moveZombies(){
    zombies.forEach(zombie => {
        if (zombie.seesPlayer()){

         zombie.move(player.posX, player.posY);
        }
        else{

            //const start = { x: math.floor(zombie.posX/tilesize), y: math.floor(zombie.posY/tilesize) };
            //console.log(start);
            //const end = { x: 3, y: 8 };
            
            //findeDenWeg(1,2,end)
        }
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
    barrels.forEach(barrel => {
        ctx.drawImage(barrelImg, barrel.posX, barrel.posY);
    })
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
//----------------------
function findeDenWeg(startX, startY,end){
   /* const grid = [
        [new Cell(0, 0, false), new Cell(1, 0, false), new Cell(2, 0, false),new Cell(3, 0, false),new Cell(4, 0, false),new Cell(5, 0, false),new Cell(6, 0, false),new Cell(7, 0, false),new Cell(8, 0, false),new Cell(9, 0, false),new Cell(10, 0, false)],
        [new Cell(0, 1, false), new Cell(1, 1, false), new Cell(2, 1, false),new Cell(3, 1, false),new Cell(4, 1, false),new Cell(5, 1, false),new Cell(6, 1, false),new Cell(7, 1, false),new Cell(8, 1, false),new Cell(9, 1, false),new Cell(10, 1, false)],
        [new Cell(0, 2, false), new Cell(1, 2, false), new Cell(2, 2, false),new Cell(3, 2, false),new Cell(4, 2, false),new Cell(5, 2, false),new Cell(6, 2, false),new Cell(7, 2, false),new Cell(8, 2, false),new Cell(9, 2, false),new Cell(10, 2, false)],
        [new Cell(0, 3, false), new Cell(1, 3, false), new Cell(2, 3, false),new Cell(3, 3, false),new Cell(4, 3, false),new Cell(5, 3, false),new Cell(6, 3, false),new Cell(7, 3, false),new Cell(8, 3, false),new Cell(9, 3, false),new Cell(10, 3, false)],
        [new Cell(0, 4, false), new Cell(1, 4, false), new Cell(2, 4, false),new Cell(3, 4, false),new Cell(4, 4, false),new Cell(5, 4, false),new Cell(6, 4, false),new Cell(7, 4, false),new Cell(8, 4, false),new Cell(9, 4, false),new Cell(10, 4, false)],
        [new Cell(0, 5, false), new Cell(1, 5, false), new Cell(2, 5, false),new Cell(3, 5, false),new Cell(4, 5, false),new Cell(5, 5, false),new Cell(6, 5, false),new Cell(7, 5, false),new Cell(8, 5, false),new Cell(9, 5, false),new Cell(10, 5, false)],
        [new Cell(0, 6, false), new Cell(1, 6, false), new Cell(2, 6, false),new Cell(3, 6, false),new Cell(4, 6, false),new Cell(5, 6, false),new Cell(6, 6, false),new Cell(7, 6, false),new Cell(8, 6, false),new Cell(9, 6, false),new Cell(10, 6, false)],
        [new Cell(0, 7, false), new Cell(1, 7, false), new Cell(2, 7, false),new Cell(3, 7, false),new Cell(4, 7, false),new Cell(5, 7, false),new Cell(6, 7, false),new Cell(7, 7, false),new Cell(8, 7, false),new Cell(9, 7, false),new Cell(10, 7, false)],
        [new Cell(0, 8, false), new Cell(1, 8, false), new Cell(2, 8, false),new Cell(3, 8, false),new Cell(4, 8, false),new Cell(5, 8, false),new Cell(6, 8, false),new Cell(7, 8, false),new Cell(8, 8, false),new Cell(9, 8, false),new Cell(10, 8, false)],
        [new Cell(0, 9, false), new Cell(1, 9, false), new Cell(2, 9, false),new Cell(3, 9, false),new Cell(4, 9, false),new Cell(5, 9, false),new Cell(6, 9, false),new Cell(7, 9, false),new Cell(8, 9, false),new Cell(9, 9, false),new Cell(10, 9, false)],
        [new Cell(0, 10, false), new Cell(1, 10, false), new Cell(2, 10, false),new Cell(3, 10, false),new Cell(4, 10, false),new Cell(5, 10, false),new Cell(6, 10, false),new Cell(7, 10, false),new Cell(8, 10, false),new Cell(9, 10, false),new Cell(10, 10, false)],

    
    ];
*/

const grid = [
    [new Cell(0, 0, false), new Cell(1, 0, false), new Cell(2, 0, false)],
    [new Cell(0, 1, true), new Cell(1, 1, true), new Cell(2, 1, false)],
    [new Cell(0, 2, false), new Cell(1, 2, false), new Cell(2, 2, false)]
  ];

      //const start = { x: 8, y: 7 };
      //startX=0;
      //startY=0;
      endX
      end
      //const end = { x: 3, y: 8 };
      
      const path = astar(grid, startX, startY, end);
      console.log(path); // Gib den gefundenen Pfad aus
      console.log(path[0]);
      console.log(path[1]);
      console.log(path[2]);
      console.log(path[3]);
    }
    //
    
    // Hilfsfunktion, um eine Zelle im Gitter darzustellen
    function Cell(x, y, isWall) {
        this.x = x;
        this.y = y;
        this.g = 0; // Entfernung vom Startpunkt
        this.h = 0; // Heuristische Entfernung zum Zielpunkt
        this.f = 0; // Gesamtkosten: f = g + h
        this.visited = false;
        this.closed = false;
        this.parent = null;
        this.isWall = isWall;
      }
      
      // A* Pfadfindungsalgorithmus
      function astar(grid, startX, startY, end) {
        const openList = [];
        const closedList = [];
      
        console.log("Moin");
    
        // Initialisierung des Startpunkts
        const startCell = grid[startX][startY];
        startCell.visited = true;
        openList.push(startCell);
      
        while (openList.length > 0) {
          // Finde Zelle mit niedrigsten Gesamtkosten (f)
          let lowestCostIndex = 0;
          for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < openList[lowestCostIndex].f) {
              lowestCostIndex = i;
            }
          }
      
          const currentCell = openList[lowestCostIndex];
      
          // Ziel erreicht
          if (currentCell === grid[end.x][end.y]) {
            const path = [];
            let temp = currentCell;
            while (temp.parent) {
              path.push(temp);
              temp = temp.parent;
            }
            return path.reverse();
          }
      
          // Aktuelle Zelle aus der Open-Liste entfernen und zur Closed-Liste hinzufügen
          openList.splice(lowestCostIndex, 1);
          closedList.push(currentCell);
          currentCell.closed = true;
      
          // Nachbarn der aktuellen Zelle überprüfen
          const neighbors = getNeighbors(grid, currentCell.x, currentCell.y);
          for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
      
            if (neighbor.closed || neighbor.isWall) {
              continue;
            }
      
            const gScore = currentCell.g + 1; // Die Entfernung zum Nachbarn beträgt 1
      
            // Überprüfen, ob der Nachbar bereits in der Open-Liste ist
            const inOpenList = openList.includes(neighbor);
            if (!inOpenList || gScore < neighbor.g) {
              neighbor.g = gScore;
              neighbor.h = heuristic(neighbor, grid[end.x][end.y]);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.parent = currentCell;
      
              if (!inOpenList) {
                openList.push(neighbor);
                neighbor.visited = true;
              }
            }
          }
        }
      
        // Kein Pfad gefunden
        return [];
      }
      
      // Hilfsfunktion, um die Nachbarn einer Zelle zu erhalten
      function getNeighbors(grid, x, y) {
        const neighbors = [];
        const numRows = grid.length;
        const numCols = grid[0].length;
      
        if (x > 0) neighbors.push(grid[x - 1][y]); // Links
        if (x < numRows - 1) neighbors.push(grid[x + 1][y]); // Rechts
        if (y > 0) neighbors.push(grid[x][y - 1]); // Oben
        if (y < numCols - 1) neighbors.push(grid[x][y + 1]); // Unten
      
        return neighbors;
      }
      
      // Hilfsfunktion, um die heuristische Entfernung zwischen zwei Zellen zu berechnen
      function heuristic(cellA, cellB) {
        const dx = Math.abs(cellA.x - cellB.x);
        const dy = Math.abs(cellA.y - cellB.y);
        return dx + dy; // Manhattan-Distanz
      }
      
    
    
    //
//______________________




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
    pressE = addImage("assets/PressE.png");

    var checkResources = function () {
        if (_toPreload === 0)

            setInterval(gameLoop, 40);
        else
            setTimeout(checkResources, 200);
    }
    checkResources();
}


document.addEventListener("DOMContentLoaded", init);
