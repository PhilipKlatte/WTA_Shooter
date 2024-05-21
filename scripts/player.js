class Player extends GameObject{

    constructor(src, posX, posY, highscore = 0) {
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
        this.highscore = highscore;
        this.dead = false;
        this.lastShot = 0;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);
        this.hitzone = new RectangularHitZone(0, tilesize, tilesize, 2*tilesize);
        
        this.orientation = orientation.up;

        this.pushedBarrel = null;

        this.stuckHorizontally = false;
        this.stuckVertically = false;

        this.animationFrame = 1;
    }

    move() {
        let movedPlayerHorizontally = new Player(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY);
        let movedPlayerVertically = new Player(this.src, this.posX, this.posY - this.velocityUp + this.velocityDown);
        
        this.stuckHorizontally = CollisionDetection.collidesWithOneOf(movedPlayerHorizontally, walls) != null;
        this.stuckVertically = CollisionDetection.collidesWithOneOf(movedPlayerVertically, walls) != null;

        if (this.pushedBarrel != null){
            let movedBarrelHorizontally = new Barrel(
                this.pushedBarrel.src,
                this.pushedBarrel.posX + this.pushedBarrel.velocityRight - this.pushedBarrel.velocityLeft,
                this.pushedBarrel.posY);

            if (CollisionDetection.collidesWithOneOf(movedBarrelHorizontally, walls) != null) {
                this.stuckHorizontally = true;
            }

            let movedBarrelVertically = new Barrel(
                this.pushedBarrel.src,
                this.pushedBarrel.posX,
                this.pushedBarrel.posY + this.pushedBarrel.velocityDown - this.pushedBarrel.velocityUp);

            if (CollisionDetection.collidesWithOneOf(movedBarrelVertically, walls) != null) {
                this.stuckVertically = true;
            }
        }

        if (!this.stuckHorizontally) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        if (!this.stuckVertically) {
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        }

        if (this.velocityDown > 0) this.orientation = orientation.down;
        if (this.velocityUp > 0) this.orientation = orientation.up;
        if (this.velocityRight > 0) this.orientation = orientation.right;
        if (this.velocityLeft > 0) this.orientation = orientation.left;
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

        if (this.animationFrame === 4) this.animationFrame = 1;
        else if (frame % 2 === 0) this.animationFrame++;

        ctx.drawImage(
            playerImg,
            this.animationFrame*tilesize, row*2*tilesize,
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

    drawKillCount(){
        ctx.save();
        ctx.font ="bold 60px serif";
        let killCountText = "kills: " + this.kills;
        ctx.fillText(killCountText, tilesize, 2*tilesize);

        if (this.highscore > 0){
            ctx.font ="bold 25px serif";
            let highscoreText = "highscore: " + this.highscore;
            ctx.fillText(highscoreText, tilesize, 2.75*tilesize);
        }

        ctx.restore();
    }

    displayHealth(){
        ctx.save();
        let newHealth = this.health-this.damageTaken;
        ctx.font ="bold 25px serif";
        ctx.fillText(newHealth.toString(), this.posX,this.posY);
        ctx.font ="bold 60px serif";
        let newHealthAnzeige = "health: " + newHealth;
        ctx.fillText(newHealthAnzeige.toString(), 22*tilesize, 2*tilesize);
        ctx.restore();
    }

    hit(damage) {
        if (clock - this.lastDamage < 200) return;

        playSound("assets/sounds/player hit.mp3");

        this.damageTaken += damage;

        if (this.health - this.damageTaken <= 0) this.kill();

        this.lastDamage = clock;
    }

    kill(){
        playSound("assets/sounds/death.mp3");

        this.dead = true;
        this.updateHighscore();
        this.kills = 0;
        console.log("player killed with", this.kills, "kills");

        resetGame();
    }

    updateHighscore() {
        if (this.kills > this.highscore) this.highscore = this.kills;
    }

    shoot(direction){
        if (clock - this.lastShot < 200) return;

        playSound("assets/sounds/shot.mp3");

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
        return Math.abs(this.velocityDown - this.velocityUp) + Math.abs(this.velocityRight - this.velocityLeft) !== 0;
    }
}