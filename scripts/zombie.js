class Zombie extends gameObject{
    constructor(src, ctx, posX, posY, speed){
        super(src, ctx, posX, posY);
        this.speed= speed;
    }

    move(targetX, targetY){
        var newZomPosX = 0;
        var newZomPosY= 0;

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

        if(detectColisionZom(walls[0], newZomPosX, newZomPosY) &&
            detectColisionZom(walls[1], newZomPosX, newZomPosY) &&
            detectColisionZom(walls[2], newZomPosX, newZomPosY)
        ){
            this.posX = newZomPosX;
            this.posY = newZomPosY;
        }
    }

    seesPlayer(){
        let seesPlayer = true;

        // walls.forEach(wall => {
        //     if (wall.orientation === "vertical"){
        //
        //     } else if (wall.orientation === "horizontal"){
        //         seesPlayer = this.visionBlockedByHorizontalWall(wall);
        //     }
        // });

        if (walls[0].orientation === "vertical"){

        } else if (walls[0].orientation === "horizontal"){
            seesPlayer = this.visionBlockedByHorizontalWall(walls[0]);
        }

        return seesPlayer;
    }

    visionBlockedByHorizontalWall(wall){
        let wallStart = 0;
        let wallFinish = 480;

        let slope = this.calculateSlope(player.posX, -player.posY, this.posX, -this.posY);
        let yIntercept = this.calculateYIntercept(slope);

        let x = (-wall.yOben - yIntercept) / slope;

        let viewInterceptsWall = x > wall.xLinks && x < wall.xRechts;
        let playerAboveAndZombieBelow = (-player.posY > -wall.yOben && -this.posY < -wall.yOben);
        let playerBelowAndZombieAbove = (-player.posY < -wall.yOben && -this.posY > -wall.yOben);

        let playerAndZombiesOnOppositeSides = playerAboveAndZombieBelow || playerBelowAndZombieAbove;

        let doesntSeePlayer = viewInterceptsWall && playerAndZombiesOnOppositeSides;

        return !doesntSeePlayer;
    }

    calculateYIntercept(slope){
        return -player.posY - slope * player.posX;
    }

    calculateSlope(x1, y1, x2, y2){
        let deltaY = y2 - y1;
        let deltaX = x2 - x1;

        return deltaY / deltaX;
    }
}

