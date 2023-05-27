function drawWorld() {
    drawWalls(0, 0, 0, 24);
    drawWalls(31, 0, 31, 24);
    drawWalls(7, 16, 7, 23);
    drawWalls(21, 6, 21, 23);
    drawWalls(14, 9, 14, 16);

    drawWalls(1, 0, 31, 0);
    drawWalls(1, 23, 31, 23);
    drawWalls(1, 9, 14, 9);
}

function drawWalls(fromX, fromY, untilX, untilY){
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