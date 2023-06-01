class CollisionDetection{
    static collidesWith(gameObject, collideObject){
        if (gameObject.collideZone instanceof RectangularCollideZone
            && collideObject.collideZone instanceof RectangularCollideZone){

            return this.#RectangularCZcollidesWithRectangularCZ(gameObject, collideObject);
        }
        if (gameObject.collideZone instanceof CircularCollideZone
            && collideObject.collideZone instanceof RectangularCollideZone){

            return this.#CircularCZcollidesWithRectangularCZ(gameObject, collideObject);
        }
    }

    static collidesWithOneOf(gameObject, collideObjects){
        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWith(gameObject, collideObject)) return collideObject;
        }

        return null;
    }

    static #RectangularCZcollidesWithRectangularCZ(gameObject, collideObject){
        let gameObjectCZfromX = gameObject.posX + gameObject.collideZone.fromX;
        let gameObjectCZfromY = gameObject.posY + gameObject.collideZone.fromY;
        let gameObjectCZuntilX = gameObject.posX + gameObject.collideZone.untilX;
        let gameObjectCZuntilY = gameObject.posY + gameObject.collideZone.untilY;

        let collideObjectCZfromX = collideObject.posX + collideObject.collideZone.fromX;
        let collideObjectCZfromY = collideObject.posY + collideObject.collideZone.fromY;
        let collideObjectCZuntilX = collideObject.posX + collideObject.collideZone.untilX;
        let collideObjectCZuntilY = collideObject.posY + collideObject.collideZone.untilY;

        return gameObjectCZfromX < collideObjectCZuntilX && gameObjectCZuntilX > collideObjectCZfromX &&
            gameObjectCZfromY < collideObjectCZuntilY && gameObjectCZuntilY > collideObjectCZfromY;
    }

    static #CircularCZcollidesWithRectangularCZ(gameObject, collideObject){
        let rectangleCenterX = collideObject.posX + collideObject.src.width/2;
        let rectangleCenterY = collideObject.posY + collideObject.src.height/2;

        let circleDistanceX = Math.abs(gameObject.posX - rectangleCenterX);
        let circleDistanceY = Math.abs(gameObject.posY - rectangleCenterY);

        if (circleDistanceX > (collideObject.src.width/2 + gameObject.collideZone.radius)) { return false; }
        if (circleDistanceY > (collideObject.src.height/2 + gameObject.collideZone.radius)) { return false; }

        if (circleDistanceX <= (collideObject.src.width/2)) { return true; }
        if (circleDistanceY <= (collideObject.src.height/2)) { return true; }

        let cornerDistance_sq = (circleDistanceX - collideObject.src.width/2)^2 +
            (circleDistanceY - collideObject.src.height/2)^2;

        return (cornerDistance_sq <= (gameObject.collideZone.radius^2));
    }
}
