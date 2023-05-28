class Zombie extends gameObject{
    constructor(src, ctx, posX, posY, speed){
        super(src, ctx, posX, posY);
        this.speed= speed;
    }

    move(targetX, targetY){
        let newZomPosX = 0;
        let newZomPosY= 0;

        if (this.posX <= targetX){
            newZomPosX = this.posX + this.speed;

        }else if (this.posX >= targetX){
            newZomPosX = this.posX - this.speed;
        }

        if (this.posY <= targetY){
            newZomPosY = this.posY + this.speed;
        }else if ((this.posY >= targetY)){
            newZomPosY = this.posY - this.speed;
        }

        this.posX = newZomPosX;
        this.posY = newZomPosY;
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
        let offsetPlayerX = playerX - wall.xLinks;
        let newPlayerY = -playerY;
        let offsetZomX = zomX - wall.xLinks;
        let newZomY = -zomY;

        let slope = this.calculateSlope(offsetPlayerX, newPlayerY, offsetZomX, newZomY);
        let y = this.calculateYIntercept(slope, offsetPlayerX, newPlayerY);

        let viewInterceptsWall = -y < wall.yOben && -y > wall.yUnten;
        let playerLeftAndZombieRight = (player.posX < wall.xLinks && this.posX > wall.xLinks);
        let playerRightAndZombieLeft = (player.posX > wall.xLinks && this.posX < wall.xLinks);
        let playerAndZombieOnOppositeSides = playerRightAndZombieLeft || playerLeftAndZombieRight;

        return viewInterceptsWall && playerAndZombieOnOppositeSides;
    }

    visionBlockedByHorizontalWall(wall){
        let slope = this.calculateSlope(player.posX, -player.posY, this.posX, -this.posY);
        let yIntercept = this.calculateYIntercept(slope, player.posX, -player.posY);

        let x = (-wall.yOben - yIntercept) / slope;

        let viewInterceptsWall = x > wall.xLinks && x < wall.xRechts;
        let playerAboveAndZombieBelow = (-player.posY > -wall.yOben && -this.posY < -wall.yOben);
        let playerBelowAndZombieAbove = (-player.posY < -wall.yOben && -this.posY > -wall.yOben);

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

