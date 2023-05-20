class Player {
    constructor(playerPosX, playerPosY) {

        this.playerPosX = playerPosX; //3
        this.playerPosY = playerPosY; //20
        /*
        this.playerVelocityRight = 0;
        this.playerVelocityLeft = 0;
        this.playerVelocityUp = 0;
        this.playerVelocityDown = 0;
        this.playerOrientation = orientation.down;
        */

    }

    movePlayer(playerVelocityRight, playerVelocityLeft, playerVelocityUp, playerVelocityDown) {
        let centerX = this.playerPosX + player.width / 2;
        let centerY = this.playerPosY + player.height / 2;

        if (this.playerPosX + playerVelocityRight < canvas.width + 1) {
            this.playerPosX += playerVelocityRight;
        } else {
            this.playerPosX = canvas.width - playerImg.width;
        }
        if (this.playerPosX - playerVelocityLeft > -1) {
            this.playerPosX -= playerVelocityLeft;
        } else {
            this.playerPosX = 0;
        }
        if (this.playerPosY - playerVelocityUp > -1) {
            this.playerPosY -= playerVelocityUp;
        } else {
            this.playerPosY = 0;
        }
        if (this.playerPosY + playerVelocityDown < canvas.height - playerImg.height) {
            this.playerPosY += playerVelocityDown;
        } else {
            this.playerPosY = canvas.height - playerImg.height;
        }

        console.log("X", this.playerPosX);
        console.log("Y", this.playerPosY);

        //player2PosX += playerVelocityRight;
        //player2PosX -= playerVelocityLeft;
        //player2PosY -= playerVelocityUp;
        //player2PosY += playerVelocityDown;

    }

}