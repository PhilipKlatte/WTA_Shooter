class CollisionDetection{
    static collidesWith(gameObject, collideObject){
        if (gameObject.collideZone instanceof RectangularZone
            && collideObject.collideZone instanceof RectangularZone){

            return this.#rectangularCZcollidesWithRectangularCZ(gameObject, collideObject);
        }
        if (gameObject.collideZone instanceof CircularCollideZone
            && collideObject.collideZone instanceof RectangularZone){

            return this.#circularCZcollidesWithRectangularCZ(gameObject, collideObject);
        }
    }

    static collidesWithOneOf(gameObject, collideObjects){
        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWith(gameObject, collideObject)) return collideObject;
        }

        return null;
    }

    static collidesWithAnyOf(gameObject, collideObjects){
        const collidingObjects = [];

        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;


            if (this.collidesWith(gameObject, collideObject)) collidingObjects.push(collideObject);
        }

        return collidingObjects;
    }

    static #rectangularCZcollidesWithRectangularCZ(gameObject, collideObject){
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

    static #circularCZcollidesWithRectangularCZ(gameObject, collideObject){
        let czWidth = collideObject.collideZone.untilX - collideObject.collideZone.fromX;
        let czHeight = collideObject.collideZone.untilY - collideObject.collideZone.fromY;
        
        let rectangleCenterX = collideObject.posX + collideObject.collideZone.fromX + czWidth/2;
        let rectangleCenterY = collideObject.posY + collideObject.collideZone.fromY + czHeight/2;

        let circleDistanceX = Math.abs(gameObject.posX - rectangleCenterX);
        let circleDistanceY = Math.abs(gameObject.posY - rectangleCenterY);

        if (circleDistanceX > (czWidth/2 + gameObject.collideZone.radius)) return false;
        if (circleDistanceY > (czHeight/2 + gameObject.collideZone.radius)) return false;

        if (circleDistanceX <= (czWidth/2)) return true;
        if (circleDistanceY <= (czHeight/2)) return true;

        let cornerDistance_sq = (circleDistanceX - czWidth/2)^2 +
            (circleDistanceY - czHeight/2)^2;

        return (cornerDistance_sq <= (gameObject.collideZone.radius^2));
    }
}
