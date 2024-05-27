class Ammunition extends GameObject {
    constructor(src, posX, posY) {
        super(src, posX, posY);

        this.collideZone = new RectangularCollideZone(0, 0, tilesize, tilesize);

        this.count = 25;
    }

    regenerateAmmo(player){
        console.log('regenerating ammo');
        player.ammo += this.count;
        delete items[items.indexOf(this)];
    }
}