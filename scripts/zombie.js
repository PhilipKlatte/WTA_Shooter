class Zombie extends GameObject{
    constructor(src, posX, posY, speed){
        super(src, posX, posY);

        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;

        this.speed = speed;

        this.collideZone = new RectangularCollideZone(0, tilesize, tilesize, 2*tilesize);

        this.health = 40;
        this.damageTaken = 0;

        this.damage = 10;
    }

    move(){
        this.velocityDown = 0;
        this.velocityUp = 0;
        this.velocityLeft = 0;
        this.velocityRight = 0;

        if (this.#seesPlayer()){

            (this.posX < player.posX) ? this.velocityRight = this.speed : this.velocityLeft = this.speed;
            (this.posY < player.posY) ? this.velocityDown = this.speed : this.velocityUp = this.speed;

            if (CollisionDetection.collidesWithOneOf(new Zombie(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY), walls) === null
            && CollisionDetection.collidesWithOneOf(new Zombie(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY), barrels) === null) {
                console.log("move x")
                this.posX = this.posX + this.velocityRight - this.velocityLeft;
            }

            if (CollisionDetection.collidesWithOneOf(new Zombie(this.src, this.posX, this.posY + this.velocityDown - this.velocityUp), walls) === null
                && CollisionDetection.collidesWithOneOf(new Zombie(this.src, this.posX + this.velocityRight - this.velocityLeft, this.posY), barrels) === null) {
                this.posY += this.velocityDown - this.velocityUp;
            }
        }

        if (CollisionDetection.collidesWith(this, player)) player.hit(this.damage);
    }

    draw(){
        super.draw();
        this.#displayHealth();
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

        if (this.health - this.damageTaken <= 0) this.kill();
    }

    kill(){
        delete zombies[zombies.indexOf(this)];

        if (getRandomNumberIn(0, 100) < 10) {
            maxZombieCount++;
        }

        player.kills++;

        spawnNewZombie();
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
}

