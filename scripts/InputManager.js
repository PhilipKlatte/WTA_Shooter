addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let movementSpeed = 5;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.velocityUp = movementSpeed;
            playerOrientation = orientation.down;
            break;
        case 'A':
            player.velocityLeft = movementSpeed;
            playerOrientation = orientation.left;
            break;
        case 'S':
            player.velocityDown = movementSpeed;
            playerOrientation = orientation.up;
            break;
        case 'D':
            player.velocityRight = movementSpeed;
            playerOrientation = orientation.right;
            break;
        case 'M':
            shoot();
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