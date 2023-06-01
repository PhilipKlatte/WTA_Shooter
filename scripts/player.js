class Player extends GameObject{
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.speed = 8;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);

        this.orientation = orientation.up;

        this.pushedBarrel = null;

        this.stuckHorizontally = false;
        this.stuckVertically = false;
    }

    move() {
        this.stuckHorizontally = CollisionDetection.collidesWithOneOf(new Player(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY), walls) != null;
        this.stuckVertically = CollisionDetection.collidesWithOneOf(new Player(this.src, this.posX, this.posY - this.velocityUp + this.velocityDown), walls) != null;

        if (this.pushedBarrel != null){
            if (this.pushedBarrel.stuckHorizontally) this.stuckHorizontally = true;
            if (this.pushedBarrel.stuckVertically) this.stuckVertically = true;
        }

        if (!this.stuckHorizontally) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        if (!this.stuckVertically) {
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        }
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}