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
        this.untilX =untilX;

        this.orientation = (Math.abs(fromY - untilY) === tilesize) ? "horizontal" : "vertical";

        this.collideZone = new RectangularCollideZone(0, 0, this.untilX - this.fromX, this.untilY - this.fromY);
    }
}