function muteMusic() {
    music.muted = true;
}

function unmuteMusic() {
    music.muted = false;
}

function startMusic() {
    music.loop = true;
    music.volume = 0.5;
    music.play();
}

function pauseMusic() {
    music.pause();
}

function playMusic() {
    music.play();
}