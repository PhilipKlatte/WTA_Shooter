addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let movementSpeed = 20;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            playerVelocityUp = movementSpeed;
            player2orientation = 0;
            break;
        case 'A':
            playerVelocityLeft = movementSpeed;
            player2orientation = 270;
            break;
        case 'S':
            playerVelocityDown = movementSpeed;
            player2orientation = 180;
            break;
        case 'D':
            playerVelocityRight = movementSpeed;
            player2orientation = 90;
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