class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // create canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }


}