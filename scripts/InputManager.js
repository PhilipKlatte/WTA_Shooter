addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let movementSpeed = 8;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            playerVelocityUp = movementSpeed;
            playerOrientation = orientation.down;
            break;
        case 'A':
            playerVelocityLeft = movementSpeed;
            playerOrientation = orientation.left;
            break;
        case 'S':
            playerVelocityDown = movementSpeed;
            playerOrientation = orientation.up;
            break;
        case 'D':
            playerVelocityRight = movementSpeed;
            playerOrientation = orientation.right;
            break;
    }
}

function keyupEvent(ev){
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            playerVelocityUp = 0;
            break;
        case 'A':
            playerVelocityLeft = 0;
            break;
        case 'S':
            playerVelocityDown = 0;
            break;
        case 'D':
            playerVelocityRight = 0;
            break;
    }
}