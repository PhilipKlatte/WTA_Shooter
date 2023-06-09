class Barrel extends GameObject {
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);

        this.stuckHorizontally = false;
        this.stuckVertically = false;
    }

    move(){
        if (CollisionDetection.collidesWith(this, player)){
            this.velocityRight = player.velocityRight;
            this.velocityLeft = player.velocityLeft;
            this.velocityUp = player.velocityUp;
            this.velocityDown = player.velocityDown;

            player.pushedBarrel = this;
        } else {
            player.pushedBarrel = null;
        }

        this.stuckHorizontally = CollisionDetection.collidesWithOneOf(new Barrel(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY), walls) != null;
        this.stuckVertically = CollisionDetection.collidesWithOneOf(new Barrel(this.src, this.posX, this.posY - this.velocityUp + this.velocityDown), walls) != null;

        if (!this.stuckHorizontally) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        if (!this.stuckVertically) {
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        }

        if (this.velocityRight > 0) this.velocityRight -= 0.1 * player.speed;
        if (this.velocityLeft > 0) this.velocityLeft -= 0.1 * player.speed;
        if (this.velocityUp > 0) this.velocityUp -= 0.1 * player.speed;
        if (this.velocityDown > 0) this.velocityDown -= 0.1 * player.speed;
    }

    explode(){
        new Audio("assets/sounds/barrel explosion.mp3").play();
        delete barrels[barrels.indexOf(this)];
    }
}