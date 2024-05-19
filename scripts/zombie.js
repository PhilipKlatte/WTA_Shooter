class Zombie extends GameObject{
    constructor(src, posX, posY, speed){
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;
        this.orientation = orientation.right;

        this.hasSeenPlayer = false;
        this.lastKnownPlayerPositionX = null;
        this.lastKnownPlayerPositionY = null;

        this.speed = speed;
        this.idlespeed= getRandomNumberIn(1,3);


        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);
        this.hitZone = new RectangularHitZone(0, 0, tilesize, 2*tilesize);

        this.zones.add(new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize))
        this.zones.add(new RectangularHitZone(0, 0, tilesize, 2*tilesize))

        this.health = 40;
        this.damageTaken = 0;
        this.damage = 10;
      
        this.pushedBarrel = null;
      
        this.animationFrame = 1;
        this.laufeInEineRichtungFuer=0;
        this.laufeInRichtungX=0;
        this.laufeInRichtungY=0;

        this.timeLastSeenPlayer=null;
    }

    move(){
        this.velocityDown = 0;
        this.velocityUp = 0;
        this.velocityLeft = 0;
        this.velocityRight = 0;

        let approachX;
        let approachY;

        if (this.#seesPlayer()){
            //this.lastKnownPlayerPositionX = player.posX;
            //this.lastKnownPlayerPositionY = player.posY;
            this.timeLastSeenPlayer = clock;
            approachX = player.posX;
            approachY = player.posY;
        } else if (this.hasSeenPlayer && this.lastKnownPlayerPositionX != null && this.lastKnownPlayerPositionY != null){
            approachX = this.lastKnownPlayerPositionX;
            approachY = this.lastKnownPlayerPositionY;
            if(clock - this.timeLastSeenPlayer > 10000){
                this.hasSeenPlayer= false;
            }
        } else if (!this.hasSeenPlayer){
            //this.speed= this.speed/2;
            if (this.laufeInEineRichtungFuer<0){
                if(getRandomNumberIn(1,10)>3) {
                    this.laufeInRichtungX = getRandomNumberIn(0, canvas.width);
                    this.laufeInRichtungY = getRandomNumberIn(0, canvas.height);
                }else{
                    this.laufeInRichtungX = this.posX;
                    this.laufeInRichtungY = this.posY;
                }
                this.laufeInEineRichtungFuer = getRandomNumberIn(10,25);
            }
            approachX=this.laufeInRichtungX;
            approachY=this.laufeInRichtungY;

            this.laufeInEineRichtungFuer-=1;
        }

        if (!this.hasSeenPlayer){
            if (this.posX < approachX - zombieMaxSpeed) this.velocityRight = this.idlespeed;
            if (this.posX > approachX + zombieMaxSpeed) this.velocityLeft = this.idlespeed;
            if (this.posY < approachY) this.velocityDown = this.idlespeed;
            if (this.posY > approachY) this.velocityUp = this.idlespeed;
        } else {
            if (this.posX < approachX - zombieMaxSpeed) this.velocityRight = this.speed;
            if (this.posX > approachX + zombieMaxSpeed) this.velocityLeft = this.speed;
            if (this.posY < approachY) this.velocityDown = this.speed;
            if (this.posY > approachY) this.velocityUp = this.speed;
        }



        if (this.posX === approachX){
            this.velocityRight = 0;
            this.velocityLeft = 0;
        }


        if (this.posY === approachY){
            this.velocityUp = 0;
            this.velocityDown = 0;
        }

        let movedZombieHorizontally = new Zombie(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY);
        if (CollisionDetection.collidesWithOneOf(movedZombieHorizontally, RectangularCollideZone, walls, RectangularCollideZone) === null) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
        }

        let movedZombieVertically = new Zombie(this.src, this.posX, this.posY + this.velocityDown - this.velocityUp);
        if (CollisionDetection.collidesWithOneOf(movedZombieVertically, RectangularCollideZone, walls, RectangularCollideZone) === null) {
            this.posY += this.velocityDown - this.velocityUp;
        }

        if (this.velocityDown > 0) this.orientation = orientation.down;
        if (this.velocityUp > 0) this.orientation = orientation.up;
        if (this.velocityRight > 0) this.orientation = orientation.right;
        if (this.velocityLeft > 0) this.orientation = orientation.left;

        if (CollisionDetection.collidesWith(this,RectangularHitZone, player,RectangularHitZone)) player.hit(this.damage);
    }

    draw(){
        if (this.walking()) this.drawWalkingAnimation();
        else this.drawIdleAnimation();

        this.#displayHealth();
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
        else if (frame % 5 === 0) this.animationFrame++;

        ctx.drawImage(
            this.src,
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
            this.src,
            0, row*2*tilesize,
            tilesize, 2*tilesize,
            this.posX, this.posY,
            tilesize, 2*tilesize);
    }

    #displayHealth(){
        let newHealth = this.health - this.damageTaken;

        ctx.save();
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, tilesize, 5);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    
        var color;
    
        if (newHealth/this.health <= 0.15) color = 'red';
        else if (newHealth/this.health <= 0.5) color = 'orange';
        else color = 'lime';
    
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, newHealth/this.health*tilesize, 5);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    hit(damage){
        this.damageTaken += damage;

        playSound("assets/sounds/zombie hit.mp3");

        if (this.health - this.damageTaken <= 0) this.kill();
    }

    kill(){
        delete zombies[zombies.indexOf(this)];

        if (getRandomNumberIn(0, 100) < increaseZombieCountProbability) {
            maxZombieCount++;
        }

        player.kills++;

        spawnNewZombies();
    }

    #seesPlayer(){
        let sees = true;

        walls.forEach(wall => {
            if (wall.orientation === "vertical"){
                if (this.#visionBlockedByVerticalWall(wall, player.posX, player.posY, this.posX, this.posY)) sees = false;
            } else if (wall.orientation === "horizontal"){
                if (this.#visionBlockedByHorizontalWall(wall)) sees = false;
            }
        });

        if (sees) {
            this.hasSeenPlayer = true;
            this.lastKnownPlayerPositionX = null;
            this.lastKnownPlayerPositionY = null;
        }

        if (!sees && this.lastKnownPlayerPositionX === null && this.lastKnownPlayerPositionY === null){
            this.lastKnownPlayerPositionX = player.posX;
            this.lastKnownPlayerPositionY = player.posY;
        }

        return sees;
    }

    #visionBlockedByVerticalWall(wall, playerX, playerY, zomX, zomY){
        let offsetPlayerX = playerX - wall.fromX;
        let newPlayerY = -playerY;
        let offsetZomX = zomX - wall.fromX;
        let newZomY = -zomY;

        let slope = calculateSlope(offsetPlayerX, newPlayerY, offsetZomX, newZomY);
        let y = calculateYIntercept(slope, offsetPlayerX, newPlayerY);

        let viewInterceptsWall = y < -wall.fromY && y > -wall.untilY;
        let playerLeftAndZombieRight = (player.posX < wall.fromX && this.posX > wall.fromX);
        let playerRightAndZombieLeft = (player.posX > wall.fromX && this.posX < wall.fromX);
        let playerAndZombieOnOppositeSides = playerRightAndZombieLeft || playerLeftAndZombieRight;

        return viewInterceptsWall && playerAndZombieOnOppositeSides;
    }

    #visionBlockedByHorizontalWall(wall){
        let slope = calculateSlope(player.posX, -player.posY, this.posX, -this.posY);
        let yIntercept = calculateYIntercept(slope, player.posX, -player.posY);

        let x = (-wall.fromY - yIntercept) / slope;

        let viewInterceptsWall = x > wall.fromX && x < wall.untilX;
        let playerAboveAndZombieBelow = (-player.posY > -wall.fromY && -this.posY < -wall.fromY);
        let playerBelowAndZombieAbove = (-player.posY < -wall.fromY && -this.posY > -wall.fromY);

        let playerAndZombiesOnOppositeSides = playerAboveAndZombieBelow || playerBelowAndZombieAbove;

        return viewInterceptsWall && playerAndZombiesOnOppositeSides;
    }

    walking(){
        return Math.abs(this.velocityDown - this.velocityUp) + Math.abs(this.velocityRight - this.velocityLeft) !== 0;
    }
}

