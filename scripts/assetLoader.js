class AssetLoader {
    static addImage(src) {

        let img = new Image();
        img.src = src;

        return img;
    }
}