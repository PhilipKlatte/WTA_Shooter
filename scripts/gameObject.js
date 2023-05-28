class GameObject {
    constructor(src, ctx, posX, posY) {
        this.src = src;
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;

        this.collideZone = null;
    }

    draw (){
        this.ctx.drawImage(this.src, this.posX, this.posY);
    }
}

