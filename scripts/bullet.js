class Bullet extends GameObject {
    constructor(src, posX, posY, direction) {
        super(src, posX, posY);

        this.speed = 40;

        this.damage = 14;

        this.velocityRight = (direction === orientation.right) ? this.speed : 0;
        this.velocityLeft = (direction === orientation.left) ? this.speed : 0;
        this.velocityUp = (direction === orientation.up) ? this.speed : 0;
        this.velocityDown = (direction === orientation.down) ? this.speed : 0;

        this.collideZone=new CircularCollideZone(4);
        this.hitZone=new CircularHitZone(4);
    }

    move() {
        if (this.#hitZombie()) return;
        if (this.#hitBarrel()) return;

        if (CollisionDetection.collidesWithOneOf(this,CircularCollideZone, walls, RectangularCollideZone) === null) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        } else if (CollisionDetection.collidesWithOneOf(this, CircularCollideZone, walls, RectangularCollideZone) != null){
            delete bullets[bullets.indexOf(this)];
        }

        //logCoordinates();
    }

    #hitZombie(){
        let hitZombie = CollisionDetection.collidesWithOneOf(this, CircularHitZone, zombies, RectangularHitZone);

        if (hitZombie != null){
            hitZombie.hit(this.damage);
            delete bullets[bullets.indexOf(this)];

            return true;
        }

        return false;
    }

    #hitBarrel(){
        let hitBarrel = CollisionDetection.collidesWithOneOf(this, CircularCollideZone, barrels, RectangularCollideZone);

        if (hitBarrel != null){
            hitBarrel.explode();
            delete bullets[bullets.indexOf(this)];

            return true;
        }

        return false;
    }
    
    draw(){
        ctx.beginPath();
        ctx.arc(this.posX, this.posY,4,0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}