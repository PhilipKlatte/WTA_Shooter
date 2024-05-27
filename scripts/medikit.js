class Medikit extends GameObject {
    constructor(src, posX, posY){
        super(src, posX, posY);

        this.lifePoints = 40;

        this.collideZone = new RectangularCollideZone(0, 0, tilesize, tilesize);
    }

    regenerateHealth(player){
        let newLifePoints = player.health - player.damageTaken + this.lifePoints;

        if (newLifePoints <= player.health) {
            player.damageTaken -= this.lifePoints;
        } else {
            player.damageTaken = 0;
        }

        delete items[items.indexOf(this)];
    }
}