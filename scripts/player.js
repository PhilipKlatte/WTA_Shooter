class Player extends gameObject{
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);
        /*
        this.playerVelocityRight = 0;
        this.playerVelocityLeft = 0;
        this.playerVelocityUp = 0;
        this.playerVelocityDown = 0;
        this.playerOrientation = orientation.down;
        */
    }

    movePlayer(playerVelocityRight, playerVelocityLeft, playerVelocityUp, playerVelocityDown) {
        if (this.posX + playerVelocityRight < canvas.width + 1) {
            this.posX += playerVelocityRight;
        } else {
            this.posX = canvas.width - playerImg.width;
        }
        if (this.posX - playerVelocityLeft > -1) {
            this.posX -= playerVelocityLeft;
        } else {
            this.posX = 0;
        }
        if (this.posY - playerVelocityUp > -1) {
            this.posY -= playerVelocityUp;
        } else {
            this.posY = 0;
        }
        if (this.posY + playerVelocityDown < canvas.height - playerImg.height) {
            this.posY += playerVelocityDown;
        } else {
            this.posY = canvas.height - playerImg.height;
        }

        //logData();
    }

    logData(){
        console.log("X", this.posX);
        console.log("Y", this.posY);
    }
}