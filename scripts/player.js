class Player extends GameObject{
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);
        
        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;
        
        this.orientation = orientation.up;

        this.collideZone = new CollideZone(0, tilesize, tilesize, 2*tilesize);
    }

    move() {
        if (collidesWithOneOf(new Player(this.src, this.ctx, this.posX + this.velocityRight - this.velocityLeft, this.posY), walls) === null) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        if (collidesWithOneOf(new Player(this.src, this.ctx, this.posX, this.posY - this.velocityUp + this.velocityDown), walls) === null) {
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        }

        //logCoordinates();
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}