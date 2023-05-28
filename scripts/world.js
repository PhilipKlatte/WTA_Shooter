
var wallDefinitions = [
    [0,0,0,24],
    [31,0,31,24],
    [7, 16, 7, 23],
    [21, 6, 21, 23],
    [14, 9, 14, 16],
    [1, 0, 31, 0],
    [1, 23, 31, 23],
    [1, 9, 14, 9]
];

function loadWalls(){
    wallDefinitions.forEach(wall => {
        let w = new Wall(
            wall[1] * tilesize,
            (wall[1] === wall[3]) ? wall[3] * tilesize + tilesize: wall[3] * tilesize,
            wall[0] * tilesize,
            (wall[0] === wall[2]) ? wall[2] * tilesize + tilesize: wall[2] * tilesize
        );

        console.log("wand ", w);

        walls.push(w);
    });
}

function drawWorld() {
    wallDefinitions.forEach(wall => {
        drawWall(wall[0], wall[1], wall[2], wall[3]);
    })
}

function drawWall(fromX, fromY, untilX, untilY){
    if (fromX === untilX) drawVerticalWall(fromX*tilesize, fromY*tilesize, untilX*tilesize, untilY*tilesize);
    if (fromY === untilY) drawHorizontalWall(fromX*tilesize, fromY*tilesize, untilX*tilesize, untilY*tilesize);
}

function drawVerticalWall(fromX, fromY, untilX, untilY){

    while (fromY < untilY){
        ctx.drawImage(wall_vertical, fromX, fromY);
        fromY += tilesize;
    }
}

function drawHorizontalWall(fromX, fromY, untilX, untilY){
    let x = fromX;

    while (x < untilX){
        ctx.drawImage(wall_horizontal_top, x, fromY);
        x += tilesize;
    }

    x = fromX;

    while (x < untilX){
        ctx.drawImage(wall_horizontal, x, fromY + tilesize);
        x += tilesize;
    }

    x = fromX;

    while (x < untilX){
        ctx.drawImage(wall_horizontal, x, fromY + 2*tilesize);
        x += tilesize;
    }
}