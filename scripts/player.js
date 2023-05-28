class Player extends GameObject{
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);
        
        this.velocityRight = 0;
        this.velocityLeft = 0;
        this.velocityUp = 0;
        this.velocityDown = 0;
        
        this.orientation = orientation.up;
    }

    movePlayer() {
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