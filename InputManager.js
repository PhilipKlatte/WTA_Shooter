addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let movementSpeed = 20;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            playerVelocityUp = movementSpeed;
            playerOrientation = 0;
            break;
        case 'A':
            playerVelocityLeft = movementSpeed;
            playerOrientation = 270;
            break;
        case 'S':
            playerVelocityDown = movementSpeed;
            playerOrientation = 180;
            break;
        case 'D':
            playerVelocityRight = movementSpeed;
            playerOrientation = 90;
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