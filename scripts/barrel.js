class Barrel extends GameObject {
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.collideZone = new CollideZone(0, tilesize, tilesize, 2*tilesize);
    }

    move(){

    }
}