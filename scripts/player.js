class Player extends gameObject{
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);
        
        this.playerVelocityRight = 0;
        this.playerVelocityLeft = 0;
        this.playerVelocityUp = 0;
        this.playerVelocityDown = 0;
        
        this.playerOrientation = orientation.down;
    }

    movePlayer() {
        if (this.posX + this.playerVelocityRight < canvas.width + 1) {
            this.posX += this.playerVelocityRight;
        } else {
            this.posX = canvas.width - playerImg.width;
        }
        if (this.posX - this.playerVelocityLeft > -1) {
            this.posX -= this.playerVelocityLeft;
        } else {
            this.posX = 0;
        }
        if (this.posY - this.playerVelocityUp > -1) {
            this.posY -= this.playerVelocityUp;
        } else {
            this.posY = 0;
        }
        if (this.posY + this.playerVelocityDown < canvas.height - playerImg.height) {
            this.posY += this.playerVelocityDown;
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