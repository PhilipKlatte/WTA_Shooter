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

        walls.push(w);
    });
}
function drawWall(wall){
    if (wall.orientation === "horizontal"){
        let x = wall.fromX;

        while (x < wall.untilX){
            ctx.drawImage(wall_horizontal_top, x, wall.fromY);
            x += tilesize;
        }

        x = wall.fromX;

        while (x < wall.untilX){
            ctx.drawImage(wall_horizontal, x, wall.fromY + tilesize);
            x += tilesize;
        }

        x = wall.fromX;

        while (x < wall.untilX){
            ctx.drawImage(wall_horizontal, x, wall.fromY + 2*tilesize);
            x += tilesize;
        }
    }
    
    if (wall.orientation === "vertical"){
        let y = wall.fromY;

        while (y < wall.untilY){
            ctx.drawImage(wall_vertical, wall.fromX, y);
            y += tilesize;
        }
    }
}