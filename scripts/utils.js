class CollisionDetection{
    static collidesWith(gameObject, collideObject){
        if (gameObject.collideZone instanceof RectangularCollideZone && collideObject.collideZone instanceof RectangularCollideZone){
            return this.#RectangularCZcollidesWithRectangularCZ(gameObject, collideObject);
        }
    }

    static collidesWithOneOf(gameObject, collideObjects){
        for (const collideObject of collideObjects) {
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
}
