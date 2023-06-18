var wallDefinitions = [
    [0,0,0,24],
    [31,0,31,24],
    [7, 16, 7, 23],
    [21, 6, 21, 20],
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

function spawnNewZombie(){
    let difference = maxZombieCount - count(zombies);

    let spawnSound = new Audio("assets/sounds/spawn.mp3");
    spawnSound.volume = 0.5;
    if (!soundsMuted) spawnSound.play();

    spawnZombies(difference);
}

function spawnBarrels(count){
    for (let i = 0; i < count; i++) {
        let barrel = null;

        do {
            barrel = new Barrel(
                barrelImg,
                getRandomNumberIn(0, tilesX)*tilesize,
                getRandomNumberIn(0, tilesY)*tilesize
            )
        } while (CollisionDetection.collidesWithOneOf(barrel, RectangularCollideZone, walls, RectangularCollideZone) != null
            && !CollisionDetection.collidesWith(barrel, RectangularCollideZone, player, RectangularCollideZone));

        barrels.push(barrel);
    }
}

function spawnZombies(count){
    for (let i = 0; i < count; i++) {
        let zombie = null;

        do {
            zombie = new Zombie(
                zombieImg,
                getRandomNumberIn(0, tilesX)*tilesize,
                getRandomNumberIn(0, tilesY)*tilesize,
                getRandomNumberIn(zombieMinSpeed, zombieMaxSpeed));
        } while (CollisionDetection.collidesWithOneOf(zombie, RectangularCollideZone, walls, RectangularCollideZone) != null);

        zombies.push(zombie);
    }

}
