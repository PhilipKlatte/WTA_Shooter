class Wall {
    constructor(yOben,yUnten,xLinks,xRechts) {
        this.yOben = yOben;
        this.yUnten = yUnten;
        this.xLinks = xLinks;
        this.xRechts =xRechts;

        this.orientation = (Math.abs(yOben - yUnten) === tilesize) ? "horizontal" : "horizontal";
    }
}