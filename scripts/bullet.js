class Bullet extends GameObject {
    constructor(src, ctx, posX, posY, direction) {
        super(src, ctx, posX, posY);

        this.velocityRight = (direction === orientation.right) ? bulletSpeed : 0;
        this.velocityLeft = (direction === orientation.left) ? bulletSpeed : 0;
        this.velocityUp = (direction === orientation.up) ? bulletSpeed : 0;
        this.velocityDown = (direction === orientation.down) ? bulletSpeed : 0;
    }

    move() {
        if (this.posX + this.velocityRight < canvas.width + 1) {
            this.posX += this.velocityRight;
        } else {
            delete bullets[bullets.indexOf(this)];
        }
        if (this.posX - this.velocityLeft > -1) {
            this.posX -= this.velocityLeft;
        } else {
            delete bullets[bullets.indexOf(this)];
        }
        if (this.posY - this.velocityUp > -1) {
            this.posY -= this.velocityUp;
        } else {
            delete bullets[bullets.indexOf(this)];
        }
        if (this.posY + this.velocityDown < canvas.height - playerImg.height) {
            this.posY += this.velocityDown;
        } else {
            delete bullets[bullets.indexOf(this)];
        }

        //logCoordinates();
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}