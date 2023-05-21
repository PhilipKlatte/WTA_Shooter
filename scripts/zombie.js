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
        let wall = -304;
        let wallStart = 0;
        let wallFinish = 480;

        let slope = this.calculateSlope(player.posX, -player.posY, this.posX, -this.posY);
        let yIntercept = this.calculateYIntercept(slope);

        let x = (wall - yIntercept) / slope;

        let viewInterceptsWall = x > wallStart && x < wallFinish;
        let playerAboveAndZombieBelow = (-player.posY > wall && -this.posY < wall);
        let playerBelowAndZombieAbove = (-player.posY < wall && -this.posY > wall);

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

