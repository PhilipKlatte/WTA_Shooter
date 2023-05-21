addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let movementSpeed = 8;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.playerVelocityUp = movementSpeed;
            playerOrientation = orientation.down;
            break;
        case 'A':
            player.playerVelocityLeft = movementSpeed;
            playerOrientation = orientation.left;
            break;
        case 'S':
            player.playerVelocityDown = movementSpeed;
            playerOrientation = orientation.up;
            break;
        case 'D':
            player.playerVelocityRight = movementSpeed;
            playerOrientation = orientation.right;
            break;
    }
}

function keyupEvent(ev){
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.playerVelocityUp = 0;
            break;
        case 'A':
            player.playerVelocityLeft = 0;
            break;
        case 'S':
            player.playerVelocityDown = 0;
            break;
        case 'D':
            player.playerVelocityRight = 0;
            break;
    }
}