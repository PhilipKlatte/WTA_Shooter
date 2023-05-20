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

        if(detectColisionZom(wand1, newZomPosX, newZomPosY) &&
            detectColisionZom(wand2, newZomPosX, newZomPosY) &&
            detectColisionZom(wand3, newZomPosX, newZomPosY)
        ){
            this.posX = newZomPosX;
            this.posY = newZomPosY;
        }
    }
}

