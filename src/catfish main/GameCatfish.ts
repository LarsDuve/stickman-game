class GameCatfish {

    private scamRoom: ScamRoom;

    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.scamRoom = new ScamRoom(this.canvas);

        // this.loop();
    }

    // private loop = () => {
    //     this.scamRoom.draw(this.canvas);
    
    //     requestAnimationFrame(this.loop);
    // };

            /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
   public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
}

}