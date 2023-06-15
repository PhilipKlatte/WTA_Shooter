class CollisionDetection{

    static collidesWith(gameObject, gameObjectZoneType, collideObject, collideObjectZoneType){

        let gameObjectZone = this.#getZone(gameObject, gameObjectZoneType);
        let collideObjectZone = this.#getZone(collideObject, collideObjectZoneType);

        if (gameObjectZone instanceof RectangularZone
            && collideObjectZone instanceof RectangularZone){

            return this.#rectangularCZcollidesWithRectangularCZ(gameObject, gameObjectZone, collideObject, collideObjectZone);
        }
        if (gameObjectZone instanceof CircularZone
            && collideObjectZone instanceof RectangularZone){

            return this.#circularCZcollidesWithRectangularCZ(gameObject, gameObjectZone, collideObject, collideObjectZone);
        }
    }
    
    static #getZone(gameObject, zoneType){
        let zone = null;
        
        gameObject.zones.forEach(elem => {
            if (elem instanceof zoneType) zone = elem;
        });
        
        return zone;
    }

    static collidesWithOneOf(gameObject, gameObjectZoneType, collideObjects, collideObjectZoneType){
        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWith(gameObject, gameObjectZoneType, collideObject, collideObjectZoneType)) return collideObject;
        }

        return null;
    }

    static collidesWithAnyOf(gameObject, gameObjectZoneType, collideObjects, collideObjectZoneType){
        const collidingObjects = [];

        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWith(gameObject, gameObjectZoneType, collideObject, collideObjectZoneType)) collidingObjects.push(collideObject);
        }

        return collidingObjects;
    }

    static #rectangularCZcollidesWithRectangularCZ(gameObject, gameObjectZone, collideObject, collideObjectZone){
        let gameObjectCZfromX = gameObject.posX + gameObjectZone.fromX;
        let gameObjectCZfromY = gameObject.posY + gameObjectZone.fromY;
        let gameObjectCZuntilX = gameObject.posX + gameObjectZone.untilX;
        let gameObjectCZuntilY = gameObject.posY + gameObjectZone.untilY;

        let collideObjectCZfromX = collideObject.posX + collideObjectZone.fromX;
        let collideObjectCZfromY = collideObject.posY + collideObjectZone.fromY;
        let collideObjectCZuntilX = collideObject.posX + collideObjectZone.untilX;
        let collideObjectCZuntilY = collideObject.posY + collideObjectZone.untilY;

        return gameObjectCZfromX < collideObjectCZuntilX && gameObjectCZuntilX > collideObjectCZfromX &&
            gameObjectCZfromY < collideObjectCZuntilY && gameObjectCZuntilY > collideObjectCZfromY;
    }

    static #circularCZcollidesWithRectangularCZ(gameObject, gameObjectZone, collideObject, collideObjectZone){
        let czWidth = collideObjectZone.untilX - collideObjectZone.fromX;
        let czHeight = collideObjectZone.untilY - collideObjectZone.fromY;
        
        let rectangleCenterX = collideObject.posX + collideObjectZone.fromX + czWidth/2;
        let rectangleCenterY = collideObject.posY + collideObjectZone.fromY + czHeight/2;

        let circleDistanceX = Math.abs(gameObject.posX - rectangleCenterX);
        let circleDistanceY = Math.abs(gameObject.posY - rectangleCenterY);

        if (circleDistanceX > (czWidth/2 + gameObjectZone.radius)) return false;
        if (circleDistanceY > (czHeight/2 + gameObjectZone.radius)) return false;

        if (circleDistanceX <= (czWidth/2)) return true;
        if (circleDistanceY <= (czHeight/2)) return true;

        let cornerDistance_sq = (circleDistanceX - czWidth/2)^2 +
            (circleDistanceY - czHeight/2)^2;

        return (cornerDistance_sq <= (gameObjectZone.radius^2));
    }
}
