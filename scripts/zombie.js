class Zombie extends GameObject{
    constructor(src, posX, posY, speed){
        super(src, posX, posY);

        this.speed = speed;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);
    }

    move(){
        if (this.seesPlayer()){
            let newZomPosX = 0;
            let newZomPosY= 0;

            if (this.posX <= player.posX){
                newZomPosX = this.posX + this.speed;

            }else if (this.posX >= player.posX){
                newZomPosX = this.posX - this.speed;
            }

            if (this.posY <= player.posY){
                newZomPosY = this.posY + this.speed;
            }else if ((this.posY >= player.posY)){
                newZomPosY = this.posY - this.speed;
            }

            if (CollisionDetection.collidesWithOneOf(new Zombie(this.src, newZomPosX, this.posY), walls) === null) {
                this.posX = newZomPosX;
            }

            if (CollisionDetection.collidesWithOneOf(new Zombie(this.src, this.posX, newZomPosY), walls) === null) {
                this.posY = newZomPosY;
            }
        }
    }

    hit(){
        delete zombies[zombies.indexOf(this)];

        zombies.push(new Zombie(zombieImg, 17*tilesize, 11*tilesize, getRandomNumberIn(2, 9)));
    }

    seesPlayer(){
        let sees = true;

        walls.forEach(wall => {
            if (wall.orientation === "vertical"){
                if (this.visionBlockedByVerticalWall(wall, player.posX, player.posY, this.posX, this.posY)) sees = false;
            } else if (wall.orientation === "horizontal"){
                if (this.visionBlockedByHorizontalWall(wall)) sees = false;
            }
        });

        return sees;
    }

    visionBlockedByVerticalWall(wall, playerX, playerY, zomX, zomY){
        let offsetPlayerX = playerX - wall.fromX;
        let newPlayerY = -playerY;
        let offsetZomX = zomX - wall.fromX;
        let newZomY = -zomY;

        let slope = this.calculateSlope(offsetPlayerX, newPlayerY, offsetZomX, newZomY);
        let y = this.calculateYIntercept(slope, offsetPlayerX, newPlayerY);

        let viewInterceptsWall = y < -wall.fromY && y > -wall.untilY;
        let playerLeftAndZombieRight = (player.posX < wall.fromX && this.posX > wall.fromX);
        let playerRightAndZombieLeft = (player.posX > wall.fromX && this.posX < wall.fromX);
        let playerAndZombieOnOppositeSides = playerRightAndZombieLeft || playerLeftAndZombieRight;

        return viewInterceptsWall && playerAndZombieOnOppositeSides;
    }

    visionBlockedByHorizontalWall(wall){
        let slope = this.calculateSlope(player.posX, -player.posY, this.posX, -this.posY);
        let yIntercept = this.calculateYIntercept(slope, player.posX, -player.posY);

        let x = (-wall.fromY - yIntercept) / slope;

        let viewInterceptsWall = x > wall.fromX && x < wall.untilX;
        let playerAboveAndZombieBelow = (-player.posY > -wall.fromY && -this.posY < -wall.fromY);
        let playerBelowAndZombieAbove = (-player.posY < -wall.fromY && -this.posY > -wall.fromY);

        let playerAndZombiesOnOppositeSides = playerAboveAndZombieBelow || playerBelowAndZombieAbove;

        return viewInterceptsWall && playerAndZombiesOnOppositeSides;
    }

    calculateYIntercept(slope, playerPosX, playerPosY){
        return playerPosY - slope * playerPosX;
    }

    calculateSlope(x1, y1, x2, y2){
        let deltaY = y2 - y1;
        let deltaX = x2 - x1;

        return deltaY / deltaX;
    }
}

