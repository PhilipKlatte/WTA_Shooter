class Explosion extends GameObject{
    constructor(src, posX, posY, duration, radius){
        super(src, posX, posY);
        this.radius = radius;
        this.duration = duration;
        this.start = clock;
    }

    move(){
        if (this.start + this.duration < clock){
            this.end();
        }
    }

    end(){
        delete effects[effects.indexOf(this)];
    }

    draw(){
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius,0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
