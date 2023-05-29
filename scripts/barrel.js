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
        if (collidesWith(this, player)){
            this.velocityRight = player.velocityRight;
            this.velocityLeft = player.velocityLeft;
            this.velocityUp = player.velocityUp;
            this.velocityDown = player.velocityDown;
        }

        if (collidesWithOneOf(new Barrel(this.src, this.ctx, this.posX + this.velocityRight - this.velocityLeft, this.posY), walls) === null) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        if (collidesWithOneOf(new Barrel(this.src, this.ctx, this.posX, this.posY - this.velocityUp + this.velocityDown), walls) === null) {
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        }

        if (this.velocityRight > 0) this.velocityRight -= 0.1 * playerMovementSpeed;
        if (this.velocityLeft > 0) this.velocityLeft -= 0.1 * playerMovementSpeed;
        if (this.velocityUp > 0) this.velocityUp -= 0.1 * playerMovementSpeed;
        if (this.velocityDown > 0) this.velocityDown -= 0.1 * playerMovementSpeed;
    }
}