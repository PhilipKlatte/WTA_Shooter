class AssetLoader {
    static _toPreload = 0;

    static addImage(src) {

        let img = new Image();
        img.src = src;
        AssetLoader._toPreload++;

        img.addEventListener('load', function () {
            AssetLoader._toPreload--;
        }, false);
        return img;
    }

    static #checkResources() {
        if (AssetLoader._toPreload === 0)

            setInterval(gameLoop, 40);
        else
            setTimeout(AssetLoader.checkResources, 200);
    }
}