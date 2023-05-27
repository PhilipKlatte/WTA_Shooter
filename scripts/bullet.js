class Bullet extends gameObject {
    constructor(src, ctx, posX, posY, velocityRight, velocityLeft, velocityUp, velocityDown) {
        super(src, ctx, posX, posY);

        this.velocityRight = velocityRight * 10;
        this.velocityLeft = velocityLeft * 10;
        this.velocityUp = velocityUp * 10;
        this.velocityDown = velocityDown * 10;
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