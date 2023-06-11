class Player extends GameObject{
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.speed = 10;
        this.health = 100;
        this.damageTaken = 0;
        this.lastDamage = 0;
        this.kills = 0;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);

        this.orientation = orientation.up;

        this.pushedBarrel = null;
        this.lastShot = 0;

        this.stuckHorizontally = false;
        this.stuckVertically = false;

        this.dead = false;
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

        this.displayHealth();
    }

    draw(){
        if (this.walking()) this.drawWalkingAnimation();
        else this.drawIdleAnimation();

        this.displayHealth();
    }

    drawWalkingAnimation(){
        let row = 0;

        switch(this.orientation){
            case orientation.right:
                row = 0;
                break;
            case orientation.left:
                row = 1;
                break;
            case orientation.down:
                row = 2;
                break;
            case orientation.up:
                row = 3;
                break;
        }
        
        let column = 1;

        if (this.velocityUp > 0){
            if (frame === 0) column = 1;
            if (frame % 5 === 0) column++;
        }

        let frames = [0, 1, 2, 3, 4];

        ctx.drawImage(
            playerImg,
            column*tilesize, row*2*tilesize,
            tilesize, 2*tilesize,
            this.posX, this.posY,
            tilesize, 2*tilesize);
    }

    drawIdleAnimation(){
        let row = 0;

        switch(this.orientation){
            case orientation.right:
                row = 0;
                break;
            case orientation.left:
                row = 1;
                break;
            case orientation.down:
                row = 2;
                break;
            case orientation.up:
                row = 3;
                break;
        }

        ctx.drawImage(
            playerImg,
            0, row*2*tilesize,
            tilesize, 2*tilesize,
            this.posX, this.posY,
            tilesize, 2*tilesize);
    }

    displayHealth(){
        let newHealth = this.health-this.damageTaken;
        ctx.fillText(newHealth.toString(), this.posX,this.posY);
    }

    hit(damage) {
        if (clock - this.lastDamage < 200) return;

        this.damageTaken += damage;

        if (this.health - this.damageTaken <= 0) this.kill();

        this.lastDamage = clock;
    }

    kill(){
        this.dead = true;
        console.log("player killed with", this.kills, "kills");
        reset();
    }

    shoot(direction){
        if (clock - this.lastShot < 200) return;

        bullets.push(new Bullet(
            null,
            this.posX + tilesize/2,
            this.posY + tilesize,
            direction));

        this.lastShot = clock;
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }

    walking(){
        return this.velocityUp + this.velocityDown + this.velocityLeft + this.velocityRight > 0;
    }
}