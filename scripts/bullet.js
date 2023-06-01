class Bullet extends GameObject {
    constructor(src, posX, posY, direction) {
        super(src, posX, posY);

        this.speed = 20;

        this.velocityRight = (direction === orientation.right) ? this.speed : 0;
        this.velocityLeft = (direction === orientation.left) ? this.speed : 0;
        this.velocityUp = (direction === orientation.up) ? this.speed : 0;
        this.velocityDown = (direction === orientation.down) ? this.speed : 0;

        this.collideZone = new CircularCollideZone(4);
    }

    move() {
        if (CollisionDetection.collidesWithOneOf(this, walls) === null) {
            this.posX = this.posX + this.velocityRight - this.velocityLeft;
            this.posY = this.posY - this.velocityUp + this.velocityDown;
        } else if (CollisionDetection.collidesWithOneOf(this, walls) != null){
            delete bullets[bullets.indexOf(this)];
        }

        //logCoordinates();
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}