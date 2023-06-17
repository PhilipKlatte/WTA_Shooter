addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));
addEventListener("mousedown", mouseClicked);
addEventListener("mousemove", mouseMoved);

async function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.velocityUp = player.speed;
            player.orientation = orientation.up;
            break;
        case 'A':
            player.velocityLeft = player.speed;
            player.orientation = orientation.left;
            break;
        case 'S':
            player.velocityDown = player.speed;
            player.orientation = orientation.down;
            break;
        case 'D':
            player.velocityRight = player.speed;
            player.orientation = orientation.right;
            break;

        case 'I':
            player.shoot(orientation.up);
            break;
        case 'J':
            player.shoot(orientation.left);
            break;
        case 'K':
            player.shoot(orientation.down);
            break;
        case 'L':
            player.shoot(orientation.right);
            break;

        case 'R':
            reset();
            break;
        case '1':
            (music.muted) ? unmuteMusic() : muteMusic();
    }

    if (ev.keyCode === 27) {
        (gamePaused) ? resumeGame() : pauseGame();
    }
}

function keyupEvent(ev){
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.velocityUp = 0;
            break;
        case 'A':
            player.velocityLeft = 0;
            break;
        case 'S':
            player.velocityDown = 0;
            break;
        case 'D':
            player.velocityRight = 0;
            break;
    }
}

function mouseMoved(ev) {
    mouseX = ev.clientX - canvas.offsetLeft;
    mouseY = ev.clientY - canvas.offsetTop;
}

function mouseClicked(ev) {
    console.log("mouse clicked", mouseX, mouseY);
}