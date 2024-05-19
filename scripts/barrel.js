class Barrel extends GameObject {
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.zones.add(new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize));
        this.zones.add(new RectangularHitZone(0, tilesize, tilesize, 2*tilesize));

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);
        this.hitZone = new RectangularHitZone(0, tilesize, tilesize, 2*tilesize);

        this.stuckHorizontally = false;
        this.stuckVertically = false;

        this.damage = 40;
    }

    move(){
        if (CollisionDetection.collidesWith2(this, player)){
            this.velocityRight = player.velocityRight;
            this.velocityLeft = player.velocityLeft;
            this.velocityUp = player.velocityUp;
            this.velocityDown = player.velocityDown;

            player.pushedBarrel = this;
        } else {
            player.pushedBarrel = null;
        }

        let movedBarrelHorizontally = new Barrel(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY);
        let movedBarrelVertically = new Barrel(this.src, this.posX, this.posY - this.velocityUp + this.velocityDown);
            
        this.stuckHorizontally = CollisionDetection.collidesWithOneOf2(movedBarrelHorizontally, walls) != null;
        this.stuckVertically = CollisionDetection.collidesWithOneOf2(movedBarrelVertically, walls) != null;

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
        playSound("assets/sounds/barrel explosion.mp3");

        let centerX = this.posX + 0.5*tilesize;
        let centerY = this.posY + 1.5* tilesize;

        let explosion = new Explosion(explosionImg, centerX, centerY, 2.5*tilesize);

        effects.push(explosion);

        delete barrels[barrels.indexOf(this)];
    }
}