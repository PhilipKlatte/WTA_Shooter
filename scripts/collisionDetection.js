class CollisionDetection{

    /**
     * @deprecated collides() should be utlilzed instead
     * 
     * Checks if specific zones of gameobjects collide.
     * 
     * @param {*} object1 - the object that is tested for collision with the object2
     * @param {*} object1Zone - the specific zone of object1 that should be tested for collision
     * @param {*} object2 - the object that is tested for collision with the object1
     * @param {*} object2Zone - the specific zone of object2 that should be tested for collision
     * @returns true if gameobjects collide; false if not.
     */
    static collidesWithSpecifyZones(object1, object1Zone, object2, object2Zone){

        if (object1Zone instanceof RectangularZone
            && object2Zone instanceof RectangularZone){

            return this.#rectangularCZcollidesWithRectangularCZ(object1, object1Zone, object2, object2Zone);
        }
        if (object1Zone instanceof CircularZone
            && object2Zone instanceof RectangularZone){

            return this.#circularCZcollidesWithRectangularCZ(object1, object1Zone, object2, object2Zone);
        }
    }

    /**
     * Checks if two gameobjects collide, by checking if their collideZones overlap.
     * 
     * @param {GameObject} object1 - the object that is tested for collision with the object2
     * @param {GameObject} object2 - the object that is tested for collision with the object1
     * @returns true if collideZones of gameobjects overlap; false if not.
     */
    static collides(object1, object2){
        let object1CollideZone = object1.collideZone;
        let object2CollideZone = object2.collideZone;

        if (object1CollideZone instanceof RectangularZone
            && object2CollideZone instanceof RectangularZone){

            return this.#rectangularCZcollidesWithRectangularCZ(object1, object1CollideZone, object2, object2CollideZone);
        }
        if (object1CollideZone instanceof CircularZone
            && object2CollideZone instanceof RectangularZone){

            return this.#circularCZcollidesWithRectangularCZ(object1, object1CollideZone, object2, object2CollideZone);
        }
    }

    /**
     * @deprecated collidesWithOneOf() should be utlilzed instead
     * 
     * Checks if specific zones of gameobjects collide.
     * 
     * @param {*} object - the object that is tested for collision with the object2
     * @param {*} objectZone - the specific zone of object1 that should be tested for collision
     * @param {*} collideObjects - the object that is tested for collision with the object1
     * @param {*} collideObjectsZone - the specific zone of object2 that should be tested for collision
     * @returns the first gameobject of collideObjetcs of which the collideObjectsZone overlaps with the objectZone
     */
    static collidesWithOneOfSpecifyZones(object, objectZone, collideObjects, collideObjectsZone){
        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWithSpecifyZones(object, objectZone, collideObject, collideObjectsZone)) return collideObject;
        }

        return null;
    }

    static collidesWithOneOf(gameObject, collideObjects){
        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collides(gameObject, collideObject)) return collideObject;
        }

        return null;
    }

    /**
     * @deprecated collidesWithAllOf() should be utlilzed instead
     */
    static collidesWithAnyOfSpecifyZones(gameObject, gameObjectZoneType, collideObjects, collideObjectZoneType){
        const collidingObjects = [];

        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collidesWith(gameObject, gameObjectZoneType, collideObject, collideObjectZoneType)) collidingObjects.push(collideObject);
        }

        return collidingObjects;
    }

    static collidesWithAllOf(gameObject, collideObjects){
        const collidingObjects = [];

        for (const collideObject of collideObjects) {
            if (collideObject === undefined) continue;

            if (this.collides(gameObject, collideObject)) collidingObjects.push(collideObject);
        }

        return collidingObjects;
    }

    /**
     * Checks if an object can be spawned
     * @param {*} spawnObject the object you want to spawn
     * @returns true as long as the space is already occupied
     */
    static isNotFreeSpace(spawnObject){
        
        if(CollisionDetection.collidesWithOneOf(spawnObject, walls) != null
            || CollisionDetection.collidesWithOneOf(spawnObject, zombies) != null
            || CollisionDetection.collidesWithOneOf(spawnObject, barrels) != null
            || CollisionDetection.collides(spawnObject, player)
        ){
            return true;
        }
        else{
            return false;
        }
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
