class Wall extends GameObject{
    constructor(yOben,yUnten,xLinks,xRechts) {
        let src = {
            width: xRechts - xLinks,
            height: yUnten - yOben
        };

        super(src, null, xLinks, yOben);
        this.yOben = yOben;
        this.yUnten = yUnten;
        this.xLinks = xLinks;
        this.xRechts =xRechts;

        this.orientation = (Math.abs(yOben - yUnten) === tilesize) ? "horizontal" : "vertical";

        this.collideZone = new RectangularCollideZone(0, 0, this.xRechts - this.xLinks, this.yUnten - this.yOben);
    }
}