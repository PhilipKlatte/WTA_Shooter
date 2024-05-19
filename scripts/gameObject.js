class GameObject {
    constructor(src, posX, posY, hitZone, collideZone) {
        this.src = src;
        this.posX = posX;
        this.posY = posY;

        this.hitZone= hitZone;
        this.collideZone= collideZone;

        this.zones = new Set();
    }

    showCollideZone(){
        let zone = null;

        this.zones.forEach(elem => {
            if (elem instanceof RectangularCollideZone){
                zone = elem;
            }
        })

        if (zone === null) console.error("No CollideZone!");
        else this.showRectangularCollideZone(zone);
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

