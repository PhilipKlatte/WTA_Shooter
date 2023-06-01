addEventListener("keydown", (ev) => keydownEvent(ev));
addEventListener("keyup", (ev) => keyupEvent(ev));

function keydownEvent(ev) {
    const key_pressed = String.fromCharCode(ev.keyCode);

    switch(key_pressed){
        case 'W':
            player.velocityUp = player.speed;
            player.orientation = orientation.down;
            break;
        case 'A':
            player.velocityLeft = player.speed;
            player.orientation = orientation.left;
            break;
        case 'S':
            player.velocityDown = player.speed;
            player.orientation = orientation.up;
            break;
        case 'D':
            player.velocityRight = player.speed;
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