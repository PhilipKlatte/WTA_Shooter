class Ammunition extends GameObject {
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.collideZone = new RectangularCollideZone(0, 0, tilesize, tilesize);

        this.count = 15;
    }
}