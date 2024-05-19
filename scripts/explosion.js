class Explosion extends GameObject{
    constructor(src, posX, posY, radius){
        super(src, posX, posY);

        this.radius = radius;
        this.start = clock;
        this.damage = 40;

        this.collideZone = new CircularCollideZone(2*tilesize);

        this.zones.add(new CircularCollideZone(2*tilesize));

        this.firstMoveCall = true;

        this.animationFrame = 0;
    }

    hurt(){
        CollisionDetection.collidesWithAllOf(this, zombies).forEach(zombie => zombie.hit(this.damage));
        CollisionDetection.collidesWithAllOf(this, barrels).forEach(barrel => barrel.explode());

        if (CollisionDetection.collidesWith2(this, player)) player.hit(this.damage);
    }

    move(){
        if (this.firstMoveCall) {
            this.hurt();
            this.firstMoveCall = false;
        }
    }

    end(){
        delete effects[effects.indexOf(this)];
    }

    draw(){
        if (this.animationFrame === 4) this.end();
        else if (frame % 1 === 0) this.animationFrame++;

        ctx.drawImage(
            this.src,
            this.animationFrame*5*tilesize, 0,
            5*tilesize, 5*tilesize,
            this.posX-2.5*tilesize, this.posY-2.5*tilesize,
            5*tilesize, 5*tilesize);
    }
}
