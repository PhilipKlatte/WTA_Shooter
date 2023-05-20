class Zombie extends gameObject{
    constructor(src, ctx, PosX, PosY, Speed){
        super(src, ctx, PosX, PosY);
        this.Speed= Speed;
    }


    move(targetX, targetY){
        var newZomPosX = 0;
        var newZomPosY= 0;

        if (this.PosX <= targetX){
            newZomPosX = this.PosX + this.Speed;

        }else if (this.PosX >= targetX){
            newZomPosX = this.PosX - this.Speed;
        }

        if (this.PosY <= targetY){
            newZomPosY = this.PosY + this.Speed;
        }else if ((this.PosY >= targetY)){
            newZomPosY = this.PosY - this.Speed;
        }

        if(detectColisionZom(wand1, newZomPosX, newZomPosY) &&
            detectColisionZom(wand2, newZomPosX, newZomPosY) &&
            detectColisionZom(wand3, newZomPosX, newZomPosY)
        ){
            this.PosX = newZomPosX;
            this.PosY = newZomPosY;
        }
    }
}

