class GameObject {
    constructor(src, ctx, posX, posY) {
        this.src = src;
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;

        this.collideZone = null;
    }

    showCollideZone(){
         if (this.collideZone instanceof RectangularCollideZone) this.showRectangularCollideZone();
    }

    showRectangularCollideZone(){
        drawLine(
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.fromY,
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.untilY);
        drawLine(
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.fromY,
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.untilY);
        drawLine(
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.untilY,
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.untilY);
        drawLine(
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.fromY,
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.fromY);
        drawLine(
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.fromY,
            this.posX + this.collideZone.untilX,
            this.posY + this.collideZone.untilY);
        drawLine(
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.fromY,
            this.posX + this.collideZone.fromX,
            this.posY + this.collideZone.untilY);
    }

    draw (){
        this.ctx.drawImage(this.src, this.posX, this.posY);
    }
}

