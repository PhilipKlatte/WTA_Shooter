addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

let playerMovementSpeed = 5;

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.velocityUp = playerMovementSpeed;
            player.orientation = orientation.down;
            break;
        case 'A':
            player.velocityLeft = playerMovementSpeed;
            player.orientation = orientation.left;
            break;
        case 'S':
            player.velocityDown = playerMovementSpeed;
            player.orientation = orientation.up;
            break;
        case 'D':
            player.velocityRight = playerMovementSpeed;
            player.orientation = orientation.right;
            break;
        case 'I':
            shoot(orientation.up);
            break;
        case 'J':
            shoot(orientation.left);
            break;
        case 'K':
            shoot(orientation.down);
            break;
        case 'L':
            shoot(orientation.right);
            break;
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