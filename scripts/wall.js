class Wall extends GameObject{
    constructor(fromY, untilY, fromX, untilX) {
        let src = {
            width: untilX - fromX,
            height: untilY - fromY
        };

        super(src, fromX, fromY);
        this.fromY = fromY;
        this.untilY = untilY;
        this.fromX = fromX;
        this.untilX = untilX;

        this.orientation = (Math.abs(fromY - untilY) === tilesize) ? "horizontal" : "vertical";

        this.collideZone = new RectangularCollideZone(
            0,
            0,
            this.untilX - this.fromX,
            (this.orientation === "horizontal") ? tilesize*3 : this.untilY - this.fromY);
    }

    draw(){
        if (this.orientation === "horizontal"){
            let x = this.fromX;

            while (x < this.untilX){
                ctx.drawImage(wall_horizontal_top, x, this.fromY);
                x += tilesize;
            }

            x = this.fromX;

            while (x < this.untilX){
                ctx.drawImage(wall_horizontal, x, this.fromY + tilesize);
                x += tilesize;
            }

            x = this.fromX;

            while (x < this.untilX){
                ctx.drawImage(wall_horizontal, x, this.fromY + 2*tilesize);
                x += tilesize;
            }
        }

        if (this.orientation === "vertical"){
            let y = this.fromY;

            while (y < this.untilY){
                ctx.drawImage(wall_vertical, this.fromX, y);
                y += tilesize;
            }
        }
    }
}