class Barrel extends gameObject {
    constructor(src, ctx, posX, posY) {
        super(src, ctx, posX, posY);

    }
    moveBarrel(playerVelocityRight,playerVelocityLeft,playerVelocityUp,playerVelocityDown){

        this.posX = this.posX + playerVelocityRight - playerVelocityLeft;
        this.posY = this.posY + playerVelocityUp - playerVelocityDown;


    }
}