class Barrel extends GameObject {
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);

        this.collideZone = new CollideZone(0, tilesize, tilesize, 2*tilesize);
    }
    moveBarrel(playerVelocityRight,playerVelocityLeft,playerVelocityUp,playerVelocityDown){

        this.posX = this.posX + playerVelocityRight - playerVelocityLeft;
        this.posY = this.posY + playerVelocityUp - playerVelocityDown;


    }
}