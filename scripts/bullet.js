class Bullet extends GameObject {
    constructor(src, ctx, posX, posY, direction) {
        super(src, ctx, posX, posY);

        this.velocityRight = (direction === orientation.right) ? bulletSpeed : 0;
        this.velocityLeft = (direction === orientation.left) ? bulletSpeed : 0;
        this.velocityUp = (direction === orientation.up) ? bulletSpeed : 0;
        this.velocityDown = (direction === orientation.down) ? bulletSpeed : 0;

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