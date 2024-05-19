class GameObject {
    constructor(src, posX, posY) {
        this.src = src;
        this.posX = posX;
        this.posY = posY;

        this.hitZone;
        this.collideZone;
    }

    showCollideZone(){
        if (this.collideZone === null) console.error("No CollideZone!");
        else this.showRectangularCollideZone(this.collideZone);
    }

    showRectangularCollideZone(zone){
        drawLine(
            this.posX + zone.untilX,
            this.posY + zone.fromY,
            this.posX + zone.fromX,
            this.posY + zone.untilY);
        drawLine(
            this.posX + zone.fromX,
            this.posY + zone.fromY,
            this.posX + zone.untilX,
            this.posY + zone.untilY);
        drawLine(
            this.posX + zone.fromX,
            this.posY + zone.untilY,
            this.posX + zone.untilX,
            this.posY + zone.untilY);
        drawLine(
            this.posX + zone.fromX,
            this.posY + zone.fromY,
            this.posX + zone.untilX,
            this.posY + zone.fromY);
        drawLine(
            this.posX + zone.untilX,
            this.posY + zone.fromY,
            this.posX + zone.untilX,
            this.posY + zone.untilY);
        drawLine(
            this.posX + zone.fromX,
            this.posY + zone.fromY,
            this.posX + zone.fromX,
            this.posY + zone.untilY);
    }

    draw(){
        if (this.src != null) ctx.drawImage(this.src, this.posX, this.posY);
    }
}

