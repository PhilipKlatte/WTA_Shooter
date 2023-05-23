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
            this.posX = canvas.width - playerImg.width;
        }
        if (this.posX - this.velocityLeft > -1) {
            this.posX -= this.velocityLeft;
        } else {
            this.posX = 0;
        }
        if (this.posY - this.velocityUp > -1) {
            this.posY -= this.velocityUp;
        } else {
            this.posY = 0;
        }
        if (this.posY + this.velocityDown < canvas.height - playerImg.height) {
            this.posY += this.velocityDown;
        } else {
            this.posY = canvas.height - playerImg.height;
        }

        //logCoordinates();
    }

    logCoordinates(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}