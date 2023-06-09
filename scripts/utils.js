function showCollideZones(){
    player.showCollideZone();

    walls.forEach(wall => wall.showCollideZone());

    zombies.forEach(zombie => zombie.showCollideZone());

    barrels.forEach(barrel => barrel.showCollideZone());
}

function drawLineFromZombieToPlayer(){
    zombies.forEach(zombie => drawLine(zombie.posX, zombie.posY, player.posX, player.posY));
}

function drawAndRotatePlayer() {
    // const image = new Image();
    // image.onload = () => {
    //     this.ctx.drawImage(image, player2PosX, player2PosY)
    // };
    // image.src = "player.png";

    ctx.save();
    ctx.translate(playerPosX + player.width / 2, playerPosY + player.height / 2);
    ctx.rotate(playerOrientation * Math.PI / 180);
    ctx.drawImage(player, -player.width / 2, -player.height / 2);
    ctx.restore();
}

function count(array){
    let count = 0;
    for (const elem of array){
        if (elem !== undefined) count++;
    }

    return count;
}

function drawLine(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}

function getRandomNumberIn(min, max) {
    return Math.random() * (max - min) + min;
}

function drawRotatedRect(x, y, width, height, degrees) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = "brown";
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.restore();
}

function calculateYIntercept(slope, playerPosX, playerPosY){
    return playerPosY - slope * playerPosX;
}

function calculateSlope(x1, y1, x2, y2){
    let deltaY = y2 - y1;
    let deltaX = x2 - x1;

    return deltaY / deltaX;
}

function drawGrid(spacing) {
    let x = 0;

    while (x < canvas.width) {
        x += spacing;
        drawLine(x, 0, x, canvas.height);
    }

    let y = 0;

    while (y < canvas.height) {
        y += spacing;
        drawLine(0, y, canvas.width, y);
    }
}